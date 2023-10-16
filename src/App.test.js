import React from "react";
import App from './App';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { getProducts } from "./Components/api";


let mockData = {data:
  [{"id":1,"attributes":
    {"Name":"Apples","Country":"Italy","Cost":3,"InStock":10,"createdAt":"2023-07-08T02:10:04.373Z","updatedAt":"2023-07-08T02:14:21.655Z","publishedAt":"2023-07-08T02:14:21.653Z"}},
    {"id":2,"attributes":{"Name":"Oranges","Country":"Spain","Cost":4,"InStock":3,"createdAt":"2023-07-08T02:11:18.088Z","updatedAt":"2023-07-08T02:14:33.351Z","publishedAt":"2023-07-08T02:14:33.349Z"}},
    {"id":3,"attributes":{"Name":"Beans","Country":"USA","Cost":2,"InStock":5,"createdAt":"2023-07-08T02:11:41.942Z","updatedAt":"2023-07-08T02:14:25.928Z","publishedAt":"2023-07-08T02:14:25.927Z"}},
    {"id":4,"attributes":{"Name":"Cabbage","Country":"USA","Cost":1,"InStock":8,"createdAt":"2023-07-08T02:11:57.722Z","updatedAt":"2023-07-08T02:14:29.766Z","publishedAt":"2023-07-08T02:14:29.764Z"}}],
    "meta":{"pagination":{"page":1,"pageSize":25,"pageCount":1,"total":4}}
};

beforeEach(() => {
  let mock = jest.spyOn(global, "fetch");
  mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockData)}));
});

afterEach(() => {
  jest.restoreAllMocks();
})

test('Making call to fetch', async () => {
  let products = await getProducts();

  expect(products).toEqual(
    [{"id":1,"attributes":
      {"Name":"Apples","Country":"Italy","Cost":3,"InStock":10,"createdAt":"2023-07-08T02:10:04.373Z","updatedAt":"2023-07-08T02:14:21.655Z","publishedAt":"2023-07-08T02:14:21.653Z"}},
      {"id":2,"attributes":{"Name":"Oranges","Country":"Spain","Cost":4,"InStock":3,"createdAt":"2023-07-08T02:11:18.088Z","updatedAt":"2023-07-08T02:14:33.351Z","publishedAt":"2023-07-08T02:14:33.349Z"}},
      {"id":3,"attributes":{"Name":"Beans","Country":"USA","Cost":2,"InStock":5,"createdAt":"2023-07-08T02:11:41.942Z","updatedAt":"2023-07-08T02:14:25.928Z","publishedAt":"2023-07-08T02:14:25.927Z"}},
      {"id":4,"attributes":{"Name":"Cabbage","Country":"USA","Cost":1,"InStock":8,"createdAt":"2023-07-08T02:11:57.722Z","updatedAt":"2023-07-08T02:14:29.766Z","publishedAt":"2023-07-08T02:14:29.764Z"}}],
  )
  expect(fetch).toHaveBeenCalledTimes(1);
})

test ('Products exist', () => {
  render(<App/>);
  const apples = screen.getByText('Apples');
  const oranges = screen.getByText('Oranges');
  const beans = screen.getByText('Beans');
  const cabbage= screen.getByText('Cabbage');

  expect(apples).toBeInTheDocument()
  expect(oranges).toBeInTheDocument();
  expect(beans).toBeInTheDocument();
  expect(cabbage).toBeInTheDocument();
})