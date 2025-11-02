import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FOLDER_COLORS } from '../../../utils/constants';
import { validateFolderName } from '../../../utils/validation';

const colorClasses = {
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-500/10',
    circle: 'bg-purple-500'
  },
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-500/10',
    circle: 'bg-blue-500'
  },
  pink: {
    border: 'border-pink-500',
    bg: 'bg-pink-500/10',
    circle: 'bg-pink-500'
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-500/10',
    circle: 'bg-green-500'
  },
  red: {
    border: 'border-red-500',
    bg: 'bg-red-500/10',
    circle: 'bg-red-500'
  },
  orange: {
    border: 'border-orange-500',
    bg: 'bg-orange-500/10',
    circle: 'bg-orange-500'
  }
};

export default function FolderModal({ isOpen, onClose, onSave, initialFolder = null }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('purple');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialFolder?.name || '');
      setColor(initialFolder?.color || 'purple');
      setError('');
    }
  }, [isOpen, initialFolder]);

  if (!isOpen) return null;

  const handleSave = () => {
    const validationError = validateFolderName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSave(name.trim(), color);
    setName('');
    setColor('purple');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {initialFolder ? 'ویرایش پوشه' : 'پوشه جدید'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">نام پوشه</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="نام پوشه را وارد کنید..."
              className={`w-full bg-zinc-800 border ${error ? 'border-red-500' : 'border-zinc-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {error}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">رنگ پوشه</label>
            <div className="grid grid-cols-3 gap-3">
              {FOLDER_COLORS.map((c) => {
                const classes = colorClasses[c.value];
                return (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      color === c.value
                        ? `${classes.border} ${classes.bg}`
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${classes.circle} mx-auto mb-1`}></div>
                    <div className="text-xs text-gray-400">{c.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all hover:scale-105 active:scale-95 font-medium"
          >
            {initialFolder ? 'ذخیره تغییرات' : 'افزودن پوشه'}
          </button>
          <button
            onClick={onClose}
            className="px-6 bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-3 rounded-xl transition-all"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

