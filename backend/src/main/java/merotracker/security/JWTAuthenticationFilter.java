package merotracker.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import merotracker.model.User;
import merotracker.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static merotracker.security.Constants.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authenticationManager;
	private UserRepository repo;

	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserRepository repo) {
		this.authenticationManager = authenticationManager;
		this.repo = repo;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			User authUser = new ObjectMapper().readValue(request.getInputStream(), User.class);

			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authUser.getEmail(), authUser.getPassword(), new ArrayList<>()));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		User u = repo.findByEmail(((UserDetails)auth.getPrincipal()).getUsername()).get();
		u.setPassword(null);

		Map m = new HashMap<String, String>();
		m.put("permissions",String.valueOf(u.getRole()));

		String token = Jwts.builder()
				.setIssuedAt(new Date())
				.setIssuer(ISSUER_INFO)
				.setSubject(u.getEmail())
				.setId(String.valueOf(u.getId()))
				.addClaims(m)
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SUPER_SECRET_KEY).compact();

		response.addHeader(HEADER_AUTHORIZACION_KEY, TOKEN_BEARER_PREFIX + " " + token);
		response.addHeader("Content-type", "application/json" + " " + token);
		response.getWriter().write("{ \"token\":\""+TOKEN_BEARER_PREFIX+token+"\"}");
		response.getWriter().flush();
		response.getWriter().close();
	}
}
