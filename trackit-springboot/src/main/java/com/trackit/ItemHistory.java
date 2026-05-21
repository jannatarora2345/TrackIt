
package com.trackit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "item_history")
public class ItemHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "item_id")
    private int itemId;

    @Column(name = "item_name", length = 100)
    private String itemName;

    @Column(name = "action", length = 255)
    private String action;
    
    @Column(name = "timestamp", length = 255)
    private String timestamp;

    @Column(name = "reporter_name", length = 100)
    private String reporterName;

    @Column(name = "retriever_name", length = 100)
    private String retrieverName;

    @Column(name = "performed_by", length = 100)
    private String performedBy;

    // Default constructor
    public ItemHistory() {}

    // Constructor with parameters
    public ItemHistory(int itemId, String itemName, String action, String timestamp, String reporterName, String retrieverName, String performedBy) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.action = action;
        this.timestamp = timestamp;
        this.reporterName = reporterName;
        this.retrieverName = retrieverName;
        this.performedBy = performedBy;
    }

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getItemId() { return itemId; }
    public void setItemId(int itemId) { this.itemId = itemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getReporterName() { return reporterName; }
    public void setReporterName(String reporterName) { this.reporterName = reporterName; }

    public String getRetrieverName() { return retrieverName; }
    public void setRetrieverName(String retrieverName) { this.retrieverName = retrieverName; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }
}