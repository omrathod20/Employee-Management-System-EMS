package com.Auth.demo.service;

import com.Auth.demo.DTOs.UpdateDto;
import com.Auth.demo.model.Employee;
import com.Auth.demo.repository.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    EmpRepo empRepo;

    public Employee createNewUser(Employee emp) {
        return empRepo.save(emp);
    }

    public List<Employee> allUser() {
        return empRepo.findAll();
    }

    public Optional<Employee> getUserById(long id) {
        return empRepo.findById(id);
    }

    public Employee updateUser(Long id, UpdateDto dto){

        Employee emp = empRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // ✅ Only allowed fields update
        if(dto.getName() != null)
            emp.setName(dto.getName());

        if(dto.getDepartment() != null)
            emp.setDepartment(dto.getDepartment());

        if(dto.getSalary() != null)
            emp.setSalary(dto.getSalary());

        if(dto.getPhone() != null)
            emp.setPhone(dto.getPhone());

        if(dto.getStatus() != null)
            emp.setStatus(dto.getStatus());

        // ❗ USER FIELD TOUCH NAHI KARNA

        return empRepo.save(emp);
    }

    public void deleteUser(long id) {
        empRepo.deleteById(id);
    }
}
