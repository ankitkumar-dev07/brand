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

  return (
    <Auth
      title="Welcome back"
      subtitle="Log in to continue your software discovery."
      submit={submit}
      d={d}
      setD={setD}
      action="Log in"
    >
      <p className="text-sm text-right">
        <Link
          className="text-[#6D28D9]"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </p>

      <p className="text-center text-sm text-[#756b86] mt-6">
        New here?{' '}
        <Link
          className="text-[#6D28D9] font-semibold"
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

        <button className="btn btn-primary w-full mt-6">
          {action}
        </button>

        {children}
      </form>
    </main>
  );
}