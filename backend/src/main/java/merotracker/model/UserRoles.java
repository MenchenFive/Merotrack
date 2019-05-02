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
@EqualsAndHashCode(exclude = {"user"})
@Table(name = "user_roles", schema = "public")
public class UserRoles {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = true, length = 32)
    private String name;

    @Column(name = "perm_users", nullable = true, length = 3)
    private String permUsers;

    @Column(name = "perm_vehicles", nullable = true, length = 3)
    private String permVehicles;

    @Column(name = "perm_incidences", nullable = true, length = 3)
    private String permIncidences;

    @Column(name = "perm_trips", nullable = true, length = 3)
    private String permTrips;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rol")
    @JsonIgnore
    private Set<Users> user;

}
