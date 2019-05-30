package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

public final class AddressProjection {

    @Projection(name = "addressProjection", types = {merotracker.model.Adress.class})
    public interface full {
        @Value("#{target.id}")
        int    getId();
        String getAddress();
        String getLat();
        String getLon();
    }

}
