package com.clikaway.app.repository;

import com.clikaway.app.domain.JobTimeLog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the JobTimeLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobTimeLogRepository extends JpaRepository<JobTimeLog, Long> {

}
