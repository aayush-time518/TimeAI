export const markdown = `
Deploying LLMs in a corporate environment without a security layer is an invitation to data leakage. Here is how we harden our deployments.

## The Threat Landscape

The most common vulnerabilities we see in the field:
1. **Prompt Injection:** Users tricking the AI into ignoring system instructions.
2. **PII Leakage:** The model accidentally exposing sensitive customer data in a response.
3. **Data Poisoning:** Corrupting the training or RAG data source.

## The Time AI Security Shield

We implement a **Dual-Gate Architecture**:
- **Input Guardrails:** Scans user queries for malicious patterns before they reach the LLM.
- **Output Masking:** A secondary model scans the response for PII (Social Security numbers, internal IDs) and replaces them with tokens.

\`\`\`bash
# Initialize Security Gateways
sudo time-ai-shield init \\
  --mode strict \\
  --mask-pii true \\
  --jailbreak-check active
\`\`\`

### Audit Logs
Every inference session is logged with a unique trace ID, allowing for full reconstruction of any security event within 60 seconds.

> "In the age of GenAI, the firewall is no longer enough. You need an identity and intent layer for every token generated."
`;