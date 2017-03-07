package cz.osu.pizzakaktus;

import cz.osu.pizzakaktus.services.AuthService;
import cz.osu.pizzakaktus.services.impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

/**
 * Created by e-myslivost-ACER on 7.3.2017.
 */
@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AuthManager extends GlobalAuthenticationConfigurerAdapter
{
    @Autowired
    AuthService authService;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.parentAuthenticationManager(authService::authenticate);
    }
}
