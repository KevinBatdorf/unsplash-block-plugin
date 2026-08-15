import { store as blockEditorStore } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { Loader } from "./Loader";

export const BlockFilter = (
	CurrentMenuItems: React.ComponentType,
	// biome-ignore lint/suspicious/noExplicitAny: Gutenberg does not export a type for BlockEdit props
	props: any,
) => {
	const { attributes, setAttributes, clientId } = props;
	const showMenu = useSelect(
		(select) => {
			// @ts-expect-error-next-line - getBlock not added as a type?
			const currentBlock = select(blockEditorStore).getBlock(clientId);
			// only show on core image blocks for now
			return currentBlock.name === "core/image";
		},
		[clientId],
	);

	if (!showMenu) {
		return <CurrentMenuItems {...props} />;
	}
	return (
		<Loader
			attributes={attributes}
			setAttributes={setAttributes}
			clientId={clientId}
			CurrentMenuItems={CurrentMenuItems}
			toolbarProps={props}
		/>
	);
};
