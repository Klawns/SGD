package dev.svictorsena.sgd.service;

import dev.svictorsena.sgd.model.Despesas;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

            sheet.setHorizontallyCenter(true);

            // === Estilos ===
            Font titleFont = workbook.createFont();
            titleFont.setFontHeightInPoints((short) 16);
            titleFont.setBold(true);

            CellStyle titleStyle = workbook.createCellStyle();
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);
            titleStyle.setVerticalAlignment(VerticalAlignment.TOP);

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            addBorders(headerStyle);

            CellStyle cellStyle = workbook.createCellStyle();
            cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            addBorders(cellStyle);

            CellStyle currencyStyle = workbook.createCellStyle();
            currencyStyle.setDataFormat(workbook.createDataFormat().getFormat("R$ #,##0.00"));
            currencyStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            currencyStyle.setAlignment(HorizontalAlignment.RIGHT);
            addBorders(currencyStyle);

            CellStyle dateStyle = workbook.createCellStyle();
            dateStyle.setDataFormat(workbook.createDataFormat().getFormat("dd/MM/yyyy"));
            dateStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            dateStyle.setAlignment(HorizontalAlignment.RIGHT);
            addBorders(dateStyle);

            // === Título ===
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("Relatório de Despesas");
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0, 4));


            // === Cabeçalho ===
            String[] colunas = {"Descrição", "Categoria", "Forma de Pagamento", "Valor", "Data"};
            Row header = sheet.createRow(2);

            CellStyle style = workbook.createCellStyle();
            style.setAlignment(HorizontalAlignment.CENTER);
            style.setVerticalAlignment(VerticalAlignment.CENTER);

            for (int i = 0; i < colunas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(colunas[i]);
                cell.setCellStyle(headerStyle);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            Double totalValor = 0.0;
            int rowIdx = 3;
            for (Despesas d : despesas) {
                Row row = sheet.createRow(rowIdx++);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(capitalize(d.getDescricao()));
                cell0.setCellStyle(cellStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(capitalize(d.getCategoria()));
                cell1.setCellStyle(cellStyle);

                Cell cell3 = row.createCell(2);
                cell3.setCellValue(capitalize(d.getFormaPagamento()));
                cell3.setCellStyle(cellStyle);

                Cell cell2 = row.createCell(3);
                cell2.setCellValue(d.getValor());
                cell2.setCellStyle(currencyStyle);
                totalValor += d.getValor();

                Cell cell4 = row.createCell(4);
                cell4.setCellValue(d.getData().format(formatter));
                cell4.setCellStyle(dateStyle);
            }

            // === Total ===
            Row totalLabelRow = sheet.createRow(rowIdx + 1);
            Cell totalLabel = totalLabelRow.createCell(0);
            totalLabel.setCellValue("TOTAL:");
            totalLabel.setCellStyle(headerStyle);

            Cell totalValue = totalLabelRow.createCell(1);
            totalValue.setCellValue(totalValor);
            totalValue.setCellStyle(currencyStyle);


            for (int i = 0; i < colunas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    private void addBorders(CellStyle style) {
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
    }
}