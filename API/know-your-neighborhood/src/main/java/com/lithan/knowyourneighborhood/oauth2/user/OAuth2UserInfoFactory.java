package com.lithan.knowyourneighborhood.oauth2.user;

import com.lithan.knowyourneighborhood.entity.EAuthProvider;
import com.lithan.knowyourneighborhood.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(EAuthProvider.facebook.toString())) {
            return new FacebookOAuth2UserInfo(attributes);

        } else {
            throw new OAuth2AuthenticationProcessingException(
                    "Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
