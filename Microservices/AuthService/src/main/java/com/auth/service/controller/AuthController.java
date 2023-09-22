package com.auth.service.controller;

import com.auth.service.config.JwtService;
import com.auth.service.entity.CustomUserDetails;
import com.auth.service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    /******************************** USER ******************************************/

    @PostMapping("/user/signUp")
    private ResponseEntity<ModelMap> signUp(@RequestBody CustomUserDetails customUserDetails){

        ModelMap response = authService.signUp(customUserDetails);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/user/signIn")
    private ResponseEntity<ModelMap> signIn(@RequestBody CustomUserDetails customUserDetails){

        ModelMap response = authService.signIn(customUserDetails);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/user/signOut")
    private ResponseEntity<ModelMap> signOut(@RequestBody CustomUserDetails customUserDetails ,
                                             HttpServletRequest request)
    {
        ModelMap response = authService.signOut(customUserDetails,request);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    /******************************** JWT ******************************************/

    @GetMapping("/jwt/token/validate")
    private ResponseEntity<ModelMap> jwtValidate(HttpServletRequest request){

        ModelMap response = authService.jwtValidate(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
