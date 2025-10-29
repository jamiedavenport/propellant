import { type } from "arktype";
import { dayjs } from "./dayjs";

export const repeat = type(
	"'never' | 'daily' | 'weekly' | 'monthly' | 'yearly'",
);

export type Repeat = typeof repeat.infer;

export function getNextDate(date: dayjs.Dayjs, repeat: Repeat): dayjs.Dayjs {
	if (repeat === "never") {
		throw new Error("Task is not repeating");
	}

	let unit: dayjs.ManipulateType = "day";

	switch (repeat) {
		case "daily":
			unit = "day";
			break;
		case "weekly":
			unit = "week";
			break;
		case "monthly":
			unit = "month";
			break;
		case "yearly":
			unit = "year";
			break;
	}

	if (date.isAfter(dayjs())) {
		return date.add(1, unit);
	}

	return dayjs().add(1, unit);
}
