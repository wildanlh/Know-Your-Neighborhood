package com.lithan.knowyourneighborhood;

import com.lithan.knowyourneighborhood.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class KnowYourNeighborhoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnowYourNeighborhoodApplication.class, args);
	}

}
