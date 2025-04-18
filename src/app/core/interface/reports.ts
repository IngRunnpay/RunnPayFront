export interface RequestReportTransaction {
    IdUsuario: number
    IdAplicacion: string
    ini: number
    fin: number
    idTransaccion: any
    referencia: any
    documento: any
    fechaInicio: any
    fechaFin: any
}

export interface RequestReportDispersion{
    idAplicacion: string
    ini: number
    fin: number
    idDispersion: any
    referencia: any
    documento: any
    fechaInicio: any
    fechaFin: any
 }

 export interface RequestConciliationFecha{
    idAplicacion: string
    fecha: any
 }
  
 export interface RequestExcelConciliationFecha{
    idAplicacion: string
    fechaIni: any
    fechaFin: any
 }
 export interface RequestReportConsiliation{
    idAplicacion: string
    ini: number
    fin: number
    fecha: any
 }
  