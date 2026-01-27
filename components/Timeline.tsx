import React from 'react';

export const Timeline: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Temporal Audit",
      desc: "Deep-scan diagnostic of your data lineage to identify operational bottlenecks and variance."
    },
    {
      num: "02",
      title: "Protocol Genesis",
      desc: "Architecting custom AI agents and predictive models tailored specifically to your topology."
    },
    {
      num: "03",
      title: "Mainline Injection",
      desc: "Seamless deployment of automation systems into your production timeline (ERP/CRM/Slack)."
    },
    {
      num: "04",
      title: "Variance Pruning",
      desc: "Continuous, autonomous monitoring to identify and eliminate inefficiencies as they emerge."
    }
  ];

  return (
    <section className="py-24 bg-tva-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-mono font-bold text-tva-cream uppercase">Integration Timeline</h2>
          <p className="text-tva-orange font-mono mt-2">Standard Protocol Duration: 2-6 Weeks</p>
        </div>

        <div className="relative">
          {/* The Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-tva-panel -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-tva-orange/50 -translate-y-1/2 z-0 blur-sm"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group bg-tva-dark p-6 border border-tva-panel hover:border-tva-orange transition-colors z-10 flex flex-col items-start md:block">
                <div className="w-12 h-12 bg-tva-panel text-tva-orange font-mono font-bold text-xl flex items-center justify-center mb-4 border border-tva-orange shadow-[0_0_10px_rgba(234,88,12,0.3)] shrink-0">
                  {step.num}
                </div>
                <div>
                    <h3 className="text-xl font-mono font-bold text-tva-cream mb-2 uppercase">{step.title}</h3>
                    <p className="text-tva-cream/60 text-sm font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};