package com.api.gateway.config;


import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = Arrays.asList(

            "/auth/user/signIn",
            "/auth/user/signUp",
            "/auth/jwt/token",
            "/eureka"
    );

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .allMatch(uri -> request.getURI().getPath().contains(uri));


}
