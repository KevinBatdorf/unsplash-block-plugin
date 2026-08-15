import { store as editorStore } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { dispatch, select, subscribe } from "@wordpress/data";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import blockConfig from "./block.json";
import { BlockFilter } from "./components/BlockFilter";
import { BlockReplacer } from "./components/BlockReplacer";
import "./editor.css";
import { blockIcon } from "./icons";
import { unsplash } from "./media-categories";

registerBlockType("kevinbatdorf/unlimited-photos", {
	...blockConfig,
	icon: blockIcon,
	attributes: {},
	title: __("Unlimited Photos", "unlimited-photos"),
	edit: ({ clientId }) => <BlockReplacer clientId={clientId} />,
	save: () => null,
});

addFilter(
	"editor.BlockEdit",
	blockConfig.name,
	(CurrentMenuItems) =>
		// biome-ignore lint/suspicious/noExplicitAny: Gutenberg does not export a type for BlockEdit props
		(props: any) =>
			// It seems like Gutenberg wants a top level component here
			BlockFilter(CurrentMenuItems, props),
);

const unsubscribe = subscribe(() => {
	const { inserterMediaCategories = [] } = select(editorStore)
		// @ts-expect-error
		.getSettings();
	const maybeRegistered = inserterMediaCategories.some(
		({ name }: { name: string }) => name === unsplash.name,
	);
	// @ts-expect-error
	const { registerInserterMediaCategory } = dispatch(editorStore);
	if (!registerInserterMediaCategory) return unsubscribe();
	// Can't unsub here as it gets removed.
	if (maybeRegistered) return;
	registerInserterMediaCategory(unsplash);
}, editorStore);
