import { useEffect, useState } from "react";
import type { Task } from "../types/Task";

interface Props {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updateTask: Task) => void;
}

export function EditTaskModal({ task, isOpen, onClose, onSave }: Props) {
  const [newTodo, setNewTodo] = useState(task.todo);

  useEffect(() => {
    setNewTodo(task.todo);
  }, [task]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Caixinha do Modal */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 transform transition-all">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Editar Tarefa</h2>

        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full rounded-lg border-gray-300 border p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
          autoFocus
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave({ ...task, todo: newTodo })}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
