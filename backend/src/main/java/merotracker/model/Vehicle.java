package merotracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"incidences","positions","trips"})
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
@Table(name = "vehicles", catalog = "public" )
public class Vehicle {

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
    private Set<Trip> trips;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehiclePosition> positions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehicleIncidence> incidences;

}
