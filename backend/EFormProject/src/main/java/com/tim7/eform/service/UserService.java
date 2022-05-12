package com.tim7.eform.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tim7.eform.CustomerRepository;
import com.tim7.eform.model.Customer;

@Service
public class UserService implements UserDetailsService{

	@Autowired
	private CustomerRepository repository;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Customer customer = repository.findByUsername(username);
		return new org.springframework.security.core.userdetails.User(customer.getEmail(),customer.getUsername(), new ArrayList<GrantedAuthority>());
	}
	
}
