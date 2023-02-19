package com.twecom.model;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ResponseModel {
	
	Object data;
    int code;
    boolean success;
    String message;
    
    public Map<String, Object> toMap(){
    	Map<String, Object> map = new HashMap<>();
    	map.put("data", this.data);
    	map.put("code", this.code);
    	map.put("success", this.success);
    	map.put("message", this.message);
    	return null;
    }

	@Override
	public String toString() {
		return "ResponseModel [data=" + data + ", code=" + code + ", success=" + success + ", message=" + message + "]";
	}
}

