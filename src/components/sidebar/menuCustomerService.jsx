const MenuCustomerService = [
  {
    path: "aivoluon.com",
    icon: "fas fa-globe text-green",
    title: "aivoluon.com",
  },
  
  {
    path: "/Calendar & Planning",
    icon: "fa fa-calendar text-yellow",
    title: "Calendar & Planning",
    badge: "10",
    children: [
      { path: "/calendar", icon: "fa fa-calendar", title: "Calendar" },
      { path: "/calendar/appointments", title: "Appointments" },
      { path: "/calendar/appointments/new", title: "Add Appointment" },
      { path: "/calendar/scheduler", title: "Team-scheduler" },
      { path: "/calendar/timelineappointments",title: "Timeline of Appointments" },
      { path: "/scheduler", title: "scheduler" },
      { path: "/calendar/timelineattendance",title: "Timeline of Attendance" },	  
      { path: "/planning/appointments", title: "Appointments" },
      { path: "/planning/reqforappointments", title: "Requests for Appointments" },

    ],
  },
  
  {
    path: "/Clinicsolos",
    icon: "fa fa-hospital text-red",
    title: "ClinicSolos",
    badge: "10",
    children: [
      { path: "/clinic/clinicsolos", title: "clinicsolos" },
      { path: "/clinic/clinicsolos/new", title: "Add clinicsolo" },
      { path: "/clinic/workinghours", title: "Working Hours" },
      { path: "/clinic/search_clinicsolo", title: "Search in clinicsolos" },
    ],
  },
  
  
  {
    path: "/drive",
    icon: "fa fa-cloud text-lightpink",
    title: "Yourdrive",
    badge: "10",
    children: [
      { path: "/clinic/yourdrive", title: "yourdrive" },
      { path: "/clinic/search_yourdrive", title: "Search in your drive" },
      { path: "itransportindex.com:4321/dbApp", title: "Mongoose DB" },
    ],
  },

  {
    path: "/Users",
    icon: "fas fa-ticket-alt text-indigo",
    title: "Companies",
    badge: "10",
    children: [
      { path: "/crm/companies", title: "Companies" },
      { path: "/crm/companies/new", title: "Add Company" },
      { path: "/crm/search_companies", title: "Search in companies" },
    ],
  },

  {
    path: "/Accounting",
    icon: "fas fa-balance-scale text-cyan",
    title: "Accounting",
    badge: "10",
    children: [
      { path: "/accounting/accountingsetting", title: "Setting" },	
      { path: "/accounting/invoices", title: "Invoices" },
      { path: "/accounting/invoices/new", title: "Add Invoice" },
      { path: "/accounting/expenses", title: "Expenses" },
      { path: "/accounting/expenses/new", title: "Add Expense" },
      { path: "/accounting/transactions", title: "Transactions" },
      { path: "/accounting/transactions/new", title: "Add transaction" },
      { path: "/accounting/COAs", title: "COAs" },
	  { path: "/accounting/NCOAs", title: "COAs" },	  
      { path: "/accounting/COAs/new", title: "Add COA" },
      { path: "/accounting/services", title: "Services" },
      { path: "/accounting/services/new", title: "Add Service" },
      { path: "/accounting/products", title: "Products" },
      { path: "/accounting/products/new", title: "Add Product" },
      { path: "/accounting/profitlossstatement", title: "Profit vs Loss Statement"},
      { path: "/accounting/charts", title: "Charts" },
    ],
  },

  {
    path: "/Ticket",
    icon: "fas fa-ticket-alt text-olive",
    title: "Tickets",
    badge: "10",
    children: [
      { path: "/ticket/tickets", title: "Tickets" },
      { path: "/ticket/tickets/new", title: "Add Ticket" },
      { path: "/ticket/grid-tickets", title: "Gridview of Tickets" },
      { path: "/ticket/timelinetickets", title: "Timeline of Tickets" },
      { path: "/ticket/search_tickets", title: "Search in Tickets" },
    ],
  },
  
  {
    path: "/Messenger",
    icon: "fa fa-comments text-lawngreen",
    title: "Messenger",
    badge: "10",
    children: [
      { path: "/contacts/Contacts", title: "Contacts" },	
      { path: "/messenger/messenger", title: "Messenger" },	  
      { path: "/messenger/videocall", title: "VideoCall" },
      { path: "/messenger/videomeetings", title: "VideoMeetings" },	  
      { path: "/messenger/search_messages", title: "Search in Messages" },
    ],
  },

  {
    path: "/Chatbots",
    icon: "fas fa-ticket-alt text-indigo",
    title: "Chatbots",
    
    children: [
      { path: "/chatbot/setting", title: "Setting" },
      { path: "/chatbot/imexports", title: "Import Export Manager" },      
      { path: "/chatbot/conversations", title: "Conversations" },      
      { path: "/chatbot/companies", title: "Companies" },      
    ],
  },

  {
    path: "/email",
    icon: "fas fa-email text-cadetblue",
    title: "Email",
    badge: "10",
    children: [
      { path: "/email/inbox", title: "Inbox" },
      { path: "/email/compose", title: "Compose" },
      { path: "/email/detail", title: "Detail" },
    ],
  },

  {
    path: "/widgets",
    icon: "fab fa-simplybuilt",
    title: "Widgets",
    label: "NEW",
  },
  {
    path: "/ui",
    icon: "fa fa-gem",
    title: "UI Elements",
    label: "NEW",
    children: [
      { path: "/ui/general", title: "General", highlight: true },
      { path: "/ui/typography", title: "Typograhy" },
      { path: "/ui/tabs-accordion", title: "Tabs & Accordion" },
      { path: "/ui/modal-notification", title: "Modal & Notification" },
      { path: "/ui/widget-boxes", title: "Widget Boxes" },
      { path: "/ui/media-object", title: "Media Object" },
      { path: "/ui/buttons", title: "Buttons", highlight: true },
      { path: "/ui/icons", title: "Icons" },
      { path: "/ui/simple-line-icons", title: "Simple Line Icons" },
      { path: "/ui/ionicons", title: "Ionicons" },
      { path: "/ui/language-bar-icon", title: "Language Bar & Icon" },
      { path: "/ui/social-buttons", title: "Social Buttons" },
    ],
  },
  {
    path: "/bootstrap-4",
    img: "/assets/img/logo/logo-bs4.png",
    title: "Bootstrap 4",
    label: "NEW",
  },
  {
    path: "/form",
    icon: "fa fa-list-ol",
    title: "Form Stuff",
    label: "NEW",
    children: [
      { path: "/form/elements", title: "Form Elements", highlight: true },
      {
        path: "/form/add_clinicsolo",
        title: "Add clinicsolo",
        highlight: true,
      },
      { path: "/form/wizards", title: "Form Wizards", highlight: true },
    ],
  },
  {
    path: "/table",
    icon: "fa fa-table",
    title: "Tables",
    children: [
      { path: "/table/basic", title: "Basic Tables" },
      { path: "/table/data", title: "Data Tables" },
    ],
  },
  {
    path: "/pos",
    icon: "fa fa-cash-register",
    title: "POS System",
    label: "NEW",
    children: [
      { path: "/pos/customer-order", title: "POS - Customer Order" },
      { path: "/pos/kitchen-order", title: "POS - Kitchen Order" },
      { path: "/pos/counter-checkout", title: "POS - Counter Checkout" },
      { path: "/pos/table-booking", title: "POS - Table Booking" },
      { path: "/pos/menu-stock", title: "POS - Menu Stock" },
    ],
  },
  {
    path: "/frontend",
    icon: "fa fa-star",
    title: "FrontEnd",
    children: [
      { path: "/frontend/one-page-parallax", title: "One Page Parallax" },
      { path: "/frontend/blog", title: "Blog" },
      { path: "/frontend/forum", title: "Forum" },
      { path: "/frontend/e-commerce", title: "E-Commerce" },
    ],
  },
  {
    path: "/email-template",
    icon: "fa fa-envelope",
    title: "Email Template",
    children: [
      { path: "/email-template/system", title: "System Template" },
      { path: "/email-template/newsletter", title: "Newsletter Template" },
    ],
  },
  {
    path: "/Apps",
    icon: "ion-md-apps",
    title: "Apps",
    children: [
      {
        path: "/apps/libreoffice",
        title: "Libre Office",
        children: [
          { path: "/apps/libreoffice/writer", title: "Writer" },
          { path: "/apps/libreoffice/calc", title: "Calc" },
          { path: "/apps/libreoffice/draw", title: "Draw" },
          { path: "/apps/libreoffice/impress", title: "Impress" },
          { path: "/apps/libreoffice/base", title: "Base" },
          { path: "/apps/libreoffice/math", title: "Math" },
          { path: "/apps/libreoffice/charts", title: "Charts" },
        ],
      },
      {
        path: "/apps/onlyoffice",
        title: "Only Office",
        children: [
          { path: "/apps/onlyoffice/word", title: "Word" },
          { path: "/apps/onlyoffice/spreadsheet", title: "Spreadsheet" },
          { path: "/apps/onlyoffice/presentation", title: "Presentation" },
          { path: "/apps/onlyoffice/database", title: "Database" },
          { path: "/apps/onlyoffice/PMS", title: "PMS" },
          { path: "/apps/onlyoffice/email", title: "Email" },
          {
            path: "/apps/onlyoffice/pim",
            title: "Personal Information Manager",
          },
        ],
      },

      {
        path: "/apps/openoffice",
        title: "Open Office",
        children: [
          { path: "/apps/openoffice/writer", title: "Writer" },
          { path: "/apps/openoffice/calc", title: "Calc" },
          { path: "/apps/openoffice/draw", title: "Draw" },
          { path: "/apps/openoffice/impress", title: "Impress" },
          { path: "/apps/openoffice/base", title: "Base" },
          { path: "/apps/openoffice/math", title: "Math" },
          { path: "/apps/openoffice/charts", title: "Charts" },
        ],
      },
    ],
  },

  {
    path: "/chart",
    icon: "fa fa-chart-pie",
    title: "Chart",
    label: "NEW",
    children: [
      { path: "/chart/js", title: "Chart JS" },
      { path: "/chart/d3", title: "d3 Chart" },
      { path: "/chart/apex", title: "Apex Chart", highlight: true },
    ],
  },
  {
    path: "/chat",
    icon: "fa fa-chat",
    title: "Chat",
    label: "NEW",
    // children: [
    // ],
  },
  {
    path: "/contacts",
    icon: "fa fa-chat",
    title: "Contacts",
    label: "NEW",
  },
  { path: "/calendar", icon: "fa fa-calendar", title: "Calendar" },
  { path: "/map", icon: "fa fa-map", title: "Map" },
  { path: "/gallery", icon: "fa fa-image", title: "Gallery" },
  {
    path: "/page-option",
    icon: "fa fa-cogs",
    title: "Page Options",
    label: "NEW",
    children: [
      { path: "/page-option/blank", title: "Blank Page" },
      { path: "/page-option/with-footer", title: "Page with Footer" },
      { path: "/page-option/without-sidebar", title: "Page without Sidebar" },
      {
        path: "/page-option/with-right-sidebar",
        title: "Page with Right Sidebar",
      },
      {
        path: "/page-option/with-minified-sidebar",
        title: "Page with Minified Sidebar",
      },
      { path: "/page-option/with-two-sidebar", title: "Page with Two Sidebar" },
      { path: "/page-option/full-height", title: "Full Height Content" },
      {
        path: "/page-option/with-wide-sidebar",
        title: "Page with Wide Sidebar",
      },
      {
        path: "/page-option/with-light-sidebar",
        title: "Page with Light Sidebar",
      },
      { path: "/page-option/with-mega-menu", title: "Page with Mega Menu" },
      { path: "/page-option/with-top-menu", title: "Page with Top Menu" },
      {
        path: "/page-option/with-boxed-layout",
        title: "Page with Boxed Layout",
      },
      { path: "/page-option/with-mixed-menu", title: "Page with Mixed Menu" },
      {
        path: "/page-option/boxed-layout-with-mixed-menu",
        title: "Boxed Layout with Mixed Menu",
      },
      {
        path: "/page-option/with-transparent-sidebar",
        title: "Page with Transparent Sidebar",
      },
      {
        path: "/page-option/with-search-sidebar",
        title: "Page with Search Sidebar",
        highlight: true,
      },
    ],
  },
  {
    path: "/extra",
    icon: "fa fa-gift",
    title: "Extra",
    label: "NEW",
    children: [
      { path: "/extra/timeline", title: "Timeline" },
      { path: "/extra/coming-soon", title: "Coming Soon Page" },
      { path: "/widget/widget", title: "Widget" },
      { path: "/extra/search", title: "Search Results" },
      { path: "/extra/invoice", title: "Invoice" },
      { path: "/extra/error", title: "404 Error Page" },
      { path: "/extra/profile", title: "Profile Page" },
      { path: "/extra/scrum-board", title: "Scrum Board", highlight: true },
      {
        path: "/extra/cookie-acceptance-banner",
        title: "Cookie Acceptance Banner",
        highlight: true,
      },
      { path: "/extra/extra-orders", title: "Orders", highlight: true },
      { path: "/extra/extra-products", title: "Products", highlight: true },
    ],
  },
  {
    path: "/clinicsolo",
    icon: "fa fa-key",
    title: "Login & Register",
    children: [
      { path: "/clinicsolo/login-v1", title: "Login" },
      { path: "/clinicsolo/login-v2", title: "Login v2" },
      { path: "/clinicsolo/login-v3", title: "Login v3" },
      { path: "/clinicsolo/register-v3", title: "Register v3" },
    ],
  },
  {
    path: "/version",
    icon: "fa fa-cubes",
    title: "Version",
    label: "NEW",
    children: [
      { path: "/version/html", title: "HTML" },
      { path: "/version/ajax", title: "AJAX" },
      { path: "/version/angularjs", title: "ANGULAR JS" },
      { path: "/version/angularjs10", title: "ANGULAR JS 10" },
      { path: "/version/laravel", title: "LARAVEL" },
      { path: "/version/material", title: "MATERIAL DESIGN" },
      { path: "/version/apple", title: "APPLE DESIGN" },
      {
        path: "/version/transparent",
        title: "TRANSPARENT DESIGN",
        highlight: true,
      },
      { path: "/version/facebook", title: "FACEBOOK DESIGN", highlight: true },
      { path: "/version/google", title: "GOOGLE DESIGN", highlight: true },
    ],
  },
  {
    path: "/helper",
    icon: "fa fa-medkit",
    title: "Helper",
    children: [{ path: "/helper/css", title: "Predefined CSS Classes" }],
  },

  {
    path: "/menu",
    icon: "fa fa-align-left",
    title: "Menu Level",
    children: [
      {
        path: "/menu/menu-1-1",
        title: "Menu 1.1",
        children: [
          {
            path: "/menu/menu-1-1/menu-2-1",
            title: "Menu 2.1",
            children: [
              { path: "/menu/menu-1-1/menu-2-1/menu-3-1", title: "Menu 3.1" },
              { path: "/menu/menu-1-1/menu-2-1/menu-3-2", title: "Menu 3.2" },
            ],
          },
          { path: "/menu/menu-1-1/menu-2-2", title: "Menu 2.2" },
          { path: "/menu/menu-1-1/menu-2-3", title: "Menu 2.3" },
        ],
      },
      { path: "/menu/menu-1-2", title: "Menu 1.2" },
      { path: "/menu/menu-1-3", title: "Menu 1.3" },
    ],
  },
];

export default MenuCustomerService;
