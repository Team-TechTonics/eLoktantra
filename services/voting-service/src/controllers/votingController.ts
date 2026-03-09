import { FastifyReply, FastifyRequest } from 'fastify';
import { VotingService } from '../services/votingService';

export class VotingController {
  constructor(private votingService: VotingService) {}

  getElections = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const elections = await this.votingService.getElections();
      return reply.send({ success: true, count: elections.length, elections });
    } catch (error: any) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  };

  getElectionById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const election = await this.votingService.getElectionById(request.params.id);
      return reply.send({ success: true, election });
    } catch (error: any) {
      return reply.code(404).send({ success: false, error: 'Election not found' });
    }
  };

  createElection = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const election = await this.votingService.createElection(request.body);
      return reply.code(201).send({ success: true, election });
    } catch (error: any) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  };

  generateToken = async (request: FastifyRequest<{ Body: { voterId: string, electionId: string } }>, reply: FastifyReply) => {
    try {
      const { voterId, electionId } = request.body;
      const tokenHash = await this.votingService.generateToken(voterId, electionId);
      return reply.send({ success: true, tokenHash });
    } catch (error: any) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  };

  vote = async (request: FastifyRequest<{ Body: { electionId: string, tokenHash: string, encryptedVote: string } }>, reply: FastifyReply) => {
    try {
      const { electionId, tokenHash, encryptedVote } = request.body;
      const vote = await this.votingService.submitVote(electionId, tokenHash, encryptedVote);
      return reply.code(201).send({ success: true, message: 'Vote successfully recorded', receipt: vote.id, txHash: vote.blockchain_tx_hash });
    } catch (error: any) {
      return reply.code(400).send({ success: false, error: error.message });
    }
  };
}
