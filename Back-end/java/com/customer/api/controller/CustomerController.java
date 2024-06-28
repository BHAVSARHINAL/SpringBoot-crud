package com.customer.api.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.customer.api.entity.Customer;
import com.customer.api.service.CustomerService;

/**
 * <h3>This class represents that save records in database with valid
 * conditions</h3>
 * @author : Hinal Bhavsar
 * @version 1.01 12-06-2024
 */
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/v1")
public class CustomerController {

	@Autowired
	private CustomerService service;

	// Check exist database record
	@GetMapping("/checkExistence")
	public Map<String, Boolean> checkExists(@RequestParam String type, @RequestParam String value) {
		boolean exists = service.checkExisted(type, value);
		Map<String, Boolean> response = new HashMap<>();
		response.put("exists", exists);
		return response;
	}

	// Save customer record
	@PostMapping("/createcustomer")
	public Customer createCustomer(@RequestBody Customer customer) {
		return service.saveCustomer(customer);
	}

	// Get customer records in list
	@GetMapping("/getcustomerlist")
	public List<Customer> getCustomerList() {
		return service.getCustomerList();
	}

	// Get customer details by id
	@GetMapping("/{id}")
	public Optional<Customer> getCustomerById(@PathVariable("id") int id) {
		return service.getCustomerById(id);
	}

	// Check existing emailID so duplicate email cannot be update
	@GetMapping("/customers/exists/email")
	public ResponseEntity<Boolean> checkEmailExistedId(@RequestParam String email,
			@RequestParam int excludeId) {
		boolean exists = service.checkEmailExistedId(email, excludeId);
		return ResponseEntity.ok(exists);
	}

	// Check existing mobileNumber so duplicate mobile number cannot be update
	@GetMapping("/customers/exists/mobile")
	public ResponseEntity<Boolean> checkMobileExistedId(@RequestParam String mobile,
			@RequestParam int excludeId) {
		boolean exists = service.checkMobileExistedId(mobile, excludeId);
		return ResponseEntity.ok(exists);
	}

	// Update customer record by id
	@PutMapping("updatecustomer/{id}")
	public ResponseEntity<?> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
		try {
			Customer updatedCustomer = service.updateCustomer(id, customer);
			return ResponseEntity.ok(updatedCustomer);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	// Delete customer record by id
	@DeleteMapping("/delete/{id}")
	public void deleteCustomer(@PathVariable("id") int id) {
		service.deleteCustomer(id);
	}

}