var authTokenCookieName = 'AuthProxyToken';

function usernameField() {
  return $('#username');
}

function passwordField() {
  return $('#password');
}

function loginField() {
  return $('#login');
}

function rememberMeField() {
  return $('#rememberMe');
}

$(document).ready(function() {
  loginField().click(login);

  usernameField().on('input', updateLoginFieldState);
  passwordField().on('input', updateLoginFieldState);
  updateLoginFieldState();
});

function updateLoginFieldState() {
  if (usernameField().val() && passwordField().val()) {
    loginField().removeAttr('disabled');
  } else {
    loginField().attr('disabled', 'disabled');
  }
}

function login() {
  var username = usernameField().val();
  var password = passwordField().val();
  var rememberMe = !!rememberMeField().prop('checked');

  // TODO: Remove this.
  console.log('username: ' + username);
  console.log('password: ' + password);
  console.log('remember me: ' + rememberMe);

  // Make a login request.
  $.ajax('/authproxy/login', {
    method: 'post',
    dataType: 'json',
    contentType: 'application/json',
    success: function(token) {
      // Set the token as a cookie.
        // Cookies are used because these will be sent will be sent with all requests without any change to the proxied application.
        // TODO: Set the correct expiry date.

      var cookieOptions = {};
      if (rememberMe) {
        cookieOptions.expires = 30; // Expire the cookie in 30 days (same time as the token will expire)
      }
      Cookies.set(authTokenCookieName, token.token, cookieOptions);

      // Login successful.
        // TODO: Show a message about successful login until the page reloads?

      // Reload the page so the user will be let through using their cookie.
      location.reload();
    },
    fail: function() {
      console.log('failed');

      // TODO: Display a failure message.
    },
    data: JSON.stringify({
      username : username,
      password : password,
      rememberMe : rememberMe
    })
  });
}
