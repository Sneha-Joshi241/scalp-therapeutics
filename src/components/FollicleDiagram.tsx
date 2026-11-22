import { MechanismStageId } from '../data/deckData';

interface FollicleDiagramProps {
  stage: MechanismStageId;
}

export function FollicleDiagram({ stage }: FollicleDiagramProps) {
  const showCrust = stage === 'crust' || stage === 'step1';
  const crustOpacity = stage === 'crust' ? 1 : stage === 'step1' ? 0.38 : 0;
  const showChelators = stage === 'step1';
  const showSaponinFoam = stage === 'step2';
  const showActives = stage === 'step3';

  return (
    <div className="w-full rounded-xl border border-[#DFE4DF] bg-[#F4F7F4] p-4 sm:p-6">
      <div className="flex items-center justify-between text-xs text-[#4A5D56] mb-3">
        <span className="font-medium text-[#13221D]">
          Follicular Cross-Section Model
        </span>
        <span className="font-mono-tabular">
          {stage === 'crust' && 'TDS: 500–1,200+ ppm'}
          {stage === 'step1' && 'pH-Balanced Chelation'}
          {stage === 'step2' && 'Botanical Saponin Rinse'}
          {stage === 'step3' && 'Dermal Papilla Uptake'}
        </span>
      </div>

      <svg
        viewBox="0 0 560 320"
        className="w-full h-auto block"
        role="img"
        aria-label={`Diagram showing scalp follicle state during ${stage}`}
      >
        <defs>
          <linearGradient id="epidermisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAD6C7" />
            <stop offset="100%" stopColor="#DFC2AE" />
          </linearGradient>
          <linearGradient id="dermisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D7B19A" />
            <stop offset="100%" stopColor="#C99980" />
          </linearGradient>
          <linearGradient id="activeGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F5C4D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0F5C4D" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Background Air / Surface Zone */}
        <rect x="0" y="0" width="560" height="108" rx="8" fill="#FAFBF9" />

        {/* Epidermis & Dermis Layers */}
        <path
          d="M 0 108 L 220 108 Q 238 108 242 126 L 250 250 Q 252 284 280 284 Q 308 284 310 250 L 318 126 Q 322 108 340 108 L 560 108 L 560 175 L 0 175 Z"
          fill="url(#epidermisGrad)"
        />
        <path
          d="M 0 175 L 245 175 L 250 250 Q 252 284 280 284 Q 308 284 310 250 L 315 175 L 560 175 L 560 320 L 0 320 Z"
          fill="url(#dermisGrad)"
        />

        {/* Follicle Canal Background */}
        <path
          d="M 244 108 L 254 252 Q 256 280 280 280 Q 304 280 306 252 L 316 108 Z"
          fill={stage === 'step3' ? '#E4F1EC' : '#F3E7DD'}
        />

        {/* Active Uptake Highlight in Step 3 */}
        {showActives && (
          <path
            d="M 244 108 L 254 252 Q 256 280 280 280 Q 304 280 306 252 L 316 108 Z"
            fill="url(#activeGlow)"
          />
        )}

        {/* Hair Bulb & Shaft */}
        <path
          d="M 268 274 Q 266 248 273 230 L 274 28 L 286 28 L 287 230 Q 294 248 292 274 Q 280 282 268 274 Z"
          fill={stage === 'crust' ? '#5C504A' : '#262322'}
        />
        {/* Dermal Papilla / Micro-circulation vessels */}
        <path
          d="M 240 304 Q 268 288 280 278 Q 292 288 320 304"
          fill="none"
          stroke={showActives ? '#0F5C4D' : '#9E5A52'}
          strokeWidth={showActives ? '3.5' : '2'}
          strokeLinecap="round"
        />
        <circle
          cx="280"
          cy="275"
          r={showActives ? 7 : 5}
          fill={showActives ? '#0F5C4D' : '#A96B61'}
        />

        {/* Hard-Water Calcium / Magnesium Mineral Crust */}
        {showCrust && (
          <g opacity={crustOpacity}>
            {/* Surface crust film */}
            <path
              d="M 24 104 Q 115 96 226 104 Q 248 106 254 128 L 246 132 Q 238 114 220 112 L 24 112 Z"
              fill="#D4CEC4"
              stroke="#9E978B"
              strokeWidth="1"
            />
            <path
              d="M 536 104 Q 425 96 334 104 Q 312 106 306 128 L 314 132 Q 322 114 340 112 L 536 112 Z"
              fill="#D4CEC4"
              stroke="#9E978B"
              strokeWidth="1"
            />
            {/* Mineral crystals blocking pore & clinging to shaft */}
            <polygon points="248,118 258,112 264,122 252,128" fill="#E6E1D8" stroke="#8C8579" strokeWidth="1" />
            <polygon points="312,118 302,112 296,122 308,128" fill="#E6E1D8" stroke="#8C8579" strokeWidth="1" />
            <polygon points="268,94 276,88 281,97 271,102" fill="#E6E1D8" stroke="#8C8579" strokeWidth="1" />
            <polygon points="282,74 291,70 294,79 285,84" fill="#E6E1D8" stroke="#8C8579" strokeWidth="1" />
            <circle cx="262" cy="142" r="4" fill="#DDD7CD" stroke="#8C8579" strokeWidth="1" />
            <circle cx="297" cy="148" r="4.5" fill="#DDD7CD" stroke="#8C8579" strokeWidth="1" />
          </g>
        )}

        {/* Step 1: Chelating Binders */}
        {showChelators && (
          <g>
            <circle cx="236" cy="94" r="5" fill="#0F5C4D" fillOpacity="0.85" />
            <circle cx="255" cy="106" r="4" fill="#0F5C4D" fillOpacity="0.85" />
            <circle cx="305" cy="106" r="4" fill="#0F5C4D" fillOpacity="0.85" />
            <circle cx="324" cy="94" r="5" fill="#0F5C4D" fillOpacity="0.85" />
            <path
              d="M 236 94 L 252 118 M 324 94 L 308 118"
              stroke="#0F5C4D"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* Step 2: Botanical Saponin Lifted Rinse */}
        {showSaponinFoam && (
          <g>
            <circle cx="222" cy="88" r="8" fill="#FFFFFF" stroke="#0F5C4D" strokeWidth="1.5" />
            <circle cx="246" cy="76" r="10" fill="#FFFFFF" stroke="#0F5C4D" strokeWidth="1.5" />
            <circle cx="314" cy="78" r="9" fill="#FFFFFF" stroke="#0F5C4D" strokeWidth="1.5" />
            <circle cx="338" cy="88" r="7" fill="#FFFFFF" stroke="#0F5C4D" strokeWidth="1.5" />
            <path
              d="M 262 150 Q 254 118 246 92 M 298 150 Q 306 118 314 92"
              fill="none"
              stroke="#0F5C4D"
              strokeWidth="1.75"
              strokeDasharray="4 3"
            />
          </g>
        )}

        {/* Step 3: Leave-On Lotion Penetrating Unclogged Follicle */}
        {showActives && (
          <g>
            <circle cx="262" cy="136" r="3.5" fill="#0F5C4D" />
            <circle cx="298" cy="144" r="3.5" fill="#0F5C4D" />
            <circle cx="264" cy="178" r="3.5" fill="#0F5C4D" />
            <circle cx="296" cy="192" r="3.5" fill="#0F5C4D" />
            <circle cx="266" cy="224" r="3.5" fill="#0F5C4D" />
            <circle cx="294" cy="238" r="3.5" fill="#0F5C4D" />
            <path
              d="M 262 114 L 266 254 M 298 114 L 294 254"
              stroke="#0F5C4D"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* Clean Anatomical Labels */}
        <g fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif" fill="#2A3E37">
          <text x="24" y="34" fontWeight="600" fill="#13221D">
            {stage === 'crust' && 'Mineral Barrier Blocked'}
            {stage === 'step1' && 'Chelating Agents Binding Ca²⁺ / Mg²⁺'}
            {stage === 'step2' && 'Herbal Saponins Lifting Residues'}
            {stage === 'step3' && 'Unclogged Follicle Uptake'}
          </text>
          <text x="24" y="52" fill="#4A5D56">
            {stage === 'crust' && 'Ca²⁺ & Mg²⁺ crust seals pore entrance'}
            {stage === 'step1' && 'Breaks hardened salt bonds safely'}
            {stage === 'step2' && 'Gently clears lifted minerals without sulfates'}
            {stage === 'step3' && 'Ayurvedic & peptide actives reach bulb'}
          </text>

          <line x1="340" y1="142" x2="410" y2="142" stroke="#6B7C75" strokeWidth="1" />
          <text x="418" y="146" fontSize="11" fill="#2A3E37">
            Epidermal Pore
          </text>

          <line x1="292" y1="275" x2="410" y2="275" stroke="#6B7C75" strokeWidth="1" />
          <text x="418" y="279" fontSize="11" fill="#2A3E37">
            {stage === 'crust' ? 'Under-nourished Root' : 'Stimulated Hair Bulb'}
          </text>
        </g>
      </svg>
    </div>
  );
}
