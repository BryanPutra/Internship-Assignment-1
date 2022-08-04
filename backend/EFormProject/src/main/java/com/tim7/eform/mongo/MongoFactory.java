package com.tim7.eform.mongo;

import org.apache.log4j.Logger;

import com.mongodb.Mongo;
import com.mongodb.MongoException;

@SuppressWarnings("deprecation")
public class MongoFactory {
	private static Logger log = Logger.getLogger(MongoFactory.class);
	
	private static Mongo mongo;
	
	private MongoFactory() {
		
	}
	
	//return mongo instance
	public static Mongo getMongo() {
		int port_no = 27017;
		String hostname = "localhost";
		if(mongo == null) {
			try {
				mongo = new Mongo(hostname, port_no);
			} catch (MongoException ex) {
				log.error(ex);
			}
		}
//		DB mongodb = mongo.getDB("eform_project");
		return mongo;
	}
	
}
