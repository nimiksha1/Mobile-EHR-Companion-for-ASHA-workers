package com.example.EHR.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.EHR.entity.User;
import com.example.EHR.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService service;

    @PostMapping
    public User add(@RequestBody User u){
        return service.save(u);
    }

    @GetMapping
    public List<User> list(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User updated){
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "User deleted successfully";
    }
}
