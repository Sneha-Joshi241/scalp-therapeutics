import { FormEvent, useState } from 'react';
import { ArrowRight, Check, Copy, Mail } from 'lucide-react';
import { MECHANISM_STAGES, MechanismStageId, TDS_ZONES } from './data/deckData';
import { FollicleDiagram } from './components/FollicleDiagram';

type InquiryTrack = 'pilot' | 'partner';

export default function App() {
  const [selectedTdsId, setSelectedTdsId] = useState<string>('hard');
  const [activeStage, setActiveStage] = useState<MechanismStageId>('crust');

  const [inquiryTrack, setInquiryTrack] = useState<InquiryTrack>('pilot');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [cityOrOrg, setCityOrOrg] = useState('');
  const [waterSource, setWaterSource] = useState('Private Water Tanker (500–1,200+ ppm)');
  const [collaborationArea, setCollaborationArea] = useState(
    'GMP Lab Formulation & Stability'
  );
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [copiedField, setCopiedField] = useState<'email' | null>(null);

  const currentTds = TDS_ZONES.find((zone) => zone.id === selectedTdsId) || TDS_ZONES[2];
  const currentStage =
    MECHANISM_STAGES.find((item) => item.id === activeStage) || MECHANISM_STAGES[0];

  const handleCopy = async (value: string, field: 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

    const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!fullName.trim() || !contactInfo.trim()) return;

        const response = await fetch('https://' + 'api.' + 'web3forms.com' + '/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: '01209742-c2a8-415b-b604-293e3852b9d1',
        subject: `${inquiryTrack === 'pilot' ? 'Pilot Waitlist' : 'R&D Inquiry'} — ${fullName}`,
        inquiry_type: inquiryTrack === 'pilot' ? 'Pilot / Pre-Order' : 'GMP / R&D Collaboration',
        full_name: fullName,
        contact_info: contactInfo,
        city_or_organization: cityOrOrg,
        details: inquiryTrack === 'pilot' ? waterSource : collaborationArea,
        message: notes,
      }),
    });

    const data = await response.json();
    if (data.success) setSubmitted(true);
  };
  const resetForm = () => {
    setFullName('');
    setContactInfo('');
    setCityOrOrg('');
    setNotes('');
    setSubmitted(false);
  };

  return (
    <div id="top" className="min-h-screen bg-[#F9FAF8] text-[#13221D]">
      {/* Top Bar Contract: Single row, 3 strict zones */}
      <header className="sticky top-0 z-40 bg-[#F9FAF8]/92 backdrop-blur-md border-b border-[#DFE4DF]">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#13221D] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-sm"
          >
            Scalp Therapeutics
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A5D56]"
          >
            <a
              href="#problem"
              className="hover:text-[#13221D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-sm"
            >
              Problem
            </a>
            <a
              href="#routine"
              className="hover:text-[#13221D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-sm"
            >
              3-Step Routine
            </a>
            <a
              href="#mission"
              className="hover:text-[#13221D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-sm"
            >
              Our Mission
            </a>
            <a
              href="#participate"
              className="hover:text-[#13221D] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-sm"
            >
              Connect
            </a>
          </nav>

          <a
            href="#participate"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-[#0F5C4D] hover:bg-[#0B463A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F5C4D]"
          >
            Join Pilot
          </a>
        </div>
      </header>

      <main>
        {/* 1. Hero Section: Proposition */}
        <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <p className="text-sm text-[#4A5D56]">
                  <span>Innovated by Miss. Sneha Sachin Joshi</span>
                  <span aria-hidden="true" className="mx-2 text-[#9AA8A1]">
                    ·
                  </span>
                  <span>First-Year BAMS Student</span>
                </p>

                <h1 className="font-display text-[clamp(2.25rem,4.1vw,3.65rem)] font-semibold tracking-tight leading-[1.07] text-[#13221D] text-balance">
                  A conceptual breakthrough in hard-water scalp therapeutics for India.
                </h1>

                <p className="text-base sm:text-lg text-[#4A5D56] leading-relaxed max-w-2xl">
                  India’s first sequential, mass-market 3-step routine that chemically chelates
                  stubborn hard-water mineral crust first—clearing the follicular barrier so
                  Ayurvedic saponins, micro-circulation boosters, and clinical peptides actually
                  penetrate.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#routine"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0F5C4D] hover:bg-[#0B463A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F5C4D]"
                >
                  <span>Explore 3-Step Routine</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column Summary Architecture Card */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex-1 rounded-2xl border border-[#DFE4DF] bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-[#4A5D56]">30-Day Starter Routine</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-mono-tabular text-3xl sm:text-4xl font-semibold tracking-tight text-[#13221D]">
                      ₹499 – ₹549
                    </span>
                    <span className="text-xs text-[#4A5D56]">Masstige Price Target</span>
                  </div>
                  <p className="text-sm text-[#4A5D56] leading-relaxed">
                    Designed to unlock the unserved middle ground between ₹99–₹150 silicone shampoos
                    and ₹500–₹1,800+ hyper-premium clinical lines.
                  </p>
                </div>

                <div className="divide-y divide-[#DFE4DF] border-t border-[#DFE4DF] text-sm">
                  <div className="py-3 flex items-center justify-between gap-4">
                    <span className="font-medium text-[#13221D]">Step 1 · Pre-Wash Serum</span>
                    <span className="text-xs text-[#4A5D56]">Biocompatible Chelating Peel</span>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <span className="font-medium text-[#13221D]">Step 2 · Cleanser</span>
                    <span className="text-xs text-[#4A5D56]">Standardized Herbal Saponins</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between gap-4">
                    <span className="font-medium text-[#13221D]">Step 3 · Leave-On Lotion</span>
                    <span className="text-xs text-[#4A5D56]">Unclogged Follicle Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Problem & Market Gap */}
        <section id="problem" className="border-t border-[#DFE4DF] bg-white">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-xs font-medium text-[#4A5D56]">01. Problem & Market Gap</p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#13221D] text-balance">
                  Surface cleansing alone does not dissolve mineral crusts.
                </h2>
                <p className="text-base text-[#4A5D56] leading-relaxed">
                  Rapid real-estate growth outpaces city municipal tap networks, leaving high-rise
                  housing blocks across Tier-1 and Tier-2 cities completely dependent on high-TDS
                  groundwater and private water tankers.
                </p>

                <div className="space-y-4 pt-2 border-t border-[#DFE4DF]">
                  <div className="pt-4 space-y-1">
                    <h3 className="text-sm font-semibold text-[#13221D]">
                      Stubborn Invisible Mineral Barrier
                    </h3>
                    <p className="text-sm text-[#4A5D56] leading-relaxed">
                      Continuous washing deposits Calcium and Magnesium salts on the scalp—blocking
                      pores, triggering irritation, weakening hair shafts, and creating brittle,
                      thinning roots.
                    </p>
                  </div>
                  <div className="pt-2 space-y-1">
                    <h3 className="text-sm font-semibold text-[#13221D]">
                      Why Mainstream Shampoos Fail
                    </h3>
                    <p className="text-sm text-[#4A5D56] leading-relaxed">
                      Mass corporate shampoos (₹99–₹150) rely on silicones that temporarily coat the
                      hair strand, lacking the chelating chemistry required to break down hardened
                      scalp crusts.
                    </p>
                  </div>
                  <div className="pt-2 space-y-1">
                    <h3 className="text-sm font-semibold text-[#13221D]">
                      The Saturated Price Barrier
                    </h3>
                    <p className="text-sm text-[#4A5D56] leading-relaxed">
                      Hyper-premium clinical alternatives cost ₹500–₹1,800+ per product, locking out
                      over 90% of Indian households who need daily, affordable care.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Water Hardness (TDS) Impact Checker */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#DFE4DF] bg-[#F9FAF8] p-6 sm:p-8 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-semibold text-[#13221D]">
                      Interactive Water TDS Scalp Checker
                    </h3>
                    <p className="text-xs text-[#4A5D56]">
                      Select your apartment or housing society water TDS range to see how mineral
                      load affects regular shampoo and follicle absorption.
                    </p>
                  </div>

                  <div
                    role="tablist"
                    aria-label="Water TDS range selector"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  >
                    {TDS_ZONES.map((zone) => {
                      const isActive = zone.id === selectedTdsId;
                      return (
                        <button
                          key={zone.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setSelectedTdsId(zone.id)}
                          className={`px-3 py-2.5 text-left rounded-lg border text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] ${
                            isActive
                              ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                              : 'bg-white text-[#13221D] border-[#DFE4DF] hover:border-[#B6C2BC]'
                          }`}
                        >
                          <span className="block font-mono-tabular">{zone.label.split(' ')[0]} {zone.label.split(' ')[1]}</span>
                          <span
                            className={`block mt-0.5 text-[11px] ${
                              isActive ? 'text-white/85' : 'text-[#4A5D56]'
                            }`}
                          >
                            {zone.risk}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-xl border border-[#DFE4DF] bg-white p-5 space-y-4">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#DFE4DF]">
                      <span className="font-mono-tabular text-xs font-medium text-[#13221D]">
                        {currentTds.label}
                      </span>
                      <span className="text-xs font-semibold text-[#0F5C4D]">
                        {currentTds.risk}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-xs font-medium text-[#4A5D56]">Shampoo Behavior</p>
                        <p className="text-[#13221D] mt-0.5 leading-relaxed">
                          {currentTds.shampooBehavior}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#4A5D56]">Follicle Impact</p>
                        <p className="text-[#13221D] mt-0.5 leading-relaxed">
                          {currentTds.scalpImpact}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#DFE4DF]">
                        <p className="text-xs font-medium text-[#0F5C4D]">Clinical Takeaway</p>
                        <p className="text-[#13221D] font-medium mt-0.5 leading-relaxed">
                          {currentTds.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Proposed Solution Architecture (The 3 Steps) */}
        <section id="routine" className="border-t border-[#DFE4DF] bg-[#F9FAF8]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-medium text-[#4A5D56]">
                  02. Proposed Solution Architecture
                </p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#13221D] text-balance">
                  Sequential 3-step therapy: chelate first, cleanse gently, then nourish.
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Follicle mechanism steps"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#E9EDE9] rounded-lg w-fit"
              >
                {MECHANISM_STAGES.map((stage) => {
                  const isActive = stage.id === activeStage;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStage(stage.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] ${
                        isActive
                          ? 'bg-white text-[#13221D] shadow-sm'
                          : 'text-[#4A5D56] hover:text-[#13221D]'
                      }`}
                    >
                      {stage.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex flex-col">
                <FollicleDiagram stage={activeStage} />
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-[#DFE4DF] bg-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-[#0F5C4D]">{currentStage.eyebrow}</p>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#13221D] text-balance">
                    {currentStage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A5D56] leading-relaxed">
                    {currentStage.description}
                  </p>
                  <p className="text-sm text-[#13221D] leading-relaxed pt-2 border-t border-[#DFE4DF]">
                    {currentStage.mechanismDetail}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#DFE4DF] text-xs">
                  <div>
                    <span className="text-[#4A5D56] block">Active Formulation Focus</span>
                    <span className="font-medium text-[#13221D] mt-0.5 block">
                      {currentStage.keyActive}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#4A5D56] block">Scalp & Follicle Status</span>
                    <span className="font-medium text-[#0F5C4D] mt-0.5 block">
                      {currentStage.follicleState}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Asymmetric 3-Step Architecture Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {MECHANISM_STAGES.slice(1).map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStage(step.id)}
                  className={`text-left rounded-2xl border p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] ${
                    activeStage === step.id
                      ? 'bg-white border-[#0F5C4D]'
                      : 'bg-white border-[#DFE4DF] hover:border-[#B6C2BC]'
                  }`}
                >
                  <p className="font-mono-tabular text-xs text-[#0F5C4D] font-medium">
                    0{index + 1}. {step.tabLabel}
                  </p>
                  <h4 className="font-display text-lg font-semibold text-[#13221D] mt-2">
                    {step.eyebrow.split('·')[1]?.trim() || step.title}
                  </h4>
                  <p className="text-sm text-[#4A5D56] leading-relaxed mt-2">{step.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Mission, Vision & Innovator */}
        <section id="mission" className="border-t border-[#DFE4DF] bg-white">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-[#DFE4DF] bg-[#F9FAF8] p-6 sm:p-10">
              <div className="lg:col-span-8 space-y-5">
                <p className="text-xs font-medium text-[#4A5D56]">
                  03. Building India’s Self-Reliant Wellness Era
                </p>
                <blockquote className="font-editorial text-xl sm:text-2xl text-[#13221D] leading-snug text-balance">
                  “Transitioning traditional Ayurvedic wellness from an expensive premium luxury into
                  an everyday choice for every Indian family.”
                </blockquote>
                <p className="text-sm sm:text-base text-[#4A5D56] leading-relaxed">
                  <span className="font-semibold text-[#13221D]">The Vision:</span> Proving that
                  humble regional roots, student-led clinical innovation, and a clear scientific
                  hypothesis can solve a massive, hidden national environmental crisis.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center gap-2 lg:border-l lg:border-[#DFE4DF] lg:pl-8">
                <p className="text-xs text-[#4A5D56]">Concept Author</p>
                <p className="font-display text-lg font-semibold text-[#13221D]">
                  Miss. Sneha Sachin Joshi
                </p>
                <p className="text-sm text-[#4A5D56]">First-Year BAMS Student</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pilot Participation & R&D Inquiry */}
        <section id="participate" className="border-t border-[#DFE4DF] bg-[#F9FAF8]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#4A5D56]">04. Connect & Participate</p>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#13221D] text-balance">
                  Join the pilot waitlist or collaborate on R&amp;D.
                </h2>
              </div>

              <p className="text-base text-[#4A5D56] leading-relaxed">
                Connect directly regarding upcoming product trials for high-TDS housing societies or
                GMP cosmetic formulation partnerships.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#DFE4DF]">
                <div className="flex items-center justify-between gap-3 py-1">
                  <a
                    href="mailto:joshisneha241@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#13221D] hover:underline underline-offset-4"
                  >
                    <Mail className="w-4 h-4 text-[#0F5C4D]" aria-hidden="true" />
                    <span>joshisneha241@gmail.com</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('joshisneha241@gmail.com', 'email')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#4A5D56] bg-[#F9FAF8] border border-[#DFE4DF] hover:border-[#B6C2BC] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#0F5C4D]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#DFE4DF] bg-white p-6 sm:p-8 space-y-6">
                <div
                  role="tablist"
                  aria-label="Select inquiry type"
                  className="grid grid-cols-2 gap-1 p-1 bg-[#E9EDE9] rounded-lg"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={inquiryTrack === 'pilot'}
                    onClick={() => {
                      setInquiryTrack('pilot');
                      setSubmitted(false);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      inquiryTrack === 'pilot'
                        ? 'bg-white text-[#13221D] shadow-sm'
                        : 'text-[#4A5D56] hover:text-[#13221D]'
                    }`}
                  >
                    Pilot / Pre-Order
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={inquiryTrack === 'partner'}
                    onClick={() => {
                      setInquiryTrack('partner');
                      setSubmitted(false);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      inquiryTrack === 'partner'
                        ? 'bg-white text-[#13221D] shadow-sm'
                        : 'text-[#4A5D56] hover:text-[#13221D]'
                    }`}
                  >
                    GMP / R&amp;D Collaboration
                  </button>
                </div>

                {submitted ? (
                  <div className="py-10 text-center space-y-4 max-w-md mx-auto">
                    <h3 className="font-display text-xl font-semibold text-[#13221D]">
                      {inquiryTrack === 'pilot'
                        ? 'Pilot Waitlist Request Prepared'
                        : 'Collaboration Note Prepared'}
                    </h3>
                    <p className="text-sm text-[#4A5D56] leading-relaxed">
                      Thank you, {fullName}. Click below to send these details directly to Sneha
                      Joshi via your email app, or reset to edit.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:joshisneha241@gmail.com?subject=${encodeURIComponent(
                          inquiryTrack === 'pilot'
                            ? `Pilot Waitlist / Pre-Order — ${fullName}`
                            : `R&D Collaboration Inquiry — ${fullName}`
                        )}&body=${encodeURIComponent(
                          `Name: ${fullName}\nContact: ${contactInfo}\nCity / Organization: ${cityOrOrg}\n${
                            inquiryTrack === 'pilot'
                              ? `Water Supply: ${waterSource}`
                              : `Collaboration Area: ${collaborationArea}`
                          }\nNotes: ${notes}`
                        )}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#0F5C4D] hover:bg-[#0B463A] rounded-lg transition-colors"
                      >
                        <span>Send via Email App</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2.5 text-xs font-medium text-[#13221D] bg-white border border-[#DFE4DF] hover:border-[#B6C2BC] rounded-lg transition-colors"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block space-y-1.5">
                        <span className="text-xs font-medium text-[#13221D]">Full Name</span>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                        />
                      </label>
                      <label className="block space-y-1.5">
                        <span className="text-xs font-medium text-[#13221D]">
                          Email or Phone
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="you@example.com / +91..."
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block space-y-1.5">
                        <span className="text-xs font-medium text-[#13221D]">
                          {inquiryTrack === 'pilot' ? 'City & Housing Society' : 'Organization / Lab'}
                        </span>
                        <input
                          type="text"
                          placeholder={
                            inquiryTrack === 'pilot' ? 'e.g. Pune / Bengaluru' : 'e.g. GMP Lab / Incubator'
                          }
                          value={cityOrOrg}
                          onChange={(e) => setCityOrOrg(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                        />
                      </label>

                      {inquiryTrack === 'pilot' ? (
                        <label className="block space-y-1.5">
                          <span className="text-xs font-medium text-[#13221D]">
                            Primary Water Source
                          </span>
                          <select
                            value={waterSource}
                            onChange={(e) => setWaterSource(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                          >
                            <option value="Private Water Tanker (500–1,200+ ppm)">
                              Private Water Tanker (500–1,200+ ppm)
                            </option>
                            <option value="Borewell / High-TDS Groundwater">
                              Borewell / High-TDS Groundwater
                            </option>
                            <option value="Mixed Municipal + Tanker Supply">
                              Mixed Municipal + Tanker Supply
                            </option>
                          </select>
                        </label>
                      ) : (
                        <label className="block space-y-1.5">
                          <span className="text-xs font-medium text-[#13221D]">
                            Collaboration Area
                          </span>
                          <select
                            value={collaborationArea}
                            onChange={(e) => setCollaborationArea(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                          >
                            <option value="GMP Lab Formulation & Stability">
                              GMP Lab Formulation &amp; Stability
                            </option>
                            <option value="Ayurvedic Botanical Standardization">
                              Ayurvedic Botanical Standardization
                            </option>
                            <option value="Trichoscopy & Clinical Mentorship">
                              Trichoscopy &amp; Clinical Mentorship
                            </option>
                          </select>
                        </label>
                      )}
                    </div>

                    <label className="block space-y-1.5">
                      <span className="text-xs font-medium text-[#13221D]">Message</span>
                      <textarea
                        rows={3}
                        placeholder={
                          inquiryTrack === 'pilot'
                            ? 'Share your scalp concerns or interest in the ₹499–₹549 30-day starter kit...'
                            : 'Share how you would like to collaborate on formulation or clinical testing...'
                        }
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DFE4DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5C4D] resize-none"
                      />
                    </label>

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <span className="text-xs text-[#4A5D56]">
                        {inquiryTrack === 'pilot'
                          ? 'Target Kit Price: ₹499 – ₹549 (30 Days)'
                          : 'Direct response from Sneha Joshi'}
                      </span>
                      <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-[#0F5C4D] hover:bg-[#0B463A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F5C4D]"
                      >
                        {inquiryTrack === 'pilot' ? 'Reserve Pilot Spot' : 'Send Inquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#DFE4DF] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4A5D56]">
          <p>
            © 2026 Hard-Water Scalp Therapeutics · Innovated by Miss. Sneha Sachin Joshi (BAMS 1st
            Year)
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#problem" className="hover:text-[#13221D] transition-colors">
              Problem
            </a>
            <a href="#routine" className="hover:text-[#13221D] transition-colors">
              3-Step Routine
            </a>
            <a href="#mission" className="hover:text-[#13221D] transition-colors">
              Our Mission
            </a>
            <a href="#participate" className="hover:text-[#13221D] transition-colors">
              Connect
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
