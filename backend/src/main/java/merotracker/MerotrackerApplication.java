package digital.alpinia.cvmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CvmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CvmanagerApplication.class, args);
	}

	/*@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
		ObjectMapper objectMapper = jsonConverter.getObjectMapper();
		objectMapper.registerModule(new Hibernate5Module());

		return jsonConverter;
	}*/


}
