package com.tim7.eform.payload;

import java.util.List;

public class UserInfoResponse {
	private String id;
	private String username;
	private String email;
	private String cif;
	private List<String> roles;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
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
	public String getCif() {
		return cif;
	}
	public void setCif(String cif) {
		this.cif = cif;
	}
	public List<String> getRoles(){
		return roles;
	}
	
	public UserInfoResponse(String id, String username, String email, String cif, List<String> roles) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.cif = cif;
		this.roles = roles;
	}
	
	
}
