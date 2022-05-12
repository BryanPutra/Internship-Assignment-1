package com.tim7.eform.model;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
	@Id
	public long id;
	public String email;
	public String username;
	
	public Customer(){
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public Customer(long id, String email, String username) {
		super();
		this.id = id;
		this.email = email;
		this.username = username;
	}
	
	@Override
	public String toString() {
		return "Customer [id=" + id + ", email="+email + ", username=" + username + "]";
	}
	
	
}
