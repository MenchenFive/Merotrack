package merotracker.specification;

import merotracker.model.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {

    public static Specification<User> chainedSpecification(
            String title,
            String vehiclePlate
    ){
        Specification<User> spec = Specification.where(null);

        if(title!=null)
            spec = spec.and(hasName(title));

        if(vehiclePlate!=null)
            spec = spec.and(hasEmail(vehiclePlate));

        return spec;

    }

    public static Specification<User> hasName(String t) {
        return (Specification<User>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), wildLow(t));
    }
    public static Specification<User> hasEmail(String t) {
        return (Specification<User>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
