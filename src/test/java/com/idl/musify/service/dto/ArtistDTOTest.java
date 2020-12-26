package com.idl.musify.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.idl.musify.web.rest.TestUtil;

public class ArtistDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArtistDTO.class);
        ArtistDTO artistDTO1 = new ArtistDTO();
        artistDTO1.setId(1L);
        ArtistDTO artistDTO2 = new ArtistDTO();
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
        artistDTO2.setId(artistDTO1.getId());
        assertThat(artistDTO1).isEqualTo(artistDTO2);
        artistDTO2.setId(2L);
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
        artistDTO1.setId(null);
        assertThat(artistDTO1).isNotEqualTo(artistDTO2);
    }
}
