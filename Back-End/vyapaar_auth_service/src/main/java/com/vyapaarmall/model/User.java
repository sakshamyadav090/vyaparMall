package com.vyapaarmall.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VM_USER_MST")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userId;
	private boolean isActive = true;	
	private String firstName;
	private String lastName;
	@Column(unique = true)
	private String mobileNumber;
	@Column(unique = true)
	private String email;
	private String firmName;
	private String natureOfBuisness;
	@Column(unique = true)
	private String gst;
	@Column(unique = true)
	private String aadhaarNumber;
	@Column(unique = true)
	private String panNumber;
	private String password;
	private String city;
	private String pincode;
	private String createdBy;
	private String modifiedBy;
	private Date createdDate = new Date();
	private Date modifiedDate = new Date();
	
	@ManyToOne
	@JoinColumn(name = "roleId")
	private Role role;	
	private String Images;
	private String Description;
}
