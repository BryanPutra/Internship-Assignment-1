package com.tim7.eform.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
import com.tim7.eform.model.EnumRole;
import com.tim7.eform.model.Role;
import com.tim7.eform.model.User;
import com.tim7.eform.payload.LoginRequest;
import com.tim7.eform.payload.MessageResponse;
import com.tim7.eform.payload.SignupRequest;
import com.tim7.eform.payload.UserInfoResponse;
import com.tim7.eform.repository.RoleRepository;
import com.tim7.eform.repository.UserRepository;
import com.tim7.eform.service.UserDetailsImplements;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
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
		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
								.body(new UserInfoResponse(userDetails.getId(),
															userDetails.getUsername(),
															userDetails.getEmail(),
															roles));
	}
	
	//Postpone signup feature
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest){
		if(userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}
		if(userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
		}
		
		User user = new User(signUpRequest.getUsername(),signUpRequest.getEmail(),pwdEncoder.encode(signUpRequest.getPassword()));
		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();
		
		if(strRoles == null) {
			Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		}else {
			strRoles.forEach(role -> {
				switch(role) {
				case "admin":
					Role adminRole = roleRepository.findByName(EnumRole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
					
				case "mod":
					Role modRole = roleRepository.findByName(EnumRole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					
				default:
					Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered succesfully!"));
	}
	
}
