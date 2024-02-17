import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest: PagesFunction = (context) => {
	var data = context?.data;

	return mailChannelsPlugin({
		personalizations: [
			{
				to: [{ name: "Giulio Zanchetta", email: "giulio.zanchetta@majestico.co" }],
				dkim_domain: "majestico.co",
				dkim_selector: "mailchannels",
				dkim_private_key: context.env.DKIM_PRIVATE_KEY,
				subject: `Website form submission from ${data?.name}`,
			},
		],
		from: {
			name: data?.name ?? "Enquiry",
			email: "no-reply@majestico.co",
		},
		respondWith: () =>
			new Response(null, {
				status: 302,
				headers: { Location: "/thank-you" },
			}),
	})(context);
};
