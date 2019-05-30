package merotracker.controller;

import merotracker.model.User;
import merotracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RepositoryRestController
public class UserController {

    @Autowired
	private UserRepository repo;
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/users/register")
	public ResponseEntity<?> saveUsuario(@RequestBody User user) {
		System.out.println("REGISTER");
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		repo.save(user);
		return ResponseEntity.ok(null);
	}

	/*@GetMapping("/users/")
	public List<User> getAllUsuarios() {
		return repo.findAll();
	}

	@GetMapping("/users/{username}")
	public User getUsuario(@PathVariable String username) {
		return repo.findByEmail(username);
	}*/
}
