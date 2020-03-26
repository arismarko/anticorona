const express = require('express');
const next = require('next');
const GraphQLService = require('./graphqlserver');

const dev = process.env.NODE_ENV !== 'production';

// next app handler
const app = next({ dev });

// next routing handler
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const graphqlserver = new GraphQLService();
    graphqlserver.init();

    server.use(require('./routes'));

    server.get('/stores/:id', (req, res) => {
      const { id } = req.params;
      app.render(req, res, '/stores', { ...req.query, id });
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });