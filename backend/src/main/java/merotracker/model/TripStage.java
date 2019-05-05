package merotracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "trip_stages", schema = "public")
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
public class TripStages {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date_a", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateA;

    @Column(name = "comments", nullable = true, length = -1)
    private String comments;

    @Column(name = "lat", nullable = true, precision = 0)
    private Float lat;

    @Column(name = "lon", nullable = true, precision = 0)
    private Float lon;

    @ManyToOne(targetEntity = Trips.class)
    @JoinColumn(name = "ref_trip")
    private Trips trip;

}
