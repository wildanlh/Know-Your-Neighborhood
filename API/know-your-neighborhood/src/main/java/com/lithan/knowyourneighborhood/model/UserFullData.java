package com.lithan.knowyourneighborhood.model;

import com.lithan.knowyourneighborhood.entity.Store;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserFullData {
    private UserDto profile;

    private List<Store> stores;

    private List<String> roles;
}
