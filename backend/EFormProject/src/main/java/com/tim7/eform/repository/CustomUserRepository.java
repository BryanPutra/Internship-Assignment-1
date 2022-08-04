package com.tim7.eform.repository;

import org.bson.Document;

import com.tim7.eform.model.User;

public interface CustomUserRepository {
	Document findUser(String email);
	void insertTest();
}
