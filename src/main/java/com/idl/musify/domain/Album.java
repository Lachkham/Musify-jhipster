package com.idl.musify.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "release_date")
    private ZonedDateTime releaseDate;

    @Column(name = "length_seconds")
    private Long lengthSeconds;

    @Column(name = "genre")
    private String genre;

    @Column(name = "studio")
    private String studio;

    @Column(name = "producer")
    private String producer;

    @ManyToOne
    @JsonIgnoreProperties(value = "albums", allowSetters = true)
    private Artist artist;

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Song> songs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Album label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ZonedDateTime getReleaseDate() {
        return releaseDate;
    }

    public Album releaseDate(ZonedDateTime releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(ZonedDateTime releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Long getLengthSeconds() {
        return lengthSeconds;
    }

    public Album lengthSeconds(Long lengthSeconds) {
        this.lengthSeconds = lengthSeconds;
        return this;
    }

    public void setLengthSeconds(Long lengthSeconds) {
        this.lengthSeconds = lengthSeconds;
    }

    public String getGenre() {
        return genre;
    }

    public Album genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getStudio() {
        return studio;
    }

    public Album studio(String studio) {
        this.studio = studio;
        return this;
    }

    public void setStudio(String studio) {
        this.studio = studio;
    }

    public String getProducer() {
        return producer;
    }

    public Album producer(String producer) {
        this.producer = producer;
        return this;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public Artist getArtist() {
        return artist;
    }

    public Album artist(Artist artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Album songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Album addSong(Song song) {
        this.songs.add(song);
        song.setAlbum(this);
        return this;
    }

    public Album removeSong(Song song) {
        this.songs.remove(song);
        song.setAlbum(null);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Album)) {
            return false;
        }
        return id != null && id.equals(((Album) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", lengthSeconds=" + getLengthSeconds() +
            ", genre='" + getGenre() + "'" +
            ", studio='" + getStudio() + "'" +
            ", producer='" + getProducer() + "'" +
            "}";
    }
}
