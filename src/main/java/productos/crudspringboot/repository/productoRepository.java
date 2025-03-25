package productos.crudspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import productos.crudspringboot.entity.Producto;

@Repository
public interface productoRepository extends JpaRepository<Producto, Integer> {
}
