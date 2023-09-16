package com.auth.service.configs;

import com.auth.service.entities.CustomUserDetails;
import com.auth.service.repositories.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// CustomUserDetailsService used to override UserDetailsService of spring security from username to email.

@Service
public class CustomUserDetailsService implements UserDetailsService
{
	@Autowired
	AuthRepository authRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException 
	{
		CustomUserDetails customUserDetails = authRepository.findByEmail(email);

		if(customUserDetails == null)
		{
			throw new UsernameNotFoundException("user not found");
		}
		
		return customUserDetails;
	}
}
