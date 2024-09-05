
# SMDPRO – Micro ERP System for SMD Production Line

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Projects API](#projects-api)
  - [Materials API](#materials-api)
  - [BOM API](#bom-api)
  - [Panels API](#panels-api)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

SMDPRO is a micro ERP system designed to manage the Surface Mount Device (SMD) production process. It allows for complete control over projects, materials, bill of materials (BOM), and panels. The system provides full CRUD functionality through a RESTful API and can be integrated with other systems.

The main goal of SMDPRO is to provide a localized, independent database for managing projects, with a potential for future integrations through APIs.

## Technologies

- **Backend**: Express.js (Node.js)
- **Database**: MySQL
- **Frontend**: React (planned) with Material-UI (MUI)
- **API**: RESTful
- **Containers**: Docker (planned)
- **Authentication**: JSON Web Token (JWT)

## Features

- Manage projects, materials, and panels in SMD production.
- Track production settings and revision history for every project.
- Bill of Materials (BOM) management for every production run.
- CRUD operations for projects, materials, BOM, and panels.
- RESTful API for future integration with other systems.
- Extendable for future features, such as user roles and authentication.

## Project Structure

The project is divided into two main parts:
```
erp-smdpro/
│
├── smdpro-backend/        # Backend (Node.js + Express + MySQL)
│   ├── config/            # Configuration files
│   ├── controllers/       # API controllers
│   ├── models/            # MySQL database models
│   └── routes/            # API routes
│
├── smdpro-frontend/       # Frontend (React + MUI) (planned)
│   └── ...                # To be developed
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (5.7 or higher)
- **Git**
- **Docker** (optional, for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:chefostov/SMDPro.git
   cd erp-smdpro
   ```

2. Install dependencies for the backend:
   ```bash
   cd smdpro-backend
   npm install
   ```

## Running the Project

### Backend

1. Create a `.env` file in the `smdpro-backend` folder:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=smdpro
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

*Frontend development is planned but not implemented yet.*

## Environment Variables

The following environment variables are required for the backend:

- `DB_HOST`: MySQL database host.
- `DB_USER`: MySQL username.
- `DB_PASSWORD`: MySQL password.
- `DB_NAME`: Name of the database.

## API Endpoints

### Projects API

- **GET** `/api/projects`: Get all projects.
- **POST** `/api/project`: Create a new project.
- **GET** `/api/project/:id`: Get a project by ID.
- **PUT** `/api/project/:id`: Update a project by ID.
- **DELETE** `/api/project/:id`: Delete a project by ID.

### Materials API

- **GET** `/api/materials`: Get all materials.
- **POST** `/api/material`: Create a new material.
- **GET** `/api/material/:id`: Get a material by ID.
- **PUT** `/api/material/:id`: Update a material by ID.
- **DELETE** `/api/material/:id`: Delete a material by ID.

### BOM API

- **GET** `/api/bom`: Get all BOM entries.
- **POST** `/api/bom`: Create a new BOM entry.
- **GET** `/api/bom/:id`: Get a BOM entry by ID.
- **PUT** `/api/bom/:id`: Update a BOM entry by ID.
- **DELETE** `/api/bom/:id`: Delete a BOM entry by ID.

### Panels API

- **GET** `/api/panels`: Get all panels.
- **POST** `/api/panel`: Create a new panel.
- **GET** `/api/panel/:id`: Get a panel by ID.
- **PUT** `/api/panel/:id`: Update a panel by ID.
- **DELETE** `/api/panel/:id`: Delete a panel by ID.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
