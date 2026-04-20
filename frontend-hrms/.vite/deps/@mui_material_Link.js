import { r as __toESM } from "./chunk-BoAXSpZd.js";
import { t as require_react } from "./react.js";
import { A as composeClasses, D as capitalize_default, N as clsx, P as require_prop_types, _ as generateUtilityClasses, i as memoTheme, j as elementTypeAcceptingRef_default, k as isFocusVisible, l as useTheme, m as alpha, n as useDefaultProps, o as styled, r as createSimplePaletteValueFilter, t as Typography, v as generateUtilityClass, w as getPath, x as require_jsx_runtime } from "./Typography-CnW-N8FH.js";
//#region node_modules/@mui/material/esm/Link/linkClasses.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function getLinkUtilityClass(slot) {
	return generateUtilityClass("MuiLink", slot);
}
var linkClasses = generateUtilityClasses("MuiLink", [
	"root",
	"underlineNone",
	"underlineHover",
	"underlineAlways",
	"button",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/esm/Link/getTextDecoration.js
var getTextDecoration = ({ theme, ownerState }) => {
	const transformedColor = ownerState.color;
	if ("colorSpace" in theme && theme.colorSpace) {
		const color = getPath(theme, `palette.${transformedColor}.main`) || getPath(theme, `palette.${transformedColor}`) || ownerState.color;
		return theme.alpha(color, .4);
	}
	const color = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
	const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
	if ("vars" in theme && channelColor) return `rgba(${channelColor} / 0.4)`;
	return alpha(color, .4);
};
//#endregion
//#region node_modules/@mui/material/esm/Link/Link.js
var import_jsx_runtime = require_jsx_runtime();
var v6Colors = {
	primary: true,
	secondary: true,
	error: true,
	info: true,
	success: true,
	warning: true,
	textPrimary: true,
	textSecondary: true,
	textDisabled: true
};
var useUtilityClasses = (ownerState) => {
	const { classes, component, focusVisible, underline } = ownerState;
	return composeClasses({ root: [
		"root",
		`underline${capitalize_default(underline)}`,
		component === "button" && "button",
		focusVisible && "focusVisible"
	] }, getLinkUtilityClass, classes);
};
var LinkRoot = styled(Typography, {
	name: "MuiLink",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`underline${capitalize_default(ownerState.underline)}`],
			ownerState.component === "button" && styles.button
		];
	}
})(memoTheme(({ theme }) => {
	return { variants: [
		{
			props: { underline: "none" },
			style: { textDecoration: "none" }
		},
		{
			props: { underline: "hover" },
			style: {
				textDecoration: "none",
				"&:hover": { textDecoration: "underline" }
			}
		},
		{
			props: { underline: "always" },
			style: {
				textDecoration: "underline",
				"&:hover": { textDecorationColor: "inherit" }
			}
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color !== "inherit",
			style: { textDecorationColor: "var(--Link-underlineColor)" }
		},
		{
			props: ({ underline, ownerState }) => underline === "always" && ownerState.color === "inherit",
			style: theme.colorSpace ? { textDecorationColor: theme.alpha("currentColor", .4) } : null
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: {
				underline: "always",
				color
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette[color].main, .4) }
		})),
		{
			props: {
				underline: "always",
				color: "textPrimary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textSecondary"
			},
			style: { "--Link-underlineColor": theme.alpha((theme.vars || theme).palette.text.secondary, .4) }
		},
		{
			props: {
				underline: "always",
				color: "textDisabled"
			},
			style: { "--Link-underlineColor": (theme.vars || theme).palette.text.disabled }
		},
		{
			props: { component: "button" },
			style: {
				position: "relative",
				WebkitTapHighlightColor: "transparent",
				backgroundColor: "transparent",
				outline: 0,
				border: 0,
				margin: 0,
				borderRadius: 0,
				padding: 0,
				cursor: "pointer",
				userSelect: "none",
				verticalAlign: "middle",
				MozAppearance: "none",
				WebkitAppearance: "none",
				"&::-moz-focus-inner": { borderStyle: "none" },
				[`&.${linkClasses.focusVisible}`]: { outline: "auto" }
			}
		}
	] };
}));
var Link = /* @__PURE__ */ import_react.forwardRef(function Link(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiLink"
	});
	const theme = useTheme();
	const { className, color = "primary", component = "a", onBlur, onFocus, TypographyClasses, underline = "always", variant = "inherit", sx, ...other } = props;
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	const handleBlur = (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	};
	const handleFocus = (event) => {
		if (isFocusVisible(event.target)) setFocusVisible(true);
		if (onFocus) onFocus(event);
	};
	const ownerState = {
		...props,
		color,
		component,
		focusVisible,
		underline,
		variant
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkRoot, {
		color,
		className: clsx(useUtilityClasses(ownerState).root, className),
		classes: TypographyClasses,
		component,
		onBlur: handleBlur,
		onFocus: handleFocus,
		ref,
		ownerState,
		variant,
		...other,
		sx: [...v6Colors[color] === void 0 ? [{ color }] : [], ...Array.isArray(sx) ? sx : [sx]],
		style: {
			...other.style,
			...underline === "always" && color !== "inherit" && !v6Colors[color] && { "--Link-underlineColor": getTextDecoration({
				theme,
				ownerState
			}) }
		}
	});
});
Link.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning",
		"textPrimary",
		"textSecondary",
		"textDisabled"
	]), import_prop_types.default.string]),
	component: elementTypeAcceptingRef_default,
	onBlur: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	style: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	TypographyClasses: import_prop_types.default.object,
	underline: import_prop_types.default.oneOf([
		"always",
		"hover",
		"none"
	]),
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"body1",
		"body2",
		"button",
		"caption",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"inherit",
		"overline",
		"subtitle1",
		"subtitle2"
	]), import_prop_types.default.string])
};
//#endregion
export { Link as default, getLinkUtilityClass, linkClasses };

//# sourceMappingURL=@mui_material_Link.js.map