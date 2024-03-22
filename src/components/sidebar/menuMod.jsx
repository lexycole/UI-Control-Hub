const MenuMod = [
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
    path: "/Calendar & Planning",
    icon: "fa fa-calendar text-yellow",
    title: "Calendar A & Planning",
    badge: "10",
    children: [
      { path: "/calendara", icon: "fa fa-calendar", title: "Calendar" },
      { path: "/calendara/appointments", title: "Appointments" },
      { path: "/calendara/reqforappointments", title: "Requests for Appointments" },
      { path: "/calendara/appointments/new", title: "Add Appointment" },
      { path: "/calendara/scheduler", title: "Team-scheduler" },
      { path: "/calendara/timelineappointments",title: "Timeline of Appointments" },
      { path: "/schedulera", title: "scheduler" },
      { path: "/calendara/timelineattendance",title: "Timeline of Attendance" },	  
    ],
  },

	{
		path: "/Users",
		icon: "fa fa-address-book text-lime",
		title: "Users",
		children: [
			{ path: "/clinic/contacts", title: "Contacts" },			
		],
	},

  {
    path: "/Homeopathy",  icon: "fas fa-book text-gray",  title: "books",
    children: [
      { path: "/homeopathy/books/allens", title: "Allen" },
      { path: "/homeopathy/books/boerickes", title: "Boericke" },
      { path: "/homeopathy/books/bogers", title: "Boger" },
      { path: "/homeopathy/books/dunhams", title: "Dunham" },
      { path: "/homeopathy/books/farringtons", title: "Farrington" },
      { path: "/homeopathy/books/guernseys", title: "Guernsey" },
      { path: "/homeopathy/books/hahnemanns", title: "Hahnemann" },
      { path: "/homeopathy/books/herings", title: "Hering" },
      { path: "/homeopathy/books/kents", title: "Kent" },
      { path: "/homeopathy/books/lippes", title: "Lippe" },
      { path: "/homeopathy/books/mures", title: "Mure" },
      { path: "/homeopathy/books/nashs", title: "Nash" },
      { path: "/homeopathy/books/search_books", title: "Search in books" },
    ],
  },

  {
    path: "/Databases", icon: "fa fa-briefcase text-coffeemilk", title: "Databases",
    children: [
      { path: "/databases/titles", title: "Titles" },
      { path: "/databases/organizations", title: "Organizations" },
      { path: "/databases/banks", title: "Banks" },
      { path: "/databases/insurances", title: "Insurances" },
      { path: "/databases/reservedusernames", title: "Reserved Usernames" },
      { path: "/databases/termofuses/", title: "Term of USe" },
      { path: "/databases/privacypolicies/", title: "Privacy Policy" },
      { path: "/databases/meta", title: "Meta information" },	  
      { path: "/clinic/materiamedicas", title: "Materia Medica" },	  	  
      { path: "/clinic/amateriamedicas", title: "Ayurveda Materia Medica" },	  	  	  
      { path: "/clinic/formulas", title: "Formulas" },	  	  	  	  
      { path: "/clinic/acupunctures", title: "Acupuncture" },	  	  	  	  	  
    ],
  },

  {
    path: "/Databases", icon: "fa fa-briefcase text-plum", title: "ARAB", 
    children: [
      { path: "/databases/titles", title: "Titles" },
      { path: "/databases/organizations", title: "Organizations" },
      { path: "/databases/banks", title: "Banks" },
      { path: "/databases/insurances", title: "Insurances" },
      { path: "/databases/reservedusernames", title: "Reserved Usernames" },
      { path: "/databases/termofuses/", title: "Term of USe" },
      { path: "/databases/privacypolicies/", title: "Privacy Policy" },
      { path: "/databases/meta", title: "Meta information" },	  
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
    path: "/forum-front",
    icon: "fa fa-hospital text-navy",
    title: "Forum",
    children: [
      { path: "/forum/forum", title: "Forum" },
      { path: "/forum/postcompose", title: "Post compose" },
      { path: "/forum/postdetail", title: "Post Detail" },
      { path: "/forum/forumMeryem", title: "Forums Meryem" },
      { path: "/forum/topics", title: "Admin Topics" },
      { path: "/forum/categories", title: "Admin Categories" },
      { path: "/forum/posts", title: "Admin Posts" },

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
    path: "/nsn",
    icon: "fas fa-ticket-alt text-mint",
    title: "Items",
    badge: "10",
    children: [
      { path: "/nsn/items", title: "Items" },
      { path: "/nsn/items/new", title: "Add Item" },
      { path: "/nsn/search_items", title: "Search in items" },
      { path: "/nsn/users", title: "Users" },
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

];

export default MenuMod;
