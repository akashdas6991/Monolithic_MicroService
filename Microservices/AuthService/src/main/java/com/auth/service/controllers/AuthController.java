package com.auth.service.controllers;

import com.auth.service.configs.JwtTokenService;
import com.auth.service.entities.CustomUserDetails;
import com.auth.service.services.AuthService;
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
    private JwtTokenService jwtTokenService;

    /***************************************** user *****************************************/

    @PostMapping("/user/signUp")
    public ResponseEntity<ModelMap> userSignUp(@RequestBody CustomUserDetails user)
    {
        ModelMap response = authService.userSignUp(user);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/user/signIn")
    public ResponseEntity<ModelMap> userSignIn(@RequestBody CustomUserDetails user )
    {
        ModelMap response = authService.userSignIn(user);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    /******************************************* JWT ********************************************/

    @GetMapping("/jwt/token")
    public ResponseEntity<ModelMap> validateToken(HttpServletRequest request)
    {
        ModelMap response = jwtTokenService.validateToken(request);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

}
