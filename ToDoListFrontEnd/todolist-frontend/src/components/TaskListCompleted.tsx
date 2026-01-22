import type { Task } from "../types/Task";
interface TaskListCompletedProps {
  tasks: Task[];
  is_completed: boolean;
}
export function TaskListCompleted({ tasks, is_completed }: TaskListCompletedProps) {
    const filteredTasks = tasks.filter(task => task.completed === is_completed);
    return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-900">Tarefa</th>
            <th className="px-6 py-3 text-center font-semibold text-gray-900">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {task.todo}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      task.completed
                        ? "bg-green-50 text-green-700 ring-green-600/20"
                        : "bg-blue-50 text-blue-700 ring-blue-600/20"
                    }`}
                  >
                    {task.completed ? "Concluída" : "Em progresso"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-6 py-10 text-center text-gray-500 italic">
                Nenhuma tarefa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
