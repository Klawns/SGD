package dev.svictorsena.sgd.repository;

import dev.svictorsena.sgd.model.Despesas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DespesasRepository extends JpaRepository<Despesas, Long> {
    List<Despesas> findAllByUsuarioUsernameAndDataBetween(String username, LocalDate inicio, LocalDate fim, Sort sort);

    Page<Despesas> findByUsuarioUsername(String username, Pageable pageable);

    Page<Despesas> findByUsuarioUsernameAndDescricaoContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrFormaPagamentoContainingIgnoreCase(
            String username, String descricao, String categoria, String formaPagamento, Pageable pageable
    );

    Page<Despesas> findByUsuarioUsernameAndDataBetween(String username, LocalDate inicio, LocalDate fim, Pageable pageable);

    Page<Despesas> findByUsuarioUsernameAndDataGreaterThanEqual(String username, LocalDate dataInicio, Pageable pageable);



}
