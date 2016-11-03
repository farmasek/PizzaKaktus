package cz.osu.pizzakaktus.endpoints.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
public class CategoryDTO {

    private String name;
}
