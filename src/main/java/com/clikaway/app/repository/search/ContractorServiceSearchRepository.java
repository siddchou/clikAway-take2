package com.clikaway.app.repository.search;

import com.clikaway.app.domain.ContractorService;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ContractorService entity.
 */
public interface ContractorServiceSearchRepository extends ElasticsearchRepository<ContractorService, Long> {
}
