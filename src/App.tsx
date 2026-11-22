import { FormEvent, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    if (!fullName.trim() || !contactInfo.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://web3forms.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '01209742-c2a8-415b-b604-293e3852b9d1',
          subject:
            inquiryTrack === 'pilot'
              ? `Pilot Waitlist / Pre-Order — ${fullName}`
              : `R&D Collaboration Inquiry — ${fullName}`,
          from_name: 'Hard-Water Scalp Therapeutics Website',
          inquiry_type:
            inquiryTrack === 'pilot'
              ? 'Pilot / Pre-Order'
              : 'GMP / R&D Collaboration',
          full_name: fullName,
          contact_info: contactInfo,
          city_or_organization: cityOrOrg || 'Not specified',
          [inquiryTrack === 'pilot' ? 'primary_water_source' : 'collaboration_area']:
            inquiryTrack === 'pilot' ? waterSource : collaborationArea,
          message: notes || 'No additional notes provided.',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setContactInfo('');
    setCityOrOrg('');
    setNotes('');
    setSubmitted(false);
    setSubmitError(null);
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
                  <span aria-hidden="true">→</span>
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
