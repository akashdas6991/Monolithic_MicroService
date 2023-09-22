package com.auth.service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "auth_service_jwt_details")
public class JwtDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String userEmail;
    private String token;

}
