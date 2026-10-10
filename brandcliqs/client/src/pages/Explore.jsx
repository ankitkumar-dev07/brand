
import { useEffect, useState } from 'react';
import { X, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ToolCard from '../components/ToolCard';
import toast from 'react-hot-toast';

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compare, setCompare] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadTools = async () => {
      setLoading(true);

      try {
        const response = await api.get('/tools?' + new URLSearchParams({
          limit: 24,
        }));

        if (!cancelled) {
          setTools(response.data.tools || []);
        }
      } catch {
        if (!cancelled) {
          toast.error('Could not load tools');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTools();

    return () => {
      cancelled = true;
    };
  }, []);

  const addCompare = (tool) => {
    if (compare.find((item) => item._id === tool._id)) {
      return;
    }

    if (compare.length >= 3) {
      toast('Compare up to 3 tools');
      return;
    }

    setCompare((previous) => [...previous, tool]);
  };

  return (
    <main className="container-x py-12">
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="card h-64 animate-pulse bg-[#faf8fc]"
              key={index}
            />
          ))}
        </div>
      ) : tools.length > 0 ? (
        <section>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <ToolCard
                key={tool._id}
                tool={tool}
                onCompare={addCompare}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="card p-12 text-center">
          No tools available.
        </div>
      )}

      {compare.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 card shadow-soft px-5 py-4 flex items-center gap-4">
          <GitCompare className="text-[#6D28D9]" />

          <div className="text-sm font-semibold">
            {compare.map((item) => item.name).join(' · ')}
          </div>

          <Link
            to={
              '/compare?ids=' +
              compare.map((item) => item._id).join(',')
            }
            className="btn btn-primary"
          >
            Compare
          </Link>

          <button
            type="button"
            aria-label="Clear comparison"
            onClick={() => setCompare([])}
          >
            <X />
          </button>
        </div>
      )}
    </main>
  );
}
