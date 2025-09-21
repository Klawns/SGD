package dev.svictorsena.sgd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="despesas")
@Getter
@Setter
public class Despesas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private double valor;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate data;
    private String categoria;
    private String formaPagamento;
    @Nullable
    private int parcelas;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private Usuario usuario;
}
