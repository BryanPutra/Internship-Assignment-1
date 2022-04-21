package com.tim7.eform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.tim7.eform.model.Customer;

@SpringBootApplication
public class EFormProjectApplication implements CommandLineRunner{

	@Autowired
	private CustomerRepository customerRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(EFormProjectApplication.class, args);
	}

	public void run(String... args) throws Exception {
		Customer c1 = new Customer("1", "Bambang","Munoye");
		Customer c2 = new Customer("2", "Ilham","Sugih");
		Customer c3 = new Customer("3", "Budi","Yanto");
		Customer c4 = new Customer("4", "Andi","M");
		
		customerRepository.save(c1);
		customerRepository.save(c2);
		customerRepository.save(c3);
		customerRepository.save(c4);
	}

}
