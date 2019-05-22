package merotracker.repository;

import merotracker.model.VehicleIncidence;
import merotracker.model.projections.VehicleIncidenceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = VehicleIncidenceProjection.full.class)
public interface VehicleIncidenceRepository extends JpaRepository<VehicleIncidence, Integer>, JpaSpecificationExecutor<VehicleIncidence> {

}
