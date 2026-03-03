"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import type { PostMeta } from "@/lib/posts";
import SiteFooter from "@/components/SiteFooter";
import { trackEvent } from "@/lib/analytics";

const CATEGORIES = ["All", "Peptides", "Supplements", "Recovery", "Lifestyle", "Habits", "Books", "Finance"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Peptides:    { bg: "bg-rose-100",    text: "text-rose-700"    },
  Supplements: { bg: "bg-violet-100",  text: "text-violet-700"  },
  Recovery:    { bg: "bg-green-100",   text: "text-green-700"   },
  Lifestyle:   { bg: "bg-amber-100",   text: "text-amber-700"   },
  Habits:      { bg: "bg-cyan-100",    text: "text-cyan-700"    },
  Books:       { bg: "bg-amber-100",   text: "text-amber-800"   },
  Finance:     { bg: "bg-emerald-100", text: "text-emerald-800" },
};

export function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] ?? { bg: "bg-stone-100", text: "text-stone-600" };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
      {category}
    </span>
  );
}

export default function BlogClientPage({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featuredPost = posts[0];

  const filtered = useMemo(() => {
    let list = posts;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeTag) {
      list = list.filter((p) => (p.tags || []).includes(activeTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    // Hide the featured post from the grid only when All + no search/tag filter
    if (activeCategory === "All" && !searchQuery.trim() && !activeTag) {
      list = list.filter((p) => p.slug !== featuredPost?.slug);
    }
    return list;
  }, [posts, activeCategory, activeTag, searchQuery, featuredPost]);

  const showFeatured =
    activeCategory === "All" && !searchQuery.trim() && !activeTag && featuredPost;

  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        style={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "rgba(245, 240, 232, 0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.jpg" alt="HabitForge" width={32} height={32} className="rounded-lg" priority />
            <span className="font-semibold text-stone-800 tracking-tight text-[15px]">HabitForge</span>
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm text-stone-500 font-medium">
            <Link href="/about" className="hover:text-stone-800 transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-stone-800 transition-colors">How It Works</Link>
            <Link href="/blog" className="text-stone-900 font-semibold">Blog</Link>
          </div>
          <Link href="/#waitlist" className="hidden sm:inline-flex rounded-full px-4 py-2 text-[13px] font-semibold text-stone-100 bg-stone-900 hover:bg-stone-800 transition-colors">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-stone-800 mb-4">The Blog</h1>
          <p className="text-stone-500 text-lg">
            Habit science, mindset reps, and the compounding life.
          </p>
        </div>

        {/* Search (item 3) */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) trackEvent("blog_search", { query: e.target.value.slice(0, 50) });
              }}
              placeholder="Search articles…"
              className="w-full rounded-xl border border-stone-200 bg-white pl-10 pr-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 transition-colors"
            />
          </div>
        </div>

        {/* Featured post */}
        {showFeatured && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block mb-12 rounded-3xl p-10 bg-stone-900 text-stone-100 hover:bg-stone-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            onClick={() => trackEvent("blog_featured_click", { slug: featuredPost.slug })}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 border border-stone-700 rounded-full px-3 py-1">
                Featured
              </span>
              <CategoryBadge category={featuredPost.category} />
              <time className="text-xs text-stone-500 tracking-widest uppercase ml-auto">
                {new Date(featuredPost.date + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight group-hover:text-stone-50 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-stone-400 leading-relaxed text-base max-w-2xl">{featuredPost.excerpt}</p>
            <span className="inline-block mt-6 text-sm font-semibold text-stone-300 group-hover:text-white">
              Read more →
            </span>
          </Link>
        )}

        {/* Category filter bar (item 3) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const colors = cat === "All" ? null : CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveTag(null);
                  trackEvent("blog_filter_category", { category: cat });
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? cat === "All"
                      ? "bg-stone-800 text-white border-stone-800"
                      : `${colors!.bg} ${colors!.text} border-transparent`
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tag filter chips (item 3) */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(activeTag === tag ? null : tag);
                  trackEvent("blog_filter_tag", { tag });
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  activeTag === tag
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Results count when filtering */}
        {(searchQuery || activeTag || activeCategory !== "All") && (
          <p className="text-xs text-stone-400 mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}

        <div className="flex flex-col gap-8">
          {filtered.length === 0 ? (
            <p className="text-stone-500 py-12 text-center">No articles match your search.</p>
          ) : (
            filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card group block rounded-3xl p-8 bg-white border border-stone-200 hover:border-[#D97C5F]/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => trackEvent("blog_card_click", { slug: post.slug })}
              >
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-stone-400 tracking-widest uppercase">
                    {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <CategoryBadge category={post.category} />
                  {(post.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] text-stone-400 border border-stone-200 rounded-full px-2 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-violet-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-stone-500 leading-relaxed">{post.excerpt}</p>
                <span className="inline-block mt-4 text-sm font-semibold text-violet-600 group-hover:text-violet-700">
                  Read more →
                </span>
              </Link>
            ))
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
