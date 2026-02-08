export const markdown = `
The search bar is dead. In the modern enterprise, employees waste an average of 1.8 hours daily looking for specific information buried in PDFs, SharePoint drives, and email chains.

## The Hallucination Problem

Early adoption of LLMs failed because generic models make things up when they don't have the answer. **Retrieval-Augmented Generation (RAG)** changes the architecture by allowing the AI to "read" your specific policy documents in real-time before answering, ensuring accuracy and citing sources.

### Core Technical Flow

1. **Ingestion:** Documents are broken into semantic chunks.
2. **Embedding:** Chunks are converted into multi-dimensional vectors.
3. **Retrieval:** When a user asks a question, the system finds the most relevant chunks.
4. **Generation:** The LLM synthesizes an answer using *only* those chunks.

## Performance Metrics

Deploying a RAG-based assistant typically results in:
- **70% reduction** in internal repetitive queries.
- **Sub-2 second** response times for complex document queries.
- **100% auditability** via source citations.

> "A RAG system is only as good as its retrieval layer. If your vector database is poorly indexed, the LLM will provide confident, incorrect answers."

### Implementation Snippet (Pinecone + LangChain)

\`\`\`bash
# Initialize Vector Store Sync
python3 -m time_ai.sync_engine --source ./docs --target pinecone-v3
\`\`\`
`;