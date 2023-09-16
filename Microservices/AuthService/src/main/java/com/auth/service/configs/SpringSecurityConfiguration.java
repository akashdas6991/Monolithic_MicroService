package com.auth.service.configs;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JwtTokenService jwtTokenHelper;
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception
	{
		return super.authenticationManagerBean();
	}
	
	/*********** password is not encoded  ************/
	 
	//	@Bean
	//	public PasswordEncoder passwordEncoder()
	//	{
	//		return NoOpPasswordEncoder.getInstance();
	//	}
	
	/*************************************************/
	
	/************ password is encoded ****************/
	 
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	/*************************************************/


	
	/********** Authorization (http url) *************/
	@Override
	protected void configure(HttpSecurity http) throws Exception 
	{	
		/************************************* For JWT REST Api *****************************************/

		// step 1 : Set session management = stateless
		// 			Stop spring security to use server's - session for user's authorizations and authentications.
		
        http = http
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and();

		// step 2 :	Set unauthorized requests
		// 			Except entrypoint url's , all are unauthorized.
		// 			Exception handler to throw unauthorized error.

        http = http
            .exceptionHandling()
            .authenticationEntryPoint(
                (request, response, ex) -> {
                    response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        ex.getMessage()
                    );
                }
            )
            .and();

		// step 3 :	Set authorized requests
		// 			Entrypoint url's.

        http.authorizeRequests()
			.antMatchers(HttpMethod.POST ,"/auth/user/signIn").permitAll()
			.antMatchers(HttpMethod.POST ,"/auth/user/signUp").permitAll()
			.antMatchers(HttpMethod.POST ,"/auth/user/signOut").permitAll()
			.anyRequest()
			.authenticated();

		// step 4 :	Add JWT token filter
		//			Extracts the JWT token from the unauthorized request's header and delegates authentication to the injected AuthenticationManager
		//			If the token is not found, an exception is thrown that stops the request from processing.

        http.addFilterBefore( new JwtAuthenticationFilter(customUserDetailsService,jwtTokenHelper), UsernamePasswordAuthenticationFilter.class );

		// step 5 : Enable CORS (Cross-Origin Requests)
		//			Allow Cross-Origin Requests to get the authorized requests from Client (React Js app)

        http.cors();

		// step 6 : Disable CSRF (Cross-Site Request Forgery)
		// 			A security vulnerability that allows attackers to send unauthorized requests from a user's browser to a vulnerable web application

        http.csrf().disable().headers().frameOptions().disable();
	}
	
	/*************************************************/
	
	/**** Authentication (username and password) *****/
		
	@Override
 	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		// Allows for easily building in memory / LDAP / JDBC based authentication, adding UserDetailsService , and adding AuthenticationProvider 's.
		// CustomUserDetailsService used to override UserDetailsService of spring security from username to email.
		
		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
 	} 	
	
	/*************************************************/

}
