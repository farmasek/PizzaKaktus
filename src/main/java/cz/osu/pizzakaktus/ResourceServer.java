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
        http.antMatcher("/user/**")
                .antMatcher("/category/add")
                .antMatcher("/ingredient/add")
                .antMatcher("/order/all-orders")
                .antMatcher("/pizza/add")
                .antMatcher("/pizza/update")
                .authorizeRequests()
                .anyRequest().authenticated()
                .and().csrf().disable();
        ;
    }
}
