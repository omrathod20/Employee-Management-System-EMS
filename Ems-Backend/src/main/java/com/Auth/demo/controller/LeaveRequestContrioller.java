package com.Auth.demo.controller;

import com.Auth.demo.model.LeaveRequest;
import com.Auth.demo.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave")
@CrossOrigin("*")
public class LeaveRequestContrioller {

    @Autowired
    LeaveRequestService leaveRequestService;

    @PostMapping("/request")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public LeaveRequest submitLeave(@RequestBody LeaveRequest request , Authentication auth){
        request.setEmployeeEmail(auth.getName());
        request.setEmployeeName(auth.getName());
        return leaveRequestService.submitLeave(request);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<LeaveRequest> getMyLeave(Authentication auth){
        return leaveRequestService.getMyLeave(auth.getName());
    }


    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public  List<LeaveRequest> getAllRequest(){
        return leaveRequestService.getAllLeaves();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public LeaveRequest updateLeaveStatus(@PathVariable Long id , @RequestParam LeaveRequest.LeaveStatus status){
        return leaveRequestService.updateLeaveStatus(id , status);
    }

}
