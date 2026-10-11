
import { useEffect, useState } from 'react';
import { X, GitCompare, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ToolCard from '../components/ToolCard';
import toast from 'react-hot-toast';

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compare, setCompare] = useState([]);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPageVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadTools = async () => {
      setLoading(true);

      try {
        const response = await api.get(
          '/tools?' +
            new URLSearchParams({
              limit: 24,
            })
        );

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
    <main
      className={`container-x explore-page py-12 ${
        pageVisible ? 'explore-page-visible' : ''
      }`}
    >
      {/* Page heading */}
      <header className="explore-heading mb-9">
        <div className="explore-eyebrow mb-4">
          <span className="explore-eyebrow-icon">
            <Sparkles size={15} />
          </span>
          <span>Discover your marketing stack</span>
        </div>

        <h1 className="explore-title">
          Build your perfect marketing stack
          <span className="explore-title-accent">.</span>
        </h1>

        <p className="explore-description">
          Discover marketing tools, compare your options, and find
          the right solutions for your workflow—all in one place.
        </p>
      </header>

      {/* Loading skeletons */}
      {loading ? (
        <section
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
          aria-label="Loading marketing tools"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="explore-skeleton card h-64"
              key={index}
              style={{
                '--card-delay': `${index * 90}ms`,
              }}
            >
              <div className="explore-skeleton-inner">
                <div className="explore-skeleton-icon" />
                <div className="explore-skeleton-line explore-skeleton-title" />
                <div className="explore-skeleton-line" />
                <div className="explore-skeleton-line explore-skeleton-short" />
                <div className="explore-skeleton-button" />
              </div>
            </div>
          ))}
        </section>
      ) : tools.length > 0 ? (
        <section
          className="explore-results"
          aria-label="Available marketing tools"
        >
          <div className="explore-results-heading">
            <div>
              <span className="explore-results-label">
                <Search size={14} />
                EXPLORE TOOLS
              </span>

              <h2 className="explore-results-title">
                Find the right tools for you
              </h2>
            </div>

            <span className="explore-count">
              {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
            </span>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tools.map((tool, index) => (
              <div
                key={tool._id}
                className="explore-tool-item"
                style={{
                  '--card-delay': `${Math.min(index * 65, 650)}ms`,
                }}
              >
                <ToolCard
                  tool={tool}
                  onCompare={addCompare}
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="explore-empty card p-12 text-center">
          <div className="explore-empty-icon">
            <Search size={24} />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            No tools available
          </h2>

          <p className="mt-2 text-[#756b86]">
            There are no tools to display right now. Please try again
            later.
          </p>
        </div>
      )}

      {/* Floating comparison bar */}
      {compare.length > 0 && (
        <div className="explore-compare-bar fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-24px)] max-w-max -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#e8def8] bg-white/95 px-4 py-3 shadow-[0_18px_55px_rgba(35,12,58,0.18)] backdrop-blur-xl sm:gap-4 sm:px-5 sm:py-4">
          <div className="explore-compare-icon">
            <GitCompare size={19} />
          </div>

          <div className="min-w-0 flex-1 text-sm font-semibold text-[#21172b]">
            <span className="block text-xs font-medium text-[#756b86]">
              Selected for comparison
            </span>

            <span className="block max-w-[180px] truncate sm:max-w-[320px]">
              {compare.map((item) => item.name).join(' · ')}
            </span>
          </div>

          <Link
            to={
              '/compare?ids=' +
              compare.map((item) => item._id).join(',')
            }
            className="btn btn-primary shrink-0"
          >
            Compare
          </Link>

          <button
            type="button"
            aria-label="Clear comparison"
            onClick={() => setCompare([])}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#756b86] transition-colors duration-150 hover:bg-[#f3e8ff] hover:text-[#6d28d9]"
          >
            <X size={19} />
          </button>
        </div>
      )}
    </main>
  );
}
