import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();

      // console.log(client.handshake.headers.cookie.split('%22')[1]);

      const authToken: string = client.handshake.headers.cookie.split('%22')[1];

      // console.log('authToken: ', authToken);

      const user = await this.authService.verify(authToken);

      if (!user) {
        throw new WsException('Invalid credentials.');
      }
      context.switchToWs().getClient().data.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}
