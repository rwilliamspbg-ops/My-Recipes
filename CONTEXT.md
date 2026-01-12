# Cookbook App

## Project Purpose
A mobile-accessible cookbook application that allows users to upload scanned PDF recipe documents, automatically parse them using OpenAI, and organize recipes with ingredients lists, shopping lists, preparation times, servings, and estimated calories.

## Key Features
- **PDF Upload & Parsing**: Upload scanned recipe PDFs, extract text, and use OpenAI to parse into structured recipe data.
- **Recipe Management**: View all recipes in a grid layout with key details.
- **Detailed Recipe View**: See full ingredients, instructions, prep time, servings, and calories.
- **Shopping List**: Aggregate ingredients from all recipes into a consolidated shopping list.
- **Calorie Estimation**: Automatically estimate calories per serving using AI parsing.
- **Mobile-Friendly UI**: Vivid and elegant design using Tailwind CSS for optimal mobile experience.

## Architecture
- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS v4.
- **Backend**: Next.js API routes for file upload and processing.
- **Database**: SQLite with Drizzle ORM for recipe storage.
- **AI Integration**: OpenAI GPT-3.5-turbo for recipe parsing and calorie estimation.
- **PDF Processing**: pdf-parse library for text extraction from PDFs.

## Database Schema
- `recipes` table: id, title, ingredients (JSON array), instructions, prep_time, servings, calories_per_serving, created_at.

## API Endpoints
- `POST /api/upload`: Accepts PDF file, extracts text, parses with OpenAI, saves to DB.

## Pages
- `/`: Recipe list with upload and shopping list links.
- `/upload`: PDF upload form.
- `/recipe/[id]`: Detailed recipe view.
- `/shopping-list`: Aggregated shopping list from all recipes.

## Dependencies
- Next.js, React, TypeScript
- Tailwind CSS
- Drizzle ORM, Drizzle Kit
- OpenAI SDK
- pdf-parse

## Development Commands
- `bun install`: Install dependencies
- `bun build`: Build for production
- `bun lint`: Run ESLint
- `bun typecheck`: Run TypeScript checks
- `bun db:generate`: Generate database migrations
- `bun db:migrate`: Run migrations

## Environment Variables
- `OPENAI_API_KEY`: Required for AI parsing
- `DB_URL`, `DB_TOKEN`: Auto-provided for database

## Future Enhancements
- User authentication
- Recipe categories/tags
- Ingredient substitutions
- Nutritional analysis integration
- Recipe sharing