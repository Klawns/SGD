package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.security.JwtUtil;
import dev.svictorsena.sgd.service.AuthService;
import dev.svictorsena.sgd.service.UsuarioService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {


    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {//endpoint register que recebe usuario (username e senha) do front
        try {
            return authService.registerUsuario(usuario); //chama registerUsuario passando como parametro usuario
        } catch (Exception e) {
            return  ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario, HttpServletResponse response) {
        try {
            authService.loginUsuario(usuario, response);
            return ResponseEntity.ok("Login realizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        try {
            authService.logoutUsuario(response);
            return ResponseEntity.ok("Logout realizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Não foi possível realizar logout.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    try {
                        String username = jwtUtil.extrairUsername(cookie.getValue());
                        return ResponseEntity.ok(username);
                    } catch (Exception e) {
                        return ResponseEntity.status(401).body("Token inválido");
                    }
                }
            }
        }
        return ResponseEntity.status(401).body("Não autenticado");
    }


}
