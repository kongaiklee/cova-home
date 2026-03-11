# COVA

**Insurance, without the admin.**

COVA is a modern insurance management platform that helps individuals and businesses manage their insurance coverage, book healthcare services, and organize insurance documents—all in one place, without paperwork or back-and-forth.

## 🎯 Overview

COVA simplifies insurance management by providing:

- **Concierge Services**: Book GP visits, health screenings, and other covered services directly through COVA, knowing what applies before you go
- **Document Management**: Upload, store, and manage policies in one secure location
- **Profile Management**: Manage personal information, addresses, and employer details seamlessly
- **Corporate Solutions**: Tools for businesses to manage insurance, employees, and company assets

## ✨ Features

### For Individuals

- **Coverage-aware bookings**: Request appointments based on your policy coverage
- **Central document storage**: Access all insurance documents without searching through emails
- **Unified profile**: Manage personal and work-related coverage in one account
- **Service coordination**: Book healthcare services through one channel

### For Corporates

- **Quotation management**: Browse, compare, and secure business insurance plans digitally
- **Employee management**: Centralized employee records with automatic profile linkage
- **Vehicle records**: Track company vehicles and their insurance details
- **Company management**: Control admin access, roles, and permissions

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd covarage
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📝 Code Quality

Check code formatting:

```bash
npm run fm:check
```

Fix formatting issues:

```bash
npm run fm:fix
```

Lint the codebase:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

## 🧭 Routes

- `/` - Home page with feature overview
- `/features` - Detailed features page
- `/corporates` - Corporate solutions page
- `*` - 404 Not Found page
