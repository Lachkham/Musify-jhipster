package com.idl.musify.service.impl;

import com.idl.musify.service.SongService;
import com.idl.musify.domain.Song;
import com.idl.musify.repository.SongRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Song}.
 */
@Service
@Transactional
public class SongServiceImpl implements SongService {

    private final Logger log = LoggerFactory.getLogger(SongServiceImpl.class);

    private final SongRepository songRepository;

    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @Override
    public Song save(Song song) {
        log.debug("Request to save Song : {}", song);
        return songRepository.save(song);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Song> findAll(Pageable pageable) {
        log.debug("Request to get all Songs");
        return songRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Song> findOne(Long id) {
        log.debug("Request to get Song : {}", id);
        return songRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Song : {}", id);
        songRepository.deleteById(id);
    }
}
