import { Check, Sparkles, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- */
/* ANIMATION VARIANTS */
/* -------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = (gap = 0.15, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const listItem = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const hoverLift = {
  y: -8,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

/* -------------------------------- */
/* DATA */
/* -------------------------------- */

const freeFeatures = [
  'Limited Tools',
  'No Analytics',
  'Unlimited Insights',
  'No Agencies',
  '1 User',
];

const proFeatures = [
  'Unlimited Tools',
  'Brand Analytics',
  'Unlimited Insights',
  'Agencies Search',
  '1 User',
];

const agencyFeatures = [
  'Unlimited Tools',
  'Multi Brand Analytics',
  'Unlimited Insights',
  'Agency Management',
  'Multiple Users',
];

/* -------------------------------- */
/* SMALL COMPONENTS */
/* -------------------------------- */

function FeatureList({ features }) {
  return (
    <motion.ul
      className="mt-8 space-y-4"
      variants={stagger(0.08, 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {features.map((feature) => (
        <motion.li
          key={feature}
          variants={listItem}
          className="flex items-center gap-2 text-[#51485e]"
        >
          <Check className="shrink-0 text-emerald-500" size={18} />
          {feature}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* Price slides up from behind a mask */
function Price({ children, className = 'text-5xl' }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span
      ref={ref}
      className="inline-block overflow-hidden pb-1 align-bottom"
    >
      <motion.span
        className={`inline-block font-extrabold ${className}`}
        initial={{ y: '110%' }}
        animate={{ y: seen ? 0 : '110%' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export default function Pricing() {
  const { user, setUser } = useAuth();
  const reduce = useReducedMotion();

  const heading = 'Choose the plan that fits your growth.';
  const words = heading.split(' ');

  const upgrade = async () => {
    if (!user) {
      toast('Create an account first');
      return;
    }

    try {
      const response = await api.post('/subscriptions/upgrade');

      setUser(response.data.user);

      toast.success('Pro Cliq activated');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Upgrade failed'
      );
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="container-x relative overflow-x-clip py-12 md:py-16">
        {/* soft floating glow behind the heading */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7c3aed]/15 blur-3xl"
          animate={reduce ? {} : { x: [-60, 60, -60], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* HEADING */}
        <section className="relative mx-auto max-w-3xl text-center">
          <h1
            aria-label={heading}
            className="mt-5 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
          >
            {words.map((word, i) => (
              <span
                key={i}
                aria-hidden
                className="mr-[0.25em] -mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: i * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-5 text-lg leading-8 text-[#756b86]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            Start with Free Cliq, unlock advanced capabilities with
            Pro Cliq, or choose Agency Cliq for teams with multiple users.
          </motion.p>
        </section>

        {/* CARDS */}
        <motion.section
          className="relative mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-3"
          variants={stagger(0.15, 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* FREE */}
          <motion.div variants={fadeUp} whileHover={hoverLift} className="flex">
            <div className="card flex flex-1 flex-col p-7">
              <h2 className="text-2xl font-bold">Free Cliq</h2>

              <p className="mt-2 text-[#756b86]">
                Start exploring BrandCliqs.
              </p>

              <div className="mt-7">
                <Price>$0</Price>
                <span className="ml-2 text-[#756b86]">/ month</span>
              </div>

              <FeatureList features={freeFeatures} />

              <Link to="/register" className="btn btn-outline mt-9 w-full">
                Start Free
              </Link>
            </div>
          </motion.div>

          {/* PRO */}
          <motion.div
            variants={fadeUp}
            whileHover={hoverLift}
            className="relative flex"
          >
            {/* pulsing glow behind the popular plan */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[#7c3aed]/25 blur-2xl"
              animate={
                reduce ? { opacity: 0.5 } : { opacity: [0.3, 0.7, 0.3] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="card relative flex flex-1 flex-col border-[#d8c6ff] p-7 shadow-[0_20px_60px_rgba(109,40,217,.12)]">
              <div className="absolute right-5 top-5">
                <motion.span
                  className="chip border-[#6D28D9] bg-[#6D28D9] text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 16,
                    delay: 0.9,
                  }}
                >
                  <Sparkles size={14} />
                  Popular
                </motion.span>
              </div>

              <h2 className="text-2xl font-bold">Pro Cliq</h2>

              <p className="mt-2 text-[#756b86]">
                For growing marketers and teams.
              </p>

              <div className="mt-7">
                <Price>$1</Price>
                <span className="ml-2 text-[#756b86]">/ month</span>
              </div>

              <FeatureList features={proFeatures} />

              <motion.button
                onClick={upgrade}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary mt-9 w-full"
              >
                {user?.plan === 'pro'
                  ? 'Current Pro Plan'
                  : 'Upgrade to Pro'}
              </motion.button>
            </div>
          </motion.div>

          {/* AGENCY */}
          <motion.div variants={fadeUp} whileHover={hoverLift} className="flex">
            <div className="card flex flex-1 flex-col border-[#eadcff] p-7">
              <div className="flex items-center gap-2">
                <Building2 size={22} className="text-[#6D28D9]" />

                <h2 className="text-2xl font-bold">
                  Agency / Enterprices Cliq
                </h2>
              </div>

              <p className="mt-2 text-[#756b86]">
                Built for agencies and teams managing multiple clients.
              </p>

              <div className="mt-7">
                <Price className="text-4xl">Custom</Price>
              </div>

              <FeatureList features={agencyFeatures} />

              <div className="mt-6 rounded-xl bg-[#f8f5fb] p-4">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#6D28D9]" />

                  <span className="font-semibold">
                    Multiple user access
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#756b86]">
                  Add multiple team members under one Agency Cliq account.
                </p>
              </div>

              <Link to="/support" className="btn btn-outline mt-7 w-full">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* BOTTOM CTA TEXT */}
        <motion.section
          className="relative mx-auto mt-16 max-w-4xl text-center"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold md:text-3xl"
          >
            Start small. Scale when you're ready.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 leading-7 text-[#756b86]"
          >
            Choose the plan that matches the way you work and grow.
          </motion.p>
        </motion.section>
      </main>
    </MotionConfig>
  );
}