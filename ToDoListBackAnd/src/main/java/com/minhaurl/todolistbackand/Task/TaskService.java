package com.minhaurl.todolistbackand.Task;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> listAll() {
        return repository.findAll();
    }

    public void save(String todo){
        repository.save(Task);
    }

    // Para o insert, por mais que ja tenha essa verificação em Task, acho que devo fazer aqui também
    private boolean inputToDoIsEmpty(String todo) {
        if (todo == null || todo.trim().isEmpty()) {
            return true;
        }
        return false;
    }

}
