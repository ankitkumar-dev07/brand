
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Sparkles,
  BarChart3,
  Plug,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import api from '../services/api';
import ToolCard from '../components/ToolCard';
import Reveal from '../components/Reveal';

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

const agencyCategories = [
  {
    name: 'Digital Marketing Agencies',
    category: 'Digital Marketing',
    description:
      'Find agencies that help plan and manage digital marketing campaigns.',
  },
  {
    name: 'SEO Agencies',
    category: 'SEO & Search',
    description:
      'Discover specialists focused on search visibility and organic growth.',
  },
  {
    name: 'Social Media Agencies',
    category: 'Social Media',
    description:
      'Explore agencies for social media strategy, content and campaigns.',
  },
];

export default function Home() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    let active = true;

    api
      .get('/tools?limit=6&featured=true')
      .then((response) => {
        if (active) {
          setTools(response.data.tools || []);
        }
      })
      .catch(() => {
        if (active) {
          setTools([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {/* HERO */}

      <section className="container-x pt-12 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal delay={0}>
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-.055em] leading-[.98]">
              Amplify your{' '}
              <span className="gradient-text">
                marketing engine.
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-[#756b86] leading-8 max-w-[650px]">
              Discover tools, connect integrations, analyze performance,
              and hire the right agency — all from one powerful marketing
              ecosystem.
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
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <div className="animate-float rounded-[28px] overflow-hidden border border-[#eee9f2] bg-[#210846] shadow-[0_25px_80px_rgba(55,20,90,.20)]">
              <img
                src={toolsMarketplaceImage}
                alt="BrandCliqs Tool Marketplace"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-7 bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(30,10,60,.18)] border border-[#eee8f4] w-64 transition-transform duration-300 hover:-translate-y-1">
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
        </Reveal>
      </section>

      {/* DISCOVER FEATURES */}

      <section className="container-x py-16">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Everything your marketing engine needs.
            </h2>

            <p className="mt-4 text-lg text-[#756b86] leading-8">
              BrandCliqs brings the tools, connections and intelligence
              you need to discover opportunities, make better decisions
              and grow faster.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {discoverFeatures.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="card p-6">
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
        </Reveal>
      </section>

      {/* COMPANY LOGOS */}

      <section className="container-x py-16 overflow-hidden">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#8a8094]">
              Tools that power your workflow
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[#171322]">
              Your favorite tools, all in one place.
            </h2>
          </div>
        </Reveal>

        <Reveal className="relative overflow-hidden logo-marquee">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-20 bg-gradient-to-r from-white to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-logo-marquee">
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
        </Reveal>
      </section>

      {/* AGENCY LIST */}

      <section className="container-x py-16">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find the right agency for your growth.
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-[#756b86] leading-8">
                Discover agencies for marketing, SEO, social media and
                business growth—all in one place.
              </p>
            </div>

            <Link
              to="/products/agency-cliq"
              className="btn btn-primary shrink-0"
            >
              Explore Agencies
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {agencyCategories.map((agency) => (
            <article key={agency.name} className="card p-6">
              <div className="h-12 w-12 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                <Users size={22} />
              </div>

              <span className="mt-5 inline-block text-xs font-semibold text-[#6D28D9]">
                {agency.category}
              </span>

              <h3 className="mt-2 text-xl font-bold">
                {agency.name}
              </h3>

              <p className="mt-3 text-sm text-[#756b86] leading-6">
                {agency.description}
              </p>

              <Link
                to="/products/agency-cliq"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#6D28D9] hover:text-[#c65bd4]"
              >
                Explore
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </Reveal>
      </section>

      {/* POPULAR TOOLS */}

      {tools.length > 0 && (
        <section className="container-x py-16">
          <Reveal>
            <div className="flex justify-between items-end gap-4">
              <div>
                <span className="chip">Popular Tools</span>

                <h2 className="mt-4 text-4xl font-bold">
                  Find your next favorite tool.
                </h2>

                <p className="mt-3 text-[#756b86] max-w-2xl">
                  Explore curated tools and discover software that can
                  improve your marketing workflow.
                </p>
              </div>

              <Link
                to="/products/tool-marketplace"
                className="hidden sm:block text-[#6D28D9] font-semibold"
              >
                Explore all →
              </Link>
            </div>
          </Reveal>

          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {tools.map((tool) => (
              <ToolCard key={tool._id} tool={tool} />
            ))}
          </Reveal>
        </section>
      )}

      {/* CALL TO ACTION */}

      <section className="container-x py-16">
        <Reveal>
          <div className="rounded-[28px] bg-[#210846] p-8 md:p-12 text-white transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(55,20,90,.20)]">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-white/60">
                BrandCliqs
              </span>

              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold">
                Ready to scale your marketing?
              </h2>

              <p className="mt-4 text-white/70 leading-7">
                Discover tools, connect integrations, analyze performance
                and find the right agency for your next stage of growth.
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
        </Reveal>
      </section>
    </div>
  );
}
