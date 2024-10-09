class Team {
    constructor(name, pokemon){ 
        this.name = name; 
        this.pokemon = pokemon;
    };

    
    checkWinnerTeams(opponentTeam){  
        if(this.pokemon.isAlive()){ 
            console.log(`🎉 ${this.name} with ${this.pokemon.name} absolutely smashed ${opponentTeam.name} and their weak ${opponentTeam.pokemon.name}! 🎉`);
        }else{
            console.log(`🎉 ${opponentTeam.name} with ${opponentTeam.pokemon.name} absolutely smashed ${this.name} and their weak ${this.pokemon.name}! 🎉`);
        };
    };
};


class Pokemon {
    constructor(name, health, magic){
        this.name = name;
        this.health = health;
        this.magic = magic;
        this.skills = []; 
        this.counter = 0;
    };

    learnAttackSkill(newSkill) {
        const messages = [
            `⚡️ ${this.name} just learned a new trick: ${newSkill.attack}`, 
            `🥵 ${this.name} earned deadliest ${newSkill.attack}`, 
            `💣 ${this.name} has just trained ${newSkill.attack}`,
            `🚫 This ${newSkill.attack} is ready to use for ${this.name}`
        ];
    
        console.log(messages[Math.floor(Math.random() * messages.length)]); 
        this.skills.push(newSkill); 
    };

    showStatus(){
        if(this.counter >= 3){ 
            console.log(`\n🏆 The winner is ${this.name} 🏆`);
        } else {
            if (this.health > 0){
                console.log(`🔍 ${this.name} has ${this.health} health and ${this.magic} magic left. Don't give up!!`);
            }else {
                this.magic = 0; 
                console.log("⚔️ I think this was the last attack! No need to hit a fainted foe 😵");
                console.log(`💨 Oops! Not enough magic for that move. ${this.name} has 0 health and 0 magic left. Better luck next time!`);
            }
        }
    };

    getMagics(){
        this.magic += Math.floor(Math.random() * 21);
    };

    hasEnoughMagic(skillName){
        let skill = this.skills.find(skill => skill.attack === skillName); 
        return this.magic >= (skill ? skill.magic : 0);
    };

    isAlive() {
        return this.health > 0;
    };

    attack(skillName, opponent) {
        const skill = this.skills.find(skill => skill.attack === skillName); 
    
        if (this.counter >= 3) {
            this.showStatus();
            return;
        }
    
        if (opponent.counter >= 3 || !this.isAlive() || !opponent.isAlive() || !this.hasEnoughMagic(skillName)) {
            return;
        }
    
        console.log(`\n🔥 ${this.name} unleashes ${skill.attack}! ${opponent.name}, brace yourself! 🫷`);
        console.log(`💀 Aaovv ${opponent.name} looks like 😵‍💫!`);
    
        this.magic -= skill.magic;
        opponent.health -= skill.damage;
        this.showStatus();
        opponent.showStatus();
        this.counter++;
    };
};

class AttackSkill{
    constructor(attack, damage, magic){
        this.attack = attack;
        this.damage = damage;
        this.magic = magic;
    }
};

console.log("🌀 Welcome to the Exciting Pokemon Battle Arena! 🌀\n");

// create new Pokemons
let pikachu = new Pokemon("Pikachu", 120, 80); 
let onix = new Pokemon("Onix", 70, 60);

// create new skills that Pokemons can learn
let lightning = new AttackSkill("lightning", 40, 30);
let poisonSeed = new AttackSkill("poisonSeed", 20, 20);

let rockHead = new AttackSkill("rockHead", 30, 20);
let hiddenAbility = new AttackSkill("hiddenAbility", 50, 40);

//create team
let team1 = new Team("Ash's Team", pikachu);
let team2 = new Team("Brock's Team", onix);

console.log(`📢 ${team1.name} is entering the arena with the legendary ${team1.pokemon.name}, while ${team2.name} brings the powerful ${team2.pokemon.name}! Let the showdown begin!\n`);

// pikachu learning skills
pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(poisonSeed);

// onix learning skills
onix.learnAttackSkill(rockHead);
onix.learnAttackSkill(hiddenAbility);

console.log(`\nSkills are mastered! Time to battle !! 🤺\n`)

// Pokemons starts attacking each other

pikachu.attack("lightning", onix);
onix.attack("rockHead", pikachu);
pikachu.attack("poisonSeed", onix);
onix.attack("hiddenAbility", pikachu);
pikachu.attack("lightning", onix);
onix.attack("rockHead", pikachu);
pikachu.attack("poisonSeed", onix);

console.log(`\nThe battle is over! ¯\_(:/)_/¯\n`);

team1.checkWinnerTeams(team2);



console.log('\n\n-----Opponent team winner example-----')

console.log("\n\n🌀 Welcome to the Another Pokemon Battle Arena! 🌀\n");

// create new Pokemons
let psyduck = new Pokemon("Psyduck", 95, 105);
let wailmer = new Pokemon("Wailmer", 120, 80);

// create new skills that Pokemons can learn
let waterGun = new AttackSkill("waterGun", 30, 20);
let tailWhip = new AttackSkill("tailWhip", 50, 40);

let waterSpout = new AttackSkill("waterSpout", 40, 30);
let waterPulse = new AttackSkill("waterPulse", 20, 20);

//create team
let team3 = new Team("Misty's Team", psyduck);
let team4 = new Team("Robin's Team", wailmer);

console.log(`📢 ${team3.name} is entering the arena with the legendary ${team3.pokemon.name}, while ${team4.name} brings the powerful ${team4.pokemon.name}! Let the showdown begin!\n`);

// psyduck learning skills
psyduck.learnAttackSkill(waterGun);
psyduck.learnAttackSkill(tailWhip);

// wailmer learning skills
wailmer.learnAttackSkill(waterSpout);
wailmer.learnAttackSkill(waterPulse);

console.log(`\nSkills are mastered! Time to battle !! 🤺\n`)

// Pokemons starts attacking each other

wailmer.attack('waterSpout', psyduck);
psyduck.attack('waterGun', wailmer);

wailmer.attack('waterPulse', psyduck);
psyduck.attack('tailWhip', wailmer);

wailmer.attack('waterSpout', psyduck);
psyduck.attack('waterGun', wailmer);

wailmer.attack('waterSpout', psyduck);

console.log(`\nThe battle is over! ¯\_(:/)_/¯\n`);

team3.checkWinnerTeams(team4);






