import { FastifyReply, FastifyRequest } from 'fastify';
import { AuditService } from '../services/auditService';

export class AuditController {
  constructor(private auditService: AuditService) {}

  getElectionAudit = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const votes = await this.auditService.getElectionAudit(request.params.id);
      return reply.send({ success: true, count: votes.length, auditTrail: votes });
    } catch (error: any) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  };

  verifyVote = async (request: FastifyRequest<{ Params: { hash: string } }>, reply: FastifyReply) => {
    try {
      const vote = await this.auditService.verifyVoteHash(request.params.hash);
      return reply.send({ success: true, verified: true, voteData: vote });
    } catch (error: any) {
      return reply.code(404).send({ success: false, verified: false, error: error.message });
    }
  };
}
