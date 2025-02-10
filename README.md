# AI Rules

AI Rules is a CLI tool for managing AI-powered development rules in Cursor IDE. It helps teams maintain consistent code structure and follow best practices through AI-assisted guidelines.

## Features

- 🤖 AI-powered development rules
- 📁 Project structure guidelines
- 🔧 Framework-specific patterns (Next.js, etc.)
- 🚀 Easy installation and setup
- 💻 Cursor IDE integration

## Usage

Initialize AI rules in your project:

```bash
npx airules init
```

This will:
1. Show available rulesets
2. Let you select the appropriate ruleset
3. Install the rules in your project's `.cursor/rules` directory

### Available Commands

```bash
npx airules init      # Initialize and install rules
npx airules help      # Show help information
npx airules version   # Show version information
```

## Available Rulesets

### Next.js Rules
- Project Structure Guidelines
- Component Patterns
- Data Fetching Patterns
- Best Practices

More frameworks and rulesets coming soon!

## Requirements

- Node.js >= 14.0.0
- Cursor IDE

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Ogulcan Turk ([@ogulcanturk](https://github.com/ogulcanturk))

## Support

If you encounter any problems or have suggestions, please [open an issue](https://github.com/ogulcanturk/airules/issues). 