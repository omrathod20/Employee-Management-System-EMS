package com.Auth.demo.controller;

import com.Auth.demo.DTOs.AuthResponse;
import com.Auth.demo.model.User;
import com.Auth.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public User Register(@RequestBody User user){
        return authService.Register(user);
    }

    @PostMapping("/login")
    public AuthResponse Login(@RequestBody User user){
        return authService.Login(user);
    }
}
