package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

public final class TripStageProjection {

    @Projection(name = "tripStageSummary", types = {merotracker.model.TripStage.class})
    public interface summary {
        @Value("#{target.id}")
        int     getId();
        Date getDateA();
        String getComments();
        Float getLat();
        Float getLon();
    }

    @Projection(name = "tripStageFull", types = {merotracker.model.TripStage.class})
    public interface full extends summary {
        TripProjection.withVehicle getTrip();
    }

}
