package com.restaurant.app.controller;

import com.restaurant.app.config.JwtService;
import com.restaurant.app.entity.CustomUserDetails;
import com.restaurant.app.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "${restaurant.app.mobile.web.url}")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtService jwtService;

    /******************************** USER ******************************************/

    @PostMapping("/auth/user/signUp")
    private ResponseEntity<ModelMap> signUp(@RequestBody CustomUserDetails customUserDetails){

        ModelMap response = authenticationService.signUp(customUserDetails);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/auth/user/signIn")
    private ResponseEntity<ModelMap> signIn(@RequestBody CustomUserDetails customUserDetails){

        ModelMap response = authenticationService.signIn(customUserDetails);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    @PostMapping("/auth/user/signOut")
    private ResponseEntity<ModelMap> signOut(@RequestBody CustomUserDetails customUserDetails ,
                                             HttpServletRequest request)
    {
        ModelMap response = authenticationService.signOut(customUserDetails,request);

        return ResponseEntity.status((HttpStatus) response.get("httpStatus")).body(response);
    }

    /******************************** JWT ******************************************/

    @GetMapping("/auth/jwt/token/validate")
    private ResponseEntity<ModelMap> jwtValidate(HttpServletRequest request){

        ModelMap response = authenticationService.jwtValidate(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
