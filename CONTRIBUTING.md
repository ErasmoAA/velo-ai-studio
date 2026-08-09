# Contributing to Velo AI Studio

Thank you for your interest in Velo AI Studio. Contributions of code, documentation, bug reports, testing, and ideas are welcome.

## Before you start

For bugs and feature requests, search existing issues first. For security vulnerabilities, follow `SECURITY.md` and do not disclose sensitive details in a public issue.

## Local development

### Requirements

- Node.js 18 or newer
- npm
- A modern browser

### Setup

```bash
npm install
npm run dev
```

### Validation

Before opening a pull request, run:

```bash
npm run check
```

This runs the production build and the studio validation script. Pull requests targeting `main` are also checked by GitHub Actions.

## Pull requests

Keep pull requests focused and explain:

1. What changed.
2. Why the change is needed.
3. How you tested it.
4. Any browser, media, or compatibility considerations.

Prefer small, reviewable commits and avoid unrelated formatting or dependency changes.

## Code and content guidelines

- Preserve existing behavior unless the change intentionally modifies it.
- Keep browser-side processing privacy-conscious and avoid unnecessary server-side dependencies.
- Never commit API keys, access tokens, credentials, personal data, or generated secrets.
- Keep user-facing copy clear and accessible.
- When changing multimedia behavior, test with representative audio, subtitle, and visual assets where practical.

## Reporting bugs

Include the browser and operating system, steps to reproduce, expected behavior, actual behavior, and relevant console or build errors. Do not include secrets or private user data.

## License

By contributing to Velo AI Studio, you agree that your contributions are provided under the repository's MIT License.
