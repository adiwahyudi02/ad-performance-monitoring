# Ad Performance Monitoring

Track and analyze the performance of your advertising ads with detailed insights on key metrics such as CTR, impressions, and more.

## Demo link

https://ad-performance-monitoring.vercel.app

## Run the app locally

1. Install dependencies

   ```bash
       npm install
   ```

2. Setup environments

   Create **.env.local** file in the root project and add the environment

   ```env
       NEXT_PUBLIC_API_URL=
   ```

   You can set the `NEXT_PUBLIC_API_URL` to one of the following:

   - `http://localhost:4000`

     Use this if you want to connect to the development API. ⚠️ Make sure you have the API server running locally (ad-performance-monitoring-api project).

   - `https://ad-performance-monitoring-api.vercel.app`

     Use this to connect to the production API.

3. Start development server

   ```bash
       npm run dev
   ```

## Run the test

- Start the test cases

  ```bash
      npm run test
  ```

## Run the lint

- Start the lint

  ```bash
      npm run lint
  ```
