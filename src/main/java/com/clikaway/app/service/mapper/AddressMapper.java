package com.clikaway.app.service.mapper;

import com.clikaway.app.domain.*;
import com.clikaway.app.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {AppUserMapper.class})
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {

    @Mapping(source = "appUser.id", target = "appUserId")
    AddressDTO toDto(Address address);

    @Mapping(source = "appUserId", target = "appUser")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
