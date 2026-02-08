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
import { CheckCircle, FileText, ArrowRight, Ear, Loader2, Search, Clock, X, Share2, Printer, Target, Play, ShieldCheck, Sparkles, MessageSquareCode, Linkedin, Twitter, ExternalLink, Timer, MessageSquare } from 'lucide-react';
import { MinaCharacter } from './components/MinaCharacter';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';
import { TechArchitecture } from './components/TechArchitecture';
import { posts } from './data/blogPosts';
import { MarkdownRenderer } from './components/MarkdownRenderer';

/* --- SECTIONS --- */

const MinaOriginSection: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <ScrollReveal className="order-2 md:order-1 relative flex justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 relative">
                         <div className="absolute inset-0 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
                         <MinaCharacter className="w-full h-full relative z-10" />
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} className="order-1 md:order-2 space-y-8 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                        < Ear size={14} />
                        <span>Intelligence Architect</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-sans font-black text-gray-900 leading-tight">
                        Meet <span className="text-gray-900">Mina</span>.
                    </h2>
                    
                    <div className="space-y-6 text-base md:text-lg text-gray-800 font-semibold leading-relaxed">
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
                            className="text-gray-900 font-black text-sm border-b-2 border-gray-700 hover:text-gray-700 transition-colors pb-1"
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
      <section className="py-20 md:py-32 bg-gray-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans font-black text-white mb-8 tracking-tight">
              Ready to automate?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-12 max-w-xl mx-auto font-semibold">
              Join the companies using Time AI to secure their technical operations.
          </p>
          <div className="flex justify-center gap-4">
              <button 
                  onClick={() => setView('contact')}
                  className="px-8 py-4 md:px-10 md:py-5 bg-white text-gray-900 font-black uppercase tracking-wide rounded-xl hover:bg-gray-100 transition-colors shadow-2xl hover:shadow-xl hover:-translate-y-1 transform duration-300 active:scale-95"
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
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20">
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
        <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 text-center mb-12 md:mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-full mb-6 shadow-sm">
                    <Play size={12} className="text-gray-700" />
                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.2em]">Demo</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-sans font-black text-gray-900 mb-6 tracking-tight">
                    Live <span className="text-gray-900">System Simulations</span>
                </h1>
                <p className="text-lg text-gray-900 max-w-2xl mx-auto font-semibold leading-relaxed">
                    Interactive technical demonstrations of our autonomous agent patterns and high-velocity workflow architectures in real-time environments.
                </p>
            </div>
            <LiveDemos />
            <div className="mt-20 container mx-auto px-6">
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-2xl md:text-3xl font-black">Custom Architecture for Your Stack?</h2>
                        <p className="text-white/90 font-semibold text-lg">Every business logic is unique. Let's build your custom protocol.</p>
                    </div>
                    <a href="mailto:admin@time-ai.net" className="relative z-10 px-8 py-4 bg-gray-900 text-white font-black rounded-xl hover:bg-gray-800 hover:scale-105 transition-transform shadow-lg shadow-gray-900/20 active:scale-95">
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
                className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-4xl bg-white h-[90vh] md:h-[90vh] rounded-t-2xl md:rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                <div className="bg-white p-5 border-b-2 border-gray-300 flex items-center justify-between shrink-0 relative z-20 shadow-sm">
                    <div className="absolute bottom-0 left-0 h-[3px] bg-gray-900 transition-all duration-150 ease-out z-50" style={{ width: `${progress}%` }}></div>
                    <div className="flex items-center gap-3 md:gap-4 flex-1 overflow-hidden">
                        <div className="p-3 bg-gray-100 rounded-xl border border-gray-300 text-gray-900 shrink-0 shadow-sm">
                            <FileText size={22} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-700">
                                <span>Record ID: {post.id}</span>
                            </div>
                            <h2 className="text-gray-900 font-black whitespace-normal md:max-w-md text-sm md:text-base">{post.title}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                         <button className="hidden md:flex p-2.5 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-gray-900 transition-all hover:scale-110 active:scale-95">
                            <Printer size={18} />
                         </button>
                         <button className="hidden md:flex p-2.5 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-gray-900 transition-all hover:scale-110 active:scale-95">
                            <Share2 size={18} />
                         </button>
                         <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
                         <button 
                            onClick={onClose}
                            className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-900 transition-all hover:scale-110 active:scale-95"
                         >
                            <X size={24} />
                         </button>
                    </div>
                </div>

                <div 
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-8 md:p-14 font-sans scroll-smooth bg-white"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <span className="inline-block px-4 py-1.5 bg-gray-100 border-2 border-gray-300 rounded-full text-xs font-black text-gray-900 uppercase tracking-wider shadow-sm">
                                {post.category}
                            </span>
                             <span className="text-gray-800 text-xs font-mono font-black">• {post.readTime}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-sans font-black text-gray-900 mb-10 leading-tight tracking-tight">
                            {post.title}
                        </h1>
                        <MarkdownRenderer content={post.markdown || ''} />
                    </div>
                </div>
                
                <div className="p-4 bg-white border-t-2 border-gray-300 flex justify-between items-center text-[10px] font-black text-gray-900 uppercase tracking-widest shrink-0 pb-6 md:pb-4 shadow-sm">
                    <span className="text-gray-900">End of File</span>
                    <span className="flex items-center gap-2 text-gray-900"><CheckCircle size={12} className="text-gray-900" /> Secure</span>
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

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-sans font-black text-gray-900 mb-6 tracking-tight">
                        Intelligence <span className="text-gray-900">Briefings</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-900 max-w-2xl mx-auto font-black">
                        Technical deep-dives, strategic reports, and engineering logs from the front lines of Enterprise AI.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 max-w-5xl mx-auto">
                    <div className="flex gap-2 p-1 bg-white border border-gray-300 rounded-lg overflow-x-auto max-w-full w-full lg:w-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                                className={`px-4 py-2 text-xs font-black uppercase rounded-md transition-all whitespace-nowrap flex-shrink-0 ${
                                    selectedCategory === cat 
                                        ? 'bg-gray-900 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search archives..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-all"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {visiblePosts.map((post) => (
                        <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="bg-white border border-gray-300 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-400 transition-all duration-500 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1 active:scale-95"
                        >
                            <div className="p-6 md:p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded border bg-gray-100 text-gray-900 border-gray-300">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-600 font-mono font-semibold flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-3 group-hover:text-gray-700 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow whitespace-normal font-semibold">
                                    {post.excerpt}
                                </p>
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-600 font-semibold">{post.date}</span>
                                    <span className="text-gray-900 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
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
                            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-black uppercase tracking-widest text-xs hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm rounded-lg active:scale-95"
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
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20">
        <section className="pt-32 pb-20 px-6 container mx-auto">
            <ScrollReveal className="text-center mb-16 md:mb-24">
                <h1 className="text-5xl md:text-8xl font-sans font-black text-gray-900 mb-8 tracking-tighter">
                    Engineering <span className="text-gray-900">Time</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-semibold">
                    Transforming raw data into operational precision through the application of deep Natural Language Processing.
                </p>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-300">
                             <Sparkles size={12} /> The Mission
                        </div>
                        <h2 className="text-2xl md:text-3xl font-sans font-black text-gray-900">From Streams to Strategy.</h2>
                        <p className="text-lg text-gray-800 leading-relaxed font-semibold">
                            Time AI Solutions is an AI Implementation partner based in Miami. We specialize in sub-second inference and autonomous workflows that turn dormant data into active, actionable insight. 
                        </p>
                        <p className="text-lg text-gray-800 leading-relaxed font-semibold font-mono text-sm border-l-2 border-gray-400 pl-6 py-2">
                            PRIMARY_EMAIL: admin@time-ai.net
                        </p>
                        <p className="text-lg text-gray-800 leading-relaxed font-semibold">
                            In a world of information overflow, we provide the filters. Our architecture is designed to identify the critical variance in your metrics before they escalate into operational bottlenecks.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-300">
                             <MessageSquareCode size={12} /> Technical Mastery
                        </div>
                        <h2 className="text-2xl md:text-3xl font-sans font-black text-gray-900">Unstructured Mastery.</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            We are specialists in the application of Natural Language Processing for the enterprise. By bridging the gap between human communication and machine logic, we allow businesses to query their internal knowledge bases as naturally as asking a colleague.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            Whether it's Knowledge Graphs for causal reasoning or RAG pipelines for contextual memory, every system we deploy is hardened for high-stakes decisions and millisecond-level precision.
                        </p>
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4 text-gray-800 text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldCheck size={16} className="text-gray-900" /> SOC2 COMPLIANT // SECURE ARCHITECTURE
                    </div>
                    <div className="text-gray-800 text-[10px] font-black uppercase tracking-[0.2em]">
                        ESTABLISHED 2024 // MIAMI, FLORIDA
                    </div>
                </div>
            </ScrollReveal>
        </section>
        
        <ScrollReveal className="py-24 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                 <p className="text-sm font-black text-gray-800 uppercase tracking-[0.3em] mb-4">THE FUTURE IS NOW</p>
                 <div className="h-px w-24 bg-gray-200 mx-auto"></div>
            </div>
        </ScrollReveal>
    </div>
);

const ContactView: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 pt-28 md:pt-32 pb-20 flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-300 flex flex-col md:flex-row">
                    
                    {/* Branding Side */}
                    <div className="bg-gray-900 p-10 md:p-16 text-white md:w-2/5 flex flex-col justify-between relative overflow-hidden shrink-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
                                <Clock size={24} className="text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Start a<br/>Project</h2>
                            <p className="text-white/90 font-semibold text-lg mb-8">
                                Ready to transform your data streams into operational velocity? Reach out directly via our strategy team.
                            </p>
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Primary Email</div>
                                <div className="text-lg font-mono font-bold truncate">admin@time-ai.net</div>
                            </div>
                        </div>
                        
                        <div className="relative z-10 pt-12">
                             <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                READY FOR AUDIT
                             </div>
                        </div>
                    </div>

                    {/* Interaction Side */}
                    <div className="p-10 md:p-16 bg-white flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-gray-700 text-xs font-black uppercase tracking-[0.3em] mb-8">Direct Channels</h3>
                        
                        <div className="space-y-4">
                            <a 
                                href="mailto:admin@time-ai.net" 
                                className="group flex items-center gap-6 p-6 bg-white border border-gray-300 rounded-3xl hover:border-gray-400 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-gray-900/20 group-hover:scale-110 transition-transform">
                                    <MessageSquare size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-gray-700 transition-colors">Email Our Team</h4>
                                    <p className="text-gray-600 text-sm mt-1 font-mono font-semibold">admin@time-ai.net</p>
                                </div>
                                <ExternalLink size={18} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                            </a>

                            <a 
                                href="https://www.linkedin.com/company/time-ai/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-6 p-6 bg-white border border-gray-300 rounded-3xl hover:border-gray-400 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-gray-900/20 group-hover:scale-110 transition-transform">
                                    <Linkedin size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-gray-700 transition-colors">Business Network</h4>
                                    <p className="text-gray-600 text-sm mt-1 font-semibold">Message Us on LinkedIn</p>
                                </div>
                                <ExternalLink size={18} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                            </a>

                            <button 
                                className={`group w-full flex items-center gap-6 p-6 bg-white border border-gray-300 rounded-3xl transition-all duration-300 relative overflow-hidden hover:border-gray-400`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 transition-all bg-gray-400 group-hover:bg-gray-500`}>
                                    <Twitter size={24} />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg md:text-xl font-black text-gray-900">Technical Feed</h4>
                                        <span className="px-2 py-0.5 bg-gray-300 text-gray-900 text-[10px] font-black uppercase rounded tracking-widest">SOON</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mt-1 font-semibold">Follow Our Engineering Log</p>
                                </div>
                            </button>
                        </div>

                        <div className="mt-12 flex items-center justify-center md:justify-start gap-3 opacity-40">
                            <div className="h-px w-8 bg-gray-300"></div>
                            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Miami // Zurich // London</span>
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
            <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 text-gray-900 font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">
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
