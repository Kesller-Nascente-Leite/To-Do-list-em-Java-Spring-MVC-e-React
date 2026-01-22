import { useEffect, useState } from "react";
import type { Task } from "./types/Task.ts";
import {
  createTask,
  editTask,
  fetchTask,
  isCompletedTask,
  isNotCompletedTask,
} from "./services/taskService.ts";
import { TaskList } from "./components/TaskList.tsx";
import { TaskForm } from "./components/TaskForm.tsx";
import { TaskListCompleted } from "./components/TaskListCompleted.tsx";
import { EditTaskModal } from "./components/EditTaskModal.tsx";

export function App() {
  const [tasks, setTask] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTask()
      .then((data) => setTask(data))
      .catch((err) => setError(err.message));
  }, []);

  function handleCreate(todo: string) {
    createTask({ todo, completed: false })
      .then(() => fetchTask())
      .then(setTask)
      .catch((err) => setError(err.message));
  }

  function handleToggleStatus(id: number) {
    const taskUpdate = tasks.find((task) => task.id === id);

    if (taskUpdate) {
      if (taskUpdate.completed) {
        return isNotCompletedTask(id)
          .then(() => fetchTask())
          .then(setTask)
          .catch((err) => setError(err.message));
      } else {
        return isCompletedTask(id)
          .then(() => fetchTask())
          .then(setTask)
          .catch((err) => setError(err.message));
      }
    }
  }

  function openEditModal(task: Task) {
    setTaskToEdit(task);
  }
  function closeEditModal() {
    setTaskToEdit(null);
  }
  function handleSaveEdit(updatedTask: Task) {
    editTask(updatedTask)
      .then(() => {
        closeEditModal();
        return fetchTask();
      })
      .then(setTask)
      .catch((err) => setError(err.message));
  }
  return (
    <div className="bg-gray-400 py-4 min-h-screen text-white">
      <h1 className="text-center max-h-5 p-9">Minha To-Do List</h1>

      {/*
       * Task Form
       */}
      <div>
        <TaskForm onCreate={handleCreate} />
        {error && <p className="text-red-900">{error}</p>}
      </div>
      <br />
      <div>
        <div className="bg-gray-600 flex"></div>

        {/*
         * List Tasks
         */}
        <div>
          <TaskList
            tasks={tasks}
            onToggle={handleToggleStatus}
            onEdit={openEditModal}
          />
        </div>

        {/*
         * List Completed Tasks
         */}
        <div className="">
          <TaskListCompleted tasks={tasks} is_completed={true} />
        </div>
      </div>
      {taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          isOpen={!!taskToEdit} // Massa isso, true se tiver tarefa
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
