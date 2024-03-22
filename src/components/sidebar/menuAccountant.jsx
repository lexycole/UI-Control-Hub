const MenuAccountant = [
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
      { path: "/calendar/reqforappointments", title: "Requests for Appointments" },
      { path: "/calendar/appointments/new", title: "Add Appointment" },
      { path: "/calendar/scheduler", title: "Team-scheduler" },
      { path: "/scheduler", title: "scheduler" },
    ],
  },

	{
		path: "/Users",
		icon: "fa fa-address-book text-lime",
		title: "Users",
		badge: "10",
		children: [
			{ path: "/clinic/contacts", title: "Contacts" },			
		],
	},

  {
    path: "/Medicalfiles",
    icon: "fa fa-medkit",
    title: "Medical Files",
    badge: "10",
    children: [
      { path: "/clinic/medicalfiles", title: "Medical Files" },
      { path: "/clinic/search_medicalfile", title: "Search in Medical Files" },
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
      { path: "/user/ticketsa", title: "Ticketsa" },
    ],
  },

];

export default MenuAccountant;
