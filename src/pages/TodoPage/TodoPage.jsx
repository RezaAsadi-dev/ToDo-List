import React, { useState } from 'react';
import { Plus, FolderOpen, Search } from 'lucide-react';
import { useTodoStore } from '../../store/todoStore';
import { useFilter } from '../../hooks/useFilter';
import GradientBackground from '../../components/layout/Background/GradientBackground';
import Header from '../../components/layout/Header/Header';
import SearchBar from '../../components/todo/SearchBar/SearchBar';
import FilterButtons from '../../components/todo/FilterButtons/FilterButtons';
import FolderItem from '../../components/folder/FolderItem/FolderItem';
import TaskModal from '../../components/modals/TaskModal/TaskModal';
import FolderModal from '../../components/modals/FolderModal/FolderModal';
import DeleteModal from '../../components/modals/DeleteModal/DeleteModal';

export default function TodoPage() {
  const { 
    folders, 
    todos, 
    addFolder, 
    updateFolder, 
    deleteFolder, 
    toggleFolder, 
    addTodo, 
    updateTodo, 
    toggleTodo, 
    deleteTodo, 
    clearCompleted 
  } = useTodoStore();

  // Modal states
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Task handlers
  const handleAddTask = (text, description, folderId) => {
    addTodo(text, description, folderId);
  };

  const handleEditTask = (todo) => {
    setSelectedTodo(todo);
    setIsEditTaskModalOpen(true);
  };

  const handleUpdateTask = (text, description, folderId) => {
    if (selectedTodo) {
      updateTodo(selectedTodo.id, text, description, folderId);
      setSelectedTodo(null);
    }
  };

  // Folder handlers
  const handleEditFolder = (folder) => {
    setSelectedFolder(folder);
    setIsEditFolderModalOpen(true);
  };

  const handleUpdateFolder = (name, color) => {
    if (selectedFolder) {
      updateFolder(selectedFolder.id, name, color);
      setSelectedFolder(null);
    }
  };

  // Delete handlers
  const handleDeleteClick = (item, type) => {
    setDeleteItem({ item, type });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      if (deleteItem.type === 'folder') {
        deleteFolder(deleteItem.item.id);
      } else {
        deleteTodo(deleteItem.item.id);
      }
      setDeleteItem(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Calculate counts
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 relative overflow-hidden" dir="rtl">
      <GradientBackground />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Header 
          activeCount={activeCount}
          completedCount={completedCount}
          foldersCount={folders.length}
        />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 font-medium flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            افزودن تسک
          </button>
          <button
            onClick={() => setIsAddFolderModalOpen(true)}
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 font-medium flex items-center justify-center gap-2"
          >
            <FolderOpen size={20} />
            پوشه جدید
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <FilterButtons 
            filterStatus={filterStatus} 
            setFilterStatus={setFilterStatus}
            counts={{
              total: todos.length,
              active: activeCount,
              completed: completedCount
            }}
          />
        </div>

        {/* Folders and Tasks */}
        <div className="space-y-4">
          {folders.map(folder => {
            const folderTodos = todos.filter(todo => todo.folderId === folder.id);
            const filteredTodos = useFilter(folderTodos, searchQuery, filterStatus);

            // Hide folder if no tasks match filter/search
            if (filteredTodos.length === 0 && (searchQuery || filterStatus !== 'all')) {
              return null;
            }

            return (
              <FolderItem
                key={folder.id}
                folder={folder}
                filteredTodos={filteredTodos}
                folderTodos={folderTodos}
                onToggleFolder={toggleFolder}
                onEditFolder={handleEditFolder}
                onDeleteFolder={(folder) => handleDeleteClick(folder, 'folder')}
                onToggleTodo={toggleTodo}
                onEditTodo={handleEditTask}
                onDeleteTodo={(todo) => handleDeleteClick(todo, 'task')}
                showFilterInfo={filteredTodos.length !== folderTodos.length}
              />
            );
          })}

          {/* Empty States */}
          {folders.length === 0 && (
            <div className="text-center py-20">
              <FolderOpen size={64} className="mx-auto mb-4 text-zinc-800" />
              <p className="text-gray-500 text-lg">هنوز پوشه‌ای ساخته نشده</p>
              <p className="text-gray-600 text-sm mt-1">برای شروع یک پوشه اضافه کنید</p>
            </div>
          )}

          {folders.length > 0 && folders.every(folder => {
            const folderTodos = todos.filter(todo => todo.folderId === folder.id);
            const filteredTodos = useFilter(folderTodos, searchQuery, filterStatus);
            return filteredTodos.length === 0;
          }) && (searchQuery || filterStatus !== 'all') && (
            <div className="text-center py-20">
              <Search size={64} className="mx-auto mb-4 text-zinc-800" />
              <p className="text-gray-500 text-lg">تسکی پیدا نشد</p>
              <p className="text-gray-600 text-sm mt-1">فیلتر یا جستجو را تغییر دهید</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {completedCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={clearCompleted}
              className="text-gray-500 hover:text-red-400 text-sm transition-all px-4 py-2 rounded-lg hover:bg-zinc-900"
            >
              پاک کردن {completedCount} تسک انجام شده
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={handleAddTask}
        folders={folders}
      />

      <TaskModal
        isOpen={isEditTaskModalOpen}
        onClose={() => {
          setIsEditTaskModalOpen(false);
          setSelectedTodo(null);
        }}
        onSave={handleUpdateTask}
        initialTask={selectedTodo}
        folders={folders}
      />

      <FolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
        onSave={(name, color) => addFolder(name, color)}
      />

      <FolderModal
        isOpen={isEditFolderModalOpen}
        onClose={() => {
          setIsEditFolderModalOpen(false);
          setSelectedFolder(null);
        }}
        onSave={handleUpdateFolder}
        initialFolder={selectedFolder}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteItem(null);
        }}
        onConfirm={handleDeleteConfirm}
        itemName={deleteItem?.type === 'folder' ? deleteItem?.item?.name : deleteItem?.item?.text}
        itemType={deleteItem?.type}
      />
    </div>
  );
}

