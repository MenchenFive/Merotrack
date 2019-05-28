package merotracker.repository;

import merotracker.model.VehiclePosition;
import merotracker.model.projections.VehiclePositionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RepositoryRestResource(excerptProjection = VehiclePositionProjection.noVehicle.class)
public interface VehiclePositionRepository extends JpaRepository<VehiclePosition, Integer> {

    /*@Query(value = "select * from vehiclepositions vp where (date, ref_vehicle) in (select max(date), ref_vehicle from vehiclepositions group by ref_vehicle)", nativeQuery = true)
    List<VehiclePosition> getLastPositionOfEachVehicle();*/

    @Modifying
    @Query(value = "select vp from VehiclePosition vp where (vp.date, vp.vehicle) in (select max(vp2.date), vp2.vehicle from VehiclePosition vp2 group by vp2.vehicle)")
    List<VehiclePosition> getLastPositionOfEachVehicle();

    List<VehiclePosition> findAllByVehicleIdAndDateBetween(
            @Param("VehicleId") Integer vehicleId,
            @Param("DateStart") Date dateStart,
            @Param("DateEnd") Date dateEnd
    );

}
