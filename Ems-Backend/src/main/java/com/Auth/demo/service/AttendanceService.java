package com.Auth.demo.service;

import com.Auth.demo.model.Attendance;
import com.Auth.demo.model.Employee;
import com.Auth.demo.repository.AttendanceRepo;
import com.Auth.demo.repository.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepo attendRepo;

    @Autowired
    EmpRepo empRepo;

    public Attendance markAttendance(String email) {
        LocalDate today = LocalDate.now();
//        avoid duplicated
        if(attendRepo.existsByEmailAndDate(email ,today)){
            throw new RuntimeException("Already Marked the Attendances");
        }
        Employee employee = empRepo.findByUserEmail(email)
                .orElseThrow(()-> new RuntimeException( " User Not Found"));

        if (!"Active".equalsIgnoreCase(employee.getStatus())) {
            throw new RuntimeException("Employee is not active. Attendance not allowed.");
        }

        Attendance attendance = new Attendance();
        attendance.setName(employee.getName());
        attendance.setEmail(email);
        attendance.setDate(today);
        attendance.setPresent(true);

        return attendRepo.save(attendance);
    }

    public List<Attendance> getAttendance(String email) {
        return attendRepo.findByEmail(email);
    }

    public long CountAttendance(String email) {
        return attendRepo.countByEmailAndPresent(email , true);
    }
}
