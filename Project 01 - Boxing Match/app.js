new Vue({
    el: "#app",
    data: {

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


            // update life bars and life %


            // create logs
            this.createLogs(10, 8)
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