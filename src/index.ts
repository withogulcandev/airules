#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { InitCommand } from './commands/init.command';
import { Logger } from './utils/logger';
import { version } from '../package.json';

const program = new Command();

// Configure CLI
program
  .name('airules')
  .description('A CLI tool for managing AI rules')
  .version(version);

// Initialize command
program
  .command('init')
  .description('Initialize and install AI rules in current directory')
  .option('-f, --force', 'Force installation even if target directory is not empty')
  .option('-v, --verbose', 'Show detailed output')
  .action(async (options) => {
    try {
      const config = {
        rulesDir: path.join(__dirname, '..', 'rules'),
        targetDir: process.cwd()
      };

      const initCommand = new InitCommand(config);
      await initCommand.execute(options);
    } catch (error) {
      process.exit(1);
    }
  });

// Error handling for unknown commands
program.on('command:*', () => {
  Logger.error(`Invalid command: ${program.args.join(' ')}`);
  Logger.info('See --help for a list of available commands.');
  process.exit(1);
});

// Parse command line arguments
program.parse(); 