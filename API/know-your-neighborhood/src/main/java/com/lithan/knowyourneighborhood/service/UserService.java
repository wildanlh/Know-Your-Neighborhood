package com.lithan.knowyourneighborhood.service;

import com.lithan.knowyourneighborhood.entity.ERole;
import com.lithan.knowyourneighborhood.entity.Roles;
import com.lithan.knowyourneighborhood.entity.UserAccount;
import com.lithan.knowyourneighborhood.model.EditProfileDto;
import com.lithan.knowyourneighborhood.model.UserDto;

import java.util.List;

public interface UserService {
    Roles createRole(ERole roleName);

    UserAccount findByEmail(String email);

    List<UserDto> listUser();

    UserAccount getById(int userId);

    UserAccount editProfile(EditProfileDto editProfileDto);
}
