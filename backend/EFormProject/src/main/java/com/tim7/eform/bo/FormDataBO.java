package com.tim7.eform.bo;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import com.tim7.eform.model.User;
import com.tim7.eform.mongo.MongoQuery;
import com.tim7.eform.repository.CustomUserRepository;

import lombok.SneakyThrows;

public class FormDataBO{
	
	@Autowired
	CustomUserRepository repository;
	
	public static Logger log = Logger.getLogger(FormDataBO.class);
	
	private static FormDataBO instance = null;
	
	MongoQuery mq = new MongoQuery();
	
	public static synchronized FormDataBO getinstance() {
		
		if(instance == null) {
			instance = new FormDataBO();
		}
		return instance;
	}
	
	public Map getRegistrationData(String email, String cif, String ktpId, String productCode, String currentPage, String prevPage, boolean isBack, Map userMap) {
		Map returnMap = new HashMap();
		Map nextPageMap = new HashMap();
		List fieldNameList = new LinkedList();
		Map autofillMap = new HashMap();
		
		
		nextPageMap = getNextPage(productCode,currentPage,prevPage,isBack);
		fieldNameList = (List) nextPageMap.get("fieldNameList");
		nextPageMap.remove("fieldNameList");
		
		autofillMap = getAutofillData(email, cif, ktpId, fieldNameList);
		
		returnMap.put("autofillMap", autofillMap);
		returnMap.put("nextPageMap", nextPageMap);
		
		return returnMap;
	}
	
	public Map getNextPage(String productCode, String currentPage, String prevPage, boolean isBack) {
		Map returnMap = new HashMap();
		String nextPage=null;
		String currentRequirement = null;
		Map productConfigMap = new HashMap();
		Map pageConfigMap = new HashMap();
		Map autofillMap = new HashMap();
		
		List productRequirementList = new LinkedList();
		List productPageList = new LinkedList();
		List pageNameList = new LinkedList();
		List fieldList = new LinkedList();
		List fieldNameList = new LinkedList();
		
		boolean isDone = false; 
		
		productConfigMap = getProductRequirementsFromFile(productCode);
		productRequirementList = (List) productConfigMap.get("requirementList");
		
//		If user is entering a new form
		if(currentPage == null) {
			System.out.println("current page is null");
			Map targetRequirementMap = (Map)productRequirementList.get(0);
			currentRequirement = (String)targetRequirementMap.get("requirement");
			productPageList = (List)targetRequirementMap.get("pageList");
			nextPage = (String)productPageList.get(0);
		}else {
//		Check if user is going back to the previous page
			if(isBack == true){
				currentPage = prevPage;
				if(currentPage.equals("Home")) {
					returnMap.put("isHome", true);
					return returnMap;
				}
			}
			for(int i = 0 ; i < productRequirementList.size() ; i++) {
				Map targetRequirementMap = (Map)productRequirementList.get(i);
				currentRequirement = (String)targetRequirementMap.get("requirement");
				/*		Check If user's current page contains the requirement name on the current index
						If true, do another loop to find the precise position of the pageName,
							e.g: where is precisely ktp-2 located inside the list,
						   	and what is the next and previous element of the list						*/
				if(currentPage.contains(currentRequirement)) {
					productPageList = (List)targetRequirementMap.get("pageList");
					int pageListLength = productPageList.size();
					
					for(int j = 0 ; j < pageListLength ; j++) {
						//If found a match between "currentPage" and current element of "productPageList"
						//e.g: ktp-2 = ktp-2
						if(currentPage.equals(productPageList.get(j))) {
							if(j == productPageList.size()-1) {
								//Check if the current index points at last element of a "pageList"
								//and last element of "requirementList"
								if(i != productRequirementList.size()-1) {
									targetRequirementMap = (Map)productRequirementList.get(i+1);
									productPageList = (List)targetRequirementMap.get("pageList");
									nextPage = (String)productPageList.get(0);
								}else {
									isDone = true;
									return returnMap;
								}
							}else {
								nextPage = (String) productPageList.get(j+1);
								if(j>0) {
									prevPage = (String) productPageList.get(j-1);
								}else {
									prevPage = "Home";
								}
							}
//							System.out.println("Current Page: "+currentPage+", Found at: "+productCode+" > "+currentRequirement+" > index:"+j);
//							System.out.println("Next Page: " + nextPage);
//							System.out.println("Prev Page: " + prevPage);
						}
					}
					break;
				}
			}
		}
		
		pageConfigMap = getPageDetailsFromFile(currentRequirement);
		pageNameList = (List)pageConfigMap.get("page");
		int pageNameListSize = pageNameList.size();
		
		for(int i = 0 ; i < pageNameListSize ; i++) {
			Map targetPage = (Map)pageNameList.get(i);
			String targetPageName = (String) targetPage.get("pageCode");
			if(nextPage.equals(targetPageName)) {
				returnMap.put("fields", targetPage.get("fields"));
				fieldList = (List) targetPage.get("fields");
				Map targetFieldMap = new HashMap();
				for(int j = 0 ; j < fieldList.size() ; j++) {
					targetFieldMap = (Map)fieldList.get(j);
					fieldNameList.add((String)targetFieldMap.get("fieldName"));
				}
				break;
			}
		}
		
		returnMap.put("isDone", isDone);
		returnMap.put("nextPage", nextPage);
		returnMap.put("prevPage", currentPage);
		returnMap.put("fieldNameList", fieldNameList);
		return returnMap;
	}
	
	public Map getAutofillData(String email, String cif, String ktpId, List fieldList) throws UsernameNotFoundException {
		Map returnMap = new HashMap();
		Document userDoc = new Document();
		List collectedData = new LinkedList();
		String fieldName;
		
		userDoc = mq.getUser(email, cif, ktpId);
		
		if(userDoc.containsKey("collectedData")) {
			collectedData = (List)userDoc.get("collectedData");
			int lengthFieldList = fieldList.size();
			int lengthCollected = 0;
			if(!collectedData.isEmpty()) {
				lengthCollected = collectedData.size();
				for(int i = 0 ; i < lengthFieldList ; i++) {
					for(int j = 0 ; j < lengthCollected ; j++) {
						if(fieldList.get(i).equals(collectedData.get(j))) {
							fieldName = (String)fieldList.get(i);
							returnMap.put(fieldName, userDoc.get(fieldName));
							break;
						}
					}
				}
			}			
		}
		
		/*	1. Cari user dari DB pake email, extract field/column "collectedData" dari user
			2. Compare collectedData smaa fieldList, kalau salah satu index ada yang sama, ambil data dari user sesuai fieldnya.
				cth:	collectedData 	= [fullname, ktpGender]
		     			fieldList 		= [fullname, ktpGender, ktpMaritalStatus]
						[Output] = user's ktpName, user's ktpGender
					
			3. Ambil data dari userMap sesuai output No.2
			4. Put hasil ke returnMap, cth>> returnMap.put("fullname", userMap.get("fullname"));
		*/
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
			File file = new ClassPathResource("JSONConfigs/PageConfig.json").getFile();
			String content = new String(Files.readAllBytes(file.toPath()));
			data = new JSONObject(content);
		}catch (Exception e) {
			e.printStackTrace();
			log.error("getPageDetailsFromFile" + e);
		}
		
		int dataLength = data.getJSONArray("requirementList").length();
		for(int i = 0 ; i < dataLength ; i++) {
			JSONArray jsonArrayTemp = data.getJSONArray("requirementList");
			pageList.add(toMap((JSONObject)jsonArrayTemp.get(i)));
		}
		
		int pageListLength = pageList.size();
		for(int i = 0 ; i < pageListLength ; i++) {
			Map tempMap = (Map)pageList.get(i);
			String categoryCode = requirementName.substring(0,3);
			if(categoryCode.equalsIgnoreCase((String)tempMap.get("requirement"))) {
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
	
	@SneakyThrows
	@SuppressWarnings({"unchecked"})
	public static <T> T get(String fieldName, Object instance, Class<?> instanceClass) throws Exception{
	    return (T) instanceClass.getDeclaredField(fieldName).get(instance);
	}
	
}
