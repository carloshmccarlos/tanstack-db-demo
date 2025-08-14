# TanStack Start Demo 🚀

An interactive demo of TanStack Start focusing on real-time client interaction with Tanstack DB. 
## 🌟 Features

- **🔐 Authentication**: Complete user registration and login system with email verification
- **📊 Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **🎭 Joke Management**: Create, view, and manage jokes with a beautiful interface
- **📱 Responsive Design**: Modern UI built with Tailwind CSS and Shadcn/ui components
- **⚡ Performance**: Tanstack DB for real-time client interaction
- **🛠️ Type Safety**: Full TypeScript support throughout the application with valibot

## 🏗️ Tech Stack

- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[TanStack Query](https://tanstack.com/db)** - Data fetching and caching
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form management
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[Valibot](https://valibot.dev/)** & **[Zod](https://zod.dev/)** - Schema validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/carloshmccarlos/tanstack-demo.git
   cd tanstack-demo
   ```

2. **Install dependencies**
   ```bash
   # Using bun (recommended)
   bun install
   
   # Or using npm
   npm install
   
   # Or using pnpm
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env .env
   ```
   Configure your `.env` file with:
 

4. **Set up the database**

   Follow the drizzle doc to create the database and run the migrations.

5. **Start the development server**
   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui base components
│   ├── form/           # Form-related components
│   ├── table/          # Table components
│   ├── AuthForm.tsx    # Authentication form
│   ├── Header.tsx      # Navigation header
│   └── ...
├── db/                 # Database configuration
│   ├── schema.ts       # Database schema definitions
│   ├── client.ts       # Database client setup
│   └── collections.ts  # Database collections
├── lib/                # Utility functions and configurations
│   ├── auth/           # Authentication utilities
│   └── utils.ts        # General utilities
├── routes/             # File-based routing
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page
│   ├── auth/           # Authentication routes
│   ├── jokes/          # Joke management routes
│   └── joke-table/     # Joke table routes
├── serverFn/           # Server functions
├── styles/             # Global styles
├── validation/         # Schema validation
├── router.tsx          # Router configuration
└── server.ts           # Server entry point
```

