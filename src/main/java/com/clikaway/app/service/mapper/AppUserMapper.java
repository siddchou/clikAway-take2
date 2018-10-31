package com.clikaway.app.service.mapper;

import com.clikaway.app.domain.*;
import com.clikaway.app.service.dto.AppUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AppUser and its DTO AppUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {


    @Mapping(target = "addresses", ignore = true)
    AppUser toEntity(AppUserDTO appUserDTO);

    default AppUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppUser appUser = new AppUser();
        appUser.setId(id);
        return appUser;
    }
}
