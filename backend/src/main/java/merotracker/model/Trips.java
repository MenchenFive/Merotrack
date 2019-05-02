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
@EqualsAndHashCode(exclude = {"vehicle"})
@Table(name = "trips",schema = "public")
public class Trips {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;

    @Column(name = "description", nullable = false, length = -1)
    private String description;

    @ManyToOne(targetEntity = Vehicles.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicles vehicle;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "trip")
    @JsonIgnore
    private Set<TripStages> stages;

}
