package me.zhulin.shopapi.repository;

import me.zhulin.shopapi.entity.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProductInfoRepository extends JpaRepository<ProductInfo, String> {
    ProductInfo findByProductId(String id);
    // prodotti onSale
    Page<ProductInfo> findAllByProductStatusOrderByProductIdAsc(Integer productStatus, Pageable pageable);

    // prodotti in una categoria
    Page<ProductInfo> findAllByCategoryTypeOrderByProductIdAsc(Integer categoryType, Pageable pageable);

    Page<ProductInfo> findAllByOrderByProductId(Pageable pageable);

    @Query("SELECT p FROM ProductInfo p WHERE LOWER(p.productName) LIKE LOWER(?1)")
    List<ProductInfo> findByProductNameLike(String productName);

    //-------
    @Query("SELECT p FROM ProductInfo p WHERE LOWER(p.productName) LIKE LOWER(?1)")
    Page<ProductInfo> findProductInfoByProductNameLike(Pageable pageable, String productName);
}
