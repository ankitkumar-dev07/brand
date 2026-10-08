import { Link } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

export default function Preview() {
  return (
    <main className="container-x py-12">
      <div className="max-w-3xl mx-auto text-center">
        <span className="chip">
          Preview
        </span>

        <h1 className="mt-5 text-5xl font-extrabold">
          Your software discovery workspace.
        </h1>

        <p className="mt-4 text-[#756b86] text-lg">
          This is the same dashboard pattern used inside BrandCliqs.
        </p>
      </div>

      <div className="mt-12 rounded-[30px] bg-[#210846] p-6 md:p-9 text-white shadow-soft">
        <div className="flex justify-between items-center">
          <div className="font-bold">
            Brand
            <span className="text-orange-400">
              Cliqs
            </span>
          </div>

          <Link
            className="btn bg-orange-400 text-white"
            to="/register"
          >
            Start Free Cliq
          </Link>
        </div>

        <h2 className="mt-12 text-4xl font-bold">
          Find the right tool faster.
        </h2>

        <div className="mt-6 bg-white/10 border border-white/15 rounded-xl p-4 flex gap-3">
          <Search />
          Search 200+ tools...
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          {[
            'ChatGPT',
            'HubSpot',
            'Trello',
            'Canva',
            'Zapier',
            'Claude',
          ].map((x) => (
            <div
              className="bg-white text-[#171322] rounded-xl p-5"
              key={x}
            >
              <div className="font-semibold">
                {x}
              </div>

              <div className="text-xs text-[#756b86] mt-2">
                Discover details →
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-white rounded-2xl text-[#171322] p-5 flex gap-3 items-center">
          <div className="h-11 w-11 bg-[#f3e8ff] rounded-xl grid place-items-center text-[#6D28D9]">
            <Sparkles />
          </div>

          <div>
            <div className="text-sm text-[#756b86]">
              Suggested for you
            </div>

            <b>
              Try HubSpot CRM to grow sales →
            </b>
          </div>
        </div>
      </div>
    </main>
  );
}