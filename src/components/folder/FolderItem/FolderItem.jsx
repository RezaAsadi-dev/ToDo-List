import React from 'react';
import { ChevronDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { getColorClass } from '../../../utils/helpers';
import TodoItem from '../../todo/TodoItem/TodoItem';

export default function FolderItem({ 
  folder, 
  filteredTodos, 
  folderTodos,
  onToggleFolder,
  onEditFolder,
  onDeleteFolder,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  showFilterInfo
}) {
  const folderCompleted = folderTodos.filter(todo => todo.completed).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Folder Header */}
      <div className="group p-5 flex items-center gap-4">
        <button
          onClick={() => onToggleFolder(folder.id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {folder.collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </button>
        
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getColorClass(folder.color)}`}></div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{folder.name}</h3>
          <p className="text-sm text-gray-500">
            {folderTodos.length} تسک ({folderCompleted} انجام شده)
            {showFilterInfo && (
              <span className="text-purple-400"> • {filteredTodos.length} یافت شد</span>
            )}
          </p>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => onEditFolder(folder)}
            className="text-gray-600 hover:text-purple-400 transition-all p-2 hover:bg-zinc-800 rounded-lg"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDeleteFolder(folder)}
            className="text-gray-600 hover:text-red-400 transition-all p-2 hover:bg-zinc-800 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Tasks in Folder */}
      {!folder.collapsed && (
        <div className="px-5 pb-5 space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">
              {showFilterInfo 
                ? 'تسکی با این فیلتر پیدا نشد'
                : 'هنوز تسکی در این پوشه نیست'
              }
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                folderColor={folder.color}
                onToggle={onToggleTodo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

