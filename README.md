# Cookbook App

A mobile-accessible cookbook application that parses scanned PDF recipes using AI and organizes them with ingredients lists, shopping lists, preparation times, servings, and estimated calories.

## Features

- **PDF Recipe Upload**: Upload scanned PDF documents containing recipes
- **AI-Powered Parsing**: Uses OpenAI GPT-3.5-turbo to automatically extract recipe data
- **Recipe Management**: View, organize, and access recipes on mobile devices
- **Shopping List**: Generate consolidated shopping lists from selected recipes
- **Calorie Estimation**: Automatic calorie calculation per serving
- **Elegant UI**: Vivid, mobile-friendly design using Tailwind CSS

## Prerequisites

- Ubuntu 20.04 or later
- Node.js 18+ and npm
- Bun runtime
- OpenAI API key (free tier available)

## Installation

### 1. Install Node.js and npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
# Restart your terminal or run: source ~/.bashrc
```

### 3. Clone the repository

```bash
git clone <repository-url>
cd cookbook-app
```

### 4. Install dependencies

```bash
bun install
```

### 5. Set up environment variables

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Note: For the sandbox environment, DB_URL and DB_TOKEN are auto-provided. For local development, the app uses Bun's built-in SQLite database automatically.

### 6. Set up the database

For local development, the database is set up automatically using Bun's built-in SQLite. No additional setup required.

For sandbox/production, migrations run automatically.

### 7. Build the application

```bash
bun run build
```

### 8. Start the application

```bash
bun run start
```

The app will be available at `http://localhost:3000`

## Usage

1. **Upload Recipes**: Click "Upload Recipe" and select a PDF file containing a scanned recipe
2. **View Recipes**: Browse your recipe collection on the home page
3. **Recipe Details**: Click on any recipe to see full details, ingredients, and instructions
4. **Shopping List**: Click "Shopping List" to generate a consolidated list of ingredients from all recipes

## Development

### Available Scripts

- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint for code quality checks
- `bun run typecheck` - Run TypeScript type checking
- `bun db:generate` - Generate database migrations (for schema changes)
- `bun run src/db/migrate.ts` - Run database migrations (sandbox only)

### Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page with recipe list
│   ├── upload/page.tsx       # PDF upload page
│   ├── recipe/[id]/page.tsx  # Individual recipe view
│   ├── shopping-list/page.tsx # Shopping list page
│   ├── api/upload/route.ts   # API endpoint for PDF processing
│   └── globals.css           # Tailwind CSS styles
├── db/
│   ├── schema.ts             # Database schema
│   ├── index.ts              # Database client
│   └── migrate.ts            # Migration runner
```

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: SQLite (Bun built-in for local, sandbox DB for production) with Drizzle ORM
- **AI**: OpenAI GPT-3.5-turbo for recipe parsing
- **PDF Processing**: pdf-parse library
- **Runtime**: Bun

## API Endpoints

- `POST /api/upload` - Upload and process PDF recipes

## Environment Variables

- `OPENAI_API_KEY` - Required for AI recipe parsing
- `DB_URL` - Database connection URL (auto-provided in sandbox)
- `DB_TOKEN` - Database authentication token (auto-provided in sandbox)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.