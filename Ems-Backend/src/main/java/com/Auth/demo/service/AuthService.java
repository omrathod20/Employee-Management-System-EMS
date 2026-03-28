package com.Auth.demo.service;

import com.Auth.demo.DTOs.AuthResponse;
import com.Auth.demo.Security.JwtService;
import com.Auth.demo.model.Employee;
import com.Auth.demo.model.User;
import com.Auth.demo.repository.EmpRepo;
import com.Auth.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private EmpRepo empRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ================= REGISTER =================
    public User Register(User user) {

        // Email lowercase
        user.setEmail(user.getEmail().toLowerCase());

        // Check if already exists
        if (repo.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("User already exists");
        }

        // Encrypt password
        user.setPassword(encoder.encode(user.getPassword()));

        // Default role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("EMPLOYEE");
        }

        // Save user
        User savedUser = repo.save(user);

        if ("EMPLOYEE".equals(savedUser.getRole())) {

            Employee emp = new Employee();

            emp.setUser(savedUser);
            emp.setName(savedUser.getUsername());
            // ⭐ Required fields (IMPORTANT)
            emp.setEmail(savedUser.getEmail());
            emp.setDepartment("Not Assigned");
            emp.setPhone("0000000000");
            emp.setSalary(0);
            emp.setStatus("Active");
            emp.setJoinDate(LocalDate.now());

            empRepo.save(emp);
        }
        return savedUser;
    }

    // ================= LOGIN =================
    public AuthResponse Login(User user) {

        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {

                String token = jwtService.generateToken(user.getEmail());

                // Get role from DB
                User dbUser = repo.findByEmail(user.getEmail());

                return new AuthResponse(token, dbUser.getRole());
            }

        } catch (Exception e) {
            return new AuthResponse(null, "failed");
        }

        return new AuthResponse(null, "failed");
    }
}