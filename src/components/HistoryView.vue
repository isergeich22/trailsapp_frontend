<script>
    import axios from 'axios'

    function chunckArray(array, chunkSize) {
                
        const result = []
        for(let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize)
            result.push(chunk)
        }
        return result

    }

    export default {
        data() {
            return {
                baseApiUrl: import.meta.env.VITE_BASE_API_URL,
                routes: [],
                message: '',
                toggleList: [],
                paginatedRoutes: [],
                routesPerPage: 10,
                currentPage: 1,
                totalPages: 0
            }
        },

        async mounted() {

            const response = await axios.get(this.baseApiUrl + 'history')

            if(typeof response.data === 'object') {
                this.routes = response.data
                this.routes.forEach(el => {
                    this.toggleList.push(false)
                })                
                this.paginatedRoutes = chunckArray(this.routes, this.routesPerPage)
                this.totalPages = this.paginatedRoutes.length
            }

            if(typeof response.data === 'string') {
                this.message = response.data
            }

        },

        methods: {
            toggleIt(i) {
                this.toggleList[i] = !this.toggleList[i]
            },
            prevPage() {
                // document.getElementById(`${this.currentPage}`).classList.remove('teal')
                // document.getElementById(`${this.currentPage}`).classList.remove('lighten-1')
                this.currentPage--
                // document.getElementById(`${this.currentPage}`).classList.add('teal')
                // document.getElementById(`${this.currentPage}`).classList.add('lighten-1')
            },
            nextPage() {
                // document.getElementById(`${this.currentPage}`).classList.remove('teal')
                // document.getElementById(`${this.currentPage}`).classList.remove('lighten-1')
                this.currentPage++
                // document.getElementById(`${this.currentPage}`).classList.add('teal')
                // document.getElementById(`${this.currentPage}`).classList.add('lighten-1')
            },
            changePage(pageNumber) {
                this.currentPage = pageNumber
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
        <template v-for="(route, idx) in paginatedRoutes[currentPage - 1]">
            <div class="row">            
                <div class="col s12 teal lighten-2 toggle" @click="toggleIt(idx)">
                    <p class="white-text"><b>{{ route.executorName }} - {{ route.routeDate }}</b></p>
                </div>
            </div>
            <div class="border-small mb-10" v-if="toggleList[idx]">
                <div class="row">
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
        <div class="row flex-row">
            <button class="waves-effect waves-teal btn-flat" :disabled="currentPage <= 1" @click="prevPage"><i class="material-icons">chevron_left</i></button>
            <ul class="pagination">
                <li class="waves-effect" v-for="(elem, idx) in paginatedRoutes" :id="idx+1">
                    <button v-if="idx+1 === currentPage" class="waves-effect waves-teal btn-flat teal lighten-1 white-text" @click="changePage(idx+1)">{{ idx + 1 }}</button>
                    <button v-else class="waves-effect waves-teal btn-flat" @click="changePage(idx+1)">{{ idx + 1 }}</button>
                </li>
            </ul>
            <button class="waves-effect waves-teal btn-flat" :disabled="currentPage >= totalPages" @click="nextPage"><i class="material-icons">chevron_right</i></button>
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

    .pagination {
        margin: 0;
    }

        .pagination li {
            height: 35px;
        }

    .toggle {
        cursor: pointer;
    }

    .border-small {
        border: 2px solid #e0e0e0;
    }

    .mb-10 {
        margin-bottom: 10px;
    }

</style>