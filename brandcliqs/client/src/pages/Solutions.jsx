
import { Link, useLocation } from 'react-router-dom';

const audienceSolutions = [
  {
    title: 'Marketers',
    subtitle: 'Run every channel from one workspace',
    description:
      'Manage your marketing stack, campaigns, analytics and growth activities from one connected workspace.',
    highlights: [
      'Full tool access',
      'Unified analytics',
      'Insights',
      'Agency access',
    ],
  },
  {
    title: 'Individuals',
    subtitle: 'Launch lean, grow fast',
    description:
      'Get the tools, insights and support you need to build a strong marketing engine without unnecessary complexity.',
    highlights: [
      'Affordable stack',
      'Dedicated manager',
      'Growth insights',
      'Vetted agency access',
    ],
  },
  {
    title: 'Enterprise / Agencies',
    subtitle: 'Amplify your mission',
    description:
      'Bring your marketing operations together with powerful analytics, multi-brand visibility and expert support.',
    highlights: [
      'Multi-brand analytics',
      'Unlimited tools',
      'Unlimited insights',
      'Custom agency search',
    ],
  },
  {
    title: 'Students / Universities',
    subtitle: 'Your marketing career starts here',
    description:
      'Learn, explore and gain practical exposure to the tools and insights used by modern marketing teams.',
    highlights: [
      'Tools & insight access',
      'Marketing resources',
      'Practical learning',
      'Growth opportunities',
    ],
  },
];

const useCases = [
  {
    number: '01',
    title: 'Tool Marketplace',
    heading: 'Build your perfect marketing stack.',
    description:
      'Juggling 100+ marketing platforms, repeating manual tasks, and running campaigns that feel scattered and slow.',
    solution:
      'All-in-one tools to plan, automate, and manage your campaigns from a single dashboard.',
    to: '/products/tool-marketplace',
  },
  {
    number: '02',
    title: 'Growth Analytics',
    heading: 'Track every click. Grow every channel.',
    description:
      "Data is spread across channels, reports are confusing, and it's hard to tell which campaigns actually bring results.",
    solution:
      "Clear, real-time dashboards that bring all your performance data together. Track ROI, spot what's working, and see what isn't.",
    to: '/products/growth-analytics',
  },
  {
    number: '03',
    title: 'Agency Cliq',
    heading: 'Find the right agency for your growth.',
    description:
      'Finding a trustworthy agency is time-consuming, and a wrong choice wastes budget and delays growth.',
    solution:
      'Connect with vetted agencies matched to your goals, budget, and industry, so you work with experts who deliver.',
    to: '/products/agency-cliq',
    image: '/brandcliqs-agency-cliq.png',
  },
  {
    number: '04',
    title: 'Growth Insights',
    heading: 'Turn your numbers into clear direction.',
    description:
      'You have the numbers but not the direction. Without understanding your audience, market, and competitors, decisions become guesswork.',
    solution:
      'Actionable insights on customer behavior, industry trends, and competitor activity, so every decision is backed by evidence.',
    to: '/products/growth-insights',
  },
];

function SolutionsFor() {
  return (
    <>
      <section className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171322]">
          Built around your goals.
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-[#756b86] leading-8">
          Choose the experience that best fits your team, business or
          learning journey.
        </p>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-6">
        {audienceSolutions.map((item) => (
          <article
            key={item.title}
            className="card p-6 md:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-soft"
          >
            <h2 className="text-2xl font-bold text-[#171322]">
              {item.title}
            </h2>

            <p className="mt-2 text-lg font-semibold text-[#6D28D9]">
              {item.subtitle}
            </p>

            <p className="mt-4 text-[#756b86] leading-7">
              {item.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-[#f8f5fb] px-3 py-2 text-sm text-[#5f556d]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function SolutionsUseCases() {
  return (
    <>
      <section className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171322]">
          Solve the problems slowing your growth.
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-[#756b86] leading-8">
          From finding the right tools to connecting with the right
          agency, BrandCliqs brings everything together.
        </p>
      </section>

      <section className="mt-10 space-y-8">
        {useCases.map((item) => (
          <article
            key={item.title}
            className="card p-6 md:p-9 transition-all duration-200 hover:shadow-soft"
          >
            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-[#f3eefe] text-[#6D28D9] grid place-items-center font-bold">
                  {item.number}
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#171322]">
                    {item.heading}
                  </h2>
                </div>
              </div>

              {item.image && (
                <div className="w-full overflow-hidden rounded-2xl border border-[#eee9f2] bg-[#210846] shadow-[0_25px_70px_rgba(55,20,90,.15)]">
                  <img
                    src={item.image}
                    alt="Agency Cliq dashboard"
                    className="block w-full h-auto"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#171322]">
                    The Gap We Close
                  </h3>

                  <p className="mt-2 text-[#756b86] leading-7">
                    {item.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#171322]">
                    The BrandCliqs Solution
                  </h3>

                  <p className="mt-2 text-[#756b86] leading-7">
                    {item.solution}
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-2 font-semibold text-[#6D28D9] transition-colors hover:text-[#c65bd4]"
                >
                  Explore {item.title}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 rounded-xl border border-[#e6d9f8] px-5 py-3 font-semibold text-[#6D28D9] transition-all hover:bg-[#f8f5ff]"
        >
          ← Back to Solutions
        </Link>
      </section>
    </>
  );
}

export default function Solutions() {
  const location = useLocation();
  const isUseCases = location.pathname === '/solutions/use-cases';

  return (
    <main className="container-x py-12 md:py-16">
      {isUseCases ? <SolutionsUseCases /> : <SolutionsFor />}
    </main>
  );
}
