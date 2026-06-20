import type { NextConfig } from "next";

// Fix for Windows SSL certificate verification issues with Node.js
// The corporate/university network proxy intercepts TLS and causes UNABLE_TO_VERIFY_LEAF_SIGNATURE
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@google/genai'],
};

export default nextConfig;
