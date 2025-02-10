export interface RuleSet {
  name: string;
  path: string;
  description?: string;
}

export interface CommandOptions {
  verbose?: boolean;
  force?: boolean;
}

export interface CLIConfig {
  version: string;
  rulesDir: string;
  targetDir: string;
} 