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
@Document("customers")
public class Customer {
	
	@Transient
	public static final String SEQUENCE_NAME = "customers_sequence";
	
	@Id
	private Long id;
    private String cifCode;
    //private String title;
    private String name;
    private String mothersMaiden;
    private String gender;
    private Date birthDate;
    private String email;
    private Date createdDate;
    
	public Customer(Long id, String cifCode, String name, String mothersMaiden, String gender, Date birthDate,
			String email, Date createdDate) {
		super();
		this.id = id;
		this.cifCode = cifCode;
		this.name = name;
		this.mothersMaiden = mothersMaiden;
		this.gender = gender;
		this.birthDate = birthDate;
		this.email = email;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	@Override
	public String toString() {
		return "Customer [id=" + id + ", cifCode=" + cifCode + ", name=" + name + ", mothersMaiden=" + mothersMaiden
				+ ", gender=" + gender + ", birthDate=" + birthDate + ", email=" + email + ", createdDate="
				+ createdDate + "]";
	}
    
    
	
	
}
