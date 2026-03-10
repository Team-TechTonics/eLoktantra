'use client';

export default function CompareManifestosPage() {
  const comparisonData = [
    {
      category: 'Education',
      insight: 'Parties are divided on the implementation of digital infrastructure vs teacher recruitment.',
      manifestos: [
        {
          party: 'National Party',
          policy: 'Focus on building 10,000 new digital classrooms and providing tablets to all high school students.',
          aiSummary: 'Prioritizes technology integration and digital hardware in schools.',
        },
        {
          party: 'Socialist Party',
          policy: 'Recruitment of 2 lakh new teachers and increasing the education budget to 6% of GDP.',
          aiSummary: 'Focuses on human resources and significantly higher public spending.',
        },
        {
          party: 'Regional Front',
          policy: 'Introduction of vocational training in all middle schools and local language instruction.',
          aiSummary: 'Emphasizes skill development and cultural preservation in curriculum.',
        },
      ],
    },
    {
      category: 'Healthcare',
      insight: 'Universal healthcare coverage is a common theme, but funding mechanisms differ.',
      manifestos: [
        {
          party: 'National Party',
          policy: 'Expansion of insurance-based healthcare model to cover middle-class families.',
          aiSummary: 'Strengthens existing insurance frameworks for wider coverage.',
        },
        {
          party: 'Socialist Party',
          policy: 'Setting up 24/7 free clinics in every village and capping private hospital costs.',
          aiSummary: 'Direct government intervention in healthcare delivery and pricing.',
        },
        {
          party: 'Regional Front',
          policy: 'Special focus on maternal health and setting up generic medicine centers in all talukas.',
          aiSummary: 'Targeted interventions for women and focus on affordable medicines.',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-black mb-4 orange-text-gradient uppercase tracking-tight">AI Manifesto Comparison</h1>
          <p className="text-gray-400 font-medium text-lg">Deep dive into party policies. Our AI analyzes and summarizes complex manifestos for side-by-side clarity.</p>
        </header>

        <div className="space-y-24">
          {comparisonData.map((categoryBlock, idx) => (
            <section key={idx} className="relative">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10 border-b border-white/5 pb-6">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {categoryBlock.category}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent hidden md:block" />
                <div className="flex items-center space-x-2 text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest">AI Insight: {categoryBlock.insight}</span>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBlock.manifestos.map((item, i) => (
                  <div key={i} className="glass-card p-8 border-white/5 flex flex-col hover:border-primary/20 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary border border-primary/20">
                        {item.party.charAt(0)}
                      </div>
                      <h3 className="text-xl font-black text-gray-200 uppercase tracking-tight">{item.party}</h3>
                    </div>

                    <div className="flex-grow space-y-8">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 flex items-center">
                          <span className="w-4 h-px bg-gray-600 mr-2" />
                          Proposed Policy
                        </div>
                        <p className="text-gray-400 font-medium leading-relaxed italic">
                          "{item.policy}"
                        </p>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative group">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30">
                          AI Summary
                        </div>
                        <p className="text-sm text-gray-300 font-bold leading-relaxed pt-2">
                          {item.aiSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-24 p-8 glass-card border-dashed border-white/10 text-center">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest max-w-2xl mx-auto">
            Disclaimer: These summaries are generated by AI based on official party manifestos. Always refer to the original documents for complete legal context.
          </p>
        </div>
      </div>
    </div>
  );
}
