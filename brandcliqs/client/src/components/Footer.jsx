import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const join = async (e) => {
    e.preventDefault();

    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('You are on the list!');
      setEmail('');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Could not subscribe'
      );
    }
  };

  return (
    <footer className="border-t border-[#eee9f2] bg-[#fdfcff] mt-20">
      <div className="container-x py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Logo />

          <p className="mt-5 text-[#756b86] leading-7">
            The single starting point for software decisions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Product</h4>

          <div className="space-y-3 text-[#756b86]">
            <Link className="block" to="/explore">
              Explore
            </Link>

            <Link className="block" to="/features">
              Features
            </Link>

            <Link className="block" to="/pricing">
              Pricing
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>

          <div className="space-y-3 text-[#756b86]">
            <Link className="block" to="/about">
              Meet BrandCliqs
            </Link>

            <Link className="block" to="/support">
              Support
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Stay in the loop</h4>

          <p className="text-[#756b86] mb-4">
            Weekly picks, no spam.
          </p>

          <form onSubmit={join} className="flex gap-2">
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              type="email"
              required
            />

            <button className="btn btn-primary">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#eee9f2]">
        <div className="container-x py-5 text-sm text-[#756b86] flex flex-wrap gap-5 justify-center">
          © 2026 BrandCliqs. All rights reserved.

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <span>·</span>

          <Link to="/terms">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}