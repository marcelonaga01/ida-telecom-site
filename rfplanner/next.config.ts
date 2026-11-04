import type {NextConfig} from 'next';
const config: NextConfig = {
  basePath: '/rfplanner',
  trailingSlash: true,
  output: 'standalone',
  poweredByHeader: false,
  serverExternalPackages: ['node:sqlite'],
};
export default config;
