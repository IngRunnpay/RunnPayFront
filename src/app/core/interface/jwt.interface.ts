export interface SendTokenUser {
    Token: any
}

export interface ReponseAuth {
    Tiempo: string
    Id: string
    Mensaje: string
    Correo: string
    Usuario: string
    Token: string
}

export interface RequestJwt {
    Usuario: string
    Contrasena: string
    Codigo: string
}

export interface ResponseJwt {
    Tiempo: string
    Id: string
    Mensaje: string
    Correo: string
    Usuario: string
    Token: string
}

export interface LoginPortal {
    Correo: string
}

export interface ValidOtp {
    Correo: string
    Otp: string
}