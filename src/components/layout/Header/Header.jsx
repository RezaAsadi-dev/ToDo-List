import React from 'react';

export default function Header({ activeCount, completedCount, foldersCount }) {
  return (
    <div className="mb-12">
      <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Tasks
      </h1>
      <div className="flex gap-6 text-sm">
        <span className="text-gray-400">
          <span className="text-purple-400 font-semibold">{activeCount}</span> فعال
        </span>
        <span className="text-gray-400">
          <span className="text-pink-400 font-semibold">{completedCount}</span> انجام شده
        </span>
        <span className="text-gray-400">
          <span className="text-blue-400 font-semibold">{foldersCount}</span> پوشه
        </span>
      </div>
    </div>
  );
}

