import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { validateTaskName, validateDescription } from '../../../utils/validation';

export default function TaskModal({ isOpen, onClose, onSave, initialTask = null, folders }) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [errors, setErrors] = useState({ text: '', description: '' });

  useEffect(() => {
    if (isOpen) {
      setText(initialTask?.text || '');
      setDescription(initialTask?.description || '');
      setFolderId(initialTask?.folderId || (folders[0]?.id || ''));
      setErrors({ text: '', description: '' });
    }
  }, [isOpen, initialTask, folders]);

  if (!isOpen) return null;

  const handleSave = () => {
    const textError = validateTaskName(text);
    const descError = validateDescription(description);

    if (textError || descError) {
      setErrors({ text: textError, description: descError });
      return;
    }

    onSave(text.trim(), description.trim(), folderId);
    setText('');
    setDescription('');
    setErrors({ text: '', description: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {initialTask ? 'ویرایش تسک' : 'تسک جدید'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">پوشه</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">نام تسک</label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setErrors({ ...errors, text: '' });
              }}
              placeholder="نام تسک را وارد کنید..."
              className={`w-full bg-zinc-800 border ${errors.text ? 'border-red-500' : 'border-zinc-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all`}
            />
            {errors.text && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.text}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              توضیحات <span className="text-gray-600 text-xs">(اختیاری)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: '' });
              }}
              placeholder="توضیحات تسک را وارد کنید..."
              rows={4}
              className={`w-full bg-zinc-800 border ${errors.description ? 'border-red-500' : 'border-zinc-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none`}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.description}
              </p>
            )}
            <p className="text-gray-600 text-xs mt-1">
              {description.length}/500 کاراکتر
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all hover:scale-105 active:scale-95 font-medium"
          >
            {initialTask ? 'ذخیره تغییرات' : 'افزودن تسک'}
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

