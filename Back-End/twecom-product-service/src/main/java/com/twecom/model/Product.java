package com.twecom.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="products")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private int pId;
	private String pName;
	private String pDescription;
	private String pPriceRange;
	private String pManufacturer;	
	private String pImage;	
	private int pSupplierId;	
	private int pCategory;
	private String pOrigin;	
	private int createdBy;
	private int modifiedBy;
	private int isDeleted;
	private Date modifiedAt;
	private int quantity;

}
