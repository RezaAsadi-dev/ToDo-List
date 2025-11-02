import { useMemo } from 'react';
import { filterTodosByStatus, filterTodosBySearch } from '../utils/helpers';

export const useFilter = (todos, searchQuery, filterStatus) => {
  return useMemo(() => {
    let filtered = filterTodosByStatus(todos, filterStatus);
    filtered = filterTodosBySearch(filtered, searchQuery);
    return filtered;
  }, [todos, searchQuery, filterStatus]);
};

