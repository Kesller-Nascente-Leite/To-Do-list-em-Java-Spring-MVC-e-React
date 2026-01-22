import type { Task } from "../types/Task.ts";

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-900">
              Tarefa
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900">
              Status
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900">
              Comandos
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {task.todo}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {task.completed ? "Concluído" : "Pendente"}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => task.id && onToggle(task.id)}
                  className={`${task.completed ? "text-red-500 hover:text-red-700 mr-4" : "text-green-500 hover:text-green-700 mr-4"}  `}
                >
                  {task.completed
                    ? "Marcar como Pendente"
                    : "Marcar como Concluído"}
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => task.id && onDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
