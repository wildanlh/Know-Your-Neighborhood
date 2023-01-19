package com.lithan.knowyourneighborhood.repo;

import com.lithan.knowyourneighborhood.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    public Optional<UserAccount> findByEmail(String email);

    Boolean existsByEmail(String email);
}
