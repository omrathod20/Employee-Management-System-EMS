package com.Auth.demo.repository;

import com.Auth.demo.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequstRepo extends JpaRepository<LeaveRequest , Long> {
    List<LeaveRequest> findByEmployeeEmail(String email);

}
