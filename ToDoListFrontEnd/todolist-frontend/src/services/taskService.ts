import type { Task } from "../types/Task";

const API_URL = 'http://localhost:8080/api/task';

export async function fetchTask(): Promise<Task[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erro ao buscar tarefas");
    }
    return response.json();
}