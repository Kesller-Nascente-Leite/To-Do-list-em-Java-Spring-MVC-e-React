import {useEffect, useState} from "react";
import type {Task} from "./types/Task.ts";
import {fetchTask} from "./services/taskService.ts";

function App() {
    const [task, setTask] = useState<Task[]>([]);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        fetchTask()
            .then(data => setTask(data))
            .catch(err => setError(err.message));
    }, []);


    return (
        <>
            <div>
                <h1>Minha To-Do List</h1>
                {error && <p>{error}</p>}

                <ul>
                    {task.map((task => (
                        <li key={task.id}>
                            {task.todo}
                            {task.completed ? "Concluída" : ""}
                            </li>

                    )))}
                </ul>
            </div>
        </>
    )
}

export default App
