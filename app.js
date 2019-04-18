const http = require ('http');

const server = http.createServer ((req, res) => {
  const url = req.url;
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
  res.write ('<html>');
  res.write ('<head><title>Enter Message</title></head>');
  res.write (`<body>Message</body>`);
  res.write ('</html>');
  res.end ();
});

server.listen (3000);
