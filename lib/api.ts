const devUrl = process.env.DEV_URL
export async function getAllPosts() {
    const response = await fetch(`${devUrl}/api/blogs`)
    
    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    
    const posts = await response.json()
    return posts
}