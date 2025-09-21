package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.status(400).body("Usuário já existe!");
        }

        try {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuarioRepository.save(usuario);
            return ResponseEntity.ok("Usuário criado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(usuario);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginData.get("username"),
                            loginData.get("password")
                    )
            );

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String token = jwtUtil.gerarToken(userDetails);

            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(3600); // 1 hora
            response.addCookie(cookie);
            return ResponseEntity.ok("Login realizado com sucesso");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("Logout realizado com sucesso!");
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
