# Gramoday-API

A Node-Express JS API (using MongoDB) web-service which captures user contributed reports and returns an aggregate report in response.

---

## Installation

### Requirements

You will need [Nodejs](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/)

### Setup

1. Clone this repository.

   ```sh
   git clone https://github.com/karmanya007/Gramoday-API.git
   ```

2. Make config.env file and put the following variables:

   ```sh
   NODE_ENV=development
   DATABASE=<Your mongodb connection string>
   DATABASE_PASSWORD=<Your database connection password>
   ```

3. Open this directory in the terminal and run:

   ```sh
   npm install
   npm run dev
   ```

4. For unit testing

   ```
    npm run test
    OR
    npm run watch
   ```

5. Visit http://localhost:3000/
