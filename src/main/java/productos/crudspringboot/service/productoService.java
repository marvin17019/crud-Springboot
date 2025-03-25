package productos.crudspringboot.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import productos.crudspringboot.entity.Producto;
import productos.crudspringboot.repository.productoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class productoService {
    @Autowired
    private final productoRepository productoRepository;

    public productoService(productoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
    public List<Producto> getAll() {
        List<Producto> empleados = productoRepository.findAll();
        return empleados;
    }
    public Optional<Producto> getById(int id){
        return productoRepository.findById(id);
    }
    public Producto save(Producto empleado){
        return productoRepository.save(empleado);
    }
    public Producto update(Producto empleado){
        return productoRepository.save(empleado);
    }
    public void delete(int id){
        productoRepository.deleteById(id);
    }
}
