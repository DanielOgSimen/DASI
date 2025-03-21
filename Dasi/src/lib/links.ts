export const links = [
	{ name: "Chat", href: "/chat" },
	{ name: "Prices", href: "/prices" },
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "FAQ", href: "/FAQ" },
	{
		name: "",
		href: "",
		onclick: (event: Event) => {
			event.preventDefault();
		},
	},
];
