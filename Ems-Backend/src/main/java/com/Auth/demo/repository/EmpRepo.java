package com.Auth.demo.repository;

import com.Auth.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpRepo extends JpaRepository<Employee , Long> {
//    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByUserEmail(String email);
}
