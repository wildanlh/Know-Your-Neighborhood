package com.lithan.knowyourneighborhood.repo;

import com.lithan.knowyourneighborhood.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Integer> {
@Query(value = "DELETE FROM store WHERE store_id = :store_id", nativeQuery = true)
  void deleteStore(@Param("store_id") int storeId);

@Query(value = "SELECT * FROM store WHERE "
        + "store_name LIKE '%' :keyword '%' "
        + "OR country LIKE '%' :keyword '%' "
        + "OR city LIKE '%' :keyword '%' ", nativeQuery = true)
List<Store> searchStore(@Param("keyword") String keyword);
}
