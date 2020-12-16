### Description 
A basic anonymous chat app

### How to use
1. `cd api`
2. `docker build -t faceless>`
3. `cd ..`
4. `cd web`
5. `docker build -t faceless-web`
6. `cd ..`
7. `cd api`
8. `docker-compose up`
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
