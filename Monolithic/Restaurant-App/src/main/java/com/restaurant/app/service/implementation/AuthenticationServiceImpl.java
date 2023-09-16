package com.restaurant.app.service.implementation;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.restaurant.app.config.JwtService;
import com.restaurant.app.entity.CustomUserDetails;
import com.restaurant.app.entity.JwtDetails;
import com.restaurant.app.repository.JwtRepository;
import com.restaurant.app.repository.UserRepository;
import com.restaurant.app.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtRepository jwtRepository;

    @Override
    public ModelMap signUp(CustomUserDetails customUserDetails) {

        ModelMap response = new ModelMap();

        CustomUserDetails customUserDetailsFound = userRepository.findByUserEmail(customUserDetails.getUserEmail());

        if(customUserDetailsFound == null)
        {
            //user not found , Sign Up
            customUserDetails.setUserId(UUID.randomUUID().toString());
            customUserDetails.setUserPassword(passwordEncoder.encode(customUserDetails.getUserPassword()));
            customUserDetails.setEnabled(true);

            CustomUserDetails customUserDetailsSaved = userRepository.save(customUserDetails);

            response.put("userNamee",customUserDetailsSaved.getUserNamee());
            response.put("userEmail",customUserDetailsSaved.getUserEmail());
            response.put("userMobile",customUserDetailsSaved.getUserMobile());
            response.put("httpStatus", HttpStatus.CREATED);
            response.put("message", "Signed Up Successfully.");
        }
        else
        {
            //user found , Sign In
            response.put("message", "User already exist.Please Sign In.");
            response.put("httpStatus", HttpStatus.FOUND);
        }

        return response;
    }

    @Override
    public ModelMap signIn(CustomUserDetails customUserDetails) {

        ModelMap response = new ModelMap();

        CustomUserDetails customUserDetailsFound = userRepository.findByUserEmail(customUserDetails.getUserEmail());

        if(customUserDetailsFound != null && !passwordEncoder.matches(customUserDetails.getPassword(), customUserDetailsFound.getUserPassword() ))
        {
            //user found , Incorrect password
            response.put("message", "Incorrect Password");
            response.put("httpStatus", HttpStatus.UNAUTHORIZED);
        }
        else if(customUserDetailsFound != null && passwordEncoder.matches(customUserDetails.getPassword(), customUserDetailsFound.getUserPassword() ))
        {
            //user found , correct password , Find if any token exist
            JwtDetails jwtDetails = jwtRepository.findByUserEmail(customUserDetails.getUserEmail());

            if(jwtDetails == null)
            {
                //user found , no token exist , create new token , save in db , give token
                JwtDetails jwtDetailsSave = new JwtDetails();
                jwtDetailsSave.setUserEmail(customUserDetails.getUserEmail());
                jwtDetailsSave.setToken(jwtService.generateToken(customUserDetailsFound.getUserEmail()));
                JwtDetails jwtDetailsSaved = jwtRepository.save(jwtDetailsSave);
                response.put("token",jwtDetailsSaved.getToken());
            }
            else
            {
                //user found , token exist , check token ifExpired
                DecodedJWT decodedJWT = jwtService.jwtTokenDecode(jwtDetails.getToken());
                boolean isJwtTokenExpired = jwtService.isJwtTokenExpired(decodedJWT);

                if(isJwtTokenExpired)
                {
                    //user found , token exist , token expired , generate new token , update in db , give token
                    jwtDetails.setToken(jwtService.generateToken(customUserDetailsFound.getUserEmail()));
                    JwtDetails jwtDetailsSaved = jwtRepository.save(jwtDetails);
                    response.put("token",jwtDetailsSaved.getToken());
                }
                else
                {
                    //user found , token exist , token not expired , give token
                    response.put("token",jwtDetails.getToken());
                }
            }

            //user found , give user details
            response.put("userNamee",customUserDetailsFound.getUserNamee());
            response.put("userEmail",customUserDetailsFound.getUserEmail());
            response.put("userMobile",customUserDetailsFound.getUserMobile());
            response.put("message", "Signed In Successfully.");
            response.put("httpStatus", HttpStatus.FOUND);
        }
        else
        {
            //user not found , Sign Up
            response.put("message", "Please Sign Up.");
            response.put("httpStatus", HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @Override
    public ModelMap signOut(CustomUserDetails customUserDetails,HttpServletRequest request) {

        ModelMap response = new ModelMap();

        //get the token
        String tokenFromRequest = jwtService.getToken(request);
        //get the user from token
        String userEmailFromToken = jwtService.getUsernameFromToken(tokenFromRequest);
        //get the user from request
        String userEmailFromRequest = customUserDetails.getUserEmail();

        //verify both userEmail are same
        if(userEmailFromToken.compareToIgnoreCase(userEmailFromRequest) == 0)
        {
            //if verified , verify the request token with db token
            JwtDetails jwtDetails =  jwtRepository.findByUserEmail(userEmailFromRequest);

            //verify token
            if(tokenFromRequest.compareToIgnoreCase(jwtDetails.getToken()) == 0)
            {
                //if token verified , delete now
                jwtRepository.delete(jwtDetails);

                //verify deletion success
                JwtDetails jwtDetailsFind = jwtRepository.findByUserEmail(jwtDetails.getUserEmail());

                if(jwtDetailsFind == null)
                {
                    //data null, deletion successful
                    response.put("message","Signed Out Successfully.");
                    response.put("httpStatus",HttpStatus.OK);
                }
                else
                {
                    //data still in db , deletion failed
                    response.put("message","Sign Out Failed.");
                    response.put("httpStatus",HttpStatus.NOT_ACCEPTABLE);
                }
            }
            else
            {
                //token not verified , illegal token
                response.put("message","Illegal token");
                response.put("httpStatus",HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else
        {
            // not verified , token is illegal
            response.put("message","Illegal token");
            response.put("httpStatus",HttpStatus.NOT_ACCEPTABLE);
        }

        return response;
    }

    @Override
    public ModelMap jwtValidate(HttpServletRequest request)
    {
        ModelMap response = jwtService.validateToken(request);

        return response;
    }
}
