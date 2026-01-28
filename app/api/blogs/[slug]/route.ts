import {
    NextRequest,
    NextResponse
} from 'next/server';

import {
    prisma
} from '@/lib/prisma';

export async function GET(context: {params: Promise<{slug:string}>}) {
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
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        )
    }
    return NextResponse.json(post, {
        status: 200
    })
}