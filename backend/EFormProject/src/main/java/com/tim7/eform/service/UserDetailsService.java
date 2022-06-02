package com.tim7.eform.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.tim7.eform.UserRepository;
import com.tim7.eform.model.User;

@Service
public interface UserDetailsService{
	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
