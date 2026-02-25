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

import com.example.EHR.model.MlPrediction;
import com.example.EHR.service.MLPredictionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class MLPredictionController {
    private final MLPredictionService service;

    @PostMapping
    public MlPrediction save(@RequestBody MlPrediction p){
        return service.save(p);
    }

    @GetMapping
    public List<MlPrediction> all(){
        return service.getAll();
    }
    @PutMapping("/{id}")
    public MlPrediction update(@PathVariable Long id,
                               @RequestBody MlPrediction updated){
        return service.update(id, updated);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Prediction deleted successfully";
    }

}
