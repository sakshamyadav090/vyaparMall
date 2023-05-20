package com.vyapaarmall.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VM_USER_MST")
@Data @NoArgsConstructor @AllArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private Status status = Status.PENDING;
	private String firstName;
	private String lastName;
	@Column(unique = true)
	private String mobileNumber;
	@Column(unique = true)
	private String email;
	@JsonIgnore
	private String password;
	private String createdBy;
	private String modifiedBy;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date createdDate = new Date();
	private Date modifiedDate = new Date();
	
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private Address address;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name = "firm_id")
	private Firm firm;
	
	@OneToMany(cascade = CascadeType.ALL)
	private Set<Card> cards;
	
	@ManyToOne 
	@JoinColumn(name = "business_type_id")
	private BusinessType natureOfBuisness;
	
	
}
