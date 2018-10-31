package com.clikaway.app.service.impl;

import com.clikaway.app.service.ContractorService;
import com.clikaway.app.domain.Contractor;
import com.clikaway.app.repository.ContractorRepository;
import com.clikaway.app.repository.search.ContractorSearchRepository;
import com.clikaway.app.service.dto.ContractorDTO;
import com.clikaway.app.service.mapper.ContractorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Contractor.
 */
@Service
@Transactional
public class ContractorServiceImpl implements ContractorService {

    private final Logger log = LoggerFactory.getLogger(ContractorServiceImpl.class);

    private ContractorRepository contractorRepository;

    private ContractorMapper contractorMapper;

    private ContractorSearchRepository contractorSearchRepository;

    public ContractorServiceImpl(ContractorRepository contractorRepository, ContractorMapper contractorMapper, ContractorSearchRepository contractorSearchRepository) {
        this.contractorRepository = contractorRepository;
        this.contractorMapper = contractorMapper;
        this.contractorSearchRepository = contractorSearchRepository;
    }

    /**
     * Save a contractor.
     *
     * @param contractorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ContractorDTO save(ContractorDTO contractorDTO) {
        log.debug("Request to save Contractor : {}", contractorDTO);

        Contractor contractor = contractorMapper.toEntity(contractorDTO);
        contractor = contractorRepository.save(contractor);
        ContractorDTO result = contractorMapper.toDto(contractor);
        contractorSearchRepository.save(contractor);
        return result;
    }

    /**
     * Get all the contractors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContractorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contractors");
        return contractorRepository.findAll(pageable)
            .map(contractorMapper::toDto);
    }


    /**
     * Get one contractor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ContractorDTO> findOne(Long id) {
        log.debug("Request to get Contractor : {}", id);
        return contractorRepository.findById(id)
            .map(contractorMapper::toDto);
    }

    /**
     * Delete the contractor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Contractor : {}", id);
        contractorRepository.deleteById(id);
        contractorSearchRepository.deleteById(id);
    }

    /**
     * Search for the contractor corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContractorDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Contractors for query {}", query);
        return contractorSearchRepository.search(queryStringQuery(query), pageable)
            .map(contractorMapper::toDto);
    }
}
