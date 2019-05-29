package merotracker.controller;

import merotracker.model.User;
import merotracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RepositoryRestController
@CrossOrigin
public class UserController {

    @Autowired
	private UserRepository repo;
    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/users")
	public void saveUsuario(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		repo.save(user);
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
