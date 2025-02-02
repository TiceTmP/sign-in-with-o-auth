import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-line-auth';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineStrategy extends PassportStrategy(Strategy, 'line') {
  constructor(private configService: ConfigService) {
    super({
      channelID: configService.get('LINE_CHANNEL_ID'),
      channelSecret: configService.get('LINE_CHANNEL_SECRET'),
      callbackURL: 'http://localhost:3000/auth/line/callback',
      scope: ['profile', 'openid', 'email'],
      botPrompt: 'normal',
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): any {
    const user = {
      lineId: profile.id,
      displayName: profile.displayName,
      picture: profile.pictureUrl,
      email: profile.email,
      accessToken,
    };
    done(null, user);
  }
}
