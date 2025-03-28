const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Faqat server tomonida TypeORM ishlatish
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        typeorm: false,
      };
    }

    // Keraksiz modullarni ignore qilish
    config.externals.push({
      "@sap/hana-client": "commonjs @sap/hana-client",
      "react-native-sqlite-storage": "commonjs react-native-sqlite-storage",
      mysql: "commonjs mysql",
      oracledb: "commonjs oracledb",
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["typeorm", "pg"],
  },
};

export default nextConfig;
