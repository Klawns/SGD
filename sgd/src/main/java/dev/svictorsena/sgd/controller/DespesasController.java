package dev.svictorsena.sgd.controller;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.service.DespesasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin
public class DespesasController {
    @Autowired
    private DespesasService despesasService;

    @GetMapping
    public Page<Despesas> listAllDespesas(@PageableDefault(size = 9, page = 0) Pageable pageable) {
        return despesasService.getAllDespesas(pageable);
    }

    @PostMapping
    public Despesas addDespesas(@RequestBody Despesas despesas) {
        return despesasService.createDespesas(despesas);
    }

    @DeleteMapping("/{id}")
    public void deleteDespesas(@PathVariable Long id) {
        despesasService.deleteDespesas(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Despesas> editarDespesas(@PathVariable Long id, @RequestBody Despesas despesas) {
        return despesasService.updateDespesas(id, despesas)
                .map(ResponseEntity::ok) // se achou, retorna 200 + objeto atualizado
                .orElseGet(() -> ResponseEntity.notFound().build()); // se não achou, retorna 404
    }

}
