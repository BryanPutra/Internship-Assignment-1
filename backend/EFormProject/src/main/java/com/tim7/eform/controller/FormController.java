package com.tim7.eform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FormController {
	
	
	@RequestMapping(value="/")
	@ResponseBody
	public String welcome() {
		return "Project EForm Tim 7";
	}
	
}
