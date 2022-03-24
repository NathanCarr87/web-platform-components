const template = document.createElement('template');
template.innerHTML = `
<style>
 .card-header {
  background-color: #4a5231 !important;
  color: white;
}
</style>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div class="card-header">
    <div class="row">
      <div class="col">
        <div class="name"></div>
      </div>
      <div class="col">
        <div class="level"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="size"></div>
      </div>
      <div class="col">
        <div class="xp"><div></div></div>
      </div>
    </div>
  </div>
`;

class MonsterCardHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(
      template.content.cloneNode(true)
    );
  }

  set data(value) {
    this.nameElement.innerHTML = value.name;
    this.levelElement.innerHTML = `Level ${
      value.level
    } ${this.capitalizeFirstLetter(value.role)}`;
    this.sizeElement.innerHTML = `${this.capitalizeFirstLetter(
      value.size
    )} ${this.capitalizeFirstLetter(value.origin)} ${this.capitalizeFirstLetter(
      value.type
    )}`;
    this.xpElement.innerHTML = `XP: ${value.experiencePoints}`;
  }

  nameElement;
  levelElement;
  sizeElement;
  xpElement;
  connectedCallback() {
    this.nameElement = this.shadowRoot.querySelector('.name');
    this.levelElement = this.shadowRoot.querySelector('.level');
    this.sizeElement = this.shadowRoot.querySelector('.size');
    this.xpElement = this.shadowRoot.querySelector('.xp');
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
window.customElements.define('monster-card-header', MonsterCardHeader);
