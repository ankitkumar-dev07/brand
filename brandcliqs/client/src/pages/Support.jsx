
import { useState } from 'react';
import {
  Search,
  ChevronDown,
  Mail,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import {
  motion,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

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

const faqs = [
  [
    'What is BrandCliqs?',
    'A software discovery platform that helps you search, compare and save tools.',
  ],
  [
    'Is there a free plan?',
    'Yes. Free Cliq includes core catalog discovery, search and basic filters.',
  ],
  [
    'What is Pro Cliq?',
    'Pro unlocks the full catalog, AI suggestions, named lists and comparisons.',
  ],
  [
    'Can I cancel Pro?',
    'Yes. The development subscription flow supports cancellation and is structured for a real payment provider later.',
  ],
];

function InteractiveCard({
  children,
  className = '',
  label,
  clickable = false,
}) {
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

  const handleClick = (event) => {
    if (!clickable || reduce) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const id = `${Date.now()}-${Math.random()}`;

    setRipples((previous) => [
      ...previous,
      {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);

    window.setTimeout(() => {
      setRipples((previous) =>
        previous.filter((ripple) => ripple.id !== id),
      );
    }, 800);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduce ? undefined : hoverLift}
      whileTap={
        clickable && !reduce ? { scale: 0.97 } : undefined
      }
      onMouseMove={move}
      onClick={handleClick}
      aria-label={label}
      className={`card group relative isolate overflow-hidden border p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#6D28D9] hover:shadow-[0_24px_60px_rgba(109,40,217,.35)] ${className}`}
    >
      {/* Purple gradient — same style as Home.jsx */}
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
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      <ArrowUpRight
        size={20}
        aria-hidden="true"
        className="absolute right-5 top-5 z-20 -translate-x-2 translate-y-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function Support() {
  const [d, setD] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [search, setSearch] = useState('');

  const reduce = useReducedMotion();

  const filteredFaqs = faqs.filter(([question, answer]) =>
    `${question} ${answer}`.toLowerCase().includes(search.toLowerCase()),
  );

  const submit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/support/contact', d);

      toast.success('Message sent.');

      setD({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Could not send message');
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="container-x overflow-x-clip py-16">
        {/* Heading entrance animation */}
        <motion.div
          className="max-w-3xl"
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold tracking-tight text-[#171322]"
          >
            How can we help?
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-[#756b86]"
          >
            Find an answer below or send the team a message.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <motion.div
            variants={stagger(0.12, 0.05)}
            initial="hidden"
            animate="show"
          >
            {/* Search help */}
            <motion.div variants={fadeUp}>
              <div className="card flex items-center gap-3 p-4 transition-[border-color,box-shadow] duration-300 focus-within:border-[#6D28D9] focus-within:shadow-[0_0_0_3px_rgba(109,40,217,.10)]">
                <Search className="shrink-0 text-[#8a8094]" />

                <input
                  className="min-w-0 flex-1 bg-transparent outline-none"
                  placeholder="Search help"
                  aria-label="Search frequently asked questions"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </motion.div>

            {/* FAQ cards */}
            <motion.div
              className="mt-5 space-y-3"
              variants={stagger(0.09)}
              initial="hidden"
              animate="show"
            >
              {filteredFaqs.map(([question, answer]) => (
                <motion.div key={question} variants={fadeUp}>
                  <InteractiveCard
                    label={question}
                    clickable
                    className="p-0"
                  >
                    <details className="group/faq relative">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 pr-12 font-semibold text-[#171322] transition-colors duration-300 group-hover:text-white [&::-webkit-details-marker]:hidden">
                        <span>{question}</span>

                        <ChevronDown
                          size={18}
                          className="absolute right-5 top-1/2 shrink-0 -translate-y-1/2 transition-transform duration-300 group-open/faq:rotate-180"
                        />
                      </summary>

                      <div className="px-5 pb-5">
                        <p className="leading-7 text-[#756b86] transition-colors duration-300 group-hover:text-white/85">
                          {answer}
                        </p>
                      </div>
                    </details>
                  </InteractiveCard>
                </motion.div>
              ))}

              {filteredFaqs.length === 0 && (
                <motion.p
                  variants={fadeUp}
                  className="rounded-2xl border border-dashed border-[#e8e3ed] p-6 text-sm text-[#756b86]"
                >
                  No matching questions found. Try another search.
                </motion.p>
              )}
            </motion.div>

            {/* Contact support */}
            <motion.div variants={fadeUp} className="mt-6">
              <InteractiveCard
                label="Contact support details"
                className="p-6"
              >
                <h2 className="text-xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                  Contact support
                </h2>

                <div className="mt-5 space-y-4">
                  <a
                    href="mailto:brandcliqs@gmail.com"
                    className="flex items-center gap-3 text-[#756b86] transition-colors hover:text-[#6D28D9] group-hover:text-white/85"
                  >
                    <Mail
                      size={20}
                      className="shrink-0 text-[#6D28D9] transition-colors group-hover:text-white"
                    />
                    <span>brandcliqs@gmail.com</span>
                  </a>

                  <a
                    href="tel:7975771943"
                    className="flex items-center gap-3 text-[#756b86] transition-colors hover:text-[#6D28D9] group-hover:text-white/85"
                  >
                    <Phone
                      size={20}
                      className="shrink-0 text-[#6D28D9] transition-colors group-hover:text-white"
                    />
                    <span>7975771943</span>
                  </a>
                </div>
              </InteractiveCard>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — MESSAGE FORM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <InteractiveCard
              label="Send a message to support"
              className="p-7"
            >
              <form onSubmit={submit}>
                <h2 className="text-xl font-bold text-[#171322] transition-colors duration-300 group-hover:text-white">
                  Send Message
                </h2>

                {[
                  ['name', 'Name', 'text'],
                  ['email', 'Email', 'email'],
                  ['subject', 'Subject', 'text'],
                ].map(([key, label, type]) => (
                  <label
                    className="mt-4 block text-sm font-semibold text-[#171322] transition-colors duration-300 group-hover:text-white"
                    key={key}
                  >
                    {label}

                    <input
                      className="input mt-2 transition-[border-color,box-shadow] duration-200 focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10"
                      type={type}
                      value={d[key]}
                      onChange={(event) =>
                        setD((previous) => ({
                          ...previous,
                          [key]: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                ))}

                <label className="mt-4 block text-sm font-semibold text-[#171322] transition-colors duration-300 group-hover:text-white">
                  Message

                  <textarea
                    className="input mt-2 min-h-32 transition-[border-color,box-shadow] duration-200 focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10"
                    value={d.message}
                    onChange={(event) =>
                      setD((previous) => ({
                        ...previous,
                        message: event.target.value,
                      }))
                    }
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="btn btn-primary group/button mt-5 flex w-full items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                  />
                </button>
              </form>
            </InteractiveCard>
          </motion.div>
        </div>
      </main>
    </MotionConfig>
  );
}
