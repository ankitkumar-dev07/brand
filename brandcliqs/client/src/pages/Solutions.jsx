import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';

/* -------------------------------- */
/* DATA */
/* -------------------------------- */

const audienceSolutions = [
  {
    title: 'Marketers',
    subtitle: 'Run every channel from one workspace',
    description:
      'Manage your marketing stack, campaigns, analytics and growth activities from one connected workspace.',
    highlights: [
      'Full tool access',
      'Unified analytics',
      'Insights',
      'Agency access',
    ],
  },
  {
    title: 'Individuals',
    subtitle: 'Launch lean, grow fast',
    description:
      'Get the tools, insights and support you need to build a strong marketing engine without unnecessary complexity.',
    highlights: [
      'Affordable stack',
      'Dedicated manager',
      'Growth insights',
      'Vetted agency access',
    ],
  },
  {
    title: 'Enterprise / Agencies',
    subtitle: 'Amplify your mission',
    description:
      'Bring your marketing operations together with powerful analytics, multi-brand visibility and expert support.',
    highlights: [
      'Multi-brand analytics',
      'Unlimited tools',
      'Unlimited insights',
      'Custom agency search',
    ],
  },
  {
    title: 'Students / Universities',
    subtitle: 'Your marketing career starts here',
    description:
      'Learn, explore and gain practical exposure to the tools and insights used by modern marketing teams.',
    highlights: [
      'Tools & insight access',
      'Marketing resources',
      'Practical learning',
      'Growth opportunities',
    ],
  },
];

const useCases = [
  {
    number: '01',
    title: 'Tool Marketplace',
    heading: 'Build your perfect marketing stack.',
    description:
      'Juggling 100+ marketing platforms, repeating manual tasks, and running campaigns that feel scattered and slow.',
    solution:
      'All-in-one tools to plan, automate, and manage your campaigns from a single dashboard.',
    to: '/products/tool-marketplace',
  },
  {
    number: '02',
    title: 'Growth Analytics',
    heading: 'Track every click. Grow every channel.',
    description:
      "Data is spread across channels, reports are confusing, and it's hard to tell which campaigns actually bring results.",
    solution:
      "Clear, real-time dashboards that bring all your performance data together. Track ROI, spot what's working, and see what isn't.",
    to: '/products/growth-analytics',
  },
  {
    number: '03',
    title: 'Agency Cliq',
    heading: 'Find the right agency for your growth.',
    description:
      'Finding a trustworthy agency is time-consuming, and a wrong choice wastes budget and delays growth.',
    solution:
      'Connect with vetted agencies matched to your goals, budget, and industry, so you work with experts who deliver.',
    to: '/products/agency-cliq',
    image: '/brandcliqs-agency-cliq.png',
  },
  {
    number: '04',
    title: 'Growth Insights',
    heading: 'Turn your numbers into clear direction.',
    description:
      'You have the numbers but not the direction. Without understanding your audience, market, and competitors, decisions become guesswork.',
    solution:
      'Actionable insights on customer behavior, industry trends, and competitor activity, so every decision is backed by evidence.',
    to: '/products/growth-insights',
  },
];

/* -------------------------------- */
/* ANIMATION HELPERS */
/* -------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

/* the card itself: fades up, then its children stagger in */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
      delay,
      delayChildren: delay + 0.15,
      staggerChildren: 0.08,
    },
  }),
};

/* rows inside a card */
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const popVariant = {
  hidden: { scale: 0, rotate: -25, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 16 },
  },
};

const tagsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const wordVariant = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

const titleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/* Word-by-word masked heading (triggered by the parent heading) */
function Words({ text }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.25em] -mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span variants={wordVariant} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function PageHeading({ title, subtitle }) {
  return (
    <section className="max-w-4xl">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="show"
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171322]"
      >
        <Words text={title} />
      </motion.h1>

      <motion.p
        className="mt-5 max-w-3xl text-lg text-[#756b86] leading-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}

/* Interactive card.
   tone="full" -> turns solid purple on hover (text becomes white)
   tone="soft" -> soft lavender tint on hover (good for big cards)
   Click = ripple from the click point. */
function Card({
  tone = 'full',
  delay = 0,
  className = '',
  children,
}) {
  const [ripples, setRipples] = useState([]);
  const full = tone === 'full';

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const ripple = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const size = Math.max(r.width, r.height) * 2;

    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - r.left, y: e.clientY - r.top, size },
    ]);

    setTimeout(
      () => setRipples((prev) => prev.filter((rp) => rp.id !== id)),
      850
    );
  };

  return (
    <motion.article
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: full ? -8 : -4,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: full ? 0.98 : 0.995 }}
      onMouseMove={move}
      onClick={ripple}
      className={`card group relative overflow-hidden transition-[border-color,box-shadow] duration-300 ${
        full
          ? 'hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)]'
          : 'hover:border-[#c4b5fd] hover:shadow-[0_24px_60px_rgba(109,40,217,.16)]'
      } ${className}`}
    >
      {/* colour change on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          full
            ? 'bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7]'
            : 'bg-gradient-to-br from-[#f3ebff] via-[#faf7ff] to-white'
        }`}
      />

      {/* light that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: full
            ? 'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)'
            : 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(124,58,237,0.10), transparent 65%)',
        }}
      />

      {/* click ripples */}
      {ripples.map((rp) => (
        <motion.span
          key={rp.id}
          aria-hidden
          className={`pointer-events-none absolute rounded-full ${
            full ? 'bg-white/35' : 'bg-[#7c3aed]/15'
          }`}
          style={{
            left: rp.x - rp.size / 2,
            top: rp.y - rp.size / 2,
            width: rp.size,
            height: rp.size,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        />
      ))}

      <div className="relative">{children}</div>
    </motion.article>
  );
}

/* -------------------------------- */
/* /solutions */
/* -------------------------------- */

function SolutionsFor() {
  return (
    <>
      <PageHeading
        title="Built around your goals."
        subtitle="Choose the experience that best fits your team, business or learning journey."
      />

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        {audienceSolutions.map((solution, index) => (
          <Card
            key={solution.title}
            tone="full"
            delay={(index % 2) * 0.12}
            className="p-6 md:p-7"
          >
            <motion.h2
              variants={item}
              className="text-2xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white"
            >
              {solution.title}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-2 text-lg font-semibold text-[#6D28D9] transition-colors duration-300 group-hover:text-white/90"
            >
              {solution.subtitle}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 text-[#756b86] leading-7 transition-colors duration-300 group-hover:text-white/85"
            >
              {solution.description}
            </motion.p>

            <motion.div
              variants={tagsContainer}
              className="mt-6 flex flex-wrap gap-2"
            >
              {solution.highlights.map((highlight) => (
                <motion.span
                  key={highlight}
                  variants={tagVariant}
                  className="rounded-full bg-[#f8f5fb] px-3 py-2 text-sm text-[#5f556d] transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                >
                  {highlight}
                </motion.span>
              ))}
            </motion.div>
          </Card>
        ))}
      </section>
    </>
  );
}

/* -------------------------------- */
/* /solutions/use-cases */
/* -------------------------------- */

function SolutionsUseCases() {
  return (
    <>
      <PageHeading
        title="Solve the problems slowing your growth."
        subtitle="From finding the right tools to connecting with the right agency, BrandCliqs brings everything together."
      />

      <section className="mt-10 space-y-8">
        {useCases.map((useCase) => (
          <Card key={useCase.title} tone="full" className="p-6 md:p-9">
            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <motion.div variants={popVariant} className="shrink-0">
                  <div className="h-12 w-12 rounded-xl bg-[#f3eefe] text-[#6D28D9] grid place-items-center font-bold transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
                    {useCase.number}
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#6D28D9] transition-colors duration-300 group-hover:text-white/90">
                    {useCase.title}
                  </p>

                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                    {useCase.heading}
                  </h2>
                </motion.div>
              </div>

              {useCase.image && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.97, y: 24 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: EASE },
                    },
                  }}
                  className="w-full overflow-hidden rounded-2xl border border-[#eee9f2] bg-[#210846] shadow-[0_25px_70px_rgba(55,20,90,.15)]"
                >
                  <img
                    src={useCase.image}
                    alt="Agency Cliq dashboard"
                    className="block w-full h-auto"
                  />
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={item}>
                  <h3 className="font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                    The Gap We Close
                  </h3>

                  <p className="mt-2 text-[#756b86] leading-7 transition-colors duration-300 group-hover:text-white/85">
                    {useCase.description}
                  </p>
                </motion.div>

                <motion.div variants={item}>
                  <h3 className="font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                    The BrandCliqs Solution
                  </h3>

                  <p className="mt-2 text-[#756b86] leading-7 transition-colors duration-300 group-hover:text-white/85">
                    {useCase.solution}
                  </p>
                </motion.div>
              </div>

              <motion.div variants={item}>
                <Link
                  to={useCase.to}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 font-semibold text-[#6D28D9] transition-colors duration-300 group-hover:text-white hover:underline"
                >
                  Explore {useCase.title}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </Card>
        ))}
      </section>

      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Link
          to="/solutions"
          className="group inline-flex items-center gap-2 rounded-xl border border-[#e6d9f8] px-5 py-3 font-semibold text-[#6D28D9] transition-all hover:bg-[#f8f5ff] hover:border-[#c4b5fd]"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1.5"
          >
            ←
          </span>
          Back to Solutions
        </Link>
      </motion.section>
    </>
  );
}

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export default function Solutions() {
  const location = useLocation();
  const isUseCases = location.pathname === '/solutions/use-cases';

  return (
    <MotionConfig reducedMotion="user">
      {/* full-width wrapper so the glow fades out instead of being cut off */}
      <div className="relative overflow-x-clip">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7c3aed]/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <main className="container-x relative py-12 md:py-16">
          {isUseCases ? (
            <SolutionsUseCases key="use-cases" />
          ) : (
            <SolutionsFor key="for" />
          )}
        </main>
      </div>
    </MotionConfig>
  );
}