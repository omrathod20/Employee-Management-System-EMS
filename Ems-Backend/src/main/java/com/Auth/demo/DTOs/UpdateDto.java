package com.Auth.demo.DTOs;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDto {
                private String name;
                private String department;
                private  Integer salary;
                private String phone;
                private String status;

        }

