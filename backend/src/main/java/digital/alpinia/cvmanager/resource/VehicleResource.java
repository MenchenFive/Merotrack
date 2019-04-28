package digital.alpinia.cvmanager.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleResource extends ResourceSupport {
     private String name;
     private String surname1;
     private String surname2;
     private String phone1;
     private String phone2;
     private String address;
     private String email;
}
