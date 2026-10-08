import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subs, setSubs] = useState([]);
  const [news, setNews] = useState([]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'AI',
    website: 'https://example.com',
  });

  const load = () => {
    api.get('/admin/stats').then((r) => setStats(r.data));
    api.get('/tools?limit=12').then((r) => setTools(r.data.tools));
    api.get('/admin/users').then((r) => setUsers(r.data.users));
    api
      .get('/admin/messages')
      .then((r) => setMessages(r.data.messages));
    api
      .get('/admin/subscribers')
      .then((r) => setNews(r.data.subscribers));
    api
      .get('/admin/subscriptions')
      .then((r) => setSubs(r.data.subscriptions));
  };

  useEffect(load, []);

  const add = async (e) => {
    e.preventDefault();

    try {
      await api.post('/admin/tools', form);

      toast.success('Tool added');

      setForm({
        name: '',
        description: '',
        category: 'AI',
        website: 'https://example.com',
      });

      load();
    } catch (e) {
      toast.error(
        e.response?.data?.message || 'Failed'
      );
    }
  };

  const del = async (id) => {
    if (!confirm('Delete this tool?')) return;

    await api.delete('/admin/tools/' + id);
    load();
  };

  const edit = async (t) => {
    const description = prompt(
      'Update description',
      t.description
    );

    if (description === null) return;

    await api.put('/admin/tools/' + t._id, {
      description,
    });

    toast.success('Updated');
    load();
  };

  return (
    <main className="container-x py-12">
      <h1 className="text-4xl font-extrabold">
        Admin dashboard
      </h1>

      <p className="mt-2 text-[#756b86]">
        Catalog, users and service operations.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-7">
        {stats &&
          [
            ['Users', stats.users],
            ['Tools', stats.tools],
            ['Subscribers', stats.subscribers],
            ['Messages', stats.supportMessages],
            ['Subscriptions', stats.subscriptions],
          ].map(([a, b]) => (
            <div className="card p-5" key={a}>
              <p className="text-[#756b86]">{a}</p>

              <b className="text-3xl mt-2 block">
                {b}
              </b>
            </div>
          ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-7 mt-8">
        <form
          onSubmit={add}
          className="card p-6 h-fit"
        >
          <h2 className="font-bold text-xl">
            Add tool
          </h2>

          {[
            ['name', 'Name'],
            ['description', 'Description'],
            ['website', 'Website'],
          ].map(([k, l]) => (
            <label
              className="block mt-4 text-sm font-semibold"
              key={k}
            >
              {l}

              <input
                className="input mt-2"
                value={form[k]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [k]: e.target.value,
                  })
                }
                required
              />
            </label>
          ))}

          <label className="block mt-4 text-sm font-semibold">
            Category

            <select
              className="input mt-2"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              {[
                'AI',
                'Finance',
                'Marketing',
                'Ops',
                'HR',
                'Design',
                'Development',
                'Productivity',
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>

          <button className="btn btn-primary mt-5 w-full">
            Add tool
          </button>
        </form>

        <div className="card p-6 overflow-auto">
          <h2 className="font-bold text-xl">
            Catalog management
          </h2>

          <table className="w-full mt-4 text-sm">
            <tbody>
              {tools.map((t) => (
                <tr
                  className="border-t"
                  key={t._id}
                >
                  <td className="py-3 font-semibold">
                    {t.name}
                  </td>

                  <td className="py-3 text-[#756b86]">
                    {t.category}
                  </td>

                  <td className="py-3 text-right flex gap-3 justify-end">
                    <button
                      className="text-[#6D28D9]"
                      onClick={() => edit(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => del(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-7 mt-7">
        <section className="card p-6 overflow-auto">
          <h2 className="font-bold text-xl">
            Users
          </h2>

          <table className="w-full mt-4 text-sm">
            <tbody>
              {users.slice(0, 20).map((u) => (
                <tr
                  className="border-t"
                  key={u._id}
                >
                  <td className="py-3">
                    {u.name}
                  </td>

                  <td className="py-3 text-[#756b86]">
                    {u.email}
                  </td>

                  <td className="py-3 capitalize">
                    {u.plan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card p-6 overflow-auto">
          <h2 className="font-bold text-xl">
            Subscriptions
          </h2>

          <table className="w-full mt-4 text-sm">
            <tbody>
              {subs.slice(0, 20).map((s) => (
                <tr
                  className="border-t"
                  key={s._id}
                >
                  <td className="py-3">
                    {s.user?.email}
                  </td>

                  <td className="py-3 capitalize">
                    {s.plan}
                  </td>

                  <td className="py-3 capitalize">
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card p-6 overflow-auto">
          <h2 className="font-bold text-xl">
            Support messages
          </h2>

          <div className="mt-4 space-y-3">
            {messages.slice(0, 10).map((m) => (
              <div
                className="border-t pt-3"
                key={m._id}
              >
                <b>{m.subject}</b>

                <p className="text-sm text-[#756b86]">
                  {m.email} · {m.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6 overflow-auto">
          <h2 className="font-bold text-xl">
            Newsletter subscribers
          </h2>

          <div className="mt-4 space-y-2">
            {news.slice(0, 20).map((n) => (
              <div
                className="border-t pt-2 text-sm"
                key={n._id}
              >
                {n.email}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}