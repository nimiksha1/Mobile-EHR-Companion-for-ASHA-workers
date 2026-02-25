package com.example.EHR.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EHR.model.Visit;
import com.example.EHR.service.VisitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/visits")
@RequiredArgsConstructor
@CrossOrigin
public class VisitController {
    private final VisitService service;

    @PostMapping
    public Visit add(@RequestBody Visit v){
        return service.save(v);
    }

    @GetMapping
    public List<Visit> list(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Visit update(@PathVariable Long id,
                        @RequestBody Visit updated){
        return service.update(id, updated);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Visit deleted successfully";
    }
}

