import { promises as fs } from 'fs';
import path from 'path';

interface Lead {
  id: string;
  company: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  relevanceScore: number;
  source: string;
  scrapedAt: Date;
  metadata?: Record<string, any>;
}

interface LeadGenerationOptions {
  searchQuery: string;
  minRelevance: number;
  maxResults: number;
}

interface LeadGenerationResult {
  leads: Lead[];
  totalFound: number;
  totalRelevant: number;
  averageRelevance: number;
  executionTimeMs: number;
  savedTo: string;
}

export class LeadGenerationPipeline {
  private workspaceDir: string;

  constructor() {
    this.workspaceDir = path.join(process.cwd(), 'workspace');
  }

  /**
   * Main method to generate leads based on search criteria
   */
  async generateLeads(options: LeadGenerationOptions): Promise<LeadGenerationResult> {
    const startTime = Date.now();
    console.log(`🚀 Starting lead generation for: "${options.searchQuery}"`);
    console.log(`📊 Parameters: minRelevance=${options.minRelevance}, maxResults=${options.maxResults}`);

    try {
      // Step 1: Search for potential leads
      console.log('\n📡 Step 1/4: Searching for potential leads...');
      const rawLeads = await this.searchForLeads(options.searchQuery, options.maxResults);
      console.log(`   Found ${rawLeads.length} potential leads`);

      // Step 2: Scrape and enrich lead data
      console.log('\n🌐 Step 2/4: Scraping and enriching lead data...');
      const enrichedLeads = await this.enrichLeads(rawLeads);
      console.log(`   Enriched ${enrichedLeads.length} leads with additional data`);

      // Step 3: Score and filter by relevance
      console.log('\n🎯 Step 3/4: Scoring and filtering by relevance...');
      const scoredLeads = await this.scoreLeads(enrichedLeads, options.searchQuery);
      const filteredLeads = scoredLeads.filter(lead => lead.relevanceScore >= options.minRelevance);
      console.log(`   ${filteredLeads.length} leads passed relevance threshold`);

      // Step 4: Save results
      console.log('\n💾 Step 4/4: Saving results...');
      const savedPath = await this.saveLeads(filteredLeads, options.searchQuery);
      console.log(`   Saved to: ${savedPath}`);

      const executionTimeMs = Date.now() - startTime;
      const averageRelevance = filteredLeads.length > 0
        ? filteredLeads.reduce((sum, lead) => sum + lead.relevanceScore, 0) / filteredLeads.length
        : 0;

      console.log('\n✅ Lead generation complete!');
      console.log(`   Total execution time: ${(executionTimeMs / 1000).toFixed(2)}s`);
      console.log(`   Average relevance score: ${averageRelevance.toFixed(2)}`);

      return {
        leads: filteredLeads,
        totalFound: rawLeads.length,
        totalRelevant: filteredLeads.length,
        averageRelevance,
        executionTimeMs,
        savedTo: savedPath,
      };
    } catch (error) {
      console.error('❌ Error during lead generation:', error);
      throw error;
    }
  }

  /**
   * Search for potential leads (simulated - in production would use real APIs)
   */
  private async searchForLeads(query: string, maxResults: number): Promise<Partial<Lead>[]> {
    // Simulate API search - in production, this would use:
    // - Google Search API / Serper API
    // - LinkedIn Sales Navigator API
    // - Apollo.io API
    // - Hunter.io API
    // - Clearbit API

    const mockLeads: Partial<Lead>[] = [];
    const resultsToGenerate = Math.min(maxResults, 50); // Limit for demo

    for (let i = 0; i < resultsToGenerate; i++) {
      const companyTypes = ['Tech', 'Software', 'Consulting', 'Marketing', 'Finance', 'Healthcare', 'E-commerce'];
      const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)];

      mockLeads.push({
        id: `lead-${Date.now()}-${i}`,
        company: `${companyType} Company ${i + 1}`,
        website: `https://company${i + 1}.com`,
        source: 'search',
        metadata: {
          searchQuery: query,
          foundAt: new Date().toISOString(),
        },
      });

      // Small delay to simulate API rate limiting
      await this.sleep(10);
    }

    return mockLeads;
  }

  /**
   * Enrich leads with additional data from web scraping
   */
  private async enrichLeads(leads: Partial<Lead>[]): Promise<Partial<Lead>[]> {
    const enriched: Partial<Lead>[] = [];

    for (const lead of leads) {
      try {
        // In production, this would actually scrape the website
        // For demo, we'll simulate enrichment
        const enrichedLead = {
          ...lead,
          email: this.generateMockEmail(lead.company || ''),
          phone: this.generateMockPhone(),
          description: this.generateMockDescription(lead.company || ''),
          metadata: {
            ...lead.metadata,
            enrichedAt: new Date().toISOString(),
          },
        };

        enriched.push(enrichedLead);

        // Small delay to simulate scraping
        await this.sleep(5);
      } catch (error) {
        console.warn(`   ⚠️  Failed to enrich ${lead.company}:`, error);
        enriched.push(lead); // Add without enrichment
      }
    }

    return enriched;
  }

  /**
   * Score leads based on relevance to search query
   */
  private async scoreLeads(leads: Partial<Lead>[], query: string): Promise<Lead[]> {
    const queryTerms = query.toLowerCase().split(' ');

    return leads.map(lead => {
      // Calculate relevance score based on multiple factors
      let score = 0.5; // Base score

      // Check company name relevance
      const companyLower = (lead.company || '').toLowerCase();
      queryTerms.forEach(term => {
        if (companyLower.includes(term)) {
          score += 0.1;
        }
      });

      // Bonus for having complete data
      if (lead.email) score += 0.05;
      if (lead.phone) score += 0.05;
      if (lead.website) score += 0.05;
      if (lead.description) score += 0.05;

      // Random variance to simulate real scoring
      score += (Math.random() * 0.2 - 0.1);

      // Clamp between 0 and 1
      score = Math.max(0, Math.min(1, score));

      return {
        ...lead,
        relevanceScore: score,
        scrapedAt: new Date(),
      } as Lead;
    });
  }

  /**
   * Save leads to local workspace
   */
  private async saveLeads(leads: Lead[], query: string): Promise<string> {
    const leadsDir = path.join(this.workspaceDir, 'leads');
    await fs.mkdir(leadsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const sanitizedQuery = query.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${sanitizedQuery}_${timestamp}.json`;
    const filepath = path.join(leadsDir, filename);

    const data = {
      query,
      generatedAt: new Date().toISOString(),
      totalLeads: leads.length,
      leads,
    };

    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
    return filepath;
  }

  /**
   * Helper: Generate mock email
   */
  private generateMockEmail(company: string): string {
    const sanitized = company.toLowerCase().replace(/[^a-z0-9]/g, '');
    const prefixes = ['info', 'contact', 'sales', 'hello'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${prefix}@${sanitized}.com`;
  }

  /**
   * Helper: Generate mock phone
   */
  private generateMockPhone(): string {
    const area = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const line = Math.floor(Math.random() * 9000) + 1000;
    return `+1-${area}-${prefix}-${line}`;
  }

  /**
   * Helper: Generate mock description
   */
  private generateMockDescription(company: string): string {
    const templates = [
      `${company} is a leading provider of innovative solutions.`,
      `${company} specializes in cutting-edge technology and services.`,
      `${company} delivers world-class products to businesses worldwide.`,
      `${company} is transforming the industry with advanced solutions.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Helper: Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * List all saved lead files
   */
  async listSavedLeads(): Promise<string[]> {
    const leadsDir = path.join(this.workspaceDir, 'leads');

    try {
      await fs.access(leadsDir);
      const files = await fs.readdir(leadsDir);
      return files.filter(f => f.endsWith('.json')).map(f => path.join(leadsDir, f));
    } catch {
      return [];
    }
  }

  /**
   * Load leads from a saved file
   */
  async loadLeads(filepath: string): Promise<any> {
    const content = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(content);
  }
}
