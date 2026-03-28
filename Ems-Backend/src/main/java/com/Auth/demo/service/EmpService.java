package com.Auth.demo.service;

import com.Auth.demo.DTOs.UpdateDto;
import com.Auth.demo.model.Employee;
import com.Auth.demo.model.User;
import com.Auth.demo.repository.EmpRepo;
import com.Auth.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpService {

    @Autowired
    EmpRepo empRepo;

    @Autowired
    UserRepo repo;

    public Employee getByEmail(String email) {

        User user = repo.findByEmail(email);

        return empRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("This is not Our Employee"));
    }

    public Employee updateEmployee(String email, UpdateDto UpdateDto) {

        Employee employee = getByEmail(email);

        if (UpdateDto.getName() != null ){
            employee.setName(UpdateDto.getName());
        }
        if (UpdateDto.getPhone() != null ){
            employee.setPhone(UpdateDto.getPhone());
        }

        return empRepo.save(employee);
    }
}
