# Simple Fastify API

This project is a simple API made with Fastify framework for learning purposes.

### Requirements

- `Node` v24^

- `pnpm` v11^

- `docker` v29^

### Download the project

```bash
git clone https://github.com/azevedoruan/simple-fastify-api.git
cd simple-fastify-api
pnpm install # to install dependencies
```

### Run
- First you have to set your `.env` file. For this example, use:
```bash
DB_PORT=3333
DATABASE_URL="postgresql://postuser:postpwd@localhost:5432/postdb"
```
- Type the follows command to start the app:
```bash
# Start the DB with docker compose in background
sudo docker compose up -d

# To create the SQL migrations
pnpm run migrate-generate

# To create the tables in DB
pnpm run migrate

# Start listen
pnpm run dev
```