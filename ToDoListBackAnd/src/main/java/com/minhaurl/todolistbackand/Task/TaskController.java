package com.minhaurl.todolistbackand.Task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> listToDo() throws Exception {
        try {
            return service.listAll();
        } catch (Exception e) {
            throw new Exception("Ouve um erro:" + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody TaskCreateRequest request) {
        Task task = service.create(request.todo());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> edit(@PathVariable Long id, @RequestBody Task request) {
        return service.editTask(id, request)
                .map(task -> ResponseEntity.ok().body(task))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/iscompleted")
    public ResponseEntity<Task> editCompleted(@PathVariable Long id) {
        return service.isCompleted(id)
                .map(task -> ResponseEntity.ok().body(task))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/isnotcompleted")
    public ResponseEntity<Task> editNotCompleted(@PathVariable Long id) {
        return service.isNotCompleted(id)
                .map(task -> ResponseEntity.ok().body(task))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        return service.delete(id);
    }
}
