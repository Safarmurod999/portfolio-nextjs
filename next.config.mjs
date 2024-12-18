/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native-sqlite-storage": false,
      "@sap/hana-client/extension/Stream": false,
      mysql: false,
      mysql2: false,
      sqlite3: false,
      "better-sqlite3": false,
      "pg-native": false,
    };
    return config;
  },
};

export default nextConfig;
