package com.tim7.eform.bo;

import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
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
import org.apache.commons.io.FileUtils;
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
	final String RESOURCE_PATH = "src/main/resources/KTP-Images/";
	public static Logger log = Logger.getLogger(FormDataBO.class);
	private static FormDataBO instance = null;
	MongoQuery mq = new MongoQuery();
	
	public static synchronized FormDataBO getinstance() {
		
		if(instance == null) {
			instance = new FormDataBO();
		}
		return instance;
	}
	
	public Map getRegistrationData(String email, String cif, String ktpId, String productCode, String currentPage, String prevPage, boolean isBack, boolean isFromSectionPage) {
		Map returnMap = new HashMap();
		Map nextPageMap = new HashMap();
		List fieldNameList = new LinkedList();
		Map autofillMap = new HashMap();
		
		if(!currentPage.equals("sectionPage") || currentPage == null || currentPage.equals("")) {
			nextPageMap = getNextPage(productCode,currentPage, prevPage, isBack, isFromSectionPage);
			fieldNameList = (List) nextPageMap.get("fieldNameList");
			nextPageMap.remove("fieldNameList");
			boolean isSectionPage = (boolean) nextPageMap.get("isSectionPage");
			boolean isDone = (boolean) nextPageMap.get("isDone");
			if(!isSectionPage && !isDone) {
				autofillMap = getAutofillData(email, cif, ktpId, fieldNameList);
				returnMap.put("nextPageMap", nextPageMap);
				returnMap.put("autofillMap", autofillMap);
				log.info("User ["+email+"] requested '"+nextPageMap.get("nextPage")+"' isFromSectionPage:"+isFromSectionPage);
			}else if(isSectionPage) {
				List sectionList = new LinkedList();
				sectionList = getSectionData(productCode, email, cif, ktpId);
				returnMap.put("sectionMap", sectionList);
				log.info("User ["+email+"] requested section page of '"+productCode+"' isBack:"+isBack);
			}else if(isDone) {
				//TODO: Figure out what to do when it's done
			}
		}else {
			List sectionList = new LinkedList();
			sectionList = getSectionData(productCode, email, cif, ktpId);
			returnMap.put("sectionList", sectionList);
			log.info("User ["+email+"] requested section page of '"+productCode+"' isBack:"+isBack);
		}
		return returnMap;
	}
	
	
	
	
	
	public Map getNextPage(String productCode, String currentPage, String prevPage, boolean isBack, boolean isFromSectionPage) {
		Map returnMap = new HashMap();
		String nextPage=null;
		String currentRequirement = null;
		Map productConfigMap = new HashMap();
		Map pageConfigMap = new HashMap();
	
		List productSectionList = new LinkedList();
		List sectionPageList = new LinkedList();
		List pageNameList = new LinkedList();
		List fieldList = new LinkedList();
		List fieldNameList = new LinkedList();
		
		boolean isSectionPage = false;
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
		}else if(isBack && prevPage.equals("sectionPage")) {
			isSectionPage = true;
		}else {
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
							if(isBack) {
								if(j > 0) {
									nextPage = (String) sectionPageList.get(j-1);
									if(j > 1)prevPage = (String) sectionPageList.get(j-2);
									else prevPage = "sectionPage";
								}else {
									nextPage = "sectionPage";
								}
							}else if(isFromSectionPage) {
								nextPage = (String) sectionPageList.get(j);
								prevPage = "sectionPage";
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
									break;
								}
							}else {
								nextPage = (String) sectionPageList.get(j+1);
								if(j>0) {
									prevPage = (String) sectionPageList.get(j-1);
								}else {
									prevPage = "sectionPage";
								}
							}
							break;
						}
					}
				}
			}
		}
		//FieldName List
		if(currentPage.equals("ktp-1") && !isFromSectionPage) {
			nextPage = "sectionPage";
			prevPage = "ktp-1";
			isSectionPage = true;
			returnMap.put("isSectionPage", isSectionPage);
		}else if(!isDone || !isSectionPage){
			pageConfigMap = getPageDetailsFromFile(currentRequirement);
			pageNameList = (List)pageConfigMap.get("page");
			int pageNameListSize = pageNameList.size();
			//Loop through fieldList of target page on PageConfig
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
		
		//check if isSectionPage (user is in the product sections page)
		
		if(isFromSectionPage) {
			returnMap.put("prevPage", "sectionPage");
		}else returnMap.put("prevPage", currentPage);
		
		if(!isSectionPage) {
			returnMap.put("nextPage", nextPage);
			returnMap.put("fieldNameList", fieldNameList);			
		}

		returnMap.put("isSectionPage", isSectionPage);
		returnMap.put("isDone", isDone);
		return returnMap;
	}
	
	
	
	
	
	//Call this first when user clicked on one of the product button
	//This function should also be called somewhere in the getNextPage()
	public List getSectionData(String productCode, String email, String cif, String ktpId) {

		Map productConfigMap = new HashMap();
		Map pageConfigMap = new HashMap();
		List returnSectionList = new LinkedList();
		List collectedData = new LinkedList();
		List sectionList = new LinkedList();
		List pageList = new LinkedList();

		String prevStatus = null;
		
//		Fetch all collected data from the user into a List
		Document userDoc = mq.getUser(email, cif, ktpId);
		collectedData = (List)userDoc.get("collectedData");
	
//		Map the JSON Product Config into productConfigMap
//		and get section list from Map
		productConfigMap = getProductRequirementsFromFile(productCode);
		sectionList = (List)productConfigMap.get("sectionList");
		
		
		//CASE 1: User have filled some form
//		Outer Loop #0 	-> search the sectionList to find all section belonging to the productCode
//		Inner Loop #1 	-> search the pageList to find matching pages that belongs to the current outer loop 'section'
//		Inner Loop #2 	-> search the fieldList of current Page and match it with collectedData
//		IF	::	-> Found SOME matches	, THEN mark the section as	"In Progress"
//				-> NO matches			, THEN						"Not yet filled"
//				-> ALL matches			, THEN						"Completed"
//		
			//	#0
			int sectionListLength = sectionList.size();
			for(int i = 0 ; i < sectionListLength ; i++) {
				Map currentSectionMap = (Map)sectionList.get(i);
				Map sectionMapPayload = currentSectionMap;
				List currentSectionPageList = (List) currentSectionMap.get("pageList");
				String currentRequirement = (String) currentSectionMap.get("requirement");
				boolean hasOneFilled = false;
				boolean hasOneUnfilled = false;
				boolean allPageFilled = true;
				boolean allPageUnfilled = true;
				boolean sectionInProgress = false;
				
				pageConfigMap = getPageDetailsFromFile(currentRequirement);
				pageList = (List)pageConfigMap.get("page");
				
				//	#1
				int sectionPageListLength = currentSectionPageList.size();
				for(int j = 0 ; j < sectionPageListLength ; j++) {
					String currentSectionPageCode = (String)currentSectionPageList.get(i);
					String checkStatus = null;
					
					// #1.1
					int pageListLength = pageList.size();
					for(int k = 0 ; k < pageListLength ; k++) {
						Map currentPageMap = (Map)pageList.get(k);
						String currentPageConfigCode = (String) currentPageMap.get("pageCode");
						if(currentSectionPageCode.equals(currentPageConfigCode)) {
							checkStatus = checkIfFilled((List)currentPageMap.get("fields"), collectedData);
							break;
						}
						
					}
					
					//Section boolean IFs
					if(checkStatus.equals("COMPLETED")) {
						hasOneFilled = true;
						allPageUnfilled = false;
					}else if(checkStatus.equals("NOT FILLED")) {
						hasOneUnfilled = true;
						allPageFilled = false;
					}else if(checkStatus.equals("IN PROGRESS") || (hasOneFilled && hasOneUnfilled)){
						sectionInProgress = true;
					}
				}
				
				//Check if all page in the section is not yet filled
				if(allPageUnfilled) {
					sectionMapPayload.put("sectionStatus", "INCOMPLETE");
					//Check if it's the first section of the product or the section before is already COMPLETE
					if(prevStatus == null || prevStatus.equals("COMPLETE")) {
						sectionMapPayload.put("disabled", false);
					}
					else {
						sectionMapPayload.put("disabled", true);
					}
					prevStatus = "INCOMPLETE";
				}
				//Check if all page in the section is filled
				else if(allPageFilled){
					sectionMapPayload.put("sectionStatus", "COMPLETE");
					sectionMapPayload.put("disabled", false);
					prevStatus = "COMPLETE";
				}
				//Check if SOME page in the section is filled
				else if(sectionInProgress) {
					sectionMapPayload.put("sectionStatus", "IN PROGRESS");
					sectionMapPayload.put("disabled", false);
					prevStatus = "IN PROGRESS";
				}
				returnSectionList.add(sectionMapPayload);
			}
		return returnSectionList; 
	}
	
//		This function determines the state of CURRENT PAGE & is a complementary function for getSectionData()
//	 	RETURNS:		COMPLETED		IF ->	ALL fields in this page have been filled
//						NOT FILLED		IF ->	ALL fields in this page have not been filled
//						IN PROGRESS		IF ->	SOME fields in this page are filled
	public String checkIfFilled(List fieldList, List collectedData) {
		String checkStatus = "COMPLETED";
		int fieldListLength = fieldList.size();
		boolean hasOneFilled = false;
		boolean hasOneUnfilled = false;
		boolean allFilled = true;
		boolean allUnfilled = true;
		
		// #2
		if(collectedData != null) {
			for(int i = 0 ; i < fieldListLength ; i++) {
				Map currentFieldMap = (Map)fieldList.get(i);
				String currentFieldName = (String)currentFieldMap.get("fieldName");
				String currentFieldFlag = "NOT FILLED";
				
				// #2.1
				int collectedDataLength = collectedData.size();
				for(int j = 0 ; j < collectedDataLength ; j++) {
					if(currentFieldName.equals(collectedData.get(j))) {
						currentFieldFlag = "FILLED";
						hasOneFilled = true;
						allUnfilled = false;
						collectedData.remove(j);
						break;
					}
				}
				if(currentFieldFlag.equals("NOT FILLED")) {
					hasOneUnfilled = true;
					allFilled = false;
				}
			}
		}else {
			allUnfilled = true;
		}
		
		if(allFilled) {
			checkStatus = "COMPLETED";
		}else if(allUnfilled) {
			checkStatus = "NOT FILLED";
		}else if(hasOneFilled && hasOneUnfilled) {
			checkStatus = "IN PROGRESS";
		}
		
		return checkStatus;
	}
	
	
	
	
	
//	This function controls submit logic
	public String submitRegistrationData(String email, String cif, String ktpId, Map inputData, Map autofillData) {
		
		if(autofillData == null) {
			List inputDataKey = new LinkedList(inputData.keySet());
			MongoQuery mq = new MongoQuery();
			
			if(mq.existsByEmail(email)) {
				Document userDoc = mq.getUser(email, cif, ktpId);
				
				Map formData = new HashMap();
				List collectedData = new LinkedList();
				
				formData = (Map)userDoc.get("formData");
				collectedData = (List)userDoc.get("collectedData");
				
				Set updatedCollectedData = new HashSet();
				if(collectedData != null) {
					updatedCollectedData = new HashSet(collectedData);
				}

//				INPUT TO USERDOC LOOP
//				
				int length = inputDataKey.size();
				for(int i = 0 ; i < length ; i++) {
					String currentInputKey = (String)inputDataKey.get(i);
					//Check if the input is ktpPhoto
					if(currentInputKey.equals("ktpPhoto")) {
						String imagePath = storeBase64KtpPhoto((String)inputData.get(currentInputKey), email, cif);
						formData.put(currentInputKey, imagePath);
					}else {
						formData.put(currentInputKey, inputData.get(currentInputKey));
					}
					updatedCollectedData.add(currentInputKey);
				}
				userDoc.append("formData", formData);
				userDoc.append("collectedData", updatedCollectedData);
				
				mq.updateUser(email, cif, ktpId, userDoc);
				return "OK";
			}
		}else if(!autofillData.isEmpty() && autofillData != null)){

			//Key set of current page's inputData & autofillData Map
			List inputDataKey = new LinkedList(inputData.keySet());
			List autofillKey = new LinkedList(autofillData.keySet());
			
			//Value set of current page's inputData & autofillData Map
			List inputDataValue = new LinkedList(inputData.values());
			List autofillValue = new LinkedList(autofillData.values());
			
			// Check If user input is different from the autofill data, 
			// then submit the user input else skip the loop
			if(!inputDataKey.equals(autofillKey) || !inputDataValue.equals(autofillValue)) {
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
	
	//				INPUT TO USERDOC LOOP
	//				
					int length = inputDataKey.size();
					for(int i = 0 ; i < length ; i++) {
						String currentInputKey = (String)inputDataKey.get(i);
						//Check if the input is ktpPhoto
						if(currentInputKey.equals("ktpPhoto")) {
							String imagePath = storeBase64KtpPhoto((String)inputData.get("currentInputKey"), email, cif);
							formData.put(currentInputKey, imagePath);
						}else {
							formData.put(currentInputKey, inputData.get(currentInputKey));
						}
						updatedCollectedData.add(currentInputKey);
					}
					userDoc.append("formData", formData);
					userDoc.append("collectedData", updatedCollectedData);
					
					mq.updateUser(email, cif, ktpId, userDoc);
					return "OK";
				}
			}else if(inputDataKey.equals(autofillKey) && inputDataValue.equals(autofillValue)) {
				System.out.println("Input is same as autofill data");
				return "No changes";
			}
		}
		return null;
	}
	
	
	
	
	
	//TODO: Add function to getImage, get path from user's document then encode image to base64
//	This function decodes the base64 image string of ktpPhoto into bytes 
//	then stores it into a binary(image) file.
	public String storeBase64KtpPhoto(String base64String, String email, String cif) {
		
		String[] strings = base64String.split(",");
		String extension;
		switch(strings[0]) {
		case "data:image/jpeg;base64":
			extension = "jpeg";
			break;
		case "data:image/png;base64":
			extension = "png";
			break;
		case "data:image/jpg;base64":
			extension = "jpg";
			break;
		default:
			extension = "jpg";
			break;
		}
		
		//Convert base64 string to binary data and then store it in src/main/resource/KTP-Images
		//Name the image like: CIF_EMAIL.EXTENSION
		
		byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
		String path = RESOURCE_PATH + cif + "_" + email + "." + extension;
		
		//Get the image's target file path
		File file = new File(path);
		
		//Creates the file & writes the image bytes into the file
		//If no exception then returns the image path in the file system
		try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))){
			outputStream.write(data);
			return path;
		} catch (IOException e) {
			e.printStackTrace();
			return "No Path..";
		}
	}
	
	
	public String getImageString(String filePath) {
		System.out.println("ran getImageString");
		byte[] fileContent;
		try {
			fileContent = FileUtils.readFileToByteArray(new File(filePath));
			String encodedString = Base64.getEncoder().encodeToString(fileContent);
			return encodedString;
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		
		return "Image not Found";
	}
	
	
	
	
	
//	This function fetches the already collected data
//	of the current page's fields and returns it as a Map(fieldName, value);
	public Map getAutofillData(String email, String cif, String ktpId, List fieldList) throws UsernameNotFoundException {
		Map returnMap = new HashMap();
		Map formData = new HashMap();
		Document userDoc = new Document();
		List collectedData = new LinkedList();
		String fieldName, collectedDataName;
		
		userDoc = mq.getUser(email, cif, ktpId);
		formData = (Map)userDoc.get("formData");

		if(userDoc.containsKey("collectedData") && fieldList.size() != 0) {
			collectedData = (List)userDoc.get("collectedData");
			int lengthFieldList = fieldList.size();
			int lengthCollected = 0;
			if(!collectedData.isEmpty()) {
				lengthCollected = collectedData.size();
				for(int i = 0 ; i < lengthFieldList ; i++) {
					fieldName = (String)fieldList.get(i);
					for(int j = 0 ; j < lengthCollected ; j++) {
						collectedDataName = (String) collectedData.get(j);
						//checks if the current field name matches current collectedData name
						if(fieldName.equals(collectedDataName)) {
							//checks if the current field is ktpPhoto
							if(fieldName.equals("ktpPhoto")) {
								returnMap.put(fieldName, getImageString((String)formData.get(fieldName)));
								break;
							}else {								
								returnMap.put(fieldName, formData.get(fieldName));
								break;
							}
						}
					}
				}
			}			
		}			
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
	
	
	
	
//	toMap() and toList() function are 
//	complementary function for: getProductRequirementFromFile()
//	& getPageDetailsFromFile()
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
