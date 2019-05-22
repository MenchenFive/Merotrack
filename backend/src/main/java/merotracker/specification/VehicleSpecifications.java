package merotracker.specification;

import merotracker.model.Vehicle;
import org.springframework.data.jpa.domain.Specification;

public class VehicleSpecifications {

    public static Specification<Vehicle> chainedSpecification(
            String brand,
            String plate,
            String model
    ){
        Specification<Vehicle> spec = Specification.where(null);

        if(plate!=null)
            spec = spec.and(hasPlate(plate));

        if(brand!=null)
            spec = spec.and(hasBrand(brand));

        if(model!=null)
            spec = spec.and(hasModel(model));

        return spec;

    }

    private static Specification<Vehicle> hasPlate(String t) {
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("plate")), wildLow(t));
    }

    private static Specification<Vehicle> hasBrand(String t) {
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("brand")), wildLow(t));
    }

    private static Specification<Vehicle> hasModel(String t) {
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("model")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
