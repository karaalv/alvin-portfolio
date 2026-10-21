/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            ['tt', 'tiktok'],
            ['ig', 'instagram'],
            ['x', 'x'],
            ['in', 'linkedin'],
        ].map(([stub, platform]) => ({
            source: `/${stub}/links`,
            destination:
                `/links?utm_source=${platform}` +
                '&utm_medium=social&utm_campaign=profile',
            permanent: false,
        }));
    },
};

export default nextConfig;
