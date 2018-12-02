module.exports = {
    swaggerSecurityHandlers: {
        AdminSecurity: function (req, authOrSecDef, scopesOrApiKey, callback) {
            if (scopesOrApiKey) {
                if (scopesOrApiKey === '12345') callback();
                else callback(new Error('Api key missing or not registered'));
            }
            else callback(new Error('Api key missing or not registered'));
        }
    }
};