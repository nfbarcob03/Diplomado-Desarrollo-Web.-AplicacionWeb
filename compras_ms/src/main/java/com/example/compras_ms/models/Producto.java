package com.example.compras_ms.models;

public class Producto {
    private int id;
    private String name;
    private String unit_measurement;
    private String description;
    private int category;
    private int quantity;
    private double precio_unitario;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getUnit_measurement() {
        return unit_measurement;
    }

    public void setUnit_measurement(String unit_measurement) {
        this.unit_measurement = unit_measurement;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrecio_unitario() {
        return precio_unitario;
    }

    public void setPrecio_unitario(double precio_unitario) {
        this.precio_unitario = precio_unitario;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }
}
