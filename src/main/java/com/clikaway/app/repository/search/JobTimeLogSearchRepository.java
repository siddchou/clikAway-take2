package com.clikaway.app.repository.search;

import com.clikaway.app.domain.JobTimeLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the JobTimeLog entity.
 */
public interface JobTimeLogSearchRepository extends ElasticsearchRepository<JobTimeLog, Long> {
}
