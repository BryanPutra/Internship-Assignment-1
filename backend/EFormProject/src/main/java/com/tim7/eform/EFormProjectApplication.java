package com.tim7.eform;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tim7.eform.bo.FormDataBO;
import com.tim7.eform.model.EnumRole;
import com.tim7.eform.model.Role;
import com.tim7.eform.model.User;
import com.tim7.eform.repository.RoleRepository;
import com.tim7.eform.repository.UserRepository;
import com.tim7.eform.config.MongoConfig;

@SpringBootApplication
public class EFormProjectApplication implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	
	public static void main(String[] args) {
		SpringApplication.run(EFormProjectApplication.class, args);
	}

	public void run(String... args) throws Exception {
		
		//User Fetch
		String email = "bambangaja@gmail.com";
		User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with Email: "+email));
		System.out.println(user.getClass());
		
		//FormDataBO.getinstance().getAutofillData(null,null,null);
		
		//getRegistrationData(id, productCode, currentPage, previousPage, isBack)
		//System.out.println(FormDataBO.getinstance().getRegistrationData(null, "savings", null, null, null));
		//System.out.println(FormDataBO.getinstance().getRegistrationData(null, "savings", "ktp-1", "Home",false));
		//System.out.println(FormDataBO.getinstance().getProductRequirementsFromFile("savings"));
		//System.out.println();
		System.out.println(FormDataBO.getinstance().getRegistrationData(null,"savings","ktp-1","Home", false));
		
	}
	
	//[!] Do not run unless dummy data is changed
	public void populateDummyData() throws ParseException {
//		SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd-MM-yyyy");
//		SimpleDateFormat fullDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
//		
//		Date dob = dateFormat1.parse((String)"06-02-2002");
//		Date currentDate = new Date();
//		
//		Date createdDate = new Date();
//		String createdDateStr = fullDateFormat.format(createdDate);
//		createdDate = fullDateFormat.parse(createdDateStr);
		
		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		
		User c1 = new User(
	    		"BambangAja",
	    		"bambangaja@gmail.com",
	    		encoder.encode("12345")
	    		);
		
		User c2 = new User(
	    		"BudiAja",
	    		"budiajah@gmail.com",
	    		encoder.encode("12345")
	    		);

		c1.setRoles(roles);
		c2.setRoles(roles);
		
		userRepository.save(c1);
		userRepository.save(c2);
	}
	
	//display all user
	public void viewUser() {
		List<User> users = userRepository.findAll();
		for(User c : users) {
			System.out.println(c.toString());
		}
	}
}
