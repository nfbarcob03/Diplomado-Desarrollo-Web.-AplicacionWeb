package com.example.compras_ms.repositories;

        import com.example.compras_ms.models.Compra;
        import org.springframework.data.mongodb.repository.MongoRepository;
        import org.springframework.stereotype.Repository;

        import java.util.List;

@Repository
public interface ComprasRepository extends MongoRepository<Compra, Long> {
    List<Compra> findByUsuarioId (long userIdOrigin);
}
