package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Despesas;
import dev.svictorsena.sgd.repository.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@Service
public class DespesasService {

    @Autowired
    private DespesasRepository despesasRepository;

    public Page<Despesas> getDespesasByUsuarioAndSearch(
            String username,
            String search,
            Pageable pageable
    ) {
        if (search == null || search.isEmpty()) {
            return despesasRepository.findByUsuarioUsername(username, pageable);
        }

        search = search.trim();

        try {
            return despesasRepository.findByUsuarioUsernameAndValor(username, Double.parseDouble(search), pageable);
        } catch (NumberFormatException e) {}

        try {
            if (search.contains("-")) {
                String[] parts = search.split("-");
                LocalDate dataInicio = LocalDate.parse(parts[0].trim(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                LocalDate dataFim = LocalDate.parse(parts[1].trim(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                return despesasRepository.findByUsuarioUsernameAndDataBetween(username, dataInicio, dataFim, pageable);
            }

            try {
                LocalDate dataInicio = LocalDate.parse(search, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                return despesasRepository.findByUsuarioUsernameAndDataGreaterThanEqual(username, dataInicio, pageable);
            } catch (DateTimeParseException ignored) {
            }

        } catch (DateTimeParseException e) {
        }

        return despesasRepository
                .findByUsuarioUsernameAndDescricaoContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrFormaPagamentoContainingIgnoreCase(
                        username, search, search, search, pageable
                );
    }

    public Despesas createDespesas(Despesas despesas) {
        return despesasRepository.save(despesas);
    }

    public boolean deleteDespesasIfBelongsToUser(Long id, String username) {
        Optional<Despesas> despesaOpt = despesasRepository.findById(id);
        if (despesaOpt.isPresent() && despesaOpt.get().getUsuario().getUsername().equals(username)) {
            despesasRepository.deleteById(id);
            return true;
        }
        return false;
    }

//    public void deleteAllDespesasByUsuarioUsername(String username) {
//        despesasRepository.deleteAllByUsuarioUsername(username);
//    }

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
