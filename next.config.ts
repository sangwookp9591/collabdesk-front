import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.pravatar.cc', 'http://localhost:3000'],
  },
};

export default withVanillaExtract(nextConfig);
