package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

public final class VehiclePositionProjection {

    @Projection(name = "positionNoVehicle", types = {merotracker.model.VehiclePosition.class})
    public interface noVehicle {
        @Value("#{target.id}")
        long    getId();
        Date    getDate();
        double  getCourse();
        Short   getSatellites();
        double  getSpeed();
        double  getLat();
        double  getLon();
    }

    @Projection(name = "positionFull", types = {merotracker.model.VehiclePosition.class})
    public interface full extends noVehicle {
        VehicleProjections.summary getVehicle();
    }


}
