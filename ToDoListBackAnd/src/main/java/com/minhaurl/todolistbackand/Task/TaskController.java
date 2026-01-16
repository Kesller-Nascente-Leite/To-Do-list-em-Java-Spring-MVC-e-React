package com.minhaurl.todolistbackand.Task;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/api/task")
    public List<Task> listToDo() throws Exception{
        try {
            return service.listAll();
        }
        catch (Exception e){
            throw new Exception("Ouve um erro:"+e.getMessage());
        }
    }

    @PostMapping("/api/savetask")
    public void taskCreateRequest(String todo){
        service.save();
    }
}
