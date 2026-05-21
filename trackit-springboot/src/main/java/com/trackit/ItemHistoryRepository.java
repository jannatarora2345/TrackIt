package com.trackit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemHistoryRepository {
    
    @Autowired
    private JdbcTemplate jdbc;

    public void logHistory(int itemId, String itemName, String action, String reporterName, String retrieverName, String performedBy) {
        String sql = "INSERT INTO item_history (item_id, item_name, action, timestamp, reporter_name, retriever_name, performed_by) VALUES (?, ?, ?, ?, ?, ?, ?)";
        String timestamp = java.time.LocalDate.now().toString();
        jdbc.update(sql, itemId, itemName, action, timestamp, reporterName, retrieverName, performedBy);
    }

    public List<ItemHistory> getHistoryByItemId(int itemId) {
        String sql = "SELECT * FROM item_history WHERE item_id = ? ORDER BY timestamp DESC";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(ItemHistory.class), itemId);
    }

    public List<ItemHistory> getAllHistory() {
        String sql = "SELECT * FROM item_history ORDER BY timestamp DESC";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(ItemHistory.class));
    }
}
