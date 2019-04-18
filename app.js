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
                <input type="text" name="name">
                <button type="submit">Send</button>
            </form>
        </body>`
    );
    res.write ('</html>');
    return res.end ();
  }

  if (url === '/message' && method === 'POST') {
    fs.writeFileSync ('message.txt', 'Dummy text');
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
