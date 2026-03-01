import { getAllPosts } from "@/lib/posts";
import BlogClientPage from "./BlogClientPage";

export const metadata = {
  title: "Blog — HabitForge",
  description: "Thoughts on habit formation, the four dimensions of growth, and building a life with intention.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return <BlogClientPage posts={posts} />;
}
