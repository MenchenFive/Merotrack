package merotracker.repository;

import merotracker.model.TripStage;
import merotracker.model.projections.TripStageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = TripStageProjection.summary.class)
public interface TripStageRepository extends JpaRepository<TripStage, Integer> {

}
