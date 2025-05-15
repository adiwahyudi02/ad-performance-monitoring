import { Zodios } from "@zodios/core";
import { summaryEndpoints } from "./endpoints/summary.endpoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables."
  );
}

// Create the zodios client with the axios instance and the endpoints
export const api = new Zodios(API_URL, summaryEndpoints);
