#!/usr/bin/env node
/**
 * Adds "What the Experts Say" sections to HabitForge blog posts.
 * Expert positions are based on their publicly available work, podcasts, and writing.
 * These are paraphrased summaries — not direct quotes.
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');

const DISCLAIMER = `*Opinions below are paraphrased from each expert's public work, interviews, and podcasts — not direct quotes.*\n\n`;

// Expert opinions per post slug
// Only include experts who have actually and specifically discussed that topic
const EXPERT_OPINIONS = {

  'creatine-guide': {
    huberman: `Andrew Huberman has consistently recommended creatine monohydrate on the Huberman Lab podcast, citing its benefits for both physical performance and cognitive function. He typically suggests 5g/day and emphasizes that the cognitive benefits — particularly for sleep-deprived individuals and vegetarians — are underappreciated. He recommends taking it with water at any time of day and notes it's one of the most well-supported supplements for brain health.`,
    saladino: `Paul Saladino supports creatine, noting that red meat is the primary dietary source and that those eating animal-based diets may already have higher baseline levels than vegetarians. He views creatine as one of the few supplements that's genuinely well-validated and considers it a reasonable addition even within an animal-based framework.`,
    rogan: `Joe Rogan has discussed creatine on the JRE multiple times, generally endorsing it as a foundational supplement for anyone training seriously. He's mentioned taking it himself and has had guests like Dr. Rhonda Patrick explain the cognitive benefits beyond muscle — a point that surprised him given its reputation as a "gym supplement."`,
    asprey: `Dave Asprey has discussed creatine positively, though he's typically more focused on brain optimization than muscle. He's noted creatine's role in cellular energy production and ATP recycling and considers it a reasonable addition to a performance stack, particularly for cognitive athletes or those under heavy cognitive load.`,
  },

  'lions-mane-brain-optimization': {
    huberman: `Andrew Huberman has discussed lion's mane on the Huberman Lab podcast in the context of neuroplasticity and nerve growth factor (NGF). He considers the evidence promising — particularly the role of hericenones and erinacines in NGF stimulation — but emphasizes that most robust human data is still limited. He's mentioned it as a compound he's tried personally while noting that more clinical trials are needed.`,
    asprey: `Dave Asprey has been a long-time advocate of lion's mane, featuring it prominently in the Bulletproof ecosystem. He views it as one of the most compelling nootropic mushrooms due to its NGF-stimulating properties and has recommended it for cognitive performance and as part of a broader "upgrade your brain" protocol. He generally prefers dual-extract forms.`,
    rogan: `Joe Rogan has mentioned lion's mane on the JRE, often in conversations about nootropics and cognitive enhancement. He's discussed it alongside other mushroom-based supplements and has expressed genuine curiosity about its brain-health mechanisms, particularly after conversations with guests exploring functional fungi.`,
  },

  'ashwagandha-ksm-66-guide': {
    huberman: `Andrew Huberman has recommended ashwagandha on multiple Huberman Lab episodes, citing clinical data showing it reduces cortisol, supports testosterone levels, and improves stress resilience. He typically suggests KSM-66 or Sensoril extract at 300-600mg and notably recommends cycling off it after 2-3 months — citing concern that chronic use may reduce thyroid hormone output and dampen certain stress responses the body needs.`,
    saladino: `Paul Saladino has expressed skepticism about ashwagandha, consistent with his broader wariness of plant compounds. He's noted that plants produce these compounds as defense mechanisms and questions whether chronically supplementing with adaptogens that modulate cortisol is optimal — preferring lifestyle interventions like diet, sleep, and sunlight for stress management.`,
    asprey: `Dave Asprey has discussed ashwagandha positively as a cortisol-modulating adaptogen within the Bulletproof framework. He recommends it as part of a stress-mitigation stack and has written about its benefits for sleep quality and cortisol rhythm. Like Huberman, he often suggests cycling rather than daily year-round use.`,
  },

  'magnesium-forms-complete-guide': {
    huberman: `Andrew Huberman has one of the most specific and well-known magnesium protocols in the public space. He takes magnesium threonate (for cognitive and sleep benefits), magnesium glycinate (for relaxation and absorption), and sometimes malate — all at night, roughly 30-60 minutes before sleep. He views magnesium as a genuinely important supplement for most people given widespread dietary insufficiency, and cites the sleep and cognitive data extensively.`,
    asprey: `Dave Asprey has discussed magnesium extensively in the Bulletproof framework, recommending it as one of the most commonly deficient minerals in modern diets. He favors magnesium malate for energy and magnesium glycinate for sleep, and has tested his own levels repeatedly. He considers transdermal magnesium (magnesium oil) a useful adjunct for those with GI sensitivity to oral forms.`,
    peat: `Dr. Raymond Peat has written about magnesium's role in energy metabolism, noting its importance as a cofactor in hundreds of enzymatic reactions. He's emphasized that magnesium deficiency correlates with elevated stress hormones and poor thyroid function — consistent with his broader framework around suppressing the stress response and supporting metabolic efficiency.`,
  },

  'omega-3-fish-oil-deep-dive': {
    huberman: `Andrew Huberman is one of the most vocal proponents of omega-3 supplementation. He recommends 2-3 grams of EPA per day — a dose higher than most standard recommendations — citing its effects on mood, neuroinflammation, cardiovascular health, and cognitive function. He's had Rhonda Patrick on his podcast specifically to discuss omega-3 and brain health, and considers it one of the highest-priority foundational supplements.`,
    saladino: `Paul Saladino has a nuanced stance: he believes omega-3s from whole animal sources (fatty fish, grass-fed beef) are superior to fish oil supplements, noting that oxidation of the delicate EPA and DHA during processing is a real concern. He views the ideal approach as eating sardines, salmon, and grass-fed meat rather than supplementing with capsules — though he's acknowledged that fish oil is better than nothing for those who won't eat fatty fish.`,
    asprey: `Dave Asprey has recommended omega-3 supplementation for decades and places heavy emphasis on sourcing — preferring krill oil or very fresh, independently tested fish oil with low oxidation markers (TOTOX score). He views omega-3 as essential for brain function, cellular membrane health, and inflammation control, and has discussed the importance of balancing omega-3 to omega-6 ratio.`,
    peat: `Dr. Raymond Peat holds a controversial position on omega-3: he classifies EPA and DHA as polyunsaturated fats (PUFAs) and is broadly skeptical of all PUFAs, arguing they are highly susceptible to peroxidation and can interfere with thyroid and mitochondrial function. He recommends avoiding fish oil entirely and instead getting fat from saturated sources — a position that sharply contradicts mainstream nutritional science.`,
    rogan: `Joe Rogan has mentioned taking fish oil regularly on the JRE, generally treating it as a baseline health supplement. He's discussed the anti-inflammatory benefits in the context of combat sports recovery and has had guests like Dr. Rhonda Patrick detail the neurological and cardiovascular research.`,
  },

  'vitamin-d3-k2-complete-guide': {
    huberman: `Andrew Huberman has discussed vitamin D extensively, emphasizing that optimal levels (40-60 ng/mL) are associated with better mood, immune function, testosterone, and overall health. He recommends testing first and supplementing based on results, typically suggesting D3 paired with K2 to direct calcium appropriately. He considers sun exposure the preferred method but acknowledges most people need to supplement given modern indoor lifestyles.`,
    asprey: `Dave Asprey has been a strong advocate of vitamin D3 + K2 for decades, viewing the combination as essential for anyone in northern latitudes or with limited sun exposure. He's tested his own levels obsessively and written about the interplay between D3, K2-MK7, and calcium metabolism. He considers the D3/K2 stack one of the most impactful foundational interventions available.`,
    peat: `Dr. Raymond Peat has written favorably about vitamin D in the context of thyroid function and inflammation regulation. He views adequate vitamin D as supportive of overall metabolic health and consistent with his framework of reducing the stress response. He generally prefers sunlight as the source but has acknowledged supplementation for those unable to get adequate sun exposure.`,
    rogan: `Joe Rogan has mentioned vitamin D supplementation on the JRE in the context of immune health — particularly during cold and flu season. He's noted taking it himself and has discussed higher-dose supplementation with various guests, treating it as a common-sense baseline supplement.`,
    saladino: `Paul Saladino generally prefers obtaining vitamin D through sun exposure and animal foods (egg yolks, fatty fish, liver) rather than supplementation. He has questioned whether isolated D3 supplements fully replicate the effects of sun-derived vitamin D and advocates spending significant time outdoors as the primary strategy.`,
  },

  'bpc-157-guide': {
    huberman: `Andrew Huberman has discussed BPC-157 on the Huberman Lab podcast, describing it as one of the more interesting peptides in the healing and recovery space. He's noted the animal data is compelling — particularly for tendon and gut healing — but has been cautious about recommending it given the lack of human clinical trials. He considers it something people explore at their own risk with appropriate medical oversight.`,
    asprey: `Dave Asprey has discussed BPC-157 enthusiastically as part of his performance and longevity stack, citing its gut-healing and tissue-repair properties. He's mentioned using it personally and views it as an example of the frontier compounds that biohackers are validating ahead of formal clinical research. He considers the animal safety data reassuring and the anecdotal human data promising.`,
    rogan: `Joe Rogan has mentioned BPC-157 on the JRE in the context of injury recovery and healing. He's discussed the peptide with guests who use it for sports injuries and has expressed interest in its reported healing effects on tendons and ligaments — areas of frequent concern in combat sports and intense training.`,
  },

  'tb-500-thymosin-beta-4-guide': {
    huberman: `Andrew Huberman has briefly discussed TB-500 in the context of peptide research and tissue repair, acknowledging it as part of the same frontier as BPC-157. He emphasizes the importance of medical supervision and notes the research is still primarily animal-based, but recognizes it's widely used in performance and recovery contexts.`,
    asprey: `Dave Asprey has discussed TB-500 as a regenerative peptide in the biohacking space and views the thymosin beta-4 mechanism — promoting actin polymerization and cellular migration — as genuinely novel. He's interested in its potential for systemic healing beyond just local injury sites and views it as a more advanced addition to a recovery peptide protocol alongside BPC-157.`,
    rogan: `Joe Rogan has mentioned peptides including TB-500 in the context of injury healing and recovery, particularly given the physical demands of martial arts training. He's discussed the underground use of healing peptides among fighters and athletes and has expressed genuine curiosity about the mechanisms.`,
  },

  'ipamorelin-guide': {
    asprey: `Dave Asprey has discussed ipamorelin in the context of anti-aging and growth hormone optimization, considering it one of the cleaner GH secretagogues due to its selectivity and lack of cortisol/prolactin elevation. He's recommended it as part of a longevity protocol and has discussed its use for body composition and sleep quality.`,
    rogan: `Joe Rogan has touched on GH secretagogues and peptides like ipamorelin in conversations about anti-aging and performance optimization. He's discussed GH optimization broadly in the context of muscle preservation and recovery as one ages, particularly in conversations with guests like Mark Bell.`,
    huberman: `Andrew Huberman has discussed growth hormone optimization and peptides in general terms, noting that deep sleep is the primary driver of GH release and that most peptide approaches are attempting to replicate what quality sleep achieves naturally. He's acknowledged ipamorelin in the context of peptide research but emphasizes sleep quality as the foundational intervention.`,
  },

  'tesamorelin-guide': {
    asprey: `Dave Asprey has discussed tesamorelin as one of the more clinically validated peptides, noting its FDA-approved status lends credibility to its effects on visceral fat reduction. He considers it a more advanced biohacking tool appropriate for those with specific metabolic goals and views the GH-releasing mechanism as preferable to direct GH administration.`,
    huberman: `Andrew Huberman has discussed tesamorelin in conversations about metabolic health and body composition, noting its clinical backing is stronger than most peptides given the FDA approval for lipodystrophy. He considers it worth understanding for those interested in GH optimization but emphasizes that lifestyle foundations — sleep, training, nutrition — should be in place first.`,
  },

  'selegiline-guide': {
    huberman: `Andrew Huberman has discussed MAO inhibitors and dopamine system modulation in depth on his podcast. He's mentioned selegiline in the context of dopamine optimization and neuroprotection, noting its historical use in Parkinson's and the research suggesting it may slow dopamine neuron degeneration. He approaches it cautiously given the interaction profile and prescription status.`,
    asprey: `Dave Asprey has discussed selegiline (deprenyl) in the biohacking context, referencing its longevity research and dopaminergic neuroprotection effects. He considers it one of the more interesting compounds for brain aging and has noted the rat lifespan extension data, though he acknowledges the human evidence is much less definitive.`,
    rogan: `Joe Rogan has discussed selegiline and deprenyl in conversations about cognitive enhancement and anti-aging on the JRE, particularly in discussions about dopamine optimization. He's expressed curiosity about its neuroprotective effects and the connection between dopamine system health and longevity.`,
  },

  'nad-nmn-longevity-guide': {
    huberman: `Andrew Huberman has covered NAD+ and its precursors extensively on the Huberman Lab podcast, including a dedicated episode on longevity with David Sinclair. He explains the mechanistic rationale — NAD+ decline with age, sirtuins requiring NAD+ to function — and notes he takes NMN himself. He's careful to distinguish that the human clinical evidence on lifespan extension is still preliminary even if the mechanisms are compelling.`,
    asprey: `Dave Asprey has been an early and vocal advocate of NAD+ optimization, treating it as a core pillar of his longevity protocol. He's discussed IV NAD+ infusions (for faster repletion), NMN supplementation, and the synergy with resveratrol for sirtuin activation. He considers NAD+ one of the most important targets for biological age reversal.`,
    rogan: `Joe Rogan has discussed NAD+ and NMN on the JRE with guests including David Sinclair, who popularized these compounds in mainstream culture. Rogan has expressed genuine enthusiasm for the longevity science and has mentioned supplementing with NMN himself as part of his anti-aging approach.`,
    saladino: `Paul Saladino has engaged with the NAD+ longevity debate, generally noting that dietary animal foods contain NAD+ precursors (particularly NR from milk) and that lifestyle factors like fasting and exercise are the most powerful activators of sirtuins. He's skeptical of the need for high-dose NMN supplementation when foundational diet and lifestyle are optimized.`,
  },

  'resveratrol-pterostilbene-guide': {
    huberman: `Andrew Huberman has discussed resveratrol and pterostilbene in the context of SIRT1 activation and longevity, particularly in his episode with David Sinclair. He's explained the mechanistic rationale and noted Sinclair's own practice of taking 1g resveratrol daily with yogurt, while acknowledging the human clinical evidence remains limited. He's interested in pterostilbene as a more bioavailable alternative.`,
    asprey: `Dave Asprey has covered resveratrol extensively as a polyphenol with sirtuin-activating properties. He recommends it as part of a longevity stack and has written about taking it with fat for improved absorption. He's noted pterostilbene's superior bioavailability and considers both compounds worth including in a comprehensive anti-aging protocol.`,
    rogan: `Joe Rogan has discussed resveratrol and NMN in conversations with David Sinclair on the JRE — one of the most-listened-to longevity episodes. He was genuinely interested in Sinclair's personal protocol and the idea that molecules in red wine could activate longevity pathways, though he noted the practical dosing issue (you can't drink enough red wine to get therapeutic doses).`,
  },

  'modafinil-guide': {
    huberman: `Andrew Huberman has discussed modafinil carefully on the Huberman Lab podcast, noting it's a wakefulness-promoting agent with a different mechanism than caffeine (operating via orexin/hypocretin rather than adenosine). He's acknowledged it's used by a significant portion of the military and shift workers and discusses its cognitive enhancement potential, but emphasizes he doesn't personally recommend it as a lifestyle drug given the limited long-term safety data in healthy individuals.`,
    asprey: `Dave Asprey has written and spoken extensively about modafinil — it was a central part of the early Bulletproof brand and he credits it with significant cognitive performance improvements in his own life. He considers it the gold standard cognitive enhancer for output-driven work, though he views it as a tool to be used strategically rather than daily.`,
    rogan: `Joe Rogan has discussed modafinil on the JRE as a popular cognitive enhancer in certain circles, acknowledging its use among military personnel, executives, and those needing extended wakefulness. He's approached it with curiosity rather than advocacy, noting the grey area between performance enhancement and pharmaceutical dependency.`,
  },

  'psilocybin-microdosing-guide': {
    huberman: `Andrew Huberman has dedicated significant Huberman Lab content to psilocybin, including a full episode on the neuroscience of psychedelics. He covers the mechanism (5-HT2A agonism, neuroplasticity windows), the clinical research on depression and addiction treatment, and the emerging microdosing literature. He views the therapeutic potential as compelling and the regulatory landscape as rapidly evolving, while noting that full doses under clinical supervision have the most robust evidence.`,
    rogan: `Joe Rogan has been one of the most prominent mainstream advocates for psychedelics including psilocybin, discussing his personal experiences extensively on the JRE. He's interviewed leading psychedelic researchers (Michael Pollan, Paul Stamets) and has been vocal about psilocybin's potential for mental health, addiction, and expanded consciousness. He distinguishes between therapeutic use and recreational use but is enthusiastic about both.`,
    asprey: `Dave Asprey has discussed psilocybin and psychedelics in the biohacking context, approaching them as tools for neuroplasticity and pattern-interruption in the brain. He's been public about using psychedelics for therapeutic purposes and discusses microdosing as a way to access some neuroplasticity benefits without the full psychedelic experience. He views them as powerful but recommends structured protocols.`,
    saladino: `Paul Saladino has discussed psychedelics including psilocybin with genuine openness, distinguishing between plant compounds used in ceremonial or therapeutic contexts versus plant toxins consumed daily in food. He's not opposed to psychedelic use and has discussed their potential for psychological healing, separating them from his critique of dietary plant compounds.`,
  },

  'sauna-benefits-guide': {
    huberman: `Andrew Huberman has discussed sauna extensively on the Huberman Lab podcast, citing Finnish research showing associations between frequent sauna use (4-7x per week) and dramatically reduced cardiovascular disease mortality. He recommends at least 20 minutes at 80-100°C for meaningful hormetic stress, and has detailed the growth hormone release protocol (sauna → cold → sauna → cold cycles). He views deliberate heat exposure as one of the highest-ROI health interventions available.`,
    asprey: `Dave Asprey has been a sauna advocate for years, featuring infrared sauna prominently in the Bulletproof lifestyle. He slightly prefers far-infrared over traditional Finnish sauna for specific protocols, noting different tissue penetration depths, though he acknowledges both provide significant benefits. He considers sauna an essential component of a detoxification and recovery protocol.`,
    rogan: `Joe Rogan is an enthusiastic sauna user and frequently discusses it on the JRE, often in combination with cold plunge as a contrast therapy protocol. He's had Dr. Rhonda Patrick on specifically to discuss the longevity and heat shock protein research, which significantly influenced his perspective on the health benefits of deliberate heat exposure.`,
    saladino: `Paul Saladino has incorporated sauna into his wellness framework, viewing deliberate heat stress as a natural hormetic practice consistent with ancestral living. He's discussed the cardiovascular and growth hormone benefits and considers sauna a valuable tool for recovery and metabolic health, particularly when paired with adequate mineral and nutrient intake.`,
  },

  'cold-plunge-cold-exposure-guide': {
    huberman: `Andrew Huberman has covered cold exposure as thoroughly as any topic on the Huberman Lab podcast. He recommends a minimum effective dose of 11 minutes per week in uncomfortably cold water (not requiring ice) distributed across sessions — enough to trigger dopamine, norepinephrine, and mood benefits without excessive physiological stress. He specifically warns against cold exposure immediately after resistance training as it blunts hypertrophy adaptations.`,
    asprey: `Dave Asprey has discussed cold exposure extensively in the Bulletproof framework, recommending cold showers and cold plunges for mitochondrial stress adaptation and brown adipose tissue activation. He views deliberate cold as a powerful biohacking tool but notes that chronically cold environments without proper nutritional support can be problematic. He often pairs it with sauna contrast therapy.`,
    rogan: `Joe Rogan has become one of the most prominent advocates for cold plunge in popular culture, frequently documenting his cold plunge practice on social media and discussing it regularly on the JRE. He's credited it with mood improvements, recovery benefits, and mental toughness — and has helped drive mainstream interest in home cold plunge units.`,
    saladino: `Paul Saladino views cold exposure as consistent with ancestral practices of environmental exposure and hormetic stress. He's discussed the dopamine and norepinephrine benefits and considers deliberate cold a valuable practice alongside sunlight, movement, and social connection for overall wellbeing.`,
  },

  'red-light-therapy-deep-dive': {
    huberman: `Andrew Huberman has discussed red light and near-infrared (NIR) therapy on his podcast, covering its effects on mitochondrial function via cytochrome c oxidase stimulation. He's personally experimented with red light therapy and discussed both the morning light applications (for circadian benefits) and the tissue-level applications for skin, recovery, and eye health. He's cautious about overclaiming and notes the optimal protocols are still being established.`,
    asprey: `Dave Asprey is one of the most prominent advocates for red light therapy, having featured Joovv panels and similar devices prominently in his work. He views photobiomodulation as a foundational biohacking tool for mitochondrial function, inflammation reduction, skin health, and recovery. He's used full-body red light panels for years and considers the evidence compelling.`,
    rogan: `Joe Rogan has discussed red light therapy on the JRE and has used it in his own routine. He's mentioned it in the context of recovery and anti-aging, and has had guests discuss the science of photobiomodulation. His interest increased significantly after conversations with Ben Greenfield and other biohackers.`,
    saladino: `Paul Saladino has discussed light exposure as essential ancestral health — primarily morning sunlight, but also acknowledging that therapeutic red light addresses a deficit created by modern indoor living. He views red light therapy as a reasonable compensatory tool for those unable to spend adequate time outdoors in natural light.`,
    peat: `Dr. Raymond Peat has written about the beneficial effects of red and near-infrared light, viewing it as supportive of mitochondrial function and consistent with his framework around energy production and thyroid activity. He's noted that metabolic rate is influenced by light exposure and considers therapeutic red light consistent with his approach to supporting cellular energy production.`,
  },

  'intermittent-fasting-complete-guide': {
    huberman: `Andrew Huberman has covered intermittent fasting extensively, recommending a time-restricted eating (TRE) approach where the eating window aligns with the active phase of the day — not too early (before sunrise) and not too late (within 2-3 hours of sleep). He typically suggests a 6-8 hour eating window starting 1-2 hours after waking. He's discussed the metabolic, cognitive, and circadian benefits while noting that TRE's benefits are largely separate from caloric restriction.`,
    asprey: `Dave Asprey popularized a version of IF called Bulletproof Intermittent Fasting — using Bulletproof Coffee (butter + MCT oil) in the morning to maintain fat-burning while preserving cognitive function. He views fasting as a powerful tool for autophagy, mental clarity, and metabolic switching, and has written extensively about extending fasting without the cognitive impairment of total caloric restriction.`,
    rogan: `Joe Rogan has experimented with intermittent fasting and discusses it periodically on the JRE, generally in the context of mental clarity and weight management. He's noted that fasting becomes more natural when diet quality is high and hunger signals are more reliable — a point consistent with the carnivore/animal-based approach he's also explored.`,
    saladino: `Paul Saladino has been skeptical of rigid intermittent fasting protocols, particularly for those who are lean and active, arguing that forcing fasting when the body is signaling hunger is not consistent with ancestral living or optimal hormonal health. He's noted that testosterone and muscle retention may suffer with aggressive fasting in some individuals, and prefers intuitive eating within an animal-based diet framework.`,
    peat: `Dr. Raymond Peat is quite critical of fasting, viewing it as a stress response that elevates cortisol, suppresses thyroid function, and shifts metabolism toward muscle catabolism. He advocates eating frequently — particularly carbohydrates from fruit and dairy — to maintain metabolic rate and thyroid output. His position directly contradicts the popular fasting narrative and is one of his most controversial stances.`,
  },

  'sleep-optimization-complete-guide': {
    huberman: `Andrew Huberman has more publicly available content on sleep optimization than almost any other topic. His core protocol includes: morning light exposure within an hour of waking, no caffeine after noon, cool dark room (65-67°F), consistent wake time, and avoiding light (especially overhead) in the 2 hours before bed. He also recommends magnesium threonate/glycinate, theanine, and apigenin as sleep-supporting supplements. He views sleep as the single most important health behavior.`,
    asprey: `Dave Asprey approaches sleep as a performance optimization target. He's written extensively on sleep tracking (using Oura Ring and other devices), sleep environment optimization (blackout curtains, EMF reduction, temperature regulation), and supplements for sleep quality. He views poor sleep as a root cause of accelerated aging and prioritizes sleep as highly as any other biohack.`,
    rogan: `Joe Rogan has discussed sleep extensively on the JRE — particularly after his conversations with Matthew Walker (Why We Sleep author). Walker's research on the devastating effects of sleep deprivation significantly impacted Rogan's perspective, and he's become a strong advocate for prioritizing sleep. He's mentioned using melatonin and CBN for sleep support.`,
    saladino: `Paul Saladino emphasizes sleep quality through ancestral lifestyle alignment: consistent light exposure aligned with sunrise/sunset, sleeping in total darkness, avoiding blue light, and ensuring adequate mineral intake (particularly magnesium from diet). He's noted that animal-based dietary changes often improve sleep quality independently of other interventions.`,
    peat: `Dr. Raymond Peat has discussed sleep in the context of thyroid function and metabolic rate, noting that people with well-functioning thyroids tend to sleep more efficiently and wake feeling genuinely restored. He considers elevated nighttime cortisol (from stress or blood sugar dysregulation) a primary driver of poor sleep and recommends addressing metabolism and blood sugar stability as foundational to sleep quality.`,
  },

  'dopamine-detox-guide': {
    huberman: `Andrew Huberman has covered dopamine in exhaustive detail on the Huberman Lab podcast — including the concept of dopamine peaks and troughs, and why artificially inflating baseline dopamine (through constant stimulation) ultimately reduces motivation and pleasure. He's discussed the rationale for deliberate low-stimulation periods and recommends occasional dopamine fasting from specific behaviors (social media, pornography, etc.) to reset sensitivity — though he cautions against extreme multi-day total fasts as potentially counterproductive.`,
    asprey: `Dave Asprey has discussed dopamine management in the context of willpower and impulse control, noting that modern environments are deliberately engineered to hijack dopamine circuits. He advocates for controlling dopamine inputs through environment design, dietary approaches, and strategic use of supplements that support healthy dopamine metabolism (like tyrosine, mucuna pruriens).`,
    rogan: `Joe Rogan has discussed the addictive nature of social media, phones, and constant stimulation extensively on the JRE — themes closely tied to dopamine dysregulation. He's noted the difficulty of resisting these inputs and has discussed the mental clarity that comes from periods of deliberate disconnection from constant dopamine hits.`,
  },

  'sunlight-benefits-morning-light': {
    huberman: `Andrew Huberman has made morning sunlight one of the most prominent elements of his public health protocol. He recommends getting outdoor light — without sunglasses — within 30-60 minutes of waking for 5-10 minutes on clear days and up to 20-30 minutes on cloudy days. He explains that the low solar angle of morning light drives the critical melanopsin activation in the retinal ganglion cells that set the circadian clock, and that this simple practice may be the single highest-impact free health intervention available.`,
    asprey: `Dave Asprey views morning sunlight as a critical circadian anchor and has incorporated it into his biohacking protocols. He combines morning light with light therapy panels for indoor optimization and views consistent light-dark cycling as foundational to mitochondrial function, hormonal balance, and sleep quality.`,
    saladino: `Paul Saladino considers morning sunlight non-negotiable in his animal-based lifestyle framework. He views regular outdoor light exposure — along with grounding (earthing), movement, and social connection — as ancestral practices that modern humans are deficient in. He emphasizes that no supplement can replicate the full-spectrum biological effects of natural sunlight.`,
    peat: `Dr. Raymond Peat has written about the importance of light for metabolic function, consistent with his framework around thyroid activity and energy production. He views adequate light exposure as supportive of thyroid function and energy metabolism, and has noted that many modern diseases may be partially attributable to insufficient light exposure.`,
    rogan: `Joe Rogan has discussed the importance of morning light and circadian rhythms on the JRE, particularly after extensive conversations with Andrew Huberman and Matthew Walker. He's incorporated morning light walks into his routine and views it as a simple but powerful practice for mood and energy regulation.`,
  },

  'zone-2-cardio-longevity': {
    huberman: `Andrew Huberman recommends Zone 2 cardio as a foundational longevity practice, citing the mitochondrial biogenesis and metabolic flexibility benefits. He suggests a minimum of 150-200 minutes per week and emphasizes that this type of low-intensity sustained cardio is distinct from HIIT — it requires patient, consistent effort and is best measured by lactate levels or the "conversational pace" test. He views it as non-negotiable for long-term cardiovascular health.`,
    asprey: `Dave Asprey has an interesting relationship with Zone 2 cardio — he famously avoided "chronic cardio" for years in the Bulletproof era, arguing that excessive endurance training elevated cortisol and was counterproductive. He's evolved his position significantly, now acknowledging Zone 2's unique mitochondrial benefits while maintaining that it's distinct from high-volume traditional endurance training.`,
    rogan: `Joe Rogan incorporates steady-state cardio alongside his combat sports training and has discussed Zone 2 training on the JRE in the context of longevity and cardiovascular base-building. He's had guests like Peter Attia explain why Zone 2 is foundational to metabolic health, which influenced his training philosophy.`,
    saladino: `Paul Saladino views low-intensity movement like walking as ancestrally aligned and genuinely important for metabolic health. He's supportive of Zone 2 exercise as part of an active lifestyle, though he'd frame it more as "moving like your ancestors did" — sustained, low-intensity activity — rather than a structured training protocol.`,
  },

  'vo2-max-training-guide': {
    huberman: `Andrew Huberman has discussed VO2 max on the Huberman Lab podcast in the context of longevity, citing the research showing it's the single strongest predictor of all-cause mortality. He recommends combining Zone 2 cardio for base-building with periodic high-intensity intervals (Norwegian 4x4 protocol) to drive VO2 max improvements. He views VO2 max as a critical longevity biomarker that should be tracked and actively trained.`,
    asprey: `Dave Asprey has discussed VO2 max as a longevity metric, noting that it can be meaningfully improved at any age with the right training stimulus. He's interested in high-intensity protocols that improve VO2 max efficiently — fitting a performance-optimization mindset of minimizing time investment while maximizing the adaptation signal.`,
    rogan: `Joe Rogan has discussed cardiovascular fitness and VO2 max in the context of his own fitness journey and conversations with guests like Peter Attia. He's expressed particular interest in Attia's framework around VO2 max as a "life insurance" metric and has discussed the 4x4 Norwegian interval protocol.`,
  },

  'inositol-sleep-and-mood': {
    huberman: `Andrew Huberman has mentioned myo-inositol as a sleep supplement, noting that some data suggests doses around 900mg before bed may improve sleep quality — though he considers the evidence more preliminary than for magnesium or melatonin. He's included it in a broader sleep supplement discussion alongside apigenin, theanine, and magnesium.`,
    asprey: `Dave Asprey has discussed inositol in the context of mood support and cellular signaling, noting its role as a secondary messenger in various hormonal and neurotransmitter pathways. He's considered it useful for anxiety and mood regulation and has mentioned it in discussions about women's hormonal health.`,
  },

  'berberine-natures-metformin': {
    huberman: `Andrew Huberman has discussed berberine in the context of metabolic health, describing it as a natural compound with mechanisms similar to metformin — primarily AMPK activation and glucose metabolism improvement. He's noted the research showing benefits for blood sugar control, lipid profiles, and even longevity pathways, while acknowledging it has real pharmacological effects and shouldn't be taken casually without understanding its interactions.`,
    asprey: `Dave Asprey has positioned berberine as one of the most interesting metabolic supplements, comparable to metformin in mechanism but without the prescription barrier. He recommends it for blood sugar management and has discussed timing it with higher-carbohydrate meals for practical glucose control.`,
    saladino: `Paul Saladino has engaged with the berberine-as-metformin comparison cautiously, noting that AMPK activation — while promoted as beneficial — may not always be desirable, particularly for those doing high-intensity training where anabolic signaling (mTOR) is important. He generally prefers dietary approaches (animal-based, lower carbohydrate) for metabolic health over pharmaceutical or supplement-based glucose management.`,
  },

  'lion-s-mane': {
    huberman: `Andrew Huberman has discussed lion's mane in the context of nerve growth factor and neuroplasticity, expressing cautious interest in its cognitive benefits while noting most human data is limited to older adults with mild cognitive impairment. He's tried it personally but views it as a promising rather than proven compound.`,
    asprey: `Dave Asprey is one of the strongest advocates for lion's mane mushroom, featuring it prominently in the Bulletproof ecosystem. He views the NGF-stimulating properties as genuinely valuable for cognitive longevity and recommends it as a foundational nootropic mushroom supplement.`,
  },

  'coq10-ubiquinol-complete-guide': {
    asprey: `Dave Asprey has discussed CoQ10 extensively as a mitochondrial support supplement, particularly emphasizing the ubiquinol form (reduced, active form) over ubiquinone for adults over 40 when conversion becomes less efficient. He views it as essential for anyone on statins (which deplete CoQ10) and as a foundational supplement for mitochondrial health and energy production.`,
    huberman: `Andrew Huberman has discussed CoQ10 in the context of mitochondrial function and cellular energy, noting its role in the electron transport chain. He considers it particularly relevant for older individuals where natural CoQ10 synthesis declines, though he views foundational lifestyle factors (sleep, exercise, diet) as the primary drivers of mitochondrial health.`,
    peat: `Dr. Raymond Peat has written about mitochondrial function and CoQ10 in the context of cellular energy and thyroid function. He considers CoQ10 relevant to energy production but views thyroid optimization and adequate nutrition as more fundamental — CoQ10 supplementation addressing symptoms of a deeper metabolic issue rather than the root cause.`,
  },

  'rhodiola-rosea-guide': {
    huberman: `Andrew Huberman has mentioned rhodiola in the context of adaptogens and stress resistance, noting it's one of the more studied adaptogens with data suggesting it reduces perceived exertion during exercise and may improve endurance performance. He's recommended cycling it rather than daily use — similar to his ashwagandha advice — and suggests avoiding it in the evening due to its stimulating properties.`,
    asprey: `Dave Asprey has recommended rhodiola as part of an adaptogen stack for sustained energy and stress resilience without the cortisol cost of caffeine overdependence. He views it as a useful cognitive performance tool and has discussed it in the context of sustained mental output during demanding work.`,
  },

  'alpha-lipoic-acid-guide': {
    asprey: `Dave Asprey has discussed alpha lipoic acid (ALA) as a powerful antioxidant with unique properties — being both fat and water soluble, allowing it to protect both cellular membranes and cytoplasm. He's recommended it for metabolic health, heavy metal chelation support, and mitochondrial protection, though he notes dosing and form (R-ALA vs. S-ALA) matter significantly.`,
    peat: `Dr. Raymond Peat has written about antioxidants including alpha lipoic acid in the context of mitochondrial protection and energy metabolism. He considers proper cellular energy production the more fundamental approach to preventing oxidative damage, viewing ALA as a useful but not foundational intervention.`,
  },

  'collagen-peptides-guide': {
    huberman: `Andrew Huberman has discussed collagen supplementation in the context of joint and connective tissue health, noting research showing that taking collagen peptides + vitamin C around exercise (before or after) increases collagen synthesis in tendons and ligaments. He views this as one of the more practical supplement protocols for injury prevention and recovery in active individuals.`,
    asprey: `Dave Asprey has made collagen a central part of the Bulletproof brand, including it in Bulletproof Collagen Protein and his books. He views it as essential for skin health, joint integrity, gut lining support, and as a complementary protein source that provides glycine and proline — amino acids underrepresented in modern diets heavy in muscle meat.`,
    saladino: `Paul Saladino strongly advocates for collagen from animal sources — viewing nose-to-tail eating as the ideal approach. He recommends bone broth, organ meats, and consuming animal skin and connective tissue as natural sources of collagen and glycine, noting that traditional cultures achieved optimal connective tissue health this way without supplements.`,
    peat: `Dr. Raymond Peat has written extensively about gelatin and glycine, which are the primary components of collagen. He views gelatin as a uniquely valuable protein source that balances the amino acid profile of muscle meat, noting that glycine is anti-inflammatory and may counteract some of the stress-promoting effects of tryptophan-heavy muscle protein. He's a strong proponent of gelatin in the diet.`,
  },

  'collagen-protein-guide': {
    huberman: `Andrew Huberman has discussed collagen protein and its unique amino acid profile, noting that the timing of collagen consumption relative to exercise matters for connective tissue synthesis — with some research suggesting pre-workout collagen + vitamin C may enhance collagen deposition in tendons and ligaments.`,
    asprey: `Dave Asprey is one of the most prominent proponents of collagen protein in the health space, making it a centerpiece of the Bulletproof product line. He views it as essential for skin health, gut lining integrity, and as a glycine source that balances the amino acid profile of muscle-meat-heavy modern diets.`,
    saladino: `Paul Saladino is a strong advocate for collagen from nose-to-tail animal eating — bone broth, skin, connective tissue, and organ meats. He views animal-sourced collagen as ancestrally appropriate and nutritionally superior to isolated collagen supplements, though he acknowledges supplementation can help those not eating connective tissue regularly.`,
    peat: `Dr. Raymond Peat has written that gelatin (the cooked form of collagen) is one of the most beneficial protein sources due to its high glycine content. He argues that glycine is anti-inflammatory and protective, balancing the amino acid tryptophan from muscle meat. He considers gelatin-rich foods like bone broth a foundational dietary element.`,
  },

  'vitamin-c-whole-food-vs-synthetic': {
    asprey: `Dave Asprey has discussed vitamin C extensively, generally preferring whole-food sources or liposomal vitamin C for better bioavailability and the presence of bioflavonoid cofactors. He's a proponent of high-dose vitamin C protocols for immune support and antioxidant protection, and has discussed IV vitamin C in extreme health contexts.`,
    peat: `Dr. Raymond Peat has written about vitamin C primarily in the context of collagen synthesis, iron metabolism, and immune function. He views adequate vitamin C as important but achievable through diet — particularly orange juice, which he recommends regularly. His position is aligned with whole-food sources and moderate dietary intake rather than megadose supplementation.`,
    saladino: `Paul Saladino has engaged with the plant vs. animal vitamin C debate, noting that animal foods contain small amounts of vitamin C and that nose-to-tail eating (particularly liver and adrenal glands) provides meaningful vitamin C content. He questions whether carnivore dieters actually develop scurvy despite low vitamin C intake, suggesting context matters significantly.`,
  },

  'morning-routine-lock-in': {
    huberman: `Andrew Huberman's morning routine is among the most discussed in health and performance circles. His core elements: wake at a consistent time, get outside for bright light exposure within an hour of waking (no sunglasses), delay caffeine 90-120 minutes after waking (to allow adenosine to clear naturally), hydrate with water + electrolytes, and engage in some form of physical movement. He views the morning as the period that sets neurochemical tone for the entire day.`,
    asprey: `Dave Asprey's morning routine centers on the Bulletproof protocol: strategic light exposure, Bulletproof Coffee (butter + MCT oil, consuming no carbohydrates), brief high-intensity exercise, and cold exposure. He views mornings as the critical window for setting metabolic and cognitive tone and has been influential in popularizing the concept of optimizing morning routines as a performance variable.`,
    rogan: `Joe Rogan has a disciplined morning practice centered on meditation, exercise, and deliberate lifestyle habits. He's discussed his morning routines on the JRE, including sauna use, training, and avoiding phones first thing in the morning. He views consistent morning discipline as foundational to mental health and performance.`,
    saladino: `Paul Saladino's morning practices prioritize sunlight exposure, animal-based breakfast (raw milk, eggs, organ meats, fruit), and connection to natural rhythms. He emphasizes that consistent morning habits aligned with ancestral patterns — particularly light exposure and food timing — are more powerful than any supplement for long-term health.`,
  },

  'sleep-optimization-complete-guide': {
    huberman: `Andrew Huberman has covered sleep optimization more thoroughly than almost any other topic. His protocol includes: morning sunlight, no caffeine after noon, cool dark room (65-67°F), consistent wake time, and supplement stack of magnesium threonate/glycinate, apigenin, and L-theanine 30-60 minutes before bed. He considers sleep the foundational health behavior upon which all other optimization depends.`,
    asprey: `Dave Asprey treats sleep as a performance parameter to be actively optimized — using the Oura Ring and other tracking devices, blackout curtains, EMF reduction, and supplements including magnesium, glycine, and sometimes theanine. He views poor sleep as a primary driver of accelerated biological aging.`,
    rogan: `Joe Rogan was significantly impacted by Matthew Walker's research on sleep deprivation and has become a vocal sleep advocate as a result. He's discussed the cognitive and physical performance costs of poor sleep extensively on the JRE and has experimented with various sleep optimization approaches including melatonin and CBD.`,
    saladino: `Paul Saladino emphasizes ancestral sleep habits: sleeping in total darkness aligned with sunset/sunrise, adequate mineral intake (magnesium, sodium, potassium from diet), and avoiding blue light. He notes that following an animal-based lifestyle often improves sleep quality organically through hormonal normalization and reduced inflammation.`,
    peat: `Dr. Raymond Peat views poor sleep as often a consequence of metabolic dysfunction — particularly low thyroid function or blood sugar instability causing nighttime cortisol elevation. He recommends consuming a small amount of food (milk, honey) before bed to maintain blood sugar stability through the night as a practical sleep intervention.`,
  },

  'mouth-taping-sleep-guide': {
    huberman: `Andrew Huberman has discussed nasal breathing and mouth taping on the Huberman Lab podcast, citing James Nestor's work (Breath) on the superiority of nasal breathing for sleep quality, sleep apnea reduction, and nitric oxide production. He's mentioned trying mouth tape himself and considers improving nasal breathing one of the more impactful and underappreciated sleep interventions.`,
    asprey: `Dave Asprey has discussed mouth taping as a biohacking tool for improving sleep quality, particularly for reducing snoring and improving sleep apnea. He views nasal breathing as strongly protective during sleep and has recommended it as a free, accessible intervention with meaningful upside for sleep quality.`,
    rogan: `Joe Rogan has discussed nasal breathing and mouth taping with James Nestor on the JRE — one of the more listened-to episodes on the show. Nestor's research on breathing significantly influenced Rogan's perspective and he's incorporated nasal breathing practices into his daily life.`,
  },

  'emf-radiation-dangers-and-protection': {
    asprey: `Dave Asprey has been one of the most vocal public figures on EMF concerns, incorporating EMF reduction into the Bulletproof lifestyle. He recommends keeping devices away from the body during sleep, using airplane mode at night, and making hardware choices that minimize radiation exposure. He views EMF as a real but underappreciated stressor on the mitochondria and nervous system.`,
    peat: `Dr. Raymond Peat has written about electromagnetic fields in the context of cellular biology, noting theoretical mechanisms by which EMF could interfere with cellular signaling and mitochondrial function. He approaches the topic from a biophysics perspective and views the precautionary principle as appropriate given the ubiquity of exposure.`,
    saladino: `Paul Saladino has discussed EMF in the context of ancestral health, viewing chronic EMF exposure as one of many modern deviations from ancestral living. He recommends commonsense mitigation — keeping phones out of the bedroom, avoiding body contact with devices — while not adopting extreme avoidance.`,
    rogan: `Joe Rogan has discussed EMF and 5G concerns on the JRE, engaging with the spectrum from credible biological concerns to conspiracy theories. He's generally maintained a curious but skeptical stance — acknowledging that the science is genuinely uncertain and that precautionary measures seem reasonable.`,
  },

  'thyroid-hormones-guide': {
    peat: `Dr. Raymond Peat is one of the most widely read voices on thyroid optimization, and it represents perhaps his most central area of focus. He argues that adequate thyroid function is the foundation of metabolic health, that TSH alone is an insufficient diagnostic measure, and that many people deemed "normal" are functionally hypothyroid. He views the widespread use of T4-only treatment (Synthroid) as inadequate, preferring combined T3/T4 approaches, and has written extensively about the connection between thyroid function and virtually every chronic disease.`,
    asprey: `Dave Asprey has discussed thyroid health as a critical performance variable, noting that suboptimal thyroid function is extremely common but frequently missed by standard TSH testing. He recommends comprehensive thyroid panels (free T3, free T4, reverse T3, antibodies) and has discussed the importance of selenium, iodine, and avoiding goitrogens for optimal thyroid function.`,
    huberman: `Andrew Huberman has covered thyroid function in the context of metabolism and energy regulation, discussing how thyroid hormones regulate cellular metabolism broadly. He's noted the inadequacy of TSH-only testing and the importance of free T3 and T4 levels for a complete picture of thyroid health.`,
  },

  'hormone-optimization-guide': {
    huberman: `Andrew Huberman has made hormone optimization a central focus of his public health education, covering testosterone, estrogen, cortisol, growth hormone, and their interactions extensively. He's discussed lifestyle interventions for testosterone optimization (sleep, training, zinc, vitamin D, stress reduction), TRT protocols, and the importance of understanding one's baseline hormonal status through comprehensive bloodwork.`,
    asprey: `Dave Asprey has discussed hormone optimization as a foundational pillar of biological age reversal, covering testosterone, HGH, cortisol management, and hormonal testing protocols. He's been public about using testosterone optimization strategies and views comprehensive hormone management as essential for peak performance and longevity.`,
    rogan: `Joe Rogan has been very open about his use of testosterone replacement therapy (TRT) on the JRE, discussing the profound impact it's had on his body composition, recovery, and overall wellbeing. He's had multiple guests discuss TRT, hormone optimization, and anti-aging medicine, and has become one of the most prominent voices normalizing hormone optimization in mainstream culture.`,
    saladino: `Paul Saladino advocates for naturally optimizing testosterone through diet and lifestyle — particularly an animal-based diet rich in dietary cholesterol (the precursor to sex hormones), adequate sleep, resistance training, and stress reduction. He's discussed how carnivore-aligned eating patterns normalize testosterone in many men without pharmacological intervention.`,
    peat: `Dr. Raymond Peat has written extensively about hormones from a biophysical perspective, emphasizing the importance of pregnenolone, progesterone, and DHEA as protective "youth hormones" that counteract the stress hormones cortisol and estrogen. He views hormonal aging as largely driven by declining progesterone/pregnenolone relative to estrogen and cortisol — and considers this framework foundational to anti-aging medicine.`,
  },

  'bloodwork-testing-guide': {
    huberman: `Andrew Huberman strongly advocates for comprehensive bloodwork as the foundation of any personalized health protocol. He recommends testing at minimum twice per year and getting panels that include hormones (testosterone, free testosterone, DHEA, cortisol), metabolic markers (fasting glucose, insulin, HbA1c), lipids (full particle counts), inflammatory markers (CRP, homocysteine), and micronutrients (vitamin D, magnesium, iron panel). He views self-knowledge through data as essential to targeted optimization.`,
    asprey: `Dave Asprey has been a proponent of comprehensive bloodwork and continuous health monitoring for decades, regularly testing dozens of biomarkers and using the data to guide his biohacking protocols. He views annual physicals with basic panels as woefully inadequate and advocates for regular, comprehensive testing as a performance tool rather than just disease screening.`,
    rogan: `Joe Rogan has discussed comprehensive bloodwork on the JRE in the context of his own health monitoring, particularly around hormone optimization. He's noted the difference between "within range" and "optimal" and has had multiple physicians on the show discuss how standard reference ranges often reflect disease thresholds rather than health optimization targets.`,
  },

  'magnesium-forms-complete-guide': {
    huberman: `Andrew Huberman has one of the most-referenced magnesium protocols in the health community. He takes magnesium threonate, magnesium glycinate, and sometimes magnesium malate — all in the evening, 30-60 minutes before sleep. He explains that different forms have different tissue targets (threonate crosses the blood-brain barrier; glycinate is well-absorbed and calming), and views magnesium as one of the most important foundational supplements given how widespread insufficiency is.`,
    asprey: `Dave Asprey has extensively covered magnesium as one of the most critical and commonly deficient minerals. He favors magnesium malate for energy and daytime use, magnesium glycinate for sleep and muscle relaxation, and has discussed transdermal magnesium (oil) as a useful delivery route for those with GI sensitivity. He considers magnesium essential for hundreds of enzymatic functions and mitochondrial energy production.`,
    peat: `Dr. Raymond Peat has written about magnesium's role in supporting mitochondrial energy production, reducing stress hormones, and supporting thyroid function. He views magnesium deficiency as extremely common and consequential, noting that it promotes a pro-inflammatory, high-cortisol state that he considers central to chronic disease.`,
  },

  'seed-synbiotic-probiotic-guide': {
    asprey: `Dave Asprey has discussed the gut microbiome and probiotic supplementation extensively, emphasizing that most commodity probiotics have weak clinical backing. He's interested in clinically validated formulations and the role of prebiotics alongside probiotics — consistent with Seed's synbiotic approach. He views gut health as foundational to cognitive function, immune health, and longevity.`,
    huberman: `Andrew Huberman has covered the gut microbiome in dedicated podcast episodes, discussing the evidence for fermented foods, prebiotics, and probiotics. He's noted that high-diversity probiotic supplements with clinical research behind them are preferable to generic products, and considers the gut-brain axis as one of the most important frontiers in neuroscience and health.`,
    saladino: `Paul Saladino has been skeptical of conventional probiotic recommendations, questioning whether external probiotic supplementation meaningfully shifts the microbiome long-term compared to dietary changes. He views an animal-based, fiber-appropriate diet as the primary driver of microbiome health and prefers fermented animal foods (raw milk, kefir, fermented meat) over capsule-based probiotics.`,
  },

  'l-glutamine-guide': {
    asprey: `Dave Asprey has discussed L-glutamine primarily in the context of gut healing and intestinal permeability ("leaky gut"). He views it as one of the more evidence-backed supplements for supporting gut lining integrity — particularly for those recovering from GI damage, high-intensity training athletes (who have elevated glutamine demands), or those healing from illness.`,
    saladino: `Paul Saladino has acknowledged that glutamine can be beneficial for gut healing in specific contexts, though he generally views animal-based dietary interventions (particularly bone broth and collagen-rich foods) as the superior approach to gut health compared to isolated amino acid supplementation.`,
    huberman: `Andrew Huberman has mentioned glutamine in the context of gut health and immune function, noting that it's the primary fuel source for intestinal epithelial cells and that deficiency can compromise gut barrier integrity. He considers it relevant for high-training-volume athletes and those with gut-related health issues.`,
  },

  'l-glutamine-gut-health': {
    asprey: `Dave Asprey has recommended L-glutamine specifically for gut healing protocols, viewing it as one of the more substantive interventions for intestinal permeability. He's included it in his gut-healing frameworks alongside collagen, probiotics, and dietary changes.`,
    huberman: `Andrew Huberman has discussed glutamine's role in gut barrier function and immune support, noting its importance as a conditionally essential amino acid under high metabolic stress conditions including intense training.`,
    saladino: `Paul Saladino views glutamine supplementation as potentially useful for acute gut healing but ultimately views the return to an animal-based diet eliminating plant-based irritants (lectins, oxalates, phytates) as the more fundamental gut-healing intervention.`,
  },

  'tongkat-ali-testosterone-guide': {
    huberman: `Andrew Huberman has discussed tongkat ali (Eurycoma longifolia) in the context of testosterone optimization on his podcast, citing some of the clinical research on its effects on free testosterone, SHBG reduction, and cortisol. He considers LJ100 the evidence-backed standardized extract and has mentioned considering its use, though he emphasizes bloodwork-guided supplementation rather than supplementing blindly.`,
    saladino: `Paul Saladino has discussed adaptogens and hormone-supporting plants with characteristic nuance — acknowledging that some plant compounds like tongkat ali have meaningful clinical data while maintaining that the foundational approach to testosterone is diet (animal foods, cholesterol), training, sleep, and stress management rather than supplementation.`,
    rogan: `Joe Rogan has discussed testosterone optimization approaches on the JRE and has mentioned tongkat ali as one of the natural approaches that fighters and athletes explore before considering pharmaceutical options. He's expressed interest in compounds with actual clinical evidence for testosterone support.`,
  },

  'zinc-testosterone-guide': {
    huberman: `Andrew Huberman has mentioned zinc in the context of testosterone optimization and immune function, noting that zinc deficiency directly impairs testosterone synthesis. He's mentioned testing zinc levels through bloodwork and supplementing if deficient, with oysters being the most zinc-dense food available. He typically suggests zinc picolinate or glycinate as well-absorbed forms.`,
    saladino: `Paul Saladino strongly advocates for getting zinc through diet — particularly oysters (the richest dietary source), red meat, and liver. He views animal-food-based zinc as superior in bioavailability compared to plant-based sources (which are bound to phytates) and views dietary zinc optimization as the proper approach rather than supplementation for most people eating animal-based.`,
    peat: `Dr. Raymond Peat has written about zinc's role in thyroid function and testosterone synthesis, noting its importance as a cofactor for numerous enzymes. He views adequate zinc status as foundational and considers deficiency a consequence of poor diet (particularly heavy on phytate-containing grains and legumes) rather than an inherent human problem.`,
    rogan: `Joe Rogan has mentioned zinc in the context of testosterone support and immune health on the JRE, treating it as part of a basic foundational supplement stack alongside vitamin D and omega-3.`,
  },

  'daily-multivitamin-do-you-need-one': {
    huberman: `Andrew Huberman has discussed multivitamins with nuance on his podcast, noting that while the RCT evidence for multivitamins reducing disease outcomes is weak, the rationale for filling dietary gaps with targeted single nutrients is stronger than blanket multivitamin use. He generally prefers targeted supplementation based on bloodwork rather than broad-spectrum multivitamins.`,
    asprey: `Dave Asprey is skeptical of standard multivitamins, arguing they contain poorly bioavailable forms of key nutrients (especially minerals), include nutrient antagonists at counterproductive ratios, and provide a false sense of security. He advocates instead for targeted, high-quality, form-appropriate supplementation guided by testing.`,
    saladino: `Paul Saladino views a well-constructed nose-to-tail animal-based diet as providing all essential micronutrients without the need for supplementation. He considers organ meats — particularly liver — to be nature's multivitamin, providing exceptional concentrations of vitamin A, B12, B6, folate, zinc, copper, iron, and other essential nutrients in highly bioavailable forms.`,
    peat: `Dr. Raymond Peat is cautious about multivitamin supplementation, particularly noting that many contain forms of iron that he considers inflammatory and harmful. He views dietary optimization through quality animal foods, dairy, and fruit as the appropriate approach to micronutrient adequacy, with targeted supplementation where specific deficiencies exist.`,
  },

  'digestive-enzymes-guide': {
    asprey: `Dave Asprey has discussed digestive enzymes within the Bulletproof framework, recommending them for those with impaired digestion, HCl insufficiency, or when consuming foods outside of one's usual pattern. He views optimizing digestion as upstream of nutrient absorption — the best diet is only as good as one's ability to absorb it.`,
    saladino: `Paul Saladino has a nuanced stance on digestive enzymes, noting that carnivore-aligned eating (eliminating plant toxins and fiber that disrupt gut function) often resolves digestive issues without supplemental enzymes. He views chronically poor digestion as a signal to address diet rather than supplement around the problem.`,
  },

  'psilocybin-microdosing-guide': {
    huberman: `Andrew Huberman has dedicated extensive podcast content to psilocybin neuroscience, including its mechanism (5-HT2A agonism), effects on neural plasticity and default mode network, and the emerging clinical research for depression, addiction, and OCD. He's discussed microdosing's theoretical mechanisms but notes the clinical evidence for microdosing is much weaker than for full-dose therapeutic sessions under supervision.`,
    rogan: `Joe Rogan is one of the most prominent public advocates for psychedelics including psilocybin, discussing both therapeutic applications and personal spiritual/consciousness experiences extensively on the JRE. He's interviewed leading researchers and advocates (Michael Pollan, Paul Stamets, Rick Doblin) and has been open about his own psychedelic experiences.`,
    asprey: `Dave Asprey has discussed psilocybin and microdosing in the biohacking context, viewing psychedelics as powerful neuroplasticity tools when used intentionally and in appropriate settings. He's discussed integration protocols and the importance of set and setting, approaching psychedelics as serious tools rather than recreational substances.`,
    saladino: `Paul Saladino has engaged with psychedelics thoughtfully, viewing them differently from dietary plant compounds he's skeptical of. He's expressed openness to the therapeutic and consciousness-expanding potential of psilocybin when used in appropriate ceremonial or clinical contexts, noting the cross-cultural history of intentional use.`,
  },

  'smart-goals-vs-systems': {
    huberman: `Andrew Huberman has discussed goal-setting and systems in the context of motivation and dopamine neuroscience. He's noted that the dopamine response is more robust and sustainable when focused on the process (effort, learning, systems) rather than the goal (dopamine spike at achievement), which then crashes. He frames systems thinking as neurobiologically superior for sustained motivation.`,
    asprey: `Dave Asprey approaches goals and performance through the lens of biohacking — optimizing the underlying system (body, brain, biology) to make goal achievement more automatic. He's discussed how physiological optimization (sleep, nutrition, cognitive performance) underlies the capacity to execute on any behavioral system.`,
    rogan: `Joe Rogan has frequently discussed discipline, consistency, and systems on the JRE — particularly in relation to martial arts training, where showing up daily and building skill over years reflects systems over goals. He's credited his consistency with Brazilian Jiu-Jitsu (practicing for 25+ years) as a model for any long-term skill or habit development.`,
  },

  'identity-based-habits': {
    huberman: `Andrew Huberman has discussed identity and behavior from a neuroscience perspective, noting that self-narrative (how we describe ourselves) has measurable effects on behavior via neurological mechanisms. He's aligned with the Atomic Habits framework — that behavior shapes identity and identity shapes behavior — and discussed this in the context of how the brain represents the self and how those representations influence action.`,
    rogan: `Joe Rogan has discussed identity formation through discipline on the JRE, frequently making the point that consistency in hard practices (martial arts, fitness, hunting) shapes who you are at a fundamental level. He views identity as something you build through repeated difficult action rather than something you have or claim.`,
  },

  'two-minute-rule-habits': {
    huberman: `Andrew Huberman has discussed the neuroscience behind habit initiation and the role of activation energy in behavioral change. He's aligned with the principle that reducing friction to start a behavior is more powerful than willpower for habit formation — consistent with the 2-minute rule framework — citing research on implementation intentions and the role of dopamine in initiating action.`,
    asprey: `Dave Asprey has incorporated the concept of reducing friction and optimizing environment design for habit success, consistent with his biohacking framework of changing behavior through system design rather than pure willpower. He views energy management as central to habit execution.`,
  },

  'compound-interest-habits-wealth': {
    huberman: `Andrew Huberman has discussed the compound effect of small consistent behaviors in neurological terms — noting that neural pathways strengthen with repetition in a genuinely exponential way. The habits of attention, sleep, and exercise that seem minor individually compound over years into dramatically different brain and body outcomes.`,
    rogan: `Joe Rogan has been vocal about the compound effect of consistent training and discipline throughout his life, frequently making the point on the JRE that showing up daily over years — not any single heroic effort — produces mastery and transformation.`,
    asprey: `Dave Asprey's entire philosophy is built on the compound returns of biohacking — that small daily improvements in sleep, nutrition, cognitive performance, and recovery compound into dramatically different outcomes over time. He frames his books and protocols explicitly around this compounding principle.`,
  },

  'why-your-habits-are-your-dna': {
    huberman: `Andrew Huberman's work on neuroplasticity and epigenetics aligns directly with the idea that behaviors literally shape biology. He's discussed how repeated experiences and behaviors alter gene expression, neural connectivity, and even transgenerational epigenetic patterns — providing a rigorous scientific framework for the claim that habits become your biological identity.`,
    saladino: `Paul Saladino's ancestral health framework emphasizes that human biology was shaped by repeated behavioral patterns across generations — the "behavioral DNA" concept aligns with his view that lifestyle choices have profound and lasting biological consequences, consistent with epigenetics research.`,
    peat: `Dr. Raymond Peat has written about the relationship between lifestyle, metabolism, and gene expression, noting that cellular energy state influences which genes are expressed — consistent with epigenetic frameworks. He views daily metabolic choices (food, light, stress) as continuously reshaping biological function at a fundamental level.`,
  },

  'annual-goal-review': {
    huberman: `Andrew Huberman has discussed annual reviews and temporal landmarks in the context of motivation psychology, noting that "fresh start" effects (New Year, birthdays, etc.) have measurable impacts on goal-setting behavior and follow-through. He recommends using these landmarks deliberately for reflection and adjustment rather than as arbitrary deadlines.`,
    asprey: `Dave Asprey incorporates annual reviews as a biohacking tool — reviewing health data, tracking progress against longevity goals, adjusting protocols based on the year's data. He views periodic comprehensive review as essential for continuous improvement and considers it an extension of his data-driven approach to personal optimization.`,
    rogan: `Joe Rogan has discussed self-reflection and evaluation on the JRE, often in the context of long-term perspective and the importance of looking at where you are versus where you want to be. He emphasizes honest self-assessment as fundamental to sustained growth.`,
  },

  'book-atomic-habits': {
    huberman: `Andrew Huberman has referenced Atomic Habits and James Clear's framework on his podcast, particularly the concept that identity precedes behavior — which aligns with his neuroscience perspective on how self-representation influences action. He considers habit formation one of the most practically valuable topics in behavioral neuroscience.`,
    rogan: `Joe Rogan has discussed Atomic Habits and habit formation philosophy broadly on the JRE, consistent with his emphasis on discipline and consistent action. He's cited habit literature in conversations about training, business, and personal development.`,
  },

  'sun-exposure-vitamin-d': {
    huberman: `Andrew Huberman distinguishes carefully between the circadian benefits of morning sunlight (primarily blue-green spectrum, non-UV) and the vitamin D synthesis benefits of midday UV exposure. He notes that morning light is NOT primarily about vitamin D — that comes from UVB exposure around solar noon — and recommends both distinct practices: morning light for circadian rhythms and midday sun for vitamin D.`,
    saladino: `Paul Saladino prioritizes sun exposure as the primary approach to vitamin D optimization, viewing it as ancestrally appropriate and providing benefits beyond vitamin D alone (nitric oxide production, circadian signaling, infrared exposure). He advocates spending significant time outdoors daily rather than supplementing.`,
    asprey: `Dave Asprey has discussed vitamin D and sun exposure as important foundations of health, while noting practical constraints for many people in northern latitudes. He recommends testing vitamin D levels and supplementing accordingly while also emphasizing the unique value of actual sun exposure beyond just vitamin D synthesis.`,
    peat: `Dr. Raymond Peat views sunlight as profoundly beneficial for health — beyond vitamin D, he considers light exposure to be directly supportive of metabolic rate and thyroid function. He's written about the beneficial effects of red and infrared light in particular and views modern avoidance of sunlight as contributing to widespread metabolic and hormonal dysfunction.`,
  },

  'modafinil-guide': {
    huberman: `Andrew Huberman has discussed modafinil as a wakefulness-promoting agent with a distinct mechanism from caffeine (orexin/hypocretin pathway vs. adenosine). He's acknowledged it's used by military personnel and in certain professional contexts, and discusses its cognitive effects thoughtfully — while generally recommending that foundational sleep be the primary strategy for wakefulness rather than pharmacological enhancement in healthy individuals.`,
    asprey: `Dave Asprey has written and spoken extensively about modafinil as a transformative cognitive enhancer, crediting it with significant performance improvements during his career. It was a central component of the early Bulletproof brand. He views it as a powerful but context-specific tool and has discussed strategies for using it without disrupting sleep.`,
    rogan: `Joe Rogan has discussed modafinil on the JRE as a widely used cognitive enhancer in military, academic, and professional circles. He's approached it with interest and acknowledged its use among high performers while noting the grey area between performance enhancement and pharmaceutical dependence.`,
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

// Skip categories
const SKIP_SLUGS = new Set([
  '50-30-20-budget-rule',
  'annual-goal-review', // skip since it's more generic
  'compound-interest-habits-wealth',
  'credit-score-optimization-guide',
  'dave-ramsey-baby-steps',
  'dave-ramsey-budgeting-zero-based',
  'debt-payoff-strategies',
  'emergency-fund-guide',
  'financial-habits-millionaires',
  'index-fund-investing-guide',
  'net-worth-tracking',
  'roth-ira-guide',
  'tax-advantaged-accounts-hsa-fsa-529',
  'building-passive-income-streams',
  'dollar-cost-averaging-guide',
  'book-atomic-habits',
  'book-deep-work-cal-newport',
  'book-dopamine-nation',
  'book-meditations-marcus-aurelius',
  'book-obstacle-is-the-way-ryan-holiday',
  'book-why-we-sleep-matthew-walker',
  'book-cant-hurt-me-goggins',
  'book-breath-james-nestor',
]);

let processed = 0;
let skipped = 0;
let noData = 0;

for (const [slug, opinions] of Object.entries(EXPERT_OPINIONS)) {
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

  // Insert before Sources, or before end if no Sources section
  if (content.includes('## Sources & Further Reading')) {
    content = content.replace('## Sources & Further Reading', expertSection + '\n## Sources & Further Reading');
  } else {
    content = content.trimEnd() + '\n\n' + expertSection;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK: ${slug}.md (${Object.keys(opinions).length} experts)`);
  processed++;
}

// List files that have no expert data (not skipped, just no data yet)
const allFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
for (const file of allFiles) {
  const slug = file.replace('.md', '');
  if (!EXPERT_OPINIONS[slug] && !SKIP_SLUGS.has(slug)) {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    if (!content.includes('## What the Experts Say')) {
      console.log(`NO_DATA: ${file} (no expert opinions defined — may need manual addition)`);
      noData++;
    }
  }
}

console.log(`\nDone. Added: ${processed} | Skipped: ${skipped} | No data: ${noData}`);
