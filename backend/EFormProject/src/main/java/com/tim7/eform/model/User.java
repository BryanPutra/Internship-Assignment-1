package com.tim7.eform.model;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

@Document(collection = "users")
public class User {
	
	@Id
	private String id;
    private String cifCode;
    
    private String ktpId;
    private String fullName;
    private Date birthDate;
    private String birthPlace;
    private String maritalStatusKtp;
    private String religionKtp;
    private String genderKtp;
    private String mothersMaidenKtp;
    private String streetAddressKtp;
    private String rtKtp;
    private String rwKtp;
    private String provinceKtp;
    private String cityKtp;
    private String districtKtp;
    private String subDistrictKtp;
    private String postalCodeKtp;
    
    private String username;
    private String email;
    private String password;
    private Set<Role> roles = new HashSet<>();
    
    private List<String> collectedData;
    
//    private String role;
    
    private Date createdDate;

	public User(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public List<String> getCollectedData() {
		return collectedData;
	}

	public void setCollectedData(List<String> collectedData) {
		this.collectedData = collectedData;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCifCode() {
		return cifCode;
	}

	public void setCifCode(String cifCode) {
		this.cifCode = cifCode;
	}

	public String getKtpId() {
		return ktpId;
	}

	public void setKtpId(String ktpId) {
		this.ktpId = ktpId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getBirthPlace() {
		return birthPlace;
	}

	public void setBirthPlace(String birthPlace) {
		this.birthPlace = birthPlace;
	}

	public String getMaritalStatusKtp() {
		return maritalStatusKtp;
	}

	public void setMaritalStatusKtp(String maritalStatusKtp) {
		this.maritalStatusKtp = maritalStatusKtp;
	}

	public String getReligionKtp() {
		return religionKtp;
	}

	public void setReligionKtp(String religionKtp) {
		this.religionKtp = religionKtp;
	}

	public String getGenderKtp() {
		return genderKtp;
	}

	public void setGenderKtp(String genderKtp) {
		this.genderKtp = genderKtp;
	}

	public String getMothersMaidenKtp() {
		return mothersMaidenKtp;
	}

	public void setMothersMaidenKtp(String mothersMaidenKtp) {
		this.mothersMaidenKtp = mothersMaidenKtp;
	}

	public String getStreetAddressKtp() {
		return streetAddressKtp;
	}

	public void setStreetAddressKtp(String streetAddressKtp) {
		this.streetAddressKtp = streetAddressKtp;
	}

	public String getRtKtp() {
		return rtKtp;
	}

	public void setRtKtp(String rtKtp) {
		this.rtKtp = rtKtp;
	}

	public String getRwKtp() {
		return rwKtp;
	}

	public void setRwKtp(String rwKtp) {
		this.rwKtp = rwKtp;
	}

	public String getProvinceKtp() {
		return provinceKtp;
	}

	public void setProvinceKtp(String provinceKtp) {
		this.provinceKtp = provinceKtp;
	}

	public String getCityKtp() {
		return cityKtp;
	}

	public void setCityKtp(String cityKtp) {
		this.cityKtp = cityKtp;
	}

	public String getDistrictKtp() {
		return districtKtp;
	}

	public void setDistrictKtp(String districtKtp) {
		this.districtKtp = districtKtp;
	}

	public String getSubDistrictKtp() {
		return subDistrictKtp;
	}

	public void setSubDistrictKtp(String subDistrictKtp) {
		this.subDistrictKtp = subDistrictKtp;
	}

	public String getPostalCodeKtp() {
		return postalCodeKtp;
	}

	public void setPostalCodeKtp(String postalCodeKtp) {
		this.postalCodeKtp = postalCodeKtp;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@SneakyThrows
	@SuppressWarnings({"unchecked"})
	public static <T> T get(String fieldName, Object instance, Class<?> instanceClass) throws Exception{
	    return (T) instanceClass.getDeclaredField(fieldName).get(instance);
	}
//	public String getRole() {
//		return role;
//	}
//
//	public void setRole(String role) {
//		this.role = role;
//	}

	

	
    
}
