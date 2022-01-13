package uk.ac.reigate.acceptanceregistration.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import uk.ac.reigate.domain.acceptanceregistration.LLDDHealthProblemCategory;
import uk.ac.reigate.domain.acceptanceregistration.Student;

public class ParentAcceptanceDto {

	@Getter
	@JsonProperty
	Integer id;

	@Getter
	@JsonProperty
	String linkId;
	
	@Getter
	@JsonProperty
	String parentSignature;

	@Getter
	@JsonProperty
	@JsonFormat(pattern = "dd/MM/yyyy", timezone = "Europe/London")
	Date parentSignatureDate;

	
	/**
	 * Default No Args constructor
	 */
	public ParentAcceptanceDto() {}
	
	/**
	 * Constructor to create a StudentDto object from a Student object.
	 * 
	 * @param student the Student object to use for construction.
	 */
	public ParentAcceptanceDto(Student student) {	
		this.id = student.getId();
		this.linkId = student.getLinkId();		
		this.parentSignature = student.getParentSignature();
		this.parentSignatureDate = student.getParentSignatureDate();
		
	}

}
