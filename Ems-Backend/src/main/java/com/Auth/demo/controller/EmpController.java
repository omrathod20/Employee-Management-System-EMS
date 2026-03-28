package com.Auth.demo.controller;

import com.Auth.demo.DTOs.UpdateDto;
import com.Auth.demo.model.Employee;
import com.Auth.demo.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin("*")
public class EmpController {

    @Autowired
    EmpService empService;

@GetMapping("/profile")
    public Employee getProfile(Authentication authentication){
    String email = authentication.getName();
    return empService.getByEmail(email);
}

@PutMapping("/profile")
    public Employee updateProfile(Authentication authentication , @RequestBody UpdateDto updateDto){
    System.out.println("Authenticated user: " + authentication.getName());
    String email = authentication.getName();
    return empService.updateEmployee(email , updateDto);
}

}
