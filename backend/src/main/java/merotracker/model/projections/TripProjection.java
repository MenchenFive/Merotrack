package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.Set;

public final class TripProjection {

    @Projection(name = "tripSummary", types = {merotracker.model.Trip.class})
    public interface summary {
        @Value("#{target.id}")
        int     getId();
        String getDescription();
        Date getDateStart();
    }

    @Projection(name = "tripWithVehicle", types = {merotracker.model.Trip.class})
    public interface withVehicle extends summary {
        VehicleProjections.summary getVehicle();
    }

    @Projection(name = "tripWithStages", types = {merotracker.model.Trip.class})
    public interface withStages extends summary {
        Set<TripStageProjection.summary> getStages();
    }

    @Projection(name = "tripFull", types = {merotracker.model.Trip.class})
    public interface full {
        @Value("#{target.id}")
        int     getId();
        String getDescription();
        Date getDateStart();
        Set<TripStageProjection.summary> getStages();
        VehicleProjections.summary getVehicle();
    }

}
