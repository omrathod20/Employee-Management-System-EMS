package com.Auth.demo.controller;

import com.Auth.demo.DTOs.UpdateDto;
import com.Auth.demo.model.Employee;
import com.Auth.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public Employee createUser(@RequestBody Employee emp){
        return adminService.createNewUser(emp);
    }

    @GetMapping("/all")
    public List<Employee> allUser(){
        return adminService.allUser();
    }

    @GetMapping("/byid/{id}")
    public Optional<Employee> getUserById(@PathVariable long id){
        return adminService.getUserById(id);
    }

    @PutMapping("/edit/{id}")
    public Employee updateUser(@PathVariable Long id ,  @RequestBody UpdateDto dto){
        return adminService.updateUser(id , dto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable long id){
        adminService.deleteUser(id);
        return "User deleted successfully";
    }
}