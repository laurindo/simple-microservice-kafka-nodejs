import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Daniel Laurindo' },
    course: 'Kafka + Node.js',
    grade: 10,
  };

  // Calls the microservice
  await req.producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) },
      { value: JSON.stringify({ ...message, user: { ...message.user, name: 'Pellizzetti' } }) },
    ],
  })

  return res.json({ ok: true });
});

export default routes;