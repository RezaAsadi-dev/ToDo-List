import React from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { getColorClass } from '../../../utils/helpers';

export default function TodoItem({ todo, folderColor, onToggle, onEdit, onDelete }) {
  return (
    <div className="group bg-zinc-800 rounded-xl p-4 hover:bg-zinc-750 transition-all">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
            todo.completed
              ? `bg-gradient-to-r ${getColorClass(folderColor)} border-transparent`
              : 'border-zinc-600 hover:border-zinc-500'
          }`}
        >
          {todo.completed && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div
            className={`transition-all ${
              todo.completed
                ? 'line-through text-gray-600'
                : 'text-gray-200'
            }`}
          >
            {todo.text}
          </div>
          {todo.description && (
            <p className={`text-sm mt-1 ${
              todo.completed ? 'text-gray-700' : 'text-gray-500'
            }`}>
              {todo.description}
            </p>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => onEdit(todo)}
            className="text-gray-600 hover:text-purple-400 transition-all p-1.5 hover:bg-zinc-700 rounded-lg"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(todo)}
            className="text-gray-600 hover:text-red-400 transition-all p-1.5 hover:bg-zinc-700 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

