import {fetchToken,fetchWithToken} from './fetch';

describe('Fetch helper', () => {
    let test_token = '';

    test('should fetch without token ', async () => {
        const response = await fetchToken('auth',{email:'mail@mail.com',password: '123456'},'POST');
        expect(response instanceof Response).toBe(true);
        const {ok,token} = await response.json();
        expect(ok).toBeTruthy();
        test_token = token;
    });

    test('should fetch with token ', async () => {
        localStorage.setItem('token',test_token);
        const response = await fetchWithToken('events');
        expect(response instanceof Response).toBe(true);

        const {eventsBD,ok} = await response.json();
        expect(ok).toBe(true);
        expect(eventsBD instanceof Object).toBe(true);

    });
});