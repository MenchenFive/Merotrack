package merotracker.model.projections;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
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
