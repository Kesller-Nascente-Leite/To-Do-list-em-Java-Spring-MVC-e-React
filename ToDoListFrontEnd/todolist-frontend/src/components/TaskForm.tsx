import { useState } from "react";

interface TaskFormProps {
  onCreate: (todo: string) => void;
}

export function TaskForm({ onCreate }: TaskFormProps) {
  const [todo, setTodo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onCreate(todo);
    setTodo("");
  }
  return (
    <div className="mx-auto max-w-60  bg-gray-600 px-3 py-1 rounded-md mb-4 text-center justify-center items-center ">
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <label htmlFor="todo">Tarefa:</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder=" Adicione uma tarefa"
            className="border rounded-2xl text-white"
          />
        </div>
        <div>
          <button type="submit" className="bg-gray-500 border rounded p-2 transition duration-500 hover:bg-gray-700">
            Adicionar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
}
