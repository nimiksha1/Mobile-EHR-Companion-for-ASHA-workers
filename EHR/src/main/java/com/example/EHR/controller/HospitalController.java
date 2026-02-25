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

import com.example.EHR.model.Hospital;
import com.example.EHR.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
@CrossOrigin
public class HospitalController {
  private final HospitalService service;

    @PostMapping
    public Hospital add(@RequestBody Hospital h){
        return service.save(h);
    }

    @GetMapping
    public List<Hospital> list(){
        return service.getAll();
    }
     @PutMapping("/update/{id}")
    public Hospital updateHospital(@PathVariable Long id,
                                   @RequestBody Hospital hospital) {
        return service.updateHospital(id, hospital);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteHospital(@PathVariable Long id) {
        service.deleteHospital(id);
        return "Hospital deleted successfully";
    }
}

