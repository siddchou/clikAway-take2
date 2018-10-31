package com.clikaway.app.repository;

import com.clikaway.app.domain.ContractorService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContractorService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContractorServiceRepository extends JpaRepository<ContractorService, Long> {

}
