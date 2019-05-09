package merotracker.model.projections;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"rol"})
@Table(name = "users", schema = "public")
@JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
public class User {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, length = 32)
    private String name;

    @Column(name = "email", nullable = false, length = 40)
    private String email;

    @Column(name = "password", nullable = false, length = 32)
    private String password;

    @Column(name = "salt", nullable = false, length = 8)
    private String salt;

    @ManyToOne(targetEntity = UserRole.class)
    @JoinColumn(name = "ref_role")
    private UserRole rol;
}
