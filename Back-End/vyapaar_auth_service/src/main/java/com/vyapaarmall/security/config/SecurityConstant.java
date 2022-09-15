package com.vyapaarmall.security.config;

public class SecurityConstant {
	
	public static final String SECRET = "secret";
	public static final long TOKEN_EXPIRE_TIME = 10*10*60*1000; //100 MINUTES
	public static final String HEADER_STRING = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String LOGIN_URL = "/login";
	public static final String REGISTER_URL = "/auth/register";
	public static final String TOKEN_VERIFY_URL = "/auth/verify-token/**";
}
