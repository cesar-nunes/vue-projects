new Vue({
    el: "#desafio",
    data: {
        nome: "Cesar",
        idade: 28,
        imgRonaldinho: "https://images.daznservices.com/di/library/GOAL/1b/c5/ronaldinho-barcelona_1slsxexo4gn5z1m0cln77mlj3h.jpg?t=100890353&amp;quality=60&amp;w=700"
    },
    methods: {
        getIdadeVezes3: function() {
            return this.idade * 3
        },
        getRandomNumber: function() {
            return Math.random()
        }
    }
})