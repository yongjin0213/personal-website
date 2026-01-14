import {
    NextRequest,
    NextResponse
} from 'next/server';

import {
    prisma
} from '@/lib/prisma';

export async function GET(request: NextRequest, context: {params: Promise<{slug:string}>}) {
    const { slug } = await context.params;
    const post = await prisma.post.findUnique({
        where: {
            slug: slug
        },
        select: {
            id: true,
            title: true,
            created: true,
            slug: true,
            content: true
        }
    })

    if (!post) {
        console.log("Returning a 404 error")
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(post, {
        status: 200
    })
}