import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const faqs = [
  [
    'What is BrandCliqs?',
    'A software discovery platform that helps you search, compare and save tools.',
  ],
  [
    'Is there a free plan?',
    'Yes. Free Cliq includes core catalog discovery, search and basic filters.',
  ],
  [
    'What is Pro Cliq?',
    'Pro unlocks the full catalog, AI suggestions, named lists and comparisons.',
  ],
  [
    'Can I cancel Pro?',
    'Yes. The development subscription flow supports cancellation and is structured for a real payment provider later.',
  ],
];

export default function Support() {
  const [d, setD] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/support/contact', d);

      toast.success('Message sent.');

      setD({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (e) {
      toast.error('Could not send message');
    }
  };

  return (
    <main className="container-x py-16">
      <div className="max-w-3xl">
        <span className="chip">
          Support
        </span>

        <h1 className="mt-5 text-5xl font-extrabold">
          How can we help?
        </h1>

        <p className="mt-4 text-lg text-[#756b86]">
          Find an answer below or send the team a message.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <div>
          <div className="card p-4 flex gap-3 items-center">
            <Search className="text-[#8a8094]" />

            <input
              className="outline-none flex-1"
              placeholder="Search help"
            />
          </div>

          <div className="space-y-3 mt-5">
            {faqs.map(([q, a]) => (
              <details
                className="card p-5"
                key={q}
              >
                <summary className="font-semibold cursor-pointer flex justify-between">
                  {q}
                  <ChevronDown size={18} />
                </summary>

                <p className="text-[#756b86] mt-3 leading-7">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="card p-7"
        >
          <h2 className="text-xl font-bold">
            Contact support
          </h2>

          {[
            ['name', 'Name', 'text'],
            ['email', 'Email', 'email'],
            ['subject', 'Subject', 'text'],
          ].map(([k, l, t]) => (
            <label
              className="block mt-4 text-sm font-semibold"
              key={k}
            >
              {l}

              <input
                className="input mt-2"
                type={t}
                value={d[k]}
                onChange={(e) =>
                  setD({
                    ...d,
                    [k]: e.target.value,
                  })
                }
                required
              />
            </label>
          ))}

          <label className="block mt-4 text-sm font-semibold">
            Message

            <textarea
              className="input mt-2 min-h-32"
              value={d.message}
              onChange={(e) =>
                setD({
                  ...d,
                  message: e.target.value,
                })
              }
              required
            />
          </label>

          <button className="btn btn-primary w-full mt-5">
            Send message
          </button>
        </form>
      </div>
    </main>
  );
}