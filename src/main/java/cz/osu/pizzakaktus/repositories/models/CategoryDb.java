package cz.osu.pizzakaktus.repositories.models;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Entity
@NoArgsConstructor
@Getter
public class CategoryDb {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;

    public CategoryDb(String name) {
        this.name = name;
    }

    public CategoryDb(CategoryDTO category) {
        this.name = category.getName();
    }
}
