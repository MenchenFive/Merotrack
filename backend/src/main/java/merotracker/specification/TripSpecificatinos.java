package merotracker.specification;

import merotracker.model.Trip;
import org.springframework.data.jpa.domain.Specification;

public class TripSpecificatinos {

    public static Specification<Trip> chainedSpecification(
            String title,
            String vehiclePlate
    ){
        Specification<Trip> spec = Specification.where(null);

        if(title!=null)
            spec = spec.and(hasTitle(title));

        if(vehiclePlate!=null)
            spec = spec.and(hasPlate(vehiclePlate));

        return spec;

    }

    public static Specification<Trip> hasTitle(String t) {
        return (Specification<Trip>) (root, cq, cb) -> cb.like(cb.lower(root.get("description")), wildLow(t));
    }
    public static Specification<Trip> hasPlate(String t) {
        return (Specification<Trip>) (root, cq, cb) -> cb.like(cb.lower(root.join("vehicle").get("plate")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
