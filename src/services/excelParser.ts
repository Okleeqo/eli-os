import { read, utils } from 'xlsx';

export async function parseExcelFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        // Convert Excel data to our format
        const financialData: Record<string, number> = {};
        
        jsonData.forEach((row: any) => {
          const metricKey = Object.keys(row).find(key => 
            key.toLowerCase() === 'metric'
          );
          const valueKey = Object.keys(row).find(key => 
            key.toLowerCase() === 'value'
          );

          if (!metricKey || !valueKey) {
            console.warn('Row missing Metric or Value column:', row);
            return;
          }

          const metric = row[metricKey]?.toString().toLowerCase().replace(/\s+/g, '');
          const value = parseFloat(row[valueKey]);
          
          if (metric && !isNaN(value)) {
            financialData[metric] = value;
          }
        });

        resolve(financialData);
      } catch (error) {
        console.error('Excel parsing error:', error);
        reject(new Error('Failed to parse Excel file. Please check the format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsBinaryString(file);
  });
}