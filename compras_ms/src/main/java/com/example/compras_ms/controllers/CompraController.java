package com.example.compras_ms.controllers;

import java.text.SimpleDateFormat;
import java.util.*;


import com.example.compras_ms.models.Producto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.compras_ms.exceptions.CompraNotFoundException;
import com.example.compras_ms.models.Compra;
import com.example.compras_ms.repositories.ComprasRepository;
import java.io.IOException;

import com.example.compras_ms.services.SequenceGeneratorService;

@RestController
public class CompraController {

    public CompraController(ComprasRepository comprasRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.comprasRepository = comprasRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    private final ComprasRepository comprasRepository;
    private SequenceGeneratorService sequenceGeneratorService;

    @GetMapping("/compras")
    public List < Compra > getAllCompras() {
        return comprasRepository.findAll();
    }

    @GetMapping("/compras/{id}")
    public ResponseEntity< Compra > getCompraById(@PathVariable(value = "id") Long compraId)
            throws CompraNotFoundException {
        Compra compra = this.comprasRepository.findById(compraId).orElse(null);
        if(compra ==null){
            throw new CompraNotFoundException("La compra con el siguiente id no fue encontrada. id :: " + compraId);
        }
        return ResponseEntity.ok().body(compra);
    }

    @PostMapping("/compras")
    public Compra newCompra(@RequestBody Compra CompraFront) throws IOException {
        Date date = new Date();
        Double subtotal =0.0;
        for (Producto producto : CompraFront.getProductos()){
            subtotal += producto.getPrecio_unitario()* producto.getQuantity();
        }
        CompraFront.setSubtotal(subtotal);
        CompraFront.setId(sequenceGeneratorService.generateSequence(Compra.SEQUENCE_NAME));
        CompraFront.setMarcaTiempo(date);
        CompraFront.setTotal();
        return this.comprasRepository.save(CompraFront);
    }

    @PutMapping("/compras/{id}")
    public ResponseEntity < Compra > updateCompra(@PathVariable(value = "id") long compraId,
                                                       @RequestBody Compra CompraFront) throws CompraNotFoundException {
        Date date = new Date();
        Compra compra = comprasRepository.findById(compraId)
                .orElseThrow(() -> new CompraNotFoundException("La compra con el siguiente id no fue encontrada. id ::" + compraId));

        compra.setUsuarioName(CompraFront.getUsuarioName());
        compra.setSubtotal(CompraFront.getSubtotal());
        compra.setTotal();
        compra.setMarcaTiempo(date);
        compra.setProductos(CompraFront.getProductos());
        final Compra updatedCompra = comprasRepository.save(compra);
        return ResponseEntity.ok(updatedCompra);
    }

    @DeleteMapping("/compras/{id}")
    public Map< String, Boolean > deleteEmployee(@PathVariable(value = "id") long compraId)
            throws CompraNotFoundException {
        Compra compra = comprasRepository.findById(compraId)
                .orElseThrow(() -> new CompraNotFoundException("Employee not found for this id :: " + compraId));

        comprasRepository.delete(compra);
        Map < String, Boolean > response = new HashMap< >();
        response.put("Eliminado", Boolean.TRUE);
        return response;
    }


}
