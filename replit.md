# Epiphany Global Farms

## Overview

Epiphany Global Farms is an e-commerce web application for a mixed farm business selling premium farm-fresh produce. The platform enables customers to browse products (crops, livestock), reserve piglets, subscribe to newsletters, book farm experiences, and manage a shopping cart. The application is built as a full-stack TypeScript monorepo with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for cart state
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library (New York style)
- **Build Tool**: Vite with path aliases (`@/` for client src, `@shared/` for shared code)
- **Component Structure**: 
  - UI primitives in `client/src/components/ui/` (shadcn/ui components)
  - Feature components in `client/src/components/`
  - Pages in `client/src/pages/`

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **API Pattern**: RESTful JSON API with `/api/` prefix
- **Storage Layer**: Abstracted via `IStorage` interface with in-memory implementation (`MemStorage`)
- **Database Schema**: Drizzle ORM with PostgreSQL dialect
- **Development Server**: Vite dev server integrated with Express for HMR

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas using `drizzle-zod`
- **Tables**: users, products, piglet_reservations, newsletter_subscribers, cart_items, farm_bookings

### Build Process
- **Development**: `tsx` runs TypeScript directly, Vite handles frontend HMR
- **Production**: Custom build script using esbuild for server bundling, Vite for client
- **Output**: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `./migrations/`

### Session Storage
- **connect-pg-simple**: PostgreSQL-backed session storage for Express sessions

### UI Component Library
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui**: Pre-styled components built on Radix, configured in `components.json`

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Other Notable Dependencies
- **react-hook-form**: Form state management with `@hookform/resolvers` for Zod validation
- **embla-carousel-react**: Carousel/slider functionality
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library