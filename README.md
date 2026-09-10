# Volunteer Shift API

This project is a small TypeScript Express API for managing volunteer shifts and signups without needing a MongoDB service installed locally.

It uses an in-memory mock data layer so the app runs in a local development environment without any external database setup.

## Tech stack

- TypeScript
- Express
- Zod
- Jest
- Supertest

## Project structure

- src/app.ts — Express app setup
- src/server.ts — starts the server
- src/models/shift.ts — shift schema and in-memory data model
- src/models/signup.ts — signup schema and in-memory data model
- src/routes/shift.ts — shift and signup endpoints
- src/tests/api.test.ts — smoke test

## Install dependencies

```bash
npm install
```

## Run the server

```bash
npx ts-node src/server.ts
```

The app listens on port 3000.

## Create a shift

```bash
curl -X POST http://localhost:3000/shift \
  -H "Content-Type: application/json" \
  -d '{"name":"Morning Crew","capacity":2}'
```

Example response:

```json
{
  "data": {
    "_id": "1750000000000-0.123456789",
    "name": "Morning Crew",
    "capacity": 2
  }
}
```

## Add a volunteer signup

Use the `_id` returned from the previous request:

```bash
curl -X POST http://localhost:3000/shift/<SHIFT_ID>/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
```

Example:

```bash
curl -X POST http://localhost:3000/shift/1750000000000-0.123456789/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
```

Example success response:

```json
{
  "data": {
    "_id": "1750000000001-0.456789123",
    "shiftId": "1750000000000-0.123456789",
    "name": "Alice"
  }
}
```

## Full shift behavior

If a shift reaches its capacity, the signup endpoint returns:

```json
{
  "err": "full"
}
```

If the shift ID does not exist, it returns:

```json
{
  "err": "no shift"
}
```
curl -X POST http://localhost:3000/shift/does-not-exist/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'

Shift does not exist


## Run tests

```bash
npx jest --runInBand
```

## Notes

- The in-memory mock data resets when the server restarts.
- This setup is intended for local development and testing, not production persistence.
