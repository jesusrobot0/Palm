import { ServerService } from '@core/ServerService';

const server = new ServerService(8080);

setInterval(() => {
  server.broadcast({
    type: 'heartbeat',
    data: `Ping desde el servidor: ${new Date().toISOString()}`,
  });
}, 5000);
