package com.tim7.eform.controller;

import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tim7.eform.bo.FormDataBO;
import com.tim7.eform.repository.CustomUserRepository;

@RestController
@RequestMapping(value="/api/form")
public class FormController {
	
	@Autowired
	CustomUserRepository repo;
	
	@GetMapping("/home")
	@PreAuthorize("hasRole('USER')")
	public String welcome() {
		return "Project EForm Tim 7";
	}
	
	@PostMapping("/getFormData")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Map> getFormData(/*@RequestHeader(value="Authorization", required = true) String basicAuth, */@RequestBody final Map formData) {
		Map returnMap = new HashMap();
		Map formMap = new HashMap();
		String id = (String)formData.get("id");
		String email = (String)formData.get("email");
		String cif = (String)formData.get("cif");
		String ktpId = (String)formData.get("ktpId");
		String productCode = (String)formData.get("productCode");
		String currentPage = (String)formData.get("currentPage");
		String prevPage = (String) formData.get("prevPage");
		Boolean isBack = (Boolean) formData.get("isBack");
		Boolean isSubmit = (Boolean) formData.get("isSubmit");
		Boolean isFromSectionPage = (Boolean) formData.get("isFromSectionPage");
		
		//validate booleans, DO NOT REMOVE
		if(isSubmit==null) isSubmit = false;
		if(isFromSectionPage == null) isFromSectionPage = false;
		if(isBack == null) isBack = false;
		
		formMap = FormDataBO.getinstance().getRegistrationData(email, cif, ktpId, productCode, currentPage, prevPage, isBack, isFromSectionPage);
		
		if(isSubmit) {
			Map inputData = new HashMap();
			Map autofillData = new HashMap();
			
			inputData = (Map) formData.get("inputData");
			autofillData = (Map) formData.get("autofillData");
			
			String submitStatus = FormDataBO.getinstance().submitRegistrationData(email, cif, ktpId, inputData, autofillData);
			returnMap.put("submitStatus", submitStatus);
		}
	
		returnMap.put("formMap", formMap);
		return new ResponseEntity<Map>(returnMap,HttpStatus.OK);
	}
	
	@GetMapping("/test")
	String test() {
		return "test() method successfully called";
	}
	
	@PostMapping("/insertImage")
	public String insertImage(@RequestBody final Map formData) throws URISyntaxException {
		
		String base64String = (String)formData.get("ktpPhoto");
		String cif = (String)formData.get("cif");
		String email = (String)formData.get("email");
		
		FormDataBO.getinstance().storeBase64KtpPhoto(base64String, cif, email);
		
		return "Insert Complete";
	}
}
