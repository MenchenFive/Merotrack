package merotracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "vehicle_position", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"vehicle"})
public class VehiclePosition {

    @Temporal(TemporalType.DATE)
    @Column(name = "date", nullable = false)
    private Date date;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "course", nullable = true, precision = 0)
    private Float course;

    @Column(name = "satellites", nullable = true, precision = 0)
    private Short satellites;

    @Column(name = "speed", nullable = true, precision = 0)
    private Float speed;

    @Column(name = "lat", nullable = true, precision = 0)
    private Float lat;

    @Column(name = "lon", nullable = true, precision = 0)
    private Float lon;

    @ManyToOne(targetEntity = Vehicles.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicles vehicle;

}
