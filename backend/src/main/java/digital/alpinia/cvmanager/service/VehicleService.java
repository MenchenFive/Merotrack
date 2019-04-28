package digital.alpinia.cvmanager.service;

import digital.alpinia.cvmanager.model.Vehicle;
import digital.alpinia.cvmanager.repository.VehicleRepository;
import digital.alpinia.cvmanager.resource.VehicleResource;
import digital.alpinia.cvmanager.resource.assembler.VehicleAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

	@Autowired
	private VehicleAssembler personAssembler;
	@Autowired
	private PagedResourcesAssembler<Vehicle> assembler;
	@Autowired
	private VehicleRepository repository;

	public PagedResources<VehicleResource> findPaginated(int pageNum, int sizeNum) {

		Page<Vehicle> page = repository.findAll(PageRequest.of(pageNum, sizeNum));

		PagedResources<VehicleResource> pagedResources = assembler.toResource(page,personAssembler);

		return pagedResources;
	}

	public Vehicle findById(Integer id) {
		return repository.findById(id).orElse(null);
	}

	public Vehicle save(Vehicle p) {
		return repository.save(p);
	}

	public Vehicle update(Integer id, Vehicle p) {
		Vehicle person = repository.findById(id)
				.orElse(null);

		if ( person != null ){
			//p.setId(id);
			person = repository.save(p);
		}

		return person;
	}

	public void delete(Integer id) {
		repository.deleteById(id);
	}

	public List<Vehicle> findBySpecification(Specification<Vehicle> spec) {
		return repository.findAll(spec);
	}

}
