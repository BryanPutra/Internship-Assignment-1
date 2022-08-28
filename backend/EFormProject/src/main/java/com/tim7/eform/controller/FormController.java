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
	
	//Map formData should have:
	// - productCode
	// - userDetails (id, email, cif)
	
	@PostMapping("/getFormData")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Map> getFormData(/*@RequestHeader(value="Authorization", required = true) String basicAuth, */@RequestBody final Map formData) {
		Map returnMap = new HashMap();
		Map formMap = new HashMap();
		Map userMap = new HashMap();
		Map autofillMap = new HashMap();
		
		String id = (String)formData.get("id");
		String email = (String)formData.get("email");
		String cif = (String)formData.get("cif");
		String ktpId = (String)formData.get("ktpId");
		String productCode = (String)formData.get("productCode");
		String currentPage = (String)formData.get("currentPage");
		String prevPage = (String) formData.get("prevPage");
		Boolean isBack = (Boolean) formData.get("isBack");
		Boolean isSubmit = (Boolean) formData.get("isSubmit");
		
		//TODO: Make new class to process submits in FormDataBO
		if(isSubmit) {
			Map inputData = new HashMap();
			Map autofillData = new HashMap();
			
			inputData = (Map) formData.get("inputData");
			autofillData = (Map) formData.get("autofillData");
			List inputDataKey = new LinkedList(inputData.keySet());
			List autofillKey = new LinkedList(autofillData.keySet());
			
			List inputDataValue = new LinkedList(inputData.values());
			List autofillValue = new LinkedList(autofillData.values());
			//if user input is different from the autofill data, then submit the user input
			if(!inputDataKey.equals(autofillKey) || !inputDataValue.equals(autofillValue)) {
				System.out.println("Found input difference");
				if(userRepository.existsByEmail(email)) {
					MongoQuery mq = new MongoQuery();
					Document userDoc = mq.getUser(email, cif, ktpId);
					List collectedData = new LinkedList();
					collectedData = (List)userDoc.get("collectedData");
					
					Set updatedCollectedData = new HashSet();
					if(userDoc.containsKey("collectedData")) {
						updatedCollectedData = new HashSet(collectedData);
					}

					int length = inputDataKey.size();
					for(int i = 0 ; i < length ; i++) {
						String currentInputKey = (String)inputDataKey.get(i);
						userDoc.append(currentInputKey, inputData.get(currentInputKey));
						updatedCollectedData.add(currentInputKey);
					}
					userDoc.append("collectedData", updatedCollectedData);
					
					mq.updateUser(email, cif, ktpId, userDoc);
					returnMap.put("submitStatus", "OK");
				}
			}else if(inputDataKey.equals(autofillKey) && inputDataValue.equals(autofillValue)) {
				System.out.println("Input is same as autofill data");
				//do nothing..
			}
			
			
			//TODO: Input Validation	
		}
		
		
		formMap = FormDataBO.getinstance().getRegistrationData(email, cif, ktpId, productCode, currentPage, prevPage, isBack, userMap);
	
		returnMap.put("formMap", formMap);
		return new ResponseEntity<Map>(returnMap,HttpStatus.OK);
	}
	
}
