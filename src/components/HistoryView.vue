<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                baseApiUrl: import.meta.env.VITE_BASE_API_URL,
                routes: [],
                message: ''
            }
        },

        async mounted() {

            const response = await axios.get(this.baseApiUrl + 'history')

            if(typeof response.data === 'object') {
                this.routes = response.data
            }

            if(typeof response.data === 'string') {
                this.message = response.data
            }

        }
    }
</script>

<template>
    <template v-if="routes.length > 0">        
        <div class="row">
            <div class="col s12">
                <h3>История маршрутов</h3>
            </div>
        </div>
        <template v-for="route in routes">
            <div class="border-small mb-10">
                <div class="row">
                    <div class="col s12">
                        <p><b>{{ route.executorName }} - {{ route.routeDate }}</b></p>
                    </div>
                    <div class="col s12 m6 l6">
                        <h5>Закупки</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>Поставщик</th>
                                    <th>Сумма</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(rPoint, idx) in route.routePoints">                        
                                    <td>
                                    {{ rPoint.name }}
                                    </td>
                                    <td>
                                    {{ rPoint.cost }}
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
                                    <th>Транспортная компания</th>
                                    <th>Количество</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pPoint, idx) in route.packagePoints">
                                    <td>{{ pPoint.name }}</td>
                                    <td>{{ pPoint.quantity }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m3 l3">
                        <p>Начальная сумма: {{ route.startSum }}</p>
                    </div>
                    <div class="col s12 m3 l3">
                        <p>Потраченная сумма: {{ route.purchasesSum }}</p>
                    </div>
                    <div class="col s12 m3 l3">
                        <p>Сумма проезда: {{ route.roadSum }}</p>
                    </div>
                    <div class="col s12 m3 l3">
                        <p>Конечная сумма: {{ route.endSum }}</p>
                    </div>
                </div>
            </div>
        </template>
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

    .border-small {
        border: 2px solid #e0e0e0;
    }

    .mb-10 {
        margin-bottom: 10px;
    }

</style>