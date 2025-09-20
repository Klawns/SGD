package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.service.DespesasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin(origins = "http://localhost:5174")
public class DespesasController {

    @Autowired
    private DespesasService despesasService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar apenas as despesas do usuário logado
    @GetMapping
    public Page<Despesas> listAllDespesas(@PageableDefault(size = 9, page = 0) Pageable pageable,
                                          Authentication authentication) {
        String username = authentication.getName();
        return despesasService.getDespesasByUsuario(username, pageable);
    }

    // Criar despesa associada ao usuário logado
    @PostMapping
    public Despesas addDespesas(@RequestBody Despesas despesas, Authentication authentication) {
        String username = authentication.getName();
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();
        despesas.setUsuario(usuario);
        return despesasService.createDespesas(despesas);
    }

    // Deletar despesa (você pode adicionar verificação se a despesa pertence ao usuário)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDespesas(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = despesasService.deleteDespesasIfBelongsToUser(id, username);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build(); // Forbidden se não for do usuário
        }
    }

    // Editar despesa (somente se for do usuário)
    @PutMapping("/{id}")
    public ResponseEntity<Despesas> editarDespesas(@PathVariable Long id,
                                                   @RequestBody Despesas despesas,
                                                   Authentication authentication) {
        String username = authentication.getName();
        return despesasService.updateDespesasIfBelongsToUser(id, despesas, username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(403).build());
    }
}
