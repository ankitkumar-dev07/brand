import { useEffect, useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  GitCompare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ToolCard from '../components/ToolCard';
import toast from 'react-hot-toast';

export default function Explore() {
  const [q, setQ] = useState('');

  const [filters, setFilters] = useState({
    category: '',
    industry: '',
    audience: '',
    pricingType: '',
    isPro: '',
  });

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compare, setCompare] = useState([]);

  const load = () => {
    setLoading(true);

    const p = new URLSearchParams({
      limit: 24,
    });

    if (q) {
      p.set('search', q);
    }

    Object.entries(filters).forEach(([k, v]) => {
      if (v) {
        p.set(k, v);
      }
    });

    api
      .get('/tools?' + p)
      .then((r) => setTools(r.data.tools))
      .catch(() => toast.error('Could not load tools'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 350);

    return () => clearTimeout(t);
  }, [q, filters]);

  const addCompare = (t) => {
    if (compare.find((x) => x._id === t._id)) {
      return;
    }

    if (compare.length >= 3) {
      toast('Compare up to 3 tools');
      return;
    }

    setCompare([...compare, t]);
  };

  return (
    <main className="container-x py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div>
          <span className="chip">
            Explore 200+ tools
          </span>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            Find the right software.
          </h1>

          <p className="mt-3 text-lg text-[#756b86]">
            Search, filter, save and compare — all in one place.
          </p>
        </div>

        <Link
          to="/recommendations"
          className="btn btn-primary"
        >
          Get AI recommendation
        </Link>
      </div>

      <div className="mt-9 grid lg:grid-cols-[260px_1fr] gap-7">
        <aside className="card p-5 h-fit sticky top-24">
          <div className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal size={18} />
            Filters
          </div>

          {[
            [
              'category',
              'Category',
              [
                'AI',
                'Finance',
                'Marketing',
                'Ops',
                'HR',
                'Design',
                'Development',
                'Productivity',
              ],
            ],
            [
              'audience',
              'Audience',
              [
                'Business',
                'Individual',
                'Both',
              ],
            ],
            [
              'pricingType',
              'Pricing',
              [
                'Free',
                'Freemium',
                'Paid',
              ],
            ],
            [
              'isPro',
              'Plan',
              [
                'true',
                'false',
              ],
            ],
          ].map(([key, label, vals]) => (
            <div className="mt-6" key={key}>
              <label className="text-sm font-semibold">
                {label}
              </label>

              <select
                className="input mt-2"
                value={filters[key]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    [key]: e.target.value,
                  })
                }
              >
                <option value="">All</option>

                {vals.map((v) => (
                  <option key={v} value={v}>
                    {v === 'true'
                      ? 'Pro'
                      : v === 'false'
                        ? 'Free Cliq'
                        : v}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="mt-6 text-sm text-[#6D28D9]"
            onClick={() =>
              setFilters({
                category: '',
                industry: '',
                audience: '',
                pricingType: '',
                isPro: '',
              })
            }
          >
            Reset filters
          </button>
        </aside>

        <section>
          <div className="card p-3 flex items-center gap-3">
            <Search className="text-[#8a8094]" />

            <input
              className="outline-none flex-1"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 200+ tools by name, description or tag..."
            />
          </div>

          <div className="flex items-center justify-between mt-5 text-sm text-[#756b86]">
            <span>
              {tools.length} tools found
            </span>

            <span>
              Updated catalog
            </span>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  className="card h-64 animate-pulse bg-[#faf8fc]"
                  key={i}
                />
              ))}
            </div>
          ) : tools.length ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
              {tools.map((t) => (
                <ToolCard
                  key={t._id}
                  tool={t}
                  onCompare={addCompare}
                />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center mt-5">
              No tools match those filters.
            </div>
          )}
        </section>
      </div>

      {compare.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 card shadow-soft px-5 py-4 flex items-center gap-4">
          <GitCompare className="text-[#6D28D9]" />

          <div className="text-sm font-semibold">
            {compare.map((x) => x.name).join(' · ')}
          </div>

          <Link
            to={
              '/compare?ids=' +
              compare.map((x) => x._id).join(',')
            }
            className="btn btn-primary"
          >
            Compare
          </Link>

          <button onClick={() => setCompare([])}>
            <X />
          </button>
        </div>
      )}
    </main>
  );
}