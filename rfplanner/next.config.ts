import type {NextConfig} from 'next';
const config: NextConfig = {
  basePath: '/rfplanner',
  distDir: process.env.RF_BUILD_DIR || '.next',
  trailingSlash: true,
  output: 'standalone',
  poweredByHeader: false,
  serverExternalPackages: ['node:sqlite'],
};
export default config;
