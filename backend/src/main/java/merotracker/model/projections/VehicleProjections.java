package merotracker.model.projections;


import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

public final class VehicleProjections {

    @Projection(name = "vehicleSummary", types = {merotracker.model.Vehicle.class})
    public interface summary {
        int getId();
        String getBrand();
        String getModel();
        String getPlate();
    }

    @Projection(name = "vehicleFull", types = {merotracker.model.Vehicle.class})
    public interface full extends summary {
        Set<TripProjection.withStages> getTrips();
        Set<VehicleIncidenceProjection.noVehicle> getIncidences();
        Set<VehiclePositionProjection.noVehicle> getPositions();
    }

}
