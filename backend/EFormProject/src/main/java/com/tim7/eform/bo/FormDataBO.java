package com.tim7.eform.bo;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.bson.Document;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.tim7.eform.mongo.MongoQuery;
import com.tim7.eform.repository.UserRepository;

import lombok.SneakyThrows;

public class FormDataBO{
	
	@Autowired
	private UserRepository userRepository;
	
	public static Logger log = Logger.getLogger(FormDataBO.class);
	
	private static FormDataBO instance = null;
	
	MongoQuery mq = new MongoQuery();
	
	public static synchronized FormDataBO getinstance() {
		
		if(instance == null) {
			instance = new FormDataBO();
		}
		return instance;
	}
	
	public Map getRegistrationData(String email, String cif, String ktpId, String productCode, String currentPage, String prevPage, boolean isBack, boolean isFromHome) {
		Map returnMap = new HashMap();
		Map nextPageMap = new HashMap();
		List fieldNameList = new LinkedList();
		Map autofillMap = new HashMap();
		Boolean isHome = false;
		
		nextPageMap = getNextPage(productCode,currentPage,prevPage,isBack, isFromHome);
		fieldNameList = (List) nextPageMap.get("fieldNameList");
		nextPageMap.remove("fieldNameList");
		isHome = (Boolean) nextPageMap.get("isHome");
		
		if(!isHome && isHome != null) {
			autofillMap = getAutofillData(email, cif, ktpId, fieldNameList);			
			returnMap.put("autofillMap", autofillMap);
		}
		
		returnMap.put("nextPageMap", nextPageMap);
		
		log.info("User ["+email+"] requested '"+nextPageMap.get("nextPage")+"' isFromHome:"+isFromHome);
		
		return returnMap;
	}
	
	public Map getNextPage(String productCode, String currentPage, String prevPage, boolean isBack, boolean isFromHome) {
		Map returnMap = new HashMap();
		String nextPage=null;
		String currentRequirement = null;
		Map productConfigMap = new HashMap();
		Map pageConfigMap = new HashMap();
		Map currentSectionMap = new HashMap();
	
		List productSectionList = new LinkedList();
		List sectionPageList = new LinkedList();
		List pageNameList = new LinkedList();
		List fieldList = new LinkedList();
		List fieldNameList = new LinkedList();
		
		boolean isHome = false;
		boolean isDone = false; 
		
		productConfigMap = getProductRequirementsFromFile(productCode);
		productSectionList = (List) productConfigMap.get("sectionList");
		
//		If user is entering a new form
		if(currentPage == null) {
			System.out.println("current page is null");
			Map targetRequirementMap = (Map)productSectionList.get(0);
			currentRequirement = (String)targetRequirementMap.get("requirement");
			productSectionList = (List)targetRequirementMap.get("pageList");
			nextPage = (String)productSectionList.get(0);
		}else {
			//TODO : Check when user is going back
			Map targetSectionMap = new HashMap();
			for(int i = 0 ; i < productSectionList.size() ; i++) {
				targetSectionMap = (Map)productSectionList.get(i);
				currentRequirement = (String)targetSectionMap.get("requirement");
				/*		Check If user's current page contains the requirement name on the current index
						If true, do another loop to find the precise position of the pageName,
							e.g: where is precisely ktp-2 located inside the list,
						   	and what is the next and previous element of the list						*/
				if(currentPage.contains(currentRequirement)) {
					sectionPageList = (List)targetSectionMap.get("pageList");
					int pageListLength = sectionPageList.size();
					
					for(int j = 0 ; j < pageListLength ; j++) {
						//If found a match between "currentPage" and current element of "sectionPageList"
						//e.g: ktp-2 = ktp-2
						if(currentPage.equals(sectionPageList.get(j))) {
							currentSectionMap = targetSectionMap;
							if(isBack) {
								if(j > 0) {
									nextPage = (String) sectionPageList.get(j-1);
									if(j > 1)prevPage = (String) sectionPageList.get(j-2);
									else prevPage = "home";
								}else {
									nextPage = "home";
								}
							}else if(isFromHome) {
								nextPage = (String) sectionPageList.get(j);
								prevPage = "home";
								break;
							}else if(j == sectionPageList.size()-1) {
								//Check if the current index points at last element of a "pageList"
								//and last element of "SectionList"
								if(i != productSectionList.size()-1) {
									targetSectionMap = (Map)productSectionList.get(i+1);
									sectionPageList = (List)targetSectionMap.get("pageList");
									nextPage = (String)sectionPageList.get(0);
								}else {
									isDone = true;
									return returnMap;
								}
							}else {
								nextPage = (String) sectionPageList.get(j+1);
								if(j>0) {
									prevPage = (String) sectionPageList.get(j-1);
								}else {
									prevPage = "home";
								}
							}
							break;
						}
					}
				}
			}
		}
		//FieldName List
		if(currentPage.equals("ktp-1") && !isFromHome) {
			nextPage = "home";
			prevPage = "ktp-1";
			isHome = true;
			returnMap.put("isHome", isHome);
		}else {
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
		}
		
		if(isFromHome) {
			returnMap.put("prevPage", "home");
		}else returnMap.put("prevPage", currentPage);

		returnMap.put("isHome", isHome);
		returnMap.put("isDone", isDone);
		returnMap.put("nextPage", nextPage);
		returnMap.put("fieldNameList", fieldNameList);
		returnMap.put("sectionPageMap", currentSectionMap);
		return returnMap;
	}
	
	//Call this first when user clicked on one of the product button
	public Map getSectionData() {
		Map returnMap = new HashMap();
		
		
		
		return returnMap; 
	}
	
	public Map getPageFromSection(String productCode) {
		Map returnMap = new HashMap();
		Map productConfigMap = new HashMap();
		List productSectionList = new LinkedList();
		
		
		productConfigMap = getProductRequirementsFromFile(productCode);
		productSectionList = (List) productConfigMap.get("sectionList");
		
		return returnMap;
	}
	
	public String submitRegistrationData(String email, String cif, String ktpId, Map inputData, Map autofillData) {
		
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
				
				Map formData = new HashMap();
				Map additionalData = new HashMap();
				List collectedData = new LinkedList();
				
				formData = (Map)userDoc.get("formData");
				additionalData = (Map)userDoc.get("additionalData");
				
				collectedData = (List)additionalData.get("collectedData");
				
				Set updatedCollectedData = new HashSet();
				if(additionalData.containsKey("collectedData")) {
					updatedCollectedData = new HashSet(collectedData);
				}

				int length = inputDataKey.size();
				for(int i = 0 ; i < length ; i++) {
					String currentInputKey = (String)inputDataKey.get(i);
					formData.put(currentInputKey, inputData.get(currentInputKey));
					updatedCollectedData.add(currentInputKey);
				}
				userDoc.append("collectedData", updatedCollectedData);
				
				//TODO: check if the section is fully completed or partially completed
				
				mq.updateUser(email, cif, ktpId, userDoc);
				return "OK";
			}
		}else if(inputDataKey.equals(autofillKey) && inputDataValue.equals(autofillValue)) {
			System.out.println("Input is same as autofill data");
			return "No changes";
		}
		
		return null;
	}
	
	public Map getAutofillData(String email, String cif, String ktpId, List fieldList) throws UsernameNotFoundException {
		Map returnMap = new HashMap();
		Document userDoc = new Document();
		List collectedData = new LinkedList();
		String fieldName;
		
		userDoc = mq.getUser(email, cif, ktpId);
		
		if(userDoc.containsKey("collectedData") && fieldList.size() != 0) {
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
