package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseEntity<String> registerUsuario(Usuario usuario) {//recebe usuario do endpoint register
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {//verifica se o usuario existe
            return ResponseEntity.status(400).body("Usuário já existe!");//se existe, retorna que ja existe
        }

        usuarioService.createUsario(usuario);//chama createUsuario passando como parametro usuario
        return ResponseEntity.ok("Usuário registrado com sucesso!");//retorna que deu certo

    }

    public void loginUsuario(Usuario usuario, HttpServletResponse response) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword()));

        String token = jwtUtil.gerarToken(auth.getName());

        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);
    }

    public void logoutUsuario(HttpServletResponse response) {
        SecurityContextHolder.clearContext();

        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);
    }
}
