package com.auth.service.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table( name = "auth_service_jwt_token")
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String user;
    private String token;

}
