export const getColorClass = (color) => {
  const colors = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    pink: "from-pink-500 to-pink-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    orange: "from-orange-500 to-orange-600",
  };
  return colors[color] || colors.purple;
};

export const filterTodosByStatus = (todos, filterStatus) => {
  if (filterStatus === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filterStatus === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
};

export const filterTodosBySearch = (todos, searchQuery) => {
  if (!searchQuery.trim()) return todos;

  return todos.filter(
    (todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description &&
        todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};
