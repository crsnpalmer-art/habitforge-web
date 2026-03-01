import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime: number; // minutes
}

export interface Post extends PostMeta {
  contentHtml: string;
  keyTakeaways?: string[];
  protocol?: string[];
  notes?: string[];
  faqs?: { question: string; answer: string }[];
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const wordCount = fileContents.split(/\s+/).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        category: (data.category as string) || "Uncategorized",
        tags: (data.tags as string[]) || [],
        readingTime,
      };
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const wordCount = fileContents.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    category: (data.category as string) || "Uncategorized",
    tags: (data.tags as string[]) || [],
    readingTime,
    contentHtml,
    keyTakeaways: data.key_takeaways as string[] | undefined,
    protocol: data.protocol as string[] | undefined,
    notes: data.notes as string[] | undefined,
    faqs: data.faqs as { question: string; answer: string }[] | undefined,
  };
}
