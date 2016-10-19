package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by baranvoj on 19.10.2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class IngredientDTO {

    private String name;
    private Integer weight;
}
