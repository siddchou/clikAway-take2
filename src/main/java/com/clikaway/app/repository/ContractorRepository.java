package com.clikaway.app.repository;

import com.clikaway.app.domain.Contractor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Contractor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContractorRepository extends JpaRepository<Contractor, Long> {

}
