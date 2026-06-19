import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Play,
  Droplets,
  Calculator,
  Wallet,
  Package,
  FileDown,
  Languages,
  Gauge,
  Clock,
  Wifi,
  ShieldCheck,
  Check,
  Phone,
  MapPin,
  Sparkles,
  Download,
} from "lucide-react";

const APK_URL =
  "https://www.dropbox.com/scl/fi/etxqrxgs05ab4lbknga8b/dairypro.apk?rlkey=jxkhtjifot7kefpys3xhbpxk3&st=zhz8sjaw&dl=1";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DairyPro ERP — Fat/SNF Pricing & Smart Milk Ledger" },
      {
        name: "description",
        content:
          "Automate milk collection, instant Fat/SNF price matching, and one-tap settlements. Offline-ready dairy ERP for owners and farmers across India.",
      },
      { property: "og:title", content: "DairyPro ERP — Fat/SNF Pricing & Smart Milk Ledger" },
      {
        property: "og:description",
        content:
          "Algorithmic Fat/SNF pricing, transparent ledgers, one-tap settlements. Built for rural India, works on 2G.",
      },
      { property: "og:url", content: "https://dairyproerp.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "DairyPro ERP — Fat/SNF Pricing & Smart Milk Ledger" },
      {
        name: "twitter:description",
        content:
          "Algorithmic Fat/SNF pricing, transparent ledgers, one-tap settlements for dairies and farmers.",
      },
    ],
    links: [{ rel: "canonical", href: "https://dairyproerp.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DairyPro ERP",
          url: "https://dairyproerp.lovable.app",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-98765-43210",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "DairyPro ERP",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Android",
          description:
            "Smart dairy ERP with Fat/SNF algorithmic pricing, ledger, inventory and one-tap settlements.",
          offers: [
            { "@type": "Offer", name: "Pilot", price: "0", priceCurrency: "INR" },
            { "@type": "Offer", name: "Growth", price: "2499", priceCurrency: "INR" },
          ],
        }),
      },
    ],
  }),
  component: Landing,
});

type Lang = "en" | "hi";

const copy = {
  en: {
    nav: { features: "Features", calculator: "Pricing Engine", pricing: "Pricing", contact: "Contact" },
    cta: { demo: "Request Live Demo", watch: "Watch 2-Min Walkthrough" },
    hero: {
      pill: "Built for Rural India · Offline-Ready",
      h1a: "The Smart ERP for",
      h1b: "Modern Dairies & Farmers",
      sub: "Automate milk collection, calculate pricing charts instantly with Fat/SNF nearest-matching, and settle payments in one tap. Fast, offline-compatible, and transparent.",
    },
  },
  hi: {
    nav: { features: "विशेषताएँ", calculator: "मूल्य इंजन", pricing: "योजनाएँ", contact: "संपर्क" },
    cta: { demo: "लाइव डेमो बुक करें", watch: "2-मिनट वीडियो देखें" },
    hero: {
      pill: "ग्रामीण भारत के लिए · ऑफ़लाइन-तैयार",
      h1a: "आधुनिक डेयरी और किसानों के लिए",
      h1b: "स्मार्ट ERP प्लेटफ़ॉर्म",
      sub: "दूध संग्रहण स्वचालित करें, Fat/SNF के आधार पर तुरंत सही दर पाएं, और एक टैप में भुगतान निपटाएं। तेज़, ऑफ़लाइन और पारदर्शी।",
    },
  },
};

/* Tiny price matrix (Fat 3–10, SNF 7–11). 2D Euclidean nearest match. */
const PRICE_MATRIX: { fat: number; snf: number; rate: number }[] = (() => {
  const rows: { fat: number; snf: number; rate: number }[] = [];
  for (let f = 3; f <= 10; f += 0.5) {
    for (let s = 7; s <= 11; s += 0.5) {
      // Indicative rural India rate formula
      const rate = 18 + f * 3.4 + s * 1.2;
      rows.push({ fat: f, snf: s, rate: Math.round(rate * 100) / 100 });
    }
  }
  return rows;
})();

function nearestRate(fat: number, snf: number) {
  let best = PRICE_MATRIX[0];
  let bestDist = Infinity;
  for (const p of PRICE_MATRIX) {
    const d = (p.fat - fat) ** 2 + (p.snf - snf) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return best;
}

function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <Logos />
      <CalculatorSection />
      <FeatureTabs />
      <Metrics />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}

function Nav({ t, lang, setLang }: { t: typeof copy.en; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-elevated)]">
            <Droplets className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">DairyPro<span className="text-primary"> ERP</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">{t.nav.features}</a>
          <a href="#calculator" className="transition-colors hover:text-foreground">{t.nav.calculator}</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">{t.nav.pricing}</a>
          <a href="#contact" className="transition-colors hover:text-foreground">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border bg-secondary p-1 text-xs font-semibold sm:flex">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 transition-colors ${lang === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`rounded-full px-3 py-1 transition-colors ${lang === "hi" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              हिं
            </button>
          </div>
          <Button asChild className="rounded-full">
            <a href="#contact">{t.cta.demo} <ArrowRight className="h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }: { t: typeof copy.en }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-0 h-[640px] opacity-70"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-12 lg:pt-24">
        <div className="lg:col-span-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> {t.hero.pill}
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-slate-ink sm:text-6xl lg:text-[68px]">
            {t.hero.h1a}{" "}
            <span className="gradient-text">{t.hero.h1b}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="group h-12 rounded-full px-7 text-base shadow-[var(--shadow-elevated)]">
              {t.cta.demo}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6 text-base">
              <a href={APK_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" /> Download App
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="h-12 rounded-full px-6 text-base">
              <Play className="h-4 w-4" /> {t.cta.watch}
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            {[
              { icon: ShieldCheck, label: "99.9% pricing accuracy" },
              { icon: Wifi, label: "Works on 2G" },
              { icon: Languages, label: "English + हिंदी" },
            ].map((i) => (
              <div key={i.label} className="flex items-center gap-2">
                <i.icon className="h-4 w-4 text-primary" /> {i.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="glass-card relative overflow-hidden rounded-3xl p-3 animate-fade-up">
            <img
              src={heroDashboard}
              alt="DairyPro owner dashboard preview"
              className="h-auto w-full rounded-2xl"
            />
          </div>
          {/* Floating phone passbook */}
          <div className="glass-card absolute -bottom-8 -left-6 w-56 rounded-3xl p-3 shadow-[var(--shadow-elevated)] hidden sm:block animate-fade-up">
            <div className="rounded-2xl bg-slate-ink p-4 text-white">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
                <span>Farmer Passbook</span><span>हिं</span>
              </div>
              <div className="mt-2 text-xs text-white/70">Ramesh Patel</div>
              <div className="mt-1 text-2xl font-bold">₹ 4,820.50</div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                {[
                  ["Mon AM", "8.2L · F4.1", "₹372"],
                  ["Mon PM", "6.5L · F4.4", "₹304"],
                  ["Tue AM", "8.8L · F4.0", "₹398"],
                ].map((r) => (
                  <div key={r[0]} className="flex items-center justify-between border-t border-white/10 pt-1.5">
                    <span className="text-white/60">{r[0]}</span>
                    <span className="text-white/80">{r[1]}</span>
                    <span className="font-semibold">{r[2]}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-[11px] font-semibold">
                <FileDown className="h-3 w-3" /> Download PDF
              </button>
            </div>
          </div>
          {/* Floating settlement chip */}
          <div className="glass-card absolute -right-4 top-10 hidden rounded-2xl px-4 py-3 md:flex md:items-center md:gap-3 animate-fade-up">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-success/15 text-success">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Settled today</div>
              <div className="text-sm font-bold text-slate-ink">₹ 1,82,640</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <div className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="text-xs">Trusted by dairies in</span>
        {["Indore", "Bhopal", "Dewas", "Ujjain", "Ratlam", "Nashik"].map((c) => (
          <span key={c} className="text-foreground/70">{c}</span>
        ))}
      </div>
    </div>
  );
}

function CalculatorSection() {
  const [fat, setFat] = useState(4.2);
  const [snf, setSnf] = useState(8.5);
  const match = useMemo(() => nearestRate(fat, snf), [fat, snf]);

  return (
    <section id="calculator" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <Calculator className="h-3.5 w-3.5" /> Algorithmic Precision Matrix
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Try the <span className="gradient-text">2D Euclidean</span> Price Matcher
          </h2>
          <p className="mt-4 text-muted-foreground">
            Move the Fat & SNF sliders. The engine instantly finds the nearest point on your pricing matrix — no more manual errors or disputes.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:grid-cols-5 md:p-10">
          <div className="md:col-span-3 space-y-7">
            <SliderRow
              label="Fat %"
              value={fat}
              min={3}
              max={10}
              step={0.1}
              onChange={setFat}
              suffix="%"
              color="primary"
            />
            <SliderRow
              label="SNF %"
              value={snf}
              min={7}
              max={11}
              step={0.1}
              onChange={setSnf}
              suffix="%"
              color="success"
            />
            <div className="rounded-xl bg-secondary/60 p-4 text-xs text-muted-foreground">
              Matched matrix point: <span className="font-semibold text-foreground">Fat {match.fat.toFixed(1)}% · SNF {match.snf.toFixed(1)}%</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl bg-[var(--gradient-primary)] p-6 text-primary-foreground">
              <div className="text-xs font-semibold uppercase tracking-widest text-white/70">Live rate</div>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-6xl font-bold leading-none">₹{match.rate.toFixed(2)}</span>
                <span className="pb-2 text-sm text-white/80">/ Liter</span>
              </div>
              <div className="relative mt-6 h-32">
                {/* Mini matrix viz */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 gap-1 opacity-50">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="rounded bg-white/10" />
                  ))}
                </div>
                <div
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pulse-ring"
                  style={{
                    left: `${((fat - 3) / 7) * 100}%`,
                    top: `${100 - ((snf - 7) / 4) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-white/70">
                <span>Fat axis</span><span>SNF axis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label, value, min, max, step, onChange, suffix, color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix: string;
  color: "primary" | "success";
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackColor = color === "primary" ? "var(--color-primary)" : "var(--color-success)";
  const inputId = `slider-${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={inputId} className="text-sm font-semibold text-foreground">{label}</label>
        <span className="text-2xl font-bold tabular-nums" style={{ color: trackColor }}>
          {value.toFixed(1)}{suffix}
        </span>
      </div>
      <input
        id={inputId}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-[color:var(--ring)]"
        style={{
          background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${pct}%, var(--color-secondary) ${pct}%, var(--color-secondary) 100%)`,
        }}
      />
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{min.toFixed(1)}{suffix}</span><span>{max.toFixed(1)}{suffix}</span>
      </div>
    </div>
  );
}

const OWNER_FEATURES = [
  {
    icon: Droplets,
    title: "Smart Collections",
    desc: "Log every deposit in 3 seconds with auto-pricing using the Fat/SNF matrix.",
  },
  {
    icon: Package,
    title: "Cattle Feed Inventory",
    desc: "Distribute feed bags and auto-link deductibles to each seller's next settlement.",
  },
  {
    icon: Wallet,
    title: "One-Tap Settlements",
    desc: "Generate itemized invoices: gross earnings, feed deductions, net payout.",
  },
];
const FARMER_FEATURES = [
  {
    icon: Gauge,
    title: "Live Ledger",
    desc: "Transparent logs by shift (Morning/Evening) with Fat/SNF breakdown and status.",
  },
  {
    icon: FileDown,
    title: "Downloadable PDFs",
    desc: "One-click, print-ready statement compilation. No more paper passbooks.",
  },
  {
    icon: Languages,
    title: "Multilingual UI",
    desc: "Fully localized in English and हिंदी for every farmer's comfort.",
  },
];

function FeatureTabs() {
  const [tab, setTab] = useState<"owner" | "farmer">("owner");
  const items = tab === "owner" ? OWNER_FEATURES : FARMER_FEATURES;
  return (
    <section id="features" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Two consoles, <span className="gradient-text">one platform</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Purpose-built workflows for collection centers and for the farmers who supply them.
          </p>
        </div>

        <div className="mx-auto mt-10 flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1.5 shadow-[var(--shadow-soft)]">
          {([
            ["owner", "For Dairy Owners"],
            ["farmer", "For Milk Sellers"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                tab === k ? "bg-slate-ink text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [
    { v: "15 min", l: "Avg settlement turnaround", icon: Clock },
    { v: "99.9%", l: "Pricing accuracy (Euclidean-matched)", icon: ShieldCheck },
    { v: "3 hrs/day", l: "Reclaimed from manual ledger books", icon: Gauge },
    { v: "2G ready", l: "Optimized for rural connectivity", icon: Wifi },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.l} className="rounded-2xl border border-border bg-card p-6">
              <m.icon className="h-5 w-5 text-primary" />
              <div className="mt-4 text-4xl font-bold tracking-tight text-slate-ink">{m.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Krishna Patidar",
      loc: "Krishna Dairy · Indore, MP",
      quote:
        "Before DairyPro, calculations were prone to disputes. Now farmers receive instant SMS and can download statements on their own phones. Trust has doubled.",
    },
    {
      name: "Ramesh Patel",
      loc: "Dairy Farmer · Dewas, MP",
      quote:
        "I see every morning and evening shift with Fat/SNF and rate. Feed deductions are clear. I download my monthly PDF in one tap — in हिंदी.",
    },
    {
      name: "Sunita Verma",
      loc: "Sangam Collection · Bhopal, MP",
      quote:
        "Settlement that took 3 hours of bookkeeping now closes in 15 minutes. The Fat/SNF matrix removed every pricing argument we used to have.",
    },
  ];
  return (
    <section className="bg-slate-ink py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Loved by dairies & farmers across India
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((tst) => (
            <figure
              key={tst.name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
            >
              <blockquote className="text-base leading-relaxed text-white/90">"{tst.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-primary)] text-sm font-bold">
                  {tst.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{tst.name}</div>
                  <div className="text-xs text-white/60">{tst.loc}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      tag: "Free Pilot",
      price: "₹0",
      sub: "per month",
      features: [
        "Up to 15 active sellers",
        "Basic Fat/SNF price charts",
        "Offline collection logs",
        "Email support",
      ],
      cta: "Start free pilot",
      featured: false,
    },
    {
      name: "Enterprise",
      tag: "Growth",
      price: "₹2,499",
      sub: "per month, per center",
      features: [
        "Unlimited sellers",
        "Automated WhatsApp briefs",
        "OneSignal push alerts",
        "Direct invoice & PDF exports",
        "Multi-shift, multi-center",
        "Priority onboarding",
      ],
      cta: "Talk to sales",
      featured: true,
    },
  ];
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with a free pilot. Upgrade when your dairy is ready to scale.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 ${
                t.featured
                  ? "border-2 border-primary bg-card shadow-[var(--shadow-elevated)]"
                  : "border border-border bg-card shadow-[var(--shadow-soft)]"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t.tag}
              </div>
              <div className="mt-1 text-2xl font-bold">{t.name}</div>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-slate-ink">{t.price}</span>
                <span className="pb-2 text-sm text-muted-foreground">{t.sub}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 ${t.featured ? "text-success" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full rounded-full ${t.featured ? "" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                size="lg"
              >
                {t.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-soft)] md:p-14">
          <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Ready to modernize your dairy?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Book a 20-minute live demo. We'll set up a free pilot for your collection center within 48 hours.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Serving Indore · Bhopal · Dewas · Ujjain</div>
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3 rounded-2xl border border-border bg-background p-6"
            >
              <input
                aria-label="Your name"
                placeholder="Your name"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary"
              />
              <input
                aria-label="Phone number"
                placeholder="Phone number"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary"
              />
              <input
                aria-label="Dairy location"
                placeholder="Dairy location (Indore, Bhopal…)"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" size="lg" className="w-full rounded-lg">
                Request Live Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                No credit card. No spam. We respond within 1 business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-[var(--gradient-primary)]">
            <Droplets className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">DairyPro ERP</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 font-medium text-primary-foreground hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" /> Download App
          </a>
        </div>
      </div>
    </footer>
  );
}
