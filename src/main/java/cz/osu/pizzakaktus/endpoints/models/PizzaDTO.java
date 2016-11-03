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

    private String title;
    private String category;
    private List<Integer> ingredientsId;
}
