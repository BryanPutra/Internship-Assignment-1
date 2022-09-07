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
	      		  .allowedOrigins("https://aee1-45-64-100-55.ap.ngrok.io","https://0583-36-80-83-181.ap.ngrok.io")
	      		  .allowedOriginPatterns("https://aee1-45-64-100-55.ap.ngrok.io")
	      		  .allowedHeaders("Origin", "Authorization", "Accept", "Content-Type")
	              .allowedMethods("POST", "GET", "OPTIONS", "PUT", "DELETE")
	              .allowCredentials(true)
	              .exposedHeaders("Authorization")
	              .maxAge(3600);
	  }
	
}
