package merotracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"vehicle"})
@Table(name = "trips",schema = "public")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_start", nullable = false)
    private Date dateStart;

    @Column(name = "description", nullable = false, length = 127)
    private String description;

    @ManyToOne(targetEntity = Vehicle.class)
    @JoinColumn(name = "ref_vehicle")
    private Vehicle vehicle;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "trip", cascade = {CascadeType.REMOVE})
    private Set<TripStage> stages;

}
