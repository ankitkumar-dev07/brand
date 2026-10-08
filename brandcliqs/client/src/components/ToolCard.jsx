import { Link } from 'react-router-dom';
import { Heart, GitCompare, Plus } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function ToolCard({ tool, onCompare }) {
  const [fav, setFav] = useState(false);
  const { user } = useAuth();

  const favorite = async () => {
    if (!user) {
      toast('Log in to save favorites');
      return;
    }

    try {
      if (!fav) {
        await api.post('/users/favorites/' + tool._id);
        setFav(true);
        toast.success('Added to favorites');
      } else {
        await api.delete('/users/favorites/' + tool._id);
        setFav(false);
      }
    } catch (e) {
      toast.error(
        e.response?.data?.message || 'Action failed'
      );
    }
  };

  return (
    <div className="card p-5 hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between">
        <div className="h-11 w-11 rounded-xl bg-[#f3e8ff] grid place-items-center text-[#6D28D9] font-bold">
          {tool.name.slice(0, 2).toUpperCase()}
        </div>

        <button
          onClick={favorite}
          className={fav ? 'text-pink-500' : 'text-[#8b8294]'}
        >
          <Heart
            size={18}
            fill={fav ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <Link to={'/tools/' + tool.slug}>
        <h3 className="mt-4 font-semibold text-lg">
          {tool.name}
        </h3>
      </Link>

      <p className="text-sm text-[#7b7187] mt-1 line-clamp-2 min-h-[40px]">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="chip !px-2.5 !py-1 !text-[11px]">
          {tool.category}
        </span>

        {tool.isPro && (
          <span className="chip !px-2.5 !py-1 !text-[11px]">
            Pro
          </span>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          to={'/tools/' + tool.slug}
          className="btn btn-outline flex-1 text-sm"
        >
          View
        </Link>

        <button
          onClick={() => onCompare?.(tool)}
          className="btn btn-primary flex-1 text-sm"
        >
          <GitCompare size={15} />
          Compare
        </button>
      </div>
    </div>
  );
}