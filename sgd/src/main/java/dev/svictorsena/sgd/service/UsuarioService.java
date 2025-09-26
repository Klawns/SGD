package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Usuario createUsario(Usuario usuario) { //service criar usuario // recebe usuario vindo do authService registerUsuario
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); //altera a senha do usuario para senha encriptada
        return usuarioRepository.save(usuario); //salva o usuario no banco de dados
    }

    public ResponseEntity<?> updateUsuario(Usuario usuarioAtualizado, String usernameAtual, HttpServletResponse response) {
        // Pega o usuário atual
        Usuario usuario = usuarioRepository.findByUsername(usernameAtual)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (usuarioAtualizado.getUsername() != null
                && !usuarioAtualizado.getUsername().isBlank()
                && !usuarioAtualizado.getUsername().equals(usuario.getUsername())) {
            usuario.setUsername(usuarioAtualizado.getUsername());
        }

        // Atualiza senha se não for vazia
        if (usuarioAtualizado.getPassword() != null && !usuarioAtualizado.getPassword().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(usuarioAtualizado.getPassword()));
        }

        usuarioRepository.save(usuario);

        String novoToken = jwtUtil.gerarToken(usuarioAtualizado.getUsername());

        Cookie cookie = new Cookie("token", novoToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600); // 1 hora
        response.addCookie(cookie);

        return ResponseEntity.ok("Usuário atualizado com sucesso");
    }
}
