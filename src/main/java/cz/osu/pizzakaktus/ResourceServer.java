package cz.osu.pizzakaktus;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * Created by Farmas on 11.03.2017.
 */
@Configuration
@EnableResourceServer
public class ResourceServer extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/category/add").permitAll()
                .antMatchers("/ingredient/add").permitAll()
                .antMatchers("/order/all-orders").permitAll()
                .antMatchers("/pizza/add").permitAll()
                .antMatchers("/pizza/update").permitAll()
                .and()
                .authorizeRequests().anyRequest().permitAll()
                .and().csrf().disable();
        ;
    }
}
