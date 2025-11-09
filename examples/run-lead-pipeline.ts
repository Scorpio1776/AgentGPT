#!/usr/bin/env ts-node

/**
 * Example script to run the Lead Generation Pipeline
 *
 * Usage:
 *   ts-node examples/run-lead-pipeline.ts
 *
 * Or with custom parameters:
 *   ts-node examples/run-lead-pipeline.ts "your search query" 0.7 100
 */

import { LeadGenerationPipeline } from './lead-generation-pipeline';

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const searchQuery = args[0] || 'AI and ML technology companies';
  const minRelevance = parseFloat(args[1]) || 0.6;
  const maxResults = parseInt(args[2]) || 50;

  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         AgentGPT Lead Generation Pipeline                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');

  // Create pipeline instance
  const pipeline = new LeadGenerationPipeline();

  // Run lead generation
  const results = await pipeline.generateLeads({
    searchQuery,
    minRelevance,
    maxResults,
  });

  // Display summary
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    Results Summary                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📊 Total leads found:        ${results.totalFound}`);
  console.log(`✅ Relevant leads:           ${results.totalRelevant}`);
  console.log(`⭐ Average relevance:        ${results.averageRelevance.toFixed(2)}`);
  console.log(`⏱️  Execution time:          ${(results.executionTimeMs / 1000).toFixed(2)}s`);
  console.log(`💾 Saved to:                ${results.savedTo}`);
  console.log('');

  // Show top 5 leads
  if (results.leads.length > 0) {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                    Top Leads                               ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    const topLeads = results.leads
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);

    topLeads.forEach((lead, index) => {
      console.log(`${index + 1}. ${lead.company}`);
      console.log(`   Score: ${lead.relevanceScore.toFixed(2)}`);
      console.log(`   Email: ${lead.email || 'N/A'}`);
      console.log(`   Phone: ${lead.phone || 'N/A'}`);
      console.log(`   Website: ${lead.website || 'N/A'}`);
      console.log('');
    });
  }

  // Show saved files
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                 All Saved Lead Files                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');

  const savedFiles = await pipeline.listSavedLeads();
  if (savedFiles.length > 0) {
    savedFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });
  } else {
    console.log('No saved lead files found.');
  }

  console.log('');
  console.log('✨ Done! Check the workspace/leads/ directory for full results.');
  console.log('');
}

// Run the script
main().catch((error) => {
  console.error('❌ Error running pipeline:', error);
  process.exit(1);
});
