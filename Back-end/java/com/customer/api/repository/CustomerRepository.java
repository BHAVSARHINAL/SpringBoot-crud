package com.customer.api.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.customer.api.entity.Customer;
/**
 * <h3>This class represents that connectivity with database.</h3>
 * @author : Hinal Bhavsar
 * @version 1.01 12-06-2024
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	boolean existsByEmail(String email);

	boolean existsByMobile(String mobile);

	boolean existsByEmailAndIdNot(String email, int id);

	boolean existsByMobileAndIdNot(String mobile, int id);

	Optional<Customer> findByEmail(String email);

	Optional<Customer> findByMobile(String mobile);

}