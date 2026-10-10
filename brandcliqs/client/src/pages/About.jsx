
import {
  ArrowRight,
  Compass,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';

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

export default function About() {
  return (
    <main className="container-x py-14">
      <section className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Made to end the endless tab-switching.
          </h1>

          <p className="mt-5 text-lg text-[#756b86] leading-8">
            We know how it goes — you need a new tool, you open ten tabs, you
            compare four review sites, you still don't decide. BrandCliqs is
            the calmer, faster way.
          </p>
        </div>

        <div className="space-y-5">
          {[
            [
              'Vision',
              'One platform where every app, from A to Z, is just one cliq away.',
              Compass,
            ],
            [
              'Mission',
              'We connect people and businesses to the right apps, faster, through simple branches and one-cliq access.',
              Zap,
            ],
          ].map(([a, b, I]) => (
            <div className="card p-7" key={a}>
              <div className="flex items-center gap-3 font-bold text-lg">
                <I className="text-[#6D28D9]" />
                {a}
              </div>

              <p className="mt-7 text-[#756b86] leading-7">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 text-center">
        <span className="chip border-orange-200 text-orange-500 bg-orange-50">
          Core values
        </span>

        <h2 className="mt-4 text-4xl font-bold">
          What we stand for
        </h2>

        <p className="mt-3 text-lg text-[#756b86]">
          The principles that guide every listing, every suggestion, every
          click.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10 text-left">
          {values.map(([a, b, I]) => (
            <div className="card p-6" key={a}>
              <div className="h-11 w-11 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9]">
                <I />
              </div>

              <h3 className="mt-5 font-semibold text-lg">
                {a}
              </h3>

              <p className="mt-2 text-[#756b86] text-sm leading-6">
                {b}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
