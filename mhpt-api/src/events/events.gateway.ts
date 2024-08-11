import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server, ServerOptions } from 'socket.io';

const options: any = {
  cors: {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

@WebSocketGateway(options)
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): void {
    this.server.emit('message', data); // Broadcasts the message to all clients
  }
}