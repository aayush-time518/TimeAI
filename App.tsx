
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { Timeline } from './components/Timeline';
import { LiveDemos } from './components/LiveDemos';
import { Industries } from './components/Industries';
import { Footer } from './components/Footer';
import { MinaAssistant } from './components/MinaAssistant';
import { ViewState, BlogPost } from './types';
import { CheckCircle, Mail, MapPin, Phone, FileText, ArrowRight, Ear, Loader2, AlertCircle, File, Search, Hash, Lock, Users, Zap, Target, Clock, X, Share2, Printer, Bookmark, Send, Code2, Cpu, GitBranch, AlertTriangle, TrendingUp, Layout, Database, Network, ShieldCheck, Bot, BrainCircuit, Box, Sparkles, MessageSquareCode, Linkedin, Twitter, ExternalLink, Timer, Play } from 'lucide-react';
import { MinaCharacter } from './components/MinaCharacter';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';
import { TechArchitecture } from './components/TechArchitecture';

/* --- SECTIONS --- */

const MinaOriginSection: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <ScrollReveal className="order-2 md:order-1 relative flex justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 relative">
                         <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                         <MinaCharacter className="w-full h-full relative z-10" />
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="order-1 md:order-2 space-y-8 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
                        < Ear size={14} />
                        <span>Intelligence Architect</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 leading-tight">
                        Meet <span className="text-tva-orange">Mina</span>.
                    </h2>
                    
                    <div className="space-y-6 text-base md:text-lg text-gray-500 font-light leading-relaxed">
                        <p>
                            Mina is the professional interface for your enterprise. By leveraging Natural Language Processing (NLP), she parses data streams—emails, logs, and reports—to extract intent and maintain operational flow.
                        </p>
                        <p>
                            She monitors the performance of your systems, ensuring your architecture remains optimized and resilient against market latency.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={() => setView('about')}
                            className="text-gray-900 font-bold text-sm border-b-2 border-tva-orange hover:text-tva-orange transition-colors pb-1"
                        >
                            Our Philosophy
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

/* --- PAGE COMPONENTS --- */

const HomeView: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
  <>
    <Hero setView={setView} />
    <ScrollReveal>
      <ServicesGrid setView={setView} />
    </ScrollReveal>
    <ScrollReveal>
      <TechArchitecture />
    </ScrollReveal>
    <ScrollReveal>
      <Timeline />
    </ScrollReveal>
    <MinaOriginSection setView={setView} />
    <ScrollReveal className="relative z-30">
      <Industries />
    </ScrollReveal>
    <ScrollReveal className="relative z-20">
      <section className="py-20 md:py-32 bg-tva-orange text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 tracking-tight">
              Ready to automate?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light">
              Join the companies using Time AI to secure their technical operations.
          </p>
          <div className="flex justify-center gap-4">
              <button 
                  onClick={() => setView('contact')}
                  className="px-8 py-4 md:px-10 md:py-5 bg-white text-tva-orange font-bold uppercase tracking-wide rounded-xl hover:bg-gray-50 transition-colors shadow-2xl hover:shadow-xl hover:-translate-y-1 transform duration-300 active:scale-95"
              >
              Get Started
              </button>
          </div>
          </div>
      </section>
    </ScrollReveal>
  </>
);

const SolutionsView: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => {
  return (
      <div className="min-h-screen bg-tva-dark">
          <ScrollReveal>
             <div className="pt-16">
                <ServicesGrid setView={setView} />
             </div>
          </ScrollReveal>
          <TechArchitecture />
      </div>
  );
};

const DemoView: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 text-center mb-12 md:mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full mb-6">
                    <Play size={12} className="text-tva-orange" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Demo</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-sans font-bold text-gray-900 mb-6 tracking-tight">
                    Live <span className="text-tva-orange">System Simulations</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    Interactive technical demonstrations of our autonomous agent patterns and high-velocity workflow architectures in real-time environments.
                </p>
            </div>
            <LiveDemos />
            <div className="mt-20 container mx-auto px-6">
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold">Custom Architecture for Your Stack?</h2>
                        <p className="text-gray-400 font-light text-lg">Every business logic is unique. Let's build your custom protocol.</p>
                    </div>
                    <a href="mailto:admin@time-ai.net" className="relative z-10 px-8 py-4 bg-tva-orange text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-orange-500/20 active:scale-95">
                        Schedule an Audit
                    </a>
                </div>
            </div>
        </div>
    );
};

/* --- ARTICLE READER COMPONENT --- */
const ArticleModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    const handleScroll = () => {
        if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setProgress(scrollPercentage);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <div 
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-4xl bg-white h-[90vh] md:h-[90vh] rounded-t-2xl md:rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative z-20">
                    <div className="absolute bottom-0 left-0 h-[2px] bg-tva-orange transition-all duration-150 ease-out z-50" style={{ width: `${progress}%` }}></div>
                    <div className="flex items-center gap-3 md:gap-4 flex-1 overflow-hidden">
                        <div className="p-2 bg-tva-orange/10 rounded-lg text-tva-orange shrink-0">
                            <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                <span>Record ID: {post.id}</span>
                            </div>
                            <h2 className="text-gray-900 font-bold whitespace-normal md:max-w-md text-sm md:text-base">{post.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                         <button className="hidden md:flex p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-tva-orange transition-colors">
                            <Printer size={18} />
                         </button>
                         <button className="hidden md:flex p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-tva-orange transition-colors">
                            <Share2 size={18} />
                         </button>
                         <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block"></div>
                         <button 
                            onClick={onClose}
                            className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                         >
                            <X size={24} />
                         </button>
                    </div>
                </div>

                <div 
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 md:p-12 font-serif scroll-smooth"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">
                                {post.category}
                            </span>
                             <span className="text-gray-400 text-xs font-mono">• {post.readTime}</span>
                        </div>
                        <h1 className="text-2xl md:text-5xl font-sans font-bold text-gray-900 mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8
                            prose-p:text-gray-600 prose-p:font-sans prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-gray-900 prose-strong:font-bold
                            prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-none prose-ul:pl-0
                            prose-li:pl-6 prose-li:relative
                            prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-8 prose-pre:border prose-pre:border-gray-800
                            prose-code:text-tva-orange prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-blockquote:border-l-4 prose-blockquote:border-tva-orange prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 md:prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                        ">
                            {post.content}
                        </div>
                    </div>
                </div>
                
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0 pb-6 md:pb-3">
                    <span>End of File</span>
                    <span className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Secure</span>
                </div>
            </div>
        </div>,
        document.body
    );
};

const IntelView: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(6);

    const categories = ['All', 'Strategy', 'Engineering', 'Case Study', 'Security'];

    const posts: BlogPost[] = [
        {
            id: 'SSH-TAILSCALE-2025',
            title: "Ubuntu SSH & Tailscale Setup Guide",
            excerpt: "Complete guide to enable SSH and setup Tailscale on Ubuntu Server for remote access without router configuration.",
            category: 'Engineering',
            date: "NOV 29, 2025",
            readTime: "12 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        This comprehensive guide will walk you through setting up SSH and Tailscale on your Ubuntu server, enabling secure remote access without complex router configurations.
                    </p>
                    
                    <h3>Why This Setup?</h3>
                    <ul>
                        <li><strong>SSH:</strong> Secure Shell protocol for remote server access.</li>
                        <li><strong>Tailscale:</strong> Zero-config VPN that creates a secure network between your devices.</li>
                        <li><strong>No Router Config:</strong> Bypass port forwarding and firewall complexities.</li>
                    </ul>

                    <h3>Prerequisites</h3>
                    <p>Before starting, ensure you have:</p>
                    <ul>
                        <li>Ubuntu 20.04 or newer installed</li>
                        <li>Sudo privileges on the server</li>
                        <li>Active internet connection</li>
                    </ul>

                    <h3>Method 1: Manual Step-by-Step Setup</h3>
                    
                    <p><strong>Step 1: Update System Packages</strong></p>
                    <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>
                    
                    <p><strong>Step 2: Install OpenSSH Server</strong></p>
                    <pre><code>sudo apt install openssh-server -y</code></pre>
                    
                    <p><strong>Step 3: Start and Enable SSH Service</strong></p>
                    <pre><code>sudo systemctl start ssh
sudo systemctl enable ssh</code></pre>
                    
                    <p><strong>Step 4: Configure Firewall for SSH</strong></p>
                    <pre><code>sudo ufw allow ssh
sudo ufw reload
sudo ufw status</code></pre>

                    <p><strong>Step 5: Configure SSH for Password Authentication</strong></p>
                    <p>Edit the SSH configuration file:</p>
                    <pre><code>sudo nano /etc/ssh/sshd_config</code></pre>
                    <p>Find and modify these lines:</p>
                    <pre><code>PasswordAuthentication yes
PermitRootLogin no</code></pre>
                    <blockquote><strong>Security note:</strong> Disabling root login and using password authentication for simplicity. For production, consider SSH keys.</blockquote>

                    <p><strong>Step 7: Install Tailscale</strong></p>
                    <pre><code>sudo apt-get update
sudo apt-get install curl -y
curl -fsSL https://tailscale.com/install.sh | sh</code></pre>
                    
                    <p><strong>Step 9: Connect to Tailscale Network</strong></p>
                    <pre><code>sudo tailscale up</code></pre>
                    <p>Follow the authentication link provided in the terminal to log in with your Tailscale account.</p>

                    <h3>Method 2: Automated Script Setup</h3>
                    <p>For quick deployment, use this automated bash script:</p>
                    <pre><code>{`#!/bin/bash
SUDOPASS="server1"
run_sudo() {
  echo "$SUDOPASS" | sudo -S "$@"
}
echo "=== Updating system ==="
run_sudo apt update && run_sudo apt upgrade -y
# ... rest of script ...`}</code></pre>

                    <h3>Troubleshooting</h3>
                    <p><strong>SSH Connection Refused:</strong> Check if SSH service is running using <code>sudo systemctl status ssh</code>.</p>
                    <p><strong>Tailscale Not Connecting:</strong> Verify Tailscale is running with <code>sudo systemctl status tailscaled</code>.</p>
                    
                    <h3>Security Best Practices</h3>
                    <ul>
                        <li><strong>Use SSH Keys:</strong> For production, disable password auth.</li>
                        <li><strong>Enable Fail2Ban:</strong> Automatically block repeated failed attempts.</li>
                        <li><strong>Monitor Logs:</strong> Check /var/log/auth.log regularly.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'RAG-2026',
            title: "How RAG Chatbots Reduce Support Load by 70%",
            excerpt: "Transforming internal knowledge bases into active conversation partners using Retrieval-Augmented Generation.",
            category: 'Engineering',
            date: "OCT 12, 2026",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        The search bar is dead. In the modern enterprise, employees waste an average of 1.8 hours daily looking for specific information buried in PDFs, SharePoint drives, and email chains.
                    </p>
                    <h3>The Hallucination Problem</h3>
                    <p>Early adoption of LLMs failed because generic models make things up. RAG changes the architecture by allowing the AI to 'read' your specific policy documents in real-time before answering, ensuring accuracy and citing sources.</p>
                </>
            )
        },
        {
            id: 'KG-VS-VEC',
            title: "Why Vector Databases Aren't Enough: Enter Knowledge Graphs",
            excerpt: "Vectors handle similarity, but Knowledge Graphs handle logic. Why you need both for enterprise reasoning.",
            category: 'Engineering',
            date: "OCT 20, 2026",
            readTime: "10 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Vector databases transformed search by allowing us to find "semantically similar" text. But they often miss causal relationships.
                    </p>
                    <h3>Structured Reasoning</h3>
                    <p>Knowledge Graphs (KGs) map entities and relationships logically. By combining RAG with KGs (GraphRAG), we allow the LLM to traverse these relationships ensuring multi-hop reasoning.</p>
                </>
            )
        },
        {
            id: 'SC-PREDICT',
            title: "Dynamic Supply Chain: Beating the Bullwhip Effect",
            excerpt: "How a global logistics firm used our forecasting models to predict shortages 14 days in advance.",
            category: 'Case Study',
            date: "SEP 28, 2026",
            readTime: "12 MIN READ",
            content: (
                 <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        The "Bullwhip Effect" destroys margins through oscillating ripples up the supply chain.
                    </p>
                    <h3>Temporal Fusion Transformers</h3>
                    <p>Time AI implemented a TFT model that ingested multi-modal signals including Google Trends and weather patterns to stabilize ordering cycles.</p>
                 </>
            )
        },
        {
            id: 'FINE-TUNE',
            title: "Fine-Tuning Llama 3 for Legal Compliance",
            excerpt: "Generic models are too chatty. Here is how we forced a model to speak 'Lawyer' with 99% syntax accuracy.",
            category: 'Engineering',
            date: "OCT 05, 2026",
            readTime: "15 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        RAG is for knowledge; Fine-Tuning is for behavior.
                    </p>
                    <p>We used LoRA to fine-tune Llama 3 on 5,000 successful contracts, resulting in a model that drafts with extreme precision.</p>
                </>
            )
        },
        {
            id: 'UI-GEN',
            title: "The End of Dashboards? Enter 'Active' UI",
            excerpt: "Why static charts are dying and how generative UI builds dashboards on the fly based on user intent.",
            category: 'Strategy',
            date: "SEP 15, 2026",
            readTime: "6 MIN READ",
            content: (
                <>
                     <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Active UI generates React components in real-time based on the executive's query, eliminating noise.
                    </p>
                </>
            )
        },
        {
            id: 'AGENT-FINTECH',
            title: "The ROI of Agentic Workflows in Fintech",
            excerpt: "Moving beyond 'chat' to 'action'. How autonomous agents are reconciling ledgers without human oversight.",
            category: 'Case Study',
            date: "AUG 22, 2026",
            readTime: "9 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Agents don't just talk; they execute transactions and reconcile accounts.
                    </p>
                </>
            )
        },
        {
            id: 'SEC-GENAI',
            title: "Security in the Age of Generative AI",
            excerpt: "Prompt injection, data leakage, and poisoning. How we harden enterprise LLM deployments.",
            category: 'Security',
            date: "NOV 01, 2026",
            readTime: "7 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        We deploy PII masking middleware and RBAC for vector stores to secure corporate intelligence.
                    </p>
                </>
            )
        },
        {
            id: 'HEALTH-HIPAA',
            title: "Healthcare: HIPAA-Compliant AI Architectures",
            excerpt: "Deploying generative AI in environments where privacy is paramount. A look at on-premise deployments.",
            category: 'Case Study',
            date: "JUL 15, 2026",
            readTime: "11 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Fully air-gapped solutions using open-weights models for automated note transcription.
                    </p>
                </>
            )
        },
        {
            id: 'LATENCY-KILLER',
            title: "Latency: The Silent Killer of AI Adoption",
            excerpt: "If your bot takes 5 seconds to reply, users will abandon it. Optimization techniques for sub-second inference.",
            category: 'Engineering',
            date: "JUN 30, 2026",
            readTime: "5 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Sub-400ms inference through speculative decoding and semantic caching.
                    </p>
                </>
            )
        },
        {
            id: 'MULTI-MODAL',
            title: "Multi-Modal AI: Beyond Text",
            excerpt: "Processing invoices, blueprints, and X-rays. Why 2027 is the year of 'Vision-Language Models'.",
            category: 'Strategy',
            date: "NOV 10, 2026",
            readTime: "6 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Ingesting schematics and video feeds to identify safety violations in real-time.
                    </p>
                </>
            )
        },
        {
            id: 'HITL-NECESSITY',
            title: "The 'Human-in-the-Loop' Necessity",
            excerpt: "Why fully autonomous AI is a myth for high-stakes decisions, and how to build efficient review interfaces.",
            category: 'Strategy',
            date: "MAY 12, 2026",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        AI suggests; humans decide. Every high-stakes transaction includes a review queue.
                    </p>
                </>
            )
        },
        {
            id: 'DSPY-PROMPT',
            title: "Prompt Engineering is Dead. Long Live DSPy.",
            excerpt: "Stop hand-writing prompts. Start compiling them. How we programmatically optimize LLM inputs.",
            category: 'Engineering',
            date: "AUG 05, 2026",
            readTime: "14 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Programmatically optimizing LLM instructions through automated compilation.
                    </p>
                </>
            )
        },
        {
            id: 'ONPREM-CLOUD',
            title: "On-Premise vs. Cloud AI: A CTO's Guide",
            excerpt: "Cost, control, and compliance. The framework we use to help Fortune 500s decide where to host.",
            category: 'Strategy',
            date: "APR 20, 2026",
            readTime: "10 MIN READ",
            content: (
                 <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        A detailed TCO analysis of renting GPU vs. capital expenditure on H100 clusters.
                    </p>
                </>
            )
        },
        {
            id: 'MANU-PREDICT',
            title: "Predictive Maintenance in Manufacturing",
            excerpt: "Listening to the vibrations of machines. How acoustic AI prevents million-dollar line stoppages.",
            category: 'Case Study',
            date: "MAR 15, 2026",
            readTime: "7 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Motors hum differently before they fail. We identify these spectrogram anomalies.
                    </p>
                </>
            )
        },
        {
            id: 'TOOL-CALLING',
            title: "From Chatbot to Actionbot",
            excerpt: "The architecture of agency. Connecting LLMs to REST APIs to perform CRUD operations safely.",
            category: 'Engineering',
            date: "FEB 28, 2026",
            readTime: "9 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Implementing the 'Sandbox Pattern' for safe database interaction via LLM.
                    </p>
                </>
            )
        }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-tva-dark pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-gray-900 mb-6 tracking-tight">
                        Intelligence <span className="text-tva-orange">Briefings</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                        Technical deep-dives, strategic reports, and engineering logs from the front lines of Enterprise AI.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
                    <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-lg overflow-x-auto max-w-full w-full lg:w-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                                className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all whitespace-nowrap flex-shrink-0 ${
                                    selectedCategory === cat 
                                        ? 'bg-tva-orange text-white shadow-md' 
                                        : 'text-gray-500 hover:text-tva-orange hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search archives..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-tva-orange transition-all"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {visiblePosts.map((post) => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-tva-orange/30 transition-all duration-500 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1 active:scale-95"
                        >
                            <div className="p-6 md:p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded border bg-gray-50 text-gray-600 border-gray-100">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-tva-orange transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow whitespace-normal">
                                    {post.excerpt}
                                </p>
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                                    <span className="text-tva-orange font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                        Access File <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < filteredPosts.length && (
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 hover:text-tva-orange transition-all shadow-sm rounded-lg active:scale-95"
                        >
                            Load Additional Records
                        </button>
                    </div>
                )}
            </div>

            {selectedPost && (
                <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};

const AboutView: React.FC = () => (
    <div className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-6 container mx-auto">
            <ScrollReveal className="text-center mb-16 md:mb-24">
                <h1 className="text-5xl md:text-8xl font-sans font-bold text-gray-900 mb-8 tracking-tighter">
                    Engineering <span className="text-tva-orange">Time</span>.
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
                    Transforming raw data into operational precision through the application of deep Natural Language Processing.
                </p>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-tva-orange text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-100">
                             <Sparkles size={12} /> The Mission
                        </div>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-gray-900">From Streams to Strategy.</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            Time AI Solutions is an AI Implementation partner based in Miami. We specialize in sub-second inference and autonomous workflows that turn dormant data into active, actionable insight. 
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-light font-mono text-sm border-l-2 border-tva-orange/20 pl-6 py-2">
                            PRIMARY_EMAIL: admin@time-ai.net
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            In a world of information overflow, we provide the filters. Our architecture is designed to identify the critical variance in your metrics before they escalate into operational bottlenecks.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                             <MessageSquareCode size={12} /> Technical Mastery
                        </div>
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-gray-900">Unstructured Mastery.</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            We are specialists in the application of Natural Language Processing for the enterprise. By bridging the gap between human communication and machine logic, we allow businesses to query their internal knowledge bases as naturally as asking a colleague.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            Whether it's Knowledge Graphs for causal reasoning or RAG pipelines for contextual memory, every system we deploy is hardened for high-stakes decisions and millisecond-level precision.
                        </p>
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
                    <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <ShieldCheck size={16} className="text-tva-orange" /> SOC2 COMPLIANT // SECURE ARCHITECTURE
                    </div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        ESTABLISHED 2024 // MIAMI, FLORIDA
                    </div>
                </div>
            </ScrollReveal>
        </section>
        
        <ScrollReveal className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                 <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">THE FUTURE IS NOW</p>
                 <div className="h-px w-24 bg-gray-200 mx-auto"></div>
            </div>
        </ScrollReveal>
    </div>
);

const ContactView: React.FC = () => {
    const [twitterPulse, setTwitterPulse] = useState(false);

    const handleTwitterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setTwitterPulse(true);
        setTimeout(() => setTwitterPulse(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 md:pt-32 pb-20 flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200 flex flex-col md:flex-row">
                    
                    {/* Branding Side */}
                    <div className="bg-tva-orange p-10 md:p-16 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden shrink-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                                <Clock size={24} className="text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Start a<br/>Project</h2>
                            <p className="text-white/80 font-light text-lg mb-8">
                                Ready to transform your data streams into operational velocity? Reach out directly via our strategy team.
                            </p>
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Primary Email</div>
                                <div className="text-lg font-mono font-bold truncate">admin@time-ai.net</div>
                            </div>
                        </div>
                        
                        <div className="relative z-10 pt-12">
                             <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                READY FOR AUDIT
                             </div>
                        </div>
                    </div>

                    {/* Interaction Side */}
                    <div className="p-10 md:p-16 bg-white flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">Direct Channels</h3>
                        
                        <div className="space-y-4">
                            <a 
                                href="mailto:admin@time-ai.net" 
                                className="group flex items-center gap-6 p-6 bg-gray-50 border border-gray-100 rounded-3xl hover:border-tva-orange/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-tva-orange rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-tva-orange transition-colors">Email Our Team</h4>
                                    <p className="text-gray-500 text-sm mt-1 font-mono">admin@time-ai.net</p>
                                </div>
                                <ExternalLink size={18} className="text-gray-300 group-hover:text-tva-orange transition-colors" />
                            </a>

                            <a 
                                href="https://www.linkedin.com/company/time-ai/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-6 p-6 bg-gray-50 border border-gray-100 rounded-3xl hover:border-tva-orange/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                                    <Linkedin size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-tva-orange transition-colors">Business Network</h4>
                                    <p className="text-gray-500 text-sm mt-1">Message Us on LinkedIn</p>
                                </div>
                                <ExternalLink size={18} className="text-gray-300 group-hover:text-tva-orange transition-colors" />
                            </a>

                            <button 
                                onClick={handleTwitterClick}
                                className={`group w-full flex items-center gap-6 p-6 bg-gray-50 border border-gray-100 rounded-3xl transition-all duration-300 relative overflow-hidden ${twitterPulse ? 'ring-2 ring-amber-400 border-amber-400' : 'hover:border-gray-300'}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 transition-all ${twitterPulse ? 'bg-amber-500 scale-105' : 'bg-gray-400 group-hover:bg-gray-500'}`}>
                                    <Twitter size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg md:text-xl font-bold text-gray-900">Technical Feed</h4>
                                        <span className="px-2 py-0.5 bg-gray-200 text-gray-500 text-[10px] font-black uppercase rounded tracking-widest">SOON</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">Follow Our Engineering Log</p>
                                </div>
                                
                                {twitterPulse && (
                                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 text-center animate-in fade-in duration-300">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
                                                <Timer size={16} className="animate-spin-slow" /> Synchronization...
                                            </div>
                                            <p className="text-gray-600 text-xs font-medium">Connection will be active in a future timeline.</p>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>

                        <div className="mt-12 flex items-center justify-center md:justify-start gap-3 opacity-40">
                            <div className="h-px w-8 bg-gray-300"></div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Miami // Zurich // London</span>
                            <div className="h-px w-8 bg-gray-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  return (
      <>
        <LoadingScreen onComplete={() => setIsLoading(false)} />
        {!isLoading && (
            <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-tva-orange selection:text-white overflow-x-hidden">
                <Header setView={setView} currentView={view} />
                <main className="relative">
                    <div key={view} className="animate-enter-view w-full min-h-screen">
                        {view === 'home' && <HomeView setView={setView} />}
                        {view === 'solutions' && <SolutionsView setView={setView} />}
                        {view === 'demo' && <DemoView />}
                        {view === 'intel' && <IntelView />}
                        {view === 'about' && <AboutView />}
                        {view === 'contact' && <ContactView />}
                    </div>
                </main>
                <Footer setView={setView} />
                <MinaAssistant currentView={view} />
            </div>
        )}
      </>
  );
};

export default App;
