package merotracker.model.projections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

public final class UserProjection {

    @Projection(name = "userProjection", types = {merotracker.model.User.class})
    public interface noPassword {
        @Value("#{target.id}")
        int     getId();
        String  getEmail();
        String  getName();
        String getRole();
    }

}
