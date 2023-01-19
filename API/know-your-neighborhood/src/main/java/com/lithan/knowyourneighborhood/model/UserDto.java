package com.lithan.knowyourneighborhood.model;

import com.lithan.knowyourneighborhood.entity.UserAccount;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int userId;

    private String name;

    private String email;

    private String imageUrl;

    private String address;

    private String phoneNumber;

    private String provider;

    public UserDto(UserAccount user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.imageUrl = user.getImageUrl();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.provider = user.getProvider().toString();
    }
}
