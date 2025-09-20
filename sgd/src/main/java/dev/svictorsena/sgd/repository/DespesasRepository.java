package dev.svictorsena.sgd.repository;

import dev.svictorsena.sgd.model.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesasRepository extends JpaRepository<Despesas, Long> {
}
