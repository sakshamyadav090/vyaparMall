package com.twecom.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ProductList {
	
	private int pId;
	private String pName; 
	private String pPriceRange;
	private String pImage;
	private int quantity;
	private String category;
	private int isDeleted;
	private ApprovalStatus isApproved;
	
	public ProductList List(Product p){
		this.pId=p.getPId();
		this.pName=p.getPName();
		this.pPriceRange=String.valueOf(p.getPPriceStartRange()) +'-'+ String.valueOf(p.getPPriceEndRange());
		this.pImage=p.getPImage().getImageOne();
		this.quantity=p.getQuantity();
		this.category=p.getCategory().getName();
		this.isDeleted=p.getIsDeleted();
		this.isApproved=p.getIsApproved();
		return this;
		
	}

}
