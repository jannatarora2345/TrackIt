package com.trackit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemRepository {   

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private ItemHistoryRepository historyRepository;

    public List<Item> findAll() {
        return jdbc.query("SELECT * FROM items ORDER BY id DESC", new BeanPropertyRowMapper<>(Item.class));
    }

    public Item save(Item item, String performedBy) {
        String sql = "INSERT INTO items (name, description, status, reporter, date) VALUES (?, ?, ?, ?, ?) RETURNING *";
        Item savedItem = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Item.class),
                item.getName(), item.getDescription(), item.getStatus(), item.getReporter(), item.getDate());

        // Log the initial action based on status
        if ("found".equalsIgnoreCase(savedItem.getStatus())) {
            historyRepository.logHistory(savedItem.getId(), savedItem.getName(), 
                "Item reported as found", savedItem.getReporter(), null, performedBy);
        } else {
            historyRepository.logHistory(savedItem.getId(), savedItem.getName(), 
                "Item reported as lost", savedItem.getReporter(), null, performedBy);
        }
        return savedItem;
    }

    public Item updateStatus(int id, String status, String performedBy) {
        String sql = "UPDATE items SET status = ? WHERE id = ? RETURNING *";
        Item updatedItem = jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(Item.class), status, id);

        if ("retrieved".equalsIgnoreCase(status)) {
            historyRepository.logHistory(id, updatedItem.getName(), 
                "Item marked as retrieved", updatedItem.getReporter(), performedBy, performedBy);
        } else {
            historyRepository.logHistory(id, updatedItem.getName(), 
                "Status updated to " + status, updatedItem.getReporter(), null, performedBy);
        }
        return updatedItem;
    }

    public void delete(int id, String performedBy) {
        // Get item details before deleting
        String selectSql = "SELECT * FROM items WHERE id = ?";
        Item item = jdbc.queryForObject(selectSql, new BeanPropertyRowMapper<>(Item.class), id);
        
        historyRepository.logHistory(id, item.getName(), 
            "Item deleted", item.getReporter(), null, performedBy);
        jdbc.update("DELETE FROM items WHERE id = ?", id);
    }

    public List<ItemHistory> getHistory(int itemId) {
        return historyRepository.getHistoryByItemId(itemId);
    }

    public List<ItemHistory> getAllHistory() {
        return historyRepository.getAllHistory();
    }
}