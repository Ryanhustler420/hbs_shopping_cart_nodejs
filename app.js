const http = require ('http');
const fs = require ('fs');

const server = http.createServer ((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader ('Content-Type', 'text/html');
  if (url === '/') {
    res.write ('<html>');
    res.write ('<head><title>Enter Message</title></head>');
    res.write (
      `<body>
            <form action="/message" method="POST">
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>
        </body>`
    );
    res.write ('</html>');
    return res.end ();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on ('data', chunk => {
      body.push (chunk);
    });

    req.on ('end', () => {
      const parsedBody = Buffer.concat (body).toString ();
      const message = parsedBody.split ('=')[1].split ('+').join (' ');
      fs.writeFileSync ('message.txt', message);
    });

    res.writeHead (302, {Location: '/'});
    return res.end ();
  }

  res.write ('<html>');
  res.write ('<head><title>Enter Message</title></head>');
  res.write (`<body>Message</body>`);
  res.write ('</html>');
  res.end ();
});

server.listen (3000);
