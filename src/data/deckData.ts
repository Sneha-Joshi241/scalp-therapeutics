export type MechanismStageId = 'crust' | 'step1' | 'step2' | 'step3';

export interface MechanismStage {
  id: MechanismStageId;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  mechanismDetail: string;
  keyActive: string;
  follicleState: string;
}

export const MECHANISM_STAGES: MechanismStage[] = [
  {
    id: 'crust',
    tabLabel: '0. Mineral Crust',
    eyebrow: 'Baseline · 500–1,200+ ppm TDS',
    title: 'Hard-water mineral crust blocks the follicular pathway',
    description:
      'Continuous washing with high-TDS groundwater and private tanker water deposits an invisible barrier of Calcium and Magnesium salts on the scalp surface.',
    mechanismDetail:
      'Regular silicone shampoos (₹99–₹150) only coat the strand, while traditional oils sit on top of the crust—trapping buildup and blocking active ingredients from reaching the roots.',
    keyActive: 'Calcium (Ca²⁺) & Magnesium (Mg²⁺) buildup',
    follicleState: 'Pores occluded · Weakened hair shafts · Brittle, thinning roots',
  },
  {
    id: 'step1',
    tabLabel: 'Step 1: Pre-Wash Serum',
    eyebrow: 'De-Calcification · Biocompatible Chelating Peel',
    title: 'Dissolve the hardened mineral crust before cleansing',
    description:
      'Exfoliating compounds and biocompatible mineral binders break the ionic bonds of Calcium and Magnesium deposits without stripping the scalp barrier.',
    mechanismDetail:
      'Unlike harsh synthetic stripping in expensive clinical lines, our targeted pre-wash peel chelates encrusted salts gently so the follicular opening clears safely.',
    keyActive: 'Exfoliating compounds + biocompatible mineral binders',
    follicleState: 'Mineral lattice chelating & detaching from scalp stratum',
  },
  {
    id: 'step2',
    tabLabel: 'Step 2: Cleanser',
    eyebrow: 'Purification · Standardized Herbal Saponins',
    title: 'Wash away lifted residues without sulfate stripping',
    description:
      'Saponin-rich native botanical extracts emulsify and rinse away the loosened mineral salts, oxidized sebum, and environmental grime.',
    mechanismDetail:
      'Standardized Ayurvedic saponins replace unstandardized raw pastes and harsh high-sulfate detergents, maintaining healthy scalp pH during the rinse cycle.',
    keyActive: 'Standardized saponin-rich native botanical extracts',
    follicleState: 'Residues cleared · Clean, unsealed pore opening',
  },
  {
    id: 'step3',
    tabLabel: 'Step 3: Leave-On Lotion',
    eyebrow: 'Follicle Delivery · Root Stimulation',
    title: 'Stimulate dormant roots once the pathway is open',
    description:
      'Micro-circulation boosters, clinical peptides, and Ayurvedic actives absorb directly into the unclogged follicle—where leave-on actives actually stay.',
    mechanismDetail:
      'Because steps 1 and 2 have already cleared the mineral barrier and the lotion is not washed down the drain, therapeutic actives reach the dermal papilla effectively.',
    keyActive: 'Micro-circulation boosters + Ayurvedic actives & clinical peptides',
    follicleState: 'Unclogged follicle delivery · Active dermal circulation',
  },
];

export const TDS_ZONES = [
  {
    id: 'soft',
    label: '< 200 ppm (Municipal Soft)',
    risk: 'Low Mineral Load',
    shampooBehavior: 'Standard cleansers lather easily and rinse clean without leaving heavy salt films.',
    scalpImpact: 'Minimal Calcium/Magnesium accumulation; follicles remain open to normal topical care.',
    recommendation: 'Occasional clarifying maintenance only.',
  },
  {
    id: 'moderate',
    label: '200–500 ppm (Mixed Supply)',
    risk: 'Progressive Salt Film',
    shampooBehavior: 'Silicone shampoos struggle to rinse cleanly, creating waxy residue around hair roots.',
    scalpImpact: 'Early crusting reduces oil and serum absorption and triggers mild scalp tightness.',
    recommendation: 'Bi-weekly chelation helps prevent gradual follicular occlusion.',
  },
  {
    id: 'hard',
    label: '500–1,200+ ppm (Tanker / Borewell Crisis)',
    risk: 'Severe Follicular Crust',
    shampooBehavior:
      'Basic ₹99–₹150 shampoos cannot dissolve hardened Ca²⁺/Mg²⁺ bonds; surface cleansing fails.',
    scalpImpact:
      'Stubborn mineral barrier blocks pores, causes irritation, weakens shafts, and leaves brittle, thinning roots.',
    recommendation:
      'Requires sequential Step 1 Chelation → Step 2 Saponin Wash → Step 3 Leave-On Follicle Delivery.',
  },
];
