import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/lib/config";

import { CategoryBadge } from "../BlogClientPage";
import SiteFooter from "@/components/SiteFooter";
import BlogInlineCapture from "@/components/BlogInlineCapture";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      url: `${SITE_URL}/blog/${post.slug}`,
    };
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
      other: {
        "schema:article": JSON.stringify(articleSchema),
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

const blogQuotes = [
  { quote: "The groundwork of all happiness is health.", author: "Leigh Hunt" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { quote: "Health is not about the weight you lose, but about the life you gain.", author: "Unknown" },
  { quote: "To keep the body in good health is a duty.", author: "Buddha" },
  { quote: "The first wealth is health.", author: "Ralph Waldo Emerson" },
  { quote: "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.", author: "JFK" },
  { quote: "He who has health has hope, and he who has hope has everything.", author: "Arabian Proverb" },
  { quote: "A healthy outside starts from the inside.", author: "Robert Urich" },
  { quote: "Your body is a temple, but only if you treat it as one.", author: "Astrid Alauda" },
  { quote: "The greatest wealth is health.", author: "Virgil" },
];

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();
  // Related posts: same category first, then cross-category by recency
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

  const idx = post.slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % blogQuotes.length;
  const q = blogQuotes[idx];

  // JSON-LD schemas
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  const faqJsonLd = post.faqs && post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      {/* JSON-LD */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        strategy="beforeInteractive"
      />
      {faqJsonLd && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          strategy="beforeInteractive"
        />
      )}

      {/* Nav */}
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
          </div>
          <Link href="/blog" className="text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors">
            ← All Posts
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <time className="text-xs text-stone-400 tracking-widest uppercase">
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <CategoryBadge category={post.category} />
            <span className="text-xs text-stone-400 tracking-widest uppercase">
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-stone-800 mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Key Takeaways (item 4) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border border-violet-200 bg-violet-50 p-6">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-500 mb-3">Key Takeaways</p>
            <ul className="space-y-2">
              {post.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 h-4 w-4 rounded-full bg-violet-200 flex items-center justify-center text-[9px] font-bold text-violet-700">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Protocol (item 4) */}
        {post.protocol && post.protocol.length > 0 && (
          <div className="mb-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-emerald-600 mb-3">Protocol</p>
            <ol className="space-y-2 list-none">
              {post.protocol.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-emerald-200 flex items-center justify-center text-[10px] font-bold text-emerald-800">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Notes/Cautions (item 4) */}
        {post.notes && post.notes.length > 0 && (
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-amber-700 mb-3">Notes</p>
            <ul className="space-y-2">
              {post.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed">
                  <span className="mt-0.5 text-amber-500 flex-shrink-0">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="prose prose-stone prose-lg max-w-none
            prose-h2:text-stone-800 prose-h2:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-stone-600 prose-p:leading-relaxed
            prose-strong:text-stone-800
            prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Mid-article email capture (item 6) */}
        <BlogInlineCapture />

        {/* FAQ section (item 8 - rendered if present) */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-14 rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-stone-400 mb-5">Frequently Asked Questions</p>
            <div className="space-y-5">
              {post.faqs.map((faq, i) => (
                <div key={i}>
                  <p className="font-semibold text-stone-800 mb-1">{faq.question}</p>
                  <p className="text-sm text-stone-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <blockquote className="mt-14 mb-2 border-l-4 border-violet-400 pl-6 py-4 bg-stone-100 rounded-r-2xl">
          <p
            className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-3"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            &ldquo;{q.quote}&rdquo;
          </p>
          <cite className="text-xs text-stone-400 tracking-[0.2em] uppercase font-medium not-italic">
            — {q.author}
          </cite>
        </blockquote>

        {/* Medical Disclaimer */}
        <div className="mt-12 pt-6 border-t border-stone-200">
          <p className="text-xs text-stone-400 leading-relaxed">
            The information in this article is for educational purposes only and does not constitute
            medical advice. Always consult a qualified healthcare professional before starting any
            supplement, peptide, or health protocol.{" "}
            <Link href="/how-we-research" className="underline hover:text-stone-600 transition-colors">
              Learn how we research →
            </Link>
          </p>
        </div>

        {/* Share on X */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-3">Share</p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-colors"
            data-track-cta="share_twitter"
          >
            <svg width="16" height="16" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
            </svg>
            Share on X
          </a>
        </div>

        {/* CTA */}
        <div
          className="mt-16 rounded-3xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(6,182,212,0.06), rgba(139,92,246,0.06))",
            border: "1px solid rgba(139,92,246,0.18)",
          }}
        >
          <p className="text-stone-700 font-semibold text-lg mb-2">Ready to forge your habits?</p>
          <p className="text-stone-500 mb-6 text-sm">HabitForge is coming soon. Join the waitlist for early access.</p>
          <Link
            href="/#waitlist"
            className="inline-block px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #22c55e 0%, #06b6d4 50%, #8b5cf6 100%)" }}
            data-track-cta="blog_post_bottom"
          >
            Join the Waitlist →
          </Link>
        </div>
      </article>

      {/* Related Posts (item 5 - enhanced cross-category) */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-stone-100 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-stone-400 uppercase mb-8">
              {relatedPosts[0]?.category === post.category ? `More in ${post.category}` : "Keep Reading"}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-2xl p-6 bg-[#F5F0E8] border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                  data-track-internal-link={related.slug}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={related.category} />
                    <span className="text-xs text-stone-400">{related.readingTime} min</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-stone-800 leading-snug mb-2 group-hover:text-violet-700 transition-colors">
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
