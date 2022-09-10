package com.vyapaarmall.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class LoginCredentials {
	
	private String userName;
	private String password;	
	
}
