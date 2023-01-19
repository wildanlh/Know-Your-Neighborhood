package com.lithan.knowyourneighborhood.controller;

import com.lithan.knowyourneighborhood.entity.Store;
import com.lithan.knowyourneighborhood.model.StoreDto;
import com.lithan.knowyourneighborhood.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("")
    public List<Store> listStore() {

        return storeService.listStore();
    }

    @PostMapping("/add")
    public StoreDto addStore(@RequestBody StoreDto storeDto) {

        StoreDto newStore = storeService.addStore(storeDto);

        return newStore;
    }

    @GetMapping("/{storeId}")
    public StoreDto getStoreById(@PathVariable("storeId") int storeId) {
        Store store = storeService.getStoreById(storeId);

        return new StoreDto(store);
    }

    @PutMapping("/edit")
    public StoreDto editStore(@RequestBody StoreDto storeDto) {
        Store store = storeService.editStore(storeDto);

        return new StoreDto(store);
    }

    @GetMapping(value = "", params = "keyword")
    public List<Store> searchStore(@RequestParam("keyword") String keyword) {

        return storeService.searchStore(keyword);
    }

}