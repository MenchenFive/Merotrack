package merotracker.model.projections;

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
@EqualsAndHashCode(exclude = {"vehicle"})
@Table(name = "trips",schema = "public")
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;

    @Column(name = "description", nullable = false, length = 127)
    private String description;

    @ManyToOne(targetEntity = Vehicle.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicle vehicle;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "trip")
    @JsonIgnore
    private Set<TripStage> stages;

}
