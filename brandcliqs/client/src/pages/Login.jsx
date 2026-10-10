
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [d, setD] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const r = await login(d);
      nav(r.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Login failed'
      );
    }
  };

  const googleLogin = () => {
    // Backend OAuth endpoint configure hone ke baad hi kaam karega.
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
      action="Log in"
    >
      <p className="text-sm text-right mt-2">
        <Link
          className="text-[#6D28D9] hover:underline"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </p>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e8e0f0]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-sm text-[#8a8094]">
            OR
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={googleLogin}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#e5deed] bg-white px-4 py-3 font-semibold text-[#292333] transition-colors hover:bg-[#f8f5fb]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
          />
          <path
            fill="#FBBC05"
            d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18Z"
          />
          <path
            fill="#EA4335"
            d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.2 11.4-8.2Z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm text-[#756b86] mt-6">
        New here?{' '}
        <Link
          className="text-[#6D28D9] font-semibold hover:underline"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </Auth>
  );
}

export function Auth({
  title,
  subtitle,
  submit,
  d,
  setD,
  action,
  children,
}) {
  return (
    <main className="min-h-[70vh] grid place-items-center px-5 py-12 bg-[#fcfaff]">
      <form
        onSubmit={submit}
        className="card p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-[#756b86] mt-2">
          {subtitle}
        </p>

        <label className="block mt-7 text-sm font-semibold">
          Email
          <input
            className="input mt-2"
            type="email"
            value={d.email}
            onChange={(e) =>
              setD({
                ...d,
                email: e.target.value,
              })
            }
            required
          />
        </label>

        <label className="block mt-4 text-sm font-semibold">
          Password
          <input
            className="input mt-2"
            type="password"
            value={d.password}
            onChange={(e) =>
              setD({
                ...d,
                password: e.target.value,
              })
            }
            required
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
        >
          {action}
        </button>

        {children}
      </form>
    </main>
  );
}
