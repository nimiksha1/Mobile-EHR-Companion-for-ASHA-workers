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

import com.example.EHR.model.Patient;
import com.example.EHR.service.PatientService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@CrossOrigin
public class PatientController {
private final PatientService service = null;

    @PostMapping
    public Patient add(@RequestBody Patient p){
        return service.save(p);
    }

    @GetMapping
    public List<Patient> list(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Patient update(@PathVariable Long id,
                          @RequestBody Patient updated){
        return service.update(id, updated);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Patient deleted successfully";
    }
}

