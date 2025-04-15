/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ebayimg.com',
                
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'yt3.googleusercontent.com',
            },
            {
                protocol: "https",
                hostname: "is1-ssl.mzstatic.com",
            },
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
            {
                protocol: "https",
                hostname: "www.podchaser.com",
            },
            {
                protocol: "https",
                hostname: "www.podbean.com",
            },
            {
                protocol: "https",
                hostname: "www.listennotes.com",
            },
            
        ],
    },
};

export default nextConfig;
