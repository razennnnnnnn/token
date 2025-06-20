const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/collect') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Données reçues :', body);
            // Sauvegarde les données dans un fichier
            fs.appendFileSync('tokens.txt', body + '\n');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success' }));
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

// Utilise le port fourni par Render ou 3000 en local
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});