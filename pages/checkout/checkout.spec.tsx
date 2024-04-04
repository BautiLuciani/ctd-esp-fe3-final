import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { IComic } from '../../interface/comic';
import FormCheckout from './[id].page';
import React from 'react';

const mockComicDetail: IComic = {
  characters: {
    available: 5,
    collectionURI: 'sample-collection-uri',
    items: [{ resourceURI: 'sample-resource-uri', name: 'sample-character' }]
  },
  price: 10,
  oldPrice: 0,
  stock: 10,
  id: 1,
  title: 'Sample Comic',
  textObjects: [{ type: 'sample-type', language: 'en', text: 'sample-text' }],
  images: [{ path: 'sample-path', extension: 'jpg' }]
};

const server = setupServer(
  rest.get('/comics', (req, res, ctx) => {
    return res(ctx.json(mockComicDetail));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FormCheckout', () => {
    test('renders form with comic details', async () => {
      render(<FormCheckout comicDetail={mockComicDetail} />);
  
      await waitFor(() => screen.getByText(/Purchase Form/i));
  
      expect(screen.getByText('Sample Comic')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    });
  
    test('submits form data', async () => {
      render(<FormCheckout comicDetail={mockComicDetail} />);
  
      await waitFor(() => screen.getByText(/Purchase Form/i));
  
      fireEvent.input(screen.getByLabelText('Name'), { target: { value: 'John' } });
      fireEvent.input(screen.getByLabelText('LastName'), { target: { value: 'Doe' } });
      fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
  
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
      fireEvent.click(screen.getByRole('button', { name: /Finish/i }));
  
      await waitFor(() => expect(screen.getByText('Confirmation Page')).toBeInTheDocument());
  
      expect(screen.getByText('Name: John')).toBeInTheDocument();
      expect(screen.getByText('LastName: Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    });
  
    test('displays error messages for invalid form fields', async () => {
      render(<FormCheckout comicDetail={mockComicDetail} />);
  
      await waitFor(() => screen.getByText(/Purchase Form/i));
  
      fireEvent.input(screen.getByLabelText('Name'), { target: { value: '' } });
      fireEvent.input(screen.getByLabelText('LastName'), { target: { value: '' } });
      fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
  
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
  
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('LastName is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });