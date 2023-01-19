package com.lithan.knowyourneighborhood.service;

import com.lithan.knowyourneighborhood.entity.Store;
import com.lithan.knowyourneighborhood.model.StoreDto;

import java.util.List;

public interface StoreService {
    List<Store> listStore();

    Store getStoreById(int storeId);

    StoreDto addStore(StoreDto storeDto);

    Store editStore(StoreDto storeDto);

    List<Store> searchStore(String keyword);
}
