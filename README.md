# Velo AI Studio

**Open-source, browser-based AI video creation studio.**

Velo AI Studio is a web application for turning scripts, narration, subtitles, and AI-generated visual assets into complete videos from the browser. The project is designed to simplify a workflow that normally requires several separate AI and video-production tools.

🌐 **Live application:** https://veloaistudio.online/

## What Velo does

Velo brings several stages of AI-assisted video production into one browser workflow:

- Generate visual assets with AI
- Work with narration and audio files
- Process SRT subtitles and timestamps
- Create text-to-speech narration
- Synchronize scenes, subtitles, audio, and visual assets
- Export videos for common social/video formats
- Render video in the browser using modern web media capabilities
- Support both landscape (16:9) and vertical (9:16) workflows

The application is intended to reduce repetitive work for creators who produce narrated, documentary, educational, and social-media videos.

## Why this project exists

AI video production is often fragmented across multiple applications and services. Velo explores a different approach: provide a single, browser-first workflow where AI-assisted asset generation and multimedia assembly can be combined without requiring a traditional desktop video editor.

The project is currently in an early public-development stage. The repository is intentionally public so that the project can be inspected, improved, and eventually opened to contributions from other developers.

## Technology

The repository currently uses:

- HTML, CSS, and JavaScript for the application
- Eleventy for the static site/build layer
- Nunjucks for templating
- Markdown/Markdown-it for content
- Browser media APIs for client-side processing and rendering
- Third-party AI services where applicable to the application's features

The exact set of integrations can evolve as the project develops.

## Getting started

### Requirements

- Node.js 18+ recommended
- npm
- A modern Chromium-, Firefox-, or WebKit-based browser for the web application

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

The generated site can be deployed to a static hosting provider such as Netlify or another compatible platform.

## Project structure

```text
.
├── studio.html        # Main Velo AI Studio interface
├── index.html         # Public landing page
├── blog/              # Documentation and editorial content
├── _includes/         # Eleventy/Nunjucks templates
├── _data/             # Site and content data
├── _scripts/          # Build/content utilities
├── .claude/           # Project-specific Claude development configuration
├── .eleventy.js       # Eleventy configuration
├── package.json        # Build configuration and dependencies
└── theme.css          # Shared styling
```

## Open-source roadmap

The current priority is to move Velo from an early public project toward a more mature, reliable, and contributor-friendly open-source tool.

Planned areas include:

- Improve documentation for developers and contributors
- Expand automated testing and validation
- Improve error handling and recovery during long video workflows
- Refine the multimedia processing architecture
- Improve browser compatibility
- Make AI integrations easier to extend and maintain
- Document the project's APIs and internal modules
- Establish a clearer contribution workflow
- Grow the community of users and external contributors

This roadmap is intentionally evolutionary; implementation priorities may change based on real-world usage and community feedback.

## Contributing

Contributions, bug reports, feature ideas, and documentation improvements are welcome as the project becomes more community-oriented.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Security

If you discover a security issue, please follow the instructions in [SECURITY.md](SECURITY.md) rather than publishing sensitive details in a public issue.

## License

Velo AI Studio is released under the **MIT License**. See [LICENSE](LICENSE) for the full text.

## Project status

Velo AI Studio is an active early-stage open-source project maintained by its creator. It is available publicly at https://veloaistudio.online/ and is being developed toward a more robust and community-friendly release.

If you find the project useful, feedback, issues, documentation improvements, and contributions are especially valuable while the project is growing.
