package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.model.Usuario;
import dev.svictorsena.sgd.repository.DespesasRepository;
import dev.svictorsena.sgd.repository.UsuarioRepository;
import dev.svictorsena.sgd.service.DespesasService;
import dev.svictorsena.sgd.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin(origins = "http://localhost:5173")
public class DespesasController {

    @Autowired
    private DespesasService despesasService;

    @Autowired
    private RelatorioService relatorioService;

    @Autowired
    private DespesasRepository despesasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public Page<Despesas> listAllDespesas(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 9) Pageable pageable,
            Authentication authentication) {

        String username = authentication.getName();

        return despesasService.getDespesasByUsuarioAndSearch(username, search, pageable);
    }

    @PostMapping
    public Despesas addDespesas(@RequestBody Despesas despesas, Authentication authentication) {
        String username = authentication.getName();
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow();
        despesas.setUsuario(usuario);
        return despesasService.createDespesas(despesas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDespesas(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        boolean deleted = despesasService.deleteDespesasIfBelongsToUser(id, username);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesas> editarDespesas(@PathVariable Long id,
                                                   @RequestBody Despesas despesas,
                                                   Authentication authentication) {
        String username = authentication.getName();
        return despesasService.updateDespesasIfBelongsToUser(id, despesas, username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(403).build());
    }

    @GetMapping("/relatorio")
    public ResponseEntity<byte[]> downloadRelatorio(
            @RequestParam String dataInicial,
            @RequestParam String dataFinal,
            Authentication authentication) throws IOException {

        String username = authentication.getName();

        LocalDate inicio = LocalDate.parse(dataInicial);
        LocalDate fim = LocalDate.parse(dataFinal);

        List<Despesas> despesas = despesasRepository
                .findAllByUsuarioUsernameAndDataBetween(username, inicio, fim, Sort.by(Sort.Direction.ASC, "data"));

        ByteArrayInputStream in = relatorioService.gerarRelatorio(despesas);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String filename = "despesas__" + inicio.format(formatter) + "__" + fim.format(formatter) + ".xlsx";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(in.readAllBytes());
    }

}
