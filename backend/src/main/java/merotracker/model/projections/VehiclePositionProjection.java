package merotracker.model.projections;

import merotracker.model.Vehicle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "positionFullProjection", types = {merotracker.model.VehiclePosition.class})
public interface VehiclePositionProjection {

    @Value("#{target.id}")
    long    getId();
    Date    getDate();
    double  getCourse();
    Short   getSatellites();
    double  getSpeed();
    double  getLat();
    double  getLon();
    Vehicle getVehicle();

}
