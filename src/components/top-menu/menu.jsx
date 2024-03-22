const Menu = [
	{
		path: "/dashboard",
		icon: "fa fa-th",
		title: "Dashboard",
		children: [
			{ path: "/dashboard/v2", title: "Dashboard TCMFiles" },
			{ path: "/dashboard/v2", title: "Dashboard AI" },
		],
	},
	{
		path: "/Calendar & Planning",
		icon: "fa fa-calendar",
		title: "Calendar & Planning",
		badge: "10",
		children: [
			{ path: "/calendar", icon: "fa fa-calendar", title: "Calendar" },
			{ path: "/clinic/appointments", title: "Appointments" },
			{ path: "/clinic/reqforappointments", title: "Requests for Appointments" },
			{ path: "/clinic/appointments/new", title: "Add Appointment" },
			{ path: "/calendar/scheduler", title: "Team-scheduler" },
			{ path: "/calendar/timelineappointments", title: "Timeline of Appointments" },			
			{ path: "/scheduler", title: "scheduler Dev" },
			{ path: "/scheduler2", title: "scheduler 2" },			
			{ path: "/newscheduler", title: "newscheduler" },						
		],
	},

	{
		path: "/Users",
		icon: "fa fa-address-book",
		title: "Users",
		badge: "10",
		children: [
			{ path: "/clinic/doctors", title: "Doctors" },
			{ path: "/clinic/doctors/new", title: "Add doctor" },
			{ path: "/clinic/search_doctor", title: "Search in Doctors" },
			{ path: "/clinic/receptions", title: "receptions" },
			{ path: "/clinic/receptions/new", title: "Add reception" },
			{ path: "/clinic/search_reception", title: "Search in Receptions" },
			{ path: "/clinic/accountants", title: "accountants" },
			{ path: "/clinic/accountants/new", title: "Add accountant" },
			{ path: "/clinic/search_accountant", title: "Search in Accountants" },
			{ path: "/clinic/patients", title: "patients" },
			{ path: "/clinic/patients/new", title: "Add patient" },
			{ path: "/clinic/search_patient", title: "Search in Patients" },
			{ path: "/clinic/users", title: "users" },
			{ path: "/clinic/user/new", title: "Add user" },
			{ path: "/clinic/search_user", title: "Search in Users" },
			{ path: "/clinic/contacts", title: "Contacts" },			
			{ path: "/user/usersa", title: "New users" },			
		],
	},

	{
		path: "/Human Resources",
		icon: "fa fa-graduation-cap",
		title: "Human Resources",
		badge: "10",
		children: [
			{ path: "/user/skills", title: "Skills" },
			{ path: "/user/shifts", title: "Shifts" },
			{ path: "/user/leaves", title: "Leaves" },			
			{ path: "/ero/incidents", title: "Incidents" },						
		],
	},

	{
		path: "/Clinicsolos",
		icon: "fa fa-hospital",
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
		path: "/Homeopathy",
		icon: "fas fa-book",
		title: "books",
		badge: "10",
		children: [
			{ path: "/homeopathy/books/allen", title: "Allen" },
			{ path: "/homeopathy/books/boericke", title: "boericke" },			
			{ path: "/homeopathy/books/borger", title: "Borger" },
			{ path: "/homeopathy/books/dunham", title: "Dunham" },			
			{ path: "/homeopathy/books/farrington", title: "Farrington" },
			{ path: "/homeopathy/books/guernsey", title: "Guernsey" },			
			{ path: "/homeopathy/books/hahnemann", title: "Hahnemann" },
			{ path: "/homeopathy/books/hering", title: "Hering" },			
			{ path: "/homeopathy/books/kent", title: "Kent" },
			{ path: "/homeopathy/books/lippe", title: "Lippe" },			
			{ path: "/homeopathy/books/mure", title: "Mure" },
			{ path: "/homeopathy/books/nash", title: "Nash" },			
			{ path: "/homeopathy/books/search_books", title: "Search in books" },		
		],
	},

	{
		path: "/Databases",
		icon: "fa fa-briefcase",
		title: "Databases",
		badge: "10",
		children: [
			{ path: "/databases/titles", title: "Titles" },
			{ path: "/databases/organizations", title: "Organizations" },
			{ path: "/databases/banks", title: "Banks" },
			{ path: "/databases/insurances", title: "Insurances" },
			{ path: "/databases/reservedusernames", title: "reserved Usernames" },
			{ path: "/databases/termofuse", title: "Term of USe" },			
			{ path: "/databases/privacypolicy", title: "Privacy Policy" },						
		],
	},

	{
		path: "/Clinicsolos",
		icon: "fa fa-cloud",
		title: "Yourdrive",
		badge: "10",
		children: [
			{ path: "/clinic/yourdrive", title: "yourdrive" },
			{ path: "/clinic/search_yourdrive", title: "Search in your drive" },
			{ path: "itransportindex.com:4321/dbApp", title: "Mongoose DB" },			
		],
	},

	{
		path: "/Medicalfiles",
		icon: "fa fa-medkit",
		title: "Medical Files",
		badge: "10",
		children: [
			{ path: "/clinic/medicalfiles", title: "Medical Files" },
			{ path: "/clinic/tcmsessions/new", title: "Add session" },
			{ path: "/clinic/homeopathysessions/new", title: "Add homeopathic session" },
			{ path: "/clinic/physicalconditions", title: "Physical conditions" },
			{ path: "/clinic/physicalconditions/new", title: "Add Physical condition" },
			{ path: "/clinic/search_medicalfile", title: "Search in Medical Files" },
		],
	},

	{
		path: "/Salons",
		icon: "fa fa-building",
		title: "Salons",
		children: [
			{ path: "/salon/salons", title: "Salons" },
			{ path: "/salon/salons/new", title: "Add salon" },
			{ path: "/salon/search_salon", title: "Search in Salons" },
		],
	},

	{
		path: "/Garages",
		icon: "fas fa-car",
		title: "Garages",
		children: [
			{ path: "/garage/garages", title: "Garages" },
			{ path: "/garage/garages/new", title: "Add garage" },
			{ path: "/garage/search_garage", title: "Search in Garages" },
			{ path: "/garage/vehicles", title: "Vehicles" },
			{ path: "/garage/vehicles/new", title: "Add vehicle" },
			{ path: "/garage/mechanics", title: "Mechanics" },
			{ path: "/garage/mechanics/new", title: "Add mechanic" },
			
		],
	},

	{
		path: "/Product Beautys",
		icon: "fa fa-cubes",
		title: "Products",
		badge: "10",
		children: [
			{ path: "/accounting/products-b", title: "Products Beauty" },
			{ path: "/accounting/productbs/new", title: "Add Product" },
			{ path: "/accounting/search_product", title: "Search in Products" },
		],
	},

	{
		path: "/Accounting",
		icon: "fas fa-balance-scale",
		title: "Accounting",
		badge: "10",
		children: [
			{ path: "/accounting/invoices", title: "Invoices" },
			{ path: "/accounting/invoices/new", title: "Add Invoice" },			
			{ path: "/accounting/expenses", title: "Expenses" },
			{ path: "/accounting/expenses/new", title: "Add Expense" },			
			{ path: "/accounting/transactions", title: "Transactions" },
			{ path: "/accounting/transactions/new", title: "Add transaction" },			
			{ path: "/accounting/COAs", title: "COAs" },
			{ path: "/accounting/COAs/new", title: "Add COA" },			
			{ path: "/accounting/services", title: "Services" },
			{ path: "/accounting/services/new", title: "Add Service" },			
			{ path: "/accounting/products", title: "Products" },
			{ path: "/accounting/products/new", title: "Add Product" },
			{ path: "/accounting/profitlossstatement", title: "Profit vs Loss Statement" },			
			{ path: "/accounting/charts", title: "Charts" },						
		],
	},

	{
		path: "/forum-front",
		icon: "fa fa-hospital",
		title: "Forum Front",
		children: [
		
			{ path: "/forum/forum", title: "Forum" },
			{ path: "/forum/forums", title: "Forums" },			
			{ path: "/forum/postcompose", title: "Post compose" },
			{ path: "/forum/postdetail", title: "Post Detail" },
			{ path: "/forum/forumMeryem", title: "Forums Meryem" },			
			{ path: "/forum/categorytopics", title: "Topics in a Categroy" },
			{ path: "/forum/topics", title: "CRUD Topics" },
			{ path: "/forum/categories", title: "CRUD Categories" },
			{ path: "/forum/posts", title: "CRUD Posts" },	
		
		
			{ path: "/forum-front/forums", title: "Forums" },
			{ path: "/forum-front/postcompose", title: "Post compose" },
			{ path: "/forum-front/postdetail", title: "Post Detail" },
			{ path: "/forum-front1/postcompose", title: "Post compose 1" },
			{ path: "/forum-front1/postdetail", title: "Post Detail 1" },

			{ path: "/forum-front2/compose", title: "Post compose 2" },
			{ path: "/forum-front2/postdetail", title: "Post Detail 2" },
			{ path: "/forum-front2/ForumBody", title: "ForumBody" },
			{ path: "/forum-front2/createpost", title: "Create Post" },
			{ path: "/forum-front2/Modal", title: "Modal" },

			
			{ path: "/forum", title: "Forum task 1A" },			
		],
	},

	{
		path: "/Ticket",
		icon: "fas fa-ticket-alt",
		title: "Tickets",
		badge: "10",
		children: [
			{ path: "/ticket/tickets", title: "Tickets" },
			{ path: "/ticket/tickets/new", title: "Add Ticket" },
			{ path: "/ticket/grid-tickets", title: "Gridview of Tickets" },			
			{ path: "/ticket/timelinetickets", title: "Timeline of Tickets" },						
			{ path: "/ticket/search_tickets", title: "Search in Tickets" },
			{ path: "/user/ticketsa", title: "Ticketsa" },						
		],
	},

	{
		path: "/Kanban",
		icon: "fa fa-tasks",
		title: "Kanbans",
		badge: "10",
		children: [
			{ path: "/kanban/kanbans", title: "Kanbans" },
			{ path: "/kanban/tasks/new", title: "Add Task" },
			{ path: "/kanban/search_kanbans", title: "Search in Kanbans" },
			{ path: "/kanban/timelinetasks", title: "Timeline of Tasks" },						
		],
	},

	{
		path: "/API",
		icon: "ion-md-cog",
		title: "APIs",
		children: [
			{ path: "/api/apis", title: "APIs" },
			{ path: "/api/apis/new", title: "Add API" },			
			{ path: "/api/searchAPIs", title: "Search in APIs" },
		],
	},

	{
		path: "/labels",
		icon: "ion-md-cog",
		title: "Labels",
		children: [
			{ path: "/label/labels", title: "Labels" },
			{ path: "/label/labels/bew", title: "add Label" },			
		],
	},

	{
		path: "/ERO",
		icon: "ion-md-help-buoy",
		title: "EROs",
		children: [
			{ path: "/ero/incidents", title: "EROs" },
			{ path: "/ero/incident/new", title: "Add ERO" },			
			{ path: "/ero/searchEROs", title: "Search in EROs" },
			{ path: "/ero/incidents", title: "Incidents" },
			{ path: "/ero/incidents/new", title: "Add Incident" },			
			
		],
	},

	{
		path: "/Messenger",
		icon: "fa fa-comments",
		title: "Messenger",
		badge: "10",
		children: [
			{ path: "/messenger/messenger", title: "Messenger" },
			{ path: "/messenger/search_messages", title: "Search in Messages" },					
		],
	},

	{
		path: "/email",
		icon: "fas fa-email",
		title: "Email",
		badge: "10",
		children: [
			{ path: "/email/inbox", title: "Inbox" },
			{ path: "/email/compose", title: "Compose" },
			{ path: "/email/detail", title: "Detail" },
		],
	},
	{
		path: "/email",
		icon: "fa fa-trash",
		title: "Waste Basket",
		children: [
			{ path: "/clinic/trashappointments", title: "Appointments" },
			{ path: "/clinic/trashusers", title: "Users" },
			{ path: "/clinic/trashdoctors", title: "Doctors" },
			{ path: "/clinic/trashpatients", title: "Patients" },
			{ path: "/clinic/trashaccountants", title: "Accountants" },
			{ path: "/clinic/trashreceptions", title: "Receptions" },
			{ path: "/clinic/trashmedicalfiles", title: "Medical Files" },
			{ path: "/clinic/trashtcmsessions", title: "TCM Sessions" },
			{ path: "/clinic/trashtreatments", title: "Treatments" },
			{ path: "/clinic/trashinvoices", title: "Invoices" },
			{ path: "/clinic/trashexpenses", title: "Expenses" },
			{ path: "/clinic/trashtransactions", title: "Transactions" },
			{ path: "/salon/trashsalons", title: "Salons" },
			{ path: "/salon/trashpractioners", title: "Practioners" },
			{ path: "/salon/trashnailtreatments", title: "Nailtreatments" },
			{ path: "/salon/trashinvoices", title: "Invoices" },
			{ path: "/salon/trashexpenses", title: "Expenses" },
			{ path: "/salon/trashtransactions", title: "Transactions" },
			{ path: "/ticket/tickets", title: "Tickets" },			
			{ path: "/kanban/cards", title: "Cards" },						
		],
	},

	{ path: "/widgets", icon: "fab fa-simplybuilt", title: "Widgets", label: "NEW" },
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
	{ path: "/bootstrap-4", img: "/assets/img/logo/logo-bs4.png", title: "Bootstrap 4", label: "NEW" },
	{
		path: "/form",
		icon: "fa fa-list-ol",
		title: "Form Stuff",
		label: "NEW",
		children: [
			{ path: "/form/elements", title: "Form Elements", highlight: true },
			{ path: "/form/add_clinicsolo", title: "Add clinicsolo", highlight: true },
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
					{ path: "/apps/onlyoffice/pim", title: "Personal Information Manager" },
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
			{ path: "/page-option/with-right-sidebar", title: "Page with Right Sidebar" },
			{ path: "/page-option/with-minified-sidebar", title: "Page with Minified Sidebar" },
			{ path: "/page-option/with-two-sidebar", title: "Page with Two Sidebar" },
			{ path: "/page-option/full-height", title: "Full Height Content" },
			{ path: "/page-option/with-wide-sidebar", title: "Page with Wide Sidebar" },
			{ path: "/page-option/with-light-sidebar", title: "Page with Light Sidebar" },
			{ path: "/page-option/with-mega-menu", title: "Page with Mega Menu" },
			{ path: "/page-option/with-top-menu", title: "Page with Top Menu" },
			{ path: "/page-option/with-boxed-layout", title: "Page with Boxed Layout" },
			{ path: "/page-option/with-mixed-menu", title: "Page with Mixed Menu" },
			{ path: "/page-option/boxed-layout-with-mixed-menu", title: "Boxed Layout with Mixed Menu" },
			{ path: "/page-option/with-transparent-sidebar", title: "Page with Transparent Sidebar" },
			{ path: "/page-option/with-search-sidebar", title: "Page with Search Sidebar", highlight: true },
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
			{ path: "/extra/cookie-acceptance-banner", title: "Cookie Acceptance Banner", highlight: true },
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
			{ path: "/version/transparent", title: "TRANSPARENT DESIGN", highlight: true },
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

export default Menu;
