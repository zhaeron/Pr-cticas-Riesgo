
export interface LocationData {
  status: 'pending' | 'success' | 'error';
  coords: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface SeismicReport {
  ID_Registro: string;
  Fecha_Hora: string;
  Latitud: number;
  Longitud: number;
  Intensidad_MMI: number;
  Texto_Reporte: string;
  URL_Imagen_1: string;
  URL_Imagen_2: string;
  ID_Usuario: string;
}

export interface MMIScaleItem {
  value: number;
  roman: string;
  name: string;
  description: string;
}
