package com.example.EHR.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EHR.model.Vitals;
import com.example.EHR.service.VitalService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/vitals")
@RequiredArgsConstructor
public class VitalController {


    private final VitalService service;

    @PostMapping
    public Vitals save(@RequestBody Vitals v){
        return service.save(v);
    }

    @GetMapping
    public List<Vitals> all(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Vitals get(@PathVariable Long id){
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

}
