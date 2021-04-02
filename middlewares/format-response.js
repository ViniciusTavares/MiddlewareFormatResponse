const { version } = require('../../../package.json');
const { Parser } = require('json2csv');

module.exports = async (body, req, res, next) => {
  const isError = res.statusCode > 299;
  const mediaRegex = /(\.json|\.csv)/gm; 

  const mediaMatches = req.url.match(mediaRegex) || [];
  let mediaType = 'json';

  if (mediaMatches[0] && !isError) {
    mediaType = mediaMatches[0].substring(1, mediaMatches[0].length);
  }

  const contentTransformerHash = {
    csv: () => {
      const parser = new Parser();
      res.setHeader('content-type', 'text/csv');

      return parser.parse(body);
    },
    json: (newBody = body) => {
      const payloadOrError = isError
        ? 'error'
        : 'payload';

      return {
        meta: {
          apiVersion: version,
          ...res.meta
        },
        [payloadOrError]: newBody
      };
    }
  };

  const transformOutput = contentTransformerHash[mediaType];

  const output = transformOutput
    ? transformOutput()
    : contentTransformerHash.json();

  res.send(output);
  next();
};
