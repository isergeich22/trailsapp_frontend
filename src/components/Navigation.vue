<script>
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, edge);
    });
</script>

<template>
    <nav class="teal lighten-1">
        <div class="nav-wrapper">            
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <a href="#" class="brand-logo text-small">Route Planner</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="/create">Создать маршрут</a></li>
                <li><a href="/current">Текущий маршрут</a></li>
                <li><a href="/history">История маршрутов</a></li>
            </ul>
        </div>
    </nav>
    <ul id="slide-out" class="sidenav">
        <li><a href="/create">Создать маршрут</a></li>
        <li><a href="/current">Текущий маршрут</a></li>
        <li><a href="/history">История маршрутов</a></li>
    </ul>
</template>

<style>

    nav .brand-logo {
        padding: 0 10px;
    }

    @media screen and (max-width: 481px) {

        .text-small {
            font-size: 1rem !important;
        }
        
    }

</style>