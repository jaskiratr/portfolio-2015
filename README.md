
# Portfolio Website

Built using [Wintersmith](wintersmith.io)

```
git clone git@github.com:jaskiratr/portfolio.git .
npm install
gulp serve
```

## Gulp commands
```
# Run local server on http://localhost:8080/
gulp serve

# Build static pages
gulp build

# Deploy github pages
gulp deploy-pages

# Deploy master branch
gulp deploy-master
```

*Sequence to build and deploy to github*
```
gulp build
gulp deploy-pages
gulp deploy-master
```

## Highlight headings in .md content files
` ## ||Your heading goes here/||`
