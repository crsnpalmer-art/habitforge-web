#!/usr/bin/env node
// Adds "The Basics" table + sources/buy sections to posts that are missing them

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');

// Map of slug → { basics table row values, key facts, sources, whereToBuy }
const DATA = {
  'dollar-cost-averaging-guide': {
    whatItIs: 'An investment strategy of buying a fixed dollar amount of an asset at regular intervals, regardless of price',
    primaryUse: 'Reducing the impact of market volatility on long-term investment portfolios',
    evidenceLevel: 'Strong — backed by decades of behavioral finance research and historical market data',
    safetyProfile: 'Very Safe — conservative, time-tested strategy used by major institutional investors',
    bestFor: 'Long-term investors building wealth through retirement accounts, 401(k)s, and brokerage accounts',
    facts: [
      'Eliminates the need to time the market — one of the most common and costly investor mistakes',
      'Automatically buys more shares when prices are low and fewer when prices are high',
      'Reduces emotional decision-making by making investing systematic and automatic',
      'Works best over 10+ year time horizons; short-term DCA may underperform lump-sum in bull markets',
      'Most 401(k) contributions are already DCA by default — you\'re likely already using it',
    ],
    sources: [
      'Vanguard Research. "Dollar-cost averaging just means taking risk later." Vanguard. 2012. https://corporate.vanguard.com/content/dam/corp/research/pdf/dollar-cost-averaging.pdf',
      'Brennan MJ et al. "Dollar-Cost Averaging." Journal of Finance. 1995. https://www.jstor.org/stable/2329230',
      'Investopedia. "Dollar-Cost Averaging (DCA) Explained With Examples and Considerations." https://www.investopedia.com/terms/d/dollarcostaveraging.asp',
    ],
    whereToBuy: [
      '**Vanguard** — Low-cost index funds ideal for DCA; automatic investing features — https://investor.vanguard.com/accounts-plans/iras',
      '**Fidelity** — Zero expense ratio index funds, automatic investment scheduling — https://www.fidelity.com/go/zero-index-funds',
      '**M1 Finance** — Automated portfolio investing with scheduled DCA built-in — https://m1.com',
    ],
  },
  'quercetin-guide': {
    whatItIs: 'A plant flavonoid found in onions, apples, and berries with antioxidant, anti-inflammatory, and antiviral properties',
    primaryUse: 'Reducing inflammation, supporting immune function, and cardiovascular health',
    evidenceLevel: 'Moderate — solid mechanistic data and animal studies; human clinical trials mixed but promising',
    safetyProfile: 'Very Safe — long history of dietary consumption; supplement doses generally well-tolerated',
    bestFor: 'Those dealing with chronic inflammation, allergies, cardiovascular risk factors, or seeking broad antioxidant support',
    facts: [
      'One of the most abundant dietary flavonoids — present in onions, kale, apples, and berries',
      'Acts as a zinc ionophore, helping zinc enter cells — relevant for antiviral defense',
      'Bioavailability is low in standard quercetin; phytosome form (quercetin + phosphatidylcholine) is significantly better absorbed',
      'May inhibit histamine release from mast cells — making it useful for seasonal allergy support',
      'Typical supplemental doses: 500–1,000 mg/day; often stacked with zinc and vitamin C',
    ],
    sources: [
      'Li Y, et al. "Quercetin, Inflammation and Immunity." Nutrients. 2016. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4808895/',
      'Boots AW, et al. "Health effects of quercetin: from antioxidant to nutraceutical." European Journal of Pharmacology. 2008. https://pubmed.ncbi.nlm.nih.gov/18417116/',
      'National Institutes of Health. "Quercetin." NIH Office of Dietary Supplements. https://ods.od.nih.gov/factsheets/flavonoids-HealthProfessional/',
    ],
    whereToBuy: [
      '**NOW Foods Quercetin with Bromelain** — 800 mg quercetin + bromelain for enhanced absorption — https://www.amazon.com/NOW-Supplements-Quercetin-Bromelain-Capsules/dp/B0013OSAJM',
      '**Thorne Quercetin Phytosome** — Superior bioavailability form — https://www.amazon.com/Thorne-Research-Quercetin-Phytosome-Supplement/dp/B0013OVWSI',
      '**Pure Encapsulations Quercetin** — Hypoallergenic, clean label — https://www.amazon.com/Pure-Encapsulations-Quercetin-Antioxidant-Supplement/dp/B00280ESFC',
    ],
  },
  'thiamine-b1-cognition': {
    whatItIs: 'An essential B-vitamin (vitamin B1) critical for glucose metabolism, nerve function, and brain energy production',
    primaryUse: 'Supporting cognitive function, nerve health, and energy metabolism; treating deficiency conditions',
    evidenceLevel: 'Strong — essential nutrient with well-established biochemistry; therapeutic high-dose forms (TTFD/benfotiamine) show promising cognitive data',
    safetyProfile: 'Very Safe — water-soluble vitamin; excess is excreted; even high-dose forms have excellent safety records',
    bestFor: 'People with high carbohydrate intake, alcohol consumers, those with cognitive decline risk, or anyone with suspected B1 deficiency',
    facts: [
      'Acts as a cofactor for pyruvate dehydrogenase — essential for converting glucose to brain energy (ATP)',
      'Deficiency causes Wernicke\'s encephalopathy and Korsakoff syndrome — serious neurological conditions',
      'TTFD (thiamine tetrahydrofurfuryl disulfide) and benfotiamine are fat-soluble forms with far better brain penetration than standard thiamine HCl',
      'Heavy alcohol consumption severely depletes thiamine — one of the most common nutritional deficiencies in drinkers',
      'Emerging research links thiamine optimization to improved cognition in Alzheimer\'s and fatigue syndromes',
    ],
    sources: [
      'Lonsdale D. "A Review of the Biochemistry, Metabolism and Clinical Benefits of Thiamin(e)." Evidence-Based Complementary and Alternative Medicine. 2006. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1375232/',
      'Bettendorff L, et al. "Thiamine in the Nervous System." Neurochemistry International. 2012. https://pubmed.ncbi.nlm.nih.gov/22548794/',
      'NIH Office of Dietary Supplements. "Thiamin." https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/',
    ],
    whereToBuy: [
      '**Objective Nutrients TTFD** — Thiamine Tetrahydrofurfuryl Disulfide, fat-soluble, superior CNS penetration — https://www.amazon.com/Objective-Nutrients-Thiamine-Tetrahydrofurfuryl-Disulfide/dp/B09BFHFKQV',
      '**Solgar Benfotiamine** — Fat-soluble thiamine, 150 mg, well-studied — https://www.amazon.com/Solgar-Benfotiamine-150-Vegetable-Capsules/dp/B002XSTDIA',
      '**Life Extension Mega Benfotiamine** — 250 mg high-dose benfotiamine — https://www.amazon.com/Life-Extension-Mega-Benfotiamine-250mg/dp/B003D7NN6G',
    ],
  },
  'vitamin-d3-k2-complete-guide': {
    whatItIs: 'The combination of vitamin D3 (cholecalciferol) and vitamin K2 (MK-7) for optimizing calcium metabolism, bone density, and immune function',
    primaryUse: 'Correcting vitamin D deficiency, supporting bone health, cardiovascular protection, and immune optimization',
    evidenceLevel: 'Strong — vitamin D deficiency affects ~40% of US adults; supplementation benefits are extensively documented',
    safetyProfile: 'Very Safe — at doses up to 4,000 IU D3 daily; K2 co-supplementation prevents hypercalcemia risk at higher doses',
    bestFor: 'Those with limited sun exposure, northern latitudes, darker skin tones, obesity, or confirmed deficiency (below 30 ng/mL)',
    facts: [
      'Over 1 billion people worldwide are estimated to be vitamin D deficient or insufficient',
      'Vitamin K2 (MK-7 form) directs calcium into bones and away from arteries — essential when supplementing higher D3 doses',
      'Optimal blood level: 40–60 ng/mL (100–150 nmol/L); most labs consider 30 ng/mL "sufficient" but researchers suggest higher',
      'D3 is the form produced by sun exposure; D2 (ergocalciferol, found in fortified foods) is significantly less bioactive',
      'Fat-soluble vitamin — take with a meal containing fat for optimal absorption',
    ],
    sources: [
      'Holick MF. "Vitamin D Deficiency." New England Journal of Medicine. 2007. https://www.nejm.org/doi/full/10.1056/NEJMra070553',
      'Hewison M. "Vitamin D and the immune system." Journal of Endocrinology. 2012. https://pubmed.ncbi.nlm.nih.gov/22553144/',
      'NIH Office of Dietary Supplements. "Vitamin D." https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/',
      'Vermeer C. "Vitamin K: the effect on health beyond coagulation." Food & Nutrition Research. 2012. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3321262/',
    ],
    whereToBuy: [
      '**Thorne Vitamin D/K2** — 1,000 IU D3 + 200 mcg MK-7, NSF certified — https://www.amazon.com/Thorne-Research-Vitamin-K2-Supplement/dp/B0797H831C',
      '**Sports Research Vitamin D3 K2** — 5,000 IU D3 with MK-7, organic coconut oil for absorption — https://www.amazon.com/Sports-Research-Vitamin-K2-MK7/dp/B01CYZF7XM',
      '**Carlson Labs Vitamin D3** — 2,000 IU, olive oil base — https://www.amazon.com/Carlson-Labs-Vitamin-Olive-Softgels/dp/B00BSLMW2C',
    ],
  },
  'zone-2-cardio-longevity': {
    whatItIs: 'A cardiovascular training intensity zone (~60-70% max heart rate) where fat is the primary fuel and mitochondrial adaptations occur',
    primaryUse: 'Building aerobic base, improving metabolic health, enhancing mitochondrial function, and extending healthspan',
    evidenceLevel: 'Strong — foundational exercise science with robust data on metabolic, cardiovascular, and longevity benefits',
    safetyProfile: 'Very Safe — low-impact intensity accessible to most adults; foundation of elite endurance programs',
    bestFor: 'Anyone building cardiovascular fitness, optimizing metabolic health, reducing disease risk, or following a longevity protocol',
    facts: [
      'Zone 2 is defined as the highest intensity where you can maintain a full conversation without gasping',
      'Primary fuel source shifts to fat oxidation — builds metabolic flexibility and trains the body to burn fat efficiently',
      'Stimulates mitochondrial biogenesis (creation of new mitochondria) — the key to aging well',
      'Dr. Peter Attia and Iñigo San Millán recommend 3-4 hours per week minimum for longevity; elite endurance athletes do 6-12+ hours',
      'Benefits accumulate over months — requires consistent volume, not intensity; most people should do MORE Zone 2, not harder workouts',
    ],
    sources: [
      'San-Millán I, Brooks GA. "Assessment of Metabolic Flexibility by Means of Measuring Blood Lactate, Fat, and Carbohydrate Oxidation Responses." Nutrients. 2018. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6628858/',
      'Attia P. "Zone 2 Training and Metabolic Health." Peter Attia MD. https://peterattiamd.com/zone2/',
      'Hood DA, et al. "Maintenance of Skeletal Muscle Mitochondria in Health, Exercise, and Aging." Annual Review of Physiology. 2019. https://pubmed.ncbi.nlm.nih.gov/30256729/',
    ],
    whereToBuy: [
      '**Garmin Forerunner 255** — GPS watch with accurate heart rate zones and aerobic training status — https://www.amazon.com/Garmin-Forerunner-Running-Smartwatch-Advanced/dp/B09SDFS7Q9',
      '**Polar H10 Heart Rate Monitor** — Gold standard chest strap for accurate Zone 2 tracking — https://www.amazon.com/Polar-H10-Heart-Rate-Monitor/dp/B07FCQGMXN',
      '**Concept2 RowErg** — Premier low-impact Zone 2 cardio machine — https://www.concept2.com/rowerg',
    ],
  },
  'tb-500-thymosin-beta-4-guide': {
    whatItIs: 'A synthetic version of the naturally occurring peptide Thymosin Beta-4 (Tβ4), involved in tissue repair and cellular migration',
    primaryUse: 'Accelerating healing of tendons, ligaments, muscles, and reducing inflammation; improving flexibility',
    evidenceLevel: 'Emerging — promising animal data; limited human clinical trials; widely used in self-experimentation',
    safetyProfile: 'Caution Advised — research chemical; not FDA-approved; limited human safety data',
    bestFor: 'Athletes with chronic soft tissue injuries, those exploring advanced recovery peptide protocols alongside BPC-157',
    facts: [
      'Naturally produced by the thymus gland; promotes actin polymerization essential for cell motility and healing',
      'Often stacked with BPC-157 for synergistic tissue repair — the two peptides complement each other\'s mechanisms',
      'Typically administered subcutaneously at 2–2.5 mg 2x/week during the loading phase; lower maintenance doses thereafter',
      'Has been studied in wound healing clinical trials — shows promise for corneal injury, cardiac repair, and skin healing',
      'Unlike BPC-157, TB-500 has a more systemic mechanism — it circulates rather than acting primarily at the injection site',
    ],
    sources: [
      'Goldstein AL, et al. "Thymosin β4: a multi-functional regenerative peptide." Expert Opinion on Biological Therapy. 2012. https://pubmed.ncbi.nlm.nih.gov/22339408/',
      'Philp D, Kleinman HK. "Animal studies with thymosin β4, a promising therapeutic agent." Annals of the New York Academy of Sciences. 2010. https://pubmed.ncbi.nlm.nih.gov/20633108/',
      'Huff T, et al. "Beta-thymosins, small acidic peptides with multiple functions." International Journal of Biochemistry & Cell Biology. 2001. https://pubmed.ncbi.nlm.nih.gov/11463581/',
    ],
    whereToBuy: [
      '**Peptide Sciences TB-500** — Research-grade, lab-tested, lyophilized powder — https://www.peptidesciences.com/tb-500',
      '**Limitless Life Nootropics TB-500** — US-sourced research peptide — https://limitlesslifenootropics.com/tb-500/',
      '**Bacteriostatic water** — Required for reconstitution — https://www.amazon.com/Bacteriostatic-Water-Injection-Multiple-Vials/dp/B07X72MLVX',
    ],
  },
  'seed-pm-sleep-restore': {
    whatItIs: 'A two-part probiotic supplement by Seed designed for evening use, supporting gut health restoration and sleep-adjacent circadian signaling',
    primaryUse: 'Supporting gut microbiome health at rest, digestive recovery, and circadian-aligned probiotic seeding',
    evidenceLevel: 'Emerging — Seed\'s DS-01 formulation has some clinical backing; PM-specific probiotic timing research is early-stage',
    safetyProfile: 'Generally Safe — probiotic supplementation is well-tolerated in healthy adults',
    bestFor: 'Those already using Seed\'s DS-01 system or seeking circadian-optimized gut support as part of a sleep protocol',
    facts: [
      'Part of Seed\'s 24-hour gut health system alongside their DS-01 AM formulation',
      'Probiotics may influence sleep quality through gut-brain axis signaling and tryptophan/serotonin pathways',
      'Seed uses a nested capsule technology to protect strains from stomach acid degradation',
      'Timing probiotic intake in the evening aligns with nighttime gut motility patterns and microbiome repair cycles',
      'Contains prebiotics + probiotics in a synbiotic format for enhanced efficacy',
    ],
    sources: [
      'Thaiss CA, et al. "Transkingdom control of microbiota diurnal oscillations promotes metabolic homeostasis." Cell. 2014. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4257162/',
      'Hao Q, et al. "Probiotics for preventing acute upper respiratory tract infections." Cochrane Database. 2015. https://pubmed.ncbi.nlm.nih.gov/26695080/',
      'Smith RP, et al. "Gut microbiome diversity is associated with sleep physiology in humans." PLOS One. 2019. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0222394',
    ],
    whereToBuy: [
      '**Seed DS-01 (AM+PM System)** — Complete daily synbiotic with AM and PM capsules — https://seed.com/ds-01',
      '**Ritual Synbiotic+** — Alternative synbiotic with prebiotics + probiotics + postbiotics — https://ritual.com/products/synbiotic',
      '**Garden of Life Dr. Formulated Probiotics** — Budget-friendly probiotic option — https://www.amazon.com/Garden-Life-Formulated-Probiotic-Supplement/dp/B00Y9XM6E2',
    ],
  },
  'zinc-testosterone-guide': {
    whatItIs: 'An essential trace mineral that plays a critical role in testosterone synthesis, immune function, and over 300 enzymatic reactions',
    primaryUse: 'Supporting testosterone levels, immune defense, wound healing, and addressing zinc deficiency',
    evidenceLevel: 'Strong for deficiency correction; Moderate for testosterone optimization in replete individuals',
    safetyProfile: 'Generally Safe — at 8-40 mg/day; chronic high doses (>40 mg) can deplete copper and cause adverse effects',
    bestFor: 'Men with low testosterone related to zinc deficiency, athletes with high sweat losses, vegetarians/vegans, and those with immune concerns',
    facts: [
      'Zinc is a cofactor in the conversion of androstenedione to testosterone — deficiency directly lowers testosterone',
      'Intense exercise and sweating deplete zinc — athletes are at elevated risk of suboptimal zinc status',
      'Oysters contain more zinc per serving than any other food (74 mg per 3 oz)',
      'Zinc picolinate and zinc glycinate are the best-absorbed forms; zinc oxide is poorly bioavailable',
      'Do not take zinc and copper together — they compete for absorption; if supplementing zinc long-term, ensure adequate copper intake',
    ],
    sources: [
      'Prasad AS, et al. "Zinc status and serum testosterone levels of healthy adults." Nutrition. 1996. https://pubmed.ncbi.nlm.nih.gov/8875519/',
      'Kilic M. "Effect of fatiguing bicycle exercise on thyroid hormone and testosterone levels in sedentary males supplemented with oral zinc." Neuro Endocrinology Letters. 2007. https://pubmed.ncbi.nlm.nih.gov/17984944/',
      'NIH Office of Dietary Supplements. "Zinc." https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/',
    ],
    whereToBuy: [
      '**Thorne Zinc Picolinate** — 15 mg, well-absorbed picolinate form, NSF certified — https://www.amazon.com/Thorne-Research-Zinc-Picolinate-Supplement/dp/B0797H831C',
      '**NOW Foods Zinc Glycinate** — 30 mg, amino acid chelate, gentle on stomach — https://www.amazon.com/NOW-Supplements-Glycinate-Vegetarian-Capsules/dp/B002VXQ6OK',
      '**Life Extension Zinc Caps** — 50 mg with OptiZinc form — https://www.amazon.com/Life-Extension-OptiZinc-Vegetarian-Capsules/dp/B07GPRRGKY',
    ],
  },
  'smart-goals-vs-systems': {
    whatItIs: 'A comparison of outcome-focused goal-setting (SMART goals) versus process-focused systems thinking for long-term behavior change',
    primaryUse: 'Helping individuals design effective approaches to achievement by understanding when goals vs. systems serve better',
    evidenceLevel: 'Strong — backed by behavioral psychology research, goal-setting theory, and implementation intention science',
    safetyProfile: 'Very Safe — purely a cognitive and behavioral framework',
    bestFor: 'Anyone struggling with motivation, habit formation, or long-term achievement who wants a more effective mental model for change',
    facts: [
      'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are effective for focused short-term objectives',
      'Systems focus on the daily inputs rather than outputs — James Clear argues "you don\'t rise to the level of your goals, you fall to the level of your systems"',
      'Goal-setting theory (Locke & Latham, 1990) shows specific, challenging goals outperform vague or easy ones',
      'Implementation intentions ("I will [behavior] at [time] in [location]") triple the likelihood of follow-through vs. goals alone',
      'The most effective approach combines both: identity-based goals (who you want to become) + systems (daily habits that make you that person)',
    ],
    sources: [
      'Locke EA, Latham GP. "A Theory of Goal Setting and Task Performance." Prentice Hall. 1990. https://www.sciencedirect.com/science/article/pii/0749597890900388',
      'Gollwitzer PM. "Implementation Intentions: Strong effects of simple plans." American Psychologist. 1999. https://pubmed.ncbi.nlm.nih.gov/10670605/',
      'Clear J. "Forget About Setting Goals. Focus on This Instead." JamesClear.com. https://jamesclear.com/goals-systems',
    ],
    whereToBuy: [
      '**Atomic Habits by James Clear** — The definitive book on systems-based behavior change — https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
      '**The 12 Week Year by Brian Moran** — Compresses annual goals into 12-week execution cycles — https://www.amazon.com/12-Week-Year-Others-Months/dp/1118509234',
      '**Notion Goal Tracker** — Free template for SMART goal tracking — https://www.notion.so/templates/goal-tracker',
    ],
  },
  'selegiline-guide': {
    whatItIs: 'A selective MAO-B inhibitor (monoamine oxidase type B) used in Parkinson\'s disease treatment and explored for cognitive enhancement and longevity',
    primaryUse: 'Parkinson\'s disease management; off-label use for cognitive enhancement, neuroprotection, and anti-aging',
    evidenceLevel: 'Strong for Parkinson\'s; Moderate for cognitive/longevity applications',
    safetyProfile: 'Caution Advised — prescription medication with significant drug interactions; requires careful dosing and avoidance of tyramine-rich foods at higher doses',
    bestFor: 'Parkinson\'s patients (with neurologist oversight); experienced biohackers exploring dopaminergic neuroprotection under medical supervision',
    facts: [
      'At low doses (5-10 mg/day), selegiline selectively inhibits MAO-B without the tyramine "cheese effect" seen with non-selective MAO inhibitors',
      'Increases dopamine availability by blocking its primary breakdown enzyme — relevant for both motor function and mood',
      'The Deprenyl and Tocopherol Antioxidative Therapy (DATATOP) trial showed selegiline significantly delayed the need for levodopa in early Parkinson\'s',
      'Off-label longevity interest stems from animal studies showing extended lifespan in rats — human evidence is preliminary',
      'Low-dose transdermal selegiline (EMSAM patch) is FDA-approved for depression with a more favorable side effect profile',
    ],
    sources: [
      'The Parkinson Study Group. "Effects of tocopherol and deprenyl on the progression of disability in early Parkinson\'s disease." NEJM. 1993. https://www.nejm.org/doi/full/10.1056/NEJM199301143280204',
      'Tatton WG, Greenwood CE. "Rescue of dying neurons: a new action for deprenyl in MPTP parkinsonism." Journal of Neuroscience Research. 1991. https://pubmed.ncbi.nlm.nih.gov/1787485/',
      'FDA. "ELDEPRYL (selegiline hydrochloride) prescribing information." https://www.accessdata.fda.gov/drugsatfda_docs/label/2008/019334s024lbl.pdf',
    ],
    whereToBuy: [
      '**GoodRx — Selegiline** — Compare pharmacy prices; generic available for ~$20/month — https://www.goodrx.com/selegiline',
      '**RxList — Selegiline (Eldepryl)** — Full prescribing information and interactions — https://www.rxlist.com/eldepryl-drug.htm',
    ],
  },
  'tesamorelin-guide': {
    whatItIs: 'A synthetic analogue of growth hormone-releasing hormone (GHRH) that stimulates the pituitary gland to produce growth hormone',
    primaryUse: 'FDA-approved for HIV-associated lipodystrophy; off-label use for body composition, fat reduction, and cognitive enhancement',
    evidenceLevel: 'Strong for FDA-approved indication; Moderate for off-label body composition use',
    safetyProfile: 'Caution Advised — prescription-only in most contexts; requires monitoring for glucose and IGF-1 levels; contraindicated in active malignancy',
    bestFor: 'Adults with visceral fat accumulation, those in GH optimization protocols under medical supervision, or HIV patients with lipodystrophy',
    facts: [
      'FDA-approved (brand name: Egrifta) for reducing excess abdominal fat in HIV patients with lipodystrophy',
      'Unlike direct GH administration, tesamorelin preserves the natural pulsatile release of GH — considered safer for long-term use',
      'Clinical trials show 15-20% reductions in visceral adipose tissue (VAT) with tesamorelin vs placebo',
      'Also studied for cognitive benefits — a 2012 study showed improved executive function and verbal memory in older adults with MCI',
      'Typical dose: 1-2 mg subcutaneously once daily; effects on body composition visible within 6-12 weeks',
    ],
    sources: [
      'Falutz J, et al. "Effects of tesamorelin, a growth hormone-releasing factor, in HIV-infected patients with abdominal fat accumulation." NEJM. 2010. https://www.nejm.org/doi/full/10.1056/NEJMoa0908946',
      'Baker LD, et al. "Effects of growth hormone-releasing hormone on cognitive function in adults with mild cognitive impairment and healthy older adults." Archives of Neurology. 2012. https://pubmed.ncbi.nlm.nih.gov/22232159/',
      'FDA. "Egrifta (tesamorelin for injection) prescribing information." https://www.accessdata.fda.gov/drugsatfda_docs/label/2010/022505lbl.pdf',
    ],
    whereToBuy: [
      '**Peptide Sciences Tesamorelin** — Research-grade lyophilized peptide — https://www.peptidesciences.com/tesamorelin',
      '**GoodRx — Egrifta (Tesamorelin)** — Brand-name pricing and pharmacy comparison — https://www.goodrx.com/egrifta',
    ],
  },
  'tongkat-ali-testosterone-guide': {
    whatItIs: 'A Southeast Asian medicinal plant (Eurycoma longifolia) with clinical evidence for increasing free testosterone and reducing cortisol in stressed or aging individuals',
    primaryUse: 'Supporting testosterone levels, reducing cortisol, improving libido and male fertility',
    evidenceLevel: 'Moderate — multiple human RCTs with positive results; mechanisms increasingly understood',
    safetyProfile: 'Generally Safe — extensive traditional use; studies show good tolerability up to 300-400 mg/day of standardized extract',
    bestFor: 'Men over 35 with low testosterone, high stress (elevated cortisol), reduced libido, or athletes seeking natural testosterone support',
    facts: [
      'Works by increasing the free-to-bound ratio of testosterone — reduces SHBG, freeing up bound testosterone for bioavailability',
      'Also reduces cortisol by ~16% in clinical stress exposure studies — making it unique as a testosterone-support + adaptogen combo',
      'Look for products standardized to eurycomanone content (1-2%) from the root extract — most "tongkat ali" products are underdosed',
      'LJ100® is a patented, clinically-researched extract used in most positive studies — the benchmark for quality',
      'Multiple human RCTs show improvements in testosterone, sperm quality, and sexual function — particularly in stressed populations',
    ],
    sources: [
      'Talbott SM, et al. "Effect of Tongkat Ali on stress hormones and psychological mood state in moderately stressed subjects." Journal of the International Society of Sports Nutrition. 2013. https://jissn.biomedcentral.com/articles/10.1186/1550-2783-10-28',
      'Tambi MI, et al. "Standardised water-soluble extract of Eurycoma longifolia raises testosterone levels in infertile men." Asian Journal of Andrology. 2012. https://pubmed.ncbi.nlm.nih.gov/21671978/',
      'Leisegang K, et al. "Eurycoma longifolia Reduces Fatigue and Improves Physical Performance." Phytomedicine. 2022. https://pubmed.ncbi.nlm.nih.gov/35868253/',
    ],
    whereToBuy: [
      '**Nootropics Depot Tongkat Ali (LJ100)** — Standardized to eurycomanone, third-party tested — https://nootropicsdepot.com/tongkat-ali-extract-100-1/',
      '**Nutricost Tongkat Ali 400mg** — Budget-friendly, 200:1 extract — https://www.amazon.com/Nutricost-Tongkat-Ali-Extract-400mg/dp/B07H38YCHF',
      '**Double Wood Supplements Tongkat Ali** — 400 mg standardized root extract — https://www.amazon.com/Tongkat-Ali-Extract-Supplement/dp/B07D98S71V',
    ],
  },
  'resveratrol-pterostilbene-guide': {
    whatItIs: 'A pair of related stilbenoid polyphenols (resveratrol from grapes/knotweed; pterostilbene from blueberries) that activate SIRT1 and support metabolic and longevity pathways',
    primaryUse: 'Metabolic health, cardiovascular protection, sirtuin activation, and anti-aging support',
    evidenceLevel: 'Moderate — compelling mechanisms and animal data; mixed human clinical results due to bioavailability challenges',
    safetyProfile: 'Generally Safe — both have good safety profiles at standard doses; pterostilbene may raise LDL at high doses',
    bestFor: 'Biohackers pursuing longevity protocols, those with metabolic syndrome risk factors, or anyone stacking with NMN/NR for sirtuin pathway support',
    facts: [
      'Resveratrol activates SIRT1 — a protein linked to longevity that mimics some effects of caloric restriction',
      'Pterostilbene is ~80% bioavailable vs ~20% for standard resveratrol, giving it superior systemic effects',
      'Taking resveratrol with fat (olive oil, full-fat yogurt) significantly improves absorption',
      'Most effective when combined with NMN or NR: resveratrol activates SIRT1, NAD+ precursors fuel it — complementary mechanisms',
      'David Sinclair of Harvard publicly takes 1g resveratrol daily with yogurt — though human evidence for high doses remains limited',
    ],
    sources: [
      'Baur JA, Sinclair DA. "Therapeutic potential of resveratrol: the in vivo evidence." Nature Reviews Drug Discovery. 2006. https://www.nature.com/articles/nrd2060',
      'Kapetanovic IM, et al. "Pharmacokinetics, oral bioavailability, and metabolic profile of resveratrol and its dimethylether analog." Cancer Chemotherapy and Pharmacology. 2011. https://pubmed.ncbi.nlm.nih.gov/20549515/',
      'Kosuru R, et al. "Pterostilbene and Health Benefits." Molecules. 2016. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4808895/',
    ],
    whereToBuy: [
      '**Life Extension Trans-Resveratrol** — 100 mg trans-resveratrol + grape seed extract — https://www.amazon.com/Life-Extension-Trans-Resveratrol-Vegetarian-Capsules/dp/B003ESNZS4',
      '**Double Wood Pterostilbene** — 100 mg pure pterostilbene, standardized — https://www.amazon.com/Pterostilbene-Supplement-100mg-Servings-Double/dp/B072BKCQBF',
      '**Nootropics Depot Pterostilbene** — Premium, lab-verified pterostilbene — https://nootropicsdepot.com/pterostilbene-100mg-capsules/',
    ],
  },
  'sunlight-benefits-morning-light': {
    whatItIs: 'The practice of deliberate morning sun exposure to regulate circadian rhythms, optimize cortisol timing, and support mood, sleep, and metabolic health',
    primaryUse: 'Anchoring the circadian clock, improving sleep quality, boosting morning energy and mood, supporting vitamin D synthesis',
    evidenceLevel: 'Strong — circadian biology and light-clock entrainment are among the most robust areas of modern neuroscience',
    safetyProfile: 'Very Safe — natural morning light (pre-10am) poses minimal UV risk; avoid staring directly at the sun',
    bestFor: 'Anyone with poor sleep, mood issues, low energy, irregular schedules, or those seeking to optimize circadian health',
    facts: [
      'Bright light in the first 30-60 minutes after waking is the strongest zeitgeber (time-giver) for setting your circadian clock',
      'Morning light triggers a healthy cortisol pulse that energizes you and sets a ~14-16 hour timer for melatonin release at night',
      'Even on a cloudy day, outdoor light (10,000+ lux) dramatically exceeds indoor lighting (100-500 lux) for circadian signaling',
      'The retinal ganglion cells that detect light for circadian purposes peak sensitivity in the blue-green spectrum (480-490 nm)',
      'Dr. Andrew Huberman popularized the protocol: 5-10 min outdoor morning light within an hour of waking; no sunglasses',
    ],
    sources: [
      'Czeisler CA, et al. "Bright light resets the human circadian pacemaker independent of the timing of the sleep-wake cycle." Science. 1986. https://www.science.org/doi/10.1126/science.3749862',
      'Leproult R, et al. "Effect of morning bright light exposure on neuroendocrine response." Psychoneuroendocrinology. 2001. https://pubmed.ncbi.nlm.nih.gov/11413004/',
      'Gooley JJ, et al. "Melanopsin and Rod-Cone Photoreceptors Play Different Roles in Mediating Pupillary Light Responses." Journal of Neuroscience. 2012. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3381736/',
    ],
    whereToBuy: [
      '**Carex Day-Light Classic Plus Lamp** — 10,000 lux SAD lamp for indoor light therapy — https://www.amazon.com/Carex-Day-Light-Classic-Therapy/dp/B01EBWFVZM',
      '**Verilux HappyLight** — 10,000 lux, compact light therapy lamp — https://www.amazon.com/HappyLight-Lucent-10000-Therapy-Light/dp/B0052QPLNA',
    ],
  },
  'vitamin-c-whole-food-vs-synthetic': {
    whatItIs: 'The comparison between naturally-occurring vitamin C from whole food sources (with bioflavonoids, cofactors) versus isolated ascorbic acid supplements',
    primaryUse: 'Immune function, collagen synthesis, antioxidant defense, and iron absorption',
    evidenceLevel: 'Strong — vitamin C\'s essential functions are well-established; whole food vs. synthetic bioavailability debate is nuanced',
    safetyProfile: 'Very Safe — water-soluble; excess is excreted; high-dose supplementation (>2g/day) may cause GI issues in sensitive individuals',
    bestFor: 'Everyone — vitamin C is essential; food-first approach is ideal; supplementation warranted for deficiency, illness, or high physiological demand',
    facts: [
      'Scurvy — caused by severe vitamin C deficiency — was a major cause of death among sailors before the 18th century',
      'Humans (unlike most animals) cannot synthesize vitamin C and must obtain it entirely from diet',
      'Whole food sources contain bioflavonoids (quercetin, rutin, hesperidin) that may enhance vitamin C\'s bioavailability and function',
      'Liposomal vitamin C achieves higher plasma levels than standard ascorbic acid and is a preferred form for high-dose protocols',
      'The RDA of 90 mg/day (men) is considered a floor — many researchers suggest 200-500 mg/day from food + supplements for optimal function',
    ],
    sources: [
      'Levine M, et al. "Vitamin C pharmacokinetics in healthy volunteers." Proceedings of the National Academy of Sciences. 1996. https://www.pnas.org/doi/10.1073/pnas.93.8.3704',
      'Carr AC, Vissers MCM. "Synthetic or Food-Derived Vitamin C—Are They Equally Bioavailable?" Nutrients. 2013. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3847730/',
      'NIH Office of Dietary Supplements. "Vitamin C." https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/',
    ],
    whereToBuy: [
      '**Camu Camu Powder** — One of the highest whole-food vitamin C sources; 2-3g per tsp — https://www.amazon.com/Navitas-Organics-Camu-Powder/dp/B009Y3QTKE',
      '**LivOn Labs Lypo-Spheric Vitamin C** — Liposomal form, superior bioavailability — https://www.amazon.com/LivOn-Labs-Lypo-Spheric-Vitamin/dp/B002CQU564',
      '**Thorne Vitamin C with Flavonoids** — Ascorbic acid + citrus bioflavonoids — https://www.amazon.com/Thorne-Research-Citrate-Bioflavonoids-Supplement/dp/B001MSPPKY',
    ],
  },
  'why-your-habits-are-your-dna': {
    whatItIs: 'A framework exploring how daily habits literally encode themselves into neural pathways and gene expression, making your behaviors a biological self — your behavioral DNA',
    primaryUse: 'Understanding the biological and neuroscientific basis for why habits are so powerful and persistent',
    evidenceLevel: 'Strong — backed by neuroscience research on habit formation, neuroplasticity, and epigenetics',
    safetyProfile: 'Very Safe — conceptual framework',
    bestFor: 'Anyone seeking deeper motivation for habit change by understanding the biology behind behavioral patterns',
    facts: [
      'Habits are encoded in the basal ganglia — a brain region that operates largely below conscious awareness, making them automatic',
      'Epigenetics research shows that behaviors can alter gene expression — your habits literally change how your DNA is read',
      'A 2010 UCL study found habit formation takes 18 to 254 days, with a median of 66 days — not the popular myth of 21 days',
      'The habit loop (cue-routine-reward) creates neurological grooves that become the default when willpower is depleted',
      'HabitForge\'s DNA framework treats habits as the building blocks of identity — what you do repeatedly becomes who you are',
    ],
    sources: [
      'Lally P, et al. "How are habits formed: Modelling habit formation in the real world." European Journal of Social Psychology. 2010. https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674',
      'Graybiel AM. "Habits, rituals, and the evaluative brain." Annual Review of Neuroscience. 2008. https://pubmed.ncbi.nlm.nih.gov/18558860/',
      'Handel SL. "Habit Formation and the Brain." The Emotion Machine. https://www.theemotionmachine.com/habit-formation-and-the-brain/',
    ],
    whereToBuy: [
      '**HabitForge App** — Coming soon: forge your behavioral DNA with the Forge Score system — https://habitforgeai.com/#waitlist',
      '**Atomic Habits — James Clear** — The best practical guide to building habit DNA — https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
      '**The Power of Habit — Charles Duhigg** — Deep dive into the neuroscience of habit loops — https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X',
    ],
  },
  'thyroid-hormones-guide': {
    whatItIs: 'A guide to thyroid hormones (T3, T4, TSH) — their roles in metabolism, energy, weight, and mood — and how to evaluate and optimize thyroid function',
    primaryUse: 'Understanding thyroid health, interpreting lab values, and optimizing thyroid function for energy, metabolism, and overall wellbeing',
    evidenceLevel: 'Strong — thyroid endocrinology is among the most well-studied areas of medicine',
    safetyProfile: 'Caution Advised — thyroid hormones require careful medical management; self-supplementation carries real risks',
    bestFor: 'Anyone experiencing unexplained fatigue, weight gain, cold intolerance, brain fog, or suboptimal lab values who wants to understand their thyroid health',
    facts: [
      'The thyroid produces T4 (inactive prohormone) which is converted to T3 (active hormone) primarily in peripheral tissues',
      'TSH (thyroid stimulating hormone) is the master regulator — high TSH indicates the body needs more thyroid hormone (hypothyroid); low TSH indicates excess',
      'Standard TSH testing alone misses many cases of suboptimal thyroid function — full panel (TSH, free T3, free T4, rT3, antibodies) provides better picture',
      'Iodine and selenium are rate-limiting nutrients for thyroid hormone synthesis and T4→T3 conversion respectively',
      'Subclinical hypothyroidism (TSH 2.5-10 mIU/L) affects millions and may cause symptoms even without overt disease',
    ],
    sources: [
      'Garber JR, et al. "Clinical practice guidelines for hypothyroidism in adults." Endocrine Practice. 2012. https://pubmed.ncbi.nlm.nih.gov/23246686/',
      'Bianco AC, et al. "Biochemistry, cellular and molecular biology, and physiological roles of the iodothyronine selenodeiodinases." Endocrine Reviews. 2002. https://pubmed.ncbi.nlm.nih.gov/12414823/',
      'NIH. "Thyroid Disease." National Institute of Diabetes and Digestive and Kidney Diseases. https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism',
    ],
    whereToBuy: [
      '**Ulta Lab Tests — Thyroid Panel** — Order your own comprehensive thyroid labs without a doctor — https://www.ultalabtests.com/tests/thyroid-panel-with-tsh',
      '**Brazil Nuts** — Best dietary source of selenium for T4→T3 conversion; 1-2 nuts/day is sufficient — https://www.amazon.com/Whole-Organic-Brazil-Nuts-Raw/dp/B01N4KKFNE',
      '**Thorne Iodine & Tyrosine** — Supports thyroid hormone synthesis; use only if deficient — https://www.thorne.com/products/dp/iodine-tyrosine',
    ],
  },
  'seed-am-energy-focus': {
    whatItIs: 'The morning component of Seed\'s DS-01 Daily Synbiotic system, containing a curated blend of probiotic strains optimized for daytime gut health and energy support',
    primaryUse: 'Daytime gut microbiome support, immune function, digestive health, and gut-brain axis energy signaling',
    evidenceLevel: 'Moderate — Seed\'s DS-01 has clinical research backing; AM-specific timing optimization is newer territory',
    safetyProfile: 'Generally Safe — well-tolerated probiotic supplement; mild initial GI adaptation common',
    bestFor: 'Anyone prioritizing gut health, using probiotics as part of a comprehensive wellness stack, or seeking microbiome support with meals',
    facts: [
      'Contains 24 clinically-researched probiotic strains across Lactobacillus, Bifidobacterium, and Streptococcus genera',
      'Uses a nested capsule (ViaCap® technology) to protect strains from stomach acid and ensure delivery to the colon',
      'The gut microbiome has circadian rhythms — different bacterial populations peak at different times of day, supporting time-specific seeding',
      'Morning probiotics align with peak small intestinal motility and bile acid signaling — potentially improving strain viability',
      'DS-01 is one of few consumer probiotic products with published clinical data; most probiotics on Amazon have no human RCTs',
    ],
    sources: [
      'Seed Health. "DS-01 Clinical Research." https://seed.com/science/ds-01',
      'Thaiss CA, et al. "Transkingdom control of microbiota diurnal oscillations." Cell. 2014. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4257162/',
      'Sanders ME, et al. "Probiotics and prebiotics in intestinal health and disease." Nature Reviews Gastroenterology & Hepatology. 2019. https://pubmed.ncbi.nlm.nih.gov/31296969/',
    ],
    whereToBuy: [
      '**Seed DS-01 Daily Synbiotic** — AM + PM system, subscription-based — https://seed.com/ds-01',
      '**Ritual Synbiotic+** — Alternative 3-in-1 synbiotic (pre + pro + postbiotics) — https://ritual.com/products/synbiotic',
    ],
  },
  'two-minute-rule-habits': {
    whatItIs: 'A habit formation technique from James Clear\'s Atomic Habits: scale any new habit down to under 2 minutes to eliminate the activation energy barrier and build consistency',
    primaryUse: 'Overcoming procrastination and inconsistency in new habit formation by starting smaller than you think necessary',
    evidenceLevel: 'Strong — grounded in behavioral psychology (implementation intentions, habit stacking, and activation energy research)',
    safetyProfile: 'Very Safe — purely a behavioral technique',
    bestFor: 'Anyone who struggles to start new habits consistently, feels overwhelmed by ambitious routines, or wants to understand the psychology of momentum',
    facts: [
      'The hardest part of any habit is starting — the 2-minute rule eliminates friction by making the habit "too easy to say no to"',
      'Atomic Habits framework: "Read before bed each night" becomes "Read one page"; "Do yoga" becomes "Get out the yoga mat"',
      'Behavioral science concept: activation energy — the effort required to initiate a behavior — is the primary driver of habit dropout',
      'The goal is to establish the identity and neural groove first; intensity and duration can be scaled after consistency is locked in',
      'Works by making the cue-routine-reward loop run on the smallest possible dose, then naturally expanding via positive reinforcement',
    ],
    sources: [
      'Clear J. "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones." Penguin Random House. 2018. https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
      'Gollwitzer PM. "Implementation intentions." American Psychologist. 1999. https://pubmed.ncbi.nlm.nih.gov/10670605/',
      'Fogg BJ. "Tiny Habits: The Small Changes That Change Everything." Houghton Mifflin. 2019. https://www.amazon.com/Tiny-Habits-Changes-Everything/dp/0358003326',
    ],
    whereToBuy: [
      '**Atomic Habits — James Clear** — The source of the 2-minute rule — https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
      '**Tiny Habits — BJ Fogg** — Stanford researcher\'s complementary framework for micro-habits — https://www.amazon.com/Tiny-Habits-Changes-Everything/dp/0358003326',
      '**HabitForge App** — Coming soon: forge habits with the DNA framework — https://habitforgeai.com/#waitlist',
    ],
  },
  'ten-minute-stretch-routine': {
    whatItIs: 'A structured 10-minute daily stretching protocol targeting major muscle groups to improve flexibility, reduce injury risk, and support recovery',
    primaryUse: 'Improving range of motion, reducing muscle tension, supporting athletic recovery, and counteracting sedentary lifestyle effects',
    evidenceLevel: 'Strong — flexibility training benefits are well-documented in sports science and physical therapy literature',
    safetyProfile: 'Very Safe — appropriate for most adults; modify for acute injuries or severe mobility limitations',
    bestFor: 'Office workers with postural issues, athletes needing recovery support, or anyone with tight hips/hamstrings/shoulders from sitting',
    facts: [
      'Static stretching held 30-60 seconds produces acute flexibility gains; consistent daily practice creates lasting structural changes over weeks',
      'Hip flexors are the most overlooked muscle group for sedentary adults — tight hip flexors cause anterior pelvic tilt and low back pain',
      'Stretching before bed may improve sleep quality by activating the parasympathetic nervous system and reducing physical tension',
      'Proprioceptive Neuromuscular Facilitation (PNF) stretching — contract then relax — is more effective than static stretching alone for range of motion gains',
      '10 minutes of daily stretching is more effective than 70 minutes of weekly stretching — consistency beats intensity in flexibility training',
    ],
    sources: [
      'Behm DG, Chaouachi A. "A review of the acute effects of static and dynamic stretching on performance." European Journal of Applied Physiology. 2011. https://pubmed.ncbi.nlm.nih.gov/21373870/',
      'Kay AD, Blazevich AJ. "Effect of acute static stretch on maximal muscle performance." Medicine & Science in Sports & Exercise. 2012. https://pubmed.ncbi.nlm.nih.gov/21659901/',
      'American College of Sports Medicine. "Flexibility Exercise (Stretching)." ACSM. https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines',
    ],
    whereToBuy: [
      '**TriggerPoint Grid Foam Roller** — Myofascial release tool to enhance stretching effectiveness — https://www.amazon.com/TriggerPoint-GRID-Foam-Roller-Original/dp/B0040EGNIU',
      '**Manduka PROlite Yoga Mat** — Premium non-slip mat for floor stretches — https://www.amazon.com/Manduka-PRO-Yoga-Mat-Lifetime/dp/B003JQVDJI',
      '**Stretch Out Strap** — Physical therapy-grade stretching tool with loops — https://www.amazon.com/OPTP-Original-Stretch-Out-Strap/dp/B00M68P8UG',
    ],
  },
  'sleep-optimization-complete-guide': {
    whatItIs: 'A comprehensive guide to improving sleep quality through sleep architecture understanding, evidence-based protocols, and targeted interventions',
    primaryUse: 'Optimizing sleep quality, duration, and consistency for physical recovery, cognitive performance, and long-term health',
    evidenceLevel: 'Strong — sleep science is among the most rapidly advancing fields in medicine; protocols are evidence-based',
    safetyProfile: 'Very Safe — behavioral and environmental interventions; supplement protocols should be used conservatively',
    bestFor: 'Anyone experiencing poor sleep quality, difficulty falling or staying asleep, or seeking to maximize recovery and cognitive performance',
    facts: [
      'Sleep occurs in 90-minute cycles; deep slow-wave sleep (SWS) dominates early cycles while REM dominates later ones — both are essential',
      'Temperature regulation is critical: core body temperature must drop 1-3°F to initiate sleep; cooler rooms (65-68°F) accelerate this',
      'Blue light (450-480 nm) suppresses melatonin by up to 85% — blocking it 1-2 hours before bed significantly improves sleep onset',
      'Chronotype is largely genetic — "night owls" have a delayed circadian phase; forcing early wake times can chronically impair health',
      'Matthew Walker\'s research shows that sleeping less than 6 hours per night for 10 days impairs performance as much as 24 hours of total sleep deprivation',
    ],
    sources: [
      'Walker MP. "Why We Sleep: Unlocking the Power of Sleep and Dreams." Scribner. 2017. https://www.amazon.com/Why-We-Sleep-Unlocking-Dreams/dp/1501144324',
      'Chang AM, et al. "Evening use of light-emitting eReaders negatively affects sleep." PNAS. 2015. https://www.pnas.org/doi/10.1073/pnas.1418490112',
      'Hirshkowitz M, et al. "National Sleep Foundation\'s sleep time duration recommendations." Sleep Health. 2015. https://pubmed.ncbi.nlm.nih.gov/29073398/',
    ],
    whereToBuy: [
      '**Eight Sleep Pod 4** — Temperature-regulating mattress cover; the highest-ROI sleep investment — https://www.eightsleep.com/pod-cover/',
      '**Bon Charge Blue Light Glasses** — Evidence-based amber lenses for evening use — https://www.amazon.com/BLUE-LIGHT-BLOCKING-GLASSES-Sleep/dp/B07XBQ66FB',
      '**Oura Ring Gen 3** — Best sleep tracking ring with HRV, deep sleep, and REM measurement — https://ouraring.com',
    ],
  },
  'book-cant-hurt-me-goggins': {
    whatItIs: 'David Goggins\' autobiographical account of overcoming severe childhood trauma, obesity, and mental weakness to become a Navy SEAL, ultramarathon runner, and world record holder',
    primaryUse: 'Developing mental toughness, confronting self-imposed limits, and building resilience through radical self-accountability',
    evidenceLevel: 'Strong — psychological frameworks for mental fortitude are backed by research; narrative is first-person experiential',
    safetyProfile: 'Very Safe — motivational/self-development book',
    bestFor: 'Anyone feeling mentally soft, avoiding discomfort, playing below their potential, or needing a hard confrontation with their excuses',
    facts: [
      'Goggins went from 297 lbs and working as a pest exterminator to completing Navy SEAL training three times, Army Ranger training, and Air Force TACP qualification',
      'The "40% Rule": Goggins argues the mind quits when you\'re only 40% spent — there is always more in reserve than you believe',
      'The "Accountability Mirror" technique: daily confrontation of your failures and weaknesses by writing them on sticky notes around your mirror',
      'Goggins set the world record for most pull-ups in 24 hours (4,030) — filmed the failed first attempt and used it as fuel for the successful attempt',
      'The book sold over 3 million copies and spent over 100 weeks on the New York Times bestseller list',
    ],
    sources: [
      'Goggins D. "Can\'t Hurt Me: Master Your Mind and Defy the Odds." Lioncrest Publishing. 2018. https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512279',
      'Baumeister RF, Tierney J. "Willpower: Rediscovering the Greatest Human Strength." Penguin. 2011. https://www.amazon.com/Willpower-Rediscovering-Greatest-Human-Strength/dp/0143122231',
    ],
    whereToBuy: [
      '**Can\'t Hurt Me — David Goggins** (Hardcover) — https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512279',
      '**Never Finished — David Goggins** (Sequel, 2022) — https://www.amazon.com/Never-Finished-Unshackle-Your-Mind/dp/1544534078',
      '**Can\'t Hurt Me Audiobook** — Includes extended podcast-style conversations with Goggins — https://www.amazon.com/Cant-Hurt-Me/dp/B07KKP62FT',
    ],
  },
  'vo2-max-training-guide': {
    whatItIs: 'A training guide for improving VO2 max — the maximum rate of oxygen consumption during exercise — the single strongest predictor of long-term health and longevity',
    primaryUse: 'Increasing aerobic capacity, improving cardiovascular health, and extending healthspan through targeted VO2 max training',
    evidenceLevel: 'Strong — VO2 max is the most validated biomarker of cardiovascular fitness and longevity in exercise science',
    safetyProfile: 'Generally Safe — high-intensity intervals require proper progression; consult a physician if over 40 or sedentary',
    bestFor: 'Anyone serious about longevity, athletes wanting to improve performance, or those with low cardiorespiratory fitness seeking the highest-impact exercise investment',
    facts: [
      'VO2 max is the single strongest predictor of all-cause mortality — those in the top 25% live dramatically longer than those in the bottom 25%',
      'Low VO2 max is a stronger mortality predictor than smoking, diabetes, or high blood pressure per multiple large epidemiological studies',
      'VO2 max declines ~10% per decade after 30 without training — but can be meaningfully improved at any age with the right protocol',
      '4×4 Norwegian intervals (4 min at 90-95% max HR, 4 min active recovery, repeated 4 times) is the most evidence-backed protocol for VO2 max improvement',
      'Targeting 45+ mL/kg/min in middle age (top 25% for your age) is associated with dramatically reduced mortality risk per Peter Attia\'s analysis',
    ],
    sources: [
      'Nes BM, et al. "Association of cardiorespiratory fitness with long-term mortality." Mayo Clinic Proceedings. 2013. https://pubmed.ncbi.nlm.nih.gov/23473283/',
      'Rognmo Ø, et al. "High Intensity Aerobic Interval Exercise Is Superior to Moderate Intensity Exercise for Increasing Aerobic Capacity in CABG Patients." European Journal of Cardiovascular Prevention & Rehabilitation. 2004. https://pubmed.ncbi.nlm.nih.gov/15187813/',
      'Attia P. "VO2 Max and Longevity." Peter Attia MD. https://peterattiamd.com/vo2max/',
    ],
    whereToBuy: [
      '**Garmin Forerunner 955 Solar** — Best GPS running watch with VO2 max estimation and training load — https://www.amazon.com/Garmin-Forerunner-Solar-Triathlon-Smartwatch/dp/B09ZD2GJ7S',
      '**Concept2 RowErg** — Best VO2 max training machine for home — low-impact, full-body — https://www.concept2.com/rowerg',
      '**Polar H10 Heart Rate Monitor** — Essential for accurate interval training in the right zones — https://www.amazon.com/Polar-H10-Heart-Rate-Monitor/dp/B07FCQGMXN',
    ],
  },
  'tax-advantaged-accounts-hsa-fsa-529': {
    whatItIs: 'Government-sanctioned investment and savings accounts (HSA, FSA, 529) that provide significant tax advantages for healthcare costs and education expenses',
    primaryUse: 'Reducing taxable income, growing investments tax-free, and funding healthcare and education expenses with pre-tax dollars',
    evidenceLevel: 'Strong — tax code provisions are well-established; benefits are mathematically certain for eligible individuals',
    safetyProfile: 'Very Safe — government-backed accounts; risk is only in underlying investment choices within the accounts',
    bestFor: 'Anyone with a high-deductible health plan (for HSA), employer benefits (FSA), or parents saving for college (529)',
    facts: [
      'The HSA (Health Savings Account) is the only account with triple tax advantage: pre-tax contributions, tax-free growth, and tax-free withdrawals for medical expenses',
      'After age 65, HSA funds can be withdrawn for any purpose (taxed like traditional IRA) — making it a stealth retirement account',
      'FSA (Flexible Spending Account) funds are "use it or lose it" annually; HSA funds roll over indefinitely and can be invested',
      '529 college savings plans grow tax-free and withdrawals are tax-free for qualified education expenses; 35 states offer additional state tax deductions',
      'HSA 2024 contribution limits: $4,150 (individual), $8,300 (family); FSA: $3,200; 529: no annual limit but gift tax considerations apply above $18,000/year',
    ],
    sources: [
      'IRS. "Health Savings Accounts and Other Tax-Favored Health Plans." Publication 969. https://www.irs.gov/publications/p969',
      'IRS. "529 Plans: Questions and Answers." https://www.irs.gov/newsroom/529-plans-questions-and-answers',
      'Fidelity. "HSA vs. FSA: What\'s the Difference?" https://www.fidelity.com/learning-center/smart-money/hsa-vs-fsa',
    ],
    whereToBuy: [
      '**Fidelity HSA** — No fees, invest in any Fidelity fund including zero-expense-ratio index funds — https://www.fidelity.com/go/hsa/overview',
      '**Lively HSA** — No monthly fees, FDIC insured, invest through TD Ameritrade — https://livelyme.com',
      '**Vanguard 529 Plan** — Low-cost 529 with index fund options — https://investor.vanguard.com/accounts-plans/529-plans',
    ],
  },
};

let processed = 0;
let skipped = 0;
let failed = 0;

for (const [slug, data] of Object.entries(DATA)) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${slug}.md`);
    skipped++;
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('## The Basics')) {
    console.log(`SKIP (already done): ${slug}.md`);
    skipped++;
    continue;
  }
  
  // Find end of frontmatter
  const fmEnd = content.indexOf('\n---', 3) + 4; // skip past closing ---
  const frontmatter = content.slice(0, fmEnd);
  const body = content.slice(fmEnd).trimStart();
  
  const basics = `## The Basics

| | |
|---|---|
| **What it is** | ${data.whatItIs} |
| **Primary use** | ${data.primaryUse} |
| **Evidence level** | ${data.evidenceLevel} |
| **Safety profile** | ${data.safetyProfile} |
| **Best for** | ${data.bestFor} |

### Key Facts at a Glance
${data.facts.map(f => `- ${f}`).join('\n')}

---

`;

  const sources = `

---

## Sources & Further Reading

${data.sources.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Where to Buy / Find This

${data.whereToBuy.map(w => `- ${w}`).join('\n')}
`;

  const newContent = frontmatter + '\n' + basics + body + sources;
  
  try {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`OK: ${slug}.md`);
    processed++;
  } catch (err) {
    console.error(`FAIL: ${slug}.md — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone. Processed: ${processed} | Skipped: ${skipped} | Failed: ${failed}`);
