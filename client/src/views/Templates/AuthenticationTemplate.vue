<template>
<div id="layoutAuthentication" class="bg-primary">
    <div id="layoutAuthentication_content">
        <main>
            <router-view></router-view>
        </main>
    </div>
    <div id="layoutAuthentication_footer fixed-bottom">
        <footer class="footer-admin mt-auto footer-dark">
            <div class="container-xl px-4">
                <div class="row">
                    <div class="col-md-6 small">{{ $t('footer_0_0_all_rights_reserved', { name: $store.state.informations.name, date: new Date().getFullYear() }) }}</div>
                </div>
            </div>
        </footer>
    </div>
</div>
</template>