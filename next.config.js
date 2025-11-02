/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['spacetimedb'],
  webpack: (config, { isServer }) => {
    // Fix for MetaMask SDK and React Native dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "react-native": false,
      "@react-native-async-storage/async-storage": false,
      "react-native-get-random-values": false,
      "react-native-keychain": false,
    };

    // Ignore specific modules that cause issues
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        "@react-native-async-storage/async-storage": false,
        "react-native": false,
      });
    }

    return config;
  },
  // Disable source maps in development to reduce bundle size
  productionBrowserSourceMaps: false,
  // Optimize for better performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;