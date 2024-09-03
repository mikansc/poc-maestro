import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getRepositories() {
    const response = await this.httpService.axiosRef.get('/orgs/tiomika/repos');
    return response.data;
  }

  async getRepository(repo: string) {
    console.log(repo);
    const response = await this.httpService.axiosRef.get(
      `/repos/tiomika/${repo}`,
    );
    return response.data;
  }

  async dispatchAction(repo: string, pr: number) {
    console.log({ repo, pr });
    const response = await this.httpService.axiosRef.post(
      `/repos/tiomika/pipelines/actions/workflows/${repo}.yml/dispatches`,
      {
        ref: 'main',
        inputs: {
          repo: repo,
          pr_ref: String(pr),
        },
      },
    );
    return response.data;
  }
}
