package merotracker.controller;

import merotracker.model.VehicleIncidence;
import merotracker.model.projections.VehicleIncidenceProjection;
import merotracker.repository.VehicleIncidenceRepository;
import merotracker.specification.IncidenceSpecifications;
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
public class IncidenceSpecController {

    @Autowired
    private VehicleIncidenceRepository repo;

    @Autowired
    private PagedResourcesAssembler<VehicleIncidenceProjection.full> assembler;

    @Autowired
    private ProjectionFactory factory;

    @GetMapping(value = "/vehicleIncidences/specificationquery")
    public @ResponseBody
    ResponseEntity<?> getIncidences(
            Pageable pageable,
            @RequestParam(value = "title" , required = false) String title,
            @RequestParam(value = "vehicle" , required = false) String plate
    ) {
        Specification<VehicleIncidence> spec = IncidenceSpecifications.chainedSpecification (
                title,
                plate
        );

        Page<VehicleIncidence> found = repo.findAll(spec, pageable);

        Page<VehicleIncidenceProjection.full> projected = found.map(l -> factory.createProjection(VehicleIncidenceProjection.full.class, l));

        PagedResources<Resource<VehicleIncidenceProjection.full>> resources = assembler.toResource(projected);

        resources.add(linkTo(methodOn(IncidenceSpecController.class).getIncidences(
                pageable,
                title,
                plate
        )).withSelfRel());

        return ResponseEntity.ok(resources);
    }

}

