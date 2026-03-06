import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/lib/config";

import { CategoryBadge } from "../BlogClientPage";
import SiteFooter from "@/components/SiteFooter";
import ReadingProgress from "@/components/ReadingProgress";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
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
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  const sameCat = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedPosts =
    sameCat.length >= 2
      ? sameCat
      : [
          ...sameCat,
          ...allPosts
            .filter((p) => p.slug !== post.slug && p.category !== post.category)
            .slice(0, 3 - sameCat.length),
        ];

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

  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        strategy="beforeInteractive"
      />

      <ReadingProgress />

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.92)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm text-stone-500 font-medium">
            <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-stone-800 transition-colors">How It Works</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">Blog</Link>
            <Link href="/blog" className="hover:text-stone-800 transition-colors">← All Posts</Link>
          </div>
          <Link
            href="/#waitlist"
            className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#1c1917" }}
          >
            Join Waitlist
          </Link>
        </div>
      </nav>

      {/* ── Article ── */}
      <article className="max-w-2xl mx-auto px-6 py-14">

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-stone-400">
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-stone-400">{post.readingTime} min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-[1.1] mb-5">
            {post.title}
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed border-b border-stone-200 pb-8">
            {post.excerpt}
          </p>
        </header>

        {/* Body */}
        <div
          className="prose prose-stone prose-lg max-w-none
            prose-h2:text-stone-900 prose-h2:font-black prose-h2:text-[1.6rem] prose-h2:mt-14 prose-h2:mb-4 prose-h2:leading-tight prose-h2:tracking-tight
            prose-h3:text-stone-800 prose-h3:font-bold prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
            prose-h4:text-stone-700 prose-h4:font-semibold prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
            prose-p:text-[17px] prose-p:text-stone-600 prose-p:leading-[1.9] prose-p:mb-5
            prose-strong:text-stone-900 prose-strong:font-semibold
            prose-ul:text-stone-600 prose-ul:my-5 prose-ul:space-y-1
            prose-ol:text-stone-600 prose-ol:my-5
            prose-li:text-[16px] prose-li:leading-relaxed
            prose-table:text-sm prose-table:border-collapse
            prose-th:bg-stone-100 prose-th:text-stone-700 prose-th:font-semibold prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-stone-200
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-stone-200 prose-td:text-stone-600
            prose-hr:border-stone-200 prose-hr:my-10
            prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-stone-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-stone-500"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Footer */}
        <footer className="mt-14 pt-8 border-t border-stone-200 space-y-8">

          {/* Disclaimer */}
          <p className="text-xs text-stone-400">
            This content is educational only and is not medical advice.
          </p>

          {/* Share */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">Share</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
              </svg>
              Share on X
            </a>
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(217,124,95,0.07), rgba(242,204,143,0.07))",
              border: "1px solid rgba(217,124,95,0.15)",
            }}
          >
            <p className="font-semibold text-stone-800 text-lg mb-1">Ready to forge your habits?</p>
            <p className="text-stone-500 text-sm mb-5">HabitForge is coming soon — join the waitlist for early access.</p>
            <Link
              href="/#waitlist"
              className="inline-block px-7 py-3.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #D97C5F 0%, #F2CC8F 100%)" }}
            >
              Join the Waitlist →
            </Link>
          </div>
        </footer>
      </article>

      {/* ── Related Posts ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-stone-100 py-14 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-7">
              {relatedPosts[0]?.category === post.category ? `More in ${post.category}` : "Keep Reading"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-2xl p-5 bg-[#F5F0E8] border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={related.category} />
                    <span className="text-xs text-stone-400">{related.readingTime} min</span>
                  </div>
                  <h3 className="text-[14px] font-bold text-stone-800 leading-snug mb-2 group-hover:text-violet-700 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
