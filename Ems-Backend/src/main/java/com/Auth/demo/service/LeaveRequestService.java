package com.Auth.demo.service;

import com.Auth.demo.model.LeaveRequest;
import com.Auth.demo.repository.LeaveRequstRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LeaveRequestService {

    @Autowired
    LeaveRequstRepo leaveRequstRepo;

//    employee
    public LeaveRequest submitLeave(LeaveRequest request) {
    request.setStatus(LeaveRequest.LeaveStatus.PENDING);
    return leaveRequstRepo.save(request);
    }
//employee
    public List<LeaveRequest> getMyLeave(String email) {
        return leaveRequstRepo.findByEmployeeEmail(email);
    }
//admin
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequstRepo.findAll();
    }
//admin
    public LeaveRequest updateLeaveStatus(Long id, LeaveRequest.LeaveStatus status) {
        LeaveRequest leave = leaveRequstRepo.findById(id)
                .orElseThrow(()-> new RuntimeException( " Leave request not found"));
        leave.setStatus(status);
        return leaveRequstRepo.save(leave);
    }
}
