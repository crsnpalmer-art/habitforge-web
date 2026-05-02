"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getPostCoverImage } from "@/lib/postImages";

const CATEGORIES = ["All", "Peptides", "Supplements", "Recovery", "Lifestyle", "Habits", "Books", "Finance"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  Peptides: "bg-rose-100 text-rose-700",
  Supplements: "bg-violet-100 text-violet-700",
  Recovery: "bg-green-100 text-green-700",
  Lifestyle: "bg-amber-100 text-amber-700",
  Habits: "bg-cyan-100 text-cyan-700",
  Books: "bg-amber-100 text-amber-800",
  Finance: "bg-emerald-100 text-emerald-800",
};

export function CategoryBadge({ category }: { category: string }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[category] ?? "bg-stone-100 text-stone-600"}`}>{category}</span>;
}

export default function BlogClientPage({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featuredPost = posts[0];
  const allTags = useMemo(() => Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort(), [posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeTag) list = list.filter((p) => (p.tags || []).includes(activeTag));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory === "All" && !searchQuery.trim() && !activeTag) list = list.filter((p) => p.slug !== featuredPost?.slug);
    return list;
  }, [posts, activeCategory, activeTag, searchQuery, featuredPost]);

  const showFeatured = activeCategory === "All" && !searchQuery.trim() && !activeTag && featuredPost;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1520] text-white">
      <div className="pointer-events-none absolute inset-0">
        <video
          className="fixed inset-0 h-full w-full object-cover opacity-26"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(7,12,20,0.60)_0%,rgba(7,12,20,0.92)_100%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(242,204,143,0.14),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(217,124,95,0.18),transparent_28%)]" />
      </div>

      <section className="relative z-10 overflow-hidden text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,28,0.34)_0%,rgba(10,18,28,0.80)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,204,143,0.18),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(217,124,95,0.24),transparent_28%)]" />

        <div className="relative z-10 pb-16">
          <SiteNav activeHref="/blog" variant="dark" />

          <section className="px-6 pb-12 pt-10 sm:pt-16">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Journal</p>
                <h1 className="font-display text-5xl tracking-tight text-white sm:text-6xl">The HabitForge journal.</h1>
                <p className="mt-5 text-lg leading-relaxed text-white/76">Essays on habits, recovery, metabolism, money, and the systems that quietly shape a life.</p>
              </div>

              <div className="mt-10 rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-[0_18px_50px_rgba(7,12,20,0.18)] backdrop-blur-sm sm:p-6">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full rounded-full border border-black/8 bg-[#fcfaf7] px-5 py-3 text-sm text-[#171717] outline-none transition-colors focus:border-[#d97c5f]"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const active = cat === activeCategory;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setActiveTag(null);
                        }}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${active ? "border-[#171717] bg-[#171717] text-white" : "border-black/8 bg-white text-[#5f5a54] hover:border-[#d97c5f] hover:text-[#171717]"}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {allTags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${activeTag === tag ? "border-[#d97c5f] bg-[#fff3ec] text-[#b9654c]" : "border-black/8 bg-white text-[#5f5a54] hover:border-[#d97c5f]"}`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16 pt-10">
        <div className="mx-auto max-w-6xl">
          {showFeatured && (
            <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-[2rem] border border-white/8 bg-white/5 shadow-[0_24px_70px_rgba(7,12,20,0.22)] transition-transform hover:-translate-y-1 backdrop-blur-sm">
              <div className="relative aspect-[16/7] w-full">
                <Image src={featuredPost.coverImage ?? getPostCoverImage(featuredPost.slug, featuredPost.category)} alt={featuredPost.title} fill className="object-cover opacity-80" sizes="100vw" priority />
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Editor&apos;s pick</span>
                  <CategoryBadge category={featuredPost.category} />
                </div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">{featuredPost.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">{featuredPost.excerpt}</p>
              </div>
            </Link>
          )}

          {(searchQuery || activeTag || activeCategory !== "All") && (
            <p className="mt-8 text-sm text-white/56">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</p>
          )}

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {filtered.length === 0 ? (
              <div className="rounded-[2rem] border border-white/8 bg-white/5 p-10 text-center text-white/68">No articles match your search.</div>
            ) : (
              filtered.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/8 bg-white/5 shadow-[0_18px_50px_rgba(7,12,20,0.18)] transition-all hover:-translate-y-1 hover:border-[#d97c5f]/50 backdrop-blur-sm">
                  <div className="relative h-56 w-full">
                    <Image src={post.coverImage ?? getPostCoverImage(post.slug, post.category)} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <CategoryBadge category={post.category} />
                      <span className="text-xs uppercase tracking-[0.16em] text-white/56">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-medium text-white transition-colors group-hover:text-[#f2cc8f]">{post.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-white/68">{post.excerpt}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
