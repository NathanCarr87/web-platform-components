const template = document.createElement('template');
template.innerHTML = `
<style>
.container {
  padding: 1rem;
  border-radius: 15px;
  background-color: #f5f5f5;
  width: 22rem;
  height: 20rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

form {
  width: 100%;
  justify-content: center;
}

form, label {
  display:flex;
  flex-direction: column;


}

label > input, button {
  border-radius: 8px;
  height: 2rem;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
}

button {
  background-color: #bd8e4b;
  color: #f5f5f5;
}
</style>
<div class="container">
<h2>Login</h2>
<form>
  <label>Email: <input type="email" required/></label>
  <br />
  <label>Password: <input type="password" minlength="8" required/></label>
  <br />
  <button type="submit">Login</button>
</form>
</div>
`;

class LoginBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _firebaseAuth;
  _signInWithEmailAndPassword;
  formElement;
  emailInput;
  passwordInput;

  set firebaseAuth(value) {
    this._firebaseAuth = value;
  }

  set signInWithEmailAndPassword(value) {
    this._signInWithEmailAndPassword = value;
  }
  connectedCallback() {
    this.formElement = this.shadowRoot.querySelector('form');
    this.formElement.addEventListener('submit', (event) =>
      this.logSubmit(event)
    );

    this.emailInput = this.shadowRoot.querySelector('input[type=email]');
    this.passwordInput = this.shadowRoot.querySelector('input[type=password]');
  }

  logSubmit(event) {
    event.preventDefault();
    this._signInWithEmailAndPassword(
      this._firebaseAuth,
      this.emailInput.value,
      this.passwordInput.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        console.log(error.message);
      });
  }
}
window.customElements.define('login-box', LoginBox);
