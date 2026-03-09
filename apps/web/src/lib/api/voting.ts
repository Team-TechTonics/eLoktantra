import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_GATEWAY = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Election {
  id: string;
  title: string;
  constituency: string;
  start_time: string;
  end_time: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  constituency: string;
}

export interface ElectionDetail extends Election {
  candidates: Candidate[];
}

export const fetchElections = async (): Promise<Election[]> => {
  const { data } = await axios.get(`${API_GATEWAY}/voting/elections`);
  return data.elections || [];
};

export const fetchElectionById = async (id: string): Promise<ElectionDetail> => {
  const { data } = await axios.get(`${API_GATEWAY}/voting/elections/${id}`);
  return data.election;
};

export const generateVotingToken = async (params: { voterId: string, electionId: string }): Promise<string> => {
  const { data } = await axios.post(`${API_GATEWAY}/voting/generate-token`, params);
  return data.tokenHash;
};

export const castVote = async (params: { electionId: string, tokenHash: string, encryptedVote: string }): Promise<{ txHash: string, receipt: string }> => {
  const { data } = await axios.post(`${API_GATEWAY}/voting/vote`, params);
  return { txHash: data.txHash, receipt: data.receipt };
};

export const useElections = () => {
  return useQuery({
    queryKey: ['elections'],
    queryFn: fetchElections,
  });
};

export const useElection = (id: string) => {
  return useQuery({
    queryKey: ['election', id],
    queryFn: () => fetchElectionById(id),
    enabled: !!id,
  });
};

export const useCastVote = () => {
  return useMutation({
    mutationFn: castVote,
  });
};
