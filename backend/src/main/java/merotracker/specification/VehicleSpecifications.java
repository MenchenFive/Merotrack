package merotracker.specification;

public class VehicleSpecifications {

    /*public static Specification<Vehicle> chainedSpecification(
            String name,
            String surname1,
            String surname2,
            String email,
            String document,
            List<String> languages,
            List<Integer> qualifications,
            List<Integer> certifications,
            List<Integer> companies,
            List<Integer> status
    ){
        Specification<Vehicle> spec = Specification.where(null);

        if(name!=null)
            spec = spec.and(hasName(name));

        if(surname1!=null)
            spec = spec.and(hasSurname1(surname1));

        if(surname2!=null)
            spec = spec.and(hasSurname2(surname2));

        if(document!=null)
            spec = spec.and(hasDocument(document));

        if(email!=null)
            spec = spec.and(hasEmail(email));

        if(qualifications!=null)
            for (Integer i: qualifications)
                spec = spec.and(hasQualification(i));

        if(certifications!=null)
            for (Integer i: certifications)
                spec = spec.and(hasCertification(i));

        if(companies!=null)
            for (Integer i: companies)
                spec = spec.and(hasWorkedInCompany(i));

        if(status!=null)
            for (Integer i: status)
                spec = spec.and(withStatus(i));

        return spec;

    }

    private static Specification<Vehicle> hasCertification(Integer id) {
        return (Specification<Vehicle>) (root, cq, cb) -> cb.equal(root.join("personCertificates").join("id").get("refCertificate"),id);
    }

    private static Specification<Vehicle> withStatus(Integer id) {
        return (Specification<Vehicle>) (root, cq, cb) -> root.join("personStates").join("status").get("id").in(id);
    }

    private static Specification<Vehicle> hasWorkedInCompany(Integer id) {
        return (Specification<Vehicle>) (root, cq, cb) -> cb.equal(root.join("personExperiences").join("company").get("id"),id);
    }

    public static Specification<Vehicle> hasName(String name){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("name")), name.toLowerCase());
    }

    public static Specification<Vehicle> hasSurname1(String surname){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("surname1")), surname.toLowerCase());
    }

    public static Specification<Vehicle> hasDocument(String document){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("document")), document.toLowerCase());
    }

    public static Specification<Vehicle> hasEmail(String email){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("email")), email.toLowerCase());
    }

    public static Specification<Vehicle> hasSurname2(String surname){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.like(cb.lower(root.get("surname2")), surname.toLowerCase());
    }

    public static Specification<Vehicle> hasQualification(int id){
        return (Specification<Vehicle>) (root, cq, cb) -> cb.equal(root.join("personQualifications").join("id").get("refQualification"),id);
    }*/
}
