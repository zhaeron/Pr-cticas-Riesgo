import type { MMIScaleItem } from './types';

export const getMMIScale = (t: (key: string) => string): MMIScaleItem[] => [
  { value: 1, roman: 'I', name: t('mmi_1_name'), description: t('mmi_1_desc') },
  { value: 2, roman: 'II', name: t('mmi_2_name'), description: t('mmi_2_desc') },
  { value: 3, roman: 'III', name: t('mmi_3_name'), description: t('mmi_3_desc') },
  { value: 4, roman: 'IV', name: t('mmi_4_name'), description: t('mmi_4_desc') },
  { value: 5, roman: 'V', name: t('mmi_5_name'), description: t('mmi_5_desc') },
  { value: 6, roman: 'VI', name: t('mmi_6_name'), description: t('mmi_6_desc') },
  { value: 7, roman: 'VII', name: t('mmi_7_name'), description: t('mmi_7_desc') },
  { value: 8, roman: 'VIII', name: t('mmi_8_name'), description: t('mmi_8_desc') },
  { value: 9, roman: 'IX', name: t('mmi_9_name'), description: t('mmi_9_desc') },
  { value: 10, roman: 'X', name: t('mmi_10_name'), description: t('mmi_10_desc') },
  { value: 11, roman: 'XI', name: t('mmi_11_name'), description: t('mmi_11_desc') },
  { value: 12, roman: 'XII', name: t('mmi_12_name'), description: t('mmi_12_desc') },
];
