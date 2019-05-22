package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

public final class VehicleIncidenceProjection {

    @Projection(name = "incidenceNoVehicle", types = {merotracker.model.VehicleIncidence.class})
    public interface noVehicle {

        @Value("#{target.id}")
        int     getId();
        String  getTitle();
        String  getDescription();
        Date    getDateStart();
        Date    getDateEnd();

    }

    @Projection(name = "incidenceFull", types = {merotracker.model.VehicleIncidence.class})
    public interface full extends noVehicle {
        VehicleProjections.summary getVehicle();
    }



}
