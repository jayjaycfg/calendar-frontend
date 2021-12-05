import {types} from "./types";

describe('Pruebas en Types', () => {
    test('should be equals', () => {
        expect(types).toEqual(
            {
                uiOpenModal : '[UI] Open Modal',
                uiCloseModal : '[UI] Close Modal',

                eventSetActive : '[EVENT] eventSetActive',
                eventStartNew : '[EVENT] Start new event',
                eventAddNew : '[EVENT] Add new',
                eventClearActive : '[EVENT] Clear active',
                eventUpdate : '[EVENT] Update Event',
                eventDelete : '[EVENT] Delete Event',
                eventLoaded: '[EVENT] loaded Event',

                authCheckingFinish : '[AUTH] Finish checking login state',
                authStartLogin : '[AUTH] start login',
                authLogin : '[AUTH] login',
                authStartRegister : '[AUTH] start register',
                authStartTokenRenew : '[AUTH] start token renew',
                authLogout : '[AUTH] logout',
            }
        );
    });
});