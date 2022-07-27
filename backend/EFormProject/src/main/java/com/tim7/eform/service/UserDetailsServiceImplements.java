package com.tim7.eform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tim7.eform.model.User;
import com.tim7.eform.repository.UserRepository;


@Service
public class UserDetailsServiceImplements implements UserDetailsService{
	@Autowired
	UserRepository userRepository;
//	The original load user by username
//	@Transactional
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: "+username));
//		return UserDetailsImplements.build(user);
//	}
	
	//load user by email
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with Email: "+email));
		return UserDetailsImplements.build(user);
	}

}