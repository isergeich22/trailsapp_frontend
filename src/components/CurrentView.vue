<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                baseApiUrl: import.meta.env.VITE_BASE_API_URL,
                routes: [],
                pointsSum: [],
                pointsStatus: [],
                packagesStatus: [],
                routePointName: '',
                packagePointName: '',
                packagePointQuantity: 0,
                startSum: 0,
                roadSum: 0,
                purchasesSum: 0,
                endSum: 0,
                message: ''
            }
        },
        async mounted() {

            const response = await axios.get(this.baseApiUrl + 'current')
 
            if(typeof response.data === 'object') {

                this.routes = response.data

                this.routes[0].routePoints.forEach(el => {

                    this.purchasesSum += el.cost
                    this.pointsSum.push(el.cost)
                    this.pointsStatus.push(el.status)

                })

                this.routes[0].packagePoints.forEach(el => {

                    this.packagesStatus.push(el.status)

                })

                this.startSum = this.routes[0].startSum
                this.roadSum = this.routes[0].roadSum
                this.endSum = this.routes[0].startSum - this.purchasesSum - this.routes[0].roadSum
            
            }

            if(typeof response.data === 'string') {

                this.message = response.data

            }

        },
        methods: {

            async endCurrentRoute(executor) {

                // console.log(this.routes[0].executorName, this.routes[0].routeDate, this.routes[0].routePoints)

                const response = await axios.post(this.baseApiUrl + 'save', {
                    executorName: this.routes[0].executorName,
                    routeDate: this.routes[0].routeDate,
                    routePoints: this.routes[0].routePoints,
                    packagePoints: this.routes[0].packagePoints,
                    startSum: this.routes[0].startSum,
                    purchasesSum: this.purchasesSum,
                    roadSum: this.routes[0].roadSum,
                    endSum: this.endSum
                })

                console.log(response.data)
                
                this.routes = response.data
                
            },

            async editRoutePoints(executorName) {

                const response = await axios.put(this.baseApiUrl + 'current/edit_purchase_points', {
                    executorName: executorName,
                    pointName: this.routePointName
                })

                this.routePointName = ''

                this.routes = response.data

                console.log(response.data)

            },

            async editPackagePoints(executorName) {

                const response = await axios.put(this.baseApiUrl + 'current/edit_package_points', {
                    executorName: executorName,
                    pointName: this.packagePointName,
                    pointQuantity: this.packagePointQuantity
                })

                this.packagePointName = ''
                this.packagePointQuantity = 0

                this.routes = response.data

                console.log(response.data)

            },

            async editStartSum(executorName) {

                const response = await axios.put(this.baseApiUrl + 'current/edit_start_sum', {
                    executorName: executorName,
                    startSum: this.startSum
                })

                this.routes = response.data

            },

            async editRoadSum(executorName) {

                const response = await axios.put(this.baseApiUrl + 'current/edit_road_sum', {
                    executorName: executorName,
                    roadSum: parseInt(this.roadSum)
                })

                this.routes = response.data

                console.log(response.data)

            },

            async catchPurchaseStatusChange(executor, point, i) {

                this.pointsStatus[i] = !this.pointsStatus[i]

                console.log(this.pointsStatus[i])

                const response = await axios.put(this.baseApiUrl + 'purchase_update', {
                    executorName: executor,
                    pointName: point,
                    pointStatus: this.pointsStatus[i]
                })

                this.routes = response.data

                console.log(response.data)

            },

            async catchSendStatusChange(executor, packageName, i) {

                this.packagesStatus[i] = !this.packagesStatus[i]

                const response = await axios.put(this.baseApiUrl + 'package_update', {
                    executorName: executor,
                    packageName: packageName,
                    packageStatus: this.packagesStatus[i]
                })

                this.routes = response.data

                console.log(response.data)

            },

            catchPointSumChange(i) {

                document.querySelectorAll('#point_sum').forEach(el => {
                    el.addEventListener('input', () => {
                        this.pointsSum[i] = el.value
                    })
                })

                console.log(this.pointsSum[i])

            },

            async savePointSum(executor, point, i) {

                const response = await axios.put(this.baseApiUrl + 'purchase_update', {
                    executorName: executor,
                    pointName: point,
                    pointSum: this.pointsSum[i]
                })

                this.routes = response.data

                console.log(response.data)

            },

            async removePurchasePoint(executor, point) {

                const response = await axios.put(this.baseApiUrl + 'purchase_remove', {
                    executorName: executor,
                    pointName: point
                })

                this.routes = response.data

                console.log(response.data)

            },

            async removePackagePoint(executor, point) {

                const response = await axios.put(this.baseApiUrl + 'package_remove', {
                    executorName: executor,
                    packageName: point
                })

                this.routes = response.data

                console.log(response.data)

            }

        }
    }
</script>

<template>    
    <template v-if="routes.length > 0" v-for="route in routes" :key="route._id">
        <div class="row">
            <h5>Добавить закупку</h5>
            <div class="input-field col s12 m6 l6">
                <input placeholder="Точка закупки" id="route_point" type="text" class="validate" v-model="routePointName">
                <label for="route_point" class="active">Поставщик</label>
            </div>
            <div class="input-field col s12 m6 l6">
                <button class="waves-effect waves-light btn" @click="editRoutePoints(route.executorName)">Добавить точку</button>
            </div>
        </div>
        <div class="row">
            <h5>Добавить отправку</h5>
            <div class="input-field col s12 m4 l4">
                <input placeholder="Наименование компании" id="package_point" type="text" class="validate" v-model="packagePointName">
                <label for="package_point" class="active">Транспортная компания</label>
            </div>
            <div class="input-field col s12 m4 l4">
                <input id="package_quantity" type="text" class="validate" v-model="packagePointQuantity">
                <label for="package_quantity" class="active">Количество</label>
            </div>
            <div class="input-field col s12 m4 l4">
                <button class="waves-effect waves-light btn" @click="editPackagePoints(route.executorName)">Добавить отгрузку</button>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6 l6">
                <p>{{ route.routeDate }}</p>
                <p>{{ route.executorName }}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6 l6">
                <h5>Закупки</h5>
                <!-- <div class="row">
                    <div class="col s12 m6 l6">
                        <div class="row">
                            <div class="col s14">
                                <p>Статус</p>
                            </div>
                            <div class="col s14">
                                <p>Поставщик</p>
                            </div>
                            <div class="col s14">
                                <p>Сумма</p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <table>
                    <thead>
                        <tr>
                            <th>Статус</th>
                            <th>Поставщик</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rPoint, idx) in route.routePoints">
                            <td>
                                <label v-if="rPoint.status === false">
                                    <input type="checkbox" class="filled-in" @click="catchPurchaseStatusChange(route.executorName, rPoint.name, idx)"/>
                                    <span></span>
                                </label>
                                <label v-if="rPoint.status === true">
                                    <input type="checkbox" checked="checked" class="filled-in" @click="catchPurchaseStatusChange(route.executorName, rPoint.name, idx)"/>
                                    <span></span>
                                </label>
                                <!-- <select>
                                    <option value="" disabled selected></option>
                                    <option value="not_done">Не выполнено</option>
                                    <option value="done">Выполнено</option>
                                </select> -->
                            </td>                        
                            <td>
                               {{ rPoint.name }}
                            </td>
                            <td>
                                <div class="row p-0">
                                    <div class="col s7">
                                        <input id="point_sum" v-model="pointsSum[idx]">
                                    </div>
                                    <div class="col s2">
                                        <button class="waves-effect waves-light btn" @click="savePointSum(route.executorName, rPoint.name, idx)"><i class="material-icons">check_box</i></button>
                                        <button class="waves-effect waves-light red lighten-1 btn" @click="removePurchasePoint(route.executorName, rPoint.name)"><i class="material-icons">delete_forever</i></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col s12 m6 l6">
                <h5>Отгрузки</h5>
                <table>
                    <thead>
                        <tr>
                            <th>Статус</th>
                            <th>Транспортная компания</th>
                            <th>Количество</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(pPoint, idx) in route.packagePoints">                            
                            <td>
                                <label v-if="pPoint.status === false">
                                    <input type="checkbox" class="filled-in" @click="catchSendStatusChange(route.executorName, pPoint.name, idx)"/>
                                    <span></span>
                                </label>
                                <label v-if="pPoint.status === true">
                                    <input type="checkbox" class="filled-in" checked="checked" @click="catchSendStatusChange(route.executorName, pPoint.name, idx)"/>
                                    <span></span>
                                </label>
                                <!-- <select @change="catchStatusChange">
                                    <option value="" disabled selected></option>
                                    <option value="not_done">Не выполнено</option>
                                    <option value="done">Выполнено</option>
                                </select> -->
                            </td>
                            <td>{{ pPoint.name }}</td>
                            <td class="text-center">{{ pPoint.quantity }}</td>
                            <td>
                                <button class="waves-effect waves-light red lighten-1 btn" @click="removePackagePoint(route.executorName, pPoint.name)"><i class="material-icons">delete_forever</i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <h5>Выданная сумма</h5>
            <div class="input-field col s12 m6 l6">
                <input placeholder="Точка закупки" id="start_sum" type="text" class="validate" v-model="startSum">
                <label for="route_point" class="active">Сумма</label>
            </div>
            <div class="input-field col s12 m6 l6">
                <button class="waves-effect waves-light btn" @click="editStartSum(route.executorName)">Обновить</button>
            </div>
        </div>
        <div class="row">
            <h5>Потраченная сумма</h5>
            <div class="input-field col s12 m6 l6">
                <input placeholder="Точка закупки" id="start_sum" type="text" class="validate" :value="purchasesSum">
                <label for="route_point" class="active">Сумма</label>
            </div>
        </div>
        <div class="row">
            <h5>Сумма проезда</h5>
            <div class="input-field col s12 m6 l6">
                <input placeholder="Точка закупки" id="start_sum" type="text" class="validate" v-model="roadSum">
                <label for="route_point" class="active">Сумма</label>
            </div>
            <div class="input-field col s12 m6 l6">
                <button class="waves-effect waves-light btn" @click="editRoadSum(route.executorName)">Обновить</button>
            </div>
        </div>
        <div class="row">
            <h5>Остаточная сумма</h5>
            <div class="input-field col s12 m6 l6">
                <input placeholder="Точка закупки" id="start_sum" type="text" class="validate" :value="endSum">
                <label for="route_point" class="active">Сумма</label>
            </div>
        </div>
        <div class="row">
                <button class="waves-effect waves-light btn" @click="endCurrentRoute(route.executorName)">Закончить маршрут</button>
        </div>
    </template>
    <template v-else>
        <div class="row">
            <div class="col s12">
                <h3>{{ message }}</h3>
            </div>
        </div>
    </template>
</template>

<style>

@media screen and (max-width: 481px) {

    .p-0 {
        padding: 0;
    }

    .text-center {
        text-align: center;
    }
    
}    

</style>