export function validarPasswrd(password: string) {
    const errores = [];
    let isValid = true;

    // Requisito 1: Al menos una letra minúscula
    const regexMinuscula = /(?=.*[a-z])/;
    if (!regexMinuscula.test(password)) {
        errores.push("una letra minúscula");
        isValid = false;
    }

    // Requisito 2: Al menos una letra mayúscula
    const regexMayuscula = /(?=.*[A-Z])/;
    if (!regexMayuscula.test(password)) {
        errores.push("una letra mayúscula");
        isValid = false;
    }

    // Requisito 3: Al menos un carácter especial del conjunto @, (, !, ), %, *, ?, &
    // NOTA: Se usan solo los caracteres especiales sin necesidad de escapar todos
    const regexCaracterEspecial = /.*[@()!%*?&]/;
    if (!regexCaracterEspecial.test(password)) {
        errores.push("un carácter especial (@, (, !, ), %, *, ?, &)");
        isValid = false;
    }

    // Requisito 4: Longitud mínima de 8 caracteres
    const regexLongitud = /^.{8,}$/;
    if (!regexLongitud.test(password)) {
        errores.push("una longitud de al menos 8 caracteres");
        isValid = false;
    }

    // Requisito 5: Almenos un numero 0-9
    const regexNumber = /(?=.*[0-9])/;
    if (!regexNumber.test(password)) {
        errores.push("un numero (0-9)");
        isValid = false;
    }

    return {
        isValid,
        errores
    };
}

export function validarEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}