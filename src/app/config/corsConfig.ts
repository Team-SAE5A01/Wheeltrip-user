// app/config/corsConfig.ts

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
export const apiUrl: string = 'http://localhost:4500';
