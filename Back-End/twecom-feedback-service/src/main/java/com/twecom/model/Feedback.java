package com.twecom.model;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedbacks")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int userId;
	private String title;
	private String description;
	private int ratings;
	private int productId;
	@Lob
	private String images;
	private boolean isApproved=false;
	
	private Date createdDate=new Date();
	private Date modifiedDate=new Date();
	
	

}
