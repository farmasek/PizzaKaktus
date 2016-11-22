package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class PizzaDTO {
    private Integer id;
    private String title;
    private Integer categoryId;
    private List<Integer> ingredientsId;
    private Double price;
    private boolean active;
}
