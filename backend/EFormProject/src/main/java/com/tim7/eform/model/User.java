package com.tim7.eform.model;

import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("users")
public class User {
	
	@Transient
	public static final String SEQUENCE_NAME = "customers_sequence";
	
	@Id
	private Long id;
    private String cifCode;
    //private String title;
    private String fullName;
    private String mothersMaiden;
    private String gender;
    private Date birthDate;
    private String username;
    private String email;
    private String password;
    private Date createdDate;
    
	public User(Long id, String cifCode, String fullName, String mothersMaiden, String gender, Date birthDate, String username,
			String email, String password, Date createdDate) {
		super();
		this.id = id;
		this.cifCode = cifCode;
		this.fullName = fullName;
		this.mothersMaiden = mothersMaiden;
		this.gender = gender;
		this.birthDate = birthDate;
		this.username = username;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCifCode() {
		return cifCode;
	}

	public void setCifCode(String cifCode) {
		this.cifCode = cifCode;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMothersMaiden() {
		return mothersMaiden;
	}

	public void setMothersMaiden(String mothersMaiden) {
		this.mothersMaiden = mothersMaiden;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", cifCode=" + cifCode + ", fullName=" + fullName + ", mothersMaiden=" + mothersMaiden
				+ ", gender=" + gender + ", birthDate=" + birthDate + ", username=" + username + ", email=" + email
				+ ", password=" + password + ", createdDate=" + createdDate + "]";
	}

	
    
}
