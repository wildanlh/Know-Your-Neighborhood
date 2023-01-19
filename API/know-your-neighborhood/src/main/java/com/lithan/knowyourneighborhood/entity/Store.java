package com.lithan.knowyourneighborhood.entity;


import com.lithan.knowyourneighborhood.model.StoreDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private int storeId;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String storeEmail;

    @Column(nullable = false)
    private String phoneNumber;

    private String description;

    @Lob
    private String imageUrl;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserAccount user;

    public Store(StoreDto storeDto, UserAccount user) {
        this.storeName = storeDto.getStoreName();
        this.country = storeDto.getCountry();
        this.city = storeDto.getCity();
        this.storeEmail = storeDto.getStoreEmail();
        this.phoneNumber = storeDto.getPhoneNumber();
        this.description = storeDto.getDescription();
        this.imageUrl = storeDto.getImageUrl();
        this.user = user;
    }
}
