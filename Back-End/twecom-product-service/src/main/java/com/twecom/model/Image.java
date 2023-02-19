package com.twecom.model;

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
@Table(name="image")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Image {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int imageId;
	@Lob
	private String imageOne;
	@Lob
	private String imageTwo;
	@Lob
	private String imageThree;
	private boolean isDeleted=false;

}
