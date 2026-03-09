import { FastifyInstance } from 'fastify';
import { IdentityService } from '../services/identityService';
import { IdentityController } from '../controllers/identityController';

export default async function identityRoutes(fastify: FastifyInstance) {
  const identityService = new IdentityService(fastify);
  const identityController = new IdentityController(identityService);

  fastify.post('/verify-voter', identityController.verify);
  fastify.post('/generate-voting-token', identityController.generateToken);
}
