package com.clikaway.app.repository.search;

import com.clikaway.app.domain.Contractor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Contractor entity.
 */
public interface ContractorSearchRepository extends ElasticsearchRepository<Contractor, Long> {
}
