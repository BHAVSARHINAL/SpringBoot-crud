package com.customer.api.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.api.entity.Customer;
import com.customer.api.repository.CustomerRepository;

/**
 * <h3>This class represents that record insert,get,getById for update and
 * delete in database.</h3 
 * @author : Hinal Bhavsar
 * @version 1.01 12-06-2024
 */
@Service
public class CustomerService {

	@Autowired
	private CustomerRepository repository;

	// Check exists email and mobile value for insert customer data
	public boolean checkExisted(String type, String value) {
		if ("email".equalsIgnoreCase(type)) {
			return repository.existsByEmail(value);
		} else if ("mobile".equalsIgnoreCase(type)) {
			return repository.existsByMobile(value);
		}
		return false;
	}

	// Save all records except existing email and mobile number
	public Customer saveCustomer(Customer customer) {
		return repository.save(customer);
	}

	// Get all customer's records in list
	public List<Customer> getCustomerList() {
		List<Customer> list = repository.findAll();
		return list;
	}

	// Check existing emailId for update record by id
	public boolean checkEmailExistedId(String email, int excludeId) {
		return repository.existsByEmailAndIdNot(email, excludeId);
	}

	// Check existing mobile number for update record by id
	public boolean checkMobileExistedId(String mobile, int excludeId) {
		return repository.existsByMobileAndIdNot(mobile, excludeId);
	}

	// Get record by id
	public Optional<Customer> getCustomerById(int id) {
		return repository.findById(id);
	}

	// Update record by id
	public Customer updateCustomer(int id, Customer customer) throws Exception {
		// Check if email exists for other customer
		if (repository.existsByEmail(customer.getEmail()) && !(repository.findByEmail(customer.getEmail()).get().getId() == id)) {
			throw new Exception("Email already exists");
		}
		// Check if mobile exists for other users
		if (repository.existsByMobile(customer.getMobile())	&& !(repository.findByMobile(customer.getMobile()).get().getId() == id)) {
			throw new Exception("Mobile already exists");
		}
		return repository.findById(id).map(existingCustomer -> {
			existingCustomer.setEmail(customer.getEmail());
			existingCustomer.setMobile(customer.getMobile());
			existingCustomer.setAddress1(customer.getAddress1());
			existingCustomer.setFirstName(customer.getFirstName());
			existingCustomer.setAddress2(customer.getAddress2());
			existingCustomer.setLastName(customer.getLastName());
			existingCustomer.setAge(customer.getAge());
			existingCustomer.setDateOfBirth(customer.getDateOfBirth());
			existingCustomer.setGender(customer.getGender());
			return repository.save(existingCustomer);
		}).orElseThrow(() -> new Exception("customer not found"));
	}

	// Delete record by id
	public void deleteCustomer(int id) {
		repository.deleteById(id);
	}

}