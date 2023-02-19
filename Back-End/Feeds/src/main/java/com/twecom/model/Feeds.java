package com.twecom.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Feeds {

	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int feedId;
	private String name;
	@Lob
	private String content;
}
