package merotracker.repository;

import merotracker.model.VehiclePosition;
import merotracker.model.projections.VehiclePositionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = VehiclePositionProjection.noVehicle.class)
public interface VehiclePositionRepository extends JpaRepository<VehiclePosition, Integer> {

}
