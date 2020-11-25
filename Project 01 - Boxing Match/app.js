new Vue({
    el: "#app",
    data: {
        player: {
            minJab: 5,
            maxJab: 10,
        },
        tyson: {

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
            console.log(playerHit) 

            // update life bars and life %


            // create logs
            this.createLogs(playerHit, 0)
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
            const minHit = this.player.minJab
            const maxHit = this.player.maxJab
            return this.getRandomNumber(minHit, maxHit)
        },
        getPlayerCrossHit() {

        },
        getPlayerHeal() {

        },
        getTysonHit(){

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