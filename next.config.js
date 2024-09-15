/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatar.iran.liara.run', 'xsgames.co'],
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
};

module.exports = nextConfig
