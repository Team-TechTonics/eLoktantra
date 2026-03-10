'use client';

import { useState } from 'react';

export default function PromisesPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const promises = [
    {
      id: '1',
      title: '24/7 Water Supply',
      description: 'Ensuring consistent water supply to all households in the constituency through modernized infrastructure.',
      status: 'IN_PROGRESS',
      progress: 65,
      candidate: 'Arvind Sharma',
      party: 'Independent',
    },
    {
      id: '2',
      title: 'Digital Literacy for All',
      description: 'Establishment of 50 community digital centers to provide free computer education and internet access.',
      status: 'IN_PROGRESS',
      progress: 40,
      candidate: 'Arvind Sharma',
      party: 'Independent',
    },
    {
      id: '3',
      title: 'New Public Hospital',
      description: 'Construction of a 500-bed multi-speciality public hospital with modern facilities.',
      status: 'NOT_STARTED',
      progress: 0,
      candidate: 'Priya Verma',
      party: 'Socialist Party',
    },
    {
      id: '4',
      title: 'Public Park Renovation',
      description: 'Renovating all existing public parks with new lighting, benches, and walking tracks.',
      status: 'COMPLETED',
      progress: 100,
      candidate: 'Rahul Gupta',
      party: 'National Party',
    },
  ];

  const statuses = ['All', 'NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'];

  const filteredPromises = promises.filter(p => 
    selectedStatus === 'All' || p.status === selectedStatus
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4 orange-text-gradient uppercase tracking-tight">Promise Tracker</h1>
          <p className="text-gray-400 font-medium text-lg">Hold your representatives accountable. Track the progress of election promises in real-time.</p>
        </header>

        {/* Status Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all border ${
                selectedStatus === status 
                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                : 'bg-secondary/50 border-white/5 text-gray-500 hover:text-white hover:border-white/20'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPromises.map((promise) => (
            <div key={promise.id} className="glass-card p-8 border-white/5 hover:bg-secondary/80 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-black text-gray-200 text-lg group-hover:text-primary transition-colors">{promise.candidate}</h3>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{promise.party}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  promise.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  promise.status === 'IN_PROGRESS' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                  'bg-gray-500/10 text-gray-500 border-gray-500/20'
                }`}>
                  {promise.status.replace('_', ' ')}
                </div>
              </div>
              
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{promise.title}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                {promise.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Execution Progress</span>
                  <span className="text-lg font-black orange-text-gradient">{promise.progress}%</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary orange-gradient h-full transition-all duration-1000 shadow-lg shadow-primary/20" 
                    style={{ width: `${promise.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPromises.length === 0 && (
          <div className="text-center py-24 glass-card border-dashed border-white/10">
            <p className="text-gray-500 font-black uppercase tracking-widest">No promises found for this status.</p>
          </div>
        )}
      </div>
    </div>
  );
}
