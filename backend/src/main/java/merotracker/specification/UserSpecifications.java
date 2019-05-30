package merotracker.specification;

import merotracker.model.Adress;
import org.springframework.data.jpa.domain.Specification;

public class AddressesSpecifications {

    public static Specification<Adress> hasName(String t) {
        return (Specification<Adress>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
