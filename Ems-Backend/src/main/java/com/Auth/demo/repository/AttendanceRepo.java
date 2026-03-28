package com.Auth.demo.repository;

import com.Auth.demo.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepo extends JpaRepository<Attendance , Long> {
    List<Attendance> findByEmail(String email);

    Long countByEmailAndPresent(String email , boolean present);

    boolean existsByEmailAndDate(String email , LocalDate date);

}
