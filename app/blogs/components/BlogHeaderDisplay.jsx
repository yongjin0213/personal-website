'use client'

export default function BlogHeaderDisplay({ post }){
    return (
      <section className="animate-slide-in rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-10 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-accent)]">
          {new Date(post.created).toLocaleString()}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {post.title}
        </h1>
      </section>
    ) 
};