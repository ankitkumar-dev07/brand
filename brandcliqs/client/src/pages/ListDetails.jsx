import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function ListDetails() {
  const { id } = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    api
      .get('/lists/' + id)
      .then((r) => setList(r.data.list));
  }, [id]);

  if (!list) {
    return (
      <main className="container-x py-20">
        Loading...
      </main>
    );
  }

  return (
    <main className="container-x py-12">
      <Link
        className="text-[#6D28D9]"
        to="/dashboard"
      >
        ← Dashboard
      </Link>

      <h1 className="mt-5 text-4xl font-bold">
        {list.name}
      </h1>

      <p className="text-[#756b86] mt-2">
        {list.description || 'Your saved software stack.'}
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {list.tools?.map((t) => (
          <Link
            className="card p-5"
            to={'/tools/' + t.slug}
            key={t._id}
          >
            <div className="h-10 w-10 rounded-lg bg-[#f3e8ff] grid place-items-center text-[#6D28D9] font-bold">
              {t.name.slice(0, 2)}
            </div>

            <h3 className="font-semibold mt-4">
              {t.name}
            </h3>

            <p className="text-sm text-[#756b86] mt-2">
              {t.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}