package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.repository.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DespesasService {

    @Autowired
    private DespesasRepository despesasRepository;

    // Listar despesas do usuário
    public Page<Despesas> getDespesasByUsuario(String username, Pageable pageable) {
        return despesasRepository.findByUsuarioUsername(username, pageable);
    }

    // Criar despesa (usuario já deve estar setado)
    public Despesas createDespesas(Despesas despesas) {
        return despesasRepository.save(despesas);
    }

    // Deletar despesa apenas se pertence ao usuário
    public boolean deleteDespesasIfBelongsToUser(Long id, String username) {
        Optional<Despesas> despesaOpt = despesasRepository.findById(id);
        if (despesaOpt.isPresent() && despesaOpt.get().getUsuario().getUsername().equals(username)) {
            despesasRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Atualizar despesa apenas se pertence ao usuário
    public Optional<Despesas> updateDespesasIfBelongsToUser(Long id, Despesas despesas, String username) {
        return despesasRepository.findById(id)
                .filter(existing -> existing.getUsuario().getUsername().equals(username))
                .map(existing -> {
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
