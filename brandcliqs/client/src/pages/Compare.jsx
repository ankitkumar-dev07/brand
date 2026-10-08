import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function Compare() {
  const [sp] = useSearchParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ids = sp.get('ids');

    if (ids) {
      api
        .get('/tools?ids=' + ids)
        .then((r) => setItems(r.data.tools))
        .catch(() => {});
    }
  }, [sp]);

  return (
    <main className="container-x py-14">
      <span className="chip">Side-by-side</span>

      <h1 className="mt-4 text-4xl font-extrabold">
        Compare tools.
      </h1>

      <p className="mt-2 text-[#756b86]">
        Choose up to three tools from Explore to compare them.
      </p>

      {items.length ? (
        <div className="overflow-x-auto mt-8 card">
          <table className="min-w-[800px] w-full text-left">
            <thead>
              <tr>
                <th className="p-5 border-b">
                  Attribute
                </th>

                {items.map((x) => (
                  <th
                    className="p-5 border-b"
                    key={x._id}
                  >
                    <div className="font-bold">
                      {x.name}
                    </div>

                    <Link
                      className="text-sm text-[#6D28D9]"
                      to={'/tools/' + x.slug}
                    >
                      View details
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[
                ['Category', 'category'],
                ['Pricing', 'pricingType'],
                ['Rating', 'rating'],
                ['Audience', 'audience'],
                ['Industry', 'industry'],
                ['Free plan', 'freePlan'],
              ].map(([l, k]) => (
                <tr key={k}>
                  <td className="p-5 border-b font-semibold">
                    {l}
                  </td>

                  {items.map((x) => (
                    <td
                      className="p-5 border-b text-[#756b86]"
                      key={x._id}
                    >
                      {String(x[k] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td className="p-5 font-semibold">
                  Features
                </td>

                {items.map((x) => (
                  <td
                    className="p-5"
                    key={x._id}
                  >
                    <ul className="space-y-2 text-[#756b86]">
                      {x.features?.slice(0, 6).map((f) => (
                        <li key={f}>
                          ✓ {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card p-10 mt-8">
          No tools selected.{' '}
          <Link
            className="text-[#6D28D9]"
            to="/explore"
          >
            Explore tools →
          </Link>
        </div>
      )}
    </main>
  );
}