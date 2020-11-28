new Vue({
    el: "#app",
    data: {
        player: {
            life: "100%",
            jab: {
                min: 6,
                max: 11
            },
            cross: {
                min: 12,
                max: 15,
                counter: 3
            },
            heal: {
                min: 10,
                max: 16,
                counter: 1
            },
            /**
             * Calculates the jab hit value
             * @param {function} getRandomNumber Function that returns a random number between a given interval
             * @return {Number} Jab hit value
             */
            getJabHit(getRandomNumber) {
                return getRandomNumber(this.jab.min, this.jab.max)
            },
            /**
             * Calculates the cross hit value
             * @param {function} getRandomNumber Function that returns a random number between a given interval
             * @return {Number} Cross hit value
             */
            getCrossHit(getRandomNumber) {
                return getRandomNumber(this.cross.min, this.cross.max)
            },
            /**
             * Calculates the heal value
             * @param {function} getRandomNumber Function that returns a random number between a given interval
             * @return {Number} Heal value
             */
            getHealValue(getRandomNumber) {
                return getRandomNumber(this.heal.min, this.heal.max)
            },
        },
        tyson: {
            life: "100%",
            minHit: 7,
            maxHit: 12,
            /**
             * Calculates the Tyson hit
             * @param {function} getRandomNumber Function that returns a random number between a given interval
             * @return {Number} Tyson hit value
             */
            getHit(getRandomNumber) {
                return getRandomNumber(this.minHit, this.maxHit)
            },
        }
    },
    computed: {
        /**
         * Checks if the match is over based on the fighters current life percentage
         * @return {Boolean} Boolean that indicates if the match is over or not
         */
        isMatchOver() {
            const playerLife = this.getFighterLifeAsNumber(this.player)
            const tysonLife = this.getFighterLifeAsNumber(this.tyson)

            if (playerLife <= 0 || tysonLife <= 0) {
                console.log("The fight is over")
                return true
            }
            else {
                console.log("The fighters still have energy to continue fighting")
                return false
            }
        }
    },
    methods: {
        /**
         * Executed when the player presses the "New Match" button
         */
        startMatch() {
            console.log("Starting a new match...")

            this.executeBasicReset()

            // hide "New Match" button and show the others
            document.querySelector("input.new-match").style.display = "none"
            document.querySelector("input.jab").style.display = "block"
            document.querySelector("input.cross").style.display = "block"
            document.querySelector("input.heal").style.display = "block"
            document.querySelector("input.reset").style.display = "block"

            console.log("New Match button hidden and Control buttons displayed")
            console.log("Match started successfully!")
        },
        /**
         * Executed when the player presses the "Jab" button
         */
        processJab() {
            console.log("Processing jab...")

            this.player.cross.counter--

            // calculate hits
            const playerHit = this.player.getJabHit(this.getRandomNumber)
            const tysonHit = this.tyson.getHit(this.getRandomNumber)

            console.log(`Player jab hit: ${playerHit}, Tyson hit: ${tysonHit}`)

            // update life bars and life %
            this.updateFighterLife(this.tyson, playerHit)
            this.updateFighterLife(this.player, tysonHit)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(playerHit, tysonHit, null)

            console.log("Jab processed successfully!")
        },
        /**
         * Executed when the player presses the "Cross" button
         */
        processCross() {
            console.log("Processing cross...")

            this.player.cross.counter = 3

            // calculate hits
            const playerHit = this.player.getCrossHit(this.getRandomNumber)
            const tysonHit = this.tyson.getHit(this.getRandomNumber)

            console.log(`Player cross hit: ${playerHit}, Tyson hit: ${tysonHit}`)

            // update life bars and life %
            this.updateFighterLife(this.tyson, playerHit)
            this.updateFighterLife(this.player, tysonHit)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(playerHit, tysonHit, null)

            console.log("Cross processed successfully!")

        },
        /**
         * Executed when the player presses the "Heal" button
         */
        processHeal() {
            console.log("Processing heal...")

            this.player.heal.counter--
            this.player.cross.counter--

            // calculate player heal value and tyson hit
            const healValue = this.player.getHealValue(this.getRandomNumber)
            const tysonHit = this.tyson.getHit(this.getRandomNumber)

            console.log(`Player heal value: ${healValue}, Tyson hit: ${tysonHit}`)

            // update player life bar and life %
            this.updateFighterLife(this.player, tysonHit - healValue)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(null, tysonHit, healValue)

            console.log("Heal processed successfully!")

        },
        /**
         * Executed when the player presses the "Reset" button
         */
        resetMatch() {
            console.log("Reseting match...")

            this.executeBasicReset()

            // show "New Match" button and hide the others
            this.showNewMatchButtonAndHideOthers()

            console.log("Reset processed successfully!")
        },
        /**
         * Resets most of the parameters used in the application:
         * - Erases the existing logs
         * - Restores fighters lifes
         * - Disables the "Heal" button
         * - Resets both Heal and Cross counters
         * - Hides the result panel
         */
        executeBasicReset() {
            console.log("Executing basic reset...")

            // clear and hide log panel
            this.clearAndHideLogPanel()

            // reset figthters lifes
            this.resetFightersLifes()

            // disable Heal button if it's enabled
            if (!document.querySelector("input.heal").disabled) {
                document.querySelector("input.heal").disabled = true
                document.querySelector("input.heal").style.backgroundColor = "grey"
                console.log("Heal button disabled")
            }

            // reset Heal and Cross counters
            this.player.heal.counter = 1
            this.player.cross.counter = 3

            console.log(`Heal and Cross counters reseted. Heal counter: ${this.player.heal.counter}, Cross counter: ${this.player.cross.counter}`)

            // hide results if they are displayed
            const results = document.querySelectorAll("div.result, div.base-result")
            results.forEach(result => {
                if (window.getComputedStyle(result).display === "block") {
                    result.style.display = "none"
                }
            });

            console.log("Basic reset executed successfully!")
        },
        /**
         * Returns a random number between min (inclusive) and max (inclusive)
         * @param {Number} min Minimum number of the interval
         * @param {Number} max Maximum number of the interval
         * @return {Number} Random number between the interval
         */
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        /**
         * Returns the fighter's current life as an integer.
         * @param {Object} fighter One of the fighters objects present in the Vue instance. It can be "tyson" or the "player".
         * @return {Number} Integer that represents the current life of the fighter 
         */
        getFighterLifeAsNumber(fighter) {
            return Number(fighter.life.substring(0, fighter.life.length - 1))
        },
        /**
         * Updates the fighter's current life based on the opponent hit.
         * @param {Object} fighter One of the fighters objects present in the Vue instance. It can be "tyson" or the "player".
         * @param {Number} value Hit received by the opponent.
         */
        updateFighterLife(fighter, value) {
            let fighterLife = this.getFighterLifeAsNumber(fighter)
            fighterLife -= value

            if (fighterLife >= 100)
                fighter.life = "100%"
            else if (fighterLife <= 0)
                fighter.life = "0%"
            else
                fighter.life = `${fighterLife}%`
        },
        /**
         * Creates the Player hit log, Tyson hit log and healing value log and inserts them into the log panel.
         * @param {Number} playerHit Player hit value
         * @param {Number} tysonHit Tyson hit value
         * @param {Number} healValue Healing value
         */
        createLogs(playerHit, tysonHit, healValue) {
            console.log("Creating logs...")

            const logPanel = document.querySelector("div.panel.logs")

            if (playerHit) {
                console.log("Both fighters hitted.")

                // player hit log
                const playerHitLog = document.createElement("div")
                playerHitLog.className = "base-log player-hit-log"
                playerHitLog.innerText = `You took ${playerHit.toString()}% of Tyson's energy.`

                // tyson hit log
                const tysonHitLog = document.createElement("div")
                tysonHitLog.className = "base-log tyson-hit-log"
                tysonHitLog.innerText = `You lost ${tysonHit.toString()}% of your energy.`

                // append logs to the log panel
                logPanel.appendChild(playerHitLog)
                logPanel.appendChild(tysonHitLog)
            }
            else if (healValue) {
                console.log("Player healed and Tyson hitted.")

                // player heal log
                const playerHealLog = document.createElement("div")
                playerHealLog.className = "base-log player-heal-log"
                playerHealLog.innerText = `You recovered ${healValue.toString()}% of your energy.`

                // tyson hit log
                const tysonHitLog = document.createElement("div")
                tysonHitLog.className = "base-log tyson-hit-log"
                tysonHitLog.innerText = `You lost ${tysonHit.toString()}% of your energy.`

                // append logs to the log panel
                logPanel.appendChild(playerHealLog)
                logPanel.appendChild(tysonHitLog)
            }

            console.log("Logs created successfully!")
        },
        /**
         * Changes the fighter's bar life color depending on the current life percentage
         * @param {Object} fighter One of the fighters objects present in the Vue instance. It can be "tyson" or the "player"
         * @param {Element} lifeBar DOM element that represents the fighter's life bar
         */
        updateLifeBarColor(fighter, lifeBar) {
            const fighterLife = this.getFighterLifeAsNumber(fighter)

            if (fighterLife < 20 && window.getComputedStyle(lifeBar).backgroundColor !== "rgb(255, 0, 0)") { // red: rgb(255, 0, 0)
                lifeBar.style.backgroundColor = "rgb(255, 0, 0)"
            }
            else if (fighterLife >= 20 && window.getComputedStyle(lifeBar).backgroundColor !== "rgb(0, 128, 0)") { // green: rgb(0, 128, 0)
                lifeBar.style.backgroundColor = "rgb(0, 128, 0)"
            }
        },
        /**
         * Sets both fighters' lifes to 100%
         */
        resetFightersLifes() {
            this.player.life = "100%"
            this.tyson.life = "100%"

            console.log("Fighters lifes set to 100%")
        },
        /**
         * Removes all logs from the log panel and then hides it
         */
        clearAndHideLogPanel() {
            console.log("Clearing log panel...")

            const logPanel = document.querySelector("div.panel.logs")

            let counter = 0
            while (logPanel.hasChildNodes()) {
                logPanel.removeChild(logPanel.lastChild)
                counter++
            }

            logPanel.style.display = "none"

            console.log(`${counter} logs removed from the log panel.\nLog panel hidden`)
        },
        /**
         * Displays the "New Match" button and hides all other buttons
         */
        showNewMatchButtonAndHideOthers() {
            document.querySelector("input.new-match").style.display = "block"
            document.querySelector("input.jab").style.display = "none"
            document.querySelector("input.cross").style.display = "none"
            document.querySelector("input.heal").style.display = "none"
            document.querySelector("input.reset").style.display = "none"

            console.log("New Match button displayed and Control buttons hidden")
        }
    },
    watch: {
        'player.life'(newLife, oldLife) {
            // enable Heal button if necessary
            if (document.querySelector("input.heal").disabled && newLife !== "100%" && this.player.heal.counter !== 0) {
                document.querySelector("input.heal").disabled = false
                document.querySelector("input.heal").style.backgroundColor = "green"
                console.log("Heal button enabled")
            }

            // change life bar color if necessary
            const playerLifeBar = document.querySelector("div.player-life-bar")
            this.updateLifeBarColor(this.player, playerLifeBar)

            // if log panel is hidden and player life is not 100%, display it
            if (window.getComputedStyle(document.querySelector("div.logs")).display === "none" && newLife !== "100%") {
                document.querySelector("div.logs").style.display = "block"
                console.log("Log panel displayed")
            }

            // check if match is over
            if (this.isMatchOver) {
                document.querySelector("div.result").style.display = "block"
                this.showNewMatchButtonAndHideOthers()

                const playerLife = this.getFighterLifeAsNumber(this.player)
                const tysonLife = this.getFighterLifeAsNumber(this.tyson)

                if (playerLife > 0 && tysonLife <= 0) { // you won
                    document.querySelector("div.you-won").style.display = "block"
                }
                else if (playerLife <= 0 && tysonLife > 0) { // you lost
                    document.querySelector("div.you-lost").style.display = "block"
                }
                else if (playerLife <= 0 && tysonLife <= 0) { // tie
                    document.querySelector("div.tie").style.display = "block"
                }
            }
        },
        'tyson.life'(newLife, oldLife) {
            // change life bar color if necessary
            const tysonLifeBar = document.querySelector("div.tyson-life-bar")
            this.updateLifeBarColor(this.tyson, tysonLifeBar)
        },
        'player.cross.counter'(newCounter, oldCounter) {
            console.log(`Cross counter is now ${newCounter}`)

            if (newCounter === 0) { // enable cross button
                document.querySelector("input.cross").disabled = false
                document.querySelector("input.cross").style.backgroundColor = "orange"

                console.log("Cross button is enabled")
            }
            else if (newCounter > 0) { // disable cross button
                document.querySelector("input.cross").disabled = true
                document.querySelector("input.cross").style.backgroundColor = "grey"

                console.log("Cross button is disabled")
            }
        },
        'player.heal.counter'(newCounter, oldCounter) {
            console.log(`Heal counter is now ${newCounter}`)

            if (newCounter === 0) {
                document.querySelector("input.heal").disabled = true
                document.querySelector("input.heal").style.backgroundColor = "grey"

                console.log("Heal button is disabled")
            }
        },
    }
})