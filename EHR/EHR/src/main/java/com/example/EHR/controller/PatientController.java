package com.example.EHR.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.EHR.entity.Patient;
import com.example.EHR.service.PatientService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@CrossOrigin
public class PatientController {
    private final PatientService service;

    @PostMapping
    public Patient add(@RequestBody Patient p){
        return service.save(p);
    }

    @GetMapping
    public List<Patient> list(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Patient update(@PathVariable Long id, @RequestBody Patient updated){
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Patient deleted successfully";
    }
}

