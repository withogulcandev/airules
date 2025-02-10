import inquirer from 'inquirer';
import path from 'path';
import { CommandOptions, RuleSet } from '../types';
import { FileService } from '../services/file.service';
import { Logger } from '../utils/logger';

export class InitCommand {
  constructor(private config: { rulesDir: string; targetDir: string }) {}

  async execute(options: CommandOptions = {}): Promise<void> {
    try {
      Logger.title('AI Rules Initialization');
      
      // Get available rulesets
      Logger.startSpinner('Scanning for available rulesets...');
      const ruleSets = await FileService.getRuleSets(this.config.rulesDir);
      Logger.stopSpinner(true, 'Found available rulesets');

      if (ruleSets.length === 0) {
        throw new Error('No rulesets found');
      }

      // Let user select ruleset
      const selectedSet = await this.selectRuleSet(ruleSets);
      
      // Check target directory
      const targetPath = path.join(this.config.targetDir, '.cursor', 'rules');
      const isEmpty = await FileService.isDirectoryEmpty(targetPath);
      
      if (!isEmpty && !options.force) {
        const { proceed } = await inquirer.prompt([{
          type: 'confirm',
          name: 'proceed',
          message: 'Target directory is not empty. Do you want to proceed?',
          default: false
        }]);
        
        if (!proceed) {
          Logger.warn('Operation cancelled by user');
          return;
        }
      }

      // Copy rules
      Logger.startSpinner('Installing rules...');
      await FileService.copyRuleSet(selectedSet, targetPath);
      Logger.stopSpinner(true, 'Rules installed successfully');

      Logger.success(`Rules from '${selectedSet.name}' have been installed to .cursor/rules/`);
      
      if (options.verbose) {
        Logger.info('Installation details:');
        Logger.listItem(`Source: ${selectedSet.path}`);
        Logger.listItem(`Target: ${targetPath}`);
      }
    } catch (error) {
      Logger.stopSpinner(false);
      Logger.error(`Initialization failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  private async selectRuleSet(ruleSets: RuleSet[]): Promise<RuleSet> {
    const { selectedName } = await inquirer.prompt([{
      type: 'list',
      name: 'selectedName',
      message: 'Select a ruleset to install:',
      choices: ruleSets.map(set => ({
        name: set.name,
        value: set.name
      }))
    }]);

    return ruleSets.find(set => set.name === selectedName) as RuleSet;
  }
} 