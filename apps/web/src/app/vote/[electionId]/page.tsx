'use client';

import { useState, useEffect } from 'react';
import { useElection, useCastVote, generateVotingToken } from '@/lib/api/voting';
import { useRouter } from 'next/navigation';
import _sodium from 'libsodium-wrappers';

export default function VotingBallotPage({ params }: { params: { electionId: string } }) {
  const router = useRouter();
  const { data: election, isLoading, isError } = useElection(params.electionId);
  const castVoteMutation = useCastVote();
  
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isCasting, setIsCasting] = useState(false);
  const [receipt, setReceipt] = useState<{ txHash: string, receiptId: string } | null>(null);

  // Note: In real app, voterId would come from current user session
  const voterId = 'db7a4175-91fb-40d2-97ab-afaa1febdcdc'; 

  const handleVote = async () => {
    if (!selectedCandidateId) return;
    
    setIsCasting(true);
    try {
      // 1. Generate anonymous voting token
      const tokenHash = await generateVotingToken({ voterId, electionId: params.electionId });

      // 2. Encrypt vote locally before submission
      await _sodium.ready;
      const sodium = _sodium;
      const voteData = JSON.stringify({ candidateId: selectedCandidateId, timestamp: Date.now() });
      
      // Use a dummy public key for local encryption simulation
      // In production, this would be the election's public key
      const publicKey = sodium.from_base64('6Lp6Y9X+8v8v8v8v8v8v8v8v8v8v8v8v8v8v8v8v8v8='); 
      const encryptedVote = sodium.to_base64(sodium.crypto_box_seal(voteData, publicKey));

      // 3. Submit encrypted vote
      const result = await castVoteMutation.mutateAsync({
        electionId: params.electionId,
        tokenHash,
        encryptedVote
      });

      setReceipt({ txHash: result.txHash, receiptId: result.receipt });
    } catch (error: any) {
      alert(`Voting failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsCasting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500 min-h-screen grid place-items-center">Loading ballot...</div>;
  if (isError || !election) return <div className="p-8 text-center text-red-500 min-h-screen grid place-items-center">Failed to load election ballot.</div>;

  if (receipt) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center border-t-8 border-green-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Vote Cast Successfully!</h1>
          <p className="text-gray-600 mb-8">Your vote has been encrypted and recorded on the blockchain ledger.</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 border border-gray-100 mb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Receipt ID</p>
              <p className="font-mono text-sm text-gray-800 break-all">{receipt.receiptId}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Blockchain Tx Hash</p>
              <p className="font-mono text-xs text-blue-600 break-all">{receipt.txHash}</p>
            </div>
          </div>

          <button 
            onClick={() => router.push('/elections')}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition shadow-xl"
          >
            Back to Elections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">{election.title}</h1>
          <p className="text-gray-500 mt-2">Constituency: {election.constituency}</p>
          <div className="mt-4 inline-flex items-center px-4 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            End-to-End Encrypted Ballot
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Candidate</h2>
            
            <div className="space-y-4">
              {election.candidates.map((candidate: any) => (
                <button
                  key={candidate.id}
                  onClick={() => setSelectedCandidateId(candidate.id)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${
                    selectedCandidateId === candidate.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-4 ring-indigo-50' 
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-lg text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">{candidate.party}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedCandidateId === candidate.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                  }`}>
                    {selectedCandidateId === candidate.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <button
                disabled={!selectedCandidateId || isCasting}
                onClick={handleVote}
                className={`w-full py-4 rounded-xl font-extrabold text-lg transition shadow-xl ${
                  !selectedCandidateId || isCasting 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
                }`}
              >
                {isCasting ? 'Encrypting & Transmitting...' : 'Submit Secure Vote'}
              </button>
              <p className="text-center text-xs text-gray-400">
                By clicking "Submit Secure Vote", your choice is encrypted using Libsodium (crypto_box_seal) 
                and sent anonymously through your unique voting token.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
