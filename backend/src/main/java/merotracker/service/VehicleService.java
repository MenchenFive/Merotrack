package merotracker.service;

import merotracker.model.Vehicles;
import merotracker.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleService {

	@Autowired
	private VehicleRepository repository;

	/*public PagedResources<VehicleResource> findPaginated(int pageNum, int sizeNum) {

		Page<Vehicle> page = repository.findAll(PageRequest.of(pageNum, sizeNum));

		PagedResources<VehicleResource> pagedResources = assembler.toResource(page,personAssembler);

		return pagedResources;
	}*/

	public Vehicles findById(Integer id) {
		return repository.findById(id).orElse(null);
	}

	/*public Vehicle save(Vehicle p) {
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
	}*/

}
