package com.lithan.knowyourneighborhood.model;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileDto {
    @NotBlank
    private int userId;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @NotBlank
    private String phoneNumber;
}
