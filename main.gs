/*Create a Connector for Google Data Studio to communicate with the Facebook Marketing API.*/

function getAuthType() {
  var response = {
    type: 'OAUTH2'
  };
  return response;
}

function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var accessToken = userProperties.getProperty('accessToken');
  var expiration = userProperties.getProperty('expiration');
  if (accessToken) {
    var now = new Date();
    if (now.getTime() < expiration) {
      return true;
    }
  }
  return false;
}

function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('accessToken');
  userProperties.deleteProperty('expiration');
}

function getConfig(request) {
  var config = {
    configParams: [
      {
        type: 'INFO',
        name: 'info',
        text: 'This connector requires a Facebook Marketing API access token. ' +
          'You can get one by following the instructions at ' +
          'https://developers.facebook.com/docs/marketing-api/access'
      },
      {
        type: 'TEXTINPUT',
        name: 'accessToken',
        displayName: 'Access Token',
        helpText: 'Enter your Facebook Marketing API access token.'
      },
      {
        type: 'TEXTINPUT',
        name: 'accountId',
        displayName: 'Account ID',
        helpText: 'Enter your Facebook Marketing API account ID.'
      }
    ]
  };
  return config;
}

function getSchema(request) {
  var fields = getFields();
  var schema = {
    schema: fields
  };
  return schema;
}
