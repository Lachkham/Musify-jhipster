package com.idl.musify.service.mapper;


import com.idl.musify.domain.*;
import com.idl.musify.service.dto.ArtistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Artist} and its DTO {@link ArtistDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ArtistMapper extends EntityMapper<ArtistDTO, Artist> {


    @Mapping(target = "albums", ignore = true)
    @Mapping(target = "removeAlbum", ignore = true)
    Artist toEntity(ArtistDTO artistDTO);

    default Artist fromId(Long id) {
        if (id == null) {
            return null;
        }
        Artist artist = new Artist();
        artist.setId(id);
        return artist;
    }
}
