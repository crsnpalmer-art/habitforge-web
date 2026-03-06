#!/bin/bash
# Reformat remaining blog posts that are missing the Basics section
POSTS_DIR="/Users/carsonpalmer/Projects/habitforge-web/content/posts"
cd /Users/carsonpalmer/Projects/habitforge-web

for FILE in "$POSTS_DIR"/*.md; do
  BASENAME=$(basename "$FILE")

  # Skip if already has "The Basics" section
  if grep -q "## The Basics" "$FILE"; then
    continue
  fi

  echo "Processing: $BASENAME"

  claude --dangerously-skip-permissions -p "Reformat this blog post file.

File: $FILE

Read the file. Then rewrite it with:

1. AFTER the frontmatter (--- block), ADD this section BEFORE the existing content:

## The Basics

| | |
|---|---|
| **What it is** | [one sentence specific to this exact topic] |
| **Primary use** | [main purpose] |
| **Evidence level** | [Strong/Moderate/Emerging/Limited] |
| **Safety profile** | [Very Safe/Generally Safe/Caution Advised/Prescription Only] |
| **Best for** | [who benefits most] |

### Key Facts at a Glance
- [fact 1 specific to this topic]
- [fact 2]
- [fact 3]
- [fact 4]
- [fact 5 — often a dosing or key stat]

---

2. AFTER all existing content, ADD:

---

## Sources & Further Reading

1. [Real citation + real URL — PubMed/FDA/NIH/major journals]
2. [Real citation + real URL]
3. [Real citation + real URL]
[3-6 total]

## Where to Buy / Find This

- **[Product]** — [desc] — [real URL]
- **[Product]** — [desc] — [real URL]
[2-5 links: Amazon for supplements/books, GoodRx for Rx drugs, financial tools for finance posts]

Evidence: Strong=well-proven; Moderate=most supplements; Emerging=peptides/experimental; Limited=very early
Safety: Very Safe=basic vitamins; Generally Safe=most supps; Caution Advised=peptides/stimulants; Prescription Only=Rx drugs

IMPORTANT: Preserve ALL existing content exactly. Only ADD the new sections.
Write the full updated file back to: $FILE" 2>&1

  if [ $? -eq 0 ]; then
    echo "OK: $BASENAME"
  else
    echo "FAIL: $BASENAME"
  fi

  sleep 1
done

echo "Done reformatting remaining posts"
cd /Users/carsonpalmer/Projects/habitforge-web
git add -A
git commit -m "feat: add basics table + sources to remaining blog posts"

bash -c 'export PATH="/opt/homebrew/bin:/usr/local/bin:/Users/carsonpalmer/.npm-global/bin:$PATH" && vercel deploy --prod --yes 2>&1 | tail -3'

openclaw system event --text "Done: All remaining blog posts reformatted + deployed to habitforgeai.com" --mode now
