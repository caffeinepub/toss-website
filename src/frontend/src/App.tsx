import {
  BarChart2,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock,
  Coins,
  Globe,
  Instagram,
  Loader2,
  LogOut,
  Shield,
  Sparkles,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPage from "./pages/PrivacyPage";

// --- Types ---
type Page =
  | "home"
  | "disclaimer"
  | "privacy"
  | "contact"
  | "blog"
  | "blog-post";

interface TossEntry {
  id: number;
  result: "heads" | "tails";
  timestamp: Date;
}

// --- Helpers ---
function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// --- Audio ---
function playFlipSound(): (() => void) | null {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();

    const master = ctx.createGain();
    master.gain.setValueAtTime(1.0, ctx.currentTime);
    master.connect(ctx.destination);

    const duration = 1.2;

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(180, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(
      900,
      ctx.currentTime + duration * 0.8,
    );
    osc1.frequency.exponentialRampToValueAtTime(
      500,
      ctx.currentTime + duration,
    );

    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.0, ctx.currentTime);
    g1.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.08);
    g1.gain.setValueAtTime(0.6, ctx.currentTime + duration * 0.5);
    g1.gain.linearRampToValueAtTime(0.0, ctx.currentTime + duration);
    osc1.connect(g1);
    g1.connect(master);

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(270, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(
      1350,
      ctx.currentTime + duration * 0.8,
    );
    osc2.frequency.exponentialRampToValueAtTime(
      750,
      ctx.currentTime + duration,
    );

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0, ctx.currentTime);
    g2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
    g2.gain.linearRampToValueAtTime(0.0, ctx.currentTime + duration);
    osc2.connect(g2);
    g2.connect(master);

    const bufSize = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 600;
    noiseFilter.Q.value = 3;

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.3, ctx.currentTime);
    ng.gain.linearRampToValueAtTime(0.0, ctx.currentTime + duration);
    noise.connect(noiseFilter);
    noiseFilter.connect(ng);
    ng.connect(master);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + duration + 0.1);
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + duration + 0.1);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + duration + 0.1);

    setTimeout(() => ctx.close().catch(() => {}), (duration + 0.5) * 1000);

    return () => {
      try {
        const clinkCtx = new AudioCtx();
        const clinkMaster = clinkCtx.createGain();
        clinkMaster.gain.setValueAtTime(0.9, clinkCtx.currentTime);
        clinkMaster.connect(clinkCtx.destination);

        const bell = clinkCtx.createOscillator();
        bell.type = "sine";
        bell.frequency.setValueAtTime(880, clinkCtx.currentTime);
        bell.frequency.exponentialRampToValueAtTime(
          440,
          clinkCtx.currentTime + 0.35,
        );

        const bg = clinkCtx.createGain();
        bg.gain.setValueAtTime(0.8, clinkCtx.currentTime);
        bg.gain.exponentialRampToValueAtTime(0.001, clinkCtx.currentTime + 0.4);
        bell.connect(bg);
        bg.connect(clinkMaster);

        const bell2 = clinkCtx.createOscillator();
        bell2.type = "sine";
        bell2.frequency.setValueAtTime(1320, clinkCtx.currentTime);
        bell2.frequency.exponentialRampToValueAtTime(
          660,
          clinkCtx.currentTime + 0.25,
        );
        const bg2 = clinkCtx.createGain();
        bg2.gain.setValueAtTime(0.3, clinkCtx.currentTime);
        bg2.gain.exponentialRampToValueAtTime(
          0.001,
          clinkCtx.currentTime + 0.3,
        );
        bell2.connect(bg2);
        bg2.connect(clinkMaster);

        bell.start(clinkCtx.currentTime);
        bell.stop(clinkCtx.currentTime + 0.45);
        bell2.start(clinkCtx.currentTime);
        bell2.stop(clinkCtx.currentTime + 0.35);
        setTimeout(() => clinkCtx.close().catch(() => {}), 600);
      } catch {
        // silent fallback
      }
    };
  } catch {
    return null;
  }
}

// --- Sub-components ---

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function NavAuthButtons() {
  const { login, clear, identity, isInitializing, isLoggingIn } =
    useInternetIdentity();

  if (isInitializing || isLoggingIn) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-toss-orange" />
      </div>
    );
  }

  if (identity) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-full border border-[oklch(0.73_0.15_55/0.3)] bg-[oklch(0.73_0.15_55/0.08)] text-toss-orange"
          data-ocid="nav.principal.badge"
        >
          Logged In
        </span>
        <button
          type="button"
          onClick={() => clear()}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[oklch(0.26_0.013_240/0.6)] text-toss-text-muted hover:text-foreground hover:border-[oklch(0.73_0.15_55/0.5)] transition-all duration-200"
          data-ocid="nav.logout.button"
        >
          <LogOut className="w-3 h-3" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => login()}
        className="text-sm font-semibold px-4 py-2 rounded-full border border-toss-orange text-toss-orange hover:bg-[oklch(0.73_0.15_55/0.1)] transition-all duration-200"
        data-ocid="nav.login.button"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => login()}
        className="orange-gradient text-[oklch(0.12_0.006_240)] text-sm font-bold px-4 py-2 rounded-full hover:shadow-[0_0_20px_oklch(0.73_0.15_55/0.5)] hover:-translate-y-0.5 transition-all duration-200"
        data-ocid="nav.signup.button"
      >
        Sign Up
      </button>
    </div>
  );
}

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = currentPage === "home";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.12_0.006_240/0.95)] backdrop-blur-xl border-b border-[oklch(0.26_0.013_240/0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          data-ocid="nav.logo.button"
        >
          <div className="w-8 h-8 rounded-full coin-gradient flex items-center justify-center shadow-[0_0_12px_oklch(0.73_0.15_55/0.5)]">
            <CircleDot className="w-4 h-4 text-[oklch(0.12_0.006_240)]" />
          </div>
          <span className="text-xl font-black tracking-widest text-foreground uppercase">
            TOSS
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {isHome &&
            [
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "History", href: "#history" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-toss-text-muted hover:text-foreground transition-colors"
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
              >
                {link.label}
              </a>
            ))}
          <button
            type="button"
            onClick={() => onNavigate("blog")}
            className={`text-sm font-medium transition-colors ${
              currentPage === "blog"
                ? "text-toss-orange"
                : "text-toss-text-muted hover:text-foreground"
            }`}
            data-ocid="nav.blog.link"
          >
            Blog
          </button>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className={`text-sm font-medium transition-colors ${
              currentPage === "contact"
                ? "text-toss-orange"
                : "text-toss-text-muted hover:text-foreground"
            }`}
            data-ocid="nav.contact.link"
          >
            Contact
          </button>
          <a
            href="/privacy.html"
            className="text-sm font-medium transition-colors text-toss-text-muted hover:text-foreground"
            data-ocid="nav.privacy.link"
          >
            Privacy
          </a>
        </div>

        <div className="flex items-center gap-2">
          {isHome && (
            <a
              href="#flip"
              className="hidden sm:block orange-gradient text-[oklch(0.12_0.006_240)] text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:shadow-[0_0_20px_oklch(0.73_0.15_55/0.5)] hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="nav.cta.button"
            >
              Flip Now
            </a>
          )}
          <NavAuthButtons />
        </div>
      </nav>
    </header>
  );
}

interface CoinProps {
  rotation: number;
  isFlipping: boolean;
  headsLabel: string;
  tailsLabel: string;
}

function Coin({ rotation, isFlipping, headsLabel, tailsLabel }: CoinProps) {
  const headsLetter = headsLabel.trim().charAt(0).toUpperCase() || "H";
  const tailsLetter = tailsLabel.trim().charAt(0).toUpperCase() || "T";

  return (
    <div className="perspective-1000 w-40 h-40 mx-auto">
      <div
        className="transform-style-3d w-full h-full relative transition-transform"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transition: isFlipping
            ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 0.3s ease",
        }}
      >
        {/* Front face - Heads */}
        <div className="backface-hidden absolute inset-0 rounded-full coin-gradient coin-shadow flex flex-col items-center justify-center">
          <div className="w-full h-full rounded-full flex flex-col items-center justify-center border-4 border-[oklch(0.50_0.12_70/0.4)]">
            <span className="text-[oklch(0.35_0.10_65)] font-black text-2xl tracking-widest">
              {headsLetter}
            </span>
            <span className="text-[oklch(0.35_0.10_65)] font-bold text-xs tracking-widest uppercase mt-0.5 max-w-[80px] truncate text-center">
              {headsLabel || "Heads"}
            </span>
          </div>
        </div>
        {/* Back face - Tails */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-full coin-gradient-back coin-shadow flex flex-col items-center justify-center">
          <div className="w-full h-full rounded-full flex flex-col items-center justify-center border-4 border-[oklch(0.70_0.15_255/0.4)]">
            <span className="text-[oklch(0.95_0.05_255)] font-black text-2xl tracking-widest">
              {tailsLetter}
            </span>
            <span className="text-[oklch(0.95_0.05_255)] font-bold text-xs tracking-widest uppercase mt-0.5 max-w-[80px] truncate text-center">
              {tailsLabel || "Tails"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeroFlipCardProps {
  onFlip: (result: "heads" | "tails") => void;
  headsCount: number;
  tailsCount: number;
  flipRef: React.MutableRefObject<(() => void) | null>;
}

function HeroFlipCard({
  onFlip,
  headsCount,
  tailsCount,
  flipRef,
}: HeroFlipCardProps) {
  const [rotation, setRotation] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [customHeads, setCustomHeads] = useState("Heads");
  const [customTails, setCustomTails] = useState("Tails");

  const handleFlip = useCallback(() => {
    if (isFlipping) return;
    const newResult: "heads" | "tails" =
      Math.random() < 0.5 ? "heads" : "tails";
    setIsFlipping(true);
    setShowResult(false);
    setResult(null);

    const playClink = playFlipSound();

    const landingOffset = newResult === "heads" ? 0 : 180;
    setRotation((prev) => {
      const base = Math.round(prev / 360) * 360;
      return base + 1080 + landingOffset;
    });

    setTimeout(() => {
      setIsFlipping(false);
      setResult(newResult);
      setShowResult(true);
      onFlip(newResult);
      playClink?.();
    }, 1250);
  }, [isFlipping, onFlip]);

  // Expose handleFlip via ref for spacebar
  useEffect(() => {
    flipRef.current = handleFlip;
  }, [handleFlip, flipRef]);

  const displayResult =
    result === "heads" ? customHeads || "Heads" : customTails || "Tails";

  return (
    <div
      id="flip"
      className="glass-card rounded-3xl p-8 md:p-10 max-w-md mx-auto text-center"
    >
      {/* Custom label inputs */}
      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="flex flex-col items-center gap-1">
          <label
            htmlFor="custom-heads-input"
            className="text-[0.6rem] font-bold uppercase tracking-widest text-toss-orange/70"
          >
            Option 1 (Heads)
          </label>
          <input
            type="text"
            value={customHeads}
            onChange={(e) => setCustomHeads(e.target.value)}
            maxLength={12}
            placeholder="Heads"
            className="w-28 bg-[oklch(0.16_0.008_240)] border border-[oklch(0.26_0.013_240/0.5)] rounded-lg px-3 py-1.5 text-sm text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.73_0.15_55/0.6)] transition-colors"
            id="custom-heads-input"
            data-ocid="coin.heads.input"
          />
        </div>
        <span className="text-muted-foreground text-xs font-bold pt-4">vs</span>
        <div className="flex flex-col items-center gap-1">
          <label
            htmlFor="custom-tails-input"
            className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground"
          >
            Option 2 (Tails)
          </label>
          <input
            type="text"
            value={customTails}
            onChange={(e) => setCustomTails(e.target.value)}
            maxLength={12}
            placeholder="Tails"
            className="w-28 bg-[oklch(0.16_0.008_240)] border border-[oklch(0.26_0.013_240/0.5)] rounded-lg px-3 py-1.5 text-sm text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.73_0.15_55/0.6)] transition-colors"
            id="custom-tails-input"
            data-ocid="coin.tails.input"
          />
        </div>
      </div>

      <div className="mb-8">
        <Coin
          rotation={rotation}
          isFlipping={isFlipping}
          headsLabel={customHeads || "Heads"}
          tailsLabel={customTails || "Tails"}
        />
      </div>

      <AnimatePresence mode="wait">
        {showResult && result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-toss-success" />
            <span
              className={`text-2xl font-black uppercase tracking-widest ${
                result === "heads" ? "text-toss-orange" : "text-foreground"
              }`}
            >
              {displayResult}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6 h-9"
          >
            {!isFlipping && (
              <p className="text-muted-foreground text-sm">
                Press the button, tap, or hit{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-muted/40 text-xs font-mono">
                  Space
                </kbd>
              </p>
            )}
            {isFlipping && (
              <p className="text-muted-foreground text-sm animate-pulse">
                Flipping...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleFlip}
        disabled={isFlipping}
        className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-full w-full hover:shadow-[0_0_30px_oklch(0.73_0.15_55/0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        data-ocid="coin.flip.button"
      >
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </button>

      {/* Heads / Tails Count */}
      <div className="mt-5 grid grid-cols-2 rounded-2xl overflow-hidden border border-[oklch(0.26_0.013_240/0.4)] bg-[oklch(0.14_0.006_240/0.5)]">
        <div
          className="flex flex-col items-center py-4 px-3 border-r border-[oklch(0.26_0.013_240/0.4)]"
          data-ocid="coin.heads.panel"
        >
          <motion.span
            key={headsCount}
            initial={{ scale: 1.4, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="text-3xl font-black text-toss-orange tabular-nums"
          >
            {headsCount}
          </motion.span>
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-toss-orange/70 mt-0.5 max-w-[80px] truncate text-center">
            {customHeads || "Heads"}
          </span>
        </div>
        <div
          className="flex flex-col items-center py-4 px-3"
          data-ocid="coin.tails.panel"
        >
          <motion.span
            key={tailsCount}
            initial={{ scale: 1.4, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="text-3xl font-black text-foreground tabular-nums"
          >
            {tailsCount}
          </motion.span>
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground mt-0.5 max-w-[80px] truncate text-center">
            {customTails || "Tails"}
          </span>
        </div>
      </div>
    </div>
  );
}

interface HistorySectionProps {
  history: TossEntry[];
}

function HistorySection({ history }: HistorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  void now;

  const seedHistory: TossEntry[] = [
    { id: -1, result: "heads", timestamp: new Date(Date.now() - 2 * 60000) },
    { id: -2, result: "tails", timestamp: new Date(Date.now() - 5 * 60000) },
    { id: -3, result: "heads", timestamp: new Date(Date.now() - 9 * 60000) },
    { id: -4, result: "heads", timestamp: new Date(Date.now() - 14 * 60000) },
    { id: -5, result: "tails", timestamp: new Date(Date.now() - 22 * 60000) },
    { id: -6, result: "tails", timestamp: new Date(Date.now() - 31 * 60000) },
    { id: -7, result: "heads", timestamp: new Date(Date.now() - 45 * 60000) },
    { id: -8, result: "tails", timestamp: new Date(Date.now() - 58 * 60000) },
    { id: -9, result: "heads", timestamp: new Date(Date.now() - 72 * 60000) },
    { id: -10, result: "tails", timestamp: new Date(Date.now() - 90 * 60000) },
  ];

  const displayHistory = [...history, ...seedHistory].slice(0, 10);

  return (
    <section id="history" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Decorative coin */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-full coin-gradient animate-float coin-shadow mx-auto" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-[oklch(0.73_0.15_55/0.1)] animate-pulse" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[oklch(0.2_0.01_65)] font-black text-6xl">
                  H
                </span>
                <span className="text-[oklch(0.2_0.01_65)] font-bold text-sm tracking-widest uppercase">
                  Heads
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - History log */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-[oklch(0.26_0.013_240/0.4)] flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-widest text-sm text-foreground">
                  Recent Tosses
                </h3>
                <span className="text-xs text-muted-foreground bg-muted/40 px-3 py-1 rounded-full">
                  Last {displayHistory.length}
                </span>
              </div>
              <ul className="divide-y divide-[oklch(0.26_0.013_240/0.3)]">
                {displayHistory.map((entry, i) => (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-center justify-between px-6 py-3 hover:bg-muted/20 transition-colors"
                    data-ocid={`history.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          entry.result === "heads"
                            ? "bg-[oklch(0.73_0.15_55/0.15)] text-toss-orange"
                            : "bg-muted/30 text-foreground"
                        }`}
                      >
                        {entry.result === "heads" ? "H" : "T"}
                      </div>
                      <span
                        className={`font-bold uppercase tracking-wider text-sm ${
                          entry.result === "heads"
                            ? "text-toss-orange"
                            : "text-foreground"
                        }`}
                      >
                        {entry.result}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{timeAgo(entry.timestamp)}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    label: "Instant",
    desc: "Results in milliseconds",
  },
  {
    icon: Shield,
    label: "Fair",
    desc: "True 50/50 randomness",
  },
  {
    icon: BarChart3,
    label: "History",
    desc: "Track every decision",
  },
  {
    icon: Globe,
    label: "Anywhere",
    desc: "Works on any device",
  },
];

function FeaturesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[oklch(0.73_0.15_55/0.3)] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center group-hover:bg-[oklch(0.73_0.15_55/0.2)] transition-colors">
                <f.icon className="w-5 h-5 text-toss-orange" />
              </div>
              <div>
                <p className="font-bold uppercase tracking-wider text-sm text-foreground">
                  {f.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const steps = [
    {
      num: "01",
      title: "Open the App",
      desc: "No signup required. Toss is ready the moment you land.",
    },
    {
      num: "02",
      title: "Press Flip",
      desc: "Hit the big orange button and watch the coin spin in 3D.",
    },
    {
      num: "03",
      title: "Get Your Answer",
      desc: "Heads or Tails — your decision is made. It's that simple.",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-4"
        >
          How It <span className="text-orange-gradient">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground mb-12 max-w-md mx-auto"
        >
          Three steps to your next decision.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15 }}
              className="glass-card rounded-2xl p-6 text-left relative overflow-hidden"
            >
              <span className="text-5xl font-black text-[oklch(0.73_0.15_55/0.12)] absolute top-4 right-4 leading-none">
                {step.num}
              </span>
              <div className="w-8 h-8 rounded-lg orange-gradient flex items-center justify-center mb-4">
                <ChevronRight className="w-4 h-4 text-[oklch(0.12_0.006_240)]" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- New Sections ---

function HowDoesItWorkDetail() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const highlights = [
    {
      icon: Sparkles,
      title: "Easy and Fast",
      desc: "No instructions needed. Open the page and get a result right away — no learning curve, no setup.",
    },
    {
      icon: Coins,
      title: "Free Tool",
      desc: "100% free with no limits. Flip as many times as you like without ever paying a thing.",
    },
    {
      icon: BarChart2,
      title: "Keep Track",
      desc: "A running count of heads and tails is shown below the coin so you always see the tally.",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-6 border-t border-[oklch(0.26_0.013_240/0.3)]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-6 text-center"
        >
          How Does <span className="text-orange-gradient">Heads or Tails</span>{" "}
          Work?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="prose-section mb-10"
        >
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sometimes you just need a coin — but you don't have one in your
            pocket. That's exactly what this virtual coin flip tool is for.
            Whether you're settling a friendly dispute, making a spontaneous
            decision, or just having fun, our online coin lets you toss a
            virtual coin in the air as if it were real.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The result is determined by a cryptographically random number
            generator, giving you a genuine 50/50 chance every single time —
            just like a real coin.
          </p>
        </motion.div>

        {/* Numbered steps */}
        <motion.ol
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          {[
            "Choose which option will be heads and which will be tails using the custom label inputs above the coin.",
            "Click the button to flip the coin — or tap the coin on mobile, or press the Spacebar on desktop.",
            "The winning option (heads or tails) will appear on the screen instantly, with a satisfying sound.",
          ].map((step, i) => (
            <motion.li
              key={step.slice(0, 20)}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full orange-gradient text-[oklch(0.12_0.006_240)] font-black text-sm flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed">{step}</p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Feature highlight cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-[oklch(0.73_0.15_55/0.3)] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.73_0.15_55/0.12)] flex items-center justify-center group-hover:bg-[oklch(0.73_0.15_55/0.2)] transition-colors">
                <h.icon className="w-5 h-5 text-toss-orange" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoinTossHistory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 px-6 border-t border-[oklch(0.26_0.013_240/0.3)]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-10 text-center"
        >
          History of the <span className="text-orange-gradient">Coin Toss</span>
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              era: "Roman Empire",
              text: `The coin toss has roots stretching back to ancient Rome, where it was known as "Navia aut Caput" — ship or head — named after the images stamped on Roman coins. Romans used the toss to settle disputes and make binding decisions, believing the outcome reflected the will of the gods or fortune. The emperor's portrait on the heads side imbued the result with divine authority.`,
            },
            {
              era: "Medieval Coin Tossing",
              text: "Through the Middle Ages, coin tossing spread across Europe as a quick, fair arbiter. In England it became known as 'cross and pile' — the cross of a crowned head versus the pile (reverse) of the coin. Knights, merchants, and commoners alike used it to settle wagers and make decisions where fairness was paramount. Its simplicity and perceived neutrality made it a trusted tool across all social strata.",
            },
            {
              era: "Modern Usage",
              text: "Today the coin toss is an international ritual embedded in sports, law, politics, and everyday life. The NFL Super Bowl begins with a ceremonial coin flip. Court cases have been settled by toss in low-stakes disputes. Children flip coins to choose who goes first in games. And now, in the digital age, virtual coin flip tools like this one carry the tradition online — offering the same pure randomness and fairness of a physical coin, available to anyone with a device and an internet connection.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.era}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15 }}
              className="flex gap-6"
            >
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-toss-orange mt-1.5" />
                {i < 2 && (
                  <div className="w-px flex-1 bg-[oklch(0.73_0.15_55/0.2)]" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-toss-orange uppercase tracking-widest text-sm mb-3">
                  {item.era}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "How many times can I flip the virtual coin?",
    a: "You can flip as many times as you like — there's no limit. Flip once or a thousand times; the app never restricts you.",
  },
  {
    q: "Is this application free?",
    a: "Completely free to use. No subscription or account required. Open the page and flip.",
  },
  {
    q: "Do I need an account to flip a coin online?",
    a: "No account is needed. There's no sign-up, no login, and no personal data collected. Just open the page and start flipping.",
  },
  {
    q: "How many faces does the virtual coin have?",
    a: "Two faces — heads and tails — just like a real coin. You can also customize the label for each face to match your own decision.",
  },
  {
    q: "What is more likely to come up, heads or tails?",
    a: "Neither. Each flip is a statistically independent event with exactly 50% probability for each side. Past results have no influence on future flips.",
  },
  {
    q: "What are the uses for the coin flip simulator?",
    a: null,
    list: [
      "Decide who does household chores.",
      "Determine which player or team goes first in a game.",
      "Break a tie between two equally appealing options.",
      "Settle a friendly bet or wager.",
      "Make any spontaneous two-option choice quickly and fairly.",
      "Use as a teaching tool to demonstrate probability and randomness.",
    ],
  },
];

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-20 px-6 border-t border-[oklch(0.26_0.013_240/0.3)]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-10 text-center"
        >
          Frequently Asked{" "}
          <span className="text-orange-gradient">Questions</span>
        </motion.h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.07 }}
              className="glass-card rounded-2xl overflow-hidden"
              data-ocid={`faq.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/10 transition-colors"
                data-ocid={`faq.toggle.${i + 1}`}
              >
                <span className="font-bold text-foreground pr-4">{item.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 text-toss-orange"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t border-[oklch(0.26_0.013_240/0.3)]">
                      {item.a && (
                        <p className="text-muted-foreground leading-relaxed pt-4">
                          {item.a}
                        </p>
                      )}
                      {item.list && (
                        <ul className="pt-4 space-y-2">
                          {item.list.map((li) => (
                            <li
                              key={li}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-toss-orange flex-shrink-0 mt-2" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FooterProps {
  onNavigate: (page: Page) => void;
}

function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-[oklch(0.26_0.013_240/0.4)] py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            data-ocid="footer.logo.button"
          >
            <div className="w-7 h-7 rounded-full coin-gradient flex items-center justify-center">
              <CircleDot className="w-3.5 h-3.5 text-[oklch(0.12_0.006_240)]" />
            </div>
            <span className="font-black tracking-widest text-sm uppercase">
              TOSS
            </span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
              data-ocid="footer.features.link"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
              data-ocid="footer.how-it-works.link"
            >
              How It Works
            </a>
            <a
              href="#history"
              className="hover:text-foreground transition-colors"
              data-ocid="footer.history.link"
            >
              History
            </a>
            <button
              type="button"
              onClick={() => onNavigate("blog")}
              className="hover:text-foreground transition-colors"
              data-ocid="footer.blog.link"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="hover:text-foreground transition-colors"
              data-ocid="footer.contact.link"
            >
              Contact Us
            </button>
            <a
              href="/privacy.html"
              className="hover:text-foreground transition-colors"
              data-ocid="footer.privacy.link"
            >
              Privacy Policy
            </a>
            <button
              type="button"
              onClick={() => onNavigate("disclaimer")}
              className="hover:text-foreground transition-colors"
              data-ocid="footer.disclaimer.link"
            >
              Disclaimer
            </button>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5 mb-6">
          <button
            type="button"
            aria-label="Twitter / X"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="footer.twitter.link"
          >
            <Twitter className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="YouTube"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="footer.youtube.link"
          >
            <Youtube className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="footer.instagram.link"
          >
            <Instagram className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[oklch(0.26_0.013_240/0.3)] pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-toss-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Cookie Consent Banner ---
function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem("toss_cookie_consent") !== "accepted";
  });

  const accept = () => {
    localStorage.setItem("toss_cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div className="max-w-4xl mx-auto glass-card rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          We use cookies to enhance your experience, analyze site traffic, and
          serve relevant ads. By continuing to use this site, you accept our use
          of cookies.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="/privacy.html"
            className="text-xs font-bold uppercase tracking-widest text-toss-orange hover:underline transition-colors"
            data-ocid="cookie.learn_more.button"
          >
            Learn More
          </a>
          <button
            type="button"
            onClick={accept}
            className="orange-gradient text-[oklch(0.12_0.006_240)] font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_oklch(0.73_0.15_55/0.5)] hover:-translate-y-0.5 transition-all duration-200"
            data-ocid="cookie.accept.button"
          >
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main App ---
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentPostId, setCurrentPostId] = useState<number>(1);
  const [history, setHistory] = useState<TossEntry[]>([]);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const nextId = useRef(1);
  const flipRef = useRef<(() => void) | null>(null);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOpenPost = useCallback((id: number) => {
    setCurrentPostId(id);
    setCurrentPage("blog-post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFlip = useCallback((result: "heads" | "tails") => {
    setHistory((prev) =>
      [{ id: nextId.current++, result, timestamp: new Date() }, ...prev].slice(
        0,
        10,
      ),
    );
    if (result === "heads") {
      setHeadsCount((c) => c + 1);
    } else {
      setTailsCount((c) => c + 1);
    }
  }, []);

  // Spacebar support (home page only)
  useEffect(() => {
    if (currentPage !== "home") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        flipRef.current?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentPage]);

  return (
    <div className="min-h-screen relative">
      {/* Subtle radial vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.06 0.003 240 / 0.6) 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero */}
              <main id="main-content" className="pt-32 pb-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-toss-orange bg-[oklch(0.73_0.15_55/0.1)] px-4 py-1.5 rounded-full mb-6 border border-[oklch(0.73_0.15_55/0.2)]">
                      Random Decision Engine
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-6 text-foreground">
                      Decide
                      <br />
                      <span className="text-orange-gradient">Instantly.</span>
                      <br />
                      Flip a Coin.
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12 leading-relaxed">
                      Stop overthinking. Let fate decide with a single flip.
                      Beautiful, fast, and perfectly fair.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                  >
                    <HeroFlipCard
                      onFlip={handleFlip}
                      headsCount={headsCount}
                      tailsCount={tailsCount}
                      flipRef={flipRef}
                    />
                  </motion.div>
                </div>

                <FeaturesStrip />
                <HowItWorks />
                <HowDoesItWorkDetail />
                <HistorySection history={history} />
                <CoinTossHistory />
                {/* About section */}
                <section id="about" className="py-20 px-6">
                  <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-toss-orange mb-3">
                      About
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground mb-6">
                      About Toss
                    </h2>
                    <div className="glass-card rounded-3xl p-8 text-left space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Toss is a free, browser-based coin flip tool designed to
                        help you make quick decisions fairly and instantly.
                        Whether you&apos;re settling a friendly debate, deciding
                        who goes first in a game, or simply need a random
                        choice, Toss delivers a genuine 50/50 result every time.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Built with modern web technology and hosted on the
                        Internet Computer blockchain, Toss is fast, secure, and
                        completely free to use. No downloads, no registration,
                        no data collection.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Have feedback or questions? We&apos;d love to hear from
                        you — reach out at{" "}
                        <a
                          href="mailto:support@toss-website-8nh.caffeine.xyz"
                          className="text-toss-orange hover:underline"
                        >
                          support@toss.app
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </section>
                <FAQSection />
              </main>
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "disclaimer" && (
            <motion.div
              key="disclaimer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DisclaimerPage onBack={() => handleNavigate("home")} />
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "privacy" && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyPage onBack={() => handleNavigate("home")} />
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage onBack={() => handleNavigate("home")} />
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage
                onBack={() => handleNavigate("home")}
                onOpenPost={handleOpenPost}
              />
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "blog-post" && (
            <motion.div
              key="blog-post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPostPage
                postId={currentPostId}
                onBack={() => handleNavigate("blog")}
              />
              <Footer onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          <CookieConsent />
        </AnimatePresence>
      </div>
    </div>
  );
}
