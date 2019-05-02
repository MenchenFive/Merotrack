package merotracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"refVehicle"})
@Table(name = "vehicles", catalog = "public")
public class Vehicles {

    @Column(name = "brand", nullable = false, length = 32)
    private String brand;

    @Column(name = "model", nullable = false, length = 32)
    private String model;

    @Column(name = "plate", nullable = false, length = 7)
    private String plate;

    @Column(name = "public_id", nullable = false, length = 16)
    private String publicId;

    @Column(name = "private_id", nullable = false, length = 16)
    private String privateId;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnore
    private Set<Trips> trips;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehiclePosition> positions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehicleIncidences> incidences;

}
