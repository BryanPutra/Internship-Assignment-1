package com.tim7.eform.bo;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jboss.logging.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileSystemUtils;

public class FormDataBO {
	
	public static Logger log = Logger.getLogger(FormDataBO.class);
	
	private static FormDataBO instance = null;
	public static synchronized FormDataBO getinstance() {
		if(instance == null) {
			instance = new FormDataBO();
		}
		return instance;
	}
	
	public Map getRegistrationData(String id, String productCode, String currentPage) {
		Map returnMap = new HashMap();
		Map requirementMap = new HashMap();
		List requirementList = new LinkedList();
		List requirementName = new LinkedList();
		
		requirementMap = getProductRequirementsFromFile(productCode);
		requirementList = (List)requirementMap.get("requirementList");
		
		System.out.println(requirementList.get(0));
//		if(currentPage.isEmpty()) {
//			
//		}
		
		return returnMap;
	}
	
	public Map getAutofillData(String id, String productCode) {
		Map returnMap = new HashMap<>();
		
		
		
		
		return returnMap;
	}
	
	public Map getProductRequirementsFromFile(String productCode) {
		Map productRequirements = new HashMap<>();
		List<Object> productList = new LinkedList<>();
		
		JSONObject data = null;
		
		try {
			File file = new ClassPathResource("JSONConfigs/ProductConfig.json").getFile();
			String content = new String(Files.readAllBytes(file.toPath()));
			data = new JSONObject(content);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			log.error("getProductRequirementsFromFile" + e);
		}
		int dataLength = data.getJSONArray("productList").length();
		
		for(int i = 0 ; i < dataLength ; i++) {
			JSONArray jsonArrayTemp = data.getJSONArray("productList");
			productList.add(toMap((JSONObject)jsonArrayTemp.get(i)));
		}
		
		int productListLength = productList.size();
		for(int i = 0 ; i < productListLength ; i++) {
			Map tempMap = (Map)productList.get(i);
			if(productCode.equalsIgnoreCase((String)tempMap.get("product"))) {
				productRequirements = tempMap;
				break;
			}
		}
		
		return productRequirements;
	}
	
	public Map getPageDetailsFromFile(String requirementName) {
		Map returnMap = new HashMap<>();
		List<Object> pageList = new LinkedList();
		JSONObject data = null;
		
		try {
			File file = new ClassPathResource("JSONConfigs/ProductConfig.json").getFile();
			String content = new String(Files.readAllBytes(file.toPath()));
			data = new JSONObject(content);
		}catch (Exception e) {
			e.printStackTrace();
			log.error("getPageDetailsFromFile" + e);
		}
		
		int dataLength = data.getJSONArray("categoryList").length();
		for(int i = 0 ; i < dataLength ; i++) {
			JSONArray jsonArrayTemp = data.getJSONArray("categoryList");
			pageList.add(toMap((JSONObject)jsonArrayTemp.get(i)));
		}
		
		int pageListLength = pageList.size();
		for(int i = 0 ; i < pageListLength ; i++) {
			Map tempMap = (Map)pageList.get(i);
			String categoryCode = requirementName.substring(0,3);
			if(categoryCode.equalsIgnoreCase((String)tempMap.get("category"))) {
				returnMap = tempMap;
				break;
			}
		}
		
		return returnMap;
	}
	
	public static Map<String, Object> toMap(JSONObject object) throws JSONException {
	    Map<String, Object> map = new HashMap<String, Object>();

	    Iterator<String> keysItr = object.keys();
	    while(keysItr.hasNext()) {
	        String key = keysItr.next();
	        Object value = object.get(key);

	        if(value instanceof JSONArray) {
	            value = toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = toMap((JSONObject) value);
	        }
	        map.put(key, value);
	    }
	    return map;
	}
	
	public static List<Object> toList(JSONArray array) throws JSONException {
	    List<Object> list = new ArrayList<Object>();
	    for(int i = 0; i < array.length(); i++) {
	        Object value = array.get(i);
	        if(value instanceof JSONArray) {
	            value = toList((JSONArray) value);
	        }

	        else if(value instanceof JSONObject) {
	            value = toMap((JSONObject) value);
	        }
	        list.add(value);
	    }
	    return list;
	}
}
