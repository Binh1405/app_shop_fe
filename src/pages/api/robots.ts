export default function handler() {
    const robots = `
        User-agent: *
        Disallow: /system/
        Disallow: /dashboard/
        Sitemap: ${process.env.SITE_URL}/sitemap.xml
    `

    return new Response(robots, {
        headers: {
            "Content-type": "text/plain"
        }
    })
}