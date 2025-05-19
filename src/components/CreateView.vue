<script>
    import axios from 'axios'
    function setDate() {

        const date = new Date()

        let dateString = `${date.getDate()}.`

        date.getMonth()+1 < 10 ? dateString += `0${date.getMonth()+1}.${date.getFullYear()}` : dateString += `${date.getMonth()+1}.${date.getFullYear()}`

        return dateString

    }
    export default {
        data() {
            return {
                baseApiUrl: import.meta.env.VITE_BASE_API_URL,
                routePoints: [],
                packagePoints: [],
                routePointName: '',
                packagePointName: '',
                packagePointQuantity: 0,
                routeDate: setDate(),
                pointCost: 0,
                executorName: '',
                startSum: 0,
                route: {}
            }
        },
        methods: {
            addRoutePoint() {
                this.routePoints.push({
                    name: this.routePointName,
                    cost: 0,
                    status: false
                })
                this.routePointName = ''
            },
            addPackagePoint() {
                this.packagePoints.push({
                    name: this.packagePointName,
                    quantity: this.packagePointQuantity,
                    status: false
                })
                this.packagePointName = ''
                this.packagePointQuantity = 0
            },
            async createRoute(e) {
                e.preventDefault()
                console.log(this.baseApiUrl)
                if(this.routePoints.length > 0 || this.packagePoints.length > 0) {
                    this.route = {
                        routePoints: this.routePoints,
                        packagePoints: this.packagePoints,
                        startSum: parseInt(this.startSum),
                        executorName: this.executorName,
                        routeDate: this.routeDate
                    }
                    const response = await axios.post(this.baseApiUrl + 'create', this.route, {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    this.routePoints = [],
                    this.packagePoints = [],
                    this.executorName = '',
                    this.startSum = 0
                    this.route = {}
                    console.log(response.data)
                }
            }
        }
    }
    
</script>

<template>
    <div class="row">
        <h5>Закупки</h5>
        <div class="input-field col s12 m6 l6">
            <input placeholder="Точка закупки" id="route_point" type="text" class="validate" v-model="routePointName">
            <label for="route_point" class="active">Поставщик</label>
        </div>
        <div class="input-field col s12 m6 l6">
            <button class="waves-effect waves-light btn" @click="addRoutePoint">Добавить точку</button>
        </div>
    </div>
    <div class="row">
        <h5>Отправки</h5>
        <div class="input-field col s12 m4 l4">
            <input placeholder="Наименование компании" id="package_point" type="text" class="validate" v-model="packagePointName">
            <label for="package_point" class="active">Транспортная компания</label>
        </div>
        <div class="input-field col s12 m4 l4">
            <input id="package_quantity" type="text" class="validate" v-model="packagePointQuantity">
            <label for="package_quantity" class="active">Количество</label>
        </div>
        <div class="input-field col s12 m4 l4">
            <button class="waves-effect waves-light btn" @click="addPackagePoint">Добавить отгрузку</button>
        </div>
    </div>
        <div class="row">
            <div class="col s12 m6 l6" v-if="routePoints.length > 0">
                <h5>Закупки</h5>
                <ul class="collection">
                    <li class="collection-item" v-for="rPoint in routePoints">{{ rPoint.name }}</li>
                </ul>
            </div>
            <div class="col s12 m6 l6" v-if="packagePoints.length > 0">
                <h5>Отправки</h5>
                <ul class="collection">
                    <li class="collection-item" v-for="pPoint in packagePoints">{{ pPoint.name }} - {{ pPoint.quantity }}</li>
                </ul>
            </div>
        </div>
    <div class="row">        
        <div class="input-field col s12 m6 l6">
            <input id="start_sum" type="text" class="validate" v-model="startSum">
            <label for="start_sum" class="active">Сумма для закупки</label>            
        </div>
        <div class="input-field col s12 m6 l6">            
            <select v-model="executorName">
            <option value="" disabled selected>Выбрать исполнителя маршрута</option>
                <option value="Любимов И.С.">Любимов И.С.</option>
                <option value="Близнов Г.В.">Близнов Г.В.</option>
                <option value="Зотов С.В.">Зотов С.В.</option>
            </select>
            <label class="active">Исполнитель</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <button class="waves-effect waves-light btn" @click="createRoute">Создать маршрут</button>
        </div>
    </div>
</template>

<style>

    .row {
        padding: 10px 15px;
    }

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 2%;
    }

    select {
        display: block;
    }

</style>