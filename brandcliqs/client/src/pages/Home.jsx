import { Link } from 'react-router-dom';

import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  Layers,
  Compass,
  Zap,
  BarChart3,
  Plug,
  Users,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import api from '../services/api';
import ToolCard from '../components/ToolCard';

import toolsMarketplaceImage from '../assets/tools-marketplace.png';

const values = [
  [
    'Simplicity',
    'Everything within a click or two.',
    Zap,
  ],
  [
    'Trust',
    'Curated, honest, and regularly updated listings.',
    ShieldCheck,
  ],
  [
    'Growth',
    'Tools that help people and businesses grow.',
    ArrowRight,
  ],
  [
    'Inclusivity',
    'Built for startups, enterprises, and individuals.',
    Layers,
  ],
  [
    'Discovery',
    'Helping users find tools they did not know existed.',
    Compass,
  ],
];

const discoverFeatures = [
  {
    icon: Search,
    title: 'Discover tools',
    description:
      'Find the right marketing tools, platforms and software for your goals.',
  },
  {
    icon: Plug,
    title: 'Connect integrations',
    description:
      'Bring your marketing stack together and simplify the way your tools work.',
  },
  {
    icon: BarChart3,
    title: 'Analyze performance',
    description:
      'Understand what is working across your marketing channels and campaigns.',
  },
  {
    icon: Users,
    title: 'Hire the right agency',
    description:
      'Connect with agencies that match your goals, budget and industry.',
  },
];

export default function Home() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api
      .get('/tools?limit=6&featured=true')
      .then((r) => {
        setTools(r.data.tools || []);
      })
      .catch(() => {
        setTools([]);
      });
  }, []);

  return (
    <div>
      {/* ================= HERO ================= */}

      <section className="container-x pt-12 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT */}

        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-.055em] leading-[.98]">
            Amplify your{' '}
            <span className="gradient-text">
              marketing engine.
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-[#756b86] leading-8 max-w-[650px]">
            Discover tools, connect integrations, analyze
            performance, and hire the right agency — all from
            one powerful marketing ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="btn btn-primary px-6 py-3"
            >
              Start Free Cliq
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/login"
              className="btn btn-outline px-6 py-3"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* RIGHT - CLIENT PROVIDED IMAGE */}

        <div className="relative">
          <div className="rounded-[28px] overflow-hidden border border-[#eee9f2] bg-[#210846] shadow-[0_25px_80px_rgba(55,20,90,.20)]">
            <img
              src={toolsMarketplaceImage}
              alt="BrandCliqs Tool Marketplace"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating suggestion */}

          <div className="absolute -bottom-6 -left-4 md:-left-7 bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(30,10,60,.18)] border border-[#eee8f4] w-64">
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-xs text-[#756b86]">
                  BrandCliqs suggestion
                </p>

                <p className="font-semibold text-sm text-[#171322]">
                  Build a smarter marketing stack →
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DISCOVER ================= */}

      <section className="container-x py-16">
        <div className="max-w-3xl">
          <span className="chip">
            Discover
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Everything your marketing engine needs.
          </h2>

          <p className="mt-4 text-lg text-[#756b86] leading-8">
            BrandCliqs brings the tools, connections and
            intelligence you need to discover opportunities,
            make better decisions and grow faster.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {discoverFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="h-12 w-12 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-[#756b86] text-sm leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TOOL DISCOVERY ================= */}

      <section className="container-x py-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="chip">
            Tool Discovery
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Discover the tools that fit your business.
          </h2>

          <p className="mt-4 text-lg text-[#756b86] leading-8">
            Search across marketing platforms, software and
            business tools. Compare options, explore categories
            and find solutions that match the way you work.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'Marketing',
              'AI',
              'Finance',
              'Operations',
              'Businesses',
              'Individuals',
            ].map((x) => (
              <span
                className="chip"
                key={x}
              >
                {x}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <Link
              to="/products/tool-marketplace"
              className="btn btn-primary"
            >
              Explore Tools
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="card p-5 bg-[#fbf8ff]">
          <div className="text-[#756b86] flex gap-2 items-center mb-4">
            <Search size={18} />
            Find the right tool
          </div>

          <input
            className="input"
            placeholder="Search marketing tools"
          />

          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="bg-white rounded-xl border p-4">
              <span className="text-xs text-[#8a8094]">
                Category
              </span>

              <p className="font-medium">
                All categories
              </p>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <span className="text-xs text-[#8a8094]">
                Audience
              </span>

              <p className="font-medium">
                Businesses · Individuals
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            {[
              'All',
              'A · AI',
              'F · Finance',
              'M · Marketing',
              'O · Ops',
            ].map((x, i) => (
              <span
                key={x}
                className={
                  i === 0
                    ? 'chip bg-[#6D28D9] text-white border-[#6D28D9]'
                    : 'chip'
                }
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR TOOLS ================= */}

      <section className="container-x py-16">
        <div className="flex justify-between items-end">
          <div>
            <span className="chip">
              Popular Tools
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              Find your next favorite tool.
            </h2>

            <p className="mt-3 text-[#756b86] max-w-2xl">
              Explore curated tools and discover software
              that can improve your marketing workflow.
            </p>
          </div>

          <Link
            to="/products/tool-marketplace"
            className="hidden sm:block text-[#6D28D9] font-semibold"
          >
            Explore all →
          </Link>
        </div>

        {tools.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {tools.map((tool) => (
              <ToolCard
                key={tool._id}
                tool={tool}
              />
            ))}
          </div>
        ) : (
          <div className="card p-8 mt-8 text-center">
            <p className="text-[#756b86]">
              Explore our marketing tools and discover
              the right solutions for your workflow.
            </p>

            <Link
              to="/products/tool-marketplace"
              className="btn btn-primary mt-5 inline-flex"
            >
              Explore Tools
              <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}

      <section className="container-x py-16">
        <div className="rounded-[28px] bg-[#210846] p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-white/60">
              BrandCliqs
            </span>

            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold">
              Amplify your marketing engine.
            </h2>

            <p className="mt-4 text-white/70 leading-7">
              Discover tools, connect integrations, analyze
              performance and find the right agency for your
              next stage of growth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="btn bg-white text-[#210846] hover:bg-white/90"
              >
                Start Free Cliq
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/login"
                className="btn border border-white/20 text-white hover:bg-white/10"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}

      <section className="py-20 border-y border-[#eee9f2]">
        <div className="container-x text-center">
          <span className="chip border-orange-200 text-orange-500 bg-orange-50">
            Core Values
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            What we stand for
          </h2>

          <p className="mt-3 text-lg text-[#756b86]">
            The principles that guide every listing, every
            suggestion, every click.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 text-left">
            {values.map(([title, description, Icon]) => (
              <div
                className="card p-6"
                key={title}
              >
                <div className="h-11 w-11 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 font-semibold text-lg">
                  {title}
                </h3>

                <p className="mt-2 text-[#756b86] text-sm leading-6">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}