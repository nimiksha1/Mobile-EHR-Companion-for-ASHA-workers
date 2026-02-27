package com.example.EHR.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.EHR.entity.Prescription;
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
    public Prescription update(@PathVariable Long id, @RequestBody Prescription updated){
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Prescription deleted successfully";
    }
}
