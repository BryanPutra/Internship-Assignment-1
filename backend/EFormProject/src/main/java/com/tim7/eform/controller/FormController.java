package com.tim7.eform.controller;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tim7.eform.bo.FormDataBO;
import com.tim7.eform.model.User;
import com.tim7.eform.mongo.MongoQuery;
import com.tim7.eform.repository.CustomUserRepository;
import com.tim7.eform.repository.UserRepository;

@RestController
@RequestMapping(value="/api/form")
public class FormController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	CustomUserRepository repo;
	
	@GetMapping("/home")
	@PreAuthorize("hasRole('USER')")
	public String welcome() {
		return "Project EForm Tim 7";
	}
	
	String test() {
		return "a";
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
		Boolean isFromHome = (Boolean) formData.get("isFromHome");

		//validate booleans, DO NOT REMOVE
		if(isSubmit==null) isSubmit = false;
		if(isFromHome == null) isFromHome = false;
		if(isBack == null) isBack = false;
		
		//TODO: Make new class to process submits in FormDataBO
		if(isSubmit) {
			Map inputData = new HashMap();
			Map autofillData = new HashMap();
			
			inputData = (Map) formData.get("inputData");
			autofillData = (Map) formData.get("autofillData");
			
			String submitStatus = FormDataBO.getinstance().submitRegistrationData(email, cif, ktpId, inputData, autofillData);
			returnMap.put("submitStatus", submitStatus);
		}
		
		formMap = FormDataBO.getinstance().getRegistrationData(email, cif, ktpId, productCode, currentPage, prevPage, isBack, isFromHome);
	
		returnMap.put("formMap", formMap);
		return new ResponseEntity<Map>(returnMap,HttpStatus.OK);
	}
	
}
