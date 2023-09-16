package com.user.service.entities;


import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_service")
public class User {

    @Id
    @Column(name = "UserId")
    private String userId;

    @Column(name = "Name")
    private String name;

    @Column(name = "Email")
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "About")
    private String about;

    @Transient
    private List<Rating> ratings = new ArrayList<>();

}
