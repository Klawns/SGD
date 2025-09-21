package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Despesas;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RelatorioService {

    public static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    public ByteArrayInputStream gerarRelatorio(List<Despesas> despesas) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Despesas");

            Row header = sheet.createRow(0);
            String[] colunas = {"Descrição", "Categoria", "Valor", "Forma de Pagamento", "Data"};

            CellStyle style = workbook.createCellStyle();
            style.setAlignment(HorizontalAlignment.CENTER);
            style.setVerticalAlignment(VerticalAlignment.CENTER);

            for (int i = 0; i < colunas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(colunas[i]);
                cell.setCellStyle(style);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            int rowIdx = 1;
            for (Despesas d : despesas) {
                Row row = sheet.createRow(rowIdx++);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(capitalize(d.getDescricao()));
                cell0.setCellStyle(style);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(capitalize(d.getCategoria()));
                cell1.setCellStyle(style);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue("R$ " + d.getValor());
                cell2.setCellStyle(style);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(capitalize(d.getFormaPagamento()));
                cell3.setCellStyle(style);

                Cell cell4 = row.createCell(4);
                cell4.setCellValue(d.getData().format(formatter));
                cell4.setCellStyle(style);
            }

            for (int i = 0; i < colunas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}