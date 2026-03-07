#!/usr/bin/env python3
"""
Update supplement/peptide blog posts to only include
Thorne, Pure Encapsulations, and UMZU product links.

Removes: Optimum Nutrition, BulkSupplements, NOW Foods, Jarrow, Doctor's Best,
         Qunol, Gaia Herbs, Amazon Basics, Designs for Health, Nature Made,
         Garden of Life, Life Extension, Nutricost, and any other non-approved brands.
"""

import os
import re
import glob

POSTS_DIR = "/Users/carsonpalmer/Projects/habitforge-web/content/posts"

APPROVED_BRANDS = [
    "thorne",
    "pure encapsulations",
    "pureencapsulations",
    "umzu",
]

# Brands to remove (case-insensitive, partial match)
REMOVE_BRANDS = [
    "optimum nutrition",
    "bulk supplements",
    "bulksupplements",
    "now foods",
    "now sports",
    "now supplements",
    "jarrow",
    "doctor's best",
    "doctors best",
    "qunol",
    "gaia herbs",
    "gaia",
    "nature made",
    "naturemade",
    "garden of life",
    "life extension",
    "lifeextension",
    "nutricost",
    "amazon basics",
    "designs for health",
    "klaire labs",
    "douglas labs",
    "nature's way",
    "natures way",
    "solaray",
    "solgar",
    "swanson",
    "country life",
    "kirkland",
    "nature's bounty",
    "natures bounty",
    "nordic naturals",
    "carlson",
    "seeking health",
    "integrative therapeutics",
    "metagenics",
    "protocol for life",
    "vitacost",
    "iherb",
]

# Thorne product URLs for common supplements
THORNE_PRODUCTS = {
    "creatine": ("Thorne Creatine", "https://www.thorne.com/products/dp/creatine", "NSF Certified for Sport, unflavored creatine monohydrate — ideal for athletes who require third-party testing"),
    "vitamin d": ("Thorne Vitamin D/K2", "https://www.thorne.com/products/dp/vitamin-d-k2", "Synergistic D3 + K2 formula for bone health and immune support"),
    "magnesium": ("Thorne Magnesium Bisglycinate", "https://www.thorne.com/products/dp/magnesium-glycinate", "Highly bioavailable glycinate form, gentle on digestion"),
    "omega-3": ("Thorne Super EPA", "https://www.thorne.com/products/dp/super-epa", "Concentrated EPA/DHA from sustainably sourced fish oil"),
    "coq10": ("Thorne CoQ10 (Ubiquinol)", "https://www.thorne.com/products/dp/q-best", "Ubiquinol form for superior absorption, especially for those over 40"),
    "rhodiola": ("Thorne Rhodiola", "https://www.thorne.com/products/dp/botanicals/rhodiola", "Standardized 3% rosavin extract, adaptogenic stress support"),
    "quercetin": ("Thorne Quercetin Phytosome", "https://www.thorne.com/products/dp/quercetin-phytosome", "Phytosome complex for significantly enhanced bioavailability"),
    "zinc": ("Thorne Zinc Picolinate", "https://www.thorne.com/products/dp/zinc-picolinate-15-mg", "Picolinate form for optimal absorption, 15mg per capsule"),
    "ashwagandha": ("Thorne Ashwagandha", "https://www.thorne.com/products/dp/botanicals/ashwagandha", "KSM-66 standardized extract for stress and cortisol support"),
    "l-glutamine": ("Thorne L-Glutamine", "https://www.thorne.com/products/dp/l-glutamine-2", "Pharmaceutical-grade glutamine powder for gut and recovery support"),
    "digestive enzymes": ("Thorne Bio-Gest", "https://www.thorne.com/products/dp/bio-gest", "Comprehensive digestive enzyme blend with HCl and pepsin"),
    "berberine": ("Thorne Berberine-500", "https://www.thorne.com/products/dp/berberine-500", "500mg berberine HCl per capsule for metabolic and blood sugar support"),
    "resveratrol": ("Thorne ResveraCel", "https://www.thorne.com/products/dp/resveracel", "Resveratrol with NMN and nicotinamide riboside for NAD+ support"),
    "alpha-lipoic acid": ("Thorne Alpha-Lipoic Acid", "https://www.thorne.com/products/dp/alpha-lipoic-acid-600-mg", "600mg R-ALA per capsule, potent antioxidant and metabolic support"),
    "collagen": ("Thorne Collagen Plus", "https://www.thorne.com/products/dp/collagen-plus", "Hydrolyzed collagen peptides with vitamin C for joint and skin support"),
    "inositol": ("Thorne Inositol", "https://www.thorne.com/products/dp/inositol-2", "Pure myo-inositol powder for mood, sleep, and hormonal balance"),
    "melatonin": ("Thorne Melaton-3", "https://www.thorne.com/products/dp/melaton-3", "3mg melatonin in sustained-release formula for sleep onset and maintenance"),
    "dhea": ("Thorne DHEA", "https://www.thorne.com/products/dp/dhea", "Pharmaceutical-grade DHEA for hormonal support — consult physician before use"),
    "vitamin c": ("Thorne Vitamin C with Flavonoids", "https://www.thorne.com/products/dp/vitamin-c-with-flavonoids-2", "Ascorbic acid with citrus bioflavonoids for enhanced antioxidant support"),
    "acetyl-l-carnitine": ("Thorne Acetyl-L-Carnitine", "https://www.thorne.com/products/dp/acetyl-l-carnitine-2", "500mg ALCAR per capsule for cognitive and mitochondrial energy support"),
    "alcar": ("Thorne Acetyl-L-Carnitine", "https://www.thorne.com/products/dp/acetyl-l-carnitine-2", "500mg ALCAR per capsule for cognitive and mitochondrial energy support"),
    "nad": ("Thorne NiaCel 400", "https://www.thorne.com/products/dp/niacel-400", "Nicotinamide riboside for NAD+ precursor support and cellular energy"),
    "nmn": ("Thorne NiaCel 400", "https://www.thorne.com/products/dp/niacel-400", "Nicotinamide riboside (NR) to support NAD+ levels and longevity pathways"),
    "tongkat ali": ("Thorne Phytisone", "https://www.thorne.com/products/dp/phytisone", "Ashwagandha and adaptogen blend — for standalone tongkat ali, see UMZU below"),
    "fadogia": ("Thorne Phytisone", "https://www.thorne.com/products/dp/phytisone", "Adaptogenic blend — for fadogia specifically, consult approved formulators"),
    "multivitamin": ("Thorne Basic Nutrients 2/Day", "https://www.thorne.com/products/dp/basic-nutrients-2-day", "Comprehensive multivitamin/mineral without iron, in just 2 capsules daily"),
    "thiamine": ("Thorne Vitamin B1", "https://www.thorne.com/products/dp/b1", "Thiamine HCl for neurological health and energy metabolism"),
    "b1": ("Thorne Vitamin B1", "https://www.thorne.com/products/dp/b1", "Thiamine HCl for neurological health and energy metabolism"),
    "lion's mane": ("Thorne Memoractiv", "https://www.thorne.com/products/dp/memoractiv", "Cognitive support blend including lion's mane mushroom extract and adaptogens"),
    "lions mane": ("Thorne Memoractiv", "https://www.thorne.com/products/dp/memoractiv", "Cognitive support blend including lion's mane mushroom extract and adaptogens"),
    "probiotic": ("Thorne FloraMend Prime Probiotic", "https://www.thorne.com/products/dp/floramend-prime-probiotic", "5-strain probiotic blend for gut microbiome balance and immune support"),
    "synbiotic": ("Thorne FloraMend Prime Probiotic", "https://www.thorne.com/products/dp/floramend-prime-probiotic", "Spore-based probiotic resistant to stomach acid degradation"),
    "hormone": ("Thorne Hormone Support (Female) / Phytisone (Male)", "https://www.thorne.com/products/dp/phytisone", "Adaptogenic hormone support — consult your provider for appropriate product selection"),
    "testosterone": ("Thorne Phytisone", "https://www.thorne.com/products/dp/phytisone", "Adaptogenic testosterone support — see UMZU TESTRO-X for a dedicated stack"),
}

# Pure Encapsulations product URLs
PURE_ENC_PRODUCTS = {
    "creatine": ("Pure Encapsulations Creatine Monohydrate", "https://www.pureencapsulations.com/creatine-monohydrate-powder.html", "Hypoallergenic, pharmaceutical-grade creatine monohydrate powder"),
    "vitamin d": ("Pure Encapsulations Vitamin D3 K2", "https://www.pureencapsulations.com/vitamin-d3-k2.html", "Hypoallergenic D3 + K2 complex for bone, immune, and cardiovascular support"),
    "magnesium": ("Pure Encapsulations Magnesium Glycinate", "https://www.pureencapsulations.com/magnesium-glycinate.html", "Chelated magnesium glycinate — high bioavailability, gentle on the GI tract"),
    "omega-3": ("Pure Encapsulations O.N.E. Omega", "https://www.pureencapsulations.com/o-n-e-omega.html", "High-potency omega-3 with 1,000mg EPA/DHA per softgel"),
    "coq10": ("Pure Encapsulations CoQ10", "https://www.pureencapsulations.com/coq10.html", "120mg CoQ10 per capsule in a highly bioavailable delivery system"),
    "rhodiola": ("Pure Encapsulations Rhodiola Rosea", "https://www.pureencapsulations.com/rhodiola-rosea.html", "Standardized to 3% rosavins, hypoallergenic adaptogen for stress and fatigue"),
    "quercetin": ("Pure Encapsulations Quercetin", "https://www.pureencapsulations.com/quercetin.html", "500mg quercetin per capsule, hypoallergenic and clean label"),
    "zinc": ("Pure Encapsulations Zinc 30", "https://www.pureencapsulations.com/zinc-30.html", "Picolinate form, 30mg per capsule — bioavailable and free of additives"),
    "ashwagandha": ("Pure Encapsulations Ashwagandha", "https://www.pureencapsulations.com/ashwagandha.html", "500mg KSM-66 standardized extract for stress resilience and HPA support"),
    "l-glutamine": ("Pure Encapsulations L-Glutamine", "https://www.pureencapsulations.com/l-glutamine-powder.html", "Free-form L-glutamine powder for gut barrier integrity and recovery"),
    "berberine": ("Pure Encapsulations Berberine", "https://www.pureencapsulations.com/berberine.html", "400mg berberine HCl per capsule, clean formulation for metabolic support"),
    "resveratrol": ("Pure Encapsulations Resveratrol", "https://www.pureencapsulations.com/resveratrol.html", "Trans-resveratrol from Polygonum cuspidatum for cardiovascular and longevity support"),
    "alpha-lipoic acid": ("Pure Encapsulations Alpha-Lipoic Acid", "https://www.pureencapsulations.com/alpha-lipoic-acid-1.html", "200mg ALA per capsule, potent mitochondrial and antioxidant support"),
    "collagen": ("Pure Encapsulations Collagen-C", "https://www.pureencapsulations.com/collagen-c.html", "Hydrolyzed collagen with vitamin C for joint, skin, and connective tissue support"),
    "inositol": ("Pure Encapsulations Inositol", "https://www.pureencapsulations.com/inositol-1.html", "Myo-inositol powder for mood regulation, sleep quality, and hormone balance"),
    "melatonin": ("Pure Encapsulations Melatonin 0.5mg", "https://www.pureencapsulations.com/melatonin-0-5mg.html", "Low-dose 0.5mg melatonin — physiologically appropriate for most adults"),
    "vitamin c": ("Pure Encapsulations Ascorbic Acid", "https://www.pureencapsulations.com/ascorbic-acid-1.html", "Pure vitamin C powder, hypoallergenic and free of fillers"),
    "acetyl-l-carnitine": ("Pure Encapsulations Acetyl-L-Carnitine", "https://www.pureencapsulations.com/acetyl-l-carnitine.html", "400mg ALCAR per capsule for mitochondrial function and cognitive support"),
    "alcar": ("Pure Encapsulations Acetyl-L-Carnitine", "https://www.pureencapsulations.com/acetyl-l-carnitine.html", "400mg ALCAR per capsule for mitochondrial function and cognitive support"),
    "nad": ("Pure Encapsulations NAD+", "https://www.pureencapsulations.com/nad-plus.html", "250mg NAD+ per capsule to support cellular energy and aging pathways"),
    "nmn": ("Pure Encapsulations NMN", "https://www.pureencapsulations.com/nmn.html", "Nicotinamide mononucleotide to directly support NAD+ biosynthesis"),
    "multivitamin": ("Pure Encapsulations O.N.E. Multivitamin", "https://www.pureencapsulations.com/o-n-e-multivitamin.html", "Once-daily comprehensive multivitamin/mineral, hypoallergenic and well-tolerated"),
    "thiamine": ("Pure Encapsulations B1", "https://www.pureencapsulations.com/b1.html", "Thiamine HCl for neurological and metabolic support"),
    "b1": ("Pure Encapsulations B1", "https://www.pureencapsulations.com/b1.html", "Thiamine HCl for neurological and metabolic support"),
    "dhea": ("Pure Encapsulations DHEA", "https://www.pureencapsulations.com/dhea-10-mg.html", "10mg pharmaceutical-grade DHEA — use only under physician supervision"),
    "digestive enzymes": ("Pure Encapsulations Digestive Enzymes Ultra", "https://www.pureencapsulations.com/digestive-enzymes-ultra.html", "Broad-spectrum enzyme blend for macronutrient digestion and gut comfort"),
    "tongkat ali": ("Pure Encapsulations Tongkat Ali", "https://www.pureencapsulations.com/tongkat-ali.html", "Standardized Tongkat Ali (Longjack) extract for testosterone and vitality support"),
    "fadogia": None,  # Pure Encapsulations doesn't carry this
    "zinc": ("Pure Encapsulations Zinc 30", "https://www.pureencapsulations.com/zinc-30.html", "Picolinate form, 30mg per capsule — clean label and highly bioavailable"),
    "lion's mane": ("Pure Encapsulations Lion's Mane", "https://www.pureencapsulations.com/lions-mane.html", "Standardized lion's mane mushroom extract for neurological and cognitive support"),
    "lions mane": ("Pure Encapsulations Lion's Mane", "https://www.pureencapsulations.com/lions-mane.html", "Standardized lion's mane mushroom extract for neurological and cognitive support"),
    "probiotic": ("Pure Encapsulations Probiotic 50B", "https://www.pureencapsulations.com/probiotic-50b.html", "50 billion CFU multi-strain probiotic for gut microbiome support"),
    "synbiotic": ("Pure Encapsulations Probiotic 50B", "https://www.pureencapsulations.com/probiotic-50b.html", "Multi-strain probiotic blend, hypoallergenic and extensively tested"),
    "hormone": ("Pure Encapsulations DIM", "https://www.pureencapsulations.com/dim.html", "Diindolylmethane (DIM) for hormone metabolism and estrogen balance support"),
    "testosterone": ("Pure Encapsulations Zinc 30", "https://www.pureencapsulations.com/zinc-30.html", "Zinc picolinate for testosterone support — foundation mineral for hormonal health"),
}

# UMZU product URLs (their specific product line)
UMZU_PRODUCTS = {
    "tongkat ali": ("UMZU Tongkat Ali", "https://umzu.com/products/tongkat-ali", "100:1 extract standardized for eurycomanone content — testosterone and vitality support"),
    "ashwagandha": ("UMZU TESTRO-X (contains KSM-66 ashwagandha)", "https://umzu.com/products/testro-x", "Comprehensive testosterone support stack including KSM-66, zinc, and magnesium"),
    "zinc": ("UMZU TESTRO-X (contains zinc)", "https://umzu.com/products/testro-x", "Testosterone optimization stack with zinc, magnesium, and ashwagandha"),
    "magnesium": ("UMZU TESTRO-X (contains magnesium glycinate)", "https://umzu.com/products/testro-x", "Testosterone and hormonal support stack containing magnesium glycinate"),
    "fadogia": ("UMZU zuBolic", "https://umzu.com/products/zubolic", "Contains Fadogia agrestis and Tongkat Ali for testosterone and LH support"),
    "hormone": ("UMZU TESTRO-X", "https://umzu.com/products/testro-x", "Comprehensive testosterone support stack — zinc, magnesium, ashwagandha, and more"),
    "testosterone": ("UMZU TESTRO-X", "https://umzu.com/products/testro-x", "All-in-one testosterone support formula — clinically dosed ingredients"),
    "nitric oxide": ("UMZU REDWOOD", "https://umzu.com/products/redwood", "Nitric oxide booster with horse chestnut, pine bark, and vitamin C for circulation"),
    "dhea": None,  # UMZU doesn't carry DHEA
    "collagen": ("UMZU Collagen", "https://umzu.com/products/collagen", "Grass-fed bovine collagen peptides types I and III for skin, joints, and gut"),
    "digestive": ("UMZU Floracil50", "https://umzu.com/products/floracil50", "Probiotic blend for gut microbiome and digestive health"),
    "probiotic": ("UMZU Floracil50", "https://umzu.com/products/floracil50", "50 billion CFU probiotic for gut health and immune support"),
}


def get_category(content):
    match = re.search(r'category:\s*["\']([^"\']+)["\']', content)
    if match:
        return match.group(1)
    return None


def should_process(category):
    return category in ("Supplements", "Peptides")


def line_has_approved_brand(line):
    line_lower = line.lower()
    return any(brand in line_lower for brand in APPROVED_BRANDS)


def line_has_removed_brand(line):
    line_lower = line.lower()
    return any(brand in line_lower for brand in REMOVE_BRANDS)


def get_supplement_key(title, content):
    """Identify the primary supplement from title/content."""
    title_lower = title.lower() if title else ""
    
    checks = [
        ("tongkat ali", "tongkat ali"),
        ("fadogia", "fadogia"),
        ("nmn", "nmn"),
        ("nad+", "nad"),
        ("nad ", "nad"),
        ("nicotinamide", "nad"),
        ("acetyl-l-carnitine", "acetyl-l-carnitine"),
        ("alcar", "alcar"),
        ("alpha-lipoic", "alpha-lipoic acid"),
        ("berberine", "berberine"),
        ("ashwagandha", "ashwagandha"),
        ("creatine", "creatine"),
        ("collagen", "collagen"),
        ("coq10", "coq10"),
        ("ubiquinol", "coq10"),
        ("dhea", "dhea"),
        ("digestive enzym", "digestive enzymes"),
        ("inositol", "inositol"),
        ("l-glutamine", "l-glutamine"),
        ("glutamine", "l-glutamine"),
        ("lion's mane", "lion's mane"),
        ("lions mane", "lions mane"),
        ("magnesium", "magnesium"),
        ("melatonin", "melatonin"),
        ("multivitamin", "multivitamin"),
        ("omega-3", "omega-3"),
        ("fish oil", "omega-3"),
        ("quercetin", "quercetin"),
        ("resveratrol", "resveratrol"),
        ("pterostilbene", "resveratrol"),
        ("rhodiola", "rhodiola"),
        ("thiamine", "thiamine"),
        ("vitamin b1", "thiamine"),
        ("vitamin c", "vitamin c"),
        ("vitamin d", "vitamin d"),
        ("zinc", "zinc"),
        ("hormone", "hormone"),
        ("testosterone", "testosterone"),
        ("synbiotic", "synbiotic"),
        ("probiotic", "probiotic"),
        ("seed am", "probiotic"),
        ("seed pm", "probiotic"),
    ]
    
    for keyword, key in checks:
        if keyword in title_lower:
            return key
    
    return None


def build_replacement_section(supp_key, is_peptide=False):
    """Build a new 'Where to Buy' section with only approved brands."""
    if is_peptide:
        # Peptides aren't sold by these brands — no product links
        return None
    
    lines = []
    
    thorne = THORNE_PRODUCTS.get(supp_key)
    pure_enc = PURE_ENC_PRODUCTS.get(supp_key)
    umzu = UMZU_PRODUCTS.get(supp_key)
    
    if thorne:
        name, url, desc = thorne
        lines.append(f"- **{name}** — {desc} — [{url}]({url})")
    
    if pure_enc:
        name, url, desc = pure_enc
        lines.append(f"- **{name}** — {desc} — [{url}]({url})")
    
    if umzu:
        name, url, desc = umzu
        lines.append(f"- **{name}** — {desc} — [{url}]({url})")
    
    return lines


def process_product_section(lines, supp_key, is_peptide):
    """Filter product section to only approved brands (whitelist approach)."""
    new_lines = []
    removed_any = False
    kept_any = False

    for line in lines:
        stripped = line.strip()

        # Keep non-bullet lines (blank lines, inline text, notes, etc.)
        if not stripped.startswith("- ") and not stripped.startswith("* "):
            new_lines.append(line)
            continue

        # It's a bullet point — whitelist: only keep if it's an approved brand
        if not is_peptide and line_has_approved_brand(line):
            new_lines.append(line)
            kept_any = True
        else:
            # Remove: either it's a non-approved brand, or it's a peptide post (no product links)
            removed_any = True

    # If we removed everything and it's a supplement (not peptide), add Thorne + Pure Enc from lookup
    if removed_any and not kept_any and not is_peptide and supp_key:
        built = build_replacement_section(supp_key, is_peptide=False)
        if built:
            new_lines.extend(built)

    return new_lines, removed_any


def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    
    category = get_category(content)
    if not should_process(category):
        return False, "skipped (not Supplements/Peptides)"
    
    is_peptide = category == "Peptides"
    
    # Extract title for supplement key identification
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', content)
    title = title_match.group(1) if title_match else ""
    supp_key = get_supplement_key(title, content)
    
    lines = content.split("\n")
    new_lines = []
    in_product_section = False
    product_section_lines = []
    section_header = None
    changes_made = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Detect product/where-to-buy section headers
        is_product_header = bool(re.match(
            r'^#{1,4}\s*(where to buy|product rec|recommended product|our picks|buy|purchase|where to find)',
            stripped,
            re.IGNORECASE
        ))
        
        if is_product_header and not in_product_section:
            in_product_section = True
            section_header = line
            product_section_lines = []
            i += 1
            continue
        
        if in_product_section:
            # End of section: new h2/h3 heading or end of file
            if stripped.startswith("##") or stripped.startswith("---"):
                # Process the collected section
                processed, removed = process_product_section(product_section_lines, supp_key, is_peptide)
                original_str = "\n".join(product_section_lines)
                processed_str = "\n".join(processed)
                
                if original_str != processed_str or removed:
                    changes_made = True
                
                new_lines.append(section_header)
                new_lines.extend(processed)
                in_product_section = False
                section_header = None
                product_section_lines = []
                
                # Now handle the current line (the h2/h3 that ended our section)
                new_lines.append(line)
                i += 1
                continue
            else:
                product_section_lines.append(line)
                i += 1
                continue
        
        new_lines.append(line)
        i += 1
    
    # Handle section at end of file
    if in_product_section and product_section_lines:
        processed, removed = process_product_section(product_section_lines, supp_key, is_peptide)
        original_str = "\n".join(product_section_lines)
        processed_str = "\n".join(processed)
        if original_str != processed_str or removed:
            changes_made = True
        new_lines.append(section_header)
        new_lines.extend(processed)
    
    new_content = "\n".join(new_lines)
    
    if changes_made:
        with open(filepath, "w") as f:
            f.write(new_content)
        return True, f"updated ({category}, supp_key={supp_key})"
    
    return False, f"no changes needed ({category})"


def main():
    posts = glob.glob(os.path.join(POSTS_DIR, "*.md"))
    
    updated = []
    skipped = []
    no_change = []
    
    for filepath in sorted(posts):
        filename = os.path.basename(filepath)
        changed, reason = process_file(filepath)
        
        if "skipped" in reason:
            skipped.append(filename)
        elif changed:
            updated.append((filename, reason))
            print(f"✅ {filename}: {reason}")
        else:
            no_change.append((filename, reason))
            print(f"  — {filename}: {reason}")
    
    print(f"\n{'='*60}")
    print(f"Updated:  {len(updated)}")
    print(f"No change: {len(no_change)}")
    print(f"Skipped:  {len(skipped)}")


if __name__ == "__main__":
    main()
