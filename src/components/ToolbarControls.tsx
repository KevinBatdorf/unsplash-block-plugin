import { BlockControls } from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { blockIcon } from "../icons";

// I'm unsure how to type the incoming types from the filter fn
export type ToolbarControlsProps = {
	openModal: () => void;
	CurrentMenuItems?: React.ComponentType;
	// biome-ignore lint/suspicious/noExplicitAny: Gutenberg does not export a type for toolbar props
	toolbarProps: any;
	clientId?: string;
};
export const ToolbarControls = (props: ToolbarControlsProps) => {
	const { CurrentMenuItems, openModal, toolbarProps } = props;
	return (
		<>
			{CurrentMenuItems && <CurrentMenuItems {...toolbarProps} />}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={blockIcon}
						className="unlimited-photos-toolbar-button"
						label={__("Press to see photos", "unlimited-photos")}
						onClick={openModal}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
