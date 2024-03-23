import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

const getUserFromContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    // Switch context to HTTP and extract in-flight user
    return context.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserFromContext(context),
);
