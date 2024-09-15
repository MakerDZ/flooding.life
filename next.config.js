/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatar.iran.liara.run'],
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
};

module.exports = nextConfig
