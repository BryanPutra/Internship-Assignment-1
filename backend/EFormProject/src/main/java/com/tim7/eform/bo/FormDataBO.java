package com.tim7.eform.bo;

import java.util.HashMap;
import java.util.Map;

public class FormDataBO {
	
	private static FormDataBO instance = null;
	public static synchronized FormDataBO getinstance() {
		if(instance == null) {
			instance = new FormDataBO();
		}
		return instance;
	}
	
	public Map getRegistrationData(String id, String productCode) {
		Map resultMap = new HashMap<>();
		
		
		
		
		return resultMap;
	}
	
	public Map getProductRequirements(String productCode) {
		
		Map productRequirements = new HashMap<>();
		
		return productRequirements;
	}
	
	public Map getPageDetails(String pageName) {
		Map pageDetails = new HashMap<>();
		
		return pageDetails;
	}
}
