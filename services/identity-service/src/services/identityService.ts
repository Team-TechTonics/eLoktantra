import { FastifyInstance } from 'fastify';
import '../plugins/supabase';
import { v4 as uuidv4 } from 'uuid';

export class IdentityService {
  private supabase: FastifyInstance['supabase'];

  constructor(fastify: FastifyInstance) {
    this.supabase = fastify.supabase;
  }

  async verifyVoter(voterId: string) {
    // In a real system, this would check Aadhaar or other ID
    // For now, we check if the user exists and is verified in the system
    const { data, error } = await this.supabase
      .from('users')
      .select('id, verified_status, constituency')
      .eq('id', voterId)
      .single();

    if (error || !data) throw new Error('Voter not found');
    if (!data.verified_status) throw new Error('Voter is not verified');

    return data;
  }

  async generateVotingToken(voterId: string, electionId: string) {
    // 1. Check eligibility
    const voter = await this.verifyVoter(voterId);

    // 2. Check if already voted/has token
    const { data: existingToken } = await this.supabase
      .from('voting_tokens')
      .select('id')
      .eq('voter_id', voterId)
      .eq('election_id', electionId)
      .single();

    if (existingToken) throw new Error('Voting token already generated for this election');

    // 3. Generate anonymous token hash
    const tokenHash = uuidv4();

    // 4. Store token
    const { data, error } = await this.supabase
      .from('voting_tokens')
      .insert([{
        voter_id: voterId,
        election_id: electionId,
        token_hash: tokenHash,
        used: false
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }
}
