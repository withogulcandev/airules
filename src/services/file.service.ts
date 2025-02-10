import fs from 'fs';
import path from 'path';
import { RuleSet } from '../types';
import { Logger } from '../utils/logger';

export class FileService {
  static async getRuleSets(rulesDir: string): Promise<RuleSet[]> {
    try {
      const entries = await fs.promises.readdir(rulesDir, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(dir => ({
          name: dir.name,
          path: path.join(rulesDir, dir.name)
        }));
    } catch (error) {
      Logger.error(`Failed to read rules directory: ${error instanceof Error ? error.message : String(error)}`);
      return [];
    }
  }

  static async copyRuleSet(ruleset: RuleSet, targetPath: string): Promise<void> {
    try {
      await fs.promises.mkdir(targetPath, { recursive: true });
      const files = await fs.promises.readdir(ruleset.path);

      for (const file of files) {
        const sourcePath = path.join(ruleset.path, file);
        const targetFilePath = path.join(targetPath, file);
        await fs.promises.copyFile(sourcePath, targetFilePath);
      }
    } catch (error) {
      throw new Error(`Failed to copy rules: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static async isDirectoryEmpty(dirPath: string): Promise<boolean> {
    try {
      const files = await fs.promises.readdir(dirPath);
      return files.length === 0;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return true;
      }
      throw error;
    }
  }
} 