package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.repository.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DespesasService {
    @Autowired
    private DespesasRepository despesasRepository;

    public Page<Despesas> getAllDespesas(@PageableDefault(size = 9, page = 0) Pageable pageable) {
        return despesasRepository.findAll(pageable);
    }

    public Despesas createDespesas(Despesas despesas) {
        return despesasRepository.save(despesas);
    }

    public void deleteDespesas(Long id) {
        despesasRepository.deleteById(id);
    }

    //depois fazer update
    public Optional<Despesas> updateDespesas(Long id, Despesas despesas) {
        return despesasRepository.findById(id).map(existing -> {
            existing.setDescricao(despesas.getDescricao());
            existing.setValor(despesas.getValor());
            existing.setData(despesas.getData());
            existing.setCategoria(despesas.getCategoria());
            existing.setFormaPagamento(despesas.getFormaPagamento());
            existing.setParcelas(despesas.getParcelas());
            return despesasRepository.save(existing);
        });
    }

}
