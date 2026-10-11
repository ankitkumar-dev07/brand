import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from 'lucide-react';
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

/* the whole card: fades up, then its children stagger in */
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

/* every row inside the card */
export const item = {
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
/* LOGIN PAGE */
/* -------------------------------- */

export default function Login() {
  const [d, setD] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const r = await login(d);
      nav(r.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setErrorCount((count) => count + 1); // makes the card shake
      toast.error(
        err.response?.data?.message || 'Login failed'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    }/auth/google`;
  };

  return (
    <Auth
      title="Welcome back"
      subtitle="Log in to continue your software discovery."
      submit={submit}
      d={d}
      setD={setD}
      action={isSubmitting ? 'Signing in...' : 'Log in'}
      isSubmitting={isSubmitting}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      shakeKey={errorCount}
    >
      <motion.p variants={item} className="text-sm text-right mt-3">
        <Link
          className="text-[#6D28D9] hover:text-[#9333ea] transition-colors duration-200 hover:underline"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </motion.p>

      <motion.div variants={item} className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e8e0f0]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-[#8a8094]">
            OR
          </span>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <button
          type="button"
          onClick={googleLogin}
          className="group w-full flex items-center justify-center gap-3 rounded-xl border border-[#e5deed] bg-white px-4 py-3 font-semibold text-[#292333] transition-all duration-300 hover:border-[#c4b5fd] hover:bg-[#faf7ff] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
            <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
            <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18Z" />
            <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z" />
          </svg>
          Continue with Google
        </button>
      </motion.div>

      <motion.p
        variants={item}
        className="text-center text-sm text-[#756b86] mt-6"
      >
        New here?{' '}
        <Link
          className="text-[#6D28D9] font-semibold transition-colors duration-200 hover:text-[#9333ea] hover:underline"
          to="/register"
        >
          Create an account
        </Link>
      </motion.p>
    </Auth>
  );
}

/* -------------------------------- */
/* SHARED AUTH LAYOUT (also used by Register / ForgotPassword) */
/* -------------------------------- */

export function Auth({
  title,
  subtitle,
  submit,
  d,
  setD,
  action,
  children,
  isSubmitting = false,
  showPassword = false,
  setShowPassword,
  shakeKey = 0,
}) {
  const shake = useAnimation();

  /* shake the card whenever shakeKey changes (e.g. wrong password) */
  useEffect(() => {
    if (shakeKey > 0) {
      shake.start({
        x: [0, -12, 12, -9, 9, -5, 5, 0],
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
    }
  }, [shakeKey, shake]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate min-h-[calc(100vh-74px)] overflow-hidden grid place-items-center px-5 py-12 bg-[#fcfaff]">
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
            className="relative w-full rounded-[28px] border border-white/80 bg-white/90 p-7 sm:p-9 shadow-[0_25px_80px_rgba(75,35,120,0.10)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(109,40,217,0.14)]"
          >
            <div>
              <motion.div
                variants={iconVariant}
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#c65bd4] text-white shadow-lg shadow-purple-200/70"
              >
                <LockKeyhole size={23} />
              </motion.div>

              <motion.h1
                variants={titleVariants}
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171322]"
              >
                <Words text={title} />
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-3 leading-7 text-[#756b86]"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.label
              variants={item}
              className="group block mt-7 text-sm font-semibold text-[#292333]"
            >
              Email
              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8eaa] transition-colors duration-300 group-focus-within:text-[#6D28D9]"
                />
                <input
                  className="input !pl-11 transition-all duration-300 focus:!border-[#8b5cf6] focus:!ring-4 focus:!ring-purple-100/70"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={d.email}
                  onChange={(e) => setD({ ...d, email: e.target.value })}
                  required
                />
              </div>
            </motion.label>

            <motion.label
              variants={item}
              className="group block mt-5 text-sm font-semibold text-[#292333]"
            >
              Password
              <div className="relative mt-2">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8eaa] transition-colors duration-300 group-focus-within:text-[#6D28D9]"
                />
                <input
                  className="input !pl-11 !pr-12 transition-all duration-300 focus:!border-[#8b5cf6] focus:!ring-4 focus:!ring-purple-100/70"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={d.password}
                  onChange={(e) => setD({ ...d, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword?.((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8a8094] transition-colors hover:bg-purple-50 hover:text-[#6D28D9]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={showPassword ? 'hide' : 'show'}
                      className="block"
                      initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </motion.label>

            {children}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={item}
              whileHover={isSubmitting ? undefined : { y: -2 }}
              whileTap={isSubmitting ? undefined : { scale: 0.98 }}
              className="group relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#6D28D9] via-[#7c3aed] to-[#9333ea] px-5 py-3.5 font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.22)] transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(109,40,217,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative inline-flex items-center justify-center gap-2">
                {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                {action}
              </span>
            </motion.button>
          </motion.form>
        </motion.div>
      </main>
    </MotionConfig>
  );
}