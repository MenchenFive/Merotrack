package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

public final class TripStageProjection {

    @Projection(name = "tripStageSummary", types = {merotracker.model.TripStage.class})
    public interface summary {
        @Value("#{target.id}")
        int     getId();
        Float getLat();
        Float getLon();
        int getOrd();
    }

    @Projection(name = "tripStageFull", types = {merotracker.model.TripStage.class})
    public interface full extends summary {
        TripProjection.withVehicle getTrip();
    }

}
