package com.minhaurl.todolistbackand.Task;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_todolist")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "todo", nullable = false, length = 255)
    @JsonProperty("todo")
    private String todo;

    @Column(name = "is_completed", nullable = false)
    private boolean completed = Boolean.FALSE;

    public Task(String todo) {
        validateText(todo);
        this.todo = todo;
        this.completed = false;
    }

    private void validateText(String todo) {
        if (todo == null || todo.trim().isEmpty()) {
            throw new IllegalArgumentException("Texto da tarefa é obrigatório");
        }
    }
};
