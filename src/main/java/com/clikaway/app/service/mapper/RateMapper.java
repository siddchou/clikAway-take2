package com.clikaway.app.service.mapper;

import com.clikaway.app.domain.*;
import com.clikaway.app.service.dto.RateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rate and its DTO RateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RateMapper extends EntityMapper<RateDTO, Rate> {



    default Rate fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rate rate = new Rate();
        rate.setId(id);
        return rate;
    }
}
