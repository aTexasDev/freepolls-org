# Free Polls (Research Hub)

The authority on online polling. Discover polling trends, compare the best free poll makers, and learn how to create viral polls that engage your audience.

**Live:** [freepolls.org](https://freepolls.org)

## Tech Stack

- Vanilla JavaScript
- HTML5 / CSS3
- Blog with SEO-optimized articles
- i18n internationalization support

## Features

- Polling industry research and trends
- Poll maker comparison guides
- Best practices for creating engaging polls
- Blog with polling tips and strategies
- Multi-language support

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/aTexasDev/freepolls-org.git
cd freepolls-org
```

2. Open `index.html` in your browser, or serve with any static file server:
```bash
npx serve .
```

## Architecture

This is the frontend application. It communicates with a serverless backend (AWS Lambda + API Gateway) for authenticated operations and data persistence.

- **Authentication:** Google OAuth 2.0
- **Payments:** Stripe Checkout
- **Hosting:** AWS S3 + CloudFront CDN
- **Backend:** AWS Lambda (not included in this repo)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built by [T.K. Flautt](https://snapitsoftware.com) | [SnapIT Software](https://snapitsoftware.com)
