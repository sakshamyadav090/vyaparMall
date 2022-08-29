package com.vyapaarmall.security.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private AuthenticationManager authenticationManager;
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
		
		return authenticationManager.authenticate(authToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		User user = (User) authResult.getPrincipal();
		Algorithm algo = Algorithm.HMAC256(SecurityConstant.SECRET.getBytes());
		
		String access_token = JWT.create()
				.withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis()+ SecurityConstant.TOKEN_EXPIRE_TIME))
				.withIssuer(request.getRequestURL().toString())
				.withIssuedAt(new Date())
				.withClaim(SPRING_SECURITY_FORM_USERNAME_KEY, new ArrayList<>())
				.sign(algo);
		
//		String refresh_token = JWT.create()
//				.withSubject(user.getUsername())
//				.withExpiresAt(new Date(System.currentTimeMillis()+ 10*60*1000))
//				.withIssuer(request.getRequestURL().toString())
//				.sign(algo);
		
		Map<String, String> res = new HashMap<>();
		res.put("access_token", access_token);
		res.put("usernameId", user.getUsername().split(":")[0]);
		res.put("email/mobileNo", user.getUsername().split(":")[1]);
		response.setContentType("application/json");
		new ObjectMapper().writeValue(response.getOutputStream(), res);
		
	}
	
	
}
