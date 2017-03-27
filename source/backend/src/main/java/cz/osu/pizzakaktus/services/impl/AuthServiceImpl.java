package cz.osu.pizzakaktus.services.impl;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.endpoints.mappers.MapToDTO;
import cz.osu.pizzakaktus.endpoints.models.UserDTO;
import cz.osu.pizzakaktus.repositories.UserRepository;
import cz.osu.pizzakaktus.repositories.models.Role;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import cz.osu.pizzakaktus.services.AuthService;
import cz.osu.pizzakaktus.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * Created by e-myslivost-ACER on 6.3.2017.
 */
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Override
    public Authentication authenticate(Authentication sourceAuthentication) {
        String login = sourceAuthentication.getPrincipal().toString();
        String password = sourceAuthentication.getCredentials().toString();

        List<UserDb> users = userRepository.findByLogin(login);

        UserDb user = users.get(0);
        MapToDTO m = new MapToDTO();
        UserDTO userDTO = m.mapUser(user);
        if (user!=null && user.isActive())
        {
            Collection<GrantedAuthority> collection =  new ArrayList<GrantedAuthority>();

           for (String role : userDTO.getRoles())
            {
                collection.add(new SimpleGrantedAuthority("ROLE_" + role));
            }

            boolean islogged = userService.checkPassword(password,user.getPasswordHash());
            if(islogged)
            {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        new Gson().toJson(user),password,collection);
                usernamePasswordAuthenticationToken.setDetails(user);

                return usernamePasswordAuthenticationToken;
            }
            sourceAuthentication.setAuthenticated(false);
            return  sourceAuthentication;

        }else
        {
            sourceAuthentication.setAuthenticated(false);
            return  sourceAuthentication;
        }
    }
}
