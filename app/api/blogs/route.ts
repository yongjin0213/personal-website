import {
    NextRequest,
    NextResponse
} from 'next/server';

import {
    prisma
} from '@/lib/prisma';

import slugify from 'slugify';

export async function GET(request: NextRequest) {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            created: true,
            slug: true
        }
    })
    return NextResponse.json(posts, {
        status: 200
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            title,
            content
        } = body

        if (!title || !content) {
            return NextResponse.json({
                error: 'Title and content are required'
            }, {
                status: 400
            })
        }

        const slug = slugify(title, {
            lower: true,
            strict: true,
        })

        const post = await prisma.post.create({
            data: {
                title,
                content: {
                    "blocks": content
                },
                slug,
                created: new Date()
            },
        })

        return NextResponse.json({
            message: 'Post created successfully',
            post
        }, {
            status: 201
        })

    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({
                error: 'A post with this title already exists'
            }, {
                status: 409
            })
        }

        console.error(error)

        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest) {
    const body = await request.json()
    const {
        id
    } = body

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    if (!post) {
        return NextResponse.json({
            error: 'Post not found'
        }, {
            status: 404
        })
    }

    const deletePost = await prisma.post.delete({
        where: {
            id: id,
        },
    })

    return NextResponse.json({
        status: 200
    })
}