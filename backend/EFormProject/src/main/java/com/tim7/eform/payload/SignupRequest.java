package com.tim7.eform.payload;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SignupRequest {
	@NotBlank
	private String username;
	
	@NotBlank
	@Email
	private String email;
	
	private Set<String> roles;
	
	@NotBlank
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
