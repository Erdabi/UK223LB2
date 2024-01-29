import { API } from './API'; 
import { Express } from 'express';
import { Database } from '../database'; 
import { Request, Response } from 'express';

describe('API Tests', () => {
  let api: API;
  let mockApp: Express;
  let mockDatabase: Database;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockApp = { get: jest.fn(), post: jest.fn() } as unknown as Express;
    mockDatabase = {} as unknown as Database;
    api = new API(mockApp, mockDatabase);

    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test('sayHello should send correct response', () => {
    api['sayHello'](mockRequest as Request, mockResponse as Response);
    expect(mockResponse.send).toHaveBeenCalledWith('Hello There!');
  });

  test('login should send success message for correct credentials', async () => {
    mockDatabase.getUser = jest.fn().mockResolvedValue({ username: 'test', password: 'password' });
    mockRequest.body = { username: 'test', password: 'password' };

    await api['login'](mockRequest as Request, mockResponse as Response);
    expect(mockResponse.send).toHaveBeenCalledWith('Login erfolgreich!');
  });
});
