package merotracker.security;

public class Constants {

	// Spring Security
	public static final String LOGIN_URL = "/login";
	public static final String HEADER_AUTHORIZACION_KEY = "Authorization";
	public static final String TOKEN_BEARER_PREFIX = "Bearer ";

	// JWT
	public static final String ISSUER_INFO = "merotracker";
	public static final String SUPER_SECRET_KEY = "597133743677397A24432646294A404D635166546A576E5A7234753778214125442A472D4B6150645267556B58703273357638792F423F4528482B4D62516554"; //allkeysgenerator.com
	public static final long TOKEN_EXPIRATION_TIME = 32_400_000; // 9 hours

}
