import {
  Request,
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  UseGuards,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor, Req, Res
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TokenResponse } from '../common/models/token-response';
import { LoginDto } from './dtos/login.dto';
import { UserInfoResponse } from '../common/models/user-info-response';
import { GoogleOauthGuard } from "../common/guards/google-oauth.guard";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: TokenResponse })
  @ApiUnauthorizedResponse()
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto): Promise<TokenResponse> {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.getAccessToken(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('info')
  async getInfo(@Request() req): Promise<UserInfoResponse> {
    const user = await this.authService.findUserById(req.user.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    try {
      const token = await this.authService.oAuthLogin(req.user);
      res.redirect(`http://localhost:3000/oauth?token=${token.jwt}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}
