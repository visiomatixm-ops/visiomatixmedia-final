package org.visiomatix.jobOpening.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class JobOpeningApp {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "Job_Title")
	private String title;

	@Column(name = "Exprience")
	private String exprience;

	@Column(name = "Location")
	private String location;

	@Column(name = "Skills")
	private String skill;

	@Column(name = "Resume_Path")
	private String resume_path;

//				Getter and Setter 
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getExprience() {
		return exprience;
	}

	public void setExprience(String exprience) {
		this.exprience = exprience;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public String getResume_path() {
		return resume_path;
	}

	public void setResume_path(String resume_path) {
		this.resume_path = resume_path;
	}
}
