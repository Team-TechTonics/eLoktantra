import { FastifyInstance } from 'fastify';
import { VotingService } from '../services/votingService';
import { VotingController } from '../controllers/votingController';

export default async function electionRoutes(fastify: FastifyInstance) {
  const votingService = new VotingService(fastify);
  const votingController = new VotingController(votingService);

  fastify.get('/elections', votingController.getElections);
  fastify.get('/elections/:id', votingController.getElectionById);
  fastify.post('/elections', votingController.createElection);
  fastify.post('/generate-token', votingController.generateToken);
  fastify.post('/vote', votingController.vote);
}
