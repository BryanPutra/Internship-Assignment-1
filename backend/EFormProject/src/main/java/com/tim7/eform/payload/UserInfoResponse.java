package com.tim7.eform.payload;

public class UserInfoResponse {
	private long id;
	private String username;
	private String email;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
	public UserInfoResponse(long id, String username, String email) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
	}
	
	
}
