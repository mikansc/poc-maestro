import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubService } from 'src/github/github.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          timeout: 5000,
          baseURL: 'https://api.github.com',
          headers: {
            Authorization: `Bearer ${configService.get('OCTO_TOKEN')}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'mikansc',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [GithubService],
})
export class AppModule {}
