package com.trackit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        return authService.login(username, password);
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> signupData) {
        String username = signupData.get("username");
        String password = signupData.get("password");
        String email = signupData.get("email");
        String fullName = signupData.get("fullName");
        
        return authService.signup(username, password, email, fullName);
    }

    @PostMapping("/validate")
    public Map<String, Object> validateToken(@RequestBody Map<String, String> tokenData) {
        String token = tokenData.get("token");
        Map<String, Object> response = new java.util.HashMap<>();
        
        try {
            String username = authService.getCurrentUser(token);
            if (username != null) {
                response.put("valid", true);
                response.put("username", username);
            } else {
                response.put("valid", false);
            }
        } catch (Exception e) {
            response.put("valid", false);
        }
        
        return response;
    }
}