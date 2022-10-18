import * as XLSX from 'xlsx-js-style';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const ExcelGenerator = (sheets) => {
    const ExcelGeneratorPromise = new Promise((resolve, reject) => {
        let wb = XLSX.utils.book_new();
    
        sheets.forEach(sheet => {
            let ws_collect_pending = XLSX.utils.aoa_to_sheet(sheet.sheetData);
            XLSX.utils.book_append_sheet(wb, ws_collect_pending, sheet.nameSheet, true);
        })
        
        
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "Reporte.xlsx"
    
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
          Sharing.shareAsync(filename)
          .then(() => {
            resolve();
          });
        })
        .catch((err) => {
          reject(err)
        })

    });
    return ExcelGeneratorPromise;
}

export default ExcelGenerator;