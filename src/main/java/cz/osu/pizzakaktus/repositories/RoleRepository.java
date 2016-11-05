package cz.osu.pizzakaktus.repositories;

import cz.osu.pizzakaktus.repositories.models.Role;
import org.springframework.stereotype.Repository;

/**
 * Created by Farmas on 05.11.2016.
 */
@Repository
public interface RoleRepository extends org.springframework.data.repository.Repository<Role, Integer> {

    Role findByRole(String role);

}
