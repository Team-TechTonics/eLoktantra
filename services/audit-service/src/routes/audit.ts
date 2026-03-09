import { FastifyInstance } from 'fastify';
import { AuditService } from '../services/auditService';
import { AuditController } from '../controllers/auditController';

export default async function auditRoutes(fastify: FastifyInstance) {
  const auditService = new AuditService(fastify);
  const auditController = new AuditController(auditService);

  fastify.get('/election/:id', auditController.getElectionAudit);
  fastify.get('/vote/:hash', auditController.verifyVote);
}
