import type { ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { useFormContext } from "./context";

export function SubmitButton({ children }: { children: ReactNode }) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? <Spinner /> : children}
				</Button>
			)}
		</form.Subscribe>
	);
}
