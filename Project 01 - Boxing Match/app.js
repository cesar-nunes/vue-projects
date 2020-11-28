new Vue({
    el: "#app",
    data: {
        player: {
            life: "100%",
            jab: {
                min: 5,
                max: 10
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
            getJabHit(getRandomNumber) {
                return getRandomNumber(this.jab.min, this.jab.max)
            },
            getCrossHit(getRandomNumber) {
                return getRandomNumber(this.cross.min, this.cross.max)
            },
            getHealValue(getRandomNumber) {
                return getRandomNumber(this.heal.min, this.heal.max)
            },
        },
        tyson: {
            life: "100%",
            minHit: 7,
            maxHit: 12,
            getHit(getRandomNumber) {
                return getRandomNumber(this.minHit, this.maxHit)
            },
        }
    },
    computed: {

    },
    methods: {
        startMatch() {
            console.log("Starting a new match...")

            // // clear and hide log panel
            // this.clearAndHideLogPanel()

            // // reset figthters lifes
            // this.resetFightersLifes()

            // hide "New Match" button and show the others
            document.querySelector("input.new-match").style.display = "none"
            document.querySelector("input.jab").style.display = "block"
            document.querySelector("input.cross").style.display = "block"
            document.querySelector("input.heal").style.display = "block"
            document.querySelector("input.reset").style.display = "block"

            console.log("Control buttons displayed")
            console.log("Match started successfully!")
        },
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
        resetMatch() {
            console.log("Reseting match...")

            // clear and hide log panel
            this.clearAndHideLogPanel()

            // reset figthters lifes
            this.resetFightersLifes()

            // show "New Match" button and hide the others
            document.querySelector("input.new-match").style.display = "block"

            // hide results


            // hide log panel


            console.log("Reset processed successfully!")
        },
        /**
         * Returns a random number between min (inclusive) and max (inclusive)
         * @param {Number} min Minimum number of the interval
         * @param {Number} max Maximum number of the interval
         * @return {Number}    Random number between the interval
         */
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        getFighterLifeAsNumber(fighter) {
            return Number(fighter.life.substring(0, fighter.life.length - 1))
        },
        updateFighterLife(fighter, hitReceived) {
            let fighterLife = this.getFighterLifeAsNumber(fighter)
            fighterLife -= hitReceived

            if (fighterLife >= 100)
                fighter.life = "100%"
            else if (fighterLife <= 0)
                fighter.life = "0%"
            else
                fighter.life = `${fighterLife}%`
        },
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
                playerHealLog.innerText = `You recovered ${healValue}% of your energy.`

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
        updateLifeBarColor(fighter, lifeBar) {
            const fighterLife = this.getFighterLifeAsNumber(fighter)

            if (fighterLife < 20) {
                lifeBar.style.backgroundColor = "red"
            }
            else {
                lifeBar.style.backgroundColor = "green"
            }
        },
        resetFightersLifes() {
            this.player.life = "100%"
            this.tyson.life = "100%"

            console.log("Fighters lifes set to 100%")
        },
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
        }
    },
    watch: {
        'player.life'(newLife, oldLife) {
            // change life bar color if necessary
            const playerLifeBar = document.querySelector("div.player-life-bar")
            this.updateLifeBarColor(this.player, playerLifeBar)

            // if log panel is hidden, display it
            if (window.getComputedStyle(document.querySelector("div.logs")).display === "none") {
                document.querySelector("div.logs").style.display = "block"
                console.log("Log panel displayed")
            }

            // check if match is over
            const playerLife = Number(newLife.substring(0, newLife.length - 1))
            const tysonLife = this.getFighterLifeAsNumber(this.tyson)

            if (playerLife > 0 && tysonLife <= 0) { // you won
                document.querySelector("div.result").style.display = "block"
                document.querySelector("div.you-won").style.display = "block"
            }
            else if (playerLife <= 0 && tysonLife > 0) { // you lost
                document.querySelector("div.result").style.display = "block"
                document.querySelector("div.you-lost").style.display = "block"
            }
            else if (playerLife <= 0 && tysonLife <= 0) { // tie
                document.querySelector("div.result").style.display = "block"
                document.querySelector("div.tie").style.display = "block"
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