#!/bin/bash
# Reformat all blog posts to new template with basics table, sources, product links
# Processes each file individually via claude -p

POSTS_DIR="/Users/carsonpalmer/Projects/habitforge-web/content/posts"
LOG_FILE="/tmp/reformat-posts.log"
DONE_FILE="/tmp/reformat-done.txt"

# Load already-done list
touch "$DONE_FILE"

cd /Users/carsonpalmer/Projects/habitforge-web

echo "Starting reformat job at $(date)" | tee -a "$LOG_FILE"
echo "Total files: $(ls $POSTS_DIR/*.md | wc -l)" | tee -a "$LOG_FILE"

for FILE in "$POSTS_DIR"/*.md; do
  BASENAME=$(basename "$FILE")

  # Skip if already done
  if grep -qF "$BASENAME" "$DONE_FILE"; then
    echo "SKIP (already done): $BASENAME" | tee -a "$LOG_FILE"
    continue
  fi

  # Skip if already has "The Basics" section
  if grep -q "## The Basics" "$FILE"; then
    echo "SKIP (already formatted): $BASENAME" | tee -a "$LOG_FILE"
    echo "$BASENAME" >> "$DONE_FILE"
    continue
  fi

  echo "Processing: $BASENAME" | tee -a "$LOG_FILE"

  claude --dangerously-skip-permissions -p "Reformat this blog post file to add new sections.

File to reformat: $FILE

Read the file first. Then rewrite it with:

1. AFTER the frontmatter (---), add this BEFORE the existing content:

## The Basics

| | |
|---|---|
| **What it is** | [one sentence specific to this topic] |
| **Primary use** | [main purpose of this topic] |
| **Evidence level** | [Strong/Moderate/Emerging/Limited — based on research quality] |
| **Safety profile** | [Very Safe/Generally Safe/Caution Advised/Prescription Only] |
| **Best for** | [who benefits most from this topic] |

### Key Facts at a Glance
- [fact 1 specific to this topic]
- [fact 2 specific to this topic]
- [fact 3 specific to this topic]
- [fact 4 specific to this topic]
- [fact 5 specific to this topic, often dosing or key stat]

---

2. AFTER all existing content, add:

---

## Sources & Further Reading

1. [Real citation with real URL — use PubMed, FDA, NIH, major medical journals]
2. [Real citation with real URL]
3. [Real citation with real URL]
[3-6 total real citations appropriate to this topic]

## Where to Buy / Find This

- **[Product/Service Name]** — [brief description] — [real URL]
- **[Product/Service Name]** — [brief description] — [real URL]
[2-5 real links: Amazon product pages for supplements/books, GoodRx for Rx drugs, financial services for finance posts]

Evidence levels:
- Strong: creatine, fish oil, omega-3, vitamin D, magnesium, melatonin, proven pharmaceuticals, well-studied finance strategies
- Moderate: ashwagandha, lion's mane, inositol, berberine, most mainstream supplements, most established health practices
- Emerging: BPC-157, TB-500, ipamorelin, tesamorelin, psilocybin, newer peptides, cutting-edge protocols
- Limited: very experimental compounds, highly contested claims

Safety profiles:
- Very Safe: creatine, magnesium, fish oil, vitamin C, vitamin D, melatonin, collagen
- Generally Safe: most mainstream supplements with good track records
- Caution Advised: peptides, stimulants (modafinil), hormonal compounds, high-dose protocols
- Prescription Only: Zofran, actual pharmaceuticals requiring Rx

IMPORTANT:
- Preserve ALL existing frontmatter and content EXACTLY
- Only ADD the new sections — do not remove or change existing content
- Make the basics table and bullet points SPECIFIC to this exact topic (not generic)
- Use REAL URLs for citations and product links
- Write the full updated file back to: $FILE" 2>&1

  if [ $? -eq 0 ]; then
    echo "OK: $BASENAME" | tee -a "$LOG_FILE"
    echo "$BASENAME" >> "$DONE_FILE"
  else
    echo "FAIL: $BASENAME" | tee -a "$LOG_FILE"
  fi

  # Small pause between files
  sleep 1
done

echo "" | tee -a "$LOG_FILE"
echo "All done at $(date)" | tee -a "$LOG_FILE"

# Commit
cd /Users/carsonpalmer/Projects/habitforge-web
git add -A
git commit -m "feat: reformat all blog posts with basics table, sources, product links"

# Notify
openclaw system event --text "Done: All HabitForge blog posts reformatted with new template (basics table + sources + product links)" --mode now
