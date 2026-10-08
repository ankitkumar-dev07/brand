import { useEffect, useState } from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import {
  ExternalLink,
  Heart,
  Plus,
  GitCompare,
  Star,
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function ToolDetails() {
  const { slug } = useParams();

  const [tool, setTool] = useState(null);
  const [lists, setLists] = useState([]);
  const [showLists, setShowLists] = useState(false);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    api
      .get('/tools/' + slug)
      .then((r) => {
        setTool(r.data.tool);

        api
          .post(
            '/users/recently-viewed/' +
              r.data.tool._id
          )
          .catch(() => {});

        return api.get(
          '/tools?category=' +
            encodeURIComponent(r.data.tool.category) +
            '&limit=4'
        );
      })
      .then((r) => setSimilar(r.data.tools))
      .catch(() => {});
  }, [slug]);

  useEffect(() => {
    api
      .get('/lists')
      .then((r) => setLists(r.data.lists))
      .catch(() => {});
  }, []);

  if (!tool) {
    return (
      <main className="container-x py-20">
        Loading...
      </main>
    );
  }

  const favorite = async () => {
    try {
      await api.post(
        '/users/favorites/' + tool._id
      );

      toast.success('Saved to favorites');
    } catch (e) {
      toast.error('Log in to save favorites');
    }
  };

  return (
    <main className="container-x py-12">
      <div className="text-sm text-[#756b86]">
        <Link to="/explore">
          Explore
        </Link>{' '}
        / {tool.name}
      </div>

      <section className="card p-8 mt-5">
        <div className="flex flex-col md:flex-row gap-7">
          <div className="h-20 w-20 rounded-2xl bg-[#f3e8ff] grid place-items-center text-2xl font-bold text-[#6D28D9]">
            {tool.name
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <span className="chip">
                {tool.category}
              </span>

              <span className="chip">
                {tool.pricingType}
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-extrabold">
              {tool.name}
            </h1>

            <p className="mt-3 text-lg text-[#756b86] max-w-3xl">
              {tool.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href={tool.website}
                target="_blank"
                rel="noreferrer"
              >
                Visit website
                <ExternalLink size={16} />
              </a>

              <button
                className="btn btn-outline"
                onClick={favorite}
              >
                <Heart size={16} />
                Favorite
              </button>

              <Link
                className="btn btn-outline"
                to={'/compare?ids=' + tool._id}
              >
                <GitCompare size={16} />
                Compare
              </Link>

              <button
                className="btn btn-outline"
                onClick={() =>
                  setShowLists((v) => !v)
                }
              >
                <Plus size={16} />
                Add to list
              </button>
            </div>
          </div>

          {showLists && (
            <div className="mt-4 p-4 rounded-xl bg-[#fbf9fd] border flex flex-wrap gap-2">
              {lists.length ? (
                lists.map((l) => (
                  <button
                    key={l._id}
                    onClick={async () => {
                      await api.post(
                        '/lists/' +
                          l._id +
                          '/tools/' +
                          tool._id
                      );

                      toast.success(
                        'Added to ' + l.name
                      );

                      setShowLists(false);
                    }}
                    className="chip"
                  >
                    {l.name}
                  </button>
                ))
              ) : (
                <Link
                  className="text-[#6D28D9]"
                  to="/dashboard"
                >
                  Create a list in your dashboard →
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <div className="rounded-2xl bg-[#fbf9fd] p-5">
            <p className="text-sm text-[#756b86]">
              Rating
            </p>

            <p className="text-xl font-bold mt-1 flex gap-2">
              <Star
                className="text-orange-400"
                fill="currentColor"
                size={20}
              />
              {tool.rating}/5
            </p>
          </div>

          <div className="rounded-2xl bg-[#fbf9fd] p-5">
            <p className="text-sm text-[#756b86]">
              Audience
            </p>

            <p className="font-bold mt-1">
              {tool.audience}
            </p>
          </div>

          <div className="rounded-2xl bg-[#fbf9fd] p-5">
            <p className="text-sm text-[#756b86]">
              Industry
            </p>

            <p className="font-bold mt-1">
              {tool.industry}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <div>
            <h2 className="text-xl font-bold">
              Features
            </h2>

            <ul className="mt-4 space-y-3">
              {tool.features?.map((f) => (
                <li
                  className="flex gap-2"
                  key={f}
                >
                  ✓ {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Tags
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {tool.tags?.map((t) => (
                <span
                  className="chip"
                  key={t}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-bold">
          Similar tools
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {similar
            .filter((x) => x._id !== tool._id)
            .slice(0, 4)
            .map((x) => (
              <Link
                key={x._id}
                to={'/tools/' + x.slug}
                className="card p-5 hover:-translate-y-1 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-[#f3e8ff] grid place-items-center text-[#6D28D9] font-bold">
                  {x.name.slice(0, 2)}
                </div>

                <h3 className="mt-4 font-semibold">
                  {x.name}
                </h3>

                <p className="text-sm text-[#756b86] mt-1 line-clamp-2">
                  {x.description}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}