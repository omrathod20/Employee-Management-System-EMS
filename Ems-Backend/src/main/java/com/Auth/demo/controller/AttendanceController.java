package com.Auth.demo.controller;

import com.Auth.demo.model.Attendance;
import com.Auth.demo.model.Employee;
import com.Auth.demo.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    AttendanceService attendService;

    @PostMapping("/mark")
    public Attendance markAttendance(@RequestParam String email){
        return attendService.markAttendance(email);
    }

    @PreAuthorize("/admin")
    @GetMapping("/list")
    public List<Attendance> getAttendance(@RequestParam String email){
        return attendService.getAttendance(email);
    }

    @GetMapping("/count")
    public long getAttendanceCount(@RequestParam String email){
        return attendService.CountAttendance(email);
    }
}

