# Velo AI Studio

**Open-source, browser-based AI video creation studio.**

[![Build](https://github.com/ErasmoAA/velo-ai-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/ErasmoAA/velo-ai-studio/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Velo AI Studio is a public open-source project for assembling narrated videos from scripts, subtitles, audio, and AI-assisted visual assets in a browser-first workflow.

🌐 **Live application:** https://veloaistudio.online/

## What Velo does

Velo brings several stages of AI-assisted video production into one browser workflow:

- Work with narration and audio files
- Process SRT subtitles and timestamps
- Generate and organize AI-assisted visual assets
- Synchronize scenes, subtitles, audio, and visual assets
- Export videos for common social/video formats
- Render video in the browser using modern web media capabilities
- Support landscape (16:9) and vertical (9:16) workflows

The project is aimed at creators producing narrated, documentary, educational, and social-media videos who want to reduce repetitive work across separate AI and video-production tools.

## Why this project exists

AI video production is fragmented across scripting, narration, asset generation, editing, subtitle synchronization, and rendering tools. Velo explores a browser-first alternative: bringing these steps into a single workflow while keeping the project inspectable and extensible as open source.

Velo is currently an early-stage public project maintained by its creator. The repository is public so developers can inspect the implementation, report issues, suggest improvements, and contribute code and documentation.

## Project status

Velo is actively evolving. The current engineering focus is reliability, browser compatibility, multimedia processing, clearer developer documentation, and making AI integrations easier to extend.

The production build is validated automatically with GitHub Actions on pushes and pull requests to `main`.

This is an active development project rather than a finished production framework. Interfaces and implementation details may change as the architecture matures.

## Technology

- HTML, CSS, and JavaScript
- Eleventy and Nunjucks for the site/build layer
- Markdown / Markdown-it for content
- Browser media APIs for client-side multimedia processing and rendering
- Third-party AI services where applicable to application features

The integration layer is intentionally evolving as the project matures.

## Getting started

### Requirements

- Node.js 18+ recommended
- npm
- A modern Chromium-, Firefox-, or WebKit-based browser

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Project structure

```text
.
├── studio.html        # Main Velo AI Studio interface
├── index.html         # Public landing page
├── blog/              # Documentation and editorial content
├── _includes/         # Eleventy/Nunjucks templates
├── _data/             # Site and content data
├── _scripts/          # Build/content utilities
├── .github/           # CI and contribution templates
├── .eleventy.js       # Eleventy configuration
├── package.json       # Build configuration and dependencies
└── theme.css          # Shared styling
```

## Open-source roadmap

Planned areas include:

- Improve developer and contributor documentation
- Expand automated testing and validation
- Improve error handling and recovery during long video workflows
- Refine multimedia processing architecture
- Improve browser compatibility
- Make AI integrations easier to extend and maintain
- Document APIs and internal modules
- Establish a clearer contribution workflow
- Grow the community of users and external contributors

Priorities may change based on real-world usage and community feedback.

## Contributing

Contributions, bug reports, feature ideas, and documentation improvements are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Bug reports and feature requests can also be submitted through the repository's issue templates.

## Security

If you discover a security issue, please follow [SECURITY.md](SECURITY.md) rather than publishing sensitive details in a public issue.

## License

Velo AI Studio is released under the **MIT License**. See [LICENSE](LICENSE) for the full text.
