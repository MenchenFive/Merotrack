package merotracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(name = "lat", nullable = false, precision = 0)
    private Float lat;

    @Column(name = "lon", nullable = false, precision = 0)
    private Float lon;

    @Column(name = "ord")
    private int ord;

    @ManyToOne(targetEntity = Trip.class, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "ref_trip")
    private Trip trip;

}
