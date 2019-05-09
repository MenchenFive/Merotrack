package merotracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"trip"})
@Table(name = "tripstages", schema = "public")
public class TripStage {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date_a", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateA;

    @Column(name = "comments", nullable = true, length = 127)
    private String comments;

    @Column(name = "lat", nullable = true, precision = 0)
    private Float lat;

    @Column(name = "lon", nullable = true, precision = 0)
    private Float lon;

    @ManyToOne(targetEntity = Trip.class)
    @JoinColumn(name = "ref_trip")
    private Trip trip;

}
