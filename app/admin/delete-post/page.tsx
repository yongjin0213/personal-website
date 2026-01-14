import BlogPostManage from "@/app/admin/components/BlogPostManage";
import { getAllPosts } from "@/lib/api";

export default async function DeletePost() {
  const posts: {id: number, created: Date, title: string, slug: string}[] = await getAllPosts();
  return (
    <div className="flex flex-col gap-4">
      <BlogPostManage initialPosts={posts}/>
    </div>
  );
};
