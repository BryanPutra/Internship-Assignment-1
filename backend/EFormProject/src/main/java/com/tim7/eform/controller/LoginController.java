package com.tim7.eform.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tim7.eform.jwt.JwtUtils;
import com.tim7.eform.payload.LoginRequest;
import com.tim7.eform.payload.UserInfoResponse;
import com.tim7.eform.repository.UserRepository;
import com.tim7.eform.service.UserDetailsImplements;

@RestController
@RequestMapping("/auth")
public class LoginController {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder pwdEncoder;
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?>authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
		//has been modified to login using email & password instead of username & password
		Authentication authentication = authenticationManager.authenticate(
										new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
																				loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserDetailsImplements userDetails = (UserDetailsImplements) authentication.getPrincipal();
		ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
								.body(new UserInfoResponse(userDetails.getId(),
															userDetails.getUsername(),
															userDetails.getEmail()));
	}
}
