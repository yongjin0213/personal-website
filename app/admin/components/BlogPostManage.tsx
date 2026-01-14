'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react' // If you have lucide-react installed

const handleDelete = async (id: number) => {
    const response = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    });

    if (!response.ok) {
        console.log("There was an error with handling your request");
        return null;
    }

    const data = await response.json()
    return data
}

type Post = {
    id: number
    created: Date
    title: string
    slug: string
}

export default function BlogPostManage({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState(initialPosts)
    const [deleting, setDeleting] = useState<number | null>(null)

    const onDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        
        if (!confirm('Are you sure you want to delete this post?')) {
            return
        }

        setDeleting(id)
        const result = await handleDelete(id)
        
        if (result) {
            setPosts(posts.filter(post => post.id !== id))
        }
        setDeleting(null)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="font-display text-3xl font-bold text-[var(--green-dark)]">
                    Manage Blog Posts
                </h1>
                <p className="text-sm text-[color:rgba(31,45,31,0.6)]">
                    Click the delete button to remove a post permanently
                </p>
            </div>

            {/* Posts Grid */}
            <section className="animate-slide-in animate-delay-1 grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                    <div
                        key={post.slug}
                        className="group relative rounded-2xl border border-[var(--green-muted)] bg-[var(--green-surface)] p-6 shadow-sm transition hover:shadow-md"
                    >
                        {/* Delete Button */}
                        <button
                            onClick={(e) => onDelete(post.id, e)}
                            disabled={deleting === post.id}
                            className="absolute right-4 top-4 rounded-lg bg-red-50 p-2 text-red-600 opacity-0 transition hover:bg-red-100 group-hover:opacity-100 disabled:opacity-50"
                            aria-label="Delete post"
                        >
                            {deleting === post.id ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                            ) : (
                                <Trash2 className="h-5 w-5" />
                            )}
                        </button>

                        {/* Post Content */}
                        <div className="pr-12">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-accent)]">
                                {new Date(post.created).toLocaleDateString()}
                            </p>
                            <h2 className="mt-3 font-display text-xl font-semibold text-[var(--green-dark)]">
                                {post.title}
                            </h2>
                            <p className="mt-2 text-sm text-[color:rgba(31,45,31,0.5)]">
                                /{post.slug}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Empty State */}
            {posts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[var(--green-muted)] bg-[var(--green-surface)] p-12 text-center">
                    <p className="text-[color:rgba(31,45,31,0.6)]">
                        No blog posts yet. Create one to get started!
                    </p>
                </div>
            )}
        </div>
    )
}