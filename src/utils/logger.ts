import chalk from 'chalk';
import ora from 'ora';

export class Logger {
  private static spinner = ora();

  static info(message: string): void {
    console.log(chalk.blue('ℹ'), message);
  }

  static success(message: string): void {
    console.log(chalk.green('✓'), message);
  }

  static error(message: string): void {
    console.error(chalk.red('✖'), message);
  }

  static warn(message: string): void {
    console.warn(chalk.yellow('⚠'), message);
  }

  static startSpinner(message: string): void {
    this.spinner.start(chalk.cyan(message));
  }

  static stopSpinner(success = true, message?: string): void {
    if (success) {
      this.spinner.succeed(message ? chalk.green(message) : undefined);
    } else {
      this.spinner.fail(message ? chalk.red(message) : undefined);
    }
  }

  static title(message: string): void {
    console.log('\n' + chalk.bold.cyan(message) + '\n');
  }

  static listItem(message: string, index?: number): void {
    const bullet = index !== undefined ? chalk.cyan(`${index + 1}.`) : chalk.cyan('•');
    console.log(`${bullet} ${message}`);
  }
} 