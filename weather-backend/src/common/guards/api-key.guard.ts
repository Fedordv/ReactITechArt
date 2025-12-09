import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private cfg: ConfigService) {}

    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest();
        const apiKey = req.headers['x-api-keys'];
        if (apiKey !== this.cfg.apiKey) {
            throw new UnauthorizedException('Invalid API token')
        };

        return true
    };
}