package merotracker.security;

import merotracker.model.User;
import merotracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
	private UserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User u = repo.findByEmail(email).orElseThrow( () -> new UsernameNotFoundException(email) );
		//GrantedAuthority ga = new SimpleGrantedAuthority();
        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPassword(),emptyList());
	}
}
