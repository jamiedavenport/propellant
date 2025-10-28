import { createContext, type ReactNode, useContext } from "react";
import type { schema } from "~/db";

type Tag = typeof schema.tag.$inferSelect;

export const TagsContext = createContext<Tag[] | null>(null);

type Props = {
	children: ReactNode;
	tags: Tag[];
};

export function TagsProvider({ children, tags }: Props) {
	return <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>;
}

export function useTags() {
	const tags = useContext(TagsContext);

	if (!tags) {
		throw new Error("TagsContext not found");
	}

	return tags;
}
