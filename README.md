# Chocolate Smart Home Frontend

Interface for the [Chocolate Smart Home](https://github.com/ZFudge/chocolate-smart-home) project.

## Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine UI](https://mantine.dev/) - Component library and styling system
- [Vite](https://vitejs.dev/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Real-time communication with [chocolate-smart-home-backend](https://github.com/ZFudge/chocolate-smart-home-backend)
- [Docker](https://www.docker.com/) - Containerization for consistent development environment
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Prerequisites

- Docker
- Make

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ZFudge/chocolate-smart-home-frontend.git
cd chocolate-smart-home-frontend
```

2. Start the development environment:
```bash
# only run the first time
make network container install
# run the development server
make dev
```

## Development Tools

### Storybook
Launch Storybook to view and develop components in isolation:
```bash
make storybook
```
