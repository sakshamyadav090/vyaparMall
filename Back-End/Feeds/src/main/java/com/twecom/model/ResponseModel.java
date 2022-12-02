package com.twecom.model;

public class ResponseModel {
	
	Object data;
    int code;
    boolean success;
    String message;
    
    public ResponseModel(Object data, int code, boolean success, String message) {
		super();
		this.data = data;
		this.code = code;
		this.success = success;
		this.message = message;
	}
    
	public ResponseModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ResponseModel [data=" + data + ", code=" + code + ", success=" + success + ", message=" + message + "]";
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

}

