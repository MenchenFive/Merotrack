package merotracker.model.projections;

import merotracker.model.Vehicle;
import merotracker.model.VehicleIncidence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(types = {VehicleIncidence.class},name = "vehicleIndidenceFullProjection")
public interface VehicleIncidenceProjection {

    @Value("#{target.id}")
    int     getId();
    String  getTitle();
    String  getDescription();
    Date    getDateStart();
    Date    getDateEnd();
    Vehicle getVehicle();

}
