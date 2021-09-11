package com.example.compras_ms.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "Compra")
public class Compra {

    @Transient
    public static final String SEQUENCE_NAME = "compra_sequence";
    @Id
    private long id;
    private String usuarioName;
    private long usuarioId;

    private Double subtotal;
    private Double total;
    private Date marcaTiempo;
    private ArrayList<Producto> productos;

    public Compra(String usuarioName, long usuarioId, Double subtotal, Double total, Date marcaTiempo, ArrayList<Producto> productos) {
        this.usuarioName = usuarioName;
        this.usuarioId = usuarioId;
        this.subtotal = subtotal;
        this.total = total;
        this.marcaTiempo = marcaTiempo;
        this.productos = productos;
    }

    public long getId() {
        return id;
    }

    public void setId(long compraId) {
        this.id = compraId;
    }

    public String getUsuarioName() {
        return usuarioName;
    }

    public void setUsuarioName(String usuarioName) {
        this.usuarioName = usuarioName;
    }

    public long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal() {
        this.total = this.getSubtotal()*1.19;
    }

    public Date getMarcaTiempo() {
        return marcaTiempo;
    }

    public void setMarcaTiempo(Date marcaTiempo) {
        this.marcaTiempo = marcaTiempo;
    }

    public ArrayList<Producto> getProductos() {
        return productos;
    }

    public void setProductos(ArrayList<Producto> productos) {
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Compra [id:" + this.getId() + ", Nombre:" + this.getUsuarioName() + ", Id Usuario:" + this.getUsuarioId() + ", Total antes de iva:" + this.getSubtotal() +
                ", Total despues de iva:" + this.getTotal() + ", Fecha transaccion:" + this.getMarcaTiempo() + ", Productos:" + this.getProductos() +"]";
    }
}