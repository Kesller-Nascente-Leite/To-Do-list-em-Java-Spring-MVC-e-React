import type { Task } from "../types/Task";

const API_URL = "http://localhost:8080/api/task";

export async function fetchTask(): Promise<Task[]> {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return response.json();
}

export async function createTask(task: Task): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }
  return response.json();
}
export async function editTask(task: Task): Promise<void> {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }
}
export async function isCompletedTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/iscompleted`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao concluir status da tarefa");
  }
  return response.json();
}

export async function isNotCompletedTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}/isnotcompleted`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao alterar status da tarefa");
  }
  return response.json();
}
