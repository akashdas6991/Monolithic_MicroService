package com.user.service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "auth_service_user_details")
public class UserDetails {

    @Id
    private String userEmail;
    private String userPassword;
    private String userNamee;
    private String userMobile;
    private String userId;

    /******************* Unimplemented methods ***********************/

    //spring security
    private boolean enabled;


}
