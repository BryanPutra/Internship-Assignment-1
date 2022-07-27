package com.tim7.eform.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer{
	
	  @Override
	  public void addCorsMappings(CorsRegistry registry) {
	      registry.addMapping("/**")
	      		  .allowedOrigins("https://b776-180-241-243-138.ap.ngrok.io","http://localhost:8080","http://localhost:3000","https://4ff1-140-213-5-80.ap.ngrok.io")
	      		  .allowedOriginPatterns("https://4ff1-140-213-5-80.ap.ngrok.io")
	      		  .allowedHeaders("Origin", "Authorization", "Accept", "Content-Type")
	              .allowedMethods("POST", "GET", "OPTIONS", "PUT", "DELETE")
	              .allowCredentials(true)
	              .exposedHeaders("Authorization")
	              .maxAge(3600);
	  }
	
}
