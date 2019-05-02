package merotracker.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "vehicle_position", schema = "public", catalog = "merotrackerdb")
public class VehiclePosition {
    private Date date;
    private long id;
    private Float course;
    private Short satellites;
    private Float speed;
    private Float lat;
    private Float lon;

    @Basic
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Id
    @Column(name = "id", nullable = false)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "course", nullable = true, precision = 0)
    public Float getCourse() {
        return course;
    }

    public void setCourse(Float course) {
        this.course = course;
    }

    @Basic
    @Column(name = "satellites", nullable = true)
    public Short getSatellites() {
        return satellites;
    }

    public void setSatellites(Short satellites) {
        this.satellites = satellites;
    }

    @Basic
    @Column(name = "speed", nullable = true, precision = 0)
    public Float getSpeed() {
        return speed;
    }

    public void setSpeed(Float speed) {
        this.speed = speed;
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
        VehiclePosition that = (VehiclePosition) o;
        return id == that.id &&
                Objects.equals(date, that.date) &&
                Objects.equals(course, that.course) &&
                Objects.equals(satellites, that.satellites) &&
                Objects.equals(speed, that.speed) &&
                Objects.equals(lat, that.lat) &&
                Objects.equals(lon, that.lon);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, id, course, satellites, speed, lat, lon);
    }
}
