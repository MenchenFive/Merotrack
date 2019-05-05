package merotracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vehiclepositions", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
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
    private double course;

    @Column(name = "satellites", nullable = true, precision = 0)
    private Short satellites;

    @Column(name = "speed", nullable = true, precision = 0)
    private double speed;

    @Column(name = "lat", nullable = true, precision = 0)
    private double lat;

    @Column(name = "lon", nullable = true, precision = 0)
    private double lon;

    @ManyToOne(targetEntity = Vehicle.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicle vehicle;

}
