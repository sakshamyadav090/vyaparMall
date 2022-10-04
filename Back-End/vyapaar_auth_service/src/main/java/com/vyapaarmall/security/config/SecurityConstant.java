package com.vyapaarmall.security.config;

public class SecurityConstant {
	
	public static final String SECRET = "secret";
	public static final long TOKEN_EXPIRE_TIME = 24*60*60*1000; //24 h
	public static final String HEADER_STRING = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String LOGIN_URL = "/login";
	public static final String REGISTER_URL = "/auth/register";
	public static final String TOKEN_VERIFY_URL = "/auth/verify-token";
	
}
