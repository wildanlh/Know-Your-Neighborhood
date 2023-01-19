package com.lithan.knowyourneighborhood.oauth2;

import com.lithan.knowyourneighborhood.entity.EAuthProvider;
import com.lithan.knowyourneighborhood.entity.ERole;
import com.lithan.knowyourneighborhood.entity.Roles;
import com.lithan.knowyourneighborhood.entity.UserAccount;
import com.lithan.knowyourneighborhood.exception.OAuth2AuthenticationProcessingException;
import com.lithan.knowyourneighborhood.oauth2.user.OAuth2UserInfo;
import com.lithan.knowyourneighborhood.oauth2.user.OAuth2UserInfoFactory;
import com.lithan.knowyourneighborhood.repo.RolesRepository;
import com.lithan.knowyourneighborhood.repo.UserAccountRepository;
import com.lithan.knowyourneighborhood.security.UserPrincipal;
import com.lithan.knowyourneighborhood.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Optional;

@Service
public class OAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserAccountRepository userRepository;

    @Autowired
    private RolesRepository rolesRepo;

    @Autowired
    private UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the
            // OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory
                .getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<UserAccount> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());

        UserAccount user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider()
                    .equals(EAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private UserAccount registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        UserAccount user = new UserAccount();

        user.setProvider(EAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());

        Roles role = rolesRepo.findByName(ERole.ROLE_USER);

        if (role == null) {
            role = userService.createRole(ERole.ROLE_USER);
        }

        user.setRoles(Arrays.asList(role));

        return userRepository.save(user);
    }

    private UserAccount updateExistingUser(UserAccount existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }
}
