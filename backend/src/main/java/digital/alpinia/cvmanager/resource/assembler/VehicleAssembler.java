package digital.alpinia.cvmanager.resource.assembler;

import digital.alpinia.cvmanager.controller.VehicleController;
import digital.alpinia.cvmanager.model.Vehicle;
import digital.alpinia.cvmanager.resource.VehicleResource;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class VehicleAssembler extends ResourceAssemblerSupport<Vehicle, VehicleResource> {
    
    public VehicleAssembler() {
        super(VehicleController.class, VehicleResource.class);
    }

    @Override
    public VehicleResource toResource(Vehicle p) {

        VehicleResource pr = createResourceWithId(p.getId(), p); // Adds a 'SELF' link

        pr.setName(p.getName());
        pr.setSurname1(p.getSurname1());
        pr.setSurname2(p.getSurname2());
        pr.setEmail(p.getEmail());
        pr.setAddress(p.getAddress());
        pr.setPhone1(p.getPhone1());
        pr.setPhone2(p.getPhone2());

        pr.add(linkTo(methodOn(VehicleController.class).getById(p.getId())).withSelfRel());

        return pr;
    }
}