import { BlogPost } from '../types';
import { markdown as sshMarkdown } from './posts/ssh-tailscale';
import { markdown as ragMarkdown } from './posts/rag-chatbots';
import { markdown as kgMarkdown } from './posts/knowledge-graphs';
import { markdown as tuneMarkdown } from './posts/fine-tuning';
import { markdown as secMarkdown } from './posts/security';
import { markdown as financeMarkdown } from './posts/agents-finance';
import { markdown as opsMarkdown } from './posts/llm-ops';

export const posts: BlogPost[] = [
    {
        id: 'SSH-TAILSCALE-2025',
        title: "Ubuntu SSH & Tailscale Setup Guide",
        excerpt: "Complete guide to enable SSH and setup Tailscale on Ubuntu Server for remote access without router configuration.",
        category: 'Engineering',
        date: "NOV 29, 2025",
        readTime: "12 MIN READ",
        markdown: sshMarkdown
    },
    {
        id: 'RAG-2026',
        title: "How RAG Chatbots Reduce Support Load by 70%",
        excerpt: "Transforming internal knowledge bases into active conversation partners using Retrieval-Augmented Generation.",
        category: 'Engineering',
        date: "OCT 12, 2026",
        readTime: "8 MIN READ",
        markdown: ragMarkdown
    },
    {
        id: 'KG-VS-VEC',
        title: "Why Vector Databases Aren't Enough: Knowledge Graphs",
        excerpt: "Vectors handle similarity, but Knowledge Graphs handle logic. Why you need both for enterprise reasoning.",
        category: 'Engineering',
        date: "OCT 20, 2026",
        readTime: "10 MIN READ",
        markdown: kgMarkdown
    },
    {
        id: 'FINE-TUNE',
        title: "Fine-Tuning Llama 3 for Legal Compliance",
        excerpt: "Generic models are too chatty. Here is how we forced a model to speak 'Lawyer' with 99% syntax accuracy.",
        category: 'Engineering',
        date: "OCT 05, 2026",
        readTime: "15 MIN READ",
        markdown: tuneMarkdown
    },
    {
        id: 'SEC-GENAI',
        title: "Security in the Age of Generative AI",
        excerpt: "Prompt injection, data leakage, and poisoning. How we harden enterprise LLM deployments.",
        category: 'Security',
        date: "NOV 01, 2026",
        readTime: "7 MIN READ",
        markdown: secMarkdown
    },
    {
        id: 'AGENTS-FINANCE',
        title: "Agentic Reasoning in High-Frequency Trading",
        excerpt: "Using LangGraph to orchestrate sub-second decision making in volatile liquidity environments.",
        category: 'Strategy',
        date: "DEC 10, 2025",
        readTime: "11 MIN READ",
        markdown: financeMarkdown
    },
    {
        id: 'LLM-OPS-2026',
        title: "LLMOps: Prototype to Production in 48 Hours",
        excerpt: "The Time AI blueprint for rapid CI/CD deployment of grounded intelligence systems.",
        category: 'Case Study',
        date: "JAN 15, 2026",
        readTime: "9 MIN READ",
        markdown: opsMarkdown
    }
];