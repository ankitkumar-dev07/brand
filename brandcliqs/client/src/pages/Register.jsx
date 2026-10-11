import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  Check,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useAnimation,
} from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/* -------------------------------- */
/* ANIMATION HELPERS */
/* -------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const formVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASE,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const iconVariant = {
  hidden: { scale: 0, rotate: -25, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 16 },
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
          className="mr-[0.25em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span variants={wordVariant} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------- */
/* PASSWORD STRENGTH */
/* -------------------------------- */

const STRENGTH = [
  null,
  { label: 'Weak', color: '#ef4444' },
  { label: 'Fair', color: '#f59e0b' },
  { label: 'Good', color: '#34d399' },
  { label: 'Strong', color: '#059669' },
];

function getStrength(pw) {
  if (!pw) return 0;

  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  if (pw.length < 6) score = Math.min(score, 1);

  return Math.max(score, 1);
}

/* -------------------------------- */
/* SMALL COMPONENTS */
/* -------------------------------- */

/* Eye icon that rotates/fades when it swaps */
function EyeToggle({ show, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8a8094] transition-colors hover:bg-purple-50 hover:text-[#6D28D9]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={show ? 'hide' : 'show'}
          className="block"
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.18 }}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* Label + icon + input. The icon turns purple when the input is focused */
function Field({ label, Icon, className = 'mt-5', right, ...inputProps }) {
  return (
    <motion.label
      variants={item}
      className={`group block ${className} text-sm font-semibold text-[#292333]`}
    >
      {label}

      <div className="relative mt-2">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8eaa] transition-colors duration-300 group-focus-within:text-[#6D28D9]"
        />

        <input
          className={`input !pl-11 ${
            right ? '!pr-12' : ''
          } transition-all duration-300 focus:!border-[#8b5cf6] focus:!ring-4 focus:!ring-purple-100/70`}
          {...inputProps}
        />

        {right}
      </div>
    </motion.label>
  );
}

/* -------------------------------- */
/* PAGE */
/* -------------------------------- */

export default function Register() {
  const [d, setD] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const { register } = useAuth();
  const nav = useNavigate();
  const shake = useAnimation();

  /* shake the card on any error */
  useEffect(() => {
    if (errorCount > 0) {
      shake.start({
        x: [0, -12, 12, -9, 9, -5, 5, 0],
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
    }
  }, [errorCount, shake]);

  const strength = getStrength(d.password);
  const strengthInfo = STRENGTH[strength];
  const showMatch = d.confirmPassword.length > 0;
  const matches = d.password === d.confirmPassword;

  const submit = async (e) => {
    e.preventDefault();

    if (d.password !== d.confirmPassword) {
      setErrorCount((count) => count + 1);
      toast.error('Passwords do not match');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await register(d);
      nav('/dashboard');
    } catch (err) {
      setErrorCount((count) => count + 1);
      toast.error(
        err.response?.data?.message || 'Registration failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate min-h-[calc(100vh-74px)] overflow-hidden grid place-items-center px-5 py-12 bg-[#fcfaff]">
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl animate-login-float"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl animate-login-float-reverse"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-[12%] h-36 w-36 rounded-full bg-orange-100/50 blur-3xl"
        />

        {/* outer wrapper = shake, inner form = entrance + stagger */}
        <motion.div animate={shake} className="relative z-10 w-full max-w-md">
          <motion.form
            onSubmit={submit}
            variants={formVariants}
            initial="hidden"
            animate="show"
            className="relative w-full rounded-[28px] border border-purple-100 bg-white/90 p-7 sm:p-9 shadow-[0_25px_80px_rgba(75,35,120,0.10)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(109,40,217,0.14)]"
          >
            <div>
              <motion.div
                variants={iconVariant}
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#c65bd4] text-white shadow-lg shadow-purple-200/70"
              >
                <UserPlus size={23} />
              </motion.div>

              <motion.h1
                variants={titleVariants}
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171322]"
              >
                <Words text="Create your free Cliq" />
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-3 leading-7 text-[#756b86]"
              >
                One account for discovery, favorites and lists.
              </motion.p>
            </div>

            {/* Name */}
            <Field
              label="Name"
              Icon={UserRound}
              className="mt-6"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={d.name}
              onChange={(e) => setD({ ...d, name: e.target.value })}
              required
            />

            {/* Email */}
            <Field
              label="Email"
              Icon={Mail}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={d.email}
              onChange={(e) => setD({ ...d, email: e.target.value })}
              required
            />

            {/* Password */}
            <Field
              label="Password"
              Icon={LockKeyhole}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              autoComplete="new-password"
              value={d.password}
              onChange={(e) => setD({ ...d, password: e.target.value })}
              required
              right={
                <EyeToggle
                  show={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  label={showPassword ? 'Hide password' : 'Show password'}
                />
              }
            />

            {/* Password strength bar */}
            <AnimatePresence initial={false}>
              {strength > 0 && (
                <motion.div
                  key="strength"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eee8f4]">
                      <motion.div
                        className="h-full rounded-full"
                        initial={false}
                        animate={{
                          width: `${strength * 25}%`,
                          backgroundColor: strengthInfo.color,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    </div>

                    <span
                      className="w-14 text-right text-xs font-semibold transition-colors duration-300"
                      style={{ color: strengthInfo.color }}
                    >
                      {strengthInfo.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm password */}
            <Field
              label="Confirm Password"
              Icon={LockKeyhole}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={d.confirmPassword}
              onChange={(e) =>
                setD({ ...d, confirmPassword: e.target.value })
              }
              required
              right={
                <EyeToggle
                  show={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                />
              }
            />

            {/* Match hint */}
            <AnimatePresence initial={false}>
              {showMatch && (
                <motion.div
                  key="match"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p
                    className={`mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 ${
                      matches ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {matches ? <Check size={14} /> : <X size={14} />}
                    {matches ? 'Passwords match' : "Passwords don't match yet"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={item}
              whileHover={isSubmitting ? undefined : { y: -2 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className="group relative mt-7 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7c3aed] to-[#9333ea] px-5 py-3.5 font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.22)] transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(109,40,217,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative inline-flex items-center justify-center gap-2">
                {isSubmitting && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </span>
            </motion.button>

            <motion.p
              variants={item}
              className="text-center text-sm text-[#756b86] mt-6"
            >
              Already have an account?{' '}
              <Link
                className="font-semibold text-[#6D28D9] transition-colors duration-200 hover:text-[#9333ea] hover:underline"
                to="/login"
              >
                Log in
              </Link>
            </motion.p>
          </motion.form>
        </motion.div>
      </main>
    </MotionConfig>
  );
}