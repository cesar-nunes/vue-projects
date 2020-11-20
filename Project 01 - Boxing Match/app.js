new Vue({
    el: "#app",
    data: {

    },
    computed: {

    },
    methods: {
        createLogs(playerHit, tysonHit) {
            console.log("Creating logs...")

            // Player log
            const playerLog = document.createElement("div")
            playerLog.className = "base-log player-log"
            playerLog.innerText = `You took ${playerHit}% of Tyson's energy.`

            // Tyson log
            const tysonLog = document.createElement("div")
            tysonLog.className = "base-log tyson-log"
            tysonLog.innerText = `You lost ${tysonHit}% of your energy.`

            // Append logs to the Log Panel
            const logPanel = document.querySelector("div.panel.logs")
            logPanel.appendChild(playerLog)
            logPanel.appendChild(tysonLog)
        }
    },
    watch: {

    }
})