package com.tim7.eform;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tim7.eform.model.User;
import com.tim7.eform.repository.UserRepository;
import com.tim7.eform.service.SequenceGeneratorService;

@SpringBootApplication
public class EFormProjectApplication implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	private SequenceGeneratorService sequence;
	
	public static void main(String[] args) {
		SpringApplication.run(EFormProjectApplication.class, args);
	}

	public void run(String... args) throws Exception {
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat fullDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		
		Date dob = dateFormat1.parse((String)"06-02-2002");
		Date currentDate = new Date();
		
		Date createdDate = new Date();
		String createdDateStr = fullDateFormat.format(createdDate);
		createdDate = fullDateFormat.parse(createdDateStr);
		
		User c1 = new User((long)1,"270134", 
	    		"Bambang Aja",
	    		"Susi Aja",
	    		"Male",
	    		dob,
	    		"BambangAja",
	    		"bambangaja@gmail.com",
	    		encoder.encode("12345"),
	    		createdDate
	    		);
		//sequence.getNextSequence(Customer.SEQUENCE_NAME)
		User c2 = new User((long)2,"270135", 
	    		"Budi Aja",
	    		"Susanti Aja",
	    		"Male",
	    		dob,
	    		"BudiAja",
	    		"budiajah@gmail.com",
	    		encoder.encode("12345"),
	    		createdDate
	    		);

		userRepository.save(c1);
		userRepository.save(c2);
		
		
		
		System.out.println("************");
		
		List<User> users = userRepository.findAll();
		
		for(User c : users) {
			System.out.println(c.toString());
		}
	}

}
