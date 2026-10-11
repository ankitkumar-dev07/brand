
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import {
  motion,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion';

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
  show: {
    transition: {
      staggerChildren: gap,
      delayChildren: delay,
    },
  },
});

const hoverLift = {
  y: -8,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
};

const iconVariant = {
  hidden: {
    scale: 0,
    rotate: -25,
    opacity: 0,
  },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 16,
      delay: 0.15,
    },
  },
};

const values = [
  ['Simplicity', 'Everything within a click or two.', Zap],
  ['Trust', 'Curated, honest, and regularly updated listings.', ShieldCheck],
  ['Growth', 'Tools that help people and businesses grow.', ArrowRight],
  ['Inclusivity', 'Built for startups, enterprises, and individuals.', Layers],
  ['Discovery', 'Helping users find tools they did not know existed.', Compass],
];

const principles = [
  [
    'Vision',
    'One platform where every app, from A to Z, is just one cliq away.',
    Compass,
  ],
  [
    'Mission',
    'We connect people and businesses to the right apps, faster, through simple branches and one-cliq access.',
    Zap,
  ],
];

function InteractiveCard({ children, label, className = '' }) {
  const [ripples, setRipples] = useState([]);
  const reduce = useReducedMotion();

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      '--mx',
      `${event.clientX - rect.left}px`,
    );

    event.currentTarget.style.setProperty(
      '--my',
      `${event.clientY - rect.top}px`,
    );
  };

  const ripple = (event) => {
    if (reduce) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const id = `${Date.now()}-${Math.random()}`;

    const x =
      event.clientX !== undefined
        ? event.clientX - rect.left
        : rect.width / 2;

    const y =
      event.clientY !== undefined
        ? event.clientY - rect.top
        : rect.height / 2;

    setRipples((previous) => [...previous, { id, x, y }]);

    window.setTimeout(() => {
      setRipples((previous) =>
        previous.filter((item) => item.id !== id),
      );
    }, 800);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduce ? undefined : hoverLift}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      onMouseMove={move}
      onClick={ripple}
      role="group"
      aria-label={label}
      className={`card group relative isolate overflow-hidden border p-6 outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)] ${className}`}
    >
      {/* Same purple gradient hover as Home.jsx */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Cursor-follow light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)',
        }}
      />

      {/* Click ripple */}
      {ripples.map((item) => (
        <motion.span
          key={item.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-5 w-5 rounded-full bg-white/40"
          style={{
            left: item.x - 10,
            top: item.y - 10,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Corner arrow */}
      <ArrowUpRight
        size={20}
        aria-hidden="true"
        className="absolute right-5 top-5 z-20 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

const iconBoxClass =
  'grid h-12 w-12 place-items-center rounded-xl bg-[#f3e8ff] text-[#6D28D9] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white';

function IconBox({ Icon }) {
  return (
    <motion.div variants={iconVariant} className="w-fit">
      <div className={iconBoxClass}>
        <Icon size={21} />
      </div>
    </motion.div>
  );
}

function PrincipleCard({ title, description, Icon }) {
  return (
    <InteractiveCard
      label={`${title}: ${description}`}
      className="h-full p-7"
    >
      <div className="flex items-center gap-3">
        <motion.div variants={iconVariant} className="w-fit">
          <div className={iconBoxClass}>
            <Icon size={22} />
          </div>
        </motion.div>

        <h3 className="text-lg font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
      </div>

      <p className="mt-6 leading-7 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
        {description}
      </p>
    </InteractiveCard>
  );
}

function ValueCard({ title, description, Icon }) {
  return (
    <InteractiveCard
      label={`${title}: ${description}`}
      className="h-full p-6"
    >
      <IconBox Icon={Icon} />

      <h3 className="mt-5 text-lg font-semibold text-[#171322] transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
        {description}
      </p>
    </InteractiveCard>
  );
}

export default function About() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="about-page container-x py-14">
        {/* INTRO — badge removed */}

        <section className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold tracking-tight text-[#171322] sm:text-5xl lg:text-6xl"
            >
              Made to end the endless tab-switching.
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-6 h-1.5 w-24 origin-left rounded-full bg-gradient-to-r from-[#6D28D9] to-[#FF8A00]"
            />

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-lg leading-8 text-[#756b86]"
            >
              We know how it goes — you need a new tool, you open ten tabs,
              you compare four review sites, you still don't decide.
              BrandCliqs is the calmer, faster way.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.14, 0.1)}
            initial="hidden"
            animate="show"
            className="grid gap-5"
          >
            {principles.map(([title, description, Icon]) => (
              <motion.div key={title} variants={fadeUp}>
                <PrincipleCard
                  title={title}
                  description={description}
                  Icon={Icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CORE VALUES */}

        <section className="py-24">
          <motion.div
            className="text-center"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold tracking-tight text-[#171322] sm:text-4xl"
            >
              What we stand for
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-lg text-[#756b86]"
            >
              The principles that guide every listing, every suggestion,
              every click.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-5"
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            {values.map(([title, description, Icon]) => (
              <motion.div key={title} variants={fadeUp} className="h-full">
                <ValueCard
                  title={title}
                  description={description}
                  Icon={Icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}
