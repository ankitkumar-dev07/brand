import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  BarChart3,
  Plug,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import api from '../services/api';
import ToolCard from '../components/ToolCard';

import toolsMarketplaceImage from '../assets/tools-marketplace.png';

// Company logos
import claudeLogo from '../assets/Claude.png';
import clickUpLogo from '../assets/ClickUp.png';
import facebookLogo from '../assets/Facebook.png';
import fluxLogo from '../assets/Flux.png';
import instagramLogo from '../assets/Instagram.png';
import klingLogo from '../assets/Kling.png';
import makeLogo from '../assets/Make.png';
import manusLogo from '../assets/Manus.png';
import midjourneyLogo from '../assets/Midjourney.png';
import nanobananaLogo from '../assets/Nanobanana.png';
import notebookLMLogo from '../assets/NotebookLM.png';
import notionAILogo from '../assets/Notion_AI.png';
import obsidianLogo from '../assets/Obsidian.png';
import perplexityLogo from '../assets/Perplexity.png';
import runwayLogo from '../assets/Runway.png';
import youtubeLogo from '../assets/YouTube.png';
import zapierLogo from '../assets/Zapier.png';

/* -------------------------------- */
/* DATA */
/* -------------------------------- */

const discoverFeatures = [
  {
    icon: Search,
    title: 'Discover tools',
    to: '/explore',
    description:
      'Find the right marketing tools, platforms and software for your goals.',
  },
  {
    icon: Plug,
    title: 'Connect integrations',
    to: '/products/tool-marketplace',
    description:
      'Bring your marketing stack together and simplify the way your tools work.',
  },
  {
    icon: BarChart3,
    title: 'Analyze performance',
    to: '/products/growth-analytics',
    description:
      'Understand what is working across your marketing channels and campaigns.',
  },
  {
    icon: Users,
    title: 'Hire the right agency',
    to: '/products/agency-cliq',
    description:
      'Connect with agencies that match your goals, budget and industry.',
  },
];

const companyLogos = [
  { name: 'Claude', image: claudeLogo },
  { name: 'ClickUp', image: clickUpLogo },
  { name: 'Facebook', image: facebookLogo },
  { name: 'Flux', image: fluxLogo },
  { name: 'Instagram', image: instagramLogo },
  { name: 'Kling', image: klingLogo },
  { name: 'Make', image: makeLogo },
  { name: 'Manus', image: manusLogo },
  { name: 'Midjourney', image: midjourneyLogo },
  { name: 'Nanobanana', image: nanobananaLogo },
  { name: 'NotebookLM', image: notebookLMLogo },
  { name: 'Notion AI', image: notionAILogo },
  { name: 'Obsidian', image: obsidianLogo },
  { name: 'Perplexity', image: perplexityLogo },
  { name: 'Runway', image: runwayLogo },
  { name: 'YouTube', image: youtubeLogo },
  { name: 'Zapier', image: zapierLogo },
];

const agencyCategories = [
  {
    name: 'Digital Marketing Agencies',
    category: 'Digital Marketing',
    description:
      'Find agencies that help plan and manage digital marketing campaigns.',
  },
  {
    name: 'SEO Agencies',
    category: 'SEO & Search',
    description:
      'Discover specialists focused on search visibility and organic growth.',
  },
  {
    name: 'Social Media Agencies',
    category: 'Social Media',
    description:
      'Explore agencies for social media strategy, content and campaigns.',
  },
];

/* -------------------------------- */
/* ANIMATION HELPERS */
/* -------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const inViewProps = (amount = 0.2) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount },
});

const hoverLift = {
  y: -8,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

/* Word-by-word masked reveal.
   The PARENT heading (a motion.h1 / motion.h2) triggers it, so nothing
   depends on observing a clipped element. */
const wordVariant = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Words({ text, wordClassName = '' }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.25em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span
            variants={wordVariant}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Button that gently follows the cursor */
function Magnetic({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.1 });

  const move = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* Shared interactive card: purple fill on hover, cursor light,
   click ripple, then navigates to `to` */
function InteractiveCard({ to, label, cornerArrow = true, children }) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const go = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = e.clientX !== undefined ? e.clientX - r.left : r.width / 2;
    const y = e.clientY !== undefined ? e.clientY - r.top : r.height / 2;

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((rp) => rp.id !== id)),
      800
    );
    setTimeout(() => navigate(to), 380);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      go(e);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={hoverLift}
      whileTap={{ scale: 0.97 }}
      onMouseMove={move}
      onClick={go}
      onKeyDown={onKey}
      role="link"
      tabIndex={0}
      aria-label={label}
      className="card group relative cursor-pointer overflow-hidden p-6 outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)] focus-visible:ring-2 focus-visible:ring-[#6D28D9]/60"
    >
      {/* purple fill on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      {/* light that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)',
        }}
      />

      {/* click ripples */}
      {ripples.map((rp) => (
        <motion.span
          key={rp.id}
          aria-hidden
          className="pointer-events-none absolute h-5 w-5 rounded-full bg-white/40"
          style={{ left: rp.x - 10, top: rp.y - 10 }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {cornerArrow && (
        <ArrowUpRight
          size={20}
          aria-hidden
          className="absolute right-5 top-5 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        />
      )}

      <div className="relative">{children}</div>
    </motion.div>
  );
}

const iconVariant = {
  hidden: { scale: 0, rotate: -25, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.15 },
  },
};

const iconBoxClass =
  'grid h-12 w-12 place-items-center rounded-xl bg-[#f3e8ff] text-[#6D28D9] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white';

function FeatureCard({ item }) {
  const Icon = item.icon;

  return (
    <InteractiveCard
      to={item.to}
      label={`${item.title}: ${item.description}`}
    >
      <motion.div variants={iconVariant} className="w-fit">
        <div className={iconBoxClass}>
          <Icon size={21} />
        </div>
      </motion.div>

      <h3 className="mt-5 text-xl font-bold transition-colors duration-300 group-hover:text-white">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
        {item.description}
      </p>
    </InteractiveCard>
  );
}

function AgencyCard({ agency }) {
  return (
    <InteractiveCard
      to="/products/agency-cliq"
      label={`${agency.name}: ${agency.description}`}
      cornerArrow={false}
    >
      <motion.div variants={iconVariant} className="w-fit">
        <div className={iconBoxClass}>
          <Users size={22} />
        </div>
      </motion.div>

      <span className="mt-5 inline-block text-xs font-semibold text-[#6D28D9] transition-colors duration-300 group-hover:text-white/90">
        {agency.category}
      </span>

      <h3 className="mt-2 text-xl font-bold transition-colors duration-300 group-hover:text-white">
        {agency.name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
        {agency.description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#6D28D9] transition-colors duration-300 group-hover:text-white">
        Explore
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />
      </span>
    </InteractiveCard>
  );
}

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export default function Home() {
  const [tools, setTools] = useState([]);
  const reduce = useReducedMotion();

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  /* hero 3D tilt */
  const tiltRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 120,
    damping: 18,
  });

  const onTiltMove = (e) => {
    if (reduce || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onTiltLeave = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    let active = true;

    api
      .get('/tools?limit=6&featured=true')
      .then((response) => {
        if (active) {
          setTools(response.data.tools || []);
        }
      })
      .catch(() => {
        if (active) {
          setTools([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="home-page overflow-x-clip">
        {/* SCROLL PROGRESS */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#6D28D9] via-[#c65bd4] to-[#f97316]"
        />

        {/* HERO */}
        <section className="container-x grid items-center gap-12 pb-24 pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h1
              variants={stagger(0.06)}
              initial="hidden"
              animate="show"
              className="text-5xl font-extrabold leading-[1.05] tracking-[-.055em] md:text-6xl lg:text-7xl"
            >
              <Words text="Amplify your" />
              <Words
                text="marketing engine."
                wordClassName="hero-gradient gradient-text"
              />
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[650px] text-lg leading-8 text-[#756b86] md:text-xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            >
              Discover tools, connect integrations, analyze performance,
              and hire the right agency — all from one powerful marketing
              ecosystem.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            >
              <Magnetic>
                <Link
                  to="/register"
                  className="btn btn-primary group px-6 py-3"
                >
                  Start Free Cliq
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link to="/login" className="btn btn-outline px-6 py-3">
                  Log in
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            {/* soft glow behind the mockup */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-[#7c3aed]/15 blur-3xl"
              animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              ref={tiltRef}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1100,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="overflow-hidden rounded-[28px] border border-[#eee9f2] bg-[#210846] shadow-[0_25px_80px_rgba(55,20,90,.20)]"
              >
                <img
                  src={toolsMarketplaceImage}
                  alt="BrandCliqs Tool Marketplace"
                  className="h-auto w-full object-cover"
                />
              </motion.div>

              {/* floating suggestion card (pops out in 3D) */}
              <motion.div
                style={{ z: 60 }}
                animate={reduce ? {} : { y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.04 }}
                className="absolute -bottom-6 -left-4 w-64 rounded-2xl border border-[#eee8f4] bg-white p-4 shadow-[0_20px_50px_rgba(30,10,60,.18)] md:-left-7"
              >
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f3e8ff] text-[#6D28D9]">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[#756b86]">
                      BrandCliqs suggestion
                    </p>

                    <p className="text-sm font-semibold text-[#171322]">
                      Build a smarter marketing stack →
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* DISCOVER FEATURES */}
        <section className="container-x py-16">
          <motion.div
            className="max-w-3xl"
            variants={stagger(0.12)}
            {...inViewProps(0.4)}
          >
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
            >
              Everything your marketing engine needs.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg leading-8 text-[#756b86]"
            >
              BrandCliqs brings the tools, connections and intelligence
              you need to discover opportunities, make better decisions
              and grow faster.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger(0.12)}
            {...inViewProps(0.2)}
          >
            {discoverFeatures.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </motion.div>
        </section>

        {/* COMPANY LOGOS */}
        <section className="container-x overflow-hidden py-16">
          <motion.div
            className="mb-10 text-center"
            variants={stagger(0.12)}
            {...inViewProps(0.5)}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[.2em] text-[#8a8094]"
            >
              Tools that power your workflow
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-[#171322] md:text-4xl"
            >
              Your favorite tools, all in one place.
            </motion.h2>
          </motion.div>

          <motion.div
            className="logo-marquee relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-20" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-20" />

            {/* pauses when you hover over it */}
            <div className="animate-logo-marquee flex w-max hover:[animation-play-state:paused]">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
                  aria-hidden={group === 1}
                >
                  {companyLogos.map(({ name, image }) => (
                    <div
                      key={name}
                      title={name}
                      className="group flex w-24 shrink-0 flex-col items-center justify-center gap-3 py-3 md:w-28"
                    >
                      <div className="flex h-12 w-full items-center justify-center md:h-14">
                        <img
                          src={image}
                          alt={group === 0 ? name : ''}
                          loading="eager"
                          draggable="false"
                          className="max-h-11 max-w-[76px] object-contain transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-125 md:max-h-12 md:max-w-[88px]"
                        />
                      </div>

                      <span className="whitespace-nowrap text-xs font-medium text-[#756b86] transition-colors duration-300 group-hover:text-[#6D28D9] md:text-sm">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* AGENCY LIST */}
        <section className="container-x py-16">
          <motion.div
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            variants={stagger(0.12)}
            {...inViewProps(0.4)}
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight md:text-5xl"
              >
                Find the right agency for your growth.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-2xl text-lg leading-8 text-[#756b86]"
              >
                Discover agencies for marketing, SEO, social media and
                business growth—all in one place.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0">
              <Magnetic>
                <Link
                  to="/products/agency-cliq"
                  className="btn btn-primary group"
                >
                  Explore Agencies
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger(0.14)}
            {...inViewProps(0.2)}
          >
            {agencyCategories.map((agency) => (
              <AgencyCard key={agency.name} agency={agency} />
            ))}
          </motion.div>
        </section>

        {/* POPULAR TOOLS */}
        {tools.length > 0 && (
          <section className="container-x py-16">
            <motion.div
              className="flex items-end justify-between gap-4"
              variants={stagger(0.12)}
              {...inViewProps(0.4)}
            >
              <div>
                <motion.span variants={fadeUp} className="chip inline-flex">
                  Popular Tools
                </motion.span>

                <motion.h2
                  variants={fadeUp}
                  className="mt-4 text-4xl font-bold"
                >
                  Find your next favorite tool.
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-3 max-w-2xl text-[#756b86]"
                >
                  Explore curated tools and discover software that can
                  improve your marketing workflow.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="hidden sm:block">
                <Link
                  to="/products/tool-marketplace"
                  className="font-semibold text-[#6D28D9] transition-colors hover:text-[#c65bd4]"
                >
                  Explore all →
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={stagger(0.12)}
              {...inViewProps(0.15)}
            >
              {tools.map((tool) => (
                <motion.div
                  key={tool._id}
                  variants={fadeUp}
                  whileHover={hoverLift}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section className="container-x py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] bg-[#210846] p-8 text-white transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(55,20,90,.20)] md:p-12"
          >
            {/* drifting glow blobs */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#7c3aed]/40 blur-3xl"
              animate={reduce ? {} : { x: [0, -50, 0], y: [0, 40, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-[#f97316]/20 blur-3xl"
              animate={reduce ? {} : { x: [0, 60, 0], y: [0, -30, 0] }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative max-w-3xl">
              <span className="text-sm font-semibold text-white/60">
                BrandCliqs
              </span>

              <motion.h2
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="mt-3 text-3xl font-extrabold text-white md:text-5xl"
              >
                <Words text="Ready to scale your marketing?" />
              </motion.h2>

              <motion.p
                className="mt-4 leading-7 text-white/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              >
                Discover tools, connect integrations, analyze performance
                and find the right agency for your next stage of growth.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
              >
                <Magnetic>
                  <Link
                    to="/register"
                    className="btn group bg-white text-[#210846] hover:bg-white/90"
                  >
                    Start Free Cliq
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Magnetic>

                <Magnetic>
                  <Link
                    to="/login"
                    className="btn border border-white/20 text-white hover:bg-white/10"
                  >
                    Log in
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
}