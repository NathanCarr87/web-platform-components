const monsterCardTemplate = document.createElement('template');
monsterCardTemplate.innerHTML = `
<style>
.card > .card-body {
  background-color: #e7e4d1;
}
.card > .card-header {
  background-color: #4a5231;
  color: white;
}
.row > .card {
  padding: 0;
}

.row > .card > .card-header{
  background-color: #c7c6b0;
  color: black;
}

</style>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div class="card">
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
</div>

`;

class MonsterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(monsterCardTemplate.content.cloneNode(true));
  }
  nameElement;
  levelElement;
  sizeElement;
  xpElement;
  headerElement;
  initiativeElement;
  sensesElement;
  hitpointsElement;
  armorClassElement;
  speedElement;
  powersElement;
  connectedCallback() {
    // header
    this.nameElement = this.shadowRoot.querySelector('.name');
    this.nameElement.innerHTML = exampleMonster.name;

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

    // Body
    this.initiativeElement = this.shadowRoot.querySelector('.initiative');
    this.initiativeElement.innerHTML = `<strong>Initiative</strong> +${exampleMonster.initiative}`;

    this.sensesElement = this.shadowRoot.querySelector('.senses');
    this.sensesElement.innerHTML = `<strong>Senses</strong> ${exampleMonster.senses}`;

    this.hitpointsElement = this.shadowRoot.querySelector('.hitpoints');
    this.hitpointsElement.innerHTML = `<strong>HP</strong> ${exampleMonster.hitPoints} <strong>Bloodied</strong> ${exampleMonster.bloodied}`;

    this.armorClassElement = this.shadowRoot.querySelector('.armorClass');
    this.armorClassElement.innerHTML = `<strong>AC</strong> ${exampleMonster.armorClass} 
    <strong>Fortitude</strong> ${exampleMonster.fortitude} 
    <strong>Reflex</strong> ${exampleMonster.reflex} 
    <strong>Will</strong> ${exampleMonster.will} 
    `;

    this.speedElement = this.shadowRoot.querySelector('.speed');
    this.speedElement.innerHTML = `<strong>Speed</strong> ${exampleMonster.speed}`;

    this.powersElement = this.shadowRoot.querySelector('.powers');
    console.log(exampleMonster.powers);
    exampleMonster.powers.forEach((power) => {
      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      let cardHeaderDiv = document.createElement('div');
      cardHeaderDiv.classList.add('card-header');
      cardHeaderDiv.innerHTML = `${power.name}`;
      rowDiv.appendChild(cardDiv);
      cardDiv.appendChild(cardHeaderDiv);
      this.powersElement.appendChild(rowDiv);
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
window.customElements.define('monster-card', MonsterCard);
const exampleMonster = {
  header: {
    name: 'Goblin Blackblade',
    level: 1,
    role: 'LURKER',
    size: 'SMALL',
    origin: 'NATURAL',
    type: 'HUMANOID',
    keywords: [],
    experiencePoints: '100',
  },
  name: 'Goblin Blackblade',
  level: 1,
  role: 'LURKER',
  size: 'SMALL',
  origin: 'NATURAL',
  type: 'HUMANOID',
  keywords: [],
  experiencePoints: '100',
  senses: ['low-light vision'],
  initiative: 7,
  aura: '',
  hitPoints: 25,
  bloodied: 12,
  armorClass: 16,
  fortitude: 12,
  reflex: 14,
  will: 11,
  immunities: [],
  resistance: [],
  vulnerable: [],
  savingThrows: 0,
  speed: 6,
  actionPoints: 1,
  alignment: 'EVIL',
  languages: ['COMMON', 'GOBLIN'],
  skills: [
    {
      name: 'STEALTH',
      score: 10,
    },
    {
      name: 'PERCEPTION',
      score: 1,
    },
    {
      name: 'THIEVERY',
      score: 10,
    },
  ],
  healingSurges: 1,
  abilityScores: {
    strength: {
      score: 14,
      modifier: 2,
    },
    dexterity: {
      score: 17,
      modifier: 3,
    },
    wisdom: {
      score: 12,
      modifier: 1,
    },
    constitution: {
      score: 13,
      modifier: 1,
    },
    intelligence: {
      score: 8,
      modifier: -1,
    },
    charisma: {
      score: 8,
      modifier: -1,
    },
  },
  powers: [
    {
      type: 'MELEE BASIC ATTACK',
      name: 'Short Sword',
      action: 'STANDARD',
      actionType: '',
      recharge: 'AT_WILL',
      keywords: ['WEAPON'],
      reach: 1,
      range: 0,
      area: {
        range: 0,
        within: 0,
      },
      targets: '',
      attackBonus: 5,
      targetDefense: 'AC',
      effect: '1d6 + 2 damage',
      miss: '',
      afterEffect: '',
    },
    {
      type: 'INFO',
      name: 'Combat Advantage',
      action: '',
      actionType: '',
      recharge: '',
      keywords: [],
      reach: 1,
      range: 0,
      area: {
        range: 0,
        within: 0,
      },
      targets: '',
      attackBonus: 0,
      targetDefense: '',
      effect:
        'The goblin blackblade deals an extra 1d6 damage against any target it has combat advantage against.',
      miss: '',
      afterEffect: '',
    },
    {
      type: 'INFO',
      name: 'Goblin Tactics',
      action: 'IMMEDIATE_REACTION',
      actionType: 'When missed by a melee attack',
      recharge: 'AT_WILL',
      keywords: [],
      reach: 1,
      range: 0,
      area: {
        range: 0,
        within: 0,
      },
      targets: '',
      attackBonus: 0,
      targetDefense: '',
      effect: 'The goblin shifts 1 square',
      miss: '',
      afterEffect: '',
    },
    {
      type: 'INFO',
      name: 'Sneaky',
      action: '',
      actionType: '',
      recharge: '',
      keywords: [],
      reach: 1,
      range: 0,
      area: {
        range: 0,
        within: 0,
      },
      targets: '',
      attackBonus: 0,
      targetDefense: '',
      effect:
        "When shifting, a goblin blackblade can move into a space occupied by an ally of its level or lower. The ally shifts into the blackblade's previous space as a free action.",
      miss: '',
      afterEffect: '',
    },
  ],
};
