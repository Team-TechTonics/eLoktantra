import { FastifyInstance } from 'fastify';
import '../plugins/supabase';

export class AuditService {
  private supabase: FastifyInstance['supabase'];

  constructor(fastify: FastifyInstance) {
    this.supabase = fastify.supabase;
  }

  async getElectionAudit(electionId: string) {
    const { data, error } = await this.supabase
      .from('votes')
      .select('id, election_id, blockchain_tx_hash, timestamp')
      .eq('election_id', electionId);

    if (error) throw new Error(error.message);
    return data;
  }

  async verifyVoteHash(txHash: string) {
    const { data, error } = await this.supabase
      .from('votes')
      .select('id, election_id, blockchain_tx_hash, timestamp')
      .eq('blockchain_tx_hash', txHash)
      .single();

    if (error || !data) throw new Error('Vote transaction not found in ledger');
    return data;
  }
}
