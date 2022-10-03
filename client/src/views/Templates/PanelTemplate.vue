<template>
<nav v-if="$store.state.user" class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
    <!-- Sidenav Toggle Button-->
    <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i data-feather="menu"></i></button>
    <!-- Navbar Brand-->
    <!-- * * Tip * * You can use text or an image for your navbar brand.-->
    <!-- * * * * * * When using an image, we recommend the SVG format.-->
    <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px-->
    <a class="navbar-brand pe-3 ps-4 ps-lg-2" :href="$router.resolve({name: 'site-home'}).href">
        <span v-if="$store.state.informations.logo.type == 'text'">{{ $store.state.informations.logo.value }}</span>
        <img v-if="$store.state.informations.logo.type == 'image'" :src="$store.state.informations.logo.value">
    </a>
    <!-- Navbar Search Input-->
    <!-- * * Note: * * Visible only on and above the lg breakpoint-->
    <form class="form-inline me-auto d-none d-lg-block me-3">
        <div class="input-group input-group-joined input-group-solid">
            <input class="form-control pe-0" type="search" placeholder="Search" aria-label="Search" />
            <div class="input-group-text"><i data-feather="search"></i></div>
        </div>
    </form>
    <!-- Navbar Items-->
    <ul class="navbar-nav align-items-center ms-auto">
        <!-- Documentation Dropdown-->
        <li class="nav-item dropdown no-caret d-none d-md-block me-3">
            <a class="nav-link dropdown-toggle" id="navbarDropdownDocs" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="fw-500">Documentation</div>
                <i class="fas fa-chevron-right dropdown-arrow"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end py-0 me-sm-n15 me-lg-0 o-hidden animated--fade-in-up" aria-labelledby="navbarDropdownDocs">
                <a class="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro" target="_blank">
                    <div class="icon-stack bg-primary-soft text-primary me-4"><i data-feather="book"></i></div>
                    <div>
                        <div class="small text-gray-500">Documentation</div>
                        Usage instructions and reference
                    </div>
                </a>
                <div class="dropdown-divider m-0"></div>
                <a class="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/components" target="_blank">
                    <div class="icon-stack bg-primary-soft text-primary me-4"><i data-feather="code"></i></div>
                    <div>
                        <div class="small text-gray-500">Components</div>
                        Code snippets and reference
                    </div>
                </a>
                <div class="dropdown-divider m-0"></div>
                <a class="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-admin-pro/changelog" target="_blank">
                    <div class="icon-stack bg-primary-soft text-primary me-4"><i data-feather="file-text"></i></div>
                    <div>
                        <div class="small text-gray-500">Changelog</div>
                        Updates and changes
                    </div>
                </a>
            </div>
        </li>
        <!-- Navbar Search Dropdown-->
        <!-- * * Note: * * Visible only below the lg breakpoint-->
        <li class="nav-item dropdown no-caret me-3 d-lg-none">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="searchDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="search"></i></a>
            <!-- Dropdown - Search-->
            <div class="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up" aria-labelledby="searchDropdown">
                <form class="form-inline me-auto w-100">
                    <div class="input-group input-group-joined input-group-solid">
                        <input class="form-control pe-0" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div class="input-group-text"><i data-feather="search"></i></div>
                    </div>
                </form>
            </div>
        </li>
        <!-- Alerts Dropdown-->
        <li class="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="bell"></i></a>
            <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                <h6 class="dropdown-header dropdown-notifications-header">
                    <i class="me-2" data-feather="bell"></i>
                    Alerts Center
                </h6>
                <!-- Example Alert 1-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <div class="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i></div>
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-details">December 29, 2021</div>
                        <div class="dropdown-notifications-item-content-text">This is an alert message. It's nothing serious, but it requires your attention.</div>
                    </div>
                </a>
                <!-- Example Alert 2-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <div class="dropdown-notifications-item-icon bg-info"><i data-feather="bar-chart"></i></div>
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-details">December 22, 2021</div>
                        <div class="dropdown-notifications-item-content-text">A new monthly report is ready. Click here to view!</div>
                    </div>
                </a>
                <!-- Example Alert 3-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <div class="dropdown-notifications-item-icon bg-danger"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-details">December 8, 2021</div>
                        <div class="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div>
                    </div>
                </a>
                <!-- Example Alert 4-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <div class="dropdown-notifications-item-icon bg-success"><i data-feather="user-plus"></i></div>
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-details">December 2, 2021</div>
                        <div class="dropdown-notifications-item-content-text">New user request. Woody has requested access to the organization.</div>
                    </div>
                </a>
                <a class="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a>
            </div>
        </li>
        <!-- Messages Dropdown-->
        <li class="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="mail"></i></a>
            <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownMessages">
                <h6 class="dropdown-header dropdown-notifications-header">
                    <i class="me-2" data-feather="mail"></i>
                    Message Center
                </h6>
                <!-- Example Message 1  -->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <img class="dropdown-notifications-item-img" src="assets/img/illustrations/profiles/profile-2.png" />
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        <div class="dropdown-notifications-item-content-details">Thomas Wilcox · 58m</div>
                    </div>
                </a>
                <!-- Example Message 2-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <img class="dropdown-notifications-item-img" src="assets/img/illustrations/profiles/profile-3.png" />
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        <div class="dropdown-notifications-item-content-details">Emily Fowler · 2d</div>
                    </div>
                </a>
                <!-- Example Message 3-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <img class="dropdown-notifications-item-img" src="assets/img/illustrations/profiles/profile-4.png" />
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        <div class="dropdown-notifications-item-content-details">Marshall Rosencrantz · 3d</div>
                    </div>
                </a>
                <!-- Example Message 4-->
                <a class="dropdown-item dropdown-notifications-item" href="#!">
                    <img class="dropdown-notifications-item-img" src="assets/img/illustrations/profiles/profile-5.png" />
                    <div class="dropdown-notifications-item-content">
                        <div class="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        <div class="dropdown-notifications-item-content-details">Colby Newton · 3d</div>
                    </div>
                </a>
                <!-- Footer Link-->
                <a class="dropdown-item dropdown-notifications-footer" href="#!">Read All Messages</a>
            </div>
        </li>
        <!-- User Dropdown-->
        <li class="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-fluid" :src="$store.state.user.image" /></a>
            <div class="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                <h6 class="dropdown-header d-flex align-items-center">
                    <img class="dropdown-user-img" :src="$store.state.user.image" />
                    <div class="dropdown-user-details">
                        <div class="dropdown-user-details-name">{{ $store.state.user.name.first + ' ' + $store.state.user.name.last }}</div>
                        <div class="dropdown-user-details-email">{{ $store.state.user.email }}</div>
                    </div>
                </h6>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" :to="{name: 'panel-user-edit'}">
                    <div class="dropdown-item-icon"><i data-feather="settings"></i></div>
                    {{ $t('account') }}
                </router-link>
                <a class="dropdown-item" href="javascript:;" @click="logout()">
                    <div class="dropdown-item-icon"><i data-feather="log-out"></i></div>
                    {{ $t('logout') }}
                </a>
            </div>
        </li>
    </ul>
</nav>
<div v-if="$store.state.user" id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sidenav shadow-right sidenav-light">
            <div class="sidenav-menu">
                <div class="nav accordion" id="accordionSidenav">
                    <!-- Sidenav Menu Heading (Account)-->
                    <!-- * * Note: * * Visible only on and above the sm breakpoint-->
                    <div class="sidenav-menu-heading d-sm-none">Account</div>
                    <!-- Sidenav Link (Alerts)-->
                    <!-- * * Note: * * Visible only on and above the sm breakpoint-->
                    <a class="nav-link d-sm-none" href="#!">
                        <div class="nav-link-icon"><i data-feather="bell"></i></div>
                        Alerts
                        <span class="badge bg-warning-soft text-warning ms-auto">4 New!</span>
                    </a>
                    <!-- Sidenav Link (Messages)-->
                    <!-- * * Note: * * Visible only on and above the sm breakpoint-->
                    <a class="nav-link d-sm-none" href="#!">
                        <div class="nav-link-icon"><i data-feather="mail"></i></div>
                        Messages
                        <span class="badge bg-success-soft text-success ms-auto">2 New!</span>
                    </a>
                    <!-- Sidenav Menu Heading (Core)-->
                    <div class="sidenav-menu-heading"></div>
                    <!-- Sidenav Accordion (Dashboard)-->
                    <router-link active-class="active" class="nav-link" :to="{name: 'panel-dashboard'}">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.55 20.45v-1.225l.925-.925v2.15Zm4 0v-5.225l.925-.925v6.15Zm4 0V14.3l.925.95v5.2Zm4 0v-5.2l.925-.925v6.125Zm4 0v-9.225l.925-.925v10.15Zm-16-5.925v-1.3L10 6.75l4 4 6.475-6.45v1.3L14 12.05l-4-4Z"/></svg></div>
                        {{ $t('dashboard') }}
                    </router-link>
                    <!-- Sidenav Accordion (Dashboard)-->
                    <router-link active-class="active" class="nav-link" :to="{name: 'panel-blog-list'}">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.225 20.95q-.55 0-.95-.4-.4-.4-.4-.95 0-.55.4-.95.4-.4.95-.4.55 0 .95.4.4.4.4.95 0 .55-.4.95-.4.4-.95.4Zm12.55 0q0-2.875-1.1-5.4-1.1-2.525-2.987-4.425-1.888-1.9-4.413-2.988Q6.75 7.05 3.875 7.05V5.7q3.15 0 5.925 1.2t4.837 3.275q2.063 2.075 3.276 4.85 1.212 2.775 1.212 5.925Zm-5.8 0q0-3.375-2.375-5.75t-5.725-2.375v-1.35q1.95 0 3.675.75 1.725.75 3.012 2.037 1.288 1.288 2.038 3 .75 1.713.75 3.688Z"/></svg></div>
                        {{ $t('blog') }}
                    </router-link>
                    <!-- Sidenav Heading (Addons)-->
                    <div v-if="$store.state.user.can['settings']" class="sidenav-menu-heading">{{ $t('admin') }}</div>
                    <!-- Sidenav Link (Charts)-->
                    <router-link v-if="$store.state.user.can['settings']" :to="{name: 'admin-settings'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.225 20.85 9.85 18q-.3-.075-.875-.387-.575-.313-1.15-.738l-2.625 1.1-1.775-3.125L5.7 13.125q-.05-.25-.075-.525-.025-.275-.025-.575 0-.25.025-.538.025-.287.075-.662l-2.275-1.7L5.2 6.05l2.625 1.1q.425-.35.95-.662Q9.3 6.175 9.85 6l.375-2.85h3.55L14.15 6q.575.2 1.025.475.45.275.925.675l2.7-1.1 1.775 3.075-2.375 1.8q.05.3.075.55.025.25.025.525 0 .25-.025.5t-.1.625l2.35 1.725-1.775 3.125-2.65-1.15q-.45.4-.912.675-.463.275-1.038.475l-.375 2.875Zm1.725-6.425q1 0 1.713-.7.712-.7.712-1.725 0-1.025-.712-1.725-.713-.7-1.713-.7-1.025 0-1.725.7-.7.7-.7 1.725 0 1.025.7 1.725.7.7 1.725.7Zm0-.925q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438.6 0 1.05.438.45.437.45 1.062T13 13.062q-.45.438-1.05.438Zm.05-1.525Zm-1 7.95h1.95l.375-2.725q.75-.2 1.325-.537.575-.338 1.2-.938l2.5 1.075.975-1.675-2.2-1.65q.125-.425.163-.775.037-.35.037-.7 0-.375-.037-.7-.038-.325-.163-.725l2.25-1.7-.975-1.7-2.575 1.1q-.425-.475-1.162-.912-.738-.438-1.363-.588L13 4.05h-2l-.3 2.725q-.775.175-1.375.5T8.1 8.25L5.6 7.175l-.975 1.7 2.15 1.6q-.125.35-.175.737-.05.388-.05.788 0 .375.05.738.05.362.15.762l-2.125 1.625L5.6 16.8l2.475-1.05q.6.6 1.213.95.612.35 1.387.525Z"></path></svg></div>
                        {{ $t('settings') }}
                    </router-link>
                    <router-link v-if="$store.state.user.can['user']" :to="{name: 'admin-user'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 11.4q-1.2 0-2.062-.863-.863-.862-.863-2.062 0-1.2.863-2.063Q10.8 5.55 12 5.55q1.2 0 2.062.862.863.863.863 2.063 0 1.2-.863 2.062Q13.2 11.4 12 11.4Zm-6.85 7.025V16.85q0-.6.338-1.112.337-.513.937-.813 1.425-.65 2.813-1 1.387-.35 2.762-.35t2.763.35q1.387.35 2.812 1 .6.3.938.813.337.512.337 1.112v1.575Zm.9-.925h11.9v-.625q0-.35-.225-.638-.225-.287-.6-.512-1.225-.6-2.512-.913Q13.325 14.5 12 14.5t-2.613.312q-1.287.313-2.512.913-.375.225-.6.512-.225.288-.225.613ZM12 10.475q.825 0 1.413-.588Q14 9.3 14 8.475t-.587-1.413q-.588-.587-1.413-.587-.825 0-1.412.587Q10 7.65 10 8.475q0 .825.588 1.412.587.588 1.412.588Zm0-2Zm0 9.025Z"/></svg></div>
                        {{ $t('user') }}
                    </router-link>
                    <router-link v-if="$store.state.user.can['role']" :to="{name: 'admin-role'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.675 9.1h8.3V7.125q0-1.225-.862-2.1Q13.25 4.15 12 4.15q-1.225 0-2.1.862-.875.863-.875 2.113H8.1q0-1.625 1.138-2.763Q10.375 3.225 12 3.225t2.762 1.137Q15.9 5.5 15.9 7.125V9.1h1.425q.65 0 1.088.45.437.45.437 1.075V19.3q0 .65-.437 1.1-.438.45-1.088.45H6.675q-.65 0-1.087-.45-.438-.45-.438-1.1v-8.675q0-.625.438-1.075.437-.45 1.087-.45Zm0 10.825h10.65q.275 0 .45-.175t.175-.45v-8.675q0-.275-.175-.437-.175-.163-.45-.163H6.675q-.275 0-.45.163-.175.162-.175.437V19.3q0 .275.175.45t.45.175Zm5.325-3.5q.6 0 1.025-.425.425-.425.425-1.025 0-.625-.412-1.037-.413-.413-1.038-.413-.6 0-1.025.413-.425.412-.425 1.037 0 .6.413 1.025.412.425 1.037.425Zm-5.95 3.5v-9.9 9.9Z"/></svg></div>
                        {{ $t('role') }}
                    </router-link>
                    <router-link v-if="$store.state.user.can['group']" :to="{name: 'admin-group'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M1.05 17.525v-.8q0-.925.963-1.525.962-.6 2.512-.6.3 0 .575.037.275.038.525.088-.2.375-.313.787-.112.413-.112.863v1.15Zm6 0V16.45q0-1.2 1.375-1.938Q9.8 13.775 12 13.775q2.225 0 3.6.737 1.375.738 1.375 1.938v1.075Zm11.75 0v-1.15q0-.45-.1-.863-.1-.412-.3-.787.25-.05.525-.088.275-.037.575-.037 1.55 0 2.513.6.962.6.962 1.525v.8ZM12 14.7q-1.675 0-2.825.462-1.15.463-1.2 1.238v.2h8.05v-.2q-.05-.775-1.187-1.238Q13.7 14.7 12 14.7Zm-7.475-1.1q-.575 0-.975-.412-.4-.413-.4-.988 0-.55.4-.95.4-.4.975-.4.55 0 .963.4.412.4.412.95 0 .575-.412.988-.413.412-.963.412Zm14.975 0q-.55 0-.962-.412-.413-.413-.413-.988 0-.55.413-.95.412-.4.962-.4.575 0 .988.4.412.4.412.95 0 .575-.4.988-.4.412-1 .412Zm-7.5-.65q-.9 0-1.525-.625Q9.85 11.7 9.85 10.8q0-.9.625-1.525Q11.1 8.65 12 8.65q.925 0 1.538.625.612.625.612 1.525 0 .9-.612 1.525-.613.625-1.538.625Zm0-3.375q-.5 0-.863.35-.362.35-.362.875 0 .5.362.862.363.363.863.363.525 0 .875-.363.35-.362.35-.862t-.35-.862q-.35-.363-.875-.363Zm.025 7.025ZM12 10.8Z"/></svg></div>
                        {{ $t('group') }}
                    </router-link>
                    <router-link v-if="$store.state.user.can['report']" :to="{name: 'admin-report'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.125 20.4V5.15h7l.4 1.975h5.35V14.9H13.85l-.4-1.975h-6.4V20.4ZM12.5 10.025Zm2.125 3.95h3.325V8.05h-5.2l-.4-2h-5.3V12h7.175Z"/></svg></div>
                        {{ $t('report') }}
                    </router-link>
                    <router-link v-if="$store.state.user.can['menu']" :to="{name: 'admin-menu'}" active-class="active" class="nav-link">
                        <div class="nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.625 17.175v-.925H20.4v.925Zm0-4.725v-.925H20.4v.925Zm0-4.7v-.925H20.4v.925Z"/></svg></div>
                        {{ $t('menu') }}
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <main>
            <router-view></router-view>
        </main>
        <footer class="footer-admin mt-auto footer-light">
            <div class="container-xl px-4">
                <div class="row">
                    <div class="col-md-6 small">{{ $t('footer_0_0_all_rights_reserved', { name: $store.state.informations.name, date: new Date().getFullYear() }) }}</div>
                </div>
            </div>
        </footer>
    </div>
</div>
</template>

<script>
import authenticationService from '@/services/authentication.service';
export default {
    methods: {
        logout(){
            authenticationService.logout()
            this.$store.commit("login", false);
        }
    }
}
</script>