package com.tim7.eform;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.tim7.eform.model.Customer;
import com.tim7.eform.service.SequenceGeneratorService;

@SpringBootApplication
public class EFormProjectApplication implements CommandLineRunner{

	@Autowired
	private CustomerRepository customerRepository;
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
		
		Customer c1 = new Customer((long)1,"270134", 
	    		"Bambang Aja",
	    		"Susi Aja",
	    		"Male",
	    		dob,
	    		"bambangaja@gmail.com",
	    		createdDate
	    		);
		//sequence.getNextSequence(Customer.SEQUENCE_NAME)
		Customer c2 = new Customer((long)2,"270135", 
	    		"Budi Aja",
	    		"Susanti Aja",
	    		"Male",
	    		dob,
	    		"budiajah@gmail.com",
	    		createdDate
	    		);
		
		customerRepository.save(c1);
		customerRepository.save(c2);
		
		System.out.println("************");
		
		List<Customer> customers = customerRepository.findAll();
		
		for(Customer c : customers) {
			System.out.println(c.toString());
		}
	}

}
