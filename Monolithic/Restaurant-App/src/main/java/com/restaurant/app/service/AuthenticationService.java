package com.restaurant.app.service;

import com.restaurant.app.entity.CustomUserDetails;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import javax.servlet.http.HttpServletRequest;

@Service
public interface AuthenticationService {

    ModelMap signIn(CustomUserDetails customUserDetails);

    ModelMap signUp(CustomUserDetails customUserDetails);

    ModelMap signOut(CustomUserDetails customUserDetails,HttpServletRequest request);

    ModelMap jwtValidate(HttpServletRequest request);

}
