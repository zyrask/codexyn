# Portfolio Website - codexyn

## Overview

This is a modern portfolio website for codexyn, a developer specializing in Discord bots and game development. The site features a sleek, dark-themed design with smooth animations and a hidden "Progress Tracker" section unlocked by a secret code. The application is built as a full-stack web application using React with TypeScript on the frontend and Express.js on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **Animations**: Framer Motion for smooth, modern animations
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for progress updates and images
- **Middleware**: Custom request logging and error handling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Storage**: In-memory storage implementation for development/demo purposes

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with logo and navigation links
2. **Hero Section**: Main landing area with avatar and introduction
3. **Projects Section**: Showcase of current projects (Broadcast Error, Light Yagami, Luckigi, Sentinel)
4. **About Section**: Skills and specialties with progress bars
5. **Broadcast Error Section**: Special section for the main collaborative project
6. **Contact Section**: Contact information and social links
7. **Progress Tracker**: Hidden section unlocked by secret code (9017598429)
8. **Footer**: Simple footer with personal branding

### Backend Endpoints
- `GET /api/progress-updates` - Fetch all progress updates
- `POST /api/progress-updates` - Create new progress update
- `GET /api/progress-images` - Fetch all progress images
- `POST /api/progress-images` - Create new progress image

### Database Schema
- **users**: User authentication (id, username, password)
- **progress_updates**: Development progress entries (id, week, title, description, date, created_at)
- **progress_images**: Progress-related images (id, title, url, description, created_at)

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express.js handles requests with validation using Zod schemas
3. **Data Storage**: Currently uses in-memory storage with sample data
4. **Response Handling**: Type-safe responses using shared TypeScript types
5. **State Management**: React Query manages caching and synchronization

## External Dependencies

### UI Framework
- **shadcn/ui**: Complete UI component library built on Radix UI
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the entire application
- **ESLint/Prettier**: Code quality and formatting
- **Replit Integration**: Development environment optimization

### Backend Libraries
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **express**: Web framework for Node.js

## Deployment Strategy

### Development Mode
- Vite dev server for frontend with HMR
- tsx for running TypeScript backend with auto-reload
- In-memory storage for rapid development

### Production Build
- Vite builds optimized frontend bundle to `dist/public`
- esbuild compiles backend TypeScript to `dist/index.js`
- Static file serving through Express for single deployment

### Environment Configuration
- Database URL configuration through environment variables
- Conditional development tooling (Replit plugins, error overlays)
- Production-ready error handling and logging

### Special Features
- **Secret Code System**: Invisible input listener for code "9017598429" that activates edit mode
- **Progress Tracker**: Publicly visible section showing Broadcast Error development progress
- **Edit Mode**: Secret code enables inline editing of progress updates and images with auto-save
- **CRUD Operations**: Full create, read, update, delete functionality for progress content
- **Smooth Animations**: Framer Motion integration throughout
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Theme**: Consistent dark color scheme with red accents

### Recent Changes (January 19, 2025)
- **Enhanced Progress Tracker**: Converted from hidden section to publicly visible with edit mode
- **Edit Mode Functionality**: Added ability to create, edit, and delete progress updates and images
- **Inline Editing**: Click-to-edit interface with save/cancel options
- **Auto-save Backend**: Extended API with PATCH and DELETE endpoints for real-time updates
- **Visual Indicators**: Edit mode badge and hover controls for seamless content management