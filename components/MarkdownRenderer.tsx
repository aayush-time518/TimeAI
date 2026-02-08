import React from 'react';
import { Terminal, Copy, Check, Hash, Code } from 'lucide-react';

interface MarkdownRendererProps {
    content: string;
}

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Enhanced syntax highlighting for professional technical display
    const highlight = (text: string) => {
        return text
            // Comments
            .replace(/(#.*$)/gm, '<span class="text-slate-500 italic">$1</span>')
            // Strings
            .replace(/(['"])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>')
            // Variables/Properties
            .replace(/(--[a-zA-Z0-9_-]+)/g, '<span class="text-sky-400">$1</span>')
            // CLI/Common Keywords
            .replace(/\b(sudo|apt|install|systemctl|nano|echo|curl|sh|bash|if|then|else|fi|for|in|do|done|while|chmod|chown|python3|pip|git|launch|init|deploy|accelerate)\b/g, '<span class="text-gray-400 font-bold">$1</span>')
            // Python keywords
            .replace(/\b(def|return|if|else|import|from|as|class|with|try|except|finally|raise|yield)\b/g, '<span class="text-gray-300 font-bold">$1</span>')
            // Values/Numbers
            .replace(/\b(\d+(\.\d+)?|true|false|null|THRESHOLD|THRESHOLD_VALUE)\b/g, '<span class="text-gray-400 font-mono">$1</span>');
    };

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group ring-1 ring-white/5">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-5 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-600/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-700/90 shadow-[0_0_8px_rgba(0,0,0,0.3)]"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        <Terminal size={10} className="text-slate-400" />
                        <span className="text-[9px] font-mono font-black text-slate-300 uppercase tracking-widest">
                            {language || 'system_shell'}
                        </span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-slate-800 rounded-md transition-all text-slate-500 hover:text-white active:scale-90"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>
            {/* Code Body */}
            <div className="p-6 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-[13px] md:text-sm leading-relaxed text-slate-300 selection:bg-white/10">
                    <code className="block" dangerouslySetInnerHTML={{ __html: highlight(code.trim()) }} />
                </pre>
            </div>
        </div>
    );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const renderContent = () => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let currentCode = '';
        let codeLang = '';

        lines.forEach((line, i) => {
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    elements.push(<CodeBlock key={`code-${i}`} code={currentCode} language={codeLang} />);
                    currentCode = '';
                    codeLang = '';
                    inCodeBlock = false;
                } else {
                    codeLang = line.replace('```', '').trim();
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                currentCode += line + '\n';
                return;
            }

            // Headers
            if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-xl font-black text-gray-900 mt-10 mb-5 font-sans flex items-center gap-3"><span className="w-1.5 h-6 bg-gray-700 rounded-full"></span> {line.replace('### ', '')}</h3>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-2xl md:text-3xl font-black text-gray-900 mt-14 mb-8 font-sans border-b border-gray-300 pb-4 tracking-tight">{line.replace('## ', '')}</h2>);
            } else if (line.startsWith('> ')) {
                elements.push(
                    <blockquote key={i} className="border-l-4 border-gray-700 bg-gray-50 px-8 py-6 my-10 rounded-r-2xl italic text-gray-900 shadow-sm border-y border-r border-gray-200">
                        <p className="text-lg leading-relaxed font-semibold">"{line.replace('> ', '')}"</p>
                    </blockquote>
                );
            } else if (line.startsWith('- ')) {
                elements.push(
                    <li key={i} className="ml-8 mb-3 list-none relative group">
                        <span className="absolute -left-6 top-2.5 w-2 h-2 rounded-full bg-gray-700/40 group-hover:bg-gray-700 transition-colors"></span>
                        <span className="text-gray-800 font-semibold">{line.replace('- ', '')}</span>
                    </li>
                );
            } else if (line.trim() === '') {
                elements.push(<div key={i} className="h-4" />);
            } else {
                const processedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-black">$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-gray-900 px-1.5 py-0.5 rounded-md font-mono text-[0.85em] font-black border border-gray-200">$1</code>');
                
                elements.push(
                    <p key={i} className="text-gray-900 leading-relaxed mb-5 text-base md:text-lg font-semibold" dangerouslySetInnerHTML={{ __html: processedLine }} />
                );
            }
        });

        return elements;
    };

    return <div className="markdown-body animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">{renderContent()}</div>;
};