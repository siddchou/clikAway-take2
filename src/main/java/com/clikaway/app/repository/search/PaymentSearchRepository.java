package com.clikaway.app.repository.search;

import com.clikaway.app.domain.Payment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Payment entity.
 */
public interface PaymentSearchRepository extends ElasticsearchRepository<Payment, Long> {
}
