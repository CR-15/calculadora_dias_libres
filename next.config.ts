import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Capacitor carga esta exportación dentro de la aplicación Android.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
