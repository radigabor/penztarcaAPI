module.exports = {
    swaggerSecurityHandlers: {
      ApiKeyAuth: function (req, authOrSecDef, scopesOrApiKey, callback) {
        if (scopesOrApiKey) {
          if (scopesOrApiKey === '12345') callback();
          else callback(new Error('Api key missing or not registered'));
          // disable to allow mock mode to work
        }
        else callback(new Error('Api key missing or not registered'));
      }
    }
  };
  