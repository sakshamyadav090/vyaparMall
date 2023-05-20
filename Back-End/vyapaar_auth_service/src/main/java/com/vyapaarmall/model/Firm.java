package com.vyapaarmall.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Firm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String firmName;
	@Column(unique = true)
	private String gst;
	@Column(unique = true)
	private String aadhaarNumber;
	@Column(unique = true)
	private String panNumber;
}
