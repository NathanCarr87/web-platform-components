const signupBoxTemplate = document.createElement('template');
signupBoxTemplate.innerHTML = `
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
<h2>Sign Up</h2>
<form>
  <label>Username: <input type="text" minlength="3" required/></label>
  <br />
  <label>Email: <input type="email" required/></label>
  <br />
  <label>Password: <input type="password" minlength="8" required/></label>
  <br />
  <button type="submit">Sign Up</button>
</form>
</div>
`;

class SignupBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(signupBoxTemplate.content.cloneNode(true));
  }

  _firebaseAuth;
  _createFunction;
  set firebaseAuth(value) {
    this._firebaseAuth = value;
  }

  set createFunction(value) {
    console.log(value);
    this._createFunction = value;
  }

  formElement;
  connectedCallback() {
    this.formElement = this.shadowRoot.querySelector('form');
    this.formElement.addEventListener('submit', this.logSubmit);
  }

  logSubmit(event) {
    event.preventDefault();
    console.log(event);
  }
}
window.customElements.define('signup-box', SignupBox);
