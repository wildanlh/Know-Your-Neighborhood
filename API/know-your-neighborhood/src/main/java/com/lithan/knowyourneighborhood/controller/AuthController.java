package com.lithan.knowyourneighborhood.controller;

import com.lithan.knowyourneighborhood.entity.EAuthProvider;
import com.lithan.knowyourneighborhood.entity.ERole;
import com.lithan.knowyourneighborhood.entity.Roles;
import com.lithan.knowyourneighborhood.entity.UserAccount;
import com.lithan.knowyourneighborhood.model.ApiResponse;
import com.lithan.knowyourneighborhood.model.AuthResponse;
import com.lithan.knowyourneighborhood.model.LoginDto;
import com.lithan.knowyourneighborhood.model.RegisterDto;
import com.lithan.knowyourneighborhood.repo.RolesRepository;
import com.lithan.knowyourneighborhood.repo.UserAccountRepository;
import com.lithan.knowyourneighborhood.security.JWTGenerator;
import com.lithan.knowyourneighborhood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserAccountRepository userRepo;

    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Login
    @PostMapping("login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }

    // Register
    @PostMapping("register")
    public ResponseEntity<?> addUser(@Valid @RequestBody RegisterDto registerDto) throws Exception {

        if (userRepo.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        UserAccount user = new UserAccount();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setAddress(registerDto.getAddress());
        user.setPhoneNumber(registerDto.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setProvider(EAuthProvider.local);

        Roles role = rolesRepo.findByName(ERole.ROLE_USER);
        if (role == null) {
            role = userService.createRole(ERole.ROLE_USER);
        }
        user.setRoles(Arrays.asList(role));

        UserAccount newUser = userRepo.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("api/users/me")
                .buildAndExpand(newUser.getUserId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));

    }
}

