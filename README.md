# Next.js 15 / Cursor - Full-Stack Template (2025)

A modern, production-ready template for building full-stack applications with Next.js 15, TypeScript, and a robust tech stack. This template is designed to accelerate development while maintaining best practices and scalability. Cursor rules preconfigured to enable quick dev building process.

## 🌟 LAST UPDATES in the template

* Useful server actions system, check [this example file](./app/_actions/example.action.ts).
* Super [custom fetch](./lib//fetch.ts) function, simplify fetch request.
* [API routes example file](./app/api/example/route.ts) with withAuth wrapper (with user data integrated).
* Stripe payments and subscriptions already set-up to make money really quickly.
* useSubscription hook to easily detect if a user has an active subscription.

## 🔄 Template Usage

After cloning this template, you'll need to dissociate it from its original git repository to use it for your own project:

```bash
# Remove the existing git repository
rm -rf .git

# Initialize a new git repository
git init

# Add all files to the new repository
git add .

# Make your first commit
git commit -m "Initial commit from Next.js 15 Full-Stack Template"

# Add your new remote repository (replace with your repository URL)
git remote add origin your-repository-url

# Push to your new repository
git push -u origin main
```

## 🚀 Features

- **Cursor rules** to build fast with Cursor AI
- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4** & **Shadcn/UI** for modern, responsive design
- **PostgreSQL** with **Supabase** for database management
- **Prisma ORM** for type-safe database queries
- **Better-auth** for authentication
- **React Hook Form** with **Zod** for form management
- **Server Actions** with next-safe-action
- Optimized for performance with React Server Components
- Mobile-first responsive design
- Built-in component library
- Comprehensive TypeScript types
- Modern development tools and configurations

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (Supabase), Prisma ORM
- **Authentication**: Better-auth
- **Emailing**: Resend
- **Form Management**: React Hook Form, Zod
- **State Management**: Server Components, Zustand (when needed)
- **Development Tools**: ESLint, Prettier, Husky

## 📦 Getting Started

1. **Clone the template**
   ```bash
   git clone [repository-url]
   cd [project-name]
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Initialize Prisma**
   ```bash
   # Generate Prisma Client
   yarn db:generate:dev
   
   # Create your first migration
   yarn db:migrate:dev init
   
   # Push the schema to your database
   yarn db:push:dev
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

## 📁 Project Structure

```
├── .cursor/             # Cursor AI rules and documentation
├── app/                 # Next.js app directory
│   ├── (authentication)/  # Auth routes
│   ├── (logged)/          # Protected routes
│   ├── (public)/          # Public routes
│   ├── api/             # API routes
│   ├── _actions/         # Page-specific actions
│   ├── _components/      # Page-specific components
│   └── globals.css       # Theme design file
├── components/        # Shared components
│   ├── providers/      # Providers components (Theme, Toast, etc.)
│   ├── layouts/        # Layout components (Layouts, Header, Footer, etc.)
│   └── ui/             # Shadcn UI components
├── config/            # Project config folder
├── lib/               # Utility functions and configurations
├── prisma/            # Database configuration
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Prisma schema
├── public/           # Static assets
│   └── images/        # Image assets
├── types/            # TypeScript type definitions
└── package.json      # Project dependencies and scripts
```

## 🔧 Configuration

- **Tailwind**: Customize theme in `tailwind.config.ts`
- **Prisma**: Database schema in `prisma/schema.prisma`
- **TypeScript**: Configuration in `tsconfig.json`
- **ESLint**: Rules in `.eslintrc.js`
- **Components**: Shadcn components in `components/ui`

## 🤖 Cursor AI Integration

This template is pre-configured to work seamlessly with [Cursor](https://cursor.sh), the AI-first code editor. The `.cursor` folder contains specific rules and documentation that help Cursor AI understand:

- Project architecture and conventions
- Component creation patterns
- Styling guidelines with Tailwind
- Database operations with Prisma
- Form handling with React Hook Form and Zod
- Server actions implementation
- Authentication flows
- Naming conventions and code style

When using Cursor as your IDE, the AI will automatically:
- Follow project-specific conventions
- Generate code that matches the template's architecture
- Provide contextually aware suggestions
- Help maintain consistency across the codebase

To get the most out of this integration:
1. Use Cursor as your primary IDE
2. Keep the `.cursor` folder up to date with your project's evolution
3. Refer to the rules in `.cursor/rules` when adding new features

## 🚦 Development Guidelines

1. **Components**
   - Use Server Components by default
   - Add 'use client' only when necessary
   - Place page-specific components in `_components` folders
   - Use Shadcn/UI components when available

2. **Styling**
   - Use Tailwind CSS for all styling
   - Follow mobile-first approach
   - Use theme variables from `tailwind.config.ts`

3. **Data Fetching**
   - Prefer Server Components for data fetching
   - Use Server Actions for mutations
   - Implement proper error handling and loading states

4. **Forms**
   - Use React Hook Form with Zod validation
   - Place schemas in `lib/schemas`
   - Use form-builder component for consistency

## 🔐 Authentication

The template uses better-auth for authentication. Configure your authentication providers in the auth configuration files.

## 💸 Stripe payments

Stripe already configured to create custom amount payments or the create users subscriptions.

1. In [project config](./config/project.ts), you can enable or disable Stripe feature.
   If enable, set your plans data, and that it !
   In local development, you need a Stripe webhook listener active for subcriptions work.

2. Set Stripe environnement variables in the .env file.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com)

## ⚠ Potentials Troubleshootings

* Supabase storage policies

Added roles column to user table caused an issue with protected Supabase storage policies. On Supabase storage settings, you can set policies with just `true` rule to allow all access. I working to fix this issue.
