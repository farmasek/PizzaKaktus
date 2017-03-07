package cz.osu.pizzakaktus.services.impl;

import com.google.gson.Gson;
import cz.osu.pizzakaktus.repositories.models.Role;
import cz.osu.pizzakaktus.repositories.models.UserDb;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by e-myslivost-ACER on 7.3.2017.
 */
public class CustomUserDetailService implements UserDetailsService
{

    @Override
    public UserDetails loadUserByUsername(String user) throws UsernameNotFoundException {
        UserDb userDb = new Gson().fromJson(user, UserDb.class);

        Collection<GrantedAuthority> collection =  new ArrayList<GrantedAuthority>();

        for (Role role : userDb.getRoles())
        {
            collection.add(new SimpleGrantedAuthority("ROLE_" + role.getRole()));
        }

        return new User(
             user,
             "[protected]",
                true,
                true,
                true,
                true,
                collection);
    }
}
