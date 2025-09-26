# Guia de Contribuição / Contributing Guide

## Português (PT-BR)

Obrigado por considerar contribuir para este projeto! Este documento fornece diretrizes para contribuições.

### Commits Convencionais

Este projeto segue a especificação [Conventional Commits](https://www.conventionalcommits.org/). Use os seguintes tipos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Mudanças que não afetam o significado do código (espaços em branco, formatação, etc.)
- `refactor`: Mudança no código que não corrige um bug nem adiciona uma funcionalidade
- `test`: Adicionando testes ausentes ou corrigindo testes existentes
- `chore`: Mudanças no processo de build ou ferramentas auxiliares

Exemplo: `feat: add weather data caching functionality`

### Estratégia de Branching

- `main`: Branch principal, sempre estável
- `feature/*`: Novas funcionalidades
- `fix/*`: Correções de bugs
- `chore/*`: Tarefas de manutenção

### Processo de Desenvolvimento

1. Fork o repositório
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/amazing-feature`)
3. Faça commit das suas mudanças (`git commit -m 'feat: add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

### Testes

- Certifique-se de que todos os testes passam antes de submeter um PR
- Adicione testes para novas funcionalidades
- Mantenha a cobertura de testes acima de 80%

---

## English (EN-US)

Thank you for considering contributing to this project! This document provides guidelines for contributions.

### Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Use the following types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example: `feat: add weather data caching functionality`

### Branching Strategy

- `main`: Main branch, always stable
- `feature/*`: New features
- `fix/*`: Bug fixes
- `chore/*`: Maintenance tasks

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Testing

- Ensure all tests pass before submitting a PR
- Add tests for new features
- Keep test coverage above 80%