<template>
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div class="container-xl px-4">
            <div class="page-header-content pt-4">
                <div class="row align-items-center justify-content-between">
                    <div class="col-auto mt-4">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                            Dashboard
                        </h1>
                        <div class="page-header-subtitle">Example dashboard overview and content summary</div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container-xl px-4 mt-n10">
        <div class="row">
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 1-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package feather-xl text-primary mb-3"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                <h5>Powerful Components</h5>
                                <div class="text-muted small">To create informative visual elements on your pages</div>
                            </div>
                            <img src="/assets/img/illustrations/browser-stats.svg" alt="..." style="width: 8rem">
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 2-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book feather-xl text-secondary mb-3"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                <h5>Documentation</h5>
                                <div class="text-muted small">To keep you on track when working with our toolkit</div>
                            </div>
                            <img src="/assets/img/illustrations/processing.svg" alt="..." style="width: 8rem">
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xl-4 mb-4">
                <!-- Dashboard example card 3-->
                <a class="card lift h-100" href="#!">
                    <div class="card-body d-flex justify-content-center flex-column">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout feather-xl text-green mb-3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                <h5>Pages &amp; Layouts</h5>
                                <div class="text-muted small">To help get you started when building your new UI</div>
                            </div>
                            <img src="/assets/img/illustrations/windows.svg" alt="..." style="width: 8rem">
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-8">
                <!-- Tabbed dashboard card example-->
                <div class="card mb-4">
                    <div class="card-header border-bottom">
                        <!-- Dashboard card navigation-->
                        <ul class="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                            <li class="nav-item me-1"><a class="nav-link active" id="overview-pill" href="#overview" data-bs-toggle="tab" role="tab" aria-controls="overview" aria-selected="true">Overview</a></li>
                            <li class="nav-item"><a class="nav-link" id="activities-pill" href="#activities" data-bs-toggle="tab" role="tab" aria-controls="activities" aria-selected="false">Activities</a></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="dashboardNavContent">
                            <!-- Dashboard Tab Pane 1-->
                            <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-pill">
                                <div class="chart-area mb-4 mb-lg-0" style="height: 20rem"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div><canvas id="myAreaChart" width="629" height="320" style="display: block; width: 629px; height: 320px;" class="chartjs-render-monitor"></canvas></div>
                            </div>
                            <!-- Dashboard Tab Pane 2-->
                            <div class="tab-pane fade" id="activities" role="tabpanel" aria-labelledby="activities-pill">
                                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"><div class="dataTable-top"><div class="dataTable-dropdown"><label><select class="dataTable-selector"><option value="5">5</option><option value="10" selected="">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option></select> entries per page</label></div><div class="dataTable-search"><input class="dataTable-input" placeholder="Search..." type="text"></div></div><div class="dataTable-container"><table id="datatablesSimple" class="dataTable-table">
                                    <thead>
                                        <tr><th data-sortable=""><a href="#" class="dataTable-sorter">Date</a></th><th data-sortable=""><a href="#" class="dataTable-sorter">Event</a></th><th data-sortable=""><a href="#" class="dataTable-sorter">Time</a></th></tr>
                                    </thead>
                                    
                                    <tbody><tr><td>01/13/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap me-2 text-green"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                                Server online
                                            </td><td>1:21 AM</td></tr><tr><td>01/13/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap-off me-2 text-red"><polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                Server restarted
                                            </td><td>1:00 AM</td></tr><tr><td>01/12/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2 text-purple"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                New order placed! Order #
                                                <a href="#!">1126550</a>
                                            </td><td>5:45 AM</td></tr><tr><td>01/12/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user me-2 text-blue"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                Valerie Luna submitted
                                                <a href="#!">quarter four report</a>
                                            </td><td>4:23 PM</td></tr><tr><td>01/12/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database me-2 text-yellow"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                                                Database backup created
                                            </td><td>3:51 AM</td></tr><tr><td>01/12/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2 text-purple"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                New order placed! Order #
                                                <a href="#!">1126549</a>
                                            </td><td>1:22 AM</td></tr><tr><td>01/11/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus me-2 text-blue"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                                                New user created:
                                                <a href="#!">Sam Malone</a>
                                            </td><td>4:18 PM</td></tr><tr><td>01/11/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2 text-purple"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                New order placed! Order #
                                                <a href="#!">1126548</a>
                                            </td><td>4:02 PM</td></tr><tr><td>01/11/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart me-2 text-purple"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                New order placed! Order #
                                                <a href="#!">1126547</a>
                                            </td><td>3:47 PM</td></tr><tr><td>01/11/20</td><td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zap me-2 text-green"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                                Server online
                                            </td><td>1:19 AM</td></tr></tbody>
                                </table></div><div class="dataTable-bottom"><div class="dataTable-info">Showing 1 to 10 of 14 entries</div><nav class="dataTable-pagination"><ul class="dataTable-pagination-list"><li class="active"><a href="#" data-page="1">1</a></li><li class=""><a href="#" data-page="2">2</a></li><li class="pager"><a href="#" data-page="2">›</a></li></ul></nav></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Illustration dashboard card example-->
                <div class="card mb-4">
                    <div class="card-body py-5">
                        <div class="d-flex flex-column justify-content-center">
                            <img class="img-fluid mb-4" src="/assets/img/illustrations/data-report.svg" alt="" style="height: 10rem">
                            <div class="text-center px-0 px-lg-5">
                                <h5>New reports are here! Generate custom reports now!</h5>
                                <p class="mb-4">Our new report generation system is now online. You can start creating custom reporting for any documents available on your account.</p>
                                <a class="btn btn-primary p-3" href="#!">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6 mb-4">
                        <!-- Dashboard activity timeline example-->
                        <div class="card card-header-actions h-100">
                            <div class="card-header">
                                Recent Activity
                                <div class="dropdown no-caret">
                                    <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownMenuButton" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical text-gray-500"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                    <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownMenuButton">
                                        <h6 class="dropdown-header">Filter Activity:</h6>
                                        <a class="dropdown-item" href="#!"><span class="badge bg-green-soft text-green my-1">Commerce</span></a>
                                        <a class="dropdown-item" href="#!"><span class="badge bg-blue-soft text-blue my-1">Reporting</span></a>
                                        <a class="dropdown-item" href="#!"><span class="badge bg-yellow-soft text-yellow my-1">Server</span></a>
                                        <a class="dropdown-item" href="#!"><span class="badge bg-purple-soft text-purple my-1">Users</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="timeline timeline-xs">
                                    <!-- Timeline Item 1-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">27 min</div>
                                            <div class="timeline-item-marker-indicator bg-green"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            New order placed!
                                            <a class="fw-bold text-dark" href="#!">Order #2912</a>
                                            has been successfully placed.
                                        </div>
                                    </div>
                                    <!-- Timeline Item 2-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">58 min</div>
                                            <div class="timeline-item-marker-indicator bg-blue"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            Your
                                            <a class="fw-bold text-dark" href="#!">weekly report</a>
                                            has been generated and is ready to view.
                                        </div>
                                    </div>
                                    <!-- Timeline Item 3-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">2 hrs</div>
                                            <div class="timeline-item-marker-indicator bg-purple"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            New user
                                            <a class="fw-bold text-dark" href="#!">Valerie Luna</a>
                                            has registered
                                        </div>
                                    </div>
                                    <!-- Timeline Item 4-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">1 day</div>
                                            <div class="timeline-item-marker-indicator bg-yellow"></div>
                                        </div>
                                        <div class="timeline-item-content">Server activity monitor alert</div>
                                    </div>
                                    <!-- Timeline Item 5-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">1 day</div>
                                            <div class="timeline-item-marker-indicator bg-green"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            New order placed!
                                            <a class="fw-bold text-dark" href="#!">Order #2911</a>
                                            has been successfully placed.
                                        </div>
                                    </div>
                                    <!-- Timeline Item 6-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">1 day</div>
                                            <div class="timeline-item-marker-indicator bg-purple"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            Details for
                                            <a class="fw-bold text-dark" href="#!">Marketing and Planning Meeting</a>
                                            have been updated.
                                        </div>
                                    </div>
                                    <!-- Timeline Item 7-->
                                    <div class="timeline-item">
                                        <div class="timeline-item-marker">
                                            <div class="timeline-item-marker-text">2 days</div>
                                            <div class="timeline-item-marker-indicator bg-green"></div>
                                        </div>
                                        <div class="timeline-item-content">
                                            New order placed!
                                            <a class="fw-bold text-dark" href="#!">Order #2910</a>
                                            has been successfully placed.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 mb-4">
                        <!-- Pie chart with legend example-->
                        <div class="card h-100">
                            <div class="card-header">Traffic Sources</div>
                            <div class="card-body">
                                <div class="chart-pie mb-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div><canvas id="myPieChart" width="629" height="240" class="chartjs-render-monitor" style="display: block; width: 629px; height: 240px;"></canvas></div>
                                <div class="list-group list-group-flush">
                                    <div class="list-group-item d-flex align-items-center justify-content-between small px-0 py-2">
                                        <div class="me-3">
                                            <svg class="svg-inline--fa fa-circle fa-sm me-1 text-blue" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path></svg><!-- <i class="fas fa-circle fa-sm me-1 text-blue"></i> Font Awesome fontawesome.com -->
                                            Direct
                                        </div>
                                        <div class="fw-500 text-dark">55%</div>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center justify-content-between small px-0 py-2">
                                        <div class="me-3">
                                            <svg class="svg-inline--fa fa-circle fa-sm me-1 text-purple" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path></svg><!-- <i class="fas fa-circle fa-sm me-1 text-purple"></i> Font Awesome fontawesome.com -->
                                            Social
                                        </div>
                                        <div class="fw-500 text-dark">15%</div>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center justify-content-between small px-0 py-2">
                                        <div class="me-3">
                                            <svg class="svg-inline--fa fa-circle fa-sm me-1 text-green" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path></svg><!-- <i class="fas fa-circle fa-sm me-1 text-green"></i> Font Awesome fontawesome.com -->
                                            Referral
                                        </div>
                                        <div class="fw-500 text-dark">30%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-4">
                <div class="row">
                    <div class="col-xl-6 col-xxl-12">
                        <!-- Team members / people dashboard card example-->
                        <div class="card mb-4">
                            <div class="card-header">People</div>
                            <div class="card-body">
                                <!-- Item 1-->
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-1.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Sid Rooney</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople1" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople1">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Item 2-->
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-2.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Keelan Garza</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople2" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople2">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Item 3-->
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-3.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Kaia Smyth</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople3" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople3">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Item 4-->
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-4.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Kerri Kearney</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople4" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople4">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Item 5-->
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-5.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Georgina Findlay</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople5" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople5">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Item 6-->
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center flex-shrink-0 me-3">
                                        <div class="avatar avatar-xl me-3 bg-gray-200"><img class="avatar-img img-fluid" src="/assets/img/illustrations/profiles/profile-6.png" alt=""></div>
                                        <div class="d-flex flex-column fw-bold">
                                            <a class="text-dark line-height-normal mb-1" href="#!">Wilf Ingram</a>
                                            <div class="small text-muted line-height-normal">Position</div>
                                        </div>
                                    </div>
                                    <div class="dropdown no-caret">
                                        <button class="btn btn-transparent-dark btn-icon dropdown-toggle" id="dropdownPeople6" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                                        <div class="dropdown-menu dropdown-menu-end animated--fade-in-up" aria-labelledby="dropdownPeople6">
                                            <a class="dropdown-item" href="#!">Action</a>
                                            <a class="dropdown-item" href="#!">Another action</a>
                                            <a class="dropdown-item" href="#!">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-xxl-12">
                        <!-- Project tracker card example-->
                        <div class="card card-header-actions mb-4">
                            <div class="card-header">
                                Projects
                                <a class="btn btn-sm btn-primary-soft text-primary" href="#!">Create New</a>
                            </div>
                            <div class="card-body">
                                <!-- Progress item 1-->
                                <div class="d-flex align-items-center justify-content-between small mb-1">
                                    <div class="fw-bold">Server Setup</div>
                                    <div class="small">25%</div>
                                </div>
                                <div class="progress mb-3"><div class="progress-bar bg-danger" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div>
                                <!-- Progress item 2-->
                                <div class="d-flex align-items-center justify-content-between small mb-1">
                                    <div class="fw-bold">Database Migration</div>
                                    <div class="small">50%</div>
                                </div>
                                <div class="progress mb-3"><div class="progress-bar bg-warning" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>
                                <!-- Progress item 3-->
                                <div class="d-flex align-items-center justify-content-between small mb-1">
                                    <div class="fw-bold">Version Release</div>
                                    <div class="small">75%</div>
                                </div>
                                <div class="progress mb-3"><div class="progress-bar bg-primary" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>
                                <!-- Progress item 4-->
                                <div class="d-flex align-items-center justify-content-between small mb-1">
                                    <div class="fw-bold">Product Listings</div>
                                    <div class="small">100%</div>
                                </div>
                                <div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Illustration dashboard card example-->
                <div class="card">
                    <div class="card-body text-center p-5">
                        <img class="img-fluid mb-4" src="/assets/img/illustrations/team-spirit.svg" alt="" style="max-width: 16.25rem">
                        <h5>Team Access</h5>
                        <p class="mb-4">Upgrade your plan to get access to team collaboration tools.</p>
                        <a class="btn btn-primary p-3" href="#!">Upgrade</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    methods: {
        number_format(number, decimals, dec_point, thousands_sep) {
            // *     example: number_format(1234.56, 2, ',', ' ');
            // *     return: '1 234,56'
            number = (number + "").replace(",", "").replace(" ", "");
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
                dec = typeof dec_point === "undefined" ? "." : dec_point,
                s = "",
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return "" + Math.round(n * k) / k;
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || "").length < prec) {
                s[1] = s[1] || "";
                s[1] += new Array(prec - s[1].length + 1).join("0");
            }
            return s.join(dec);
        }

    },
    mounted(){
        var ctx2 = document.getElementById("myPieChart");
        new Chart(ctx2, {
            type: "doughnut",
            data: {
                labels: ["Direct", "Referral", "Social"],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: [
                        "rgba(0, 97, 242, 1)",
                        "rgba(0, 172, 105, 1)",
                        "rgba(88, 0, 232, 1)"
                    ],
                    hoverBackgroundColor: [
                        "rgba(0, 97, 242, 0.9)",
                        "rgba(0, 172, 105, 0.9)",
                        "rgba(88, 0, 232, 0.9)"
                    ],
                    hoverBorderColor: "rgba(234, 236, 244, 1)"
                }]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: "#dddfeb",
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80
            }
        });
        var ctx = document.getElementById("myAreaChart");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                datasets: [{
                    label: "Earnings",
                    lineTension: 0.3,
                    backgroundColor: "rgba(0, 97, 242, 0.05)",
                    borderColor: "rgba(0, 97, 242, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(0, 97, 242, 1)",
                    pointBorderColor: "rgba(0, 97, 242, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(0, 97, 242, 1)",
                    pointHoverBorderColor: "rgba(0, 97, 242, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: [
                        0,
                        5000,
                        10000,
                        15000,
                        10000,
                        20000,
                        20000,
                        30000,
                        25000,
                        40000,
                        50000,
                        60000,
                        70000,
                        80000
                    ]
                },{
                    label: "Earnings23",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 0, 164, 0.05)",
                    borderColor: "rgba(78, 0, 164, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 0, 164, 1)",
                    pointBorderColor: "rgba(78, 0, 164, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 0, 164, 1)",
                    pointHoverBorderColor: "rgba(78, 0, 1642, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: [
                        70000,
                        80000,
                        16000
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: "date"
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function(value) {
                                return "$" + this.number_format(value);
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: "#6e707e",
                    titleFontSize: 14,
                    borderColor: "#dddfeb",
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: "index",
                    caretPadding: 10,
                    callbacks: {
                        label: function(tooltipItem, chart) {
                            var datasetLabel =
                                chart.datasets[tooltipItem.datasetIndex].label || "";
                            return datasetLabel + ": $" + this.number_format(tooltipItem.yLabel);
                        }
                    }
                }
            }
        });
    }
}
</script>