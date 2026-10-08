import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  Heart,
  List,
  GitCompare,
  Sparkles,
  LogOut,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [fav, setFav] = useState([]);
  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!user) return;

    api
      .get('/users/favorites')
      .then((r) => setFav(r.data.favorites))
      .catch(() => {});

    api
      .get('/lists')
      .then((r) => setLists(r.data.lists))
      .catch(() => {});
  }, [user]);

  const create = async () => {
    if (!name) return;

    const r = await api.post('/lists', { name });

    setLists([...lists, r.data.list]);
    setName('');
  };

  if (!user) {
    return null;
  }

  return (
    <main className="container-x py-10">
      <div className="grid lg:grid-cols-[230px_1fr] gap-7">
        <aside className="card p-4 h-fit">
          <div className="font-bold px-3 py-2">
            Workspace
          </div>

          {[
            ['Overview', '/dashboard'],
            ['Explore', '/explore'],
            ['Favorites', '#fav'],
            ['My Lists', '#lists'],
            ['Compare', '/compare'],
            ['Recommendations', '/recommendations'],
          ].map(([n, p]) => (
            <Link
              className="block rounded-xl px-3 py-3 hover:bg-[#f8f5fb]"
              key={n}
              to={p}
            >
              {n}
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full text-left px-3 py-3 text-red-600 flex gap-2"
          >
            <LogOut size={17} />
            Logout
          </button>
        </aside>

        <section>
          <div className="card p-7 bg-[#210846] text-white">
            <p className="text-white/60">
              Good to see you
            </p>

            <h1 className="text-3xl font-bold mt-1">
              Welcome, {user?.name || 'there'}.
            </h1>

            <p className="mt-2 text-white/70">
              You are on the{' '}
              <b className="text-orange-400">
                {user?.plan || 'Free'}
              </b>{' '}
              plan.
            </p>

            <div className="mt-5">
              <Link
                className="btn bg-white text-[#5b21b6]"
                to="/recommendations"
              >
                <Sparkles size={16} />
                Get a recommendation
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <div className="card p-5">
              <Heart className="text-[#6D28D9]" />

              <p className="text-[#756b86] mt-4">
                Favorites
              </p>

              <b className="text-2xl">
                {fav.length}
              </b>
            </div>

            <div className="card p-5">
              <List className="text-[#6D28D9]" />

              <p className="text-[#756b86] mt-4">
                Saved lists
              </p>

              <b className="text-2xl">
                {lists.length}
              </b>
            </div>

            <div className="card p-5">
              <GitCompare className="text-[#6D28D9]" />

              <p className="text-[#756b86] mt-4">
                Plan
              </p>

              <b className="text-2xl capitalize">
                {user?.plan || 'Free'}
              </b>
            </div>
          </div>

          <section
            id="fav"
            className="mt-10"
          >
            <h2 className="text-2xl font-bold">
              Your favorites
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {fav.length ? (
                fav.map((t) => (
                  <Link
                    className="card p-5"
                    to={'/tools/' + t.slug}
                    key={t._id}
                  >
                    <b>{t.name}</b>

                    <p className="text-sm text-[#756b86] mt-2">
                      {t.category}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="card p-6 text-[#756b86]">
                  No favorites yet. Explore the catalog to save tools.
                </div>
              )}
            </div>
          </section>

          <section
            id="lists"
            className="mt-10"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                My lists
              </h2>

              <div className="flex gap-2">
                <input
                  className="input max-w-56"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="List name"
                />

                <button
                  className="btn btn-primary"
                  onClick={create}
                >
                  Create
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {lists.map((l) => (
                <Link
                  className="card p-5"
                  to={'/lists/' + l._id}
                  key={l._id}
                >
                  <b>{l.name}</b>

                  <p className="text-sm text-[#756b86] mt-2">
                    {l.tools?.length || 0} tools
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}