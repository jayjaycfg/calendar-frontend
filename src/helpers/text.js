import React from "react";

const SWAL_TEXT = {
    //icons
    ERROR_ICON: 'error',
    //titles
    ERROR_TITLE: 'Error',
    //html
    ERROR_MESSAGE: 'Ha ocurrido un problema',
    ERROR_PASSWORD: 'Los passwords no coinciden',
    ERROR_DATE_RANGE: 'Rango de fecha no permitido',
};
const FIELD_TEXT = {
    //name
    LOGIN_EMAIL: 'login_email',
    LOGIN_PASSWORD: 'login_password',
    REGISTER_NAME: 'register_name',
    REGISTER_EMAIL: 'register_email',
    REGISTER_PASSWORD: 'register_papssword',
    REPEAT_REGISTER_PASSWORD: 'register_password_two',
    EVENT_TITLE: 'title',
    EVENT_NOTES: 'notes',
    //placeholder
    EMAIL_PLHDER: 'Correo',
    PASSWORD_PLHDER: 'Contraseña',
    NAME_PLHDER: 'Nombre',
    REPEAT_PASSWD_PLHDER: 'Repita la contraseña',
    EVENT_TITLE_PLHDER: 'Título del evento',
    EVENT_NOTES_PLHDER: 'Notas',
    //type
    TEXT_TYPE: 'text',
    PASSWORD_TYPE: 'password',
    SUBMIT_TYPE: 'submit',
    EMAIL_TYPE: 'email',
    //value
    BTN_LOGIN: 'Login',
    BTN_REGISTER: 'Crear cuenta',
    BTN_SAVE: ' Guardar',
    BTN_DELETE: ' Borrar evento',
    BTN_LOGOUT: 'Salir',
    //label
    LBL_START_DATE: 'Fecha y hora inicio',
    LBL_END_DATE: 'Fecha y hora fin',
    EVENT_TITLE_NOTES: 'Título y notas',
    // description
    EVENT_TITLE_DESCTP: 'Una descripción corta',
    EVENT_NOTES_DESCTP: 'Información adicional',
};
const UI_TEXT = {
    EDIT_EVENT_TITLE: 'Editar evento',
    NEW_EVENT_TITLE: 'Nuevo evento',
};
export{
    SWAL_TEXT,
    FIELD_TEXT,
    UI_TEXT
}