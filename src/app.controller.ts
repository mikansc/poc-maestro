import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from 'src/github/github.service';

@Controller()
export class AppController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async getRepositories() {
    const response = await this.githubService.getRepositories();
    return response;
  }

  @Get(':repo')
  async getRepository(@Param('repo') repo: string) {
    const response = await this.githubService.getRepository(repo);
    return response;
  }

  @Post(':repo/start')
  async startRepoPipeline(@Param('repo') repo: string, @Body('pr') pr: number) {
    const response = await this.githubService
      .dispatchAction(repo, pr)
      .catch((err) => console.log(err));
    return response;
  }
}
