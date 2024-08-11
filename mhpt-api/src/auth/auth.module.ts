import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../common/guards/jwt.strategy';
import { jwtConstants } from '../common/constants/general.constants';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GoogleStrategy } from '../common/guards/google-oauth.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, GoogleStrategy],
})
export class AuthModule {}
