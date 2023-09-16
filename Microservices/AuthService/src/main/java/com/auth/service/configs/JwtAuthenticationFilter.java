package com.auth.service.configs;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter
{
	private UserDetailsService userDetailsService;
	private JwtTokenService jwtTokenHelper;
	
	public JwtAuthenticationFilter(UserDetailsService userDetailsService, JwtTokenService jwtTokenHelper)
	{
		this.userDetailsService = userDetailsService;
		this.jwtTokenHelper = jwtTokenHelper;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException 
	{
		String authToken;
		
		authToken = jwtTokenHelper.getToken(request);
		
		if(authToken != null)
		{
			String email = jwtTokenHelper.getUsernameFromToken(authToken);
			
			if(email != null)
			{
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				
				if(jwtTokenHelper.validateToken(authToken, userDetails))
				{
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
					
					usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetails(request));
					
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
		}
		
		filterChain.doFilter(request, response);
	}
}
