package merotracker.controller;

import merotracker.model.Vehicle;
import merotracker.model.projections.VehicleProjections;
import merotracker.repository.VehicleRepository;
import merotracker.specification.VehicleSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RepositoryRestController
public class VehicleSpecController {

    @Autowired
    private VehicleRepository repo;

    @Autowired
    private PagedResourcesAssembler<VehicleProjections.summary> assembler;

    @Autowired
    private ProjectionFactory factory;

    @GetMapping(value = "/vehicles/specificationquery")
    public @ResponseBody
    ResponseEntity<?> getVehicles(
            Pageable pageable,
            @RequestParam(value = "brand" , required = false) String brand,
            @RequestParam(value = "model" , required = false) String model,
            @RequestParam(value = "plate" , required = false) String plate
    ) {
        Specification<Vehicle> spec = VehicleSpecifications.chainedSpecification (
                brand,plate,model
        );

        Page<Vehicle> found = repo.findAll(spec, pageable);

        Page<VehicleProjections.summary> projected = found.map(l -> factory.createProjection(VehicleProjections.summary.class, l));

        PagedResources<Resource<VehicleProjections.summary>> resources = assembler.toResource(projected);

        resources.add(linkTo(methodOn(VehicleSpecController.class).getVehicles(
                pageable,
                brand,
                model,
                plate
        )).withSelfRel());

        return ResponseEntity.ok(resources);
    }

}

