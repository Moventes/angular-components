# angular-components

This ionic project hosts the angular-components library and provides a testing application for them.

## To build the library and link it locally

```bash
npm run link
```

This will create a `dist` directory which will be linked with npm

## To build the library and publish it on NPM

```bash
npm run publish
```

WARNING: Don't forget to update the version (in package.json) before publishing it

## To add the library to a project


```bash
npm install mv-ionic-components --save
```

or 

```bash
npm link mv-ionic-components
```


## To run the application

```bash
ng serve
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
