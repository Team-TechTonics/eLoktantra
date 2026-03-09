'use client';

import { useElections } from '@/lib/api/voting';
import Link from 'next/link';

export default function ElectionsPage() {
  const { data: elections, isLoading, isError } = useElections();

  if (isLoading) return <div className="p-8 text-center text-gray-500 min-h-screen grid place-items-center">Loading elections...</div>;
  if (isError) return <div className="p-8 text-center text-red-500 min-h-screen grid place-items-center">Failed to load elections.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 sm:p-12">
      <header className="mb-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Active Elections</h1>
        <p className="text-lg text-gray-600 mt-2">Participate in secure, anonymous, and blockchain-verified voting.</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elections?.map((election) => (
          <div key={election.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{election.title}</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  election.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                  election.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {election.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-8 text-sm text-gray-600">
                <p><strong>Constituency:</strong> {election.constituency}</p>
                <p><strong>Ends:</strong> {new Date(election.end_time).toLocaleString()}</p>
              </div>

              {election.status === 'ACTIVE' ? (
                <Link 
                  href={`/vote/${election.id}`}
                  className="w-full block text-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                >
                  Cast Your Vote
                </Link>
              ) : (
                <button 
                  disabled
                  className="w-full block text-center bg-gray-100 text-gray-400 px-6 py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  {election.status === 'UPCOMING' ? 'Opens Soon' : 'Closed'}
                </button>
              )}
            </div>
          </div>
        ))}

        {elections?.length === 0 && (
          <div className="col-span-full text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Elections</h3>
            <p className="text-gray-500">There are no elections currently scheduled for your area.</p>
          </div>
        )}
      </div>
    </div>
  );
}
