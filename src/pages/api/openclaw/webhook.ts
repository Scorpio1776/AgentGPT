import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import AgentService from "../../../services/agent-service";
import type { ModelSettings } from "../../../utils/types";

/**
 * OpenClaw Webhook Handler
 * Receives messages from OpenClaw and triggers AgentGPT agents
 *
 * POST /api/openclaw/webhook
 * Body: {
 *   message: string,
 *   sender: string,
 *   channel: string (optional),
 *   token: string (auth token)
 * }
 */

interface OpenClawWebhookPayload {
  message: string;
  sender: string;
  channel?: string;
  token: string;
}

interface OpenClawResponse {
  success: boolean;
  agentId?: string;
  message: string;
  tasks?: string[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OpenClawResponse>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST.",
    });
  }

  try {
    const { message, sender, channel, token } = req.body as OpenClawWebhookPayload;

    // Validate webhook token
    if (!token || token !== process.env.OPENCLAW_WEBHOOK_TOKEN) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid webhook token",
      });
    }

    if (!message || !sender) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: message and sender",
      });
    }

    console.log(`[OpenClaw] Received message from ${sender} via ${channel || "unknown"}: ${message}`);

    // Parse command format: /agent <name> - <goal>
    // Example: /agent "Research Bot" - Research latest AI developments
    const agentRegex = /^\/agent\s+"?([^"-]+)"?\s*-\s*(.+)$/i;
    const match = message.match(agentRegex);

    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Invalid command format. Use: /agent \"Agent Name\" - Your goal here",
      });
    }

    const [, agentName, goal] = match;

    // Default model settings - can be customized
    const modelSettings: ModelSettings = {
      customModelName: process.env.OPENAI_MODEL_NAME || "gpt-3.5-turbo",
      customTemperature: 0.7,
      customMaxLoops: 25,
    };

    // Use server-side API key if available
    if (process.env.OPENAI_API_KEY) {
      modelSettings.customApiKey = process.env.OPENAI_API_KEY;
    }

    // Get initial tasks from AgentGPT
    const tasks = await AgentService.startGoalAgent(
      modelSettings,
      goal.trim(),
      "en" // Default to English, could be customized
    );

    // Create a webhook user if doesn't exist (for tracking)
    let webhookUser = await prisma.user.findFirst({
      where: { email: `openclaw-${sender}@webhook.local` },
    });

    if (!webhookUser) {
      webhookUser = await prisma.user.create({
        data: {
          name: `OpenClaw User (${sender})`,
          email: `openclaw-${sender}@webhook.local`,
          role: "webhook",
        },
      });
    }

    // Create agent in database
    const agent = await prisma.agent.create({
      data: {
        name: agentName.trim(),
        goal: goal.trim(),
        userId: webhookUser.id,
      },
    });

    // Save initial tasks
    const taskPromises = tasks.map((taskValue, index) => {
      return prisma.agentTask.create({
        data: {
          agentId: agent.id,
          type: "task",
          status: "started",
          value: taskValue,
          sort: index,
        },
      });
    });

    await Promise.all(taskPromises);

    console.log(`[OpenClaw] Created agent ${agent.id} with ${tasks.length} tasks`);

    return res.status(200).json({
      success: true,
      agentId: agent.id,
      message: `Agent "${agentName}" created successfully with ${tasks.length} tasks`,
      tasks: tasks,
    });

  } catch (error) {
    console.error("[OpenClaw] Webhook error:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export default handler;
