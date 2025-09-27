package dev.svictorsena.sgd.repository;

import dev.svictorsena.sgd.model.Despesas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DespesasRepository extends JpaRepository<Despesas, Long> {
    List<Despesas> findAllByUsuarioUsernameAndDataBetween(String username, LocalDate inicio, LocalDate fim, Sort sort);

    Page<Despesas> findByUsuarioUsername(String username, Pageable pageable);

    Page<Despesas> findByUsuarioUsernameAndValor(String username, Double valor, Pageable pageable);

    Page<Despesas> findByUsuarioUsernameAndDescricaoContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrFormaPagamentoContainingIgnoreCase(
            String username, String descricao, String categoria, String formaPagamento, Pageable pageable
    );

    Page<Despesas> findByUsuarioUsernameAndDataBetween(String username, LocalDate inicio, LocalDate fim, Pageable pageable);

    Page<Despesas> findByUsuarioUsernameAndDataGreaterThanEqual(String username, LocalDate dataInicio, Pageable pageable);

    @Query("SELECT SUM(d.valor) FROM Despesas d WHERE d.usuario.username = :username")
    Double obterTotalValorPorUsuarioUsername(@Param("username") String username);




}
