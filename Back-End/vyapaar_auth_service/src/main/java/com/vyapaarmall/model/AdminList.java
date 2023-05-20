package com.vyapaarmall.model;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AdminList {
	
	private int userId;
	private String name; 
	private String email;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date createdDate;
	
	public AdminList List(User u){
		this.userId=u.getId();
		this.name=u.getFirstName() +' '+ u.getLastName();
		this.email=u.getEmail();
		this.createdDate=u.getCreatedDate();
		
		return this;
		
	}

}
