#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { version } = require('../package.json');

/**
 * Create readline interface for handling user input/output
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Promisify readline question to use with async/await
 * @param {string} query - The question to ask the user
 * @returns {Promise<string>} User's answer
 */
const question = query => new Promise(resolve => rl.question(query, resolve));

/**
 * Present available rulesets and get user selection
 * @param {string} message - The prompt message to show
 * @param {string[]} choices - Array of available rulesets
 * @returns {Promise<string>} Selected ruleset
 * @throws {Error} If selection is invalid
 */
async function selectRuleset(message, choices) {
  console.log(`\n${message}`);
  choices.forEach((choice, index) => console.log(`${index + 1}) ${choice}`));
  
  const answer = await question('\nEnter number: ');
  const index = parseInt(answer) - 1;
  
  if (index >= 0 && index < choices.length) {
    return choices[index];
  }
  throw new Error('Invalid ruleset selection');
}

/**
 * Copy selected ruleset files to Cursor rules directory
 * @param {string} ruleset - Name of the ruleset to copy
 * @param {string} targetPath - Destination path for the rules
 */
function copyRules(ruleset, targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
  const sourcePath = path.join(__dirname, '..', 'rules', ruleset);
  
  fs.readdirSync(sourcePath).forEach(file => {
    fs.copyFileSync(
      path.join(sourcePath, file),
      path.join(targetPath, file)
    );
  });
}

/**
 * Initialize a new Cursor rules directory
 */
async function initializeRules() {
  try {
    // Get available rulesets
    const ruleSets = fs.readdirSync(path.join(__dirname, '..', 'rules'))
      .filter(file => fs.statSync(path.join(__dirname, '..', 'rules', file)).isDirectory());

    // Get user selection
    const selectedSet = await selectRuleset('Select the rule set to install:', ruleSets);

    // Install rules to Cursor
    const cursorRulesPath = path.join(process.cwd(), '.cursor', 'rules');
    await copyRules(selectedSet, cursorRulesPath);

    // Success message
    console.log(
      '\n✓ Rules installed successfully!' +
      `\nRules from '${selectedSet}' have been copied to .cursor/rules/`
    );
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
AI Rules CLI - Version ${version}

Usage:
  airules [command]

Commands:
  init          Initialize and install AI rules in current directory
  help          Show this help message
  version       Show version information

Examples:
  $ airules init      # Initialize and select rules to install
  $ airules help      # Show help information
  $ airules version   # Show version information
`);
  process.exit(0);
}

/**
 * Display version information
 */
function showVersion() {
  console.log(`AI Rules CLI v${version}`);
  process.exit(0);
}

/**
 * Main CLI handler
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'init':
      initializeRules();
      break;

    case 'help':
      showHelp();
      break;

    case 'version':
    case '--version':
    case '-v':
      showVersion();
      break;

    case undefined:
      console.error('\nError: No command specified');
      showHelp();
      break;

    default:
      console.error(`\nError: Unknown command '${command}'`);
      showHelp();
      break;
  }
}

// Start CLI
main();