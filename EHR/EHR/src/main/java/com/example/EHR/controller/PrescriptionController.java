package com.example.EHR.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EHR.model.Prescription;
import com.example.EHR.service.PrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService service;

    @PostMapping
    public Prescription save(@RequestBody Prescription p){
        return service.save(p);
    }

    @GetMapping
    public List<Prescription> all(){
        return service.getAll();
    }

    @PutMapping("/{id}")
public Prescription update(@PathVariable Long id,
                           @RequestBody Prescription updated){
    return service.update(id, updated);
}

    // ✅ Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Prescription deleted successfully";
    }
}
