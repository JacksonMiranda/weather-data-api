# Arquitetura / Architecture

## Português (PT-BR)

### Visão Geral

Este documento descreve a arquitetura do sistema usando diagramas C4 (Context, Container, Component, Code).

### Diagrama de Contexto C4

```mermaid
C4Context
    title Sistema de API de Dados Climáticos - Diagrama de Contexto

    Person(user, "Usuário", "Desenvolvedor ou aplicação que consome dados climáticos")
    
    System(weatherApi, "API de Dados Climáticos", "Sistema que coleta, armazena e expõe dados climáticos")
    
    System_Ext(openWeather, "OpenWeather API", "Serviço externo que fornece dados climáticos")
    
    Rel(user, weatherApi, "Consulta dados climáticos", "HTTPS/REST")
    Rel(weatherApi, openWeather, "Busca dados climáticos", "HTTPS/REST")
```

### Diagrama de Container C4

```mermaid
C4Container
    title Sistema de API de Dados Climáticos - Diagrama de Container

    Person(user, "Usuário", "Desenvolvedor ou aplicação")

    Container_Boundary(system, "API de Dados Climáticos") {
        Container(api, "API REST", "Node.js, Express", "Expõe endpoints REST para dados climáticos")
        Container(database, "Base de Dados", "PostgreSQL", "Armazena dados climáticos coletados")
    }

    System_Ext(openWeather, "OpenWeather API", "Serviço externo de dados climáticos")

    Rel(user, api, "Requisições HTTP", "HTTPS/REST")
    Rel(api, database, "Lê/Escreve dados", "SQL/TCP")
    Rel(api, openWeather, "Busca dados climáticos", "HTTPS/REST")
```

---

## English (EN-US)

### Overview

This document describes the system architecture using C4 diagrams (Context, Container, Component, Code).

### C4 Context Diagram

The context diagram above shows the high-level view of the Weather Data API system and its interactions with external entities.

### C4 Container Diagram

The container diagram above shows the high-level technology choices and how responsibilities are distributed across containers.

## Architecture Decision Records (ADRs)

For detailed architectural decisions, see:

- [ADR-0001: Record Architecture Decisions](./adr/0001-record-architecture.md)

## Tecnologias / Technologies

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **PostgreSQL**: Base de dados relacional
- **Docker**: Containerização

### APIs Externas / External APIs
- **OpenWeather API**: Dados climáticos em tempo real

### Ferramentas de Desenvolvimento / Development Tools
- **Docker Compose**: Orquestração de containers
- **Swagger/OpenAPI**: Documentação da API
- **nodemon**: Hot reload durante desenvolvimento