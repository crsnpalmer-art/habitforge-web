// Verified Unsplash photo IDs (all confirmed 200 OK)
const SLUG_IMAGES: Record<string, string> = {
  "creatine-guide": "1571019613454-1cb2f99b2d8b",
  "creatine-complete-guide": "1549060279-7e168fcee0c2",
  "magnesium-forms-complete-guide": "1506784983877-45594efa4cbe",
  "omega-3-fish-oil-deep-dive": "1490645935967-10de6ba17061",
  "vitamin-d3-k2-complete-guide": "1490645935967-10de6ba17061",
  "ashwagandha-ksm-66-guide": "1506126613408-eca07ce68773",
  "lions-mane-brain-optimization": "1506126613408-eca07ce68773",
  "coq10-ubiquinol-complete-guide": "1584362917165-526a968579e8",
  "berberine-natures-metformin": "1490645935967-10de6ba17061",
  "rhodiola-rosea-guide": "1460925895917-afdab827c52f",
  "alpha-lipoic-acid-guide": "1584362917165-526a968579e8",
  "l-glutamine-guide": "1571019613454-1cb2f99b2d8b",
  "l-glutamine-gut-health": "1490645935967-10de6ba17061",
  "collagen-peptides-guide": "1571019613454-1cb2f99b2d8b",
  "collagen-protein-guide": "1571019613454-1cb2f99b2d8b",
  "nad-nmn-longevity-guide": "1584362917165-526a968579e8",
  "inositol-sleep-and-mood": "1541781774459-bb2af2f05b55",
  "daily-multivitamin-do-you-need-one": "1559757148-5c350d0d3c56",
  "digestive-enzymes-guide": "1490645935967-10de6ba17061",
  "vitamin-c-whole-food-vs-synthetic": "1490645935967-10de6ba17061",
  "zinc-testosterone-guide": "1571019613454-1cb2f99b2d8b",
  "tongkat-ali-testosterone-guide": "1549060279-7e168fcee0c2",
  "acetyl-l-carnitine-alcar-guide": "1584362917165-526a968579e8",
  "quercetin-guide": "1490645935967-10de6ba17061",
  "resveratrol-pterostilbene-guide": "1490645935967-10de6ba17061",
  "thiamine-b1-cognition": "1460925895917-afdab827c52f",
  "melatonin-low-dose-vs-high-dose": "1541781774459-bb2af2f05b55",
  "seed-synbiotic-probiotic-guide": "1490645935967-10de6ba17061",
  "seed-am-energy-focus": "1506784983877-45594efa4cbe",
  "seed-pm-sleep-restore": "1541781774459-bb2af2f05b55",
  "bpc-157-guide": "1576091160550-2173dba999ef",
  "tb-500-thymosin-beta-4-guide": "1576091160550-2173dba999ef",
  "ipamorelin-guide": "1532187863486-abf9dbad1b69",
  "tesamorelin-guide": "1532187863486-abf9dbad1b69",
  "selegiline-guide": "1532187863486-abf9dbad1b69",
  "modafinil-guide": "1460925895917-afdab827c52f",
  "sauna-benefits-guide": "1573496130407-57329f01f769",
  "cold-plunge-cold-exposure-guide": "1544367567-0f2fcb009e0b",
  "red-light-therapy-deep-dive": "1593079831268-3381b0db4a77",
  "intermittent-fasting-complete-guide": "1490645935967-10de6ba17061",
  "sleep-optimization-complete-guide": "1541781774459-bb2af2f05b55",
  "sunlight-benefits-morning-light": "1506784983877-45594efa4cbe",
  "zone-2-cardio-longevity": "1498837167922-ddd27525d352",
  "vo2-max-training-guide": "1438761681033-6461ffad8d80",
  "ten-minute-stretch-routine": "1438761681033-6461ffad8d80",
  "hormone-optimization-guide": "1518152006812-edab29b069ac",
  "bloodwork-testing-guide": "1518152006812-edab29b069ac",
  "thyroid-hormones-guide": "1518152006812-edab29b069ac",
  "hrv-recovery-tracking-guide": "1573496130407-57329f01f769",
  "mouth-taping-sleep-guide": "1541781774459-bb2af2f05b55",
  "emf-radiation-dangers-and-protection": "1467803738586-46b7eb7b16a1",
  "blue-light-blocking-guide": "1467803738586-46b7eb7b16a1",
  "dopamine-detox-guide": "1506126613408-eca07ce68773",
  "psilocybin-microdosing-guide": "1506126613408-eca07ce68773",
  "morning-routine-lock-in": "1506784983877-45594efa4cbe",
  "identity-based-habits": "1484480974693-6ca0a78fb36b",
  "smart-goals-vs-systems": "1484480974693-6ca0a78fb36b",
  "two-minute-rule-habits": "1484480974693-6ca0a78fb36b",
  "habit-stacking-guide": "1484480974693-6ca0a78fb36b",
  "habit-tracking-why-it-works": "1484480974693-6ca0a78fb36b",
  "annual-goal-review": "1484480974693-6ca0a78fb36b",
  "compound-interest-habits-wealth": "1484480974693-6ca0a78fb36b",
  "why-your-habits-are-your-dna": "1484480974693-6ca0a78fb36b",
  "goal-setting-science": "1484480974693-6ca0a78fb36b",
  "book-atomic-habits": "1481627834876-b7833e8f5570",
  "book-cant-hurt-me-goggins": "1549060279-7e168fcee0c2",
  "book-breath-james-nestor": "1506126613408-eca07ce68773",
  "building-passive-income-streams": "1611974789855-9c2a0a7236a3",
  "financial-independence-roadmap": "1554224155-1696413565d3",
  "dollar-cost-averaging-guide": "1565514020179-026b92b84bb6",
  "tax-advantaged-accounts-hsa-fsa-529": "1565514020179-026b92b84bb6",
  "zofran-ondansetron-guide": "1518152006812-edab29b069ac",
};

const CATEGORY_POOLS: Record<string, string[]> = {
  Supplements: ["1584362917165-526a968579e8", "1559757148-5c350d0d3c56", "1556909114-f6e7ad7d3136", "1490645935967-10de6ba17061"],
  Peptides: ["1576091160550-2173dba999ef", "1532187863486-abf9dbad1b69"],
  "Health & Longevity": ["1571019613454-1cb2f99b2d8b", "1498837167922-ddd27525d352", "1438761681033-6461ffad8d80"],
  Recovery: ["1541781774459-bb2af2f05b55", "1544367567-0f2fcb009e0b", "1573496130407-57329f01f769"],
  Lifestyle: ["1506784983877-45594efa4cbe", "1506126613408-eca07ce68773", "1460925895917-afdab827c52f"],
  Habits: ["1484480974693-6ca0a78fb36b", "1506784983877-45594efa4cbe"],
  Books: ["1481627834876-b7833e8f5570", "1460925895917-afdab827c52f"],
  Finance: ["1579621970563-ebec7560ff3e", "1611974789855-9c2a0a7236a3", "1554224155-1696413565d3", "1565514020179-026b92b84bb6"],
  default: ["1484480974693-6ca0a78fb36b", "1571019613454-1cb2f99b2d8b", "1576091160550-2173dba999ef", "1481627834876-b7833e8f5570"],
};

// Pool for inline section images — variety across the article
const SECTION_POOL = [
  "1571019613454-1cb2f99b2d8b",
  "1506784983877-45594efa4cbe",
  "1576091160550-2173dba999ef",
  "1490645935967-10de6ba17061",
  "1484480974693-6ca0a78fb36b",
  "1544367567-0f2fcb009e0b",
  "1541781774459-bb2af2f05b55",
  "1549060279-7e168fcee0c2",
  "1460925895917-afdab827c52f",
  "1438761681033-6461ffad8d80",
  "1593079831268-3381b0db4a77",
  "1467803738586-46b7eb7b16a1",
];

function slugHash(slug: string): number {
  return slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export function unsplashUrl(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export function getPostCoverImage(slug: string, category: string): string {
  if (SLUG_IMAGES[slug]) return unsplashUrl(SLUG_IMAGES[slug]);
  const pool = CATEGORY_POOLS[category] ?? CATEGORY_POOLS.default;
  const idx = slugHash(slug) % pool.length;
  return unsplashUrl(pool[idx]);
}

export function getPostSectionImages(slug: string, count: number): string[] {
  const hash = slugHash(slug);
  return Array.from({ length: count }, (_, i) => {
    const idx = (hash + i * 3) % SECTION_POOL.length;
    return unsplashUrl(SECTION_POOL[idx], 800);
  });
}
