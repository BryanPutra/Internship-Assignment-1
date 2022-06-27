package com.tim7.eform.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value="/api/form")
public class FormController {
	
	@GetMapping("/home")
	@PreAuthorize("hasRole('USER')")
	public String welcome() {
		return "Project EForm Tim 7";
	}
	
	@PostMapping("/getFormData")
	@PreAuthorize("hasRole('USER')")
	public String getFormData() {
		return "Project EForm Tim 7";
	}
}
