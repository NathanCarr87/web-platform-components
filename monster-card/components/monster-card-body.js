const template = document.createElement('template');
template.innerHTML = `
<style>
 .card-body {
  background-color: #e7e4d1 !important;
}

</style>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div class="card-body">
    <div class="row">
      <div class="col">
        <div class="initiative"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="senses"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="hitpoints"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="armorClass"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="speed"></div>
      </div>
    </div>
    <div class="powers">
      
    </div>
  </div>
`;

class MonsterCardBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set data(value) {}

  connectedCallback() {}

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
window.customElements.define('monster-card-body', MonsterCardBody);
