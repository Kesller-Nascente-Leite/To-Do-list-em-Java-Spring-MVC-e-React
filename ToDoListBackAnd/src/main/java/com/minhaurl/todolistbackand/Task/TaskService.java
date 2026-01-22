package com.minhaurl.todolistbackand.Task;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> listAll() {
        return repository.findAll();
    }

    public List<Task> listAllByCompleted(boolean completed) {
        return repository.findAllByCompleted(completed);
    }

    public Task create(String todo) {
        return repository.save(new Task(todo));
    }

    public Optional<Task> editTask(@PathVariable Long id, @RequestBody Task request) {
        return repository.findById(id)
                .map(task -> {
                    task.setTodo(request.getTodo());
                    return repository.save(task);
                });
    }


    public Optional<Task> isCompleted(Long id) {
        return repository.findById(id).map(existingTask -> {
            existingTask.setCompleted(true);
            return repository.save(existingTask);
        });
    }

    public Optional<Task> isNotCompleted(Long id) {
        return repository.findById(id).map(existingTask -> {
            existingTask.setCompleted(false);
            return repository.save(existingTask);
        });
    }


    public ResponseEntity<Void> delete(Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
