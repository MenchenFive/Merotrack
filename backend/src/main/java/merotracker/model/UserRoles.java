package merotracker.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_roles", schema = "public", catalog = "merotrackerdb")
public class UserRoles {
    private int id;
    private String name;
    private String permUsers;
    private String permVehicles;
    private String permIncidences;
    private String permTrips;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = true, length = 32)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "perm_users", nullable = true, length = 3)
    public String getPermUsers() {
        return permUsers;
    }

    public void setPermUsers(String permUsers) {
        this.permUsers = permUsers;
    }

    @Basic
    @Column(name = "perm_vehicles", nullable = true, length = 3)
    public String getPermVehicles() {
        return permVehicles;
    }

    public void setPermVehicles(String permVehicles) {
        this.permVehicles = permVehicles;
    }

    @Basic
    @Column(name = "perm_incidences", nullable = true, length = 3)
    public String getPermIncidences() {
        return permIncidences;
    }

    public void setPermIncidences(String permIncidences) {
        this.permIncidences = permIncidences;
    }

    @Basic
    @Column(name = "perm_trips", nullable = true, length = 3)
    public String getPermTrips() {
        return permTrips;
    }

    public void setPermTrips(String permTrips) {
        this.permTrips = permTrips;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRoles userRoles = (UserRoles) o;
        return id == userRoles.id &&
                Objects.equals(name, userRoles.name) &&
                Objects.equals(permUsers, userRoles.permUsers) &&
                Objects.equals(permVehicles, userRoles.permVehicles) &&
                Objects.equals(permIncidences, userRoles.permIncidences) &&
                Objects.equals(permTrips, userRoles.permTrips);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, permUsers, permVehicles, permIncidences, permTrips);
    }
}
