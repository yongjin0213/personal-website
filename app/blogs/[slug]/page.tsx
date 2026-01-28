import { notFound } from "next/navigation";
import BlogHeaderDisplay from "@/app/blogs/components/BlogHeaderDisplay";
import BlogContentDisplay from "@/app/blogs/components/BlogContentDisplay";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

const fetchPost = async (slug: string) => {
  try {
    const response = await fetch(`${process.env.DEV_URL}/api/blogs/${slug}`);
    
    if (!response.ok) {
      return null
    }
    
    const data  = await response.json()
    return data;
  } catch (error) {
    console.error('Error fetching post. Try checking to see if your URL is correct:', error);
    return null;
  }
};

export default async function BlogSlugPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const response = await fetchPost(slug);

  if (!response) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-10">
      <BlogHeaderDisplay post={response} />
      <BlogContentDisplay post={response} />
    </article>
  );
}