package cz.osu.pizzakaktus.services;

import org.springframework.security.core.Authentication;

/**
 * Created by e-myslivost-ACER on 6.3.2017.
 */
public interface AuthService {

    public Authentication authenticate(Authentication authentication);
}
