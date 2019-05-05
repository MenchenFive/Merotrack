package merotracker.controller;

import merotracker.model.Vehicle;
import merotracker.repository.VehicleRepository;
import net.bytebuddy.utility.RandomString;
import org.hibernate.validator.engine.HibernateConstraintViolation;
import org.omg.CosNaming.NamingContextPackage.NotFound;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.io.NotActiveException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "/api/vehicles",produces = { "application/hal+json" })
public class VehicleController {

    private final static Logger logger = LoggerFactory.getLogger(VehicleController.class);

    @Autowired
    private VehicleRepository repository;

    @GetMapping("")
    public ResponseEntity<?> getAll(Pageable pageable) {
        return ResponseEntity.ok().body(repository.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(value = "id") Integer id) {
        return ResponseEntity.ok().body(repository.findById(id).orElse(null));
    }
    
    @PostMapping("")
    public Vehicle create(@Valid @RequestBody Vehicle details) {
        details.setPrivateId(RandomString.make(16));
        details.setPublicId(RandomString.make(16));
        return repository.save(details);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") Integer id, @Valid @RequestBody Vehicle details){
        Vehicle vehicle = repository.findById(id).get();

        vehicle.setModel(details.getModel());
        vehicle.setPlate(details.getPlate());
        vehicle.setBrand(details.getBrand());

        return ResponseEntity.ok(repository.save(vehicle));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Integer id){
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        repository.delete(repository.findById(id).get());
        return ResponseEntity.ok(response);
    }
}