package com.clikaway.app.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ContractorServiceSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ContractorServiceSearchRepositoryMockConfiguration {

    @MockBean
    private ContractorServiceSearchRepository mockContractorServiceSearchRepository;

}
