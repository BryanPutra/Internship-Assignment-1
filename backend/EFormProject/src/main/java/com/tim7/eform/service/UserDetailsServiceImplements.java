package com.tim7.eform.service;

import java.util.ArrayList;

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
	
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: "+username));
		return UserDetailsImplements.build(user);
	}
	
}
