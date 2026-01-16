# Flatcolor PDF

A modern web application for converting images to flat color PDFs with customizable layouts and color palettes.

## Project Overview

Flatcolor PDF allows users to upload images, select color schemes, choose page layouts, and generate beautiful PDF documents with flat color designs. Built with React and TypeScript, it provides an intuitive user interface for quick PDF generation.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/dev-adnansultan/flatcolor-pdf.git

# Step 2: Navigate to the project directory
cd flatcolor-pdf

# Step 3: Install the dependencies
npm i

# Step 4: Start the development server
npm run dev
```

The application will start at `http://localhost:5173` with hot module reloading enabled.

### Build for Production

```sh
npm run build
```

### Running Tests

```sh
npm run test
```

## Technologies Used

This project is built with:

- **Vite** - Lightning-fast build tool
- **TypeScript** - For type safety and better development experience
- **React** - UI library
- **shadcn-ui** - High-quality UI components
- **Tailwind CSS** - Utility-first CSS framework

## Features

- 🎨 Customizable color palette selection
- 📄 Multiple page layout options
- 🖼️ Image upload and preview
- 📋 Flat color PDF generation
- 📝 Edit header and footer information across all pages
- 🎯 Responsive design

## Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # shadcn-ui components
│   └── ...           # Feature components
├── lib/              # Utility functions
├── pages/            # Page components
├── hooks/            # Custom React hooks
└── test/             # Test files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
