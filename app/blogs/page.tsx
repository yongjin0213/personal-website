import Link from "next/link";
import EditableText from "../components/cms/EditableText";
import { getAllPostsDirect } from "@/lib/api";

export default async function BlogsPage() {
  const posts: {id: number, created: Date, title: string, slug: string}[] = await getAllPostsDirect();

  return (
    <div className="flex flex-col gap-10">
      <section className="animate-slide-in rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-10 shadow-sm">
        <EditableText
          path="pages.blogs.title"
          defaultValue="Welcome to my blogs!"
          as="h1"
          className="font-display text-3xl font-semibold sm:text-4xl"
          singleLine
        />
        <EditableText
          path="pages.blogs.description"
          defaultValue="'Forgetting what is behind and straining toward what is ahead, I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.'"
          as="p"
          className="mt-4 max-w-3xl text-base italic text-[color:rgba(31,45,31,0.75)]"
        />
        <EditableText
          path="pages.blogs.description"
          defaultValue="Philippians 4:13~14"
          as="p"
          className="mt-4 max-w-3xl text-base italic text-[color:rgba(31,45,31,0.75)]"
        />
      </section>

      <section className="animate-slide-in animate-delay-1 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group rounded-2xl border border-[var(--green-muted)] bg-[var(--green-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[var(--green-accent)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-accent)]">
              {new Date(post.created).toLocaleDateString()}
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold">
              {post.title}
            </h2>
            <div className="mt-4 text-sm font-semibold text-[var(--green-accent)]">
              Read more →
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}