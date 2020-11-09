new Vue({
    el: '#desafio',
    data: {
        valor: '',
        valor2: ''
    },
    methods: {
        exibirAlerta(event) {
            alert("Isso é um alerta caralho")
        },
        imprimeValorDigitado(event) {
            this.valor = event.target.value
        }
    }
})