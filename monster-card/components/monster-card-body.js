const template = document.createElement('template');
template.innerHTML = `
<style>
 .card-body {
  background-color: #e7e4d1 !important;
}
.row > .card {
  padding: 0;
}
.row > .card > .card-header{
  background-color: #c7c6b0;
  color: black;
}

.powers > .card  {
  padding-left: .25rem;
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
        <div class="aura"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="hitpoints"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="regeneration"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="armorClass"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="immune"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="resist"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="vulnerable"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="saves"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="speed"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="actionPoints"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="equipment"></div>
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

  set data(value) {
    this.initiativeElement.innerHTML = `<strong>Initiative</strong> +${value.initiative}`;

    const sensesInfo =
      value.senses && value.senses.length > 0
        ? value.senses
            .map((sense) => this.capitalizeFirstLetter(sense))
            .toString()
            .replace(',', ', ')
        : ``;
    this.sensesElement.innerHTML = `<strong>Senses</strong> ${sensesInfo}`;

    if (value.aura) {
      this.auraElement.innerHTML = `<strong>${value.aura.name}</strong> ${
        value.aura.keyword
          ? `(${this.capitalizeFirstLetter(value.aura.keyword)}) `
          : ''
      }
      aura ${value.aura.range};
      ${value.aura.description}
      `;
    }

    this.hitpointsElement.innerHTML = `<strong>HP</strong> ${value.hitpoints} <strong>Bloodied</strong> ${value.bloodied}`;

    if (value.regeneration && value.regeneration.length > 0) {
      this.regenerationElement.innerHTML = `<strong>Regeneration</strong> ${value.regeneration.map(
        (regen) => `${regen.amount} (${regen.description})`
      )} `;
    }

    this.armorClassElement.innerHTML = `<strong>AC</strong> ${
      value.armorClass.value
    } ${
      value.armorClass.description ? `( ${value.armorClass.description})` : ''
    }
    <strong>Fortitude</strong> ${value.fortitude}
    <strong>Reflex</strong> ${value.reflex}
    <strong>Will</strong> ${value.will}
    `;

    if (value.immune && value.immune.length > 0) {
      this.immuneElement.innerHTML = `<strong>Immune</strong> ${value.immune
        .map((imm) => this.capitalizeFirstLetter(imm))
        .toString()
        .replace(',', ', ')}`;
    }

    if (value.resist && value.resist.length > 0) {
      this.resistElement.innerHTML = `<strong>Resist</strong> ${value.resist
        .map((res) => `${res.amount} ${this.capitalizeFirstLetter(res.type)}`)
        .toString()
        .replace(',', ', ')}`;
    }

    if (value.vulnerable && value.vulnerable.length > 0) {
      this.vulnerablelement.innerHTML = `<strong>Vulnerable</strong> ${value.vulnerable
        .map((vul) => `${vul.amount} ${this.capitalizeFirstLetter(vul.type)}`)
        .toString()
        .replace(',', ', ')}`;
    }

    if (value.savingThrows.value > 0) {
      this.savesElement.innerHTML = `<strong>Saving Throws</strong> +${
        value.savingThrows.value
      } ${value.savingThrows.keyword ? `(${value.savingThrows.keyword})` : ''}`;
    }

    this.speedElement.innerHTML = `<strong>Speed</strong> ${
      value.speed.value
    } ${value.speed.swim ? value.speed.swim : ''} ${
      value.speed.fly ? value.speed.fly : ''
    }`;

    if (value.actionPoints) {
      this.actionPointsElement.innerHTML = `<strong>Action Points</strong> ${value.actionPoints}`;
    }

    const equipmentList =
      value.equipment && value.equipment.length > 0
        ? '<strong>Equipment</strong>' +
          value.equipment
            .map((equip) => this.capitalizeFirstLetter(equip))
            .toString()
            .replace(',', ', ')
        : ``;
    this.equipmentElement.innerHTML = ` ${equipmentList}`;

    value.powers.forEach((power) => {
      let rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      let cardHeaderDiv = document.createElement('div');
      cardHeaderDiv.classList.add('card-header');
      const actionRecharge = power.action
        ? `(${this.capitalizeFirstLetter(power.action)}; ${
            power.actionTrigger ? power.actionTrigger + ';' : ''
          } ${this.capitalizeFirstLetter(power.recharge).replace('_', ', ')})`
        : ``;
      const actionKeyword =
        power.keywords && power.keywords.length > 0
          ? `&#9830; <strong>${power.keywords
              .map((key) => this.capitalizeFirstLetter(key))
              .toString()
              .replace(',', ', ')} </strong>`
          : ``;
      cardHeaderDiv.innerHTML = `<strong>${power.name}</strong> ${actionRecharge} ${actionKeyword}`;
      let cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body');
      let cardBodyRowDiv = document.createElement('div');
      cardBodyRowDiv.classList.add('row');

      let rollDetails;
      if (
        power.type === 'MELEE_BASIC_ATTACK' ||
        power.type === 'MELEE_ATTACK'
      ) {
        rollDetails = `${power.reach > 1 ? `Reach ${power.reach} ` : ''} +${
          power.attackBonus
        } vs. ${power.targetDefense};`;
      } else if (
        power.type === 'RANGED_BASIC_ATTACK' ||
        power.type === 'RANGED_ATTACK'
      ) {
        rollDetails = `Ranged ${power.range}; +${power.attackBonus} vs. ${power.targetDefense};`;
      } else if (power.type === 'AREA_ATTACK') {
        rollDetails = `Area burst ${power.area.range} within ${power.area.within} +${power.attackBonus} vs. ${power.targetDefense};`;
      } else {
        rollDetails = '';
      }

      cardBodyRowDiv.innerHTML = `${rollDetails} ${power.effect}`;

      rowDiv.appendChild(cardDiv);
      cardDiv.appendChild(cardHeaderDiv);
      cardBodyDiv.appendChild(cardBodyRowDiv);
      cardDiv.appendChild(cardBodyDiv);
      this.powersElement.appendChild(rowDiv);
    });
  }

  initiativeElement;
  sensesElement;
  auraElement;
  hitpointsElement;
  regenerationElement;
  armorClassElement;
  immuneElement;
  resistElement;
  vulnerablelement;
  savesElement;
  speedElement;
  actionPointsElement;
  powersElement;
  equipmentElement;

  connectedCallback() {
    this.initiativeElement = this.shadowRoot.querySelector('.initiative');
    this.sensesElement = this.shadowRoot.querySelector('.senses');
    this.auraElement = this.shadowRoot.querySelector('.aura');
    this.hitpointsElement = this.shadowRoot.querySelector('.hitpoints');
    this.regenerationElement = this.shadowRoot.querySelector('.regeneration');
    this.immuneElement = this.shadowRoot.querySelector('.immune');
    this.resistElement = this.shadowRoot.querySelector('.resist');
    this.vulnerablelement = this.shadowRoot.querySelector('.vulnerable');
    this.armorClassElement = this.shadowRoot.querySelector('.armorClass');
    this.savesElement = this.shadowRoot.querySelector('.saves');
    this.speedElement = this.shadowRoot.querySelector('.speed');
    this.actionPointsElement = this.shadowRoot.querySelector('.actionPoints');
    this.powersElement = this.shadowRoot.querySelector('.powers');
    this.equipmentElement = this.shadowRoot.querySelector('.equipment');
  }

  capitalizeFirstLetter(string) {
    let response =
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    response = response.includes('_') ? response.replace('_', ' ') : response;
    return response;
  }
}
window.customElements.define('monster-card-body', MonsterCardBody);
