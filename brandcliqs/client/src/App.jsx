
import { Routes, Route } from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollTop from './components/ScrollTop';

import Home from './pages/Home';
import Explore from './pages/Explore';
import ToolDetails from './pages/ToolDetails';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Preview from './pages/Preview';
import Recommendations from './pages/Recommendations';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Support from './pages/Support';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import ListDetails from './pages/ListDetails';
import Admin from './pages/Admin';
import { Privacy, Terms } from './pages/Legal';

/* -------------------------------- */
/* PRODUCT PAGE */
/* -------------------------------- */

function ProductPage({
  title,
  heading,
  description,
  solution,
  image,
}) {
  return (
    <main className="container-x py-16">
      <div className="max-w-6xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#171322] tracking-tight">
          {heading}
        </h1>

        {image && (
          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#eee9f2] bg-[#210846] shadow-[0_25px_80px_rgba(55,20,90,.15)]">
            <img
              src={image}
              alt={`${title || heading} dashboard`}
              className="block w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="card p-7">
            <h2 className="text-2xl font-bold">
              Challenge
            </h2>

            <p className="mt-3 text-[#756b86] leading-7">
              {description}
            </p>
          </div>

          <div className="card p-7">
            <h2 className="text-2xl font-bold">
              Gap We Close
            </h2>

            <p className="mt-3 text-[#756b86] leading-7">
              {solution}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* JOBS */
/* -------------------------------- */

function Jobs() {
  return (
    <main className="container-x py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Build the future with BrandCliqs.
        </h1>

        <p className="mt-5 text-lg text-[#756b86] leading-8">
          We are building a connected marketing ecosystem for
          modern businesses, marketers and agencies.
        </p>

        <div className="card p-7 mt-10">
          <h2 className="text-2xl font-bold">
            Opportunities
          </h2>

          <p className="mt-3 text-[#756b86] leading-7">
            Interested in working with BrandCliqs? Contact us
            with your profile, skills and the role you are
            interested in.
          </p>

          <a
            href="mailto:careers@brandcliqs.com"
            className="btn btn-primary mt-6"
          >
            Contact Hiring Team
          </a>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* BLOG */
/* -------------------------------- */

function Blog() {
  return (
    <main className="container-x py-16">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Marketing ideas, tools and growth insights.
        </h1>

        <p className="mt-5 text-lg text-[#756b86] leading-8">
          Explore practical ideas around marketing technology,
          analytics, agencies and business growth.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <article className="card p-7">
            <h2 className="text-xl font-bold">
              Building a smarter marketing stack
            </h2>

            <p className="mt-3 text-[#756b86]">
              Discover how connected tools can simplify
              marketing workflows.
            </p>
          </article>

          <article className="card p-7">
            <h2 className="text-xl font-bold">
              Turning marketing data into growth
            </h2>

            <p className="mt-3 text-[#756b86]">
              Learn how better analytics can help teams make
              stronger decisions.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* APP */
/* -------------------------------- */

export default function App() {
  return (
    <>
      <ScrollTop />

      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route
            path="/products/tool-marketplace"
            element={
              <ProductPage
                heading="Build your perfect marketing stack & integration in minutes."
                description="Juggling 100+ marketing platforms, repeating manual tasks, and running campaigns that feel scattered and slow."
                solution="All-in-one tools to plan, automate, and manage your campaigns from a single dashboard."
              />
            }
          />

          <Route
            path="/products/growth-analytics"
            element={
              <ProductPage
                title="Growth Analytics"
                heading="Track every click. Grow every channel."
                description="Data is spread across channels, reports are confusing, and it's hard to tell which campaigns actually bring results."
                solution="Clear, real-time dashboards that bring all your performance data together. Track ROI, spot what's working, and see what isn't."
                image="/WhatsApp%20Image%202026-10-08%20at%201.33.14%20PM.jpeg"
              />
            }
          />

          <Route
            path="/products/agency-cliq"
            element={
              <ProductPage
                title="Agency Cliq"
                heading="Find the right agency for your growth."
                description="Finding a trustworthy agency is time-consuming, and a wrong choice wastes budget and delays growth."
                solution="Connect with vetted agencies matched to your goals, budget, and industry, so you work with experts who deliver."
              />
            }
          />

          <Route
            path="/products/growth-insights"
            element={
              <ProductPage
                title="Growth Insights"
                heading="Turn your marketing data into direction."
                description="You have the numbers but not the direction. Without understanding your audience, market, and competitors, decisions become guesswork."
                solution="Actionable insights on customer behavior, industry trends, and competitor activity, so every decision is backed by evidence."
              />
            }
          />

          <Route path="/tools/:slug" element={<ToolDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/use-cases" element={<Solutions />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/recommendations" element={<Recommendations />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/support" element={<Support />} />
          <Route path="/compare" element={<Compare />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lists/:id"
            element={
              <ProtectedRoute>
                <ListDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </SiteLayout>
    </>
  );
}
