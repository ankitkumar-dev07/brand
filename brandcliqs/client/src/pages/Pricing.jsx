import { Check, Sparkles, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

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

function FeatureList({ features }) {
  return (
    <ul className="mt-8 space-y-4">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-2 text-[#51485e]"
        >
          <Check
            className="shrink-0 text-emerald-500"
            size={18}
          />

          {feature}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const { user, setUser } = useAuth();

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
    <main className="container-x py-12 md:py-16">

      <section className="text-center max-w-3xl mx-auto">

        <span className="chip">
          Pricing
        </span>

        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Choose the plan that fits your growth.
        </h1>

        <p className="mt-5 text-lg text-[#756b86] leading-8">
          Start with Free Cliq, unlock advanced capabilities with
          Pro Cliq, or choose Agency Cliq for teams with multiple users.
        </p>

      </section>

      <section className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">

        {/* FREE */}
        <div className="card p-7 flex flex-col">

          <h2 className="text-2xl font-bold">
            Free Cliq
          </h2>

          <p className="text-[#756b86] mt-2">
            Start exploring BrandCliqs.
          </p>

          <div className="mt-7">
            <span className="text-5xl font-extrabold">
              $0
            </span>

            <span className="text-[#756b86] ml-2">
              / month
            </span>
          </div>

          <FeatureList features={freeFeatures} />

          <Link
            to="/register"
            className="btn btn-outline w-full mt-9"
          >
            Start Free
          </Link>

        </div>

        {/* PRO */}
        <div className="card p-7 flex flex-col border-[#d8c6ff] shadow-[0_20px_60px_rgba(109,40,217,.12)] relative">

          <div className="absolute top-5 right-5">
            <span className="chip bg-[#6D28D9] text-white border-[#6D28D9]">
              <Sparkles size={14} />
              Popular
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            Pro Cliq
          </h2>

          <p className="text-[#756b86] mt-2">
            For growing marketers and teams.
          </p>

          <div className="mt-7">
            <span className="text-5xl font-extrabold">
              $10
            </span>

            <span className="text-[#756b86] ml-2">
              / month
            </span>
          </div>

          <FeatureList features={proFeatures} />

          <button
            onClick={upgrade}
            className="btn btn-primary w-full mt-9"
          >
            {user?.plan === 'pro'
              ? 'Current Pro Plan'
              : 'Upgrade to Pro'}
          </button>

        </div>

        {/* AGENCY */}
        <div className="card p-7 flex flex-col border-[#eadcff]">

          <div className="flex items-center gap-2">
            <Building2
              size={22}
              className="text-[#6D28D9]"
            />

            <h2 className="text-2xl font-bold">
              Agency Cliq
            </h2>
          </div>

          <p className="text-[#756b86] mt-2">
            Built for agencies and teams managing multiple clients.
          </p>

          <div className="mt-7">
            <span className="text-4xl font-extrabold">
              Custom
            </span>
          </div>

          <FeatureList features={agencyFeatures} />

          <div className="mt-6 rounded-xl bg-[#f8f5fb] p-4">
            <div className="flex items-center gap-2">
              <Users
                size={18}
                className="text-[#6D28D9]"
              />

              <span className="font-semibold">
                Multiple user access
              </span>
            </div>

            <p className="mt-2 text-sm text-[#756b86]">
              Add multiple team members under one Agency Cliq account.
            </p>
          </div>

          <Link
            to="/support"
            className="btn btn-outline w-full mt-7"
          >
            Contact Us
          </Link>

        </div>

      </section>

      <section className="max-w-4xl mx-auto mt-16 text-center">

        <h2 className="text-2xl md:text-3xl font-bold">
          Start small. Scale when you're ready.
        </h2>

        <p className="mt-3 text-[#756b86] leading-7">
          Choose the plan that matches the way you work and grow.
        </p>

      </section>

    </main>
  );
}