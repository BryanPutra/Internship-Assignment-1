package com.tim7.eform.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
	@Id
	private String id;
	private String productCode;
	private Set<String> dataRequirements = new HashSet<>();
	
	public Product(String productCode) {
		super();
		this.productCode = productCode;
	}
	
	
}
