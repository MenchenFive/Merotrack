package merotracker.specification;

import merotracker.model.VehicleIncidence;
import org.springframework.data.jpa.domain.Specification;

public class IncidenceSpecifications {

    public static Specification<VehicleIncidence> chainedSpecification(
            String title,
            String vehiclePlate
    ){
        Specification<VehicleIncidence> spec = Specification.where(null);

        if(title!=null){
            spec = spec.and(hasTitle(title));
            spec = spec.and(hasDescr(title));}

        if(vehiclePlate!=null)
            spec = spec.and(hasVehiclePlate(vehiclePlate));

        return spec;

    }

    private static Specification<VehicleIncidence> hasVehiclePlate(String t) {
        return (Specification<VehicleIncidence>) (root, cq, cb) -> cb.like(cb.lower(root.join("vehicle").get("plate")), wildLow(t));
    }

    private static Specification<VehicleIncidence> hasTitle(String t) {
        return (Specification<VehicleIncidence>) (root, cq, cb) -> cb.like(cb.lower(root.get("title")), wildLow(t));
    }

    private static Specification<VehicleIncidence> hasDescr(String t) {
        return (Specification<VehicleIncidence>) (root, cq, cb) -> cb.like(cb.lower(root.get("description")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
