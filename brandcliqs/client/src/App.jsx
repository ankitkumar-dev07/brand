
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import SiteLayout from './layouts/SiteLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollTop from './components/ScrollTop';

import Home from './pages/Home';
import Explore from './pages/Explore';
import ToolDetails from './pages/ToolDetails';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Preview from './pages/Preview';
import Recommendations from './pages/Recommendations';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Support from './pages/Support';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import ListDetails from './pages/ListDetails';
import Admin from './pages/Admin';
import { Privacy, Terms } from './pages/Legal';

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------- */
/* PRODUCT PAGE */
/* -------------------------------- */

function InfoCard({ title, text, from, reduce }) {
  const [ripples, setRipples] = useState([]);

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
    const id = Date.now() + Math.random();

    setRipples((previous) => [
      ...previous,
      {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);

    setTimeout(() => {
      setRipples((previous) =>
        previous.filter((item) => item.id !== id),
      );
    }, 800);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -8,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }
      }
      whileTap={reduce ? undefined : { scale: 0.98 }}
      onMouseMove={move}
      onClick={ripple}
      className="card group relative isolate overflow-hidden p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)',
        }}
      />

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-0 h-5 w-5 rounded-full bg-white/40"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 40, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      <div className="relative z-10">
        <h2 className="text-2xl font-bold transition-colors duration-300 group-hover:text-white">
          {title}
        </h2>
        <p className="mt-3 leading-7 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function ProductPage({ title, heading, description, solution, image }) {
  const reduce = useReducedMotion();
  const words = heading.split(' ');

  const cards = [
    { title: 'Challenge', text: description, from: -50 },
    { title: 'Gap We Close', text: solution, from: 50 },
  ];

  return (
    <div className="relative overflow-x-clip">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7c3aed]/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <main className="container-x relative py-16">
        <div className="relative max-w-6xl">
          <h1
            aria-label={heading}
            className="text-4xl font-extrabold tracking-tight text-[#171322] md:text-5xl lg:text-6xl"
          >
            {words.map((word, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="mr-[0.25em] -mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: index * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {image && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mt-10 overflow-hidden rounded-[28px] border border-[#eee9f2] bg-[#210846] shadow-[0_25px_80px_rgba(55,20,90,.15)]"
            >
              <img
                src={image}
                alt={`${title || heading} dashboard`}
                className="block h-auto w-full object-cover"
              />
            </motion.div>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <InfoCard key={card.title} {...card} reduce={reduce} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------- */
/* SHARED ANIMATION VARIANTS */
/* -------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/* -------------------------------- */
/* JOBS PAGE */
/* -------------------------------- */

function Jobs() {
  const reduce = useReducedMotion();

  return (
    <main className="relative isolate overflow-x-clip">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#7c3aed]/20 blur-3xl"
        animate={
          reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-x relative py-16">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight text-[#171322] md:text-5xl"
          >
            Build the future with BrandCliqs.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg leading-8 text-[#756b86]"
          >
            We are building a connected marketing ecosystem for
            modern businesses, marketers and agencies.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="card group relative isolate overflow-hidden p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)]"
            whileHover={
              reduce
                ? undefined
                : {
                    y: -8,
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    },
                  }
            }
            whileTap={reduce ? undefined : { scale: 0.98 }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty(
                '--mx',
                `${event.clientX - rect.left}px`,
              );
              event.currentTarget.style.setProperty(
                '--my',
                `${event.clientY - rect.top}px`,
              );
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)',
              }}
            />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                Opportunities
              </h2>

              <p className="mt-3 leading-7 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
                Interested in working with BrandCliqs? Contact us
                with your profile, skills and the role you are
                interested in.
              </p>

              <motion.a
                href="mailto:careers@brandcliqs.com"
                className="btn btn-primary mt-6 inline-flex items-center gap-2"
                whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 18,
                }}
              >
                Contact Hiring Team
                <motion.span
                  aria-hidden="true"
                  animate={reduce ? undefined : { x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* BLOG PAGE */
/* -------------------------------- */

function Blog() {
  const reduce = useReducedMotion();

  const articles = [
    {
      title: 'Building a smarter marketing stack',
      text: 'Discover how connected tools can simplify marketing workflows.',
    },
    {
      title: 'Turning marketing data into growth',
      text: 'Learn how better analytics can help teams make stronger decisions.',
    },
  ];

  return (
    <main className="relative isolate overflow-x-clip">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#7c3aed]/20 blur-3xl"
        animate={
          reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-x relative py-16">
        <motion.div
          className="max-w-4xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-extrabold tracking-tight text-[#171322] md:text-5xl"
          >
            Marketing ideas, tools and growth insights.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg leading-8 text-[#756b86]"
          >
            Explore practical ideas around marketing technology,
            analytics, agencies and business growth.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {articles.map((article) => (
            <motion.article
              key={article.title}
              variants={fadeUp}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -8,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    }
              }
              whileTap={reduce ? undefined : { scale: 0.98 }}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty(
                  '--mx',
                  `${event.clientX - rect.left}px`,
                );
                event.currentTarget.style.setProperty(
                  '--my',
                  `${event.clientY - rect.top}px`,
                );
              }}
              className="card group relative isolate overflow-hidden p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#5b21b6] via-[#6D28D9] to-[#a855f7] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)',
                }}
              />

              <div className="relative z-10">
                <h2 className="text-xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                  {article.title}
                </h2>

                <p className="mt-3 leading-7 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
                  {article.text}
                </p>

                <motion.div
                  aria-hidden="true"
                  className="mt-5 h-1 w-12 rounded-full bg-[#6D28D9] transition-all duration-300 group-hover:w-20 group-hover:bg-white"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* APP ROUTES */
/* -------------------------------- */

export default function App() {
  return (
    <>
      <ScrollTop />

      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />

          <Route
            path="/products/tool-marketplace"
            element={
              <ProductPage
                heading="Build your perfect marketing stack & integration in minutes."
                description="Juggling 100+ marketing platforms, repeating manual tasks, and running campaigns that feel scattered and slow."
                solution="All-in-one tools to plan, automate, and manage your campaigns from a single dashboard."
              />
            }
          />

          <Route
            path="/products/growth-analytics"
            element={
              <ProductPage
                title="Growth Analytics"
                heading="Track every click. Grow every channel."
                description="Data is spread across channels, reports are confusing, and it's hard to tell which campaigns actually bring results."
                solution="Clear, real-time dashboards that bring all your performance data together. Track ROI, spot what's working, and see what isn't."
                image="/WhatsApp%20Image%202026-10-08%20at%201.33.14%20PM.jpeg"
              />
            }
          />

          <Route
            path="/products/agency-cliq"
            element={
              <ProductPage
                title="Agency Cliq"
                heading="Find the right agency for your growth."
                description="Finding a trustworthy agency is time-consuming, and a wrong choice wastes budget and delays growth."
                solution="Connect with vetted agencies matched to your goals, budget, and industry, so you work with experts who deliver."
              />
            }
          />

          <Route
            path="/products/growth-insights"
            element={
              <ProductPage
                title="Growth Insights"
                heading="Turn your marketing data into direction."
                description="You have the numbers but not the direction. Without understanding your audience, market, and competitors, decisions become guesswork."
                solution="Actionable insights on customer behavior, industry trends, and competitor activity, so every decision is backed by evidence."
              />
            }
          />

          <Route path="/tools/:slug" element={<ToolDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/use-cases" element={<Solutions />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/recommendations" element={<Recommendations />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/support" element={<Support />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lists/:id"
            element={
              <ProtectedRoute>
                <ListDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </SiteLayout>
    </>
  );
}
