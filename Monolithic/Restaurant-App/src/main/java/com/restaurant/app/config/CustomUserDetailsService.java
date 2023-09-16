package com.restaurant.app.config;

import com.restaurant.app.entity.CustomUserDetails;
import com.restaurant.app.repository.UserRepository;
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
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException 
	{
		CustomUserDetails customUserDetails = userRepository.findByUserEmail(email);

		if(customUserDetails == null)
		{
			throw new UsernameNotFoundException("user not found");
		}
		
		return customUserDetails;
	}
}
