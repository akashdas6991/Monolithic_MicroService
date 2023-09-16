package com.auth.service.services;

import com.auth.service.entities.CustomUserDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.HashMap;

@Service
public interface AuthService {

    public ModelMap userSignUp(CustomUserDetails user);

    public ModelMap userSignIn(CustomUserDetails user);

    public CustomUserDetails userDetailByUserId(String userId);

}
