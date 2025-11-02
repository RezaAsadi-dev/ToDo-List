import React from 'react';
import { Filter } from 'lucide-react';

export default function FilterButtons({ filterStatus, setFilterStatus, counts }) {
  return (
    <div className="flex gap-2">
      <Filter size={18} className="text-gray-500 mt-2.5" />
      <div className="flex gap-2 flex-1">
        <button
          onClick={() => setFilterStatus('all')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
            filterStatus === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          همه ({counts.total})
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
            filterStatus === 'active'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          فعال ({counts.active})
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
            filterStatus === 'completed'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          انجام شده ({counts.completed})
        </button>
      </div>
    </div>
  );
}

