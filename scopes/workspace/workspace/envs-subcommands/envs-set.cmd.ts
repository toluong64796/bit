import { Command } from '@teambit/cli';
import chalk from 'chalk';
import { Workspace } from '../workspace';

export class EnvsSetCmd implements Command {
  name = 'set <pattern> <env>';
  description = 'set an environment to component(s)';
  options = [];
  group = 'development';

  constructor(private workspace: Workspace) {}

  async report([pattern, env]: [string, string]) {
    const envId = await this.workspace.resolveComponentId(env);
    const componentIds = await this.workspace.idsByPattern(pattern);
    if (!componentIds.length) return chalk.yellow(`unable to find any matching for ${chalk.bold(pattern)} pattern`);
    await this.workspace.setEnvToComponents(envId, componentIds);
    return `added ${chalk.bold(envId.toString())} env to the following component(s):
${componentIds.map((compId) => compId.toString()).join('\n')}`;
  }
}
