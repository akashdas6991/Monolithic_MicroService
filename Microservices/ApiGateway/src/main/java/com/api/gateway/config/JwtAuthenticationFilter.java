package com.api.gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.filter.factory.AbstractNameValueGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    @Autowired
    private RouteValidator routeValidator;

    @Autowired
    private RestTemplate restTemplate;

    public JwtAuthenticationFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {

            if(routeValidator.isSecured.test(exchange.getRequest())){
                //header contains token or not
                if(exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION))
                    throw new RuntimeException("missing authorization header");

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                if(authHeader != null && authHeader.startsWith("Bearer")){
                    authHeader = authHeader.substring(7);
                }

                try{
                    //rest call to validate token
                    restTemplate.getForObject("http://AUTH-SERVICE/auth/jwt/token" , String.class);
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                }
            }

            return chain.filter(exchange);

        });
    }

    public static class Config{

    }
}
