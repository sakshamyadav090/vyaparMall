package com.twecom.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Faq {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int faqId;
	private String question;
	private String answer;
	private boolean isDeleted=false;
	private ApprovalStatus status=ApprovalStatus.PENDING;
	private int productId;
	

}
