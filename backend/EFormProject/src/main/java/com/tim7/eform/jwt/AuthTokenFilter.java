package com.tim7.eform.jwt;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.tim7.eform.repository.UserRepository;
import com.tim7.eform.service.UserDetailsServiceImplements;
@ComponentScan({"com.tim7.eform.jwt"})
public class AuthTokenFilter extends OncePerRequestFilter{
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserDetailsServiceImplements userDetailsServiceImplements;
	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String jwt = parseJwt(request);
			if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
				String email = jwtUtils.getEmailFromJwtToken(jwt);
				UserDetails userDetails = userDetailsServiceImplements.loadUserByUsername(email);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, 
						null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}catch (Exception e) {
			logger.error("Cannot set user authentication: {}",e);
		}
		filterChain.doFilter(request, response);
		
	}
	
	private String parseJwt(HttpServletRequest request) {
		String jwt = jwtUtils.getJwtFromHeaders(request);
		return jwt;
	}
	
}
