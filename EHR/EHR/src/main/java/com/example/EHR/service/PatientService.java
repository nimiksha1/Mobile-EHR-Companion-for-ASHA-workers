package com.example.EHR.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.EHR.entity.Patient;
import com.example.EHR.entity.User;
import com.example.EHR.repository.PatientRepository;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {
 private final PatientRepository repo;
 private final UserRepository userRepository;

    public Patient save(Patient p){
        return repo.save(p);
    }

    public List<Patient> getAll(){
        return repo.findAll();
    }

    public List<Patient> getPatientsByAsha(String username) {
        User asha = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("ASHA worker not found"));
        return repo.findByAssignedAsha(asha);
    }

    public Patient update(Long id, Patient updated){
    Patient existing = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    BeanUtils.copyProperties(updated, existing, "id");
    return repo.save(existing);
}

public void delete(Long id){
    if (!repo.existsById(id)) {
        throw new RuntimeException("Patient not found with id: " + id);
    }
    repo.deleteById(id);
}
}

