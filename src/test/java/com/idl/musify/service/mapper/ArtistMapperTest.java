package com.idl.musify.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ArtistMapperTest {

    private ArtistMapper artistMapper;

    @BeforeEach
    public void setUp() {
        artistMapper = new ArtistMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(artistMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(artistMapper.fromId(null)).isNull();
    }
}
