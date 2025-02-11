// src/lib/appConfig.ts

// Define the shape of the CORS configuration
export interface CorsConfig {
  origin: string;
  methods: string[];
  allowedHeaders: string[];
}

// Define the actual config using the interface
export const corsConfig: CorsConfig = {
  origin: 'http://localhost:3000',  // Allow only frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// You can define other settings here, such as API URLs or logging configurations

// Access environment variables from the container or environment
const buildEnv = process.env.NEXT_PUBLIC_BUILD_ENV; // Get the current build environment
const protocol = process.env.NEXT_PUBLIC_REQUEST_PROTOCOL;
const datamediaPort = process.env.NEXT_PUBLIC_DATAMEDIA_PORT;

let apiHostname: string;

// Choose the appropriate hostname based on the build environment
if (buildEnv === 'production') {
    // In production, use the AWS_MICRO_IP
    apiHostname = process.env.NEXT_PUBLIC_AWS_MICRO_IP || 'UNDEFINED' // Fallback to a default if not set
} else {
    // In other environments (e.g., development or staging), use LOCALHOST
    apiHostname = process.env.NEXT_PUBLIC_LOCALHOST || 'UNDEFINED'; // Fallback to 'localhost' if not set
}

const apiBaseUrl = `${protocol}://${apiHostname}:${datamediaPort}`;

console.log(apiBaseUrl)

// Export the hostnames and build environment
export { apiBaseUrl, buildEnv };
