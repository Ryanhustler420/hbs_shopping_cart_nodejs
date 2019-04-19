const fs = require ('fs');

const requestHandler = (req, res) => {
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

    return req.on ('end', () => {
      const parsedBody = Buffer.concat (body).toString ();
      const message = parsedBody.split ('=')[1].split ('+').join (' ');
      fs.writeFile ('message.txt', message, () => {
        res.writeHead (302, {Location: '/'});
        return res.end ();
      });
    });
  }

  res.write ('<html>');
  res.write ('<head><title>Enter Message</title></head>');
  res.write (`<body>Message</body>`);
  res.write ('</html>');
  res.end ();
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text',
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
