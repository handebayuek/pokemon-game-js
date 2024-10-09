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

    showStatus(opponent){
        if (this.counter < 3 && opponent.counter < 3){
             
            if (this.health > 0 && this.magic >= 0 && opponent.health > 0 && opponent.magic >= 0){
                console.log(`🔍 ${this.name} has ${this.health} health and ${this.magic} magic left.`); 
                console.log(`🔍 ${opponent.name} has ${opponent.health} health and ${opponent.magic} magic left.`); 

            }else if (this.health <= 0){ 
                console.log("⚔️ I think this was the last attack! No need to hit a fainted foe 😵");
                console.log(`🔍 ${this.name} has ${this.health} health and ${this.magic} magic left.`);
                console.log(`🏆 The winner is ${opponent.name} 🏆`);   

            }else if(opponent.health <= 0){
                console.log("⚔️ I think this was the last attack! No need to hit a fainted foe 😵");
                console.log(`🔍 ${opponent.name} has ${opponent.health} health and ${opponent.magic} magic left.`);
                console.log(`\n🏆 The winner is ${this.name} 🏆`);

            }else if (this.magic < 0){ 
                console.log(`\n💨 Oops! Not enough magic for that move. ${this.name} has 0 magic left. Better luck next time!`);
                console.log(`🏆 The winner is ${opponent.name} 🏆`);

            }else if(opponent.magic < 0){
                console.log(`\n💨 Oops! Not enough magic for that move. ${opponent.name} has 0 magic left. Better luck next time!`);
                console.log(`🏆 The winner is ${this.name} 🏆`);
            };
            
        } else {
            console.log(`\n✋ ${this.name} has already attacked 3 times! and can't attack anymore.`);
            console.log(`🏆 The winner is ${opponent.name} 🏆`);
            fight = false; // because I need to stop the loop when the battle is over
        };
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
        
        if (opponent.isAlive() && this.counter < 3 && opponent.counter < 3){           
            console.log(`\n🔥 ${this.name} unleashes ${skill.attack}! ${opponent.name}, brace yourself! 🫷`);
            console.log(`😵‍💫 ${opponent.name} look like 😵‍💫!`);
            this.magic -= skill.magic; 
            opponent.health -= skill.damage;      
        };

        this.showStatus(opponent); 
        this.counter++; 
        this.getMagics(); 
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
let pikachu = new Pokemon("Pikachu", 70, 90); 
let onix = new Pokemon("Onix", 70, 80);

// create new skills that Pokemons can learn
let lightning = new AttackSkill("lightning", 30, 20); 
let poisonSeed = new AttackSkill("poisonSeed", 50, 40);

let rockHead = new AttackSkill("rockHead", 40, 30);
let hiddenAbility = new AttackSkill("hiddenAbility", 20, 20);

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
let fight = true 

while(pikachu.health > 0 && onix.health > 0 && pikachu.magic >= 0 && onix.magic >= 0 && pikachu.counter <= 3 && onix.counter <= 3 && fight){
  
   switch(Math.floor(Math.random() * 2)){ 
        case 0: 
            let skills1 = ["lightning", "poisonSeed"]
            pikachu.attack(skills1[Math.floor(Math.random()*skills1.length)], onix); 
            break;
        case 1:
            let skills2 = ["rockHead","hiddenAbility"]
            onix.attack(skills2[Math.floor(Math.random()*skills2.length)], pikachu); 
            break;
        default:
            console.log('No attack');
    }; 
};

console.log(`\nThe battle is over! ¯\_(:/)_/¯\n`);

team1.checkWinnerTeams(team2);
 


console.log('\n\n-----other example-----')

console.log("\n\n🌀 Welcome to the Another Pokemon Battle Arena! 🌀\n");

// create new Pokemons
let psyduck = new Pokemon("Psyduck", 60, 80);
let wailmer = new Pokemon("Wailmer", 80, 100);

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

fight = true 
while(psyduck.health > 0 && wailmer.health > 0 && psyduck.magic >= 0 && wailmer.magic >= 0 && psyduck.counter <= 3 && wailmer.counter <= 3 && fight){
 switch (Math.floor(Math.random() * 2)){
        case 0:
            let skills3 = ["waterGun", "tailWhip"]
            psyduck.attack(skills3[Math.floor(Math.random()*skills3.length)], wailmer);
            break;
        case 1:
            let skills4 = ["waterSpout", "waterPulse"]
            wailmer.attack(skills4[Math.floor(Math.random()*skills4.length)], psyduck);
            break;
        default:
            console.log('No attack');
    }; 
};

console.log(`\nThe battle is over! ¯\_(:/)_/¯\n`);

team3.checkWinnerTeams(team4); 
 


