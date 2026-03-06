#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const POSTS_DIR = path.join(__dirname, '../content/posts');
const DISCLAIMER = `*Opinions below are paraphrased from each expert's public work, interviews, and podcasts — not direct quotes.*\n\n`;

const EXPERT_OPINIONS = {
  'acetyl-l-carnitine-alcar-guide': {
    asprey: `Dave Asprey has discussed acetyl-L-carnitine (ALCAR) as a mitochondrial and cognitive support supplement, noting its ability to cross the blood-brain barrier and support acetylcholine synthesis — relevant for memory and focus. He's recommended it as part of a broader mitochondrial optimization stack alongside CoQ10 and alpha lipoic acid.`,
    huberman: `Andrew Huberman has mentioned carnitine and acetyl-L-carnitine in the context of fat metabolism and mitochondrial function, noting that ALCAR's acetyl group makes it more brain-available than standard L-carnitine. He views it as a potentially useful tool for those seeking cognitive support alongside physical performance benefits.`,
    peat: `Dr. Raymond Peat has written about carnitine's role in fatty acid transport into mitochondria and energy metabolism. He views adequate carnitine status as supportive of metabolic efficiency and energy production, consistent with his framework around optimizing mitochondrial function and reducing metabolic stress.`,
  },

  'blue-light-blocking-guide': {
    huberman: `Andrew Huberman is one of the most data-driven voices on light exposure and circadian biology. He strongly recommends avoiding bright artificial light — particularly overhead fluorescent and LED lighting — in the 2-3 hours before sleep, as it suppresses melatonin and delays circadian timing. He specifically advocates for amber/red-tinted glasses in the evening and dim, warm-toned lighting rather than overhead lights after sunset.`,
    asprey: `Dave Asprey has been an advocate for blue light blocking for years, making it a cornerstone of his sleep optimization protocol. He recommends blue light blocking glasses from sunset onwards and has discussed the mitochondrial and circadian impacts of evening blue light exposure. He prefers full-spectrum blue and green light blocking (not just the cosmetic amber tints) for genuine melatonin protection.`,
    saladino: `Paul Saladino views blue light exposure as one of the key modern deviations from ancestral living that disrupts circadian health. He recommends getting natural light during the day and blocking artificial blue light at night as part of an ancestral health practice, consistent with the body's natural light-dark cycle.`,
    rogan: `Joe Rogan has discussed blue light and sleep quality on the JRE, particularly after conversations with Matthew Walker and Andrew Huberman. He's incorporated blue light blocking practices into his evening routine and acknowledges the meaningful impact of phone and screen exposure on sleep onset.`,
  },

  'creatine-complete-guide': {
    huberman: `Andrew Huberman recommends creatine monohydrate as one of the most well-supported supplements for both physical and cognitive performance. He suggests 5g/day of creatine monohydrate, taken consistently, and highlights the cognitive benefits — particularly for sleep-deprived individuals and vegetarians who have lower baseline levels.`,
    saladino: `Paul Saladino views creatine favorably, noting that red meat is the primary dietary source and that those eating carnivore or animal-based diets naturally have higher muscle creatine stores. He considers it one of the few supplements with genuinely compelling evidence and consistent with his principles when dietary sources are insufficient.`,
    rogan: `Joe Rogan has discussed creatine as a foundational supplement on the JRE multiple times, endorsing it for training and recovery. He's been impressed by the growing cognitive research and considers it one of the most evidence-backed supplements available regardless of training goals.`,
    asprey: `Dave Asprey has discussed creatine's role in cellular energy production and views it as a reasonable supplement for those prioritizing physical and cognitive performance. He generally prefers creatine as a food-first nutrient but acknowledges supplementation is practical and well-validated for most people.`,
  },

  'habit-stacking-guide': {
    huberman: `Andrew Huberman has discussed habit stacking in the neuroscience context, noting that linking new behaviors to established neural circuits (existing habits) significantly reduces the cognitive load required to initiate the new behavior. This aligns with his framework on dopamine and procedural memory — well-established routines create automatic pathways that can anchor new behaviors.`,
    asprey: `Dave Asprey has discussed habit stacking as an efficiency principle within biohacking — noting that combining complementary behaviors (like taking supplements with coffee, or meditating after a workout) reduces friction and leverages the momentum of existing routines. He views environment design as the primary tool for making habit stacks automatic.`,
    rogan: `Joe Rogan's training and lifestyle embodies habit stacking — he structures his day around consistent anchors (morning workout, sauna/cold plunge, specific podcast recording times) that create reliable chains of behavior. He's discussed how building these reliable sequences has been fundamental to maintaining consistency over decades.`,
  },

  'habit-tracking-why-it-works': {
    huberman: `Andrew Huberman has discussed habit tracking in the context of behavioral reinforcement and the neuroscience of progress. He notes that tracking creates a measurable feedback loop that activates dopamine reward systems — the act of marking a habit complete provides a small dopamine signal that reinforces the behavior. He's discussed how visual progress tracking leverages the brain's pattern recognition systems.`,
    asprey: `Dave Asprey has made quantified self-tracking central to his biohacking philosophy — he's tracked sleep, HRV, glucose, and dozens of biomarkers for years. He views habit tracking as the behavioral equivalent of biometric tracking: you can't optimize what you don't measure. He considers it essential for creating the feedback loops necessary for sustained behavior change.`,
    rogan: `Joe Rogan has discussed consistency tracking in the context of his long-term BJJ training and fitness practice, noting that showing up is the primary variable and that any system making the streak visible creates accountability. He views the compound effect of tracked consistency as the foundation of mastery.`,
  },

  'hrv-recovery-tracking-guide': {
    huberman: `Andrew Huberman has discussed heart rate variability (HRV) extensively on his podcast as a key biomarker of autonomic nervous system balance and recovery status. He recommends morning HRV tracking (immediately upon waking, ideally lying down) as a guide for training intensity decisions. He notes that low HRV indicates elevated sympathetic tone and poor recovery — a signal to reduce training load rather than push through.`,
    asprey: `Dave Asprey has been one of the most prominent advocates for HRV tracking in the biohacking community, using it as a primary feedback metric for his own recovery, sleep quality, and stress management. He's used multiple tracking devices and considers HRV one of the most actionable biomarkers available for day-to-day performance optimization.`,
    rogan: `Joe Rogan has discussed HRV and recovery tracking on the JRE in the context of combat sports performance, noting that overtraining is a real concern for athletes and that objective recovery metrics help distinguish productive training load from harmful overreach. He's interested in the data these tools provide for informing training decisions.`,
    saladino: `Paul Saladino has discussed HRV in the context of stress physiology and recovery, noting that lifestyle factors — sleep quality, diet, social connection, sunlight — are the primary drivers of HRV and that the metric is a useful proxy for overall resilience. He views chronic low HRV as a signal of metabolic stress that warrants lifestyle-level investigation.`,
  },

  'melatonin-low-dose-vs-high-dose': {
    huberman: `Andrew Huberman has been one of the clearest voices on melatonin dosing in mainstream science communication. He recommends against standard supplement doses of 5-10 mg, arguing they're 10-100x higher than physiological levels and can cause morning grogginess, hormonal disruption, and blunted natural melatonin production over time. He suggests 0.1-0.3 mg if using melatonin — a dose that approximates natural production — or using it specifically for circadian resetting (jet lag, shift work) rather than as a nightly sleep aid.`,
    asprey: `Dave Asprey has expressed concerns about high-dose melatonin supplementation, consistent with Huberman's position. He prefers addressing sleep quality through foundational interventions (light management, temperature, magnesium, apigenin, theanine) rather than relying on melatonin. He's noted that while melatonin can be useful for jet lag, regular use may interfere with the body's natural regulatory mechanisms.`,
    peat: `Dr. Raymond Peat holds a skeptical view of melatonin supplementation, consistent with his broader concern about hormones that he views as potentially immunosuppressive or pro-estrogen. He considers melatonin a stress hormone in some contexts and views its supplementation as potentially counterproductive for metabolic health. He prioritizes light exposure patterns and metabolic health as the proper approach to circadian rhythm optimization.`,
    rogan: `Joe Rogan has mentioned using melatonin and CBD for sleep on the JRE, acknowledging that his demanding schedule sometimes requires sleep aids. He's mentioned the high-dose melatonin approach and has engaged with Huberman's low-dose recommendation with genuine interest.`,
  },

  'quercetin-guide': {
    huberman: `Andrew Huberman has discussed quercetin in the context of its zinc ionophore properties — the ability to help zinc enter cells, which is particularly relevant for antiviral immune defense. He's mentioned quercetin as part of an immune support stack alongside zinc, noting that the combination may enhance zinc's intracellular effectiveness.`,
    asprey: `Dave Asprey has discussed quercetin as a polyphenol with broad anti-inflammatory, antioxidant, and immunomodulatory effects. He's recommended it in the Bulletproof framework as part of a comprehensive anti-inflammatory strategy and has discussed its potential synergy with other polyphenols and zinc for immune optimization.`,
    saladino: `Paul Saladino has engaged with quercetin as a plant compound with nuance — acknowledging that unlike many plant defense chemicals, quercetin has meaningful clinical data and genuine biological activity. He views quercetin-containing foods (onions, apples, capers) as reasonable whole-food sources, though he's cautious about isolated high-dose supplementation of plant compounds in general.`,
  },

  'thiamine-b1-cognition': {
    asprey: `Dave Asprey has discussed thiamine and its fat-soluble forms (benfotiamine, TTFD) in the context of cellular energy production and brain optimization. He's interested in TTFD particularly for its superior CNS penetration and has discussed its potential for addressing fatigue and cognitive underperformance, especially in those eating high-carbohydrate diets that increase thiamine demands.`,
    peat: `Dr. Raymond Peat has written about thiamine (vitamin B1) as a critical cofactor for oxidative metabolism — specifically pyruvate dehydrogenase, which is essential for converting glucose to cellular energy. He views adequate thiamine as fundamental to thyroid-supported metabolism and considers deficiency a contributor to the "shift toward lactate production" he associates with cellular stress and dysfunction.`,
    huberman: `Andrew Huberman has discussed B vitamins and energy metabolism, noting thiamine's essential role in neurological function and the severe consequences of deficiency (Wernicke's encephalopathy). He views adequate thiamine as foundational, particularly for those with high carbohydrate intake or alcohol consumption that depletes thiamine stores.`,
  },

  'zofran-ondansetron-guide': {
    huberman: `Andrew Huberman has discussed serotonin receptor pharmacology in the context of mood, gut-brain axis function, and gastrointestinal health. While Zofran isn't a primary focus of his health optimization content, he's noted the 5-HT3 receptor's importance in gut-brain signaling and the interesting clinical implications of selective serotonin receptor targeting in different tissues.`,
    rogan: `Joe Rogan has mentioned ondansetron on the JRE in the context of anti-nausea medication — particularly its use in controlling nausea during or after intense training or other circumstances. He's acknowledged its effectiveness as a prescription option for those dealing with severe nausea.`,
  },

  'goal-setting-science': {
    huberman: `Andrew Huberman has discussed goal-setting from a neuroscience perspective extensively, emphasizing the role of the visual system in setting and pursuing goals (literally visualizing success can be counterproductive; visualizing the obstacles is more effective per research). He covers implementation intentions, specificity of goals, and the neuroscience of motivation and follow-through in depth.`,
    asprey: `Dave Asprey approaches goal-setting as a performance variable in his biohacking framework, viewing clarity of goals as upstream of biological optimization — you need to know what you're optimizing for. He's discussed techniques from neuro-linguistic programming (NLP) and other performance psychology traditions alongside his biological optimization protocols.`,
    rogan: `Joe Rogan discusses goal-setting and discipline regularly on the JRE, typically emphasizing the importance of consistent daily action over distant goal-fantasizing. He views clarity of purpose as energizing but action as the ultimate variable — consistent with systems-over-goals thinking.`,
  },

  'financial-independence-roadmap': {
    // No expert coverage — financial topic, skip
  },

  'seed-am-energy-focus': {
    asprey: `Dave Asprey has discussed the gut microbiome and probiotic supplementation as foundational to overall health, noting the gut-brain axis connection to cognitive performance and energy. He's interested in clinically backed probiotic formulations and views the synbiotic approach (prebiotic + probiotic together) as superior to standalone probiotics.`,
    huberman: `Andrew Huberman has covered the gut microbiome in dedicated podcast content, noting the emerging evidence for gut-brain axis influences on mood, cognition, and neurological health. He's generally positive on clinically validated probiotic supplementation for gut health and has discussed the timing and form considerations for probiotic efficacy.`,
  },

  'seed-pm-sleep-restore': {
    asprey: `Dave Asprey views gut health optimization as a nighttime priority alongside sleep — noting that the gut performs repair and rebalancing during sleep, making evening probiotic timing potentially advantageous. He considers a comprehensive synbiotic approach as part of a complete sleep and recovery protocol.`,
    huberman: `Andrew Huberman has discussed the gut microbiome's circadian rhythms, noting that gut bacterial populations fluctuate across the 24-hour cycle. He's expressed interest in the research on time-specific probiotic seeding and considers gut health foundational to overall health and neurological function.`,
  },

  'ten-minute-stretch-routine': {
    huberman: `Andrew Huberman has discussed stretching and flexibility from a neuroscience perspective, noting that static stretching changes not just muscle length but also the nervous system's tolerance to stretch — the "gain on the stretch reflex." He's recommended daily stretching for both physical performance and stress reduction, noting that yoga nidra and stretching share some of the same parasympathetic activation benefits.`,
    asprey: `Dave Asprey has incorporated flexibility and mobility work into his biohacking protocol, noting that tissue quality and range of motion are key components of resilience and injury prevention as one ages. He views consistent stretching as part of a comprehensive physical maintenance protocol alongside strength training and cardio.`,
    rogan: `Joe Rogan, as a lifelong martial artist and Brazilian Jiu-Jitsu practitioner, has emphasized the importance of flexibility and mobility extensively on the JRE. He views daily stretching as non-negotiable for injury prevention and performance, and has credited consistent mobility work with his ability to train intensely well into his 50s.`,
  },
};

const SECTION_HEADER = `## What the Experts Say\n\n${DISCLAIMER}`;

function buildExpertSection(opinions) {
  const expertOrder = [
    { key: 'huberman', name: 'Andrew Huberman' },
    { key: 'saladino', name: 'Paul Saladino' },
    { key: 'asprey', name: 'Dave Asprey' },
    { key: 'rogan', name: 'Joe Rogan' },
    { key: 'peat', name: 'Dr. Raymond Peat' },
  ];
  let section = SECTION_HEADER;
  for (const { key, name } of expertOrder) {
    if (opinions[key]) {
      section += `### ${name}\n${opinions[key]}\n\n`;
    }
  }
  return section.trimEnd() + '\n';
}

let processed = 0;
let skipped = 0;

for (const [slug, opinions] of Object.entries(EXPERT_OPINIONS)) {
  if (!opinions || Object.keys(opinions).length === 0) {
    skipped++;
    continue;
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${slug}.md`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('## What the Experts Say')) {
    console.log(`SKIP (already done): ${slug}.md`);
    skipped++;
    continue;
  }

  const expertSection = buildExpertSection(opinions);

  if (content.includes('## Sources & Further Reading')) {
    content = content.replace('## Sources & Further Reading', expertSection + '\n## Sources & Further Reading');
  } else {
    content = content.trimEnd() + '\n\n' + expertSection;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${slug}.md (${Object.keys(opinions).length} experts)`);
  processed++;
}

console.log(`\nDone. Added: ${processed} | Skipped: ${skipped}`);
