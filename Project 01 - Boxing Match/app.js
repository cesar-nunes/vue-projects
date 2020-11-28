new Vue({
    el: "#app",
    data: {
        player: {
            life: "100%",
            minJab: 5,
            maxJab: 10,
            minCross: 12,
            maxCross: 15,
            minHeal: 10,
            maxHeal: 16,
            getJabHit(getRandomNumber) {
                return getRandomNumber(this.minJab, this.maxJab)
            },
            getCrossHit(getRandomNumber) {
                return getRandomNumber(this.minCross, this.maxCross)
            },
            getHealValue(getRandomNumber) {
                return getRandomNumber(this.minHeal, this.maxHeal)
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

        },
        processJab() {
            console.log("Processing jab...")

            // calculate hits
            const playerHit = this.player.getJabHit(this.getRandomNumber)
            const tysonHit = this.tyson.getHit(this.getRandomNumber)

            console.log(`Player jab hit: ${playerHit}, Tyson hit: ${tysonHit}`)

            // update life bars and life %
            this.updateFighterLife(this.player, tysonHit)
            this.updateFighterLife(this.tyson, playerHit)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(playerHit, tysonHit, null)

            console.log("Jab processed successfully!")
        },
        processCross() {
            console.log("Processing cross...")

            // calculate hits
            const playerHit = this.player.getCrossHit(this.getRandomNumber)
            const tysonHit = this.tyson.getHit(this.getRandomNumber)

            console.log(`Player cross hit: ${playerHit}, Tyson hit: ${tysonHit}`)

            // update life bars and life %
            this.updateFighterLife(this.player, tysonHit)
            this.updateFighterLife(this.tyson, playerHit)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(playerHit, tysonHit, null)

            console.log("Cross processed successfully!")

        },
        processHeal() {
            console.log("Processing heal...")

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
            const logPanel = document.querySelector("div.panel.logs")

            let counter = 0
            while (logPanel.hasChildNodes()) {
                logPanel.removeChild(logPanel.lastChild)
                counter++
            }

            console.log(`${counter} logs removed from the log panel.`)

            // reset life bars and life %
            this.player.life = "100%"
            this.tyson.life = "100%"

            console.log("Fighters lifes set to 100%")

            // show "New Match" button and hide the others

            
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
        updateFighterLife(fighter, hitReceived) {
            let fighterLife = Number(fighter.life.substring(0, fighter.life.length - 1))
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
        }
    },
    watch: {

    }
})