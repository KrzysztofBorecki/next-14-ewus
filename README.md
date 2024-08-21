# Next-14-eWUŚ

## About

This application facilitates the verification process of patients' health insurance status via [eWUŚ](https://ewus.nfz.gov.pl/ap-ewus/) (Electronic Verification of Eligibility of Beneficiaries) system of the National Health Fund of Poland.

## Features

Health insurance status may be verified using:

- single PESEL number;
- single/multiple PESEL numbers in a CSV file.

## Deployment

For demonstration purposes, the application is deployed on [Vercel](https://vercel.com).

https://next-14-ewus.vercel.app

## Test account information

The [eWUŚ](https://ewus.nfz.gov.pl/ap-ewus/) system provides developers with a single `eWUŚ test account` and only one user can be logged in at a time.

The `test account` of this application uses the `eWUŚ test account` behind the scenes.

Therefore, a logged in user may experience a `session expiration message with subsequent redirection to the login page` during PESEL number verification, caused by another developer who has meanwhile logged in using the same `eWUŚ test account`.

In such a case, the only solution is to repeat the login process.

## Test account credentials

- Oddział NFZ (NFZ Provincial Branch)
  ```
  15
  ```
- Login
  ```
  TestEwus
  ```
- Hasło (Password)
  ```
  QwertY12#
  ```

## Sample PESEL numbers for insurance status verification

Sample PESEL numbers are available in the `sample-pesel-numbers.csv` file located in the repository root folder.

The file contains 16 sample PESEL numbers from the official eWUŚ API [documentation](https://www.nfz.gov.pl/download/gfx/nfz/pl/defaultstronaopisowa/315/19/1/system_ewus_-_opis_interfejs_dostepowego_v.1.12.pdf) and 2 randomly generated numbers.

## Authors

[Krzysztof Borecki](https://github.com/K3orecki) and
[Daniel Biesiada](https://github.com/BieDaPl)

## Description

This is a [Next.js](https://nextjs.org/) project created with
[TypeScript](https://www.typescriptlang.org/),
[Tailwind CSS](https://tailwindcss.com/),
[ESLint](https://eslint.org/) and [FastAPI](https://fastapi.tiangolo.com/).

- Frontend:
  - [Next.js](https://nextjs.org/) - a React framework for production.
  - [TypeScript](https://www.typescriptlang.org/) - a strongly typed superset of JavaScript.
  - [Tailwind CSS](https://tailwindcss.com/) - for styling and layout.
  - [ESLint](https://eslint.org/) - for static code analysis (syntax errors, formatting issues etc.).
  - [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components built with Radix UI and Tailwind CSS.
  - [zod](https://zod.dev/) - a TypeScript-first schema declaration and validation library.
  - [react-hook-form](https://react-hook-form.com/) - a React Hooks library for form validation.
  - [jose](https://github.com/panva/jose) - a JavaScript module for JSON Object Signing and Encryption, providing support for JSON Web Tokens (JWT).
  - [Papa Parse](https://www.papaparse.com/) - a CSV (or delimited text) parser for JavaScript.
  - [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) - for Unit Testing.
- Backend:
  - [FastAPI](https://fastapi.tiangolo.com/) - a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints.
  - [Docker](https://www.docker.com/) - for local development environment.
