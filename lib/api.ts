const devUrl = process.env.DEV_URL
export async function getAllPosts() {
    const response = await fetch(`${devUrl}/api/blogs`)
    
    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    
    const posts = await response.json()
    return posts
}

import { prisma } from './prisma';

export async function getAllPostsDirect() {
    return await prisma.post.findMany({
        select: {
            id: true,
            created: true,
            title: true,
            slug: true
        },
        orderBy: {
            created: 'desc'
        }
    })
}