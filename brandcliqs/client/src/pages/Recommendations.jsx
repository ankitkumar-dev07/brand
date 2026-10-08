import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Recommendations() {
  const [q, setQ] = useState('I need a CRM for a small startup');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);

    try {
      const r = await api.post('/recommendations', {
        query: q,
      });

      setItems(r.data.recommendations);
    } catch (e) {
      toast.error('Recommendation service unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-x py-16">
      <div className="max-w-3xl mx-auto text-center">
        <span className="chip">
          <Sparkles size={14} />
          AI recommendations
        </span>

        <h1 className="mt-5 text-5xl font-extrabold">
          Tell us what you need.
        </h1>

        <p className="mt-4 text-lg text-[#756b86]">
          BrandCliqs will match your request against the catalog. The
          rule-based engine works even without an AI key.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10 card p-5">
        <textarea
          className="input min-h-32"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="I need a tool for..."
        />

        <button
          onClick={run}
          disabled={loading}
          className="btn btn-primary mt-4 w-full"
        >
          {loading
            ? 'Finding matches...'
            : 'Get recommendations'}{' '}
          <ArrowRight size={17} />
        </button>
      </div>

      {items.length > 0 && (
        <div className="max-w-3xl mx-auto mt-8 space-y-4">
          {items.map((x) => (
            <Link
              to={'/tools/' + x.slug}
              className="card p-5 flex justify-between items-center hover:-translate-y-1 transition"
              key={x._id}
            >
              <div>
                <h3 className="font-bold">
                  {x.name}
                </h3>

                <p className="text-sm text-[#756b86] mt-1">
                  {x.description}
                </p>
              </div>

              <ArrowRight className="text-[#6D28D9]" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}