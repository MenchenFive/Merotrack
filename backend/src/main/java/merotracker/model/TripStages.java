package merotracker.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "trip_stages", schema = "public", catalog = "merotrackerdb")
public class TripStages {
    private int id;
    private Date dateA;
    private String comments;
    private Float lat;
    private Float lon;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "date_a", nullable = false)
    public Date getDateA() {
        return dateA;
    }

    public void setDateA(Date dateA) {
        this.dateA = dateA;
    }

    @Basic
    @Column(name = "comments", nullable = true, length = -1)
    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Basic
    @Column(name = "lat", nullable = true, precision = 0)
    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    @Basic
    @Column(name = "lon", nullable = true, precision = 0)
    public Float getLon() {
        return lon;
    }

    public void setLon(Float lon) {
        this.lon = lon;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TripStages that = (TripStages) o;
        return id == that.id &&
                Objects.equals(dateA, that.dateA) &&
                Objects.equals(comments, that.comments) &&
                Objects.equals(lat, that.lat) &&
                Objects.equals(lon, that.lon);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dateA, comments, lat, lon);
    }
}
