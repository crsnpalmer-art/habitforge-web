import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { CategoryBadge } from "../BlogClientPage";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ReadingProgress from "@/components/ReadingProgress";
import BlogTOC from "@/components/BlogTOC";
import BlogInlineCapture from "@/components/BlogInlineCapture";
import { getPostCoverImage, getPostSectionImages } from "@/lib/postImages";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function isMissingPostError(error: unknown): error is Error {
  return error instanceof Error && error.message.startsWith('Post "') && error.message.includes(" not found.");
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} — HabitForge`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`,
        type: "article",
        publishedTime: post.date,
        siteName: SITE_NAME,
      },
    };
  } catch (error) {
    if (!isMissingPostError(error)) throw error;
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    if (isMissingPostError(error)) notFound();
    throw error;
  }

  const allPosts = getAllPosts();
  const sameCat = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedPosts = sameCat.length >= 2 ? sameCat : [...sameCat, ...allPosts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 3 - sameCat.length)];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  const sectionImgs = getPostSectionImages(post.slug, 6);
  let hrCount = 0;
  let contentHtml = post.contentHtml.replace(/<hr>/g, () => {
    hrCount++;
    if (hrCount === 1) return "<hr>";
    const url = sectionImgs[(hrCount - 2) % sectionImgs.length];
    return `<div style="margin:2.5rem -1.5rem;border-radius:18px;overflow:hidden;"><img src="${url}" alt="" loading="lazy" style="width:100%;height:240px;object-fit:cover;display:block;" /></div>`;
  });

  contentHtml = contentHtml.replace(
    /(<h3>Key Facts at a Glance<\/h3>\s*)(<ul>[\s\S]*?<\/ul>)/,
    `<div style="background:linear-gradient(135deg,rgba(217,124,95,0.08),rgba(242,204,143,0.16));border:1px solid rgba(217,124,95,0.18);border-radius:18px;padding:1.25rem 1.5rem;margin:1.5rem 0;"><p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#b9654c;margin:0 0 .75rem;">Key Facts at a Glance</p>$2</div>`
  );

  return (
    <main className="min-h-screen bg-[#F5F0E8] text-[#171717]">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} strategy="beforeInteractive" />
      <ReadingProgress />

      <section className="relative overflow-hidden text-white">
        <img
          src={post.coverImage ?? getPostCoverImage(post.slug, post.category)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.26)_0%,rgba(10,18,28,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,204,143,0.16),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(217,124,95,0.22),transparent_28%)]" />

        <div className="relative z-10 pb-14">
          <SiteNav activeHref="/blog" variant="dark" />

          <article className="mx-auto max-w-3xl px-6 pt-10 sm:pt-14">
            <header className="rounded-[2rem] border border-white/12 bg-white/10 p-8 shadow-[0_18px_50px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={post.category} />
                <span className="text-xs uppercase tracking-[0.16em] text-white/62">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-white/62">{post.readingTime} min read</span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">{post.title}</h1>
              <p className="mt-5 border-b border-white/10 pb-8 text-lg leading-8 text-white/76">{post.excerpt}</p>
            </header>
          </article>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14">
        <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(23,23,23,0.12)]" style={{ aspectRatio: "16/7" }}>
          <img src={post.coverImage ?? getPostCoverImage(post.slug, post.category)} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div className="mt-10 rounded-[2rem] border border-black/8 bg-white/80 p-8 shadow-[0_18px_50px_rgba(23,23,23,0.05)] sm:p-10">
          <BlogTOC />
          <div
            className="prose prose-stone mt-8 max-w-none prose-headings:font-medium prose-headings:text-[#171717] prose-p:text-[#4f4a44] prose-p:leading-8 prose-a:text-[#b9654c] prose-strong:text-[#171717] prose-blockquote:border-l-[#d97c5f] prose-blockquote:text-[#5f5a54]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <BlogInlineCapture />

          <div className="mt-12 border-t border-black/8 pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a6a59]">Next step</p>
            <div className="mt-4 rounded-[1.5rem] bg-[#171717] p-7 text-white">
              <p className="text-xl font-medium">Want to make this easier to do every day?</p>
              <p className="mt-2 text-sm leading-7 text-white/70">HabitForge turns these ideas into a calm daily system with check-ins, reflection, and recovery cues that help you keep momentum when life gets noisy.</p>
              <Link href="/download" className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.03] active:scale-[0.97]">
                See the app
              </Link>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9a6a59]">Keep reading</p>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-[2rem] border border-black/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition-all hover:-translate-y-1 hover:border-[#d97c5f]/50">
                  <div className="flex items-center gap-3">
                    <CategoryBadge category={related.category} />
                    <span className="text-xs text-[#7a746d]">{related.readingTime} min</span>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-[#171717]">{related.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5a54]">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter variant="dark" />
    </main>
  );
}
