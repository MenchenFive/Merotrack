package merotracker.repository;

import merotracker.model.Adress;
import merotracker.model.projections.AddressProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = AddressProjection.full.class)
public interface AddressRepository extends JpaRepository<Adress, Integer>, JpaSpecificationExecutor<Adress> {

}
