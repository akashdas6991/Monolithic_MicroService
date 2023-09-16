package com.auth.service.services.implementations;

import com.auth.service.configs.JwtTokenService;
import com.auth.service.entities.CustomUserDetails;
import com.auth.service.entities.JwtToken;
import com.auth.service.repositories.AuthRepository;
import com.auth.service.repositories.JwtTokenRepository;
import com.auth.service.services.AuthService;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.HashMap;
import java.util.UUID;

@Service
public class AuthServiceImplementation implements AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private JwtTokenRepository jwtTokenRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Override
    public ModelMap userSignUp(CustomUserDetails user)
    {
        ModelMap response = new ModelMap();
        CustomUserDetails userExistOrNot = userDetailByUserId(user.getEmail());

        if(userExistOrNot == null)
        {
            String userId = UUID.randomUUID().toString();
            String password = passwordEncoder.encode(user.getPassword());
            user.setUserId(userId);
            user.setPassword(password);
            CustomUserDetails userSignedUp  =  authRepository.save(user);

            response.put("name",userSignedUp.getName());
            response.put("email",userSignedUp.getEmail());
            response.put("httpStatus", HttpStatus.CREATED);
        }
        else
        {
            response.put("message","user exist");
            response.put("httpStatus", HttpStatus.FOUND);
        }

        return response;
    }

    @Override
    public ModelMap userSignIn(CustomUserDetails user) {

        //Que1
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken( user.getEmail()  , user.getPassword() ));

        //Que2
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Que3
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        ModelMap response = new ModelMap();

        if(customUserDetails == null)
        {
            response.put("message","user not exist");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }
        else
        {
            String   jwtToken="";
            JwtToken jwtTokenObj = jwtTokenRepository.findByUser(customUserDetails.getEmail());

            if(jwtTokenObj != null)
            {
                DecodedJWT decodedJWT = jwtTokenService.jwtTokenDecode(jwtTokenObj.getToken());

                boolean  isTokenExpired = jwtTokenService.isJwtTokenExpired(decodedJWT);

                if(isTokenExpired)
                {
                    jwtToken = jwtTokenService.generateToken(customUserDetails.getUsername());
                    jwtTokenObj.setToken(jwtToken);
                    jwtTokenObj = jwtTokenRepository.save(jwtTokenObj);
                }
            }
            else
            {
                jwtTokenObj = new JwtToken();

                jwtToken = jwtTokenService.generateToken(customUserDetails.getUsername());
                jwtTokenObj.setToken(jwtToken);
                jwtTokenObj.setUser(customUserDetails.getUsername());
                jwtTokenObj = jwtTokenRepository.save(jwtTokenObj);
            }

            response.put("token",jwtTokenObj.getToken());
            response.put("name",customUserDetails.getName());
            response.put("email",customUserDetails.getEmail());
            response.put("httpStatus", HttpStatus.FOUND);
        }

        return response;
    }

    @Override
    public CustomUserDetails userDetailByUserId(String email) {
        return authRepository.findByEmail(email);
    }

}
