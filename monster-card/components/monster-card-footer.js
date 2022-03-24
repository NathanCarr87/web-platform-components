const template = document.createElement('template');
template.innerHTML = `
<style>
.card-footer {
  background-color: #c7c6b0 !important;
}

</style>
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<div class="card-footer">
    <div class="row">
      <div class="col">
        <div class="alignment"></div>
      </div>
      <div class="col">
        <div class="languages"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="skills"></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="strength"></div>
      </div>
      <div class="col">
        <div class="dexterity"></div>
      </div>
      <div class="col">
        <div class="wisdom"></div>
      </div>
      <div class="col">
        <div class="constitution"></div>
      </div>
      <div class="col">
        <div class="intelligence"></div>
      </div>
      <div class="col">
        <div class="charisma"></div>
      </div>
    </div>
    
  </div>
`;

class MonsterCardFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set data(value) {
    this.alignmentElement.innerHTML = `<strong>Alignment</strong> ${this.capitalizeFirstLetter(
      value.alignment
    )}`;
    const languageMap = value.languages.languages
      .map((lang) => this.capitalizeFirstLetter(lang))
      .toString()
      .replace(',', ', ');
    this.langugesElement.innerHTML = `<strong>Languages</strong> ${languageMap} ${
      value.languages.type
        ? this.capitalizeFirstLetter(value.languages.type)
        : ''
    } 
      ${value.languages.range ? value.languages.range : ''}`;
    this.skillsElement.innerHTML = `<strong>Skills</strong> ${value.skills.map(
      (skill) =>
        ' ' + this.capitalizeFirstLetter(skill.name) + ' ' + skill.score
    )}`;
    this.strengthElement.innerHTML = `<strong>Str</strong> ${value.abilityScores.strength.score} (+${value.abilityScores.strength.modifier})`;
    this.dexterityElement.innerHTML = `<strong>Dex</strong> ${value.abilityScores.dexterity.score} (+${value.abilityScores.dexterity.modifier})`;
    this.wisdomElement.innerHTML = `<strong>Wis</strong> ${value.abilityScores.wisdom.score} (+${value.abilityScores.wisdom.modifier})`;
    this.constitutionElement.innerHTML = `<strong>Con</strong> ${value.abilityScores.constitution.score} (+${value.abilityScores.constitution.modifier})`;
    this.intelligenceElement.innerHTML = `<strong>Con</strong> ${value.abilityScores.intelligence.score} (+${value.abilityScores.intelligence.modifier})`;
    this.charismaElement.innerHTML = `<strong>Cha</strong> ${value.abilityScores.charisma.score} (+${value.abilityScores.charisma.modifier})`;
  }

  alignmentElement;
  langugesElement;
  skillsElement;
  strengthElement;
  dexterityElement;
  wisdomElement;
  constitutionElement;
  intelligenceElement;
  charismaElement;
  connectedCallback() {
    this.alignmentElement = this.shadowRoot.querySelector('.alignment');
    this.langugesElement = this.shadowRoot.querySelector('.languages');
    this.skillsElement = this.shadowRoot.querySelector('.skills');
    this.strengthElement = this.shadowRoot.querySelector('.strength');
    this.dexterityElement = this.shadowRoot.querySelector('.dexterity');
    this.wisdomElement = this.shadowRoot.querySelector('.wisdom');
    this.constitutionElement = this.shadowRoot.querySelector('.constitution');
    this.intelligenceElement = this.shadowRoot.querySelector('.intelligence');
    this.charismaElement = this.shadowRoot.querySelector('.charisma');
  }

  capitalizeFirstLetter(string) {
    let response =
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    response = response.includes('_') ? response.replace('_', ' ') : response;
    return response;
  }
}
window.customElements.define('monster-card-footer', MonsterCardFooter);
