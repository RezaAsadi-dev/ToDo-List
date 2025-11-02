import React from 'react';
import { Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName, itemType = 'task' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {itemType === 'folder' ? 'حذف پوشه' : 'حذف تسک'}
          </h2>
          <p className="text-gray-400">
            آیا مطمئن هستید که می‌خواهید {itemType === 'folder' ? 'پوشه' : 'تسک'}</p>
          <p className="text-purple-400 font-semibold mt-2">"{itemName}"</p>
          <p className="text-gray-400 mt-1">را حذف کنید؟</p>
          {itemType === 'folder' && (
            <p className="text-red-400 text-sm mt-3">⚠️ تمام تسک‌های این پوشه نیز حذف می‌شوند</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all hover:scale-105 active:scale-95 font-medium"
          >
            بله، حذف شود
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-3 rounded-xl transition-all"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

