package com.Auth.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private boolean present;


}
