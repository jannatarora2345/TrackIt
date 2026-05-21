package com.trackit;

import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", length = 100)
    private String name;
    
    @Column(name = "description", columnDefinition = "text")
    private String description;
    
    @Column(name = "status", length = 10)
    private String status;
    
    @Column(name = "reporter", length = 100)
    private String reporter;
    
    @Column(name = "date", length = 20)
    private String date;

    // Default constructor
    public Item() {}

    // Constructor with parameters
    public Item(String name, String description, String status, String reporter, String date) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.reporter = reporter;
        this.date = date;
    }

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReporter() { return reporter; }
    public void setReporter(String reporter) { this.reporter = reporter; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}