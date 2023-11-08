import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserWs = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const client = context.switchToWs().getClient();

    const user = client.data.user;

    return data ? user?.[data] : user;
  },
);
