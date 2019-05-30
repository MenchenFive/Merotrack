package merotracker.controller;

import merotracker.model.Adress;
import merotracker.model.projections.AddressProjection;
import merotracker.repository.AddressRepository;
import merotracker.specification.AddressesSpecifications;
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
public class AddressSpecController {

    @Autowired
    private AddressRepository repo;

    @Autowired
    private PagedResourcesAssembler<AddressProjection.full> assembler;

    @Autowired
    private ProjectionFactory factory;

    @GetMapping(value = "/adresss/specificationquery")
    public @ResponseBody
    ResponseEntity<?> getAdresss(
            Pageable pageable,
            @RequestParam(value = "name" , required = false) String name
    ) {
        Specification<Adress> spec = AddressesSpecifications.hasName(name);

        Page<Adress> found = repo.findAll(spec, pageable);

        Page<AddressProjection.full> projected = found.map(l -> factory.createProjection(AddressProjection.full.class, l));

        PagedResources<Resource<AddressProjection.full>> resources = assembler.toResource(projected);

        resources.add(linkTo(methodOn(AddressSpecController.class).getAdresss(
                pageable,
                name
        )).withSelfRel());

        return ResponseEntity.ok(resources);
    }

}

