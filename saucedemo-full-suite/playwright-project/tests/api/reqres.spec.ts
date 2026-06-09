import { test, expect, APIRequestContext } from "@playwright/test";

let request: APIRequestContext;

test.describe('Reqres API Tests', () => {

test.beforeAll( async ({ playwright }) => {
    request = await playwright.request.newContext({
        baseURL: 'https://reqres.in',
        extraHTTPHeaders: {
            'x-api-key' : 'free_user_3DjCnkqGp999WadREYVAaxymeWe'
        }
    });
})


test.afterAll(async () => {
    await request.dispose();
});

test('Get Users', async () => {
    const response = await request.get('/api/users');
    expect(response.status()).toBe(200);

    const body = await response.json(); 
    
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
})

test('Create User', async () => {
    const response = await request.post('/api/users', {
        data: {
            "name" : "Darya",
            "job" : "QA Engineer"
        }
    });
    expect(response.status()).toBe(201);
    
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', 'Darya');
    expect(body).toHaveProperty('job', 'QA Engineer');
})

test('Update User', async () => {
    const response = await request.put('/api/users/2', {
        data: {
            "name" : "Darya",
            "job" : "Senior QA Engineer"
        }
    });
    expect(response.status()).toBe(200);
    
    const body = await response.json();

    expect(body).toHaveProperty('name', 'Darya');
    expect(body).toHaveProperty('job', 'Senior QA Engineer');
})

test('Delete User', async () => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
})  
})