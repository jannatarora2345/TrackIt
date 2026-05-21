package com.trackit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @PostMapping("/")
    public Map<String, Object> add(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new java.util.HashMap<>();
        
        try {
            String token = (String) request.get("token");
            String performedBy = authService.getCurrentUser(token);
            
            if (performedBy == null) {
                response.put("success", false);
                response.put("message", "Authentication required");
                return response;
            }
            
            Item item = new Item();
            item.setName((String) request.get("name"));
            item.setDescription((String) request.get("description"));
            item.setStatus((String) request.get("status"));
            item.setReporter((String) request.get("reporter"));
            item.setDate((String) request.get("date"));
            
            Item savedItem = itemRepository.save(item, performedBy);
            response.put("success", true);
            response.put("item", savedItem);
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error adding item");
            return response;
        }
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateStatus(@PathVariable int id, @RequestBody Map<String, Object> request) {
        Map<String, Object> response = new java.util.HashMap<>();
        
        try {
            String token = (String) request.get("token");
            String performedBy = authService.getCurrentUser(token);
            
            if (performedBy == null) {
                response.put("success", false);
                response.put("message", "Authentication required");
                return response;
            }
            
            if (!authService.isAdmin(token)) {
                response.put("success", false);
                response.put("message", "Admin access required to update item status");
                return response;
            }
            
            String status = (String) request.get("status");
            Item updatedItem = itemRepository.updateStatus(id, status, performedBy);
            response.put("success", true);
            response.put("item", updatedItem);
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating item status");
            return response;
        }
    }

    @PutMapping("/{id}/retrieved")
    public Map<String, Object> markRetrieved(@PathVariable int id, @RequestBody Map<String, String> request) {
        Map<String, Object> response = new java.util.HashMap<>();
        
        try {
            String token = request.get("token");
            String performedBy = authService.getCurrentUser(token);
            
            if (performedBy == null) {
                response.put("success", false);
                response.put("message", "Authentication required");
                return response;
            }
            
            if (!authService.isAdmin(token)) {
                response.put("success", false);
                response.put("message", "Admin access required to mark item as retrieved");
                return response;
            }
            
            Item updatedItem = itemRepository.updateStatus(id, "retrieved", performedBy);
            response.put("success", true);
            response.put("item", updatedItem);
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error marking item as retrieved");
            return response;
        }
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable int id, @RequestBody Map<String, String> request) {
        Map<String, Object> response = new java.util.HashMap<>();
        
        try {
            String token = request.get("token");
            String performedBy = authService.getCurrentUser(token);
            
            if (performedBy == null) {
                response.put("success", false);
                response.put("message", "Authentication required");
                return response;
            }
            
            if (!authService.isAdmin(token)) {
                response.put("success", false);
                response.put("message", "Admin access required to delete items");
                return response;
            }
            
            itemRepository.delete(id, performedBy);
            response.put("success", true);
            response.put("message", "Item deleted successfully");
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting item");
            return response;
        }
    }

    @GetMapping("/{id}/history")
    public List<ItemHistory> getHistory(@PathVariable int id) {
        return itemRepository.getHistory(id);
    }

    @GetMapping("/history")
    public List<ItemHistory> getAllHistory() {
        return itemRepository.getAllHistory();
    }
}