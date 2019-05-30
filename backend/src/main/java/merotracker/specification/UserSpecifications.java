package merotracker.specification;

import merotracker.model.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecifications {

    public static Specification<User> chainedSpecification(
            String email,
            String name,
            String rol
    ){
        Specification<User> spec = Specification.where(null);

        if(name!=null)
            spec = spec.and(hasName(name));

        if(email!=null)
            spec = spec.and(hasEmail(email));

        if(rol!=null)
            spec = spec.and(hasRole(rol));

        return spec;

    }

    public static Specification<User> hasName(String t) {
        return (Specification<User>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), wildLow(t));
    }
    public static Specification<User> hasRole(String t) {
        return (Specification<User>) (root, cq, cb) -> cb.like(cb.lower(root.get("role")), wildLow(t));
    }
    public static Specification<User> hasEmail(String t) {
        return (Specification<User>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), wildLow(t));
    }

    public static String wildLow(String param){
        return '%' + param.toLowerCase() + '%';
    }

}
