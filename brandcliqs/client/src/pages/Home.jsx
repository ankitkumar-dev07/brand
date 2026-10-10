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

// Company logos
import claudeLogo from '../assets/Claude.png';
import clickUpLogo from '../assets/ClickUp.png';
import facebookLogo from '../assets/Facebook.png';
import fluxLogo from '../assets/Flux.png';
import instagramLogo from '../assets/Instagram.png';
import klingLogo from '../assets/Kling.png';
import makeLogo from '../assets/Make.png';
import manusLogo from '../assets/Manus.png';
import midjourneyLogo from '../assets/Midjourney.png';
import nanobananaLogo from '../assets/Nanobanana.png';
import notebookLMLogo from '../assets/NotebookLM.png';
import notionAILogo from '../assets/Notion_AI.png';
import obsidianLogo from '../assets/Obsidian.png';
import perplexityLogo from '../assets/Perplexity.png';
import runwayLogo from '../assets/Runway.png';
import youtubeLogo from '../assets/YouTube.png';
import zapierLogo from '../assets/Zapier.png';

const values = [
  ['Simplicity', 'Everything within a click or two.', Zap],
  ['Trust', 'Curated, honest, and regularly updated listings.', ShieldCheck],
  ['Growth', 'Tools that help people and businesses grow.', ArrowRight],
  ['Inclusivity', 'Built for startups, enterprises, and individuals.', Layers],
  ['Discovery', 'Helping users find tools they did not know existed.', Compass],
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

const companyLogos = [
  { name: 'Claude', image: claudeLogo },
  { name: 'ClickUp', image: clickUpLogo },
  { name: 'Facebook', image: facebookLogo },
  { name: 'Flux', image: fluxLogo },
  { name: 'Instagram', image: instagramLogo },
  { name: 'Kling', image: klingLogo },
  { name: 'Make', image: makeLogo },
  { name: 'Manus', image: manusLogo },
  { name: 'Midjourney', image: midjourneyLogo },
  { name: 'Nanobanana', image: nanobananaLogo },
  { name: 'NotebookLM', image: notebookLMLogo },
  { name: 'Notion AI', image: notionAILogo },
  { name: 'Obsidian', image: obsidianLogo },
  { name: 'Perplexity', image: perplexityLogo },
  { name: 'Runway', image: runwayLogo },
  { name: 'YouTube', image: youtubeLogo },
  { name: 'Zapier', image: zapierLogo },
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
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-.055em] leading-[.98]">
            Amplify your{' '}
            <span className="gradient-text">marketing engine.</span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-[#756b86] leading-8 max-w-[650px]">
            Discover tools, connect integrations, analyze performance, and
            hire the right agency — all from one powerful marketing ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary px-6 py-3">
              Start Free Cliq
              <ArrowRight size={17} />
            </Link>

            <Link to="/login" className="btn btn-outline px-6 py-3">
              Log in
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}

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
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Everything your marketing engine needs.
          </h2>

          <p className="mt-4 text-lg text-[#756b86] leading-8">
            BrandCliqs brings the tools, connections and intelligence you need
            to discover opportunities, make better decisions and grow faster.
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

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

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
          <span className="chip">Tool Discovery</span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Discover the tools that fit your business.
          </h2>

          <p className="mt-4 text-lg text-[#756b86] leading-8">
            Search across marketing platforms, software and business tools.
            Compare options, explore categories and find solutions that match
            the way you work.
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
              <span className="chip" key={x}>
                {x}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <Link to="/products/tool-marketplace" className="btn btn-primary">
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

          <input className="input" placeholder="Search marketing tools" />

          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="bg-white rounded-xl border p-4">
              <span className="text-xs text-[#8a8094]">Category</span>
              <p className="font-medium">All categories</p>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <span className="text-xs text-[#8a8094]">Audience</span>
              <p className="font-medium">Businesses · Individuals</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            {['All', 'A · AI', 'F · Finance', 'M · Marketing', 'O · Ops'].map(
              (x, i) => (
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
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================= ANIMATED COMPANY LOGOS ================= */}

      <section className="container-x py-16 overflow-hidden">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#8a8094]">
            Tools that power your workflow
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[#171322]">
            Your favorite tools, all in one place.
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-white to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-logo-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12"
                aria-hidden={group === 1}
              >
                {companyLogos.map(({ name, image }) => (
                  <div
                    key={name}
                    title={name}
                    className="flex w-24 md:w-28 shrink-0 flex-col items-center justify-center gap-3 py-3"
                  >
                    <div className="flex h-12 md:h-14 w-full items-center justify-center">
                      <img
                        src={image}
                        alt={group === 0 ? name : ''}
                        loading="eager"
                        draggable="false"
                        className="max-h-11 max-w-[76px] md:max-h-12 md:max-w-[88px] object-contain transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    <span className="text-xs md:text-sm font-medium text-[#756b86] whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR TOOLS ================= */}
      {/* No tools? Hide this entire section, including its fallback card. */}

      {tools.length > 0 && (
        <section className="container-x py-16">
          <div className="flex justify-between items-end">
            <div>
              <span className="chip">Popular Tools</span>

              <h2 className="mt-4 text-4xl font-bold">
                Find your next favorite tool.
              </h2>

              <p className="mt-3 text-[#756b86] max-w-2xl">
                Explore curated tools and discover software that can improve
                your marketing workflow.
              </p>
            </div>

            <Link
              to="/products/tool-marketplace"
              className="hidden sm:block text-[#6D28D9] font-semibold"
            >
              Explore all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {tools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        </section>
      )}

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
              Discover tools, connect integrations, analyze performance and
              find the right agency for your next stage of growth.
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

          <h2 className="mt-4 text-4xl font-bold">What we stand for</h2>

          <p className="mt-3 text-lg text-[#756b86]">
            The principles that guide every listing, every suggestion, every
            click.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 text-left">
            {values.map(([title, description, Icon]) => (
              <div className="card p-6" key={title}>
                <div className="h-11 w-11 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 font-semibold text-lg">{title}</h3>

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
