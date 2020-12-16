### Description 
A basic anonymous chat app

### How to use
1. `cd api`
2. `docker build -t faceless>`
3. `cd ../web`
4. `docker build -t faceless-web`
5. `cd ../api`
6. `docker-compose up`
### Stack
- Backend
  - Typescript
  - Typeorm
  - TypeGraphQL
  - PostgreSQL(main db)
  - Redis(for cookies)
- Frontend
  - Typescript
  - Next.js
  - URQL
  - GraphQL Code Gen
  - Formik
  - Chakra-UI (for dark mode toggle)

### Troubleshooting
If you get code gen error, follow these steps
1. Comment web from docker-compose.yml
2. Run `docker-compose up`
3. When the graphql server is running `cd web`
4. Run `yarn gen` 
5. Uncomment web from docker-compose.yml
6. Run `docker build -t faceless-web` in `/web`
7. Run `docker-compose up`