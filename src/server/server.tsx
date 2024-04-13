const express = require("express");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
import {StaticRouter} from 'react-router-dom/server';
import App from '../client/components/App';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
const cors = require("cors");
import { schema } from './schema'

const app = express();
app.use('/static', express.static(__dirname));
const PORT = process.env.PORT;

interface MyContext {
    token?: string;
}

const server = new ApolloServer({
    schema,
    csrfPrevention: false
});

await server.start();

/**
 * Produces the initial non-interactive HTML output of React
 * components. The hydrateRoot method is called on the client
 * to make this HTML interactive.
 * @param {string} location
 * @return {Promise<string>}
 */
const createReactApp = async (location:any) => {
    const reactApp = ReactDOMServer.renderToString(
        <StaticRouter location={location}>
            <App />
        </StaticRouter>
    );
    const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');
    const reactHtml = html.replace(
        '<div id="root"></div>', `<div id="root">${reactApp}</div>`);
    return reactHtml;
};

app.use('/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    })
);

app.get('*', async (req:any, res:any) => {
    const indexHtml = await createReactApp(req.url);
    res.status(200).send(indexHtml);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});