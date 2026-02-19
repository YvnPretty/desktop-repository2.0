# PHP CRUD App Setup

## Prerequisites

- For local development: [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine installed.
- For deployment: A GitHub account and an account on a platform like Render, Railway, or Fly.io.

## Running Locally

1. **Build and Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
2. Open your browser and go to `http://localhost:8080`.

## Deploying to Production (e.g., Render)

Since this project is now Dockerized, you can deploy it easily:

1. Push this code to your GitHub repository.
2. Go to [Render.com](https://render.com) (or similar).
3. Create a new **Web Service**.
4. Connect your GitHub repository.
5. Render will automatically detect the `Dockerfile` and build your app.
6. Once deployed, your app will be live!

**Note on Database:**
This app uses SQLite (`database.db`). In a containerized environment (like Render), the filesystem is often ephemeral (temporary). If you redeploy, your data might be lost unless you configure a persistent volume or switch to a hosted database like PostgreSQL or MySQL.
