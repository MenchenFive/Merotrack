package merotracker.controller;

import merotracker.model.User;
import merotracker.model.projections.UserProjection;
import merotracker.repository.UserRepository;
import merotracker.specification.UserSpecifications;
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
public class UserSpecController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PagedResourcesAssembler<UserProjection.noPassword> assembler;

    @Autowired
    private ProjectionFactory factory;

    @GetMapping(value = "/users/specificationquery")
    public @ResponseBody
    ResponseEntity<?> getAdresss(
            Pageable pageable,
            @RequestParam(value = "email" , required = false) String email,
            @RequestParam(value = "rol" , required = false) String rol,
            @RequestParam(value = "name" , required = false) String name
    ) {
        Specification<User> spec = UserSpecifications.chainedSpecification(email,name,rol);

        Page<User> found = repo.findAll(spec, pageable);

        Page<UserProjection.noPassword> projected = found.map(l -> factory.createProjection(UserProjection.noPassword.class, l));

        PagedResources<Resource<UserProjection.noPassword>> resources = assembler.toResource(projected);

        resources.add(linkTo(methodOn(UserSpecController.class).getAdresss(
                pageable,
                email,
                rol,
                name
        )).withSelfRel());

        return ResponseEntity.ok(resources);
    }

}

