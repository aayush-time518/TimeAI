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
import { CheckCircle, Mail, MapPin, Phone, FileText, ArrowRight, Ear, Loader2, AlertCircle, File, Search, Hash, Lock, Users, Zap, Target, Clock, X, Share2, Printer, Bookmark, Send, Code2, Cpu, GitBranch, AlertTriangle, TrendingUp, Layout, Database, Network, ShieldCheck, Bot, BrainCircuit, Box } from 'lucide-react';
import { MinaCharacter } from './components/MinaCharacter';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';
import { TechArchitecture } from './components/TechArchitecture';

/* --- SECTIONS --- */

const MinaOriginSection: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
    <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-20 items-center">
                <ScrollReveal className="order-2 md:order-1 relative flex justify-center">
                    <div className="w-64 h-64 relative">
                         <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                         <MinaCharacter className="w-full h-full relative z-10" />
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="order-1 md:order-2 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
                        <Ear size={14} />
                        <span>Always Listening</span>
                    </div>
                    
                    <h2 className="text-4xl font-sans font-bold text-gray-900 leading-tight">
                        Meet <span className="text-tva-orange">Mina</span>, your new Intelligence Architect.
                    </h2>
                    
                    <div className="space-y-6 text-lg text-gray-500 font-light leading-relaxed">
                        <p>
                            She isn't just a chatbot. Mina connects directly to your data streams—databases, APIs, and ERPs—to monitor variance in real-time.
                        </p>
                        <p>
                            While you sleep, she analyzes millions of data points to identify bottlenecks before they become revenue leaks.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={() => setView('about')}
                            className="text-gray-900 font-bold text-sm border-b-2 border-tva-orange hover:text-tva-orange transition-colors pb-1"
                        >
                            Read Our Origin Story
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
      <LiveDemos />
    </ScrollReveal>
    <ScrollReveal>
      <Timeline />
    </ScrollReveal>
    <MinaOriginSection setView={setView} />
    <ScrollReveal className="relative z-30">
      <Industries />
    </ScrollReveal>
    <ScrollReveal className="relative z-20">
      <section className="py-32 bg-tva-orange text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-sans font-bold text-white mb-8 tracking-tight">
              Unlock your data's potential.
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-xl mx-auto font-light">
              Join the Industry Leaders using Time AI to secure their future.
          </p>
          <div className="flex justify-center gap-4">
              <button 
                  onClick={() => setView('contact')}
                  className="px-10 py-5 bg-white text-tva-orange font-bold uppercase tracking-wide rounded-xl hover:bg-gray-50 transition-colors shadow-2xl hover:shadow-xl hover:-translate-y-1 transform duration-300"
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
             <div className="pt-10">
                <ServicesGrid setView={setView} />
             </div>
          </ScrollReveal>
          <TechArchitecture />
      </div>
  );
};

/* --- ARTICLE READER COMPONENT (WITH PORTAL) --- */
const ArticleModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // Prevent background scroll
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

    // Use React Portal to render outside of the app container
    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
            <div 
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-4xl bg-white h-full md:h-[90vh] md:rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                {/* Header Bar */}
                <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative z-20">
                     {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-tva-orange transition-all duration-150 ease-out z-50" style={{ width: `${progress}%` }}></div>

                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-tva-orange/10 rounded-lg text-tva-orange">
                            <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                <span>Record ID: {post.id}</span>
                            </div>
                            <h2 className="text-tva-cream font-bold truncate max-w-[200px] md:max-w-md">{post.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <button className="hidden md:flex p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-tva-orange transition-colors" title="Print Record">
                            <Printer size={18} />
                         </button>
                         <button className="hidden md:flex p-2 hover:bg-gray-100 rounded text-gray-400 hover:text-tva-orange transition-colors" title="Share Uplink">
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

                {/* Article Content */}
                <div 
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 md:p-12 font-serif scroll-smooth"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">
                                {post.category}
                            </span>
                             <span className="text-gray-400 text-xs font-mono">• {post.readTime}</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-sans font-bold text-tva-cream mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-sans prose-headings:font-bold prose-headings:text-tva-cream prose-headings:mt-8
                            prose-p:text-gray-600 prose-p:font-sans prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-tva-cream prose-strong:font-bold
                            prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-none prose-ul:pl-0
                            prose-li:pl-6 prose-li:relative
                            prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-8 prose-pre:border prose-pre:border-gray-800
                            prose-code:text-tva-orange prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-blockquote:border-l-4 prose-blockquote:border-tva-orange prose-blockquote:bg-blue-50/50 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                        ">
                            {post.content}
                        </div>
                    </div>
                </div>
                
                {/* Footer Status */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
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

    // EXPANDED BLOG CONTENT (15 Posts)
    const posts: BlogPost[] = [
        {
            id: 'RAG-2024',
            title: "How RAG Chatbots Reduce Support Load by 70%",
            excerpt: "Transforming internal knowledge bases into active conversation partners using Retrieval-Augmented Generation.",
            category: 'Engineering',
            date: "OCT 12, 2024",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        The search bar is dead. In the modern enterprise, employees waste an average of 1.8 hours daily looking for specific information buried in PDFs, SharePoint drives, and email chains. This isn't just an efficiency loss; it's a cognitive drain.
                    </p>
                    <h3>The Hallucination Problem</h3>
                    <p>Early adoption of LLMs failed because generic models make things up. You cannot have a finance bot "guessing" the Q3 revenue policy. This is where <strong>RAG</strong> changes the architecture.</p>
                    <div className="my-8 p-6 bg-blue-50 border-l-4 border-tva-orange relative overflow-hidden rounded-r-lg">
                         <h4 className="font-bold text-tva-orange text-xs uppercase tracking-widest mb-2 flex items-center gap-2"><AlertCircle size={12} /> Strategic Insight</h4>
                         <p className="text-sm text-gray-700 m-0 italic">"RAG allows the AI to 'read' your specific policy documents in real-time before answering, ensuring accuracy and citing sources."</p>
                    </div>
                </>
            )
        },
        {
            id: 'KG-VS-VEC',
            title: "Why Vector Databases Aren't Enough: Enter Knowledge Graphs",
            excerpt: "Vectors handle similarity, but Knowledge Graphs handle logic. Why you need both for enterprise reasoning.",
            category: 'Engineering',
            date: "OCT 20, 2024",
            readTime: "10 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Vector databases transformed search by allowing us to find "semantically similar" text. But when an executive asks, "How does the shortage in Taiwan affect our Q4 margins in Berlin?", a vector search fails. It finds documents about Taiwan and Berlin, but it misses the <em>causal relationship</em>.
                    </p>
                    <h3>Structured Reasoning</h3>
                    <p>Knowledge Graphs (KGs) map entities and relationships (Node -&gt; Edge -&gt; Node). By combining RAG with KGs (GraphRAG), we allow the LLM to traverse these relationships logically, ensuring multi-hop reasoning that flat text retrieval simply cannot support.</p>
                </>
            )
        },
        {
            id: 'SC-PREDICT',
            title: "Predictive Supply Chain: Beating the Bullwhip Effect",
            excerpt: "How a global logistics firm used our forecasting models to predict shortages 14 days in advance.",
            category: 'Case Study',
            date: "SEP 28, 2024",
            readTime: "12 MIN READ",
            content: (
                 <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        The "Bullwhip Effect" destroys margins. Small fluctuations in retail demand cause oscillating, amplifying ripples up the supply chain.
                    </p>
                    <h3>The Solution: Transformer-Based Forecasting</h3>
                    <p>Time AI implemented a <strong>Temporal Fusion Transformer (TFT)</strong> model. Unlike ARIMA, it ingested multi-modal signals including Google Trends data, Shipping Container pricing indices, and weather patterns.</p>
                 </>
            )
        },
        {
            id: 'FINE-TUNE',
            title: "Fine-Tuning Llama 3 for Legal Compliance",
            excerpt: "Generic models are too chatty. Here is how we forced a model to speak 'Lawyer' with 99% syntax accuracy.",
            category: 'Engineering',
            date: "OCT 05, 2024",
            readTime: "15 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        RAG is great for knowledge, but Fine-Tuning is essential for <em>behavior</em>. Our client needed an AI that could draft contracts in a specific, rigid tone.
                    </p>
                    <p>We curated a dataset of 5,000 successful contracts and used LoRA (Low-Rank Adaptation) to fine-tune Llama 3. The result was a model that didn't just know the law—it sounded like a partner at the firm.</p>
                </>
            )
        },
        {
            id: 'UI-GEN',
            title: "The End of Dashboards? Enter 'Active' UI",
            excerpt: "Why static charts are dying and how generative UI builds dashboards on the fly based on user intent.",
            category: 'Strategy',
            date: "SEP 15, 2024",
            readTime: "6 MIN READ",
            content: (
                <>
                     <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        The executive dashboard is a relic. We force humans to filter noise. Active UI flips the paradigm: the interface is blank until the user asks a question, at which point the AI generates the React component needed to answer it.
                    </p>
                </>
            )
        },
        {
            id: 'AGENT-FINTECH',
            title: "The ROI of Agentic Workflows in Fintech",
            excerpt: "Moving beyond 'chat' to 'action'. How autonomous agents are reconciling ledgers without human oversight.",
            category: 'Case Study',
            date: "AUG 22, 2024",
            readTime: "9 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Chatbots answer questions. Agents do work. We deployed a multi-agent swarm for a Fintech client to handle transaction reconciliation.
                    </p>
                    <h3>Tool Calling</h3>
                    <p>The agents were equipped with tools: <code>check_balance</code>, <code>flag_transaction</code>, and <code>email_customer</code>. Instead of asking a human to check the DB, the agent executed the SQL query itself, analyzed the variance, and drafted the resolution email for approval.</p>
                </>
            )
        },
        {
            id: 'SEC-GENAI',
            title: "Security in the Age of Generative AI",
            excerpt: "Prompt injection, data leakage, and poisoning. How we harden enterprise LLM deployments.",
            category: 'Security',
            date: "NOV 01, 2024",
            readTime: "7 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Your employees are pasting trade secrets into ChatGPT. That is a fact. The solution isn't to ban AI, but to deploy secure, private instances.
                    </p>
                    <p>We discuss PII masking middleware, RBAC (Role-Based Access Control) for vector stores, and how to prevent 'jailbreaking' of internal tools.</p>
                </>
            )
        },
        {
            id: 'HEALTH-HIPAA',
            title: "Healthcare: HIPAA-Compliant AI Architectures",
            excerpt: "Deploying generative AI in environments where privacy is paramount. A look at on-premise deployments.",
            category: 'Case Study',
            date: "JUL 15, 2024",
            readTime: "11 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Cloud APIs are a non-starter for patient data. We architected a fully air-gapped solution using open-weights models hosted on local H100 clusters.
                    </p>
                    <p>This ensured zero data egress while providing doctors with automated SOAP note transcription and coding.</p>
                </>
            )
        },
        {
            id: 'LATENCY-KILLER',
            title: "Latency: The Silent Killer of AI Adoption",
            excerpt: "If your bot takes 5 seconds to reply, users will abandon it. Optimization techniques for sub-second inference.",
            category: 'Engineering',
            date: "JUN 30, 2024",
            readTime: "5 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        We measured user sentiment against token-per-second (TPS) rates. The drop-off at 3 seconds is cliff-like.
                    </p>
                    <p>We utilize speculative decoding, KV-caching, and semantic caching (Redis) to serve 80% of queries in under 400ms.</p>
                </>
            )
        },
        {
            id: 'MULTI-MODAL',
            title: "Multi-Modal AI: Beyond Text",
            excerpt: "Processing invoices, blueprints, and X-rays. Why 2025 is the year of 'Vision-Language Models'.",
            category: 'Strategy',
            date: "NOV 10, 2024",
            readTime: "6 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Text is only 30% of enterprise data. The rest is locked in images, schematics, and video.
                    </p>
                    <p>We explore how Gemini 1.5 Pro allows us to ingest hour-long video feeds of manufacturing lines to detect safety violations in real-time.</p>
                </>
            )
        },
        {
            id: 'HITL-NECESSITY',
            title: "The 'Human-in-the-Loop' Necessity",
            excerpt: "Why fully autonomous AI is a myth for high-stakes decisions, and how to build efficient review interfaces.",
            category: 'Strategy',
            date: "MAY 12, 2024",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        AI should suggest, humans should decide. We build 'Confidence Scoring' into every agent. If the AI is less than 95% sure, it automatically routes the task to a human queue.
                    </p>
                </>
            )
        },
        {
            id: 'DSPY-PROMPT',
            title: "Prompt Engineering is Dead. Long Live DSPy.",
            excerpt: "Stop hand-writing prompts. Start compiling them. How we programmatically optimize LLM inputs.",
            category: 'Engineering',
            date: "AUG 05, 2024",
            readTime: "14 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Prompt engineering is brittle. A model update breaks your carefully crafted 'You are a helpful assistant' string.
                    </p>
                    <p>We use DSPy to treat prompts as optimization problems, compiling the best possible instructions based on a training set of desired outputs.</p>
                </>
            )
        },
        {
            id: 'ONPREM-CLOUD',
            title: "On-Premise vs. Cloud AI: A CTO's Guide",
            excerpt: "Cost, control, and compliance. The framework we use to help Fortune 500s decide where to host.",
            category: 'Strategy',
            date: "APR 20, 2024",
            readTime: "10 MIN READ",
            content: (
                 <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Cloud is easy, but On-Prem is cheap (at scale). We break down the TCO (Total Cost of Ownership) of renting GPU vs buying H100s for a 5-year horizon.
                    </p>
                </>
            )
        },
        {
            id: 'MANU-PREDICT',
            title: "Predictive Maintenance in Manufacturing",
            excerpt: "Listening to the vibrations of machines. How acoustic AI prevents million-dollar line stoppages.",
            category: 'Case Study',
            date: "MAR 15, 2024",
            readTime: "7 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Motors hum differently before they fail. We attached IoT acoustic sensors to a client's assembly line and trained a model on the spectrograms.
                    </p>
                </>
            )
        },
        {
            id: 'TOOL-CALLING',
            title: "From Chatbot to Actionbot",
            excerpt: "The architecture of agency. Connecting LLMs to REST APIs to perform CRUD operations safely.",
            category: 'Engineering',
            date: "FEB 28, 2024",
            readTime: "9 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Reading data is easy. Writing data is dangerous. We discuss the 'Sandbox Pattern' for allowing AI to execute transactions without breaking the database.
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
        <div className="min-h-screen bg-tva-dark pt-32 pb-20">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-gray-900 mb-6 tracking-tight">
                        Intelligence <span className="text-tva-orange">Briefings</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                        Technical deep-dives, strategic reports, and engineering logs from the front lines of Enterprise AI.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
                    {/* Categories */}
                    <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-lg overflow-x-auto max-w-full no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                                className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all whitespace-nowrap ${
                                    selectedCategory === cat 
                                        ? 'bg-tva-orange text-white shadow-md' 
                                        : 'text-gray-500 hover:text-tva-orange hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search archives..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-tva-orange focus:ring-1 focus:ring-tva-orange transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {visiblePosts.map((post, i) => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-tva-orange/30 transition-all duration-500 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                                        post.category === 'Engineering' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        post.category === 'Strategy' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        post.category === 'Security' ? 'bg-red-50 text-red-600 border-red-100' :
                                        'bg-green-50 text-green-600 border-green-100'
                                    }`}>
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tva-orange transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
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

                {/* Load More */}
                {visibleCount < filteredPosts.length && (
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 hover:text-tva-orange transition-all shadow-sm rounded-lg"
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
        <section className="pt-32 pb-20 px-6 container mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-gray-900 mb-8 tracking-tight">
                We Engineer <span className="text-tva-orange">Time</span>.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                Latency is the enemy of profit. We build the systems that help you win the race against time.
            </p>
        </section>
        
        <section className="py-20 bg-gray-50 border-y border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-5xl font-bold text-tva-orange mb-2">24h</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Setup Time</div>
                    </div>
                    <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-5xl font-bold text-tva-orange mb-2">150+</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Industry Leaders</div>
                    </div>
                    <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-5xl font-bold text-tva-orange mb-2">$2B</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Revenue Optimized</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

const ContactView: React.FC = () => (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                
                {/* Contact Info */}
                <div className="bg-tva-orange p-12 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-white/10 opacity-20"></div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Initialize Uplink</h2>
                            <p className="text-white/80 text-lg font-light">
                                Ready to eliminate variance? Our architects are standing by.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-white mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide opacity-80">Headquarters</h3>
                                    <p className="text-white">1200 Brickell Bay Dr, Suite 3400<br/>Miami, FL 33131</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-white mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide opacity-80">Secure Comms</h3>
                                    <p className="text-white">hello@timeai.solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 pt-12">
                         <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            ENCRYPTED
                         </div>
                    </div>
                </div>

                {/* Form */}
                <div className="p-12 bg-white">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Work Email</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="jane@company.com" />
                        </div>

                        <button className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-tva-orange transition-colors shadow-lg flex items-center justify-center gap-2 group">
                            Transmit Request <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

/* --- MAIN APP --- */

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  return (
      <>
        {isLoading ? (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
            <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-tva-orange selection:text-white overflow-x-hidden">
                <Header setView={setView} currentView={view} />
                
                <main className="relative">
                    {/* View Transition Wrapper */}
                    <div key={view} className="animate-enter-view w-full min-h-screen">
                        {view === 'home' && <HomeView setView={setView} />}
                        {view === 'solutions' && <SolutionsView setView={setView} />}
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