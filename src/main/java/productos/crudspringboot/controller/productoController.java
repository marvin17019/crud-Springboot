package productos.crudspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import productos.crudspringboot.entity.Producto;
import productos.crudspringboot.service.productoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/productos")
public class productoController {
    @Autowired
    private final productoService productoService;

    public productoController(productoService service) {
        this.productoService = service;
    }
    @GetMapping
    public List<Producto> getAll(){
        return productoService.getAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getById(@PathVariable int id){
        return productoService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public Producto createEmpleado(@RequestBody Producto empleado){
        return productoService.save(empleado);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateEmpleado(@PathVariable Long id,@RequestBody Producto empleado){
        if (productoService.getById(id.intValue()).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        empleado.setId(id);
        return ResponseEntity.ok(productoService.update(empleado));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Integer id){
        if (productoService.getById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
