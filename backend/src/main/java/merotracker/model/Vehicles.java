package merotracker.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Vehicles {
    private String brand;
    private String model;
    private String plate;
    private String publicId;
    private String privateId;
    private int id;

    @Basic
    @Column(name = "brand", nullable = false, length = 32)
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Basic
    @Column(name = "model", nullable = false, length = 32)
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Basic
    @Column(name = "plate", nullable = false, length = 7)
    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    @Basic
    @Column(name = "public_id", nullable = false, length = 16)
    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    @Basic
    @Column(name = "private_id", nullable = false, length = 16)
    public String getPrivateId() {
        return privateId;
    }

    public void setPrivateId(String privateId) {
        this.privateId = privateId;
    }

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicles vehicles = (Vehicles) o;
        return id == vehicles.id &&
                Objects.equals(brand, vehicles.brand) &&
                Objects.equals(model, vehicles.model) &&
                Objects.equals(plate, vehicles.plate) &&
                Objects.equals(publicId, vehicles.publicId) &&
                Objects.equals(privateId, vehicles.privateId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(brand, model, plate, publicId, privateId, id);
    }
}
