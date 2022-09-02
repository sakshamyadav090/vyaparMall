package com.twecom.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="products")
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
	
	public Product(int pId, String pName, String pDescription, String pPriceRange, String pManufacturer, String pImage,
			int pSupplierId, int pCategory, String pOrigin) {
		super();
		this.pId = pId;
		this.pName = pName;
		this.pDescription = pDescription;
		this.pPriceRange = pPriceRange;
		this.pManufacturer = pManufacturer;
		this.pImage = pImage;
		this.pSupplierId = pSupplierId;
		this.pCategory = pCategory;
		this.pOrigin = pOrigin;
	}

	public int getpId() {
		return pId;
	}

	public void setpId(int pId) {
		this.pId = pId;
	}

	public String getpName() {
		return pName;
	}

	public void setpName(String pName) {
		this.pName = pName;
	}

	public String getpDescription() {
		return pDescription;
	}

	public void setpDescription(String pDescription) {
		this.pDescription = pDescription;
	}

	public String getpPriceRange() {
		return pPriceRange;
	}

	public void setpPriceRange(String pPriceRange) {
		this.pPriceRange = pPriceRange;
	}

	public String getpManufacturer() {
		return pManufacturer;
	}

	public void setpManufacturer(String pManufacturer) {
		this.pManufacturer = pManufacturer;
	}

	public String getpImage() {
		return pImage;
	}

	public void setpImage(String pImage) {
		this.pImage = pImage;
	}

	public int getpSupplierId() {
		return pSupplierId;
	}

	public void setpSupplierId(int pSupplierId) {
		this.pSupplierId = pSupplierId;
	}

	public int getpCategory() {
		return pCategory;
	}

	public void setpCategory(int pCategory) {
		this.pCategory = pCategory;
	}

	public String getpOrigin() {
		return pOrigin;
	}

	public void setpOrigin(String pOrigin) {
		this.pOrigin = pOrigin;
	}

	public Product() {
		// TODO Auto-generated constructor stub
	}

}
