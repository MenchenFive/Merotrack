package merotracker.model.projections;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import merotracker.model.VehicleIncidence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
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
