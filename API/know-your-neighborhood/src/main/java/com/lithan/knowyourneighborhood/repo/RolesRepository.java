package com.lithan.knowyourneighborhood.repo;

import com.lithan.knowyourneighborhood.entity.ERole;
import com.lithan.knowyourneighborhood.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByName(ERole roleName);
}
