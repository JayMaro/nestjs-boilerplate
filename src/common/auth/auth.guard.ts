import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { constants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  // @Public 설정시 로그인 없이 호출 가능
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      constants.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('로그인 정보가 없습니다.');
    }
    try {
      request['user'] = await this.validateRequest(token);
    } catch (error) {
      throw new UnauthorizedException('로그인 세션이 만료되었습니다.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  /**
   * token 검증
   *
   * @param idToken
   * @returns
   */
  private async validateRequest(idToken: string) {
    return await true;
  }
}
