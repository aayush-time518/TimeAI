import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { Timeline } from './components/Timeline';
import { LiveDemos } from './components/LiveDemos';
import { Industries } from './components/Industries';
import { Footer } from './components/Footer';
import { MinaAssistant } from './components/MinaAssistant';
import { ViewState, BlogPost } from './types';
import { CheckCircle, Mail, MapPin, Phone, FileText, ArrowRight, Ear, Loader2, AlertCircle, File, Search, Hash, Lock, Users, Zap, Target, Clock, X, Share2, Printer, Bookmark, Send } from 'lucide-react';
import { MinaCharacter } from './components/MinaCharacter';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';

/* --- SECTIONS --- */

const MinaOriginSection: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
    <section className="py-20 bg-white border-y border-gray-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl -z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollReveal className="order-2 md:order-1 relative">
                    <div className="aspect-square max-w-sm mx-auto relative">
                        {/* Glowing backdrop for character */}
                        <div className="absolute inset-10 bg-blue-100/50 rounded-full blur-[60px] animate-pulse-slow"></div>
                        <MinaCharacter className="w-full h-full" />
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="order-1 md:order-2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-tva-amber/30 text-tva-amber text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                        <Ear size={14} />
                        <span>Active Monitoring</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-tva-cream leading-tight">
                        Why does she have <span className="text-tva-orange">ears?</span>
                    </h2>
                    
                    <div className="space-y-4 text-lg text-gray-600 font-sans leading-relaxed">
                        <p>
                            Meet <strong className="text-tva-orange">Mina</strong>, your AI Time Concierge. She isn't just a friendly face on your dashboard—she's a highly sophisticated listening device for your business data.
                        </p>
                        <p>
                            Those mechanical ears are tuned to the specific frequencies of your operational data. While you sleep, Mina listens to server logs, transaction flows, and API heartbeats.
                        </p>
                        <p className="border-l-4 border-tva-orange pl-4 italic text-gray-500">
                            "I hear the variance before it becomes a problem."
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            onClick={() => setView('about')}
                            className="text-tva-orange font-bold uppercase tracking-wide text-sm hover:text-blue-700 transition-colors flex items-center gap-2 group"
                        >
                            Read Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
    {/* Industries has z-30 to allow modals to float over the CTA Strip */}
    <ScrollReveal className="relative z-30">
      <Industries />
    </ScrollReveal>
    {/* CTA Strip has z-20 to stay below Industries dropdowns */}
    <ScrollReveal className="relative z-20">
      <section className="py-24 bg-tva-orange text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 bg-[size:20px_20px] opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-sans font-bold text-white mb-6 tracking-tight">
              Ready to optimize your timeline?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto font-sans">
              Join the organizations using Time AI to secure their future.
          </p>
          <div className="flex justify-center gap-4">
              <button 
                  onClick={() => setView('contact')}
                  className="px-8 py-4 bg-white text-tva-orange font-bold uppercase tracking-wide rounded-lg hover:bg-gray-50 transition-colors shadow-xl"
              >
              Contact Us Today
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
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-sans font-bold text-tva-cream mb-8">Deployment Architecture</h2>
                    <div className="max-w-4xl mx-auto bg-gray-50 p-8 border border-gray-200 rounded-xl relative overflow-hidden shadow-sm">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tva-orange via-tva-amber to-tva-orange animate-scan"></div>
                         <div className="grid md:grid-cols-3 gap-8 text-left">
                             <div>
                                 <h3 className="text-tva-orange font-bold mb-2 uppercase text-sm">Ingest</h3>
                                 <ul className="text-gray-600 text-sm space-y-2 font-mono">
                                     <li>• REST/GraphQL APIs</li>
                                     <li>• SQL/NoSQL DBs</li>
                                     <li>• Enterprise ERPs</li>
                                     <li>• IoT Streams</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="text-tva-orange font-bold mb-2 uppercase text-sm">Process</h3>
                                 <ul className="text-gray-600 text-sm space-y-2 font-mono">
                                     <li>• Kafka Event Bus</li>
                                     <li>• TensorFlow Clusters</li>
                                     <li>• Vector Stores</li>
                                     <li>• LLM Reasoning</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="text-tva-orange font-bold mb-2 uppercase text-sm">Act</h3>
                                 <ul className="text-gray-600 text-sm space-y-2 font-mono">
                                     <li>• Automated Webhooks</li>
                                     <li>• Slack/Teams Alerts</li>
                                     <li>• Dashboard Viz</li>
                                     <li>• Auto-Scaling</li>
                                 </ul>
                             </div>
                         </div>
                    </div>
                    
                     <div className="mt-12">
                        <p className="text-gray-500 font-medium mb-6">Need a custom configuration?</p>
                        <button onClick={() => setView('contact')} className="text-tva-orange font-bold uppercase tracking-widest hover:text-blue-700 transition-colors">Talk to an Architect</button>
                    </div>
                </div>
            </section>
          </ScrollReveal>
      </div>
  );
};

/* --- ARTICLE READER COMPONENT --- */
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
            <div 
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-4xl bg-white h-full md:h-[90vh] md:rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                {/* Header Bar */}
                <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative">
                     {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-tva-orange transition-all duration-150 ease-out z-50" style={{ width: `${progress}%` }}></div>

                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-tva-orange/10 rounded-lg text-tva-orange">
                            <FileText size={20} />
                        </div>
                        <div>
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
                        <span className="inline-block px-3 py-1 mb-6 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">
                            {post.category} // {post.readTime}
                        </span>
                        
                        <h1 className="text-3xl md:text-5xl font-sans font-bold text-tva-cream mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-sans prose-headings:font-bold prose-headings:text-tva-cream 
                            prose-p:text-gray-600 prose-p:font-sans prose-p:leading-relaxed
                            prose-strong:text-tva-cream prose-strong:font-bold
                            prose-ul:my-6 prose-ul:space-y-2
                            prose-li:marker:text-tva-orange
                            prose-pre:bg-gray-900 prose-pre:rounded-lg
                            prose-blockquote:border-l-4 prose-blockquote:border-tva-orange prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg
                            prose-a:text-tva-orange prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
                        ">
                            {/* Render content passed from props or fallback */}
                            {post.content || (
                                <>
                                    <p className="lead text-xl text-gray-500 border-l-4 border-tva-orange pl-4 italic">
                                        "Accessing restricted data blocks. Decrypting narrative..."
                                    </p>
                                    <p>
                                        In the modern enterprise, time is not merely a sequence of events; it is a resource that leaks through the cracks of legacy infrastructure. {post.excerpt}
                                    </p>
                                    <h3>The Variance Problem</h3>
                                    <p>
                                        Most organizations operate with a "Variance Lag" of 48-72 hours. This is the time between a critical event occurring (e.g., a supply chain disruption, a spike in API latency) and a decision-maker knowing about it. In high-frequency environments, 72 hours is an eternity. It is a Nexus Event that branches into lost revenue.
                                    </p>
                                    <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
                                        <p className="font-bold text-tva-orange text-xs uppercase tracking-widest mb-2">Strategic Insight</p>
                                        <p className="m-0 italic text-gray-600 text-sm">"At Time AI, we collapse this lag to near-zero. By deploying autonomous agents directly into the data stream, we don't just report on the past; we prune the future."</p>
                                    </div>
                                    <h3>Architectural Imperatives</h3>
                                    <ul>
                                        <li><strong>Decoupled Compute:</strong> Using Snowflake's separation of storage and compute to allow agents to query massive datasets without impacting production workloads.</li>
                                        <li><strong>Semantic Layers:</strong> Replacing rigid SQL schemas with flexible Knowledge Graphs that "understand" the business context of a query.</li>
                                        <li><strong>Edge Decisioning:</strong> Moving the decision logic from the centralized cloud to the edge devices where the data is born.</li>
                                    </ul>
                                    <p>
                                        The result is not just a faster dashboard. It is a self-healing organization that corrects course before the human operator even notices the drift.
                                    </p>
                                    <h3>Conclusion</h3>
                                    <p>
                                        The organizations that will dominate the next decade are not those with the most data, but those with the fastest "Time to Truth." It is time to stop analyzing history and start engineering the future.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer Status */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                    <span>End of File</span>
                    <span className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /> Secure</span>
                </div>
            </div>
        </div>
    );
};

const IntelView: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Strategy', 'Engineering', 'Case Study'];

    const posts: BlogPost[] = [
        {
            id: '1',
            title: "How RAG Chatbots Reduce Support Load",
            excerpt: "Transforming internal knowledge bases into active conversation partners using Retrieval-Augmented Generation.",
            category: 'Engineering',
            date: "OCT 12, 2024",
            readTime: "8 MIN READ",
            content: (
                <>
                    <p className="lead text-xl text-gray-600 font-sans border-b border-gray-100 pb-6 mb-8">
                        Traditional search bars are failing. Employees spend 20% of their time just looking for the right document.
                    </p>
                    
                    <h3>The Knowledge Gap</h3>
                    <p>
                        Your organization has the answers, but they are buried in PDFs, SharePoint drives, and email chains. Standard chatbots fail because they lack context.
                    </p>

                    <div className="my-8 p-6 bg-blue-50 border-l-2 border-tva-orange relative overflow-hidden rounded-r-lg">
                        <h4 className="font-bold text-tva-orange text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertCircle size={12} /> Strategic Insight
                        </h4>
                        <p className="text-sm text-gray-700 m-0 italic">
                            "RAG (Retrieval-Augmented Generation) allows the AI to 'read' your specific policy documents before answering, ensuring accuracy and citing sources."
                        </p>
                    </div>

                    <h3>Implementation Steps</h3>
                    <ul className="space-y-4 my-6">
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Vectorize Data:</strong> Convert your PDFs and docs into mathematical vectors.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Semantic Search:</strong> Use cosine similarity to find the exact paragraph needed.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tva-orange rounded-full shrink-0"></span>
                            <span><strong>Generate Response:</strong> Feed the context to the LLM to write a human-like answer.</span>
                        </li>
                    </ul>
                </>
            )
        },
        {
            id: '2',
            title: "Predictive Supply Chain: A Case Study",
            excerpt: "How a global logistics firm used our forecasting models to predict shortages 14 days in advance.",
            category: 'Case Study',
            date: "SEP 28, 2024",
            readTime: "12 MIN READ"
        },
        {
            id: '3',
            title: "The End of Dashboards? Enter 'Active' UI",
            excerpt: "Why static charts are dying and how generative UI builds dashboards on the fly based on user intent.",
            category: 'Strategy',
            date: "SEP 15, 2024",
            readTime: "6 MIN READ"
        },
        {
            id: '4',
            title: "Fine-Tuning Llama 3 for Finance",
            excerpt: "Technical deep dive into adapting open-source models for highly regulated financial environments.",
            category: 'Engineering',
            date: "AUG 30, 2024",
            readTime: "15 MIN READ"
        }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-tva-dark pt-24 pb-20">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-sans font-bold text-tva-cream mb-6 tracking-tight">
                        Intelligence <span className="text-tva-orange">Briefings</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-sans">
                        Strategies, technical breakdowns, and field reports from the front lines of Enterprise AI.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
                    {/* Categories */}
                    <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-lg overflow-x-auto max-w-full no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
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
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {filteredPosts.map((post, i) => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-tva-orange/30 transition-all duration-500 group cursor-pointer flex flex-col h-full"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                                        post.category === 'Engineering' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        post.category === 'Strategy' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        'bg-green-50 text-green-600 border-green-100'
                                    }`}>
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-tva-cream mb-3 group-hover:text-tva-orange transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                                    <span className="text-tva-orange font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                        Read File <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400" />
                        </div>
                        <h3 className="text-gray-900 font-bold mb-2">No Records Found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria.</p>
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
            <span className="inline-block p-2 bg-tva-orange/10 rounded-full text-tva-orange mb-6">
                <Users size={24} />
            </span>
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-tva-cream mb-6">
                We Engineer <span className="text-tva-orange">Time</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Time AI Solutions was founded on a single premise: Latency is the enemy of profit. We build the systems that help you win the race against time.
            </p>
        </section>
        
        <section className="py-20 bg-gray-50 border-y border-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-tva-orange mb-2">24h</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Setup Time</div>
                        <p className="text-sm text-gray-400 mt-2">From contract to live data ingestion.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-tva-orange mb-2">150+</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Enterprise Clients</div>
                        <p className="text-sm text-gray-400 mt-2">Across Logistics, Fintech, and Retail.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl font-bold text-tva-orange mb-2">$2B</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Revenue Optimized</div>
                        <p className="text-sm text-gray-400 mt-2">Total value delivered in 2024.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 px-6 container mx-auto max-w-4xl">
             <div className="prose prose-lg mx-auto">
                <h3>Our Mission</h3>
                <p>
                    We believe that the future of business is autonomous. The era of manual spreadsheets, Monday morning reporting meetings, and reactive decision-making is over. 
                </p>
                <p>
                    We build <strong>"Active Intelligence"</strong> systems—software that doesn't just show you a chart, but tells you what the chart means and what to do about it.
                </p>
             </div>
        </section>
    </div>
);

const ContactView: React.FC = () => (
    <div className="min-h-screen bg-tva-dark pt-24 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                
                {/* Contact Info */}
                <div className="bg-tva-cream p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-tva-orange/10 bg-[size:20px_20px] opacity-20"></div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Initialize Uplink</h2>
                            <p className="text-gray-400 text-lg">
                                Ready to eliminate variance? Our architects are standing by to audit your data infrastructure.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-tva-orange mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">Headquarters</h3>
                                    <p className="text-gray-300">1200 Brickell Bay Dr, Suite 3400<br/>Miami, FL 33131</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-tva-orange mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">Secure Comms</h3>
                                    <p className="text-gray-300">hello@timeai.solutions</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="text-tva-orange mt-1" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">Direct Line</h3>
                                    <p className="text-gray-300">+1 (305) 555-0123</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 mt-auto">
                            <div className="flex items-center gap-2 text-xs font-mono text-tva-orange">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                ENCRYPTED CHANNEL ACTIVE
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="p-12 bg-white">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Work Email</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all" placeholder="jane@company.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Type</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all">
                                <option>Predictive Forecasting</option>
                                <option>AI Chatbots / RAG</option>
                                <option>Anomaly Detection</option>
                                <option>General Consultation</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                            <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:border-tva-orange focus:ring-1 focus:ring-tva-orange outline-none transition-all h-32" placeholder="Tell us about your data infrastructure..."></textarea>
                        </div>

                        <button className="w-full bg-tva-orange text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 group">
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
            <div className="min-h-screen bg-tva-dark text-gray-900 font-sans selection:bg-tva-orange selection:text-white overflow-x-hidden">
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