package merotracker.controller;

import merotracker.model.Vehicles;
import merotracker.service.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/vehicles",produces = { "application/hal+json" })
public class VehicleController {

    private final static Logger logger = LoggerFactory.getLogger(VehicleController.class);

    @Autowired
    private VehicleService service;

   /* @GetMapping("")
    public ResponseEntity<PagedResources<VehicleResource>> getAll(@RequestParam int page, @RequestParam int size, PagedResourcesAssembler<Vehicle> assembler) {

        System.out.println(assembler.toString());

        PagedResources<VehicleResource> resultPage = service.findPaginated(page, size);

        return ResponseEntity.ok().body(resultPage);

    }*/

    @GetMapping("/{id}")
    public ResponseEntity<Vehicles> getById(@PathVariable(value = "id") Integer vehicleId) {
        return ResponseEntity.ok().body(service.findById(vehicleId));
    }

   /* @GetMapping("with")
    public ResponseEntity<List<Vehicle>> getWith(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "surname1", required = false) String surname1,
            @RequestParam(value = "surname2", required = false) String surname2,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "email", required = false) String document,
            @RequestParam(value = "languages", required = false) List<String> languages,
            @RequestParam(value = "qualifications", required = false) List<Integer> qualifications,
            @RequestParam(value = "certifications", required = false) List<Integer> certifications,
            @RequestParam(value = "certifications", required = false) List<Integer> companies,
            @RequestParam(value = "status", required = false) List<Integer> status)
            throws NotFoundException {

        List<Vehicle> person = service.findBySpecification(
                VehicleSpecifications.chainedSpecification(
                    name,
                    surname1,
                    surname2,
                    email,
                    document,
                    languages,
                    qualifications,
                    certifications,
                    companies,
                    status));

        return ResponseEntity.ok().body(person);
    }
    
    @PostMapping("")
    public Vehicle create(@Valid @RequestBody Vehicle person) {
        return service.create(person);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> update(@PathVariable(value = "id") Integer personId, @Valid @RequestBody Vehicle personDetails){
        final Vehicle updatedVehicle = service.update(personId, personDetails);
        return ResponseEntity.ok(updatedVehicle);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> delete(@PathVariable(value = "id") Integer personId){
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }*/
}