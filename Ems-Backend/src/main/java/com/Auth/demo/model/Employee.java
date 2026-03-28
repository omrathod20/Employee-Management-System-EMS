package com.Auth.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    @NonNull
    private String email;
    private String department;
    @Column(length = 10)
    private String phone;
    private Integer salary;
    @Column(name = "join_date")
    private LocalDate joinDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")   // DB column name
    @JsonIgnore
    private User user;

}
