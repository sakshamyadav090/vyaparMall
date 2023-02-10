package com.vyapaarmall.security.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter{

	public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		if(request.getServletPath().equals(SecurityConstant.LOGIN_URL) || request.getServletPath().equals(SecurityConstant.REGISTER_URL) 
				|| request.getServletPath().equals(SecurityConstant.TOKEN_VERIFY_URL) 
				|| request.getServletPath().equals(SecurityConstant.UPDATE_PASSWORD_URL)) {
			chain.doFilter(request, response);
		} else {
			String header = request.getHeader(SecurityConstant.HEADER_STRING);
			if(header != null && header.startsWith(SecurityConstant.TOKEN_PREFIX)) {
				try {
					
					String token = header.substring(SecurityConstant.TOKEN_PREFIX.length()); 
					Algorithm algo = Algorithm.HMAC256(SecurityConstant.SECRET.getBytes());
					JWTVerifier verifier = JWT.require(algo).build();
					DecodedJWT decodedJWT = verifier.verify(token);
					String username = decodedJWT.getSubject();
					
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
					SecurityContextHolder.getContext().setAuthentication(authToken);
					chain.doFilter(request, response);
					
				}catch(Exception e) {
					response.setHeader("error", "Forbidden");
					response.setStatus(403);
					Map<String, Object> error = new HashMap<>();
					error.put("error", "Forbidden");
					error.put("status", 403);
					response.setContentType("application/json");
					new ObjectMapper().writeValue(response.getOutputStream(), error);
				}
			}
		}
	}
	
	

}
