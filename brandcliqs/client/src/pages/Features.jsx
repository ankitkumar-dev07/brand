import { Link } from 'react-router-dom';
import {
  Search,
  GitCompare,
  Heart,
  Sparkles,
  ListChecks,
  ShieldCheck,
} from 'lucide-react';

const items = [
  [
    '200+ curated tools',
    'A growing catalog organized by category, industry and audience.',
    Search,
  ],
  [
    'Side-by-side compare',
    'Evaluate similar products without ten browser tabs.',
    GitCompare,
  ],
  [
    'Favorites & lists',
    'Keep the tools you love and build focused stacks.',
    Heart,
  ],
  [
    'AI recommendations',
    'Describe your need and get useful software suggestions.',
    Sparkles,
  ],
  [
    'Fast discovery',
    'Search by name, description, category or tag.',
    ListChecks,
  ],
  [
    'Trust-first catalog',
    'Curated records, pricing labels and product links.',
    ShieldCheck,
  ],
];

export default function Features() {
  return (
    <main className="container-x py-16">
      <div className="max-w-3xl">
        <span className="chip">
          Features
        </span>

        <h1 className="mt-5 text-5xl font-extrabold">
          A calmer way to choose software.
        </h1>

        <p className="mt-5 text-lg text-[#756b86] leading-8">
          BrandCliqs turns a messy software hunt into one focused workspace
          for discovery, comparison and saving.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {items.map(([a, b, I]) => (
          <div
            className="card p-7"
            key={a}
          >
            <div className="h-12 w-12 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
              <I />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              {a}
            </h2>

            <p className="mt-2 text-[#756b86] leading-7">
              {b}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-[#210846] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold">
            Ready to stop tab-switching?
          </h2>

          <p className="text-white/70 mt-2">
            Explore the catalog or start your free account.
          </p>
        </div>

        <Link
          className="btn bg-white text-[#5b21b6]"
          to="/explore"
        >
          Explore tools
        </Link>
      </div>
    </main>
  );
}