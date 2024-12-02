import { utils, writeFile } from 'xlsx-js-style';

interface TemplateSection {
  title: string;
  metrics: Array<{
    name: string;
    description: string;
  }>;
}

export function generateExcelTemplate() {
  // ... rest of the utility code
}