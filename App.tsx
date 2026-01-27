import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { Timeline } from './components/Timeline';
import { LiveDemos } from './components/LiveDemos';
import { Industries } from './components/Industries';
import { Footer } from './components/Footer';
import { MinaAssistant } from './components/MinaAssistant';
import { ViewState, BlogPost } from './types';
import { CheckCircle, Mail, MapPin, Phone, FileText, ArrowRight, Ear, Loader2, AlertCircle, File, Search, Hash, Lock, Users, Zap, Target, Clock, X, Share2, Printer, Bookmark } from 'lucide-react';
import { MinaCharacter } from './components/MinaCharacter';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';

/* --- SECTIONS --- */

const MinaOriginSection: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
    <section className="py-20 bg-tva-panel border-y border-tva-orange/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-tva-orange/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tva-amber/5 rounded-full blur-3xl -z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal className="order-2 md:order-1 relative">
                    <div className="aspect-square max-w-sm mx-auto relative">
                        {/* Glowing backdrop for character */}
                        <div className="absolute inset-10 bg-tva-orange/20 rounded-full blur-[60px] animate-pulse-slow"></div>
                        <MinaCharacter className="w-full h-full" />
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="order-1 md:order-2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-tva-dark border border-tva-amber/30 text-tva-amber text-xs font-mono uppercase tracking-widest rounded-full">
                        <Ear size={14} />
                        <span>Active Listening Protocol</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-mono font-bold text-tva-cream leading-none">
                        WHY DOES SHE HAVE <span className="text-tva-orange text-glow">EARS?</span>
                    </h2>
                    
                    <div className="space-y-4 text-lg text-tva-cream/80 font-sans leading-relaxed">
                        <p>
                            Meet <strong className="text-tva-orange">Mina</strong>, your Time Concierge. She isn't just a friendly face on your dashboard—she's a highly sophisticated listening device for your business.
                        </p>
                        <p>
                            Those mechanical ears are tuned to the specific frequencies of your operational data. While you sleep, Mina listens to server logs, transaction flows, and API heartbeats.
                        </p>
                        <p className="border-l-4 border-tva-orange pl-4 italic text-tva-cream/60">
                            "I hear the variance before it becomes a problem."
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={() => setView('about')}
                            className="text-tva-orange font-mono uppercase tracking-widest text-sm hover:text-tva-cream transition-colors flex items-center gap-2 group"
                        >
                            Read Full Origin Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
    <MinaOriginSection setView={setView} />
    <ScrollReveal>
      <ServicesGrid setView={setView} />
    </ScrollReveal>
    <ScrollReveal>
      <Timeline />
    </ScrollReveal>
    <ScrollReveal>
      <LiveDemos />
    </ScrollReveal>
    <ScrollReveal>
      <Industries />
    </ScrollReveal>
    {/* CTA Strip */}
    <ScrollReveal>
      <section className="py-24 bg-tva-orange text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-tva-dark/10 bg-[size:20px_20px] opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-mono font-bold text-tva-dark mb-6 uppercase tracking-tighter">
              Is your timeline at risk?
          </h2>
          <p className="text-tva-dark/80 text-lg mb-8 max-w-xl mx-auto font-sans font-bold">
              Join the organizations using Time AI to secure their future.
          </p>
          <div className="flex justify-center gap-4">
              <button 
                  onClick={() => setView('contact')}
                  className="px-8 py-4 bg-tva-dark text-tva-cream font-mono font-bold uppercase tracking-wide rounded-sm hover:bg-tva-panel transition-colors shadow-2xl border border-tva-cream/20"
              >
              Open Case File
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
          {/* Removed extra pt-20 wrapper to let ServicesGrid control padding */}
          <ScrollReveal>
             <div className="pt-10">
                <ServicesGrid setView={setView} />
             </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <section className="py-20 bg-tva-panel border-t border-tva-orange/20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-mono font-bold text-tva-cream mb-8 uppercase">Deployment Architecture</h2>
                    <div className="max-w-4xl mx-auto bg-tva-dark p-8 border border-tva-cream/10 rounded-lg relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tva-orange via-tva-amber to-tva-orange animate-scan"></div>
                         <div className="grid md:grid-cols-3 gap-8 text-left">
                             <div>
                                 <h3 className="text-tva-orange font-mono font-bold mb-2 uppercase text-sm">Ingest</h3>
                                 <ul className="text-tva-cream/60 text-sm space-y-2 font-mono">
                                     <li>• REST/GraphQL APIs</li>
                                     <li>• SQL/NoSQL DBs</li>
                                     <li>• Enterprise ERPs</li>
                                     <li>• IoT Streams</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="text-tva-orange font-mono font-bold mb-2 uppercase text-sm">Process</h3>
                                 <ul className="text-tva-cream/60 text-sm space-y-2 font-mono">
                                     <li>• Kafka Event Bus</li>
                                     <li>• TensorFlow Clusters</li>
                                     <li>• Vector Stores</li>
                                     <li>• LLM Reasoning</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="text-tva-orange font-mono font-bold mb-2 uppercase text-sm">Act</h3>
                                 <ul className="text-tva-cream/60 text-sm space-y-2 font-mono">
                                     <li>• Automated Webhooks</li>
                                     <li>• Slack/Teams Alerts</li>
                                     <li>• Dashboard Viz</li>
                                     <li>• Auto-Scaling</li>
                                 </ul>
                             </div>
                         </div>
                    </div>
                    
                     <div className="mt-12">
                        <p className="text-tva-cream/60 font-mono mb-6">Need a custom configuration?</p>
                        <button onClick={() => setView('contact')} className="text-tva-orange underline underline-offset-4 font-mono uppercase tracking-widest hover:text-tva-cream transition-colors">Contact The Authority</button>
                    </div>
                </div>
            </section>
          </ScrollReveal>
      </div>
  );
};

/* --- ARTICLE READER COMPONENT --- */
const ArticleModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            <div 
                className="absolute inset-0 bg-tva-dark/95 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-4xl bg-tva-panel h-full md:h-[90vh] md:rounded-lg shadow-2xl border border-tva-cream/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                {/* Header Bar */}
                <div className="bg-tva-dark/50 p-4 border-b border-tva-orange/20 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-tva-orange/10 border border-tva-orange/30 rounded text-tva-orange">
                            <FileText size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-tva-orange/70">
                                <span>Record ID: {post.id}-XJ9</span>
                                <span className="w-1 h-1 bg-tva-cream/20 rounded-full"></span>
                                <span>Clearance: Level 4</span>
                            </div>
                            <h2 className="text-tva-cream font-mono font-bold truncate max-w-[200px] md:max-w-md">{post.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <button className="hidden md:flex p-2 hover:bg-tva-cream/5 rounded text-tva-cream/50 hover:text-tva-orange transition-colors" title="Print Record">
                            <Printer size={18} />
                         </button>
                         <button className="hidden md:flex p-2 hover:bg-tva-cream/5 rounded text-tva-cream/50 hover:text-tva-orange transition-colors" title="Share Uplink">
                            <Share2 size={18} />
                         </button>
                         <div className="w-px h-6 bg-tva-cream/10 mx-2 hidden md:block"></div>
                         <button 
                            onClick={onClose}
                            className="p-2 hover:bg-red-500/10 rounded text-tva-cream/50 hover:text-red-500 transition-colors"
                         >
                            <X size={24} />
                         </button>
                    </div>
                </div>

                {/* Article Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 font-serif">
                    <div className="max-w-3xl mx-auto">
                        <span className="inline-block px-3 py-1 mb-6 bg-tva-cream/5 border border-tva-cream/10 rounded-full text-xs font-mono text-tva-cream/60 uppercase tracking-wider">
                            {post.category} // {post.readTime}
                        </span>
                        
                        <h1 className="text-3xl md:text-5xl font-mono font-bold text-tva-cream mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-tva-orange 
                            prose-p:text-tva-cream/70 prose-p:font-sans prose-p:leading-relaxed
                            prose-strong:text-tva-cream prose-strong:font-bold
                            prose-ul:my-6 prose-ul:space-y-2
                            prose-li:marker:text-tva-orange
                            prose-pre:bg-tva-dark prose-pre:border prose-pre:border-tva-cream/10 prose-pre:rounded-sm
                            prose-blockquote:border-l-4 prose-blockquote:border-tva-orange prose-blockquote:bg-tva-orange/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-tva-cream/80 prose-blockquote:font-mono prose-blockquote:text-sm
                            prose-a:text-tva-amber prose-a:no-underline hover:prose-a:text-tva-orange hover:prose-a:underline
                        ">
                            {/* Render content passed from props or fallback */}
                            {post.content || (
                                <>
                                    <p className="lead text-xl text-tva-cream/90 border-l-4 border-tva-orange pl-4 italic">
                                        "Accessing restricted data blocks. Decrypting narrative..."
                                    </p>
                                    <p>
                                        In the modern enterprise, time is not merely a sequence of events; it is a resource that leaks through the cracks of legacy infrastructure. {post.excerpt}
                                    </p>
                                    <h3>// The Variance Problem</h3>
                                    <p>
                                        Most organizations operate with a "Variance Lag" of 48-72 hours. This is the time between a critical event occurring (e.g., a supply chain disruption, a spike in API latency) and a decision-maker knowing about it. In high-frequency environments, 72 hours is an eternity. It is a Nexus Event that branches into lost revenue.
                                    </p>
                                    <div className="bg-tva-dark p-6 border border-tva-orange/20 rounded-sm">
                                        <p className="font-mono text-tva-orange text-xs uppercase tracking-widest mb-2">Strategic Insight</p>
                                        <p className="m-0 italic text-tva-cream/80 text-sm">"At Time AI, we collapse this lag to near-zero. By deploying autonomous agents directly into the data stream, we don't just report on the past; we prune the future."</p>
                                    </div>
                                    <h3>// Architectural Imperatives</h3>
                                    <ul>
                                        <li><strong>Decoupled Compute:</strong> Using Snowflake's separation of storage and compute to allow agents to query massive datasets without impacting production workloads.</li>
                                        <li><strong>Semantic Layers:</strong> Replacing rigid SQL schemas with flexible Knowledge Graphs that "understand" the business context of a query.</li>
                                        <li><strong>Edge Decisioning:</strong> Moving the decision logic from the centralized cloud to the edge devices where the data is born.</li>
                                    </ul>
                                    <p>
                                        The result is not just a faster dashboard. It is a self-healing organization that corrects course before the human operator even notices the drift.
                                    </p>
                                    <h3>// Conclusion</h3>
                                    <p>
                                        The organizations that will dominate the next decade are not those with the most data, but those with the fastest "Time to Truth." It is time to stop analyzing history and start engineering the future.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer Status */}
                <div className="p-3 bg-tva-dark border-t border-tva-cream/10 flex justify-between items-center text-[10px] font-mono text-tva-cream/30 uppercase tracking-widest shrink-0">
                    <span>End of File</span>
                    <span className="animate-pulse">Connection Secure</span>
                </div>
            </div>
        </div>
    );
};

const IntelView: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const posts: BlogPost[] = [
        {
            id: '1',
            title: "The Snowflake Singularity: Merging Data Lakes",
            excerpt: "How to restructure your ELT pipeline to process 10TB+ daily without creating a 'Data Swamp'. A guide for modern data architects.",
            category: 'Engineering',
            date: "OCT 12, 2024",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-tva-cream/90 font-sans border-b border-tva-cream/10 pb-6 mb-8">
                        Data gravity is real. As your Snowflake environment scales, the gravitational pull of your data can either create a singularity of efficiency or a black hole of cost.
                    </p>
                    
                    <h3>// The Anomaly: Data Swamps</h3>
                    <p>
                        Traditional <strong className="text-tva-cream">ELT (Extract, Load, Transform)</strong> pipelines often dump raw JSON into variant columns and leave it there. This creates a "Data Swamp"—a murky repository where queries run slow, and costs run high. The variance between <em>ingest</em> and <em>insight</em> grows exponentially.
                    </p>

                    <div className="my-8 p-6 bg-tva-panel border-l-2 border-tva-orange relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-tva-orange to-transparent opacity-50"></div>
                        <h4 className="font-mono text-tva-orange text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertCircle size={12} /> Strategic Insight
                        </h4>
                        <p className="text-sm font-mono text-tva-cream/70 m-0 italic">
                            "If you cannot query your business state within 60 seconds of an event, you are essentially driving with a foggy windshield."
                        </p>
                    </div>

                    <h3>// The Protocol: Dynamic Tables</h3>
                    <p>
                        We recommend shifting to Snowflake's <strong>Dynamic Tables</strong> for continuous data engineering. Instead of scheduling rigid tasks, you define the "freshness" you need (e.g., 1 minute lag), and the engine handles the orchestration.
                    </p>
                    
                    <div className="relative group my-8">
                        <div className="absolute -top-3 left-4 px-2 bg-tva-dark text-[10px] font-mono text-tva-orange border border-tva-orange/30 rounded-sm">
                            SQL_PROTOCOL.sql
                        </div>
                        <pre className="!bg-tva-dark !p-6 !rounded-sm !border !border-tva-cream/10 !text-sm !font-mono overflow-x-auto shadow-inner">
                            <code className="language-sql text-tva-green">
{`CREATE OR REPLACE DYNAMIC TABLE automated_revenue
  TARGET_LAG = '1 minute'
  WAREHOUSE = compute_wh
AS
SELECT 
  product_id, 
  SUM(amount) as total_rev
FROM raw_transactions
GROUP BY product_id;`}
                            </code>
                        </pre>
                    </div>

                    <h3>// Implementation Steps</h3>
                    <ul className="space-y-4 my-6">
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Audit Ingest Streams:</strong> Identify high-velocity topics in Kafka/Redpanda that require near-real-time transformation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Define Lag Tolerances:</strong> Not every metric needs to be real-time. Tier your data into 'Hot' (1 min), 'Warm' (15 min), and 'Cold' (Daily).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Decommission Airflow DAGs:</strong> Replace brittle orchestration logic with declarative SQL definitions.</span>
                        </li>
                    </ul>

                    <p>
                        This approach reduces pipeline latency by <strong>90%</strong> and eliminates the need for complex maintenance.
                    </p>
                </>
            )
        },
        {
            id: '2',
            title: "Pruning the Latency Branch",
            excerpt: "Case Study: Reducing query times by 94% for a global logistics firm using Kafka streams and pre-computed vector embeddings.",
            category: 'Case Study',
            date: "SEP 28, 2024",
            readTime: "12 MIN READ"
        },
        {
            id: '3',
            title: "Agentic Workflows vs. Static Automation",
            excerpt: "Why standard RAG is failing your support team, and how neuro-symbolic agents provide the reasoning layer you're missing.",
            category: 'Strategy',
            date: "SEP 15, 2024",
            readTime: "15 MIN READ"
        },
        {
            id: '4',
            title: "Anomaly Detection in High-Frequency Trading",
            excerpt: "Implementing Isolation Forests to detect 'Black Swan' market events milliseconds before they impact the ledger.",
            category: 'Engineering',
            date: "AUG 30, 2024",
            readTime: "10 MIN READ"
        },
        {
            id: '5',
            title: "The Immortal Corporate Brain",
            excerpt: "Building a Knowledge Graph that allows new hires to access 20 years of institutional memory in seconds.",
            category: 'Strategy',
            date: "AUG 12, 2024",
            readTime: "6 MIN READ"
        },
        {
            id: '6',
            title: "Deploying Local LLMs on Edge Devices",
            excerpt: "A technical deep dive into quantizing Llama-3 models for secure, offline processing in sensitive environments.",
            category: 'Engineering',
            date: "JUL 22, 2024",
            readTime: "20 MIN READ"
        }
    ];

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-tva-orange/20 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-tva-orange text-xs font-mono uppercase tracking-widest">
                             <FileText size={14} />
                             <span>Declassified Records</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-mono font-bold text-tva-cream uppercase">Intel Database</h1>
                    </div>
                    
                    {/* Fake Search Interface */}
                    <div className="mt-6 md:mt-0 w-full md:w-1/3">
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="Search archives..." 
                                className="w-full bg-tva-panel border border-tva-cream/20 text-tva-cream pl-10 pr-4 py-2 font-mono text-sm focus:border-tva-orange focus:outline-none transition-colors"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tva-cream/30 group-focus-within:text-tva-orange transition-colors" size={16} />
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <ScrollReveal key={post.id} delay={index * 100}>
                        <div 
                            onClick={() => setSelectedPost(post)}
                            className="group bg-tva-panel border border-tva-cream/10 hover:border-tva-orange/50 transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg cursor-pointer relative overflow-hidden"
                        >
                            {/* Card Top Decor */}
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <Hash size={40} className="text-tva-dark rotate-12" />
                            </div>
                            
                            <div className="p-6 flex flex-col h-full relative z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-tva-dark border border-tva-cream/10 text-tva-orange rounded-sm">
                                        {post.category}
                                    </span>
                                    <span className="text-[10px] font-mono text-tva-cream/40">{post.date}</span>
                                </div>
                                
                                <h3 className="text-xl font-mono font-bold text-tva-cream mb-3 group-hover:text-tva-orange transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-tva-cream/60 text-sm font-sans leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                
                                <div className="border-t border-tva-cream/5 pt-4 flex justify-between items-center">
                                    <span className="text-xs font-mono text-tva-cream/30 flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                    <span className="text-tva-orange text-xs font-mono uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read File <ArrowRight size={12} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
            
            <div className="mt-16 text-center">
                 <p className="text-tva-cream/30 font-mono text-xs uppercase tracking-widest mb-4">// End of Declassified Section //</p>
                 <button className="px-6 py-2 border border-tva-cream/20 text-tva-cream/50 hover:text-tva-orange hover:border-tva-orange transition-colors font-mono uppercase text-sm">
                     Request Higher Clearance for More Records
                 </button>
            </div>

            {/* Article Modal */}
            {selectedPost && (
                <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};

const AboutView: React.FC = () => (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
        <ScrollReveal>
          <div className="mb-16 border-l-4 border-tva-orange pl-6">
             <div className="text-tva-orange font-mono text-sm uppercase tracking-widest mb-2">Bureau of Timeline Integrity</div>
             <h1 className="text-5xl md:text-6xl font-mono font-bold text-tva-cream uppercase mb-4">The Archivists</h1>
             <p className="text-xl text-tva-cream/70 font-sans max-w-2xl">
                 We are not consultants. We are custodians of efficiency. Our mission is to protect your organization's future from the entropy of the present.
             </p>
          </div>
        </ScrollReveal>
        
        {/* Core Directives */}
        <ScrollReveal>
             <div className="grid md:grid-cols-3 gap-8 mb-24">
                 <div className="bg-tva-panel p-8 border border-tva-cream/10 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-tva-orange/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                     <Zap className="text-tva-orange w-10 h-10 mb-4 relative z-10" />
                     <h3 className="text-xl font-mono font-bold text-tva-cream uppercase mb-3 relative z-10">Velocity</h3>
                     <p className="text-tva-cream/60 text-sm font-sans relative z-10">
                         Time is the only non-renewable asset. We optimize for speed of decision, speed of execution, and speed of data retrieval.
                     </p>
                 </div>
                 <div className="bg-tva-panel p-8 border border-tva-cream/10 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-tva-green/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                     <Target className="text-tva-green w-10 h-10 mb-4 relative z-10" />
                     <h3 className="text-xl font-mono font-bold text-tva-cream uppercase mb-3 relative z-10">Precision</h3>
                     <p className="text-tva-cream/60 text-sm font-sans relative z-10">
                         Variance is the enemy. Our predictive models aim for 99.9% accuracy, ensuring your strategy is built on bedrock, not sand.
                     </p>
                 </div>
                 <div className="bg-tva-panel p-8 border border-tva-cream/10 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-tva-amber/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                     <Lock className="text-tva-amber w-10 h-10 mb-4 relative z-10" />
                     <h3 className="text-xl font-mono font-bold text-tva-cream uppercase mb-3 relative z-10">Security</h3>
                     <p className="text-tva-cream/60 text-sm font-sans relative z-10">
                         Your data is your timeline's DNA. We deploy enterprise-grade governance and isolation protocols to keep it pristine.
                     </p>
                 </div>
             </div>
        </ScrollReveal>

        {/* Personnel Database */}
        <ScrollReveal>
             <div className="mb-24">
                 <h2 className="text-2xl font-mono font-bold text-tva-cream uppercase mb-8 flex items-center gap-2">
                     <Users className="text-tva-orange" /> Personnel Database
                 </h2>
                 <div className="grid md:grid-cols-4 gap-6">
                     {[1, 2, 3, 4].map((i) => (
                         <div key={i} className="bg-tva-dark border border-tva-panel p-4 flex flex-col items-center text-center hover:border-tva-orange/50 transition-colors group">
                             <div className="w-24 h-24 bg-tva-panel rounded-full mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                 {/* Placeholder Avatar - in real app, use img */}
                                 <div className="absolute inset-0 flex items-center justify-center text-tva-cream/10">
                                     <Users size={40} />
                                 </div>
                             </div>
                             <div className="w-full h-px bg-gradient-to-r from-transparent via-tva-orange/50 to-transparent mb-3"></div>
                             <h4 className="text-tva-cream font-mono font-bold uppercase text-sm">Agent {['X', 'Y', 'Z', 'V'][i-1]}</h4>
                             <span className="text-xs text-tva-orange font-mono uppercase tracking-wider mb-2">
                                 {['Lead Architect', 'Data Strategist', 'ML Ops Lead', 'Security Chief'][i-1]}
                             </span>
                             <p className="text-[10px] text-tva-cream/40 font-mono">
                                 CLEARANCE LEVEL: {5-i}
                             </p>
                         </div>
                     ))}
                 </div>
             </div>
        </ScrollReveal>

        {/* Detailed Story Section for Mina */}
        <ScrollReveal>
          <div className="border-t border-tva-orange/20 pt-16">
              <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/3">
                      {/* Character instance for visual context */}
                      <div className="w-64 h-64 mx-auto relative group">
                           <div className="absolute inset-0 bg-tva-orange/20 blur-xl rounded-full group-hover:bg-tva-orange/30 transition-all"></div>
                           <MinaCharacter className="w-full h-full" />
                      </div>
                  </div>
                  <div className="w-full md:w-2/3">
                      <div className="inline-block px-2 py-1 bg-tva-orange/10 border border-tva-orange/30 text-tva-orange text-[10px] font-mono uppercase tracking-widest mb-4">
                          Subject 89P13
                      </div>
                      <h2 className="text-3xl font-mono font-bold text-tva-cream mb-6 uppercase">
                          The Origin of <span className="text-tva-orange">Mina</span>
                      </h2>
                      
                      <div className="space-y-4 text-tva-cream/80 font-sans leading-relaxed text-lg border-l-2 border-tva-panel pl-6">
                          <p>
                              Mina wasn't just coded; she was forged from the necessity of lost time. In the chaotic early days of data analytics, we saw brilliant businesses drowning in "Variance"—the gap between what was planned and what actually happened.
                          </p>
                          <p>
                              We built Mina to be the Guardian of the Timeline. Her spinning hands don't just tell time; they synchronize it across your entire organization.
                          </p>
                          <p>
                              <strong className="text-tva-orange">Her ears?</strong> They aren't just for show. They are constantly "listening" to the data streams of our clients—monitoring server logs, API calls, and transaction flows. When she hears a discrepancy, our <strong className="text-tva-cream">AI Agents</strong> spring into action to prune the error before it affects your bottom line. She is the face of our always-on, vigilant protection services.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </ScrollReveal>
    </div>
);

const ContactView: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Identity Required";
        if (!formData.email.trim()) {
            newErrors.email = "Frequency Required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid Frequency Format";
        }
        if (!formData.message.trim()) newErrors.message = "Variance Description Required";
        else if (formData.message.length < 10) newErrors.message = "Description too short (min 10 chars)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('submitting');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus('success');
    };

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
            <ScrollReveal>
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-mono font-bold text-tva-orange mb-4 uppercase">Open Case File</h1>
                        <p className="text-tva-cream/60 font-mono">Submit your variance report. An agent will be assigned shortly.</p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-tva-panel p-6 border border-tva-orange/20 text-center">
                            <Mail className="mx-auto text-tva-orange mb-4" />
                            <h3 className="text-tva-cream font-mono font-bold mb-2">Signal</h3>
                            <p className="text-tva-cream/50 text-sm">hello@timeai.com</p>
                        </div>
                        <div className="bg-tva-panel p-6 border border-tva-orange/20 text-center">
                            <Phone className="mx-auto text-tva-orange mb-4" />
                            <h3 className="text-tva-cream font-mono font-bold mb-2">Wire</h3>
                            <p className="text-tva-cream/50 text-sm">+1 (555) TVA-HELP</p>
                        </div>
                        <div className="bg-tva-panel p-6 border border-tva-orange/20 text-center">
                            <MapPin className="mx-auto text-tva-orange mb-4" />
                            <h3 className="text-tva-cream font-mono font-bold mb-2">Nexus</h3>
                            <p className="text-tva-cream/50 text-sm">Brickell Ave, Miami FL</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-tva-panel border-2 border-tva-orange/50 p-8 rounded-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-xs font-mono text-tva-orange/50 uppercase border-b border-l border-tva-orange/20 bg-tva-dark">Form 87-B</div>
                        
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-tva-green/20 rounded-full flex items-center justify-center border-2 border-tva-green">
                                    <CheckCircle className="w-12 h-12 text-tva-green" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-mono font-bold text-tva-cream uppercase mb-2">Transmission Received</h3>
                                    <p className="text-tva-cream/60 font-mono max-w-md">
                                        Your case file has been logged in the Sacred Timeline. 
                                        <br/>
                                        <span className="text-tva-orange">Case ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                    </p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setStatus('idle');
                                        setFormData({ name: '', email: '', message: '' });
                                    }}
                                    className="px-6 py-2 border border-tva-cream/20 hover:bg-tva-cream/5 text-tva-cream font-mono uppercase text-sm transition-colors"
                                >
                                    File Another Report
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="animate-in fade-in">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-tva-cream/70 font-mono text-xs uppercase tracking-wider mb-2">Identity (Name)</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({...formData, name: e.target.value});
                                                if(errors.name) setErrors({...errors, name: ''});
                                            }}
                                            className={`w-full bg-tva-dark border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-tva-cream/20 focus:border-tva-orange'} text-tva-cream p-3 focus:outline-none font-mono transition-colors`}
                                            placeholder="Enter full designation..."
                                        />
                                        {errors.name && <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-mono"><AlertCircle size={10} /> {errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-tva-cream/70 font-mono text-xs uppercase tracking-wider mb-2">Frequency (Email)</label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({...formData, email: e.target.value});
                                                if(errors.email) setErrors({...errors, email: ''});
                                            }}
                                            className={`w-full bg-tva-dark border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-tva-cream/20 focus:border-tva-orange'} text-tva-cream p-3 focus:outline-none font-mono transition-colors`}
                                            placeholder="quantum@timeline.net"
                                        />
                                        {errors.email && <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-mono"><AlertCircle size={10} /> {errors.email}</div>}
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <label className="block text-tva-cream/70 font-mono text-xs uppercase tracking-wider mb-2">Variance Description (Message)</label>
                                    <textarea 
                                        rows={4} 
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({...formData, message: e.target.value});
                                            if(errors.message) setErrors({...errors, message: ''});
                                        }}
                                        className={`w-full bg-tva-dark border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-tva-cream/20 focus:border-tva-orange'} text-tva-cream p-3 focus:outline-none font-mono transition-colors`}
                                        placeholder="Describe the anomaly..."
                                    ></textarea>
                                    {errors.message && <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-mono"><AlertCircle size={10} /> {errors.message}</div>}
                                </div>

                                <button 
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 bg-tva-orange text-tva-dark font-mono font-bold uppercase tracking-widest hover:bg-tva-amber transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Transmitting...
                                        </>
                                    ) : (
                                        <>
                                            <FileText size={18} /> Submit to Authority
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

/* --- MAIN APP --- */

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-tva-dark text-tva-cream font-sans selection:bg-tva-orange selection:text-tva-dark flex flex-col animate-in fade-in duration-700">
      <Header setView={setView} currentView={view} />
      
      <main className="flex-grow">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'solutions' && <SolutionsView setView={setView} />}
        {view === 'intel' && <IntelView />}
        {view === 'about' && <AboutView />}
        {view === 'contact' && <ContactView />}
      </main>
      
      <Footer setView={setView} />
      <MinaAssistant />
    </div>
  );
}

export default App;