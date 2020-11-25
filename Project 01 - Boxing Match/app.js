new Vue({
    el: "#app",
    data: {
        player: {
            life: "100%",
            minJab: 5,
            maxJab: 10
        },
        tyson: {
            life: "100%",
            minHit: 7,
            maxHit: 12
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
            const playerHit = this.getPlayerJabHit()
            const tysonHit = this.getTysonHit()

            console.log(`Player hit: ${playerHit}, Tyson hit: ${tysonHit}`)

            // update life bars and life %
            this.updateFighterLife(this.player, tysonHit)
            this.updateFighterLife(this.tyson, playerHit)

            console.log(`Player life: ${this.player.life}, Tyson life: ${this.tyson.life}`)

            // create logs
            this.createLogs(playerHit, tysonHit)

            console.log("Jab processed successfully!")
        },
        processCross() {
            console.log("Processing cross...")

        },
        processHeal() {
            console.log("Processing heal...")

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


            // show "New Match" button and hide the others
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
        getPlayerJabHit() {
            return this.getRandomNumber(this.player.minJab, this.player.maxJab)
        },
        getPlayerCrossHit() {

        },
        getPlayerHeal() {

        },
        getTysonHit(){
            return this.getRandomNumber(this.tyson.minHit, this.tyson.maxHit)
        },
        updateFighterLife(fighter, opponentHit) {
            let fighterLife = Number(fighter.life.substring(0, fighter.life.length - 1))
            fighterLife -= opponentHit
            fighter.life = fighterLife <= 0 ? "0%" : `${fighterLife}%`
        },
        createLogs(playerHit, tysonHit) {
            console.log("Creating logs...")

            // player log
            const playerLog = document.createElement("div")
            playerLog.className = "base-log player-log"
            playerLog.innerText = `You took ${playerHit.toString()}% of Tyson's energy.`

            // tyson log
            const tysonLog = document.createElement("div")
            tysonLog.className = "base-log tyson-log"
            tysonLog.innerText = `You lost ${tysonHit.toString()}% of your energy.`

            // append logs to the log panel
            const logPanel = document.querySelector("div.panel.logs")
            logPanel.appendChild(playerLog)
            logPanel.appendChild(tysonLog)
        }
    },
    watch: {

    }
})