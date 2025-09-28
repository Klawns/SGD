package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.security.JwtUtil;
import dev.svictorsena.sgd.service.UsuarioService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getUsuario(Authentication authentication) {
        Optional<Usuario> usuario = usuarioRepository.findByUsername(authentication.getName());
        return ResponseEntity.ok(usuario);
    }

    @PutMapping
    public ResponseEntity<?> updateUsuario(@RequestBody Usuario usuarioAtualizado,
                                           HttpServletRequest request,
                                           HttpServletResponse response) {

        String usernameAtual = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    usernameAtual = jwtUtil.extrairUsername(cookie.getValue());
                    break;
                }
            }
        }
        if (usernameAtual == null) {
            return ResponseEntity.status(401).body("Não autenticado");
        }

        return usuarioService.updateUsuario(usuarioAtualizado, usernameAtual, response);
    }

}
