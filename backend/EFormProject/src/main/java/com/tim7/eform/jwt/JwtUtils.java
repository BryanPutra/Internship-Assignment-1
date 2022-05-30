package com.tim7.eform.jwt;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.web.util.WebUtils;

import com.tim7.eform.service.UserDetails;

public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	@Value("${tim7.app.jwtSecret}")
	private String jwtSecret;
	@Value("${tim7.app.jwtExpirationMs}")
	private String jwtExpirationMs;
	@Value("${tim7.app.jwtCookieName}")
	private String jwtCookie;
	
	public String getJwtFromCookies(HttpServletRequest request) {
		Cookie cookie = WebUtils.getCookie(request, jwtCookie);
		if(cookie != null) {
			return cookie.getValue();
		}
		return null;
	}
	
	public ResponseCookie generateJwtCookie(UserDetails userPrincipal) {
		String jwt = generateTokenFromUsername(userPrincipal.getUsername());
		ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/api")
				.maxAge(24 * 60 * 60).httpOnly(true).build();
		return cookie;
	}
	
	
}
