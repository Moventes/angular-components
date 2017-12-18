# angular-components

This ionic project hosts the angular-components library and provides a testing application for them.

## Setup

```bash
npm install
```

The library uses `common-components`, so you may have to first install and link it

```bash
npm link common-components
```

## To run the application

```bash
ng serve
```

## To build the library

```bash
npm run packagr
```

This will create a `dist` directory which may be linked or published with npm

## To link the library once it is built

```bash
npm link
```

## TIP: commands can be chained with &&

```bash
npm install && npm run packagr && cd dist && npm link
```

## To add the library to a project

```bash
npm link angular-components
```

## Build documentation

```bash
npm run compodoc
```

## Serve documentation

```bash
npm run compodoc-serve
```
documentation will be served on http://localhost:8080
