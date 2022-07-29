package com.tim7.eform.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.tim7.eform.repository.UserRepository;

@RestController
@RequestMapping(value="/api/form")
public class FormController {
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping("/home")
	@PreAuthorize("hasRole('USER')")
	public String welcome() {
		return "Project EForm Tim 7";
	}
	
	String test() {
		return "a";
	}
	
	//Map formData should have:
	// - productCode
	// - userDetails (id, email, cif)
	
	@PostMapping("/getFormData")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Map> getFormData(@RequestHeader(value="Authorization", required = true) String basicAuth, @RequestBody final Map formData) {
		Map returnMap = new HashMap<>();
		Map formMap = new HashMap();
		String id = (String)formData.get("id");
		String productCode = (String)formData.get("productCode");
		String currentPage = (String)formData.get("currentPage");
		String prevPage = (String) formData.get("prevPage");
		Boolean isBack = (Boolean) formData.get("isBack");
		System.out.println(productCode);
		//formMap = FormDataBO.getinstance().getRegistrationData(id, productCode, currentPage, prevPage, isBack);
		returnMap.put("formMap", formMap);
		//returnMap = FormDataBO.getinstance().getRegistrationData(id, productCode, null);
		
		return new ResponseEntity<Map>(returnMap,HttpStatus.OK);
	}
	
	@PostMapping("/getAutofillData")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Map> getAutofillData(@RequestBody final Map formData){
		Map returnMap = new HashMap<>();
		Map userMap = new HashMap<>();
		
		String email = (String)formData.get("email");
		userMap = FormDataBO.getinstance().getAutofillData(email);
		returnMap.put("user", userMap);
		
		return new ResponseEntity<Map>(returnMap,HttpStatus.OK);
	}
}
