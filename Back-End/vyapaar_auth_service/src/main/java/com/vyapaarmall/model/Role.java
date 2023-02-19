package com.vyapaarmall.model;

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
@Table(name = "roles")
@Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Role {
	public Role(int i) {
		this.roleId=i;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int roleId;
	private String name;
}
