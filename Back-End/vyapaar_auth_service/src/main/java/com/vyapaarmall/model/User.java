package com.vyapaarmall.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

@Entity
@Table(name = "VM_USER_MST")
public class User {
	@Id
	@Column(name = "USER_ID")
	private int userId;
	@Column(name = "AADHAAR_NUMBER")
	private String aadhaarNumber;
	@Column(name = "CITY")
	private String city;
	@Column(name = "E_MAIL")
	private String eMail;
	@Column(name = "FIRM_NAME")
	private String firmName;
	private String fName;
	private String lName;
	private String gst;
	private String mobileNumber;
	private String natureOfBuisness;
	private String panNumber;
	private String password;
	private String pincode;
	private String state;
	private String createdBy;
	private String modifiedBy;
	
	private int roleId;

	public User() {
		super();
	}

	

	public User(int userId, String aadhaarNumber, String city, String eMail, String firmName, String fName,
			String lName, String gst, String mobileNumber, String natureOfBuisness, String panNumber, String password,
			String pincode, String state, String createdBy, String modifiedBy, int roleId) {
		super();
		this.userId = userId;
		this.aadhaarNumber = aadhaarNumber;
		this.city = city;
		this.eMail = eMail;
		this.firmName = firmName;
		this.fName = fName;
		this.lName = lName;
		this.gst = gst;
		this.mobileNumber = mobileNumber;
		this.natureOfBuisness = natureOfBuisness;
		this.panNumber = panNumber;
		this.password = password;
		this.pincode = pincode;
		this.state = state;
		this.createdBy = createdBy;
		this.modifiedBy = modifiedBy;
		this.roleId = roleId;
	}



	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getAadhaarNumber() {
		return aadhaarNumber;
	}

	public void setAadhaarNumber(String aadhaarNumber) {
		this.aadhaarNumber = aadhaarNumber;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String geteMail() {
		return eMail;
	}

	public void seteMail(String eMail) {
		this.eMail = eMail;
	}

	public String getFirmName() {
		return firmName;
	}

	public void setFirmName(String firmName) {
		this.firmName = firmName;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getGst() {
		return gst;
	}

	public void setGst(String gst) {
		this.gst = gst;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getNatureOfBuisness() {
		return natureOfBuisness;
	}

	public void setNatureOfBuisness(String natureOfBuisness) {
		this.natureOfBuisness = natureOfBuisness;
	}

	public String getPanNumber() {
		return panNumber;
	}

	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	
	
}
