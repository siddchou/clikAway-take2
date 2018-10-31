package com.clikaway.app.repository.search;

import com.clikaway.app.domain.UserAddressMap;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserAddressMap entity.
 */
public interface UserAddressMapSearchRepository extends ElasticsearchRepository<UserAddressMap, Long> {
}
