package com.tim7.eform.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.tim7.eform.model.DatabaseSequence;

@Service
public class SequenceGeneratorService {
	
	@Autowired
	private MongoOperations operations;
	
	public long getNextSequence(final String sequenceName) {
		final Query q = new Query(Criteria.where("id").is(sequenceName));
		final Update u = new Update().inc("sequence", 1);
		
		final DatabaseSequence counter = operations.findAndModify(q, u,
				FindAndModifyOptions.options().returnNew(true).upsert(true),DatabaseSequence.class);
		
		return !Objects.isNull(counter) ? counter.getSeq() : 1;
		
		
	}

}
