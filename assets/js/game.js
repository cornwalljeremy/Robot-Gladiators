var fightOrSkip = function () {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt(
    'Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
  );
  promptFight = promptFight.toLowerCase();

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("give me something.");
    return fightOrSkip();
  }

  // if user picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("are you sure whimp?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(
        playerInfo.name + " has decided to skip this fight. Goodbye!"
      );
      // subtract money from playerMoney for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      return true;
      // shop();
    }
  }
};

var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask user if they'd like to fight or skip using fightOrSkip function
    if (fightOrSkip()) {
      // if true, leave fight by breaking loop
      break;
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name +
        " attacked " +
        enemy.name +
        ". " +
        enemy.name +
        " now has " +
        enemy.health +
        " health remaining."
    );
  }

  // check enemy's health
  if (enemy.health <= 0) {
    window.alert(enemy.name + " has died!");

    // award player money for winning
    playerInfo.money = playerInfo.money + 20;

    // leave while() loop since enemy is dead
    // break;
  } else {
    window.alert(enemy.name + " still has " + enemy.health + " health left.");
  }

  // remove players's health by subtracting the amount set in the enemy.attack variable
  var damage = randomNumber(enemy.attack - 3, enemy.attack);

  playerInfo.health = Math.max(0, playerInfo.health - damage);
  console.log(
    enemy.name +
      " attacked " +
      playerInfo.name +
      ". " +
      playerInfo.name +
      " now has " +
      playerInfo.health +
      " health remaining."
  );

  // check player's health
  if (playerInfo.health <= 0) {
    window.alert(playerInfo.name + " has died!");
    // leave while() loop if player is dead
    // break;
  } else {
    window.alert(
      playerInfo.name + " still has " + playerInfo.health + " health left."
    );
  }
};

var startGame = function () {
  for (var i = 0; i < enemyInfo.length; i++) {
    playerInfo.reset();

    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    } else {
      window.alert("You Are A Loser! GAME OVER! ");
    }
    var pickedEnemyObj = enemyInfo[i];
    //reset enemy.health
    // enemy.health = Math.floor(Math.random() * 21) + 40;
    pickedEnemyObj.health = randomNumber(40, 60);
    // call fight function with enemy robot
    fight(pickedEnemyObj);
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      var storeConfirm = window.confirm("Fight is over! Visit the store?");
      if (storeConfirm) {
        shop();
      }
    }
  }
  endGame();
};
var endGame = function () {
  if (playerInfo.health > 0) {
    window.alert(
      "Don't hurt yourself patting yourself on the back cause you won! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("Shit's Over! Let See how bad you did!");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};
var shop = function () {
  var shopOptionPrompt = window.prompt(
    "Do you want to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }

  // call shop() again to force player to pick a valid option
  // shop();

  // break;
};
// function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};
var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("refilling player health by 20 for 7 dollhairs");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("you oudda scratch!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("upgrading player's attack by 6 for 7 dollHairs");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("not enough scratch!");
    }
  },
};

// You can also log multiple values at once like this
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

startGame();
