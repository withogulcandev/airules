# Contributing to AI Rules

Thank you for your interest in contributing to AI Rules! This guide will help you understand how to add new rules and contribute to the project.

## Adding New Rules

### Rule File Structure

Rules are stored in the `rules/` directory, organized by framework or technology. Each ruleset should be in its own directory:

```
rules/
├── nextjs-rule/
│   ├── project-structure.mdc
│   ├── component-patterns.mdc
│   └── data-fetching.mdc
└── your-rule/
    ├── project-structure.mdc
    └── other-patterns.mdc
```

### Creating a Rule File

1. Each rule file should be a `.mdc` file with this structure:

```markdown
---
description: Brief description of what these rules cover
globs: ["**/*.tsx", "**/*.ts"] # Files these rules apply to
---

# Title of Rules

1. First Rule Category:
```code or examples```

2. Second Rule Category:
- Guideline 1
- Guideline 2

3. Best Practices:
```example code```
```

### Rule Writing Guidelines

1. **Be Clear and Concise**
   - Use simple, direct language
   - Provide practical examples
   - Explain the "why" behind rules

2. **Include Examples**
   - Show both good and bad practices
   - Use real-world scenarios
   - Include code snippets when relevant

3. **Structure Your Rules**
   - Group related rules together
   - Use consistent formatting
   - Start with basic concepts

## Quick Start

1. Fork the repository
2. Create your rule file in the appropriate directory
3. Test your rules in Cursor IDE
4. Submit a pull request

## Need Help?

If you have questions about contributing or adding rules, please:
1. Check existing rules for examples
2. Open an issue for discussion
3. Ask in pull request comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License. 