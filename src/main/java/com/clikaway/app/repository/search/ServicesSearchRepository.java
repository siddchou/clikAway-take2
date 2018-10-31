package com.clikaway.app.repository.search;

import com.clikaway.app.domain.Services;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Services entity.
 */
public interface ServicesSearchRepository extends ElasticsearchRepository<Services, Long> {
}
