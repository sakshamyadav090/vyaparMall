package com.twecom.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
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
	private int pPriceStartRange;
	private int pPriceEndRange;
	private String pManufacturer;	
	@Lob
	private String pImage;	
	private int pSupplierId;	
	private String pOrigin;	
	private int createdBy;
	private int modifiedBy;
	private int isDeleted;
	private ApprovalStatus isApproved = ApprovalStatus.PENDING;
	private Date modifiedAt;
	private int quantity;
	@ManyToOne 
	@JoinColumn(name = "categoryId")
	private Category category;

}
