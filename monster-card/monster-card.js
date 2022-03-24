const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div class="card">
<monster-card-header></monster-card-header>
<monster-card-body></monster-card-body>
<monster-card-footer></monster-card-footer>
</div>

`;

class MonsterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set data(value) {
    this.monsterCardHeaderElement.data = {
      name: value.name,
      level: value.level,
      role: value.role,
      size: value.size,
      origin: value.origin,
      type: value.type,
      keywords: value.keywords,
      experiencePoints: value.experiencePoints,
    };

    this.monsterCardBodyElement.data = {
      initiative: value.initiative,
      senses: value.senses,
      aura: value.aura,
      hitpoints: value.hitPoints,
      bloodied: value.bloodied,
      regeneration: value.regeneration,
      armorClass: value.armorClass,
      immune: value.immune,
      resist: value.resist,
      vulnerable: value.vulnerable,
      fortitude: value.fortitude,
      reflex: value.reflex,
      will: value.will,
      savingThrows: value.savingThrows,
      speed: value.speed,
      actionPoints: value.actionPoints,
      equipment: value.equipment,
      powers: value.powers,
    };
    this.monsterCardFooterElement.data = {
      alignment: value.alignment,
      languages: value.languages,
      skills: value.skills,
      abilityScores: value.abilityScores,
    };
  }

  monsterCardHeaderElement;
  monsterCardBodyElement;
  monsterCardFooterElement;
  connectedCallback() {
    // header
    this.monsterCardHeaderElement = this.shadowRoot.querySelector(
      'monster-card-header'
    );

    // Body
    this.monsterCardBodyElement =
      this.shadowRoot.querySelector('monster-card-body');

    // footer
    this.monsterCardFooterElement = this.shadowRoot.querySelector(
      'monster-card-footer'
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
window.customElements.define('monster-card', MonsterCard);
