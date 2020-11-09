new Vue({
	el: '#desafio',
	data: {
		aplicarEfeito: true,
		classePreto: true,
		classe3: 'quadradoRosa',
		classe4: "",
		classeVerde: false,
		cor5: "orange",
		estilo5: {
			height: "100px",
			width: "100px"
		},
		classeProgresso: '0%'
	},
	methods: {
		iniciarEfeito() {

			setInterval(() => {
				this.aplicarEfeito = !this.aplicarEfeito
			}, 1000)
		},
		iniciarProgresso() {
			
			setInterval(() => {
				let currentWidth = Number(this.classeProgresso.substring(0, this.classeProgresso.length - 1))
				
				if(currentWidth >= 100) {
					this.classeProgresso = '0%'
					return
				}

				currentWidth += 10
				this.classeProgresso = currentWidth.toString() + '%'
			}, 1000)
		},
		setVerde(event) {
			if (event.target.value == "true") {
				this.classeVerde = true
			}
			else if (event.target.value == "false") {
				this.classeVerde = false
			}
		}
	},
	computed: {
		estilo1() {
			return {
				destaque: this.aplicarEfeito,
				encolher: !this.aplicarEfeito
			}
		}
	}
})
