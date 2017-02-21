package cz.osu.pizzakaktus.endpoints.models;

import lombok.*;

/**
 * Created by baranvoj on 2/21/2017.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorDTO {
    private String message;
}
