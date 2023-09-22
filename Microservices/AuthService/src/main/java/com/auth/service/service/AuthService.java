package com.auth.service.service;

import com.auth.service.entity.CustomUserDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Service
public interface AuthService {

    ModelMap signIn(CustomUserDetails customUserDetails);

    ModelMap signUp(CustomUserDetails customUserDetails);

    ModelMap signOut(CustomUserDetails customUserDetails, HttpServletRequest request);

    ModelMap jwtValidate(HttpServletRequest request);

}
