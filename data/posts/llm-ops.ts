export const markdown = `
Building a demo is easy. Deploying a resilient system that stays accurate over months is the challenge of **LLMOps**.

## The Drift Problem

Models can experience "semantic drift" where their accuracy degrades as the underlying business data changes. Our LLMOps blueprint prevents this through continuous evaluation.

### The Blueprint:
- **Automated Eval (Ragas):** Using an LLM to grade another LLM's answers for faithfulness and relevance.
- **Vector Sharding:** Partitioning data by region or department for sub-100ms retrieval.
- **A/B Model Routing:** Dynamically switching between models based on query complexity.

## Deployment Timeline
Using the Time AI CI/CD pipeline, we take companies from raw data to a production-ready, SOC2-hardened endpoint in **48 hours**.

\`\`\`bash
# Production Deployment Script
time-ai deploy \\
  --target prod-us-east-1 \\
  --eval-threshold 0.85 \\
  --auto-rollback true
\`\`\`

## Monitoring
We monitor "Hallucination Scores" in real-time. If a model's confidence drops below 70%, the system automatically flags the response for human review.
`;