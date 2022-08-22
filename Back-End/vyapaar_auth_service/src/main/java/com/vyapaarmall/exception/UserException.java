package com.vyapaarmall.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class UserException extends RuntimeException {
	
	private static final long serialVersionUID = -803916216716102426L;

	public UserException(String msg) {
		super(msg);
	}

}
