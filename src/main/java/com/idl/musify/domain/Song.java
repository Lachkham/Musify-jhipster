package com.idl.musify.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "record_date")
    private ZonedDateTime recordDate;

    @Column(name = "release_date")
    private ZonedDateTime releaseDate;

    @Column(name = "length_seconds")
    private Long lengthSeconds;

    @Column(name = "lyrics")
    private String lyrics;

    @ManyToOne
    @JsonIgnoreProperties(value = "songs", allowSetters = true)
    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Song title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ZonedDateTime getRecordDate() {
        return recordDate;
    }

    public Song recordDate(ZonedDateTime recordDate) {
        this.recordDate = recordDate;
        return this;
    }

    public void setRecordDate(ZonedDateTime recordDate) {
        this.recordDate = recordDate;
    }

    public ZonedDateTime getReleaseDate() {
        return releaseDate;
    }

    public Song releaseDate(ZonedDateTime releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(ZonedDateTime releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Long getLengthSeconds() {
        return lengthSeconds;
    }

    public Song lengthSeconds(Long lengthSeconds) {
        this.lengthSeconds = lengthSeconds;
        return this;
    }

    public void setLengthSeconds(Long lengthSeconds) {
        this.lengthSeconds = lengthSeconds;
    }

    public String getLyrics() {
        return lyrics;
    }

    public Song lyrics(String lyrics) {
        this.lyrics = lyrics;
        return this;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public Album getAlbum() {
        return album;
    }

    public Song album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", recordDate='" + getRecordDate() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", lengthSeconds=" + getLengthSeconds() +
            ", lyrics='" + getLyrics() + "'" +
            "}";
    }
}
