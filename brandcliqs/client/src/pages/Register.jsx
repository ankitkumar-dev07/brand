import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [d, setD] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (d.password !== d.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      await register(d);
      nav('/dashboard');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registration failed'
      );
    }
  };

  return (
    <main className="min-h-[70vh] grid place-items-center px-5 py-12 bg-[#fcfaff]">
      <form
        onSubmit={submit}
        className="card p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold">
          Create your free Cliq
        </h1>

        <p className="text-[#756b86] mt-2">
          One account for discovery, favorites and lists.
        </p>

        {[
          ['name', 'Name', 'text'],
          ['email', 'Email', 'email'],
          ['password', 'Password', 'password'],
          [
            'confirmPassword',
            'Confirm Password',
            'password',
          ],
        ].map(([k, l, t]) => (
          <label
            key={k}
            className="block mt-5 text-sm font-semibold"
          >
            {l}

            <input
              className="input mt-2"
              type={t}
              value={d[k]}
              onChange={(e) =>
                setD({
                  ...d,
                  [k]: e.target.value,
                })
              }
              required
            />
          </label>
        ))}

        <button className="btn btn-primary w-full mt-6">
          Create account
        </button>

        <p className="text-center text-sm text-[#756b86] mt-6">
          Already have an account?{' '}
          <Link
            className="text-[#6D28D9] font-semibold"
            to="/login"
          >
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}