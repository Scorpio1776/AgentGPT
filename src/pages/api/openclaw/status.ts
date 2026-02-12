import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

/**
 * OpenClaw Agent Status Endpoint
 * Check the status of an agent triggered by OpenClaw
 *
 * GET /api/openclaw/status?agentId=xxx&token=xxx
 */

interface AgentStatusResponse {
  success: boolean;
  agent?: {
    id: string;
    name: string;
    goal: string;
    createdAt: string;
    taskCount: number;
    completedTasks: number;
    tasks: Array<{
      value: string;
      status: string | null;
      info: string | null;
    }>;
  };
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AgentStatusResponse>
) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use GET.",
    });
  }

  try {
    const { agentId, token } = req.query;

    // Validate webhook token
    if (!token || token !== process.env.OPENCLAW_WEBHOOK_TOKEN) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    if (!agentId || typeof agentId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid agentId parameter",
      });
    }

    // Fetch agent with tasks
    const agent = await prisma.agent.findFirst({
      where: {
        id: agentId,
        deleteDate: null,
      },
      include: {
        tasks: {
          where: {
            type: "task",
          },
          orderBy: {
            sort: "asc",
          },
          select: {
            value: true,
            status: true,
            info: true,
          },
        },
      },
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    const completedTasks = agent.tasks.filter(
      (t) => t.status === "completed" || t.status === "final"
    ).length;

    return res.status(200).json({
      success: true,
      agent: {
        id: agent.id,
        name: agent.name,
        goal: agent.goal,
        createdAt: agent.createDate.toISOString(),
        taskCount: agent.tasks.length,
        completedTasks,
        tasks: agent.tasks,
      },
    });
  } catch (error) {
    console.error("[OpenClaw] Status check error:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export default handler;
