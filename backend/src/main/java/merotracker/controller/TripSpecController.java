package merotracker.controller;

import merotracker.model.Trip;
import merotracker.model.projections.TripProjection;
import merotracker.repository.TripRepository;
import merotracker.specification.TripSpecificatinos;
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
public class TripSpecController {

    @Autowired
    private TripRepository repo;

    @Autowired
    private PagedResourcesAssembler<TripProjection.withVehicle> assembler;

    @Autowired
    private ProjectionFactory factory;

    @GetMapping(value = "/trips/specificationquery")
    public @ResponseBody
    ResponseEntity<?> getAdresss(
            Pageable pageable,
            @RequestParam(value = "vehicle" , required = false) String vehicle,
            @RequestParam(value = "description" , required = false) String description
    ) {
        Specification<Trip> spec = TripSpecificatinos.chainedSpecification(description,vehicle);

        Page<Trip> found = repo.findAll(spec, pageable);

        Page<TripProjection.withVehicle> projected = found.map(l -> factory.createProjection(TripProjection.withVehicle.class, l));

        PagedResources<Resource<TripProjection.withVehicle>> resources = assembler.toResource(projected);

        resources.add(linkTo(methodOn(TripSpecController.class).getAdresss(
                pageable,
                vehicle,
                description
        )).withSelfRel());

        return ResponseEntity.ok(resources);
    }

}

