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
  