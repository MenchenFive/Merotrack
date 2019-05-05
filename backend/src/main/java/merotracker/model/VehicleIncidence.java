package merotracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vehicleincidences", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"vehicle"})
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
public class VehicleIncidence {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 80)
    private String title;

    @Column(name = "description", nullable = true, length = 127)
    private String description;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_start", nullable = false)
    private Date dateStart;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_end", nullable = true)
    private Date dateEnd;

    @ManyToOne(targetEntity = Vehicle.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicle vehicle;

}
