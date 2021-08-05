const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-input-login');
    const passwordEl = document.querySelector('#password-input-login');
    console.log(usernameEl);
    console.log(passwordEl);
    console.log(usernameEl.value);
    console.log(passwordEl.value);
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
      alert('Failed to login');
    }
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
  