package cz.osu.pizzakaktus.endpoints.models;

import lombok.*;

import java.util.List;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PizzaDTO {
    private Integer id;
    private String title;
    private Integer categoryId;
    private List<Integer> ingredientsId;
    private Double price;
    private boolean active;
}
