package com.example.EHR.service;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.example.EHR.entity.User;
import com.example.EHR.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repo;

    public User save(User u){
        return repo.save(u);
    }

    public List<User> getAll(){
        return repo.findAll();
    }

    public User update(Long id, User updated){
        User existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        BeanUtils.copyProperties(updated, existing, "id");
        return repo.save(existing);
    }

    public void delete(Long id){
        if (!repo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        repo.deleteById(id);
    }
}
