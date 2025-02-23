import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import type { PagesFunction } from "@cloudflare/workers-types";

export const onRequest: PagesFunction = (context: any) => {
	const data = context?.data;

	return mailChannelsPlugin({
		personalizations: [
			{
				to: [{ name: "Test", email: "test@mintaka.co" }],
				dkim_domain: "mintaka.co",
				dkim_selector: "mailchannels",
				dkim_private_key: context.env.DKIM_PRIVATE_KEY,
				subject: `Website form submission from ${data?.name}`,
			},
		],
		from: {
			name: data?.name ?? "Enquiry",
			email: "no-reply@mintaka.co",
		},
		respondWith: () =>
			new Response(null, {
				status: 302,
				headers: { Location: "/thank-you" },
			}),
	})(context);
};
