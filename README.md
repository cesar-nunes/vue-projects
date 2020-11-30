# learning-vue
Projects developed when I was learning Vue.js

---

## Projct 01 - Boxing Match
It's a game where the goal is to beat Mike Tyson on a 1x1 boxing match.

### 1. How to Play
Clone this respository and open the file ~/Project 01 - Boxing Match/index.html

### 2. Game Rules
- There are 4 different actions the player can take:
  - **Jab:** it's the standard kind of attack and you can use it whenever you want.
  - **Cross:** it's the most powerful attack in the game and it will be enabled **every 3 rounds**.
  - **Heal:** you can heal **once** during the match. The heal button will be enabled after the first round. In some occasions Mike Tyson's hit might be higher than the healing value, so the player may lose energy even using the healing function.
  - **Reset:** resets the game.
- You will get hit by Mike Tyson on every round, no matter what action you take.
- Mike Tyson's hit is *usually* stronger than the jab and weaker than the cross.
- When the life energy gets critical (<20%) the life bar turns red.
- The match is over when **one or both** life bars hits 0%.

---