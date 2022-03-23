import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('private:message')
  handleMessage(client: Socket, payload: any) {
    const { receiverId, content } = payload;
    this.server.to(receiverId).emit('private:message', {
      ...content,
      senderId: client.data.userId,
    });
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log(client.id);
  }
}
