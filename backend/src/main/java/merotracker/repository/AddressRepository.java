package merotracker.repository;

import merotracker.model.Trip;
import merotracker.model.projections.TripProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = TripProjection.full.class)
public interface TripRepository extends JpaRepository<Trip, Integer>{

}
