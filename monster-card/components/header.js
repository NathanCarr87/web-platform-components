const monsterCardHeaderTemplate = document.createElement('template');
monsterCardHeaderTemplate.innerHTML = `
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
      monsterCardHeaderTemplate.content.cloneNode(true)
    );
  }

  /**  Expected
   * {
    name: 'Goblin Blackblade',
    level: 1,
    role: 'LURKER',
    size: 'SMALL',
    origin: 'NATURAL',
    type: 'HUMANOID',
    keywords: [],
    experiencePoints: '100',
    }
    */
  set elementData(value) {
    console.log('asdf');
    this.nameElement.innerHTML = value.name;
  }

  nameElement;
  levelElement;
  sizeElement;
  xpElement;

  connectedCallback() {
    console.log('here', this._elementData);
    this.nameElement = this.shadowRoot.querySelector('.name');

    this.levelElement = this.shadowRoot.querySelector('.level');
    this.levelElement.innerHTML = `Level ${
      exampleMonster.level
    } ${this.capitalizeFirstLetter(exampleMonster.role)}`;

    this.sizeElement = this.shadowRoot.querySelector('.size');
    this.sizeElement.innerHTML = `${this.capitalizeFirstLetter(
      exampleMonster.size
    )} ${this.capitalizeFirstLetter(
      exampleMonster.origin
    )} ${this.capitalizeFirstLetter(exampleMonster.type)}`;

    this.xpElement = this.shadowRoot.querySelector('.xp');
    this.xpElement.innerHTML = `XP: ${exampleMonster.experiencePoints}`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
window.customElements.define('monster-card-header', MonsterCardHeader);
