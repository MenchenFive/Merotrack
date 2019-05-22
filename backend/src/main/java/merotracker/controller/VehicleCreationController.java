package merotracker.controller;

import merotracker.model.Vehicle;
import merotracker.repository.VehiclePositionRepository;
import merotracker.repository.VehicleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Random;


@RepositoryRestController
//@RequestMapping(value = "/vehicles")
public class VehicleCreationController {

    private final static Logger logger = LoggerFactory.getLogger(VehicleCreationController.class);

    @Autowired
    private VehiclePositionRepository repository;
    @Autowired
    private VehicleRepository vehicleRepository;

    // example: ?latitude=3859.795314&longitude=-355.488458&altitude=689&time=20190504230523&satellites=14&speedOTG=&course=335.180481&vehicle=OraP37mHQ6SX4ZQP&sum=fbc2a37cf2bb19ef8c6d739682de7a4a
    // hash: lat, lon, date, public, private
    @PostMapping("/vehicles")
    public ResponseEntity<?> create (@RequestBody Vehicle v) {
        v.setPrivateId(generateRandomString());
        v.setPublicId(generateRandomString());
        return ResponseEntity.ok(vehicleRepository.save(v));
    }

    public String generateRandomString(){
        int leftLimit = 97;
        int rightLimit = 122;
        int targetStringLength = 16;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int)
                    (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }
        String generatedString = buffer.toString();
        return generatedString;
    }

}