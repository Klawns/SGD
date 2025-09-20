package dev.svictorsena.sgd.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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
    private String data;
    private String categoria;
    private String formaPagamento;
    @Nullable
    private int parcelas;
}
