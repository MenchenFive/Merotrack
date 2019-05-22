package merotracker.repository;

import merotracker.model.Vehicle;
import merotracker.model.projections.VehicleProjections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RepositoryRestResource(excerptProjection = VehicleProjections.summary.class)
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>, JpaSpecificationExecutor<Vehicle> {
    Optional<Vehicle> findByPublicId(String publicId);
    List<Vehicle> findByPlateIgnoreCaseContaining(@Param("plate") String plate);
}
