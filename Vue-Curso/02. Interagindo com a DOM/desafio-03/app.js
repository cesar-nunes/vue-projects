const vue = new Vue({
    el: "#desafio",
    data: {
        valor: 0
    },
    computed: {
        resultado() {
            return this.valor == 17 ? "Valor igual" : "Valor diferente"
        }
    },
    watch: {
        resultado(resultadoNovo, resultadoAntigo) {
            setTimeout(() => {
                this.valor = 0
            }, 2000);
        }
    }
})