import { r as __toESM } from "./chunk-BoAXSpZd.js";
import { t as require_react } from "./react.js";
import { t as require_react_dom } from "./react-dom-BjPBJlww.js";
import { A as composeClasses, C as keyframes, D as capitalize_default, E as require_react_is, M as chainPropTypes, N as clsx, O as capitalize, P as require_prop_types, S as css, T as deepmerge, _ as generateUtilityClasses, a as globalCss, b as useTheme$1, c as slotShouldForwardProp, d as defaultTheme, f as getOverlayAlpha, g as shouldForwardProp, h as resolveProps, i as memoTheme, j as elementTypeAcceptingRef_default, k as isFocusVisible, l as useTheme$2, m as alpha, n as useDefaultProps, o as styled, p as useRtl, r as createSimplePaletteValueFilter, s as rootShouldForwardProp, t as Typography, u as identifier_default, v as generateUtilityClass, x as require_jsx_runtime, y as useTheme } from "./Typography-CnW-N8FH.js";
import { t as _extends } from "./extends-Daicd7Hx.js";
import { t as warnOnce } from "./warning-CKgicaFk.js";
//#region node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
function getThemeProps(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) return props;
	return resolveProps(theme.components[name].defaultProps, props);
}
//#endregion
//#region node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps$1({ props, name, defaultTheme, themeId }) {
	let theme = useTheme(defaultTheme);
	if (themeId) theme = theme[themeId] || theme;
	return getThemeProps({
		theme,
		name,
		props
	});
}
//#endregion
//#region node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
* This is useful for effects that are only needed for client-side rendering but not for SSR.
*
* Before you use this hook, make sure to read https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
* and confirm it doesn't apply to your use-case.
*/
var useEnhancedEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
//#endregion
//#region node_modules/@mui/system/esm/useMediaQuery/useMediaQuery.js
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const [match, setMatch] = import_react.useState(() => {
		if (noSsr && matchMedia) return matchMedia(query).matches;
		if (ssrMatchMedia) return ssrMatchMedia(query).matches;
		return defaultMatches;
	});
	useEnhancedEffect(() => {
		if (!matchMedia) return;
		const queryList = matchMedia(query);
		const updateMatch = () => {
			setMatch(queryList.matches);
		};
		updateMatch();
		queryList.addEventListener("change", updateMatch);
		return () => {
			queryList.removeEventListener("change", updateMatch);
		};
	}, [query, matchMedia]);
	return match;
}
var maybeReactUseSyncExternalStore = { ...import_react }.useSyncExternalStore;
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
	const getDefaultSnapshot = import_react.useCallback(() => defaultMatches, [defaultMatches]);
	const getServerSnapshot = import_react.useMemo(() => {
		if (noSsr && matchMedia) return () => matchMedia(query).matches;
		if (ssrMatchMedia !== null) {
			const { matches } = ssrMatchMedia(query);
			return () => matches;
		}
		return getDefaultSnapshot;
	}, [
		getDefaultSnapshot,
		query,
		ssrMatchMedia,
		noSsr,
		matchMedia
	]);
	const [getSnapshot, subscribe] = import_react.useMemo(() => {
		if (matchMedia === null) return [getDefaultSnapshot, () => () => {}];
		const mediaQueryList = matchMedia(query);
		return [() => mediaQueryList.matches, (notify) => {
			mediaQueryList.addEventListener("change", notify);
			return () => {
				mediaQueryList.removeEventListener("change", notify);
			};
		}];
	}, [
		getDefaultSnapshot,
		matchMedia,
		query
	]);
	return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function unstable_createUseMediaQuery(params = {}) {
	const { themeId } = params;
	return function useMediaQuery(queryInput, options = {}) {
		let theme = useTheme$1();
		if (theme && themeId) theme = theme[themeId] || theme;
		const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
		const { defaultMatches = false, matchMedia = supportMatchMedia ? window.matchMedia : null, ssrMatchMedia = null, noSsr = false } = getThemeProps({
			name: "MuiUseMediaQuery",
			props: options,
			theme
		});
		if (typeof queryInput === "function" && theme === null) console.error([
			"MUI: The `query` argument provided is invalid.",
			"You are providing a function without a theme in the context.",
			"One of the parent elements needs to use a ThemeProvider."
		].join("\n"));
		let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
		query = query.replace(/^@media( ?)/m, "");
		if (query.includes("print")) console.warn([
			`MUI: You have provided a \`print\` query to the \`useMediaQuery\` hook.`,
			"Using the print media query to modify print styles can lead to unexpected results.",
			"Consider using the `displayPrint` field in the `sx` prop instead.",
			"More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print."
		].join("\n"));
		const match = (maybeReactUseSyncExternalStore !== void 0 ? useMediaQueryNew : useMediaQueryOld)(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
		import_react.useDebugValue({
			query,
			match
		});
		return match;
	};
}
unstable_createUseMediaQuery();
//#endregion
//#region node_modules/@mui/utils/esm/exactProp/exactProp.js
var specialProperty = "exact-prop: ​";
function exactProp(propTypes) {
	return {
		...propTypes,
		[specialProperty]: (props) => {
			const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
			if (unsupportedProps.length > 0) return /* @__PURE__ */ new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
			return null;
		}
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/useId/useId.js
var globalId = 0;
function useGlobalId(idOverride) {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`mui-${globalId}`);
		}
	}, [defaultId]);
	return id;
}
var maybeReactUseId = { ...import_react }.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}
	return useGlobalId(idOverride);
}
//#endregion
//#region node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function isMuiElement(element, muiNames) {
	return /* @__PURE__ */ import_react.isValidElement(element) && muiNames.indexOf(element.type.muiName ?? element.type?._payload?.value?.muiName) !== -1;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
//#endregion
//#region node_modules/@mui/material/esm/styles/cssUtils.js
function getUnit(input) {
	return String(input).match(/[\d.\-+]*\s*(.*)/)[1] || "";
}
function toUnitless(length) {
	return parseFloat(length);
}
//#endregion
//#region node_modules/@mui/material/esm/styles/useThemeProps.js
function useThemeProps({ props, name }) {
	return useThemeProps$1({
		props,
		name,
		defaultTheme,
		themeId: identifier_default
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/locales/utils/getPickersLocalization.js
var getPickersLocalization = (pickersTranslations) => {
	return { components: { MuiLocalizationProvider: { defaultProps: { localeText: _extends({}, pickersTranslations) } } } };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/locales/enUS.js
var enUSPickers = {
	previousMonth: "Previous month",
	nextMonth: "Next month",
	openPreviousView: "Open previous view",
	openNextView: "Open next view",
	calendarViewSwitchingButtonAriaLabel: (view) => view === "year" ? "year view is open, switch to calendar view" : "calendar view is open, switch to year view",
	start: "Start",
	end: "End",
	startDate: "Start date",
	startTime: "Start time",
	endDate: "End date",
	endTime: "End time",
	cancelButtonLabel: "Cancel",
	clearButtonLabel: "Clear",
	okButtonLabel: "OK",
	todayButtonLabel: "Today",
	nextStepButtonLabel: "Next",
	datePickerToolbarTitle: "Select date",
	dateTimePickerToolbarTitle: "Select date & time",
	timePickerToolbarTitle: "Select time",
	dateRangePickerToolbarTitle: "Select date range",
	timeRangePickerToolbarTitle: "Select time range",
	clockLabelText: (view, formattedTime) => `Select ${view}. ${!formattedTime ? "No time selected" : `Selected time is ${formattedTime}`}`,
	hoursClockNumberText: (hours) => `${hours} hours`,
	minutesClockNumberText: (minutes) => `${minutes} minutes`,
	secondsClockNumberText: (seconds) => `${seconds} seconds`,
	selectViewText: (view) => `Select ${view}`,
	calendarWeekNumberHeaderLabel: "Week number",
	calendarWeekNumberHeaderText: "#",
	calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
	calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
	openDatePickerDialogue: (formattedDate) => formattedDate ? `Choose date, selected date is ${formattedDate}` : "Choose date",
	openTimePickerDialogue: (formattedTime) => formattedTime ? `Choose time, selected time is ${formattedTime}` : "Choose time",
	openRangePickerDialogue: (formattedRange) => formattedRange ? `Choose range, selected range is ${formattedRange}` : "Choose range",
	fieldClearLabel: "Clear",
	timeTableLabel: "pick time",
	dateTableLabel: "pick date",
	fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
	fieldMonthPlaceholder: (params) => params.contentType === "letter" ? "MMMM" : "MM",
	fieldDayPlaceholder: () => "DD",
	fieldWeekDayPlaceholder: (params) => params.contentType === "letter" ? "EEEE" : "EE",
	fieldHoursPlaceholder: () => "hh",
	fieldMinutesPlaceholder: () => "mm",
	fieldSecondsPlaceholder: () => "ss",
	fieldMeridiemPlaceholder: () => "aa",
	year: "Year",
	month: "Month",
	day: "Day",
	weekDay: "Week day",
	hours: "Hours",
	minutes: "Minutes",
	seconds: "Seconds",
	meridiem: "Meridiem",
	empty: "Empty"
};
var DEFAULT_LOCALE = enUSPickers;
getPickersLocalization(enUSPickers);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
var _excluded$50 = ["localeText"];
var PickerAdapterContext = /* @__PURE__ */ import_react.createContext(null);
PickerAdapterContext.displayName = "PickerAdapterContext";
var MuiPickersAdapterContext = PickerAdapterContext;
/**
* Demos:
*
* - [Date format and localization](https://mui.com/x/react-date-pickers/adapters-locale/)
* - [Calendar systems](https://mui.com/x/react-date-pickers/calendar-systems/)
* - [Translated components](https://mui.com/x/react-date-pickers/localization/)
* - [UTC and timezones](https://mui.com/x/react-date-pickers/timezone/)
*
* API:
*
* - [LocalizationProvider API](https://mui.com/x/api/date-pickers/localization-provider/)
*/
var LocalizationProvider = function LocalizationProvider(inProps) {
	const { localeText: inLocaleText } = inProps, otherInProps = _objectWithoutPropertiesLoose(inProps, _excluded$50);
	const { adapter: parentAdapter, localeText: parentLocaleText } = import_react.useContext(PickerAdapterContext) ?? {
		utils: void 0,
		adapter: void 0,
		localeText: void 0
	};
	const { children, dateAdapter: DateAdapter, dateFormats, dateLibInstance, adapterLocale, localeText: themeLocaleText } = useThemeProps({
		props: otherInProps,
		name: "MuiLocalizationProvider"
	});
	const localeText = import_react.useMemo(() => _extends({}, themeLocaleText, parentLocaleText, inLocaleText), [
		themeLocaleText,
		parentLocaleText,
		inLocaleText
	]);
	const adapter = import_react.useMemo(() => {
		if (!DateAdapter) {
			if (parentAdapter) return parentAdapter;
			return null;
		}
		const dateAdapter = new DateAdapter({
			locale: adapterLocale,
			formats: dateFormats,
			instance: dateLibInstance
		});
		if (!dateAdapter.isMUIAdapter) throw new Error([
			"MUI X: The date adapter should be imported from `@mui/x-date-pickers` or `@mui/x-date-pickers-pro`, not from `@date-io`",
			"For example, `import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'` instead of `import AdapterDayjs from '@date-io/dayjs'`",
			"More information on the installation documentation: https://mui.com/x/react-date-pickers/quickstart/#installation"
		].join(`\n`));
		return dateAdapter;
	}, [
		DateAdapter,
		adapterLocale,
		dateFormats,
		dateLibInstance,
		parentAdapter
	]);
	const defaultDates = import_react.useMemo(() => {
		if (!adapter) return null;
		return {
			minDate: adapter.date("1900-01-01T00:00:00.000"),
			maxDate: adapter.date("2099-12-31T00:00:00.000")
		};
	}, [adapter]);
	const contextValue = import_react.useMemo(() => {
		return {
			utils: adapter,
			adapter,
			defaultDates,
			localeText
		};
	}, [
		defaultDates,
		adapter,
		localeText
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerAdapterContext.Provider, {
		value: contextValue,
		children
	});
};
LocalizationProvider.displayName = "LocalizationProvider";
LocalizationProvider.propTypes = {
	adapterLocale: import_prop_types.default.any,
	children: import_prop_types.default.node,
	dateAdapter: import_prop_types.default.func,
	dateFormats: import_prop_types.default.shape({
		dayOfMonth: import_prop_types.default.string,
		dayOfMonthFull: import_prop_types.default.string,
		fullDate: import_prop_types.default.string,
		fullTime12h: import_prop_types.default.string,
		fullTime24h: import_prop_types.default.string,
		hours12h: import_prop_types.default.string,
		hours24h: import_prop_types.default.string,
		keyboardDate: import_prop_types.default.string,
		keyboardDateTime12h: import_prop_types.default.string,
		keyboardDateTime24h: import_prop_types.default.string,
		meridiem: import_prop_types.default.string,
		minutes: import_prop_types.default.string,
		month: import_prop_types.default.string,
		monthShort: import_prop_types.default.string,
		normalDate: import_prop_types.default.string,
		normalDateWithWeekday: import_prop_types.default.string,
		seconds: import_prop_types.default.string,
		shortDate: import_prop_types.default.string,
		weekday: import_prop_types.default.string,
		weekdayShort: import_prop_types.default.string,
		year: import_prop_types.default.string
	}),
	dateLibInstance: import_prop_types.default.any,
	localeText: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/usePickerAdapter.js
var useLocalizationContext = () => {
	const localization = import_react.useContext(PickerAdapterContext);
	if (localization === null) throw new Error([
		"MUI X: Can not find the date and time pickers localization context.",
		"It looks like you forgot to wrap your component in LocalizationProvider.",
		"This can also happen if you are bundling multiple versions of the `@mui/x-date-pickers` package"
	].join("\n"));
	if (localization.adapter === null) throw new Error(["MUI X: Can not find the date and time pickers adapter from its localization context.", "It looks like you forgot to pass a `dateAdapter` to your LocalizationProvider."].join("\n"));
	const localeText = import_react.useMemo(() => _extends({}, DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
	return import_react.useMemo(() => _extends({}, localization, { localeText }), [localization, localeText]);
};
var usePickerAdapter = () => useLocalizationContext().adapter;
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/usePickerTranslations.js
var usePickerTranslations = () => useLocalizationContext().localeText;
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/validation/extractValidationProps.js
var DATE_VALIDATION_PROP_NAMES = [
	"disablePast",
	"disableFuture",
	"minDate",
	"maxDate",
	"shouldDisableDate",
	"shouldDisableMonth",
	"shouldDisableYear"
];
var TIME_VALIDATION_PROP_NAMES = [
	"disablePast",
	"disableFuture",
	"minTime",
	"maxTime",
	"shouldDisableTime",
	"minutesStep",
	"ampm",
	"disableIgnoringDatePartForTimeValidation"
];
var DATE_TIME_VALIDATION_PROP_NAMES = ["minDateTime", "maxDateTime"];
var VALIDATION_PROP_NAMES = [
	...DATE_VALIDATION_PROP_NAMES,
	...TIME_VALIDATION_PROP_NAMES,
	...DATE_TIME_VALIDATION_PROP_NAMES
];
/**
* Extract the validation props for the props received by a component.
* Limit the risk of forgetting some of them and reduce the bundle size.
*/
var extractValidationProps = (props) => VALIDATION_PROP_NAMES.reduce((extractedProps, propName) => {
	if (props.hasOwnProperty(propName)) extractedProps[propName] = props[propName];
	return extractedProps;
}, {});
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/useSplitFieldProps.js
var SHARED_FIELD_INTERNAL_PROP_NAMES = [
	"value",
	"defaultValue",
	"referenceDate",
	"format",
	"formatDensity",
	"onChange",
	"timezone",
	"onError",
	"shouldRespectLeadingZeros",
	"selectedSections",
	"onSelectedSectionsChange",
	"unstableFieldRef",
	"unstableStartFieldRef",
	"unstableEndFieldRef",
	"enableAccessibleFieldDOMStructure",
	"disabled",
	"readOnly",
	"dateSeparator",
	"autoFocus",
	"focused"
];
/**
* Split the props received by the field component into:
* - `internalProps` which are used by the various hooks called by the field component.
* - `forwardedProps` which are passed to the underlying component.
* Note that some forwarded props might be used by the hooks as well.
* For instance, hooks like `useDateField` need props like `onKeyDown` to merge the default event handler and the one provided by the application.
* @template TProps, TValueType
* @param {TProps} props The props received by the field component.
* @param {TValueType} valueType The type of the field value ('date', 'time', or 'date-time').
*/
var useSplitFieldProps = (props, valueType) => {
	return import_react.useMemo(() => {
		const forwardedProps = _extends({}, props);
		const internalProps = {};
		const extractProp = (propName) => {
			if (forwardedProps.hasOwnProperty(propName)) {
				internalProps[propName] = forwardedProps[propName];
				delete forwardedProps[propName];
			}
		};
		SHARED_FIELD_INTERNAL_PROP_NAMES.forEach(extractProp);
		if (valueType === "date") DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
		else if (valueType === "time") TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
		else if (valueType === "date-time") {
			DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
			TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
			DATE_TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
		}
		return {
			forwardedProps,
			internalProps
		};
	}, [props, valueType]);
};
/**
* Extract the internal props from the props received by the field component.
* This makes sure that the internal props not defined in the props are not present in the result.
*/
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/views.js
var areViewsEqual = (views, expectedViews) => {
	if (views.length !== expectedViews.length) return false;
	return expectedViews.every((expectedView) => views.includes(expectedView));
};
var applyDefaultViewProps = ({ openTo, defaultOpenTo, views, defaultViews }) => {
	const viewsWithDefault = views ?? defaultViews;
	let openToWithDefault;
	if (openTo != null) openToWithDefault = openTo;
	else if (viewsWithDefault.includes(defaultOpenTo)) openToWithDefault = defaultOpenTo;
	else if (viewsWithDefault.length > 0) openToWithDefault = viewsWithDefault[0];
	else throw new Error("MUI X: The `views` prop must contain at least one view.");
	return {
		views: viewsWithDefault,
		openTo: openToWithDefault
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/date-utils.js
var mergeDateAndTime = (adapter, dateParam, timeParam) => {
	let mergedDate = dateParam;
	mergedDate = adapter.setHours(mergedDate, adapter.getHours(timeParam));
	mergedDate = adapter.setMinutes(mergedDate, adapter.getMinutes(timeParam));
	mergedDate = adapter.setSeconds(mergedDate, adapter.getSeconds(timeParam));
	mergedDate = adapter.setMilliseconds(mergedDate, adapter.getMilliseconds(timeParam));
	return mergedDate;
};
var findClosestEnabledDate = ({ date, disableFuture, disablePast, maxDate, minDate, isDateDisabled, adapter, timezone }) => {
	const today = mergeDateAndTime(adapter, adapter.date(void 0, timezone), date);
	if (disablePast && adapter.isBefore(minDate, today)) minDate = today;
	if (disableFuture && adapter.isAfter(maxDate, today)) maxDate = today;
	let forward = date;
	let backward = date;
	if (adapter.isBefore(date, minDate)) {
		forward = minDate;
		backward = null;
	}
	if (adapter.isAfter(date, maxDate)) {
		if (backward) backward = maxDate;
		forward = null;
	}
	while (forward || backward) {
		if (forward && adapter.isAfter(forward, maxDate)) forward = null;
		if (backward && adapter.isBefore(backward, minDate)) backward = null;
		if (forward) {
			if (!isDateDisabled(forward)) return forward;
			forward = adapter.addDays(forward, 1);
		}
		if (backward) {
			if (!isDateDisabled(backward)) return backward;
			backward = adapter.addDays(backward, -1);
		}
	}
	return null;
};
var replaceInvalidDateByNull = (adapter, value) => !adapter.isValid(value) ? null : value;
var applyDefaultDate = (adapter, value, defaultValue) => {
	if (value == null || !adapter.isValid(value)) return defaultValue;
	return value;
};
var areDatesEqual = (adapter, a, b) => {
	if (!adapter.isValid(a) && a != null && !adapter.isValid(b) && b != null) return true;
	return adapter.isEqual(a, b);
};
var getMonthsInYear = (adapter, year) => {
	const months = [adapter.startOfYear(year)];
	while (months.length < 12) {
		const prevMonth = months[months.length - 1];
		months.push(adapter.addMonths(prevMonth, 1));
	}
	return months;
};
var getTodayDate = (adapter, timezone, valueType) => valueType === "date" ? adapter.startOfDay(adapter.date(void 0, timezone)) : adapter.date(void 0, timezone);
var formatMeridiem = (adapter, meridiem) => {
	const date = adapter.setHours(adapter.date(), meridiem === "am" ? 2 : 14);
	return adapter.format(date, "meridiem");
};
var DATE_VIEWS = [
	"year",
	"month",
	"day"
];
var isDatePickerView = (view) => DATE_VIEWS.includes(view);
var resolveDateFormat = (adapter, { format, views }, isInToolbar) => {
	if (format != null) return format;
	const formats = adapter.formats;
	if (areViewsEqual(views, ["year"])) return formats.year;
	if (areViewsEqual(views, ["month"])) return formats.month;
	if (areViewsEqual(views, ["day"])) return formats.dayOfMonth;
	if (areViewsEqual(views, ["month", "year"])) return `${formats.month} ${formats.year}`;
	if (areViewsEqual(views, ["day", "month"])) return `${formats.month} ${formats.dayOfMonth}`;
	if (isInToolbar) return /en/.test(adapter.getCurrentLocaleCode()) ? formats.normalDateWithWeekday : formats.normalDate;
	return formats.keyboardDate;
};
var getWeekdays = (adapter, date) => {
	const start = adapter.startOfWeek(date);
	return [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].map((diff) => adapter.addDays(start, diff));
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useField.utils.js
var getDateSectionConfigFromFormatToken = (adapter, formatToken) => {
	const config = adapter.formatTokenMap[formatToken];
	if (config == null) throw new Error([`MUI X: The token "${formatToken}" is not supported by the Date and Time Pickers.`, "Please try using another token or open an issue on https://github.com/mui/mui-x/issues/new/choose if you think it should be supported."].join("\n"));
	if (typeof config === "string") return {
		type: config,
		contentType: config === "meridiem" ? "letter" : "digit",
		maxLength: void 0
	};
	return {
		type: config.sectionType,
		contentType: config.contentType,
		maxLength: config.maxLength
	};
};
var getDaysInWeekStr = (adapter, format) => {
	const elements = [];
	const now = adapter.date(void 0, "default");
	const startDate = adapter.startOfWeek(now);
	const endDate = adapter.endOfWeek(now);
	let current = startDate;
	while (adapter.isBefore(current, endDate)) {
		elements.push(current);
		current = adapter.addDays(current, 1);
	}
	return elements.map((weekDay) => adapter.formatByString(weekDay, format));
};
var getLetterEditingOptions = (adapter, timezone, sectionType, format) => {
	switch (sectionType) {
		case "month": return getMonthsInYear(adapter, adapter.date(void 0, timezone)).map((month) => adapter.formatByString(month, format));
		case "weekDay": return getDaysInWeekStr(adapter, format);
		case "meridiem": {
			const now = adapter.date(void 0, timezone);
			return [adapter.startOfDay(now), adapter.endOfDay(now)].map((date) => adapter.formatByString(date, format));
		}
		default: return [];
	}
};
var NON_LOCALIZED_DIGITS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
var getLocalizedDigits = (adapter) => {
	const today = adapter.date(void 0);
	if (adapter.formatByString(adapter.setSeconds(today, 0), "s") === "0") return NON_LOCALIZED_DIGITS;
	return Array.from({ length: 10 }).map((_, index) => adapter.formatByString(adapter.setSeconds(today, index), "s"));
};
var removeLocalizedDigits = (valueStr, localizedDigits) => {
	if (localizedDigits[0] === "0") return valueStr;
	const digits = [];
	let currentFormattedDigit = "";
	for (let i = 0; i < valueStr.length; i += 1) {
		currentFormattedDigit += valueStr[i];
		const matchingDigitIndex = localizedDigits.indexOf(currentFormattedDigit);
		if (matchingDigitIndex > -1) {
			digits.push(matchingDigitIndex.toString());
			currentFormattedDigit = "";
		}
	}
	return digits.join("");
};
var applyLocalizedDigits = (valueStr, localizedDigits) => {
	if (localizedDigits[0] === "0") return valueStr;
	return valueStr.split("").map((char) => localizedDigits[Number(char)]).join("");
};
var isStringNumber = (valueStr, localizedDigits) => {
	const nonLocalizedValueStr = removeLocalizedDigits(valueStr, localizedDigits);
	return nonLocalizedValueStr !== " " && !Number.isNaN(Number(nonLocalizedValueStr));
};
/**
* Make sure the value of a digit section have the right amount of leading zeros.
* E.g.: `03` => `3`
* Warning: Should only be called with non-localized digits. Call `removeLocalizedDigits` with your value if needed.
*/
var cleanLeadingZeros = (valueStr, size) => {
	return Number(valueStr).toString().padStart(size, "0");
};
var cleanDigitSectionValue = (adapter, value, sectionBoundaries, localizedDigits, section) => {
	if (section.type !== "day" && section.contentType === "digit-with-letter") throw new Error([`MUI X: The token "${section.format}" is a digit format with letter in it.'
             This type of format is only supported for 'day' sections`].join("\n"));
	if (section.type === "day" && section.contentType === "digit-with-letter") {
		const date = adapter.setDate(sectionBoundaries.longestMonth, value);
		return adapter.formatByString(date, section.format);
	}
	let valueStr = value.toString();
	if (section.hasLeadingZerosInInput) valueStr = cleanLeadingZeros(valueStr, section.maxLength);
	return applyLocalizedDigits(valueStr, localizedDigits);
};
var getSectionVisibleValue = (section, target, localizedDigits) => {
	let value = section.value || section.placeholder;
	const hasLeadingZeros = target === "non-input" ? section.hasLeadingZerosInFormat : section.hasLeadingZerosInInput;
	if (target === "non-input" && section.hasLeadingZerosInInput && !section.hasLeadingZerosInFormat) value = Number(removeLocalizedDigits(value, localizedDigits)).toString();
	if (["input-rtl", "input-ltr"].includes(target) && section.contentType === "digit" && !hasLeadingZeros && value.length === 1) value = `${value}\u200e`;
	if (target === "input-rtl") value = `\u2068${value}\u2069`;
	return value;
};
var changeSectionValueFormat = (adapter, valueStr, currentFormat, newFormat) => {
	if (getDateSectionConfigFromFormatToken(adapter, currentFormat).type === "weekDay") throw new Error("changeSectionValueFormat doesn't support week day formats");
	return adapter.formatByString(adapter.parse(valueStr, currentFormat), newFormat);
};
var isFourDigitYearFormat = (adapter, format) => adapter.formatByString(adapter.date(void 0, "system"), format).length === 4;
var doesSectionFormatHaveLeadingZeros = (adapter, contentType, sectionType, format) => {
	if (contentType !== "digit") return false;
	const now = adapter.date(void 0, "default");
	switch (sectionType) {
		case "year":
			if (adapter.lib === "dayjs" && format === "YY") return true;
			return adapter.formatByString(adapter.setYear(now, 1), format).startsWith("0");
		case "month": return adapter.formatByString(adapter.startOfYear(now), format).length > 1;
		case "day": return adapter.formatByString(adapter.startOfMonth(now), format).length > 1;
		case "weekDay": return adapter.formatByString(adapter.startOfWeek(now), format).length > 1;
		case "hours": return adapter.formatByString(adapter.setHours(now, 1), format).length > 1;
		case "minutes": return adapter.formatByString(adapter.setMinutes(now, 1), format).length > 1;
		case "seconds": return adapter.formatByString(adapter.setSeconds(now, 1), format).length > 1;
		default: throw new Error("Invalid section type");
	}
};
/**
* Some date libraries like `dayjs` don't support parsing from date with escaped characters.
* To make sure that the parsing works, we are building a format and a date without any separator.
*/
var getDateFromDateSections = (adapter, sections, localizedDigits) => {
	const shouldSkipWeekDays = sections.some((section) => section.type === "day");
	const sectionFormats = [];
	const sectionValues = [];
	for (let i = 0; i < sections.length; i += 1) {
		const section = sections[i];
		if (!(shouldSkipWeekDays && section.type === "weekDay")) {
			sectionFormats.push(section.format);
			sectionValues.push(getSectionVisibleValue(section, "non-input", localizedDigits));
		}
	}
	const formatWithoutSeparator = sectionFormats.join(" ");
	const dateWithoutSeparatorStr = sectionValues.join(" ");
	return adapter.parse(dateWithoutSeparatorStr, formatWithoutSeparator);
};
var createDateStrForV7HiddenInputFromSections = (sections) => sections.map((section) => {
	return `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`;
}).join("");
var createDateStrForV6InputFromSections = (sections, localizedDigits, isRtl) => {
	const dateStr = sections.map((section) => {
		const dateValue = getSectionVisibleValue(section, isRtl ? "input-rtl" : "input-ltr", localizedDigits);
		return `${section.startSeparator}${dateValue}${section.endSeparator}`;
	}).join("");
	if (!isRtl) return dateStr;
	return `\u2066${dateStr}\u2069`;
};
var getSectionsBoundaries = (adapter, localizedDigits, timezone) => {
	const today = adapter.date(void 0, timezone);
	const endOfYear = adapter.endOfYear(today);
	const endOfDay = adapter.endOfDay(today);
	const { maxDaysInMonth, longestMonth } = getMonthsInYear(adapter, today).reduce((acc, month) => {
		const daysInMonth = adapter.getDaysInMonth(month);
		if (daysInMonth > acc.maxDaysInMonth) return {
			maxDaysInMonth: daysInMonth,
			longestMonth: month
		};
		return acc;
	}, {
		maxDaysInMonth: 0,
		longestMonth: null
	});
	return {
		year: ({ format }) => ({
			minimum: 0,
			maximum: isFourDigitYearFormat(adapter, format) ? 9999 : 99
		}),
		month: () => ({
			minimum: 1,
			maximum: adapter.getMonth(endOfYear) + 1
		}),
		day: ({ currentDate }) => ({
			minimum: 1,
			maximum: adapter.isValid(currentDate) ? adapter.getDaysInMonth(currentDate) : maxDaysInMonth,
			longestMonth
		}),
		weekDay: ({ format, contentType }) => {
			if (contentType === "digit") {
				const daysInWeek = getDaysInWeekStr(adapter, format).map(Number);
				return {
					minimum: Math.min(...daysInWeek),
					maximum: Math.max(...daysInWeek)
				};
			}
			return {
				minimum: 1,
				maximum: 7
			};
		},
		hours: ({ format }) => {
			const lastHourInDay = adapter.getHours(endOfDay);
			if (removeLocalizedDigits(adapter.formatByString(adapter.endOfDay(today), format), localizedDigits) !== lastHourInDay.toString()) return {
				minimum: 1,
				maximum: Number(removeLocalizedDigits(adapter.formatByString(adapter.startOfDay(today), format), localizedDigits))
			};
			return {
				minimum: 0,
				maximum: lastHourInDay
			};
		},
		minutes: () => ({
			minimum: 0,
			maximum: adapter.getMinutes(endOfDay)
		}),
		seconds: () => ({
			minimum: 0,
			maximum: adapter.getSeconds(endOfDay)
		}),
		meridiem: () => ({
			minimum: 0,
			maximum: 1
		}),
		empty: () => ({
			minimum: 0,
			maximum: 0
		})
	};
};
var warnedOnceInvalidSection = false;
var validateSections = (sections, valueType) => {
	if (!warnedOnceInvalidSection) {
		const supportedSections = ["empty"];
		if (["date", "date-time"].includes(valueType)) supportedSections.push("weekDay", "day", "month", "year");
		if (["time", "date-time"].includes(valueType)) supportedSections.push("hours", "minutes", "seconds", "meridiem");
		const invalidSection = sections.find((section) => !supportedSections.includes(section.type));
		if (invalidSection) {
			console.warn(`MUI X: The field component you are using is not compatible with the "${invalidSection.type}" date section.`, `The supported date sections are ["${supportedSections.join("\", \"")}"]\`.`);
			warnedOnceInvalidSection = true;
		}
	}
};
var transferDateSectionValue = (adapter, section, dateToTransferFrom, dateToTransferTo) => {
	switch (section.type) {
		case "year": return adapter.setYear(dateToTransferTo, adapter.getYear(dateToTransferFrom));
		case "month": return adapter.setMonth(dateToTransferTo, adapter.getMonth(dateToTransferFrom));
		case "weekDay": {
			let dayInWeekStrOfActiveDate = adapter.formatByString(dateToTransferFrom, section.format);
			if (section.hasLeadingZerosInInput) dayInWeekStrOfActiveDate = cleanLeadingZeros(dayInWeekStrOfActiveDate, section.maxLength);
			const formattedDaysInWeek = getDaysInWeekStr(adapter, section.format);
			const dayInWeekOfActiveDate = formattedDaysInWeek.indexOf(dayInWeekStrOfActiveDate);
			const diff = formattedDaysInWeek.indexOf(section.value) - dayInWeekOfActiveDate;
			return adapter.addDays(dateToTransferFrom, diff);
		}
		case "day": return adapter.setDate(dateToTransferTo, adapter.getDate(dateToTransferFrom));
		case "meridiem": {
			const isAM = adapter.getHours(dateToTransferFrom) < 12;
			const mergedDateHours = adapter.getHours(dateToTransferTo);
			if (isAM && mergedDateHours >= 12) return adapter.addHours(dateToTransferTo, -12);
			if (!isAM && mergedDateHours < 12) return adapter.addHours(dateToTransferTo, 12);
			return dateToTransferTo;
		}
		case "hours": return adapter.setHours(dateToTransferTo, adapter.getHours(dateToTransferFrom));
		case "minutes": return adapter.setMinutes(dateToTransferTo, adapter.getMinutes(dateToTransferFrom));
		case "seconds": return adapter.setSeconds(dateToTransferTo, adapter.getSeconds(dateToTransferFrom));
		default: return dateToTransferTo;
	}
};
var reliableSectionModificationOrder = {
	year: 1,
	month: 2,
	day: 3,
	weekDay: 4,
	hours: 5,
	minutes: 6,
	seconds: 7,
	meridiem: 8,
	empty: 9
};
var mergeDateIntoReferenceDate = (adapter, dateToTransferFrom, sections, referenceDate, shouldLimitToEditedSections) => [...sections].sort((a, b) => reliableSectionModificationOrder[a.type] - reliableSectionModificationOrder[b.type]).reduce((mergedDate, section) => {
	if (!shouldLimitToEditedSections || section.modified) return transferDateSectionValue(adapter, section, dateToTransferFrom, mergedDate);
	return mergedDate;
}, referenceDate);
var isAndroid = () => navigator.userAgent.toLowerCase().includes("android");
var getSectionOrder = (sections, shouldApplyRTL) => {
	const neighbors = {};
	if (!shouldApplyRTL) {
		sections.forEach((_, index) => {
			neighbors[index] = {
				leftIndex: index === 0 ? null : index - 1,
				rightIndex: index === sections.length - 1 ? null : index + 1
			};
		});
		return {
			neighbors,
			startIndex: 0,
			endIndex: sections.length - 1
		};
	}
	const rtl2ltr = {};
	const ltr2rtl = {};
	let groupedSectionsStart = 0;
	let groupedSectionsEnd = 0;
	let RTLIndex = sections.length - 1;
	while (RTLIndex >= 0) {
		groupedSectionsEnd = sections.findIndex((section, index) => index >= groupedSectionsStart && section.endSeparator?.includes(" ") && section.endSeparator !== " / ");
		if (groupedSectionsEnd === -1) groupedSectionsEnd = sections.length - 1;
		for (let i = groupedSectionsEnd; i >= groupedSectionsStart; i -= 1) {
			ltr2rtl[i] = RTLIndex;
			rtl2ltr[RTLIndex] = i;
			RTLIndex -= 1;
		}
		groupedSectionsStart = groupedSectionsEnd + 1;
	}
	sections.forEach((_, index) => {
		const rtlIndex = ltr2rtl[index];
		neighbors[index] = {
			leftIndex: rtlIndex === 0 ? null : rtl2ltr[rtlIndex - 1],
			rightIndex: rtlIndex === sections.length - 1 ? null : rtl2ltr[rtlIndex + 1]
		};
	});
	return {
		neighbors,
		startIndex: rtl2ltr[0],
		endIndex: rtl2ltr[sections.length - 1]
	};
};
var parseSelectedSections = (selectedSections, sections) => {
	if (selectedSections == null) return null;
	if (selectedSections === "all") return "all";
	if (typeof selectedSections === "string") {
		const index = sections.findIndex((section) => section.type === selectedSections);
		return index === -1 ? null : index;
	}
	return selectedSections;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/buildSectionsFromFormat.js
var expandFormat = ({ adapter, format }) => {
	let formatExpansionOverflow = 10;
	let prevFormat = format;
	let nextFormat = adapter.expandFormat(format);
	while (nextFormat !== prevFormat) {
		prevFormat = nextFormat;
		nextFormat = adapter.expandFormat(prevFormat);
		formatExpansionOverflow -= 1;
		if (formatExpansionOverflow < 0) throw new Error("MUI X: The format expansion seems to be in an infinite loop. Please open an issue with the format passed to the component.");
	}
	return nextFormat;
};
var getEscapedPartsFromFormat = ({ adapter, expandedFormat }) => {
	const escapedParts = [];
	const { start: startChar, end: endChar } = adapter.escapedCharacters;
	const regExp = new RegExp(`(\\${startChar}[^\\${endChar}]*\\${endChar})+`, "g");
	let match = null;
	while (match = regExp.exec(expandedFormat)) escapedParts.push({
		start: match.index,
		end: regExp.lastIndex - 1
	});
	return escapedParts;
};
var getSectionPlaceholder = (adapter, localeText, sectionConfig, sectionFormat) => {
	switch (sectionConfig.type) {
		case "year": return localeText.fieldYearPlaceholder({
			digitAmount: adapter.formatByString(adapter.date(void 0, "default"), sectionFormat).length,
			format: sectionFormat
		});
		case "month": return localeText.fieldMonthPlaceholder({
			contentType: sectionConfig.contentType,
			format: sectionFormat
		});
		case "day": return localeText.fieldDayPlaceholder({ format: sectionFormat });
		case "weekDay": return localeText.fieldWeekDayPlaceholder({
			contentType: sectionConfig.contentType,
			format: sectionFormat
		});
		case "hours": return localeText.fieldHoursPlaceholder({ format: sectionFormat });
		case "minutes": return localeText.fieldMinutesPlaceholder({ format: sectionFormat });
		case "seconds": return localeText.fieldSecondsPlaceholder({ format: sectionFormat });
		case "meridiem": return localeText.fieldMeridiemPlaceholder({ format: sectionFormat });
		default: return sectionFormat;
	}
};
var createSection = ({ adapter, date, shouldRespectLeadingZeros, localeText, localizedDigits, now, token, startSeparator }) => {
	if (token === "") throw new Error("MUI X: Should not call `commitToken` with an empty token");
	const sectionConfig = getDateSectionConfigFromFormatToken(adapter, token);
	const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(adapter, sectionConfig.contentType, sectionConfig.type, token);
	const hasLeadingZerosInInput = shouldRespectLeadingZeros ? hasLeadingZerosInFormat : sectionConfig.contentType === "digit";
	const isValidDate = adapter.isValid(date);
	let sectionValue = isValidDate ? adapter.formatByString(date, token) : "";
	let maxLength = null;
	if (hasLeadingZerosInInput) if (hasLeadingZerosInFormat) maxLength = sectionValue === "" ? adapter.formatByString(now, token).length : sectionValue.length;
	else {
		if (sectionConfig.maxLength == null) throw new Error(`MUI X: The token ${token} should have a 'maxLength' property on it's adapter`);
		maxLength = sectionConfig.maxLength;
		if (isValidDate) sectionValue = applyLocalizedDigits(cleanLeadingZeros(removeLocalizedDigits(sectionValue, localizedDigits), maxLength), localizedDigits);
	}
	return _extends({}, sectionConfig, {
		format: token,
		maxLength,
		value: sectionValue,
		placeholder: getSectionPlaceholder(adapter, localeText, sectionConfig, token),
		hasLeadingZerosInFormat,
		hasLeadingZerosInInput,
		startSeparator,
		endSeparator: "",
		modified: false
	});
};
var buildSections = (parameters) => {
	const { adapter, expandedFormat, escapedParts } = parameters;
	const now = adapter.date(void 0);
	const sections = [];
	let startSeparator = "";
	const validTokens = Object.keys(adapter.formatTokenMap).sort((a, b) => b.length - a.length);
	const regExpFirstWordInFormat = /^([a-zA-Z]+)/;
	const regExpWordOnlyComposedOfTokens = new RegExp(`^(${validTokens.join("|")})*$`);
	const regExpFirstTokenInWord = new RegExp(`^(${validTokens.join("|")})`);
	const getEscapedPartOfCurrentChar = (i) => escapedParts.find((escapeIndex) => escapeIndex.start <= i && escapeIndex.end >= i);
	let i = 0;
	while (i < expandedFormat.length) {
		const escapedPartOfCurrentChar = getEscapedPartOfCurrentChar(i);
		const isEscapedChar = escapedPartOfCurrentChar != null;
		const firstWordInFormat = regExpFirstWordInFormat.exec(expandedFormat.slice(i))?.[1];
		if (!isEscapedChar && firstWordInFormat != null && regExpWordOnlyComposedOfTokens.test(firstWordInFormat)) {
			let word = firstWordInFormat;
			while (word.length > 0) {
				const firstWord = regExpFirstTokenInWord.exec(word)[1];
				word = word.slice(firstWord.length);
				sections.push(createSection(_extends({}, parameters, {
					now,
					token: firstWord,
					startSeparator
				})));
				startSeparator = "";
			}
			i += firstWordInFormat.length;
		} else {
			const char = expandedFormat[i];
			if (!(isEscapedChar && escapedPartOfCurrentChar?.start === i || escapedPartOfCurrentChar?.end === i)) if (sections.length === 0) startSeparator += char;
			else {
				sections[sections.length - 1].endSeparator += char;
				sections[sections.length - 1].isEndFormatSeparator = true;
			}
			i += 1;
		}
	}
	if (sections.length === 0 && startSeparator.length > 0) sections.push({
		type: "empty",
		contentType: "letter",
		maxLength: null,
		format: "",
		value: "",
		placeholder: "",
		hasLeadingZerosInFormat: false,
		hasLeadingZerosInInput: false,
		startSeparator,
		endSeparator: "",
		modified: false
	});
	return sections;
};
var postProcessSections = ({ isRtl, formatDensity, sections }) => {
	return sections.map((section) => {
		const cleanSeparator = (separator) => {
			let cleanedSeparator = separator;
			if (isRtl && cleanedSeparator !== null && cleanedSeparator.includes(" ")) cleanedSeparator = `\u2069${cleanedSeparator}\u2066`;
			if (formatDensity === "spacious" && [
				"/",
				".",
				"-"
			].includes(cleanedSeparator)) cleanedSeparator = ` ${cleanedSeparator} `;
			return cleanedSeparator;
		};
		section.startSeparator = cleanSeparator(section.startSeparator);
		section.endSeparator = cleanSeparator(section.endSeparator);
		return section;
	});
};
var buildSectionsFromFormat = (parameters) => {
	let expandedFormat = expandFormat(parameters);
	if (parameters.isRtl && parameters.enableAccessibleFieldDOMStructure) expandedFormat = expandedFormat.split(" ").reverse().join(" ");
	const escapedParts = getEscapedPartsFromFormat(_extends({}, parameters, { expandedFormat }));
	return postProcessSections(_extends({}, parameters, { sections: buildSections(_extends({}, parameters, {
		expandedFormat,
		escapedParts
	})) }));
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/usePickerContext.js
var PickerContext = /* @__PURE__ */ import_react.createContext(null);
PickerContext.displayName = "PickerContext";
var usePickerContext = () => {
	const value = import_react.useContext(PickerContext);
	if (value == null) throw new Error("MUI X: The `usePickerContext` hook can only be called inside the context of a Picker component");
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useNullablePickerContext.js
/**
* Returns the context passed by the Picker wrapping the current component.
* If the context is not found, returns `null`.
*/
var useNullablePickerContext = () => import_react.useContext(PickerContext);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/useParsedFormat.js
/**
* Returns the parsed format to be rendered in the field when there is no value or in other parts of the Picker.
* This format is localized (for example `AAAA` for the year with the French locale) and cannot be parsed by your date library.
* @param {object} The parameters needed to build the placeholder.
* @param {string} params.format Format to parse.
* @returns
*/
var useParsedFormat = (parameters = {}) => {
	const pickerContext = useNullablePickerContext();
	const adapter = usePickerAdapter();
	const isRtl = useRtl();
	const translations = usePickerTranslations();
	const localizedDigits = import_react.useMemo(() => getLocalizedDigits(adapter), [adapter]);
	const { format = pickerContext?.fieldFormat ?? adapter.formats.fullDate } = parameters;
	return import_react.useMemo(() => {
		return buildSectionsFromFormat({
			adapter,
			format,
			formatDensity: "dense",
			isRtl,
			shouldRespectLeadingZeros: true,
			localeText: translations,
			localizedDigits,
			date: null,
			enableAccessibleFieldDOMStructure: false
		}).map((section) => `${section.startSeparator}${section.placeholder}${section.endSeparator}`).join("");
	}, [
		adapter,
		isRtl,
		translations,
		localizedDigits,
		format
	]);
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/useIsValidValue.js
var IsValidValueContext = /* @__PURE__ */ import_react.createContext(() => true);
IsValidValueContext.displayName = "IsValidValueContext";
function useIsValidValue() {
	return import_react.useContext(IsValidValueContext);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useNullableFieldPrivateContext.js
var PickerFieldPrivateContext = /* @__PURE__ */ import_react.createContext(null);
PickerFieldPrivateContext.displayName = "PickerFieldPrivateContext";
function useNullableFieldPrivateContext() {
	return import_react.useContext(PickerFieldPrivateContext);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickerProvider.js
var PickerActionsContext = /* @__PURE__ */ import_react.createContext(null);
PickerActionsContext.displayName = "PickerActionsContext";
var PickerPrivateContext = /* @__PURE__ */ import_react.createContext({
	ownerState: {
		isPickerDisabled: false,
		isPickerReadOnly: false,
		isPickerValueEmpty: false,
		isPickerOpen: false,
		pickerVariant: "desktop",
		pickerOrientation: "portrait"
	},
	rootRefObject: { current: null },
	labelId: void 0,
	dismissViews: () => {},
	hasUIView: true,
	getCurrentViewMode: () => "UI",
	triggerElement: null,
	viewContainerRole: null,
	defaultActionBarActions: [],
	onPopperExited: void 0
});
PickerPrivateContext.displayName = "PickerPrivateContext";
function PickerProvider(props) {
	const { contextValue, actionsContextValue, privateContextValue, fieldPrivateContextValue, isValidContextValue, localeText, children } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerActionsContext.Provider, {
			value: actionsContextValue,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerPrivateContext.Provider, {
				value: privateContextValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldPrivateContext.Provider, {
					value: fieldPrivateContextValue,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsValidValueContext.Provider, {
						value: isValidContextValue,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalizationProvider, {
							localeText,
							children
						})
					})
				})
			})
		})
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/hooks/usePickerActionsContext.js
/**
* Returns a subset of the context passed by the Picker wrapping the current component.
* It only contains the actions and never causes a re-render of the component using it.
*/
var usePickerActionsContext = () => {
	const value = import_react.useContext(PickerActionsContext);
	if (value == null) throw new Error(["MUI X: The `usePickerActionsContext` can only be called in fields that are used as a slot of a Picker component"].join("\n"));
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useUtils.js
var useDefaultDates = () => useLocalizationContext().defaultDates;
var useNow = (timezone) => {
	const adapter = usePickerAdapter();
	const now = import_react.useRef(void 0);
	if (now.current === void 0) now.current = adapter.date(void 0, timezone);
	return now.current;
};
//#endregion
//#region node_modules/@mui/utils/esm/useForkRef/useForkRef.js
/**
* Merges refs into a single memoized callback ref or `null`.
*
* ```tsx
* const rootRef = React.useRef<Instance>(null);
* const refFork = useForkRef(rootRef, props.ref);
*
* return (
*   <Root {...props} ref={refFork} />
* );
* ```
*
* @param {Array<React.Ref<Instance> | undefined>} refs The ref array.
* @returns {React.RefCallback<Instance> | null} The new ref callback.
*/
function useForkRef(...refs) {
	const cleanupRef = import_react.useRef(void 0);
	const refEffect = import_react.useCallback((instance) => {
		const cleanups = refs.map((ref) => {
			if (ref == null) return null;
			if (typeof ref === "function") {
				const refCallback = ref;
				const refCleanup = refCallback(instance);
				return typeof refCleanup === "function" ? refCleanup : () => {
					refCallback(null);
				};
			}
			ref.current = instance;
			return () => {
				ref.current = null;
			};
		});
		return () => {
			cleanups.forEach((refCleanup) => refCleanup?.());
		};
	}, refs);
	return import_react.useMemo(() => {
		if (refs.every((ref) => ref == null)) return null;
		return (value) => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		};
	}, refs);
}
//#endregion
//#region node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
/**
* Determines if a given element is a DOM element name (i.e. not a React component).
*/
function isHostComponent(element) {
	return typeof element === "string";
}
//#endregion
//#region node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
/**
* Type of the ownerState based on the type of an element it applies to.
* This resolves to the provided OwnerState for React components and `undefined` for host components.
* Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
*/
/**
* Appends the ownerState object to the props, merging with the existing one if necessary.
*
* @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node or undefined, `ownerState` is not applied.
* @param otherProps Props of the element.
* @param ownerState
*/
function appendOwnerState(elementType, otherProps, ownerState) {
	if (elementType === void 0 || isHostComponent(elementType)) return otherProps;
	return {
		...otherProps,
		ownerState: {
			...otherProps.ownerState,
			...ownerState
		}
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
/**
* Extracts event handlers from a given object.
* A prop is considered an event handler if it is a function and its name starts with `on`.
*
* @param object An object to extract event handlers from.
* @param excludeKeys An array of keys to exclude from the returned object.
*/
function extractEventHandlers(object, excludeKeys = []) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
//#endregion
//#region node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
/**
* Removes event handlers from the given object.
* A field is considered an event handler if it is a function with a name beginning with `on`.
*
* @param object Object to remove event handlers from.
* @returns Object with event handlers removed.
*/
function omitEventHandlers(object) {
	if (object === void 0) return {};
	const result = {};
	Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
		result[prop] = object[prop];
	});
	return result;
}
//#endregion
//#region node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
/**
* Merges the slot component internal props (usually coming from a hook)
* with the externally provided ones.
*
* The merge order is (the latter overrides the former):
* 1. The internal props (specified as a getter function to work with get*Props hook result)
* 2. Additional props (specified internally on a Base UI component)
* 3. External props specified on the owner component. These should only be used on a root slot.
* 4. External props specified in the `slotProps.*` prop.
* 5. The `className` prop - combined from all the above.
* @param parameters
* @returns
*/
function mergeSlotProps$2(parameters) {
	const { getSlotProps, additionalProps, externalSlotProps, externalForwardedProps, className } = parameters;
	if (!getSlotProps) {
		const joinedClasses = clsx(additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
		const mergedStyle = {
			...additionalProps?.style,
			...externalForwardedProps?.style,
			...externalSlotProps?.style
		};
		const props = {
			...additionalProps,
			...externalForwardedProps,
			...externalSlotProps
		};
		if (joinedClasses.length > 0) props.className = joinedClasses;
		if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
		return {
			props,
			internalRef: void 0
		};
	}
	const eventHandlers = extractEventHandlers({
		...externalForwardedProps,
		...externalSlotProps
	});
	const componentsPropsWithoutEventHandlers = omitEventHandlers(externalSlotProps);
	const otherPropsWithoutEventHandlers = omitEventHandlers(externalForwardedProps);
	const internalSlotProps = getSlotProps(eventHandlers);
	const joinedClasses = clsx(internalSlotProps?.className, additionalProps?.className, className, externalForwardedProps?.className, externalSlotProps?.className);
	const mergedStyle = {
		...internalSlotProps?.style,
		...additionalProps?.style,
		...externalForwardedProps?.style,
		...externalSlotProps?.style
	};
	const props = {
		...internalSlotProps,
		...additionalProps,
		...otherPropsWithoutEventHandlers,
		...componentsPropsWithoutEventHandlers
	};
	if (joinedClasses.length > 0) props.className = joinedClasses;
	if (Object.keys(mergedStyle).length > 0) props.style = mergedStyle;
	return {
		props,
		internalRef: internalSlotProps.ref
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
/**
* If `componentProps` is a function, calls it with the provided `ownerState`.
* Otherwise, just returns `componentProps`.
*/
function resolveComponentProps(componentProps, ownerState, slotState) {
	if (typeof componentProps === "function") return componentProps(ownerState, slotState);
	return componentProps;
}
//#endregion
//#region node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
/**
* @ignore - do not document.
* Builds the props to be passed into the slot of an unstyled component.
* It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
* If the slot component is not a host component, it also merges in the `ownerState`.
*
* @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
*/
function useSlotProps(parameters) {
	const { elementType, externalSlotProps, ownerState, skipResolvingSlotProps = false, ...other } = parameters;
	const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps(externalSlotProps, ownerState);
	const { props: mergedProps, internalRef } = mergeSlotProps$2({
		...other,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.additionalProps?.ref);
	return appendOwnerState(elementType, {
		...mergedProps,
		ref
	}, ownerState);
}
//#endregion
//#region node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
/**
* Safe chained function.
*
* Will only create a new function if needed,
* otherwise will pass back existing functions or null.
*/
function createChainedFunction(...funcs) {
	return funcs.reduce((acc, func) => {
		if (func == null) return acc;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			func.apply(this, args);
		};
	}, () => {});
}
//#endregion
//#region node_modules/@mui/material/esm/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
	return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", [
	"root",
	"colorPrimary",
	"colorSecondary",
	"colorAction",
	"colorError",
	"colorDisabled",
	"fontSizeInherit",
	"fontSizeSmall",
	"fontSizeMedium",
	"fontSizeLarge"
]);
//#endregion
//#region node_modules/@mui/material/esm/SvgIcon/SvgIcon.js
var useUtilityClasses$72 = (ownerState) => {
	const { color, fontSize, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		color !== "inherit" && `color${capitalize_default(color)}`,
		`fontSize${capitalize_default(fontSize)}`
	] }, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled("svg", {
	name: "MuiSvgIcon",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`],
			styles[`fontSize${capitalize_default(ownerState.fontSize)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	userSelect: "none",
	width: "1em",
	height: "1em",
	display: "inline-block",
	flexShrink: 0,
	transition: theme.transitions?.create?.("fill", { duration: (theme.vars ?? theme).transitions?.duration?.shorter }),
	variants: [
		{
			props: (props) => !props.hasSvgAsChild,
			style: { fill: "currentColor" }
		},
		{
			props: { fontSize: "inherit" },
			style: { fontSize: "inherit" }
		},
		{
			props: { fontSize: "small" },
			style: { fontSize: theme.typography?.pxToRem?.(20) || "1.25rem" }
		},
		{
			props: { fontSize: "medium" },
			style: { fontSize: theme.typography?.pxToRem?.(24) || "1.5rem" }
		},
		{
			props: { fontSize: "large" },
			style: { fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem" }
		},
		...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars ?? theme).palette?.[color]?.main }
		})),
		{
			props: { color: "action" },
			style: { color: (theme.vars ?? theme).palette?.action?.active }
		},
		{
			props: { color: "disabled" },
			style: { color: (theme.vars ?? theme).palette?.action?.disabled }
		},
		{
			props: { color: "inherit" },
			style: { color: void 0 }
		}
	]
})));
var SvgIcon = /* @__PURE__ */ import_react.forwardRef(function SvgIcon(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSvgIcon"
	});
	const { children, className, color = "inherit", component = "svg", fontSize = "medium", htmlColor, inheritViewBox = false, titleAccess, viewBox = "0 0 24 24", ...other } = props;
	const hasSvgAsChild = /* @__PURE__ */ import_react.isValidElement(children) && children.type === "svg";
	const ownerState = {
		...props,
		color,
		component,
		fontSize,
		instanceFontSize: inProps.fontSize,
		inheritViewBox,
		viewBox,
		hasSvgAsChild
	};
	const more = {};
	if (!inheritViewBox) more.viewBox = viewBox;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SvgIconRoot, {
		as: component,
		className: clsx(useUtilityClasses$72(ownerState).root, className),
		focusable: "false",
		color: htmlColor,
		"aria-hidden": titleAccess ? void 0 : true,
		role: titleAccess ? "img" : void 0,
		ref,
		...more,
		...other,
		...hasSvgAsChild && children.props,
		ownerState,
		children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: titleAccess }) : null]
	});
});
SvgIcon.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"action",
		"disabled",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	component: import_prop_types.default.elementType,
	fontSize: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"large",
		"medium",
		"small"
	]), import_prop_types.default.string]),
	htmlColor: import_prop_types.default.string,
	inheritViewBox: import_prop_types.default.bool,
	shapeRendering: import_prop_types.default.string,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	titleAccess: import_prop_types.default.string,
	viewBox: import_prop_types.default.string
};
SvgIcon.muiName = "SvgIcon";
//#endregion
//#region node_modules/@mui/material/esm/utils/createSvgIcon.js
/**
* Private module reserved for @mui packages.
*/
function createSvgIcon(path, displayName) {
	function Component(props, ref) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIcon, {
			"data-testid": `${displayName}Icon`,
			ref,
			...props,
			children: path
		});
	}
	Component.displayName = `${displayName}Icon`;
	Component.muiName = SvgIcon.muiName;
	return /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef(Component));
}
//#endregion
//#region node_modules/@mui/utils/esm/debounce/debounce.js
function debounce$1(func, wait = 166) {
	let timeout;
	function debounced(...args) {
		const later = () => {
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	}
	debounced.clear = () => {
		clearTimeout(timeout);
	};
	return debounced;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/debounce.js
var debounce_default = debounce$1;
//#endregion
//#region node_modules/@mui/material/esm/utils/isMuiElement.js
var isMuiElement_default = isMuiElement;
//#endregion
//#region node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/ownerDocument.js
var ownerDocument_default = ownerDocument;
//#endregion
//#region node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
	return ownerDocument(node).defaultView || window;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/ownerWindow.js
var ownerWindow_default = ownerWindow;
//#endregion
//#region node_modules/@mui/utils/esm/setRef/setRef.js
/**
* TODO v5: consider making it private
*
* passes {value} to {ref}
*
* WARNING: Be sure to only call this inside a callback that is passed as a ref.
* Otherwise, make sure to cleanup the previous {ref} if it changes. See
* https://github.com/mui/material-ui/issues/13539
*
* Useful if you want to expose the ref of an inner component to the public API
* while still using it inside the component.
* @param ref A ref callback or ref object. If anything falsy, this is a no-op.
*/
function setRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useEnhancedEffect.js
var useEnhancedEffect_default = useEnhancedEffect;
//#endregion
//#region node_modules/@mui/material/esm/utils/useId.js
var useId_default = useId;
//#endregion
//#region node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js
function unsupportedProp(props, propName, componentName, location, propFullName) {
	const propFullNameSafe = propFullName || propName;
	if (typeof props[propName] !== "undefined") return /* @__PURE__ */ new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
	return null;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/unsupportedProp.js
var unsupportedProp_default = unsupportedProp;
//#endregion
//#region node_modules/@mui/utils/esm/useControlled/useControlled.js
function useControlled(props) {
	const { controlled, default: defaultProp, name, state = "value" } = props;
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	const value = isControlled ? controlled : valueState;
	{
		import_react.useEffect(() => {
			if (isControlled !== (controlled !== void 0)) console.error([
				`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`,
				"Elements should not switch from uncontrolled to controlled (or vice versa).",
				`Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`,
				"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
				"More info: https://fb.me/react-controlled-components"
			].join("\n"));
		}, [
			state,
			name,
			controlled
		]);
		const { current: defaultValue } = import_react.useRef(defaultProp);
		import_react.useEffect(() => {
			if (!isControlled && JSON.stringify(defaultProp) !== JSON.stringify(defaultValue)) console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
		}, [JSON.stringify(defaultProp)]);
	}
	return [value, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useControlled.js
var useControlled_default = useControlled;
//#endregion
//#region node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
/**
* Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
* See RFC in https://github.com/reactjs/rfcs/pull/220
*/
function useEventCallback(fn) {
	const ref = import_react.useRef(fn);
	useEnhancedEffect(() => {
		ref.current = fn;
	});
	return import_react.useRef((...args) => (0, ref.current)(...args)).current;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/useEventCallback.js
var useEventCallback_default = useEventCallback;
//#endregion
//#region node_modules/@mui/material/esm/utils/useForkRef.js
var useForkRef_default = useForkRef;
//#endregion
//#region node_modules/@mui/material/esm/utils/mergeSlotProps.js
function isEventHandler(key, value) {
	const thirdCharCode = key.charCodeAt(2);
	return key[0] === "o" && key[1] === "n" && thirdCharCode >= 65 && thirdCharCode <= 90 && typeof value === "function";
}
function mergeSlotProps$1(externalSlotProps, defaultSlotProps) {
	if (!externalSlotProps) return defaultSlotProps;
	function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
		const handlers = {};
		Object.keys(defaultSlotPropsValue).forEach((key) => {
			if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") handlers[key] = (...args) => {
				externalSlotPropsValue[key](...args);
				defaultSlotPropsValue[key](...args);
			};
		});
		return handlers;
	}
	if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") return (ownerState) => {
		const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
		const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
			...ownerState,
			...defaultSlotPropsValue
		}) : externalSlotProps;
		const className = clsx(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
		const handlers = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
		return {
			...defaultSlotPropsValue,
			...externalSlotPropsValue,
			...handlers,
			...!!className && { className },
			...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && { style: {
				...defaultSlotPropsValue.style,
				...externalSlotPropsValue.style
			} },
			...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && { sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]] }
		};
	};
	const typedDefaultSlotProps = defaultSlotProps;
	const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
	const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
	return {
		...defaultSlotProps,
		...externalSlotProps,
		...handlers,
		...!!className && { className },
		...typedDefaultSlotProps?.style && externalSlotProps?.style && { style: {
			...typedDefaultSlotProps.style,
			...externalSlotProps.style
		} },
		...typedDefaultSlotProps?.sx && externalSlotProps?.sx && { sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]] }
	};
}
//#endregion
//#region node_modules/@mui/utils/esm/refType/refType.js
var refType = import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]);
//#endregion
//#region node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useLazyRef(sortColumns, columns)
*/
function useLazyRef(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region node_modules/@mui/material/esm/useLazyRipple/useLazyRipple.js
/**
* Lazy initialization container for the Ripple instance. This improves
* performance by delaying mounting the ripple until it's needed.
*/
var LazyRipple = class LazyRipple {
	/** React ref to the ripple instance */
	/** If the ripple component should be mounted */
	/** Promise that resolves when the ripple component is mounted */
	/** If the ripple component has been mounted */
	/** React state hook setter */
	static create() {
		return new LazyRipple();
	}
	static use() {
		const ripple = useLazyRef(LazyRipple.create).current;
		const [shouldMount, setShouldMount] = import_react.useState(false);
		ripple.shouldMount = shouldMount;
		ripple.setShouldMount = setShouldMount;
		import_react.useEffect(ripple.mountEffect, [shouldMount]);
		return ripple;
	}
	constructor() {
		this.ref = { current: null };
		this.mounted = null;
		this.didMount = false;
		this.shouldMount = false;
		this.setShouldMount = null;
	}
	mount() {
		if (!this.mounted) {
			this.mounted = createControlledPromise();
			this.shouldMount = true;
			this.setShouldMount(this.shouldMount);
		}
		return this.mounted;
	}
	mountEffect = () => {
		if (this.shouldMount && !this.didMount) {
			if (this.ref.current !== null) {
				this.didMount = true;
				this.mounted.resolve();
			}
		}
	};
	start(...args) {
		this.mount().then(() => this.ref.current?.start(...args));
	}
	stop(...args) {
		this.mount().then(() => this.ref.current?.stop(...args));
	}
	pulsate(...args) {
		this.mount().then(() => this.ref.current?.pulsate(...args));
	}
};
function useLazyRipple() {
	return LazyRipple.use();
}
function createControlledPromise() {
	let resolve;
	let reject;
	const p = new Promise((resolveFn, rejectFn) => {
		resolve = resolveFn;
		reject = rejectFn;
	});
	p.resolve = resolve;
	p.reject = reject;
	return p;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, _setPrototypeOf(t, e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
	t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
/**
* Checks if a given element has a CSS class.
* 
* @param element the element
* @param className the CSS class name
*/
function hasClass(element, className) {
	if (element.classList) return !!className && element.classList.contains(className);
	return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
/**
* Adds a CSS class to a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function addClass(element, className) {
	if (element.classList) element.classList.add(className);
	else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
	else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
/**
* Removes a CSS class from a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function removeClass$1(element, className) {
	if (element.classList) element.classList.remove(className);
	else if (typeof element.className === "string") element.className = replaceClassName(element.className, className);
	else element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
}
//#endregion
//#region node_modules/react-transition-group/esm/config.js
var config_default = { disabled: false };
//#endregion
//#region node_modules/react-transition-group/esm/utils/PropTypes.js
var timeoutsShape = import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
	enter: import_prop_types.default.number,
	exit: import_prop_types.default.number,
	appear: import_prop_types.default.number
}).isRequired]);
var classNamesShape = import_prop_types.default.oneOfType([
	import_prop_types.default.string,
	import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string,
		active: import_prop_types.default.string
	}),
	import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		enterDone: import_prop_types.default.string,
		enterActive: import_prop_types.default.string,
		exit: import_prop_types.default.string,
		exitDone: import_prop_types.default.string,
		exitActive: import_prop_types.default.string
	})
]);
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroupContext.js
var TransitionGroupContext_default = import_react.createContext(null);
//#endregion
//#region node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
	return node.scrollTop;
};
//#endregion
//#region node_modules/react-transition-group/esm/Transition.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
/**
* The Transition component lets you describe a transition from one component
* state to another _over time_ with a simple declarative API. Most commonly
* it's used to animate the mounting and unmounting of a component, but can also
* be used to describe in-place transition states as well.
*
* ---
*
* **Note**: `Transition` is a platform-agnostic base component. If you're using
* transitions in CSS, you'll probably want to use
* [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
* instead. It inherits all the features of `Transition`, but contains
* additional features necessary to play nice with CSS transitions (hence the
* name of the component).
*
* ---
*
* By default the `Transition` component does not alter the behavior of the
* component it renders, it only tracks "enter" and "exit" states for the
* components. It's up to you to give meaning and effect to those states. For
* example we can add styles to a component when it enters or exits:
*
* ```jsx
* import { Transition } from 'react-transition-group';
*
* const duration = 300;
*
* const defaultStyle = {
*   transition: `opacity ${duration}ms ease-in-out`,
*   opacity: 0,
* }
*
* const transitionStyles = {
*   entering: { opacity: 1 },
*   entered:  { opacity: 1 },
*   exiting:  { opacity: 0 },
*   exited:  { opacity: 0 },
* };
*
* const Fade = ({ in: inProp }) => (
*   <Transition in={inProp} timeout={duration}>
*     {state => (
*       <div style={{
*         ...defaultStyle,
*         ...transitionStyles[state]
*       }}>
*         I'm a fade Transition!
*       </div>
*     )}
*   </Transition>
* );
* ```
*
* There are 4 main states a Transition can be in:
*  - `'entering'`
*  - `'entered'`
*  - `'exiting'`
*  - `'exited'`
*
* Transition state is toggled via the `in` prop. When `true` the component
* begins the "Enter" stage. During this stage, the component will shift from
* its current transition state, to `'entering'` for the duration of the
* transition and then to the `'entered'` stage once it's complete. Let's take
* the following example (we'll use the
* [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <Transition in={inProp} timeout={500}>
*         {state => (
*           // ...
*         )}
*       </Transition>
*       <button onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the button is clicked the component will shift to the `'entering'` state
* and stay there for 500ms (the value of `timeout`) before it finally switches
* to `'entered'`.
*
* When `in` is `false` the same thing happens except the state moves from
* `'exiting'` to `'exited'`.
*/
var Transition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(Transition, _React$Component);
	function Transition(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		var parentGroup = context;
		var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
		var initialStatus;
		_this.appearStatus = null;
		if (props.in) if (appear) {
			initialStatus = EXITED;
			_this.appearStatus = ENTERING;
		} else initialStatus = ENTERED;
		else if (props.unmountOnExit || props.mountOnEnter) initialStatus = UNMOUNTED;
		else initialStatus = EXITED;
		_this.state = { status: initialStatus };
		_this.nextCallback = null;
		return _this;
	}
	Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
		if (_ref.in && prevState.status === "unmounted") return { status: EXITED };
		return null;
	};
	var _proto = Transition.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	};
	_proto.componentDidUpdate = function componentDidUpdate(prevProps) {
		var nextStatus = null;
		if (prevProps !== this.props) {
			var status = this.state.status;
			if (this.props.in) {
				if (status !== "entering" && status !== "entered") nextStatus = ENTERING;
			} else if (status === "entering" || status === "entered") nextStatus = EXITING;
		}
		this.updateStatus(false, nextStatus);
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.cancelNextCallback();
	};
	_proto.getTimeouts = function getTimeouts() {
		var timeout = this.props.timeout;
		var exit = enter = appear = timeout, enter, appear;
		if (timeout != null && typeof timeout !== "number") {
			exit = timeout.exit;
			enter = timeout.enter;
			appear = timeout.appear !== void 0 ? timeout.appear : enter;
		}
		return {
			exit,
			enter,
			appear
		};
	};
	_proto.updateStatus = function updateStatus(mounting, nextStatus) {
		if (mounting === void 0) mounting = false;
		if (nextStatus !== null) {
			this.cancelNextCallback();
			if (nextStatus === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
					if (node) forceReflow(node);
				}
				this.performEnter(mounting);
			} else this.performExit();
		} else if (this.props.unmountOnExit && this.state.status === "exited") this.setState({ status: UNMOUNTED });
	};
	_proto.performEnter = function performEnter(mounting) {
		var _this2 = this;
		var enter = this.props.enter;
		var appearing = this.context ? this.context.isMounting : mounting;
		var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
		var timeouts = this.getTimeouts();
		var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		if (!mounting && !enter || config_default.disabled) {
			this.safeSetState({ status: ENTERED }, function() {
				_this2.props.onEntered(maybeNode);
			});
			return;
		}
		this.props.onEnter(maybeNode, maybeAppearing);
		this.safeSetState({ status: ENTERING }, function() {
			_this2.props.onEntering(maybeNode, maybeAppearing);
			_this2.onTransitionEnd(enterTimeout, function() {
				_this2.safeSetState({ status: ENTERED }, function() {
					_this2.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	};
	_proto.performExit = function performExit() {
		var _this3 = this;
		var exit = this.props.exit;
		var timeouts = this.getTimeouts();
		var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.default.findDOMNode(this);
		if (!exit || config_default.disabled) {
			this.safeSetState({ status: EXITED }, function() {
				_this3.props.onExited(maybeNode);
			});
			return;
		}
		this.props.onExit(maybeNode);
		this.safeSetState({ status: EXITING }, function() {
			_this3.props.onExiting(maybeNode);
			_this3.onTransitionEnd(timeouts.exit, function() {
				_this3.safeSetState({ status: EXITED }, function() {
					_this3.props.onExited(maybeNode);
				});
			});
		});
	};
	_proto.cancelNextCallback = function cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	};
	_proto.safeSetState = function safeSetState(nextState, callback) {
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	};
	_proto.setNextCallback = function setNextCallback(callback) {
		var _this4 = this;
		var active = true;
		this.nextCallback = function(event) {
			if (active) {
				active = false;
				_this4.nextCallback = null;
				callback(event);
			}
		};
		this.nextCallback.cancel = function() {
			active = false;
		};
		return this.nextCallback;
	};
	_proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.default.findDOMNode(this);
		var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
		if (!node || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}
		if (timeout != null) setTimeout(this.nextCallback, timeout);
	};
	_proto.render = function render() {
		var status = this.state.status;
		if (status === "unmounted") return null;
		var _this$props = this.props, children = _this$props.children;
		_this$props.in;
		_this$props.mountOnEnter;
		_this$props.unmountOnExit;
		_this$props.appear;
		_this$props.enter;
		_this$props.exit;
		_this$props.timeout;
		_this$props.addEndListener;
		_this$props.onEnter;
		_this$props.onEntering;
		_this$props.onEntered;
		_this$props.onExit;
		_this$props.onExiting;
		_this$props.onExited;
		_this$props.nodeRef;
		var childProps = _objectWithoutPropertiesLoose(_this$props, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: null }, typeof children === "function" ? children(status, childProps) : import_react.cloneElement(import_react.Children.only(children), childProps));
	};
	return Transition;
}(import_react.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = {
	nodeRef: import_prop_types.default.shape({ current: typeof Element === "undefined" ? import_prop_types.default.any : function(propValue, key, componentName, location, propFullName, secret) {
		var value = propValue[key];
		return import_prop_types.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
	} }),
	children: import_prop_types.default.oneOfType([import_prop_types.default.func.isRequired, import_prop_types.default.element.isRequired]).isRequired,
	in: import_prop_types.default.bool,
	mountOnEnter: import_prop_types.default.bool,
	unmountOnExit: import_prop_types.default.bool,
	appear: import_prop_types.default.bool,
	enter: import_prop_types.default.bool,
	exit: import_prop_types.default.bool,
	timeout: function timeout(props) {
		var pt = timeoutsShape;
		if (!props.addEndListener) pt = pt.isRequired;
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		return pt.apply(void 0, [props].concat(args));
	},
	addEndListener: import_prop_types.default.func,
	onEnter: import_prop_types.default.func,
	onEntering: import_prop_types.default.func,
	onEntered: import_prop_types.default.func,
	onExit: import_prop_types.default.func,
	onExiting: import_prop_types.default.func,
	onExited: import_prop_types.default.func
};
function noop$4() {}
Transition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,
	onEnter: noop$4,
	onEntering: noop$4,
	onEntered: noop$4,
	onExit: noop$4,
	onExiting: noop$4,
	onExited: noop$4
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
//#endregion
//#region node_modules/react-transition-group/esm/CSSTransition.js
var _addClass = function addClass$1(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return addClass(node, c);
	});
};
var removeClass = function removeClass(node, classes) {
	return node && classes && classes.split(" ").forEach(function(c) {
		return removeClass$1(node, c);
	});
};
/**
* A transition component inspired by the excellent
* [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
* use it if you're using CSS transitions or animations. It's built upon the
* [`Transition`](https://reactcommunity.org/react-transition-group/transition)
* component, so it inherits all of its props.
*
* `CSSTransition` applies a pair of class names during the `appear`, `enter`,
* and `exit` states of the transition. The first class is applied and then a
* second `*-active` class in order to activate the CSS transition. After the
* transition, matching `*-done` class names are applied to persist the
* transition state.
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <CSSTransition in={inProp} timeout={200} classNames="my-node">
*         <div>
*           {"I'll receive my-node-* classes"}
*         </div>
*       </CSSTransition>
*       <button type="button" onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the `in` prop is set to `true`, the child component will first receive
* the class `example-enter`, then the `example-enter-active` will be added in
* the next tick. `CSSTransition` [forces a
* reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
* between before adding the `example-enter-active`. This is an important trick
* because it allows us to transition between `example-enter` and
* `example-enter-active` even though they were added immediately one after
* another. Most notably, this is what makes it possible for us to animate
* _appearance_.
*
* ```css
* .my-node-enter {
*   opacity: 0;
* }
* .my-node-enter-active {
*   opacity: 1;
*   transition: opacity 200ms;
* }
* .my-node-exit {
*   opacity: 1;
* }
* .my-node-exit-active {
*   opacity: 0;
*   transition: opacity 200ms;
* }
* ```
*
* `*-active` classes represent which styles you want to animate **to**, so it's
* important to add `transition` declaration only to them, otherwise transitions
* might not behave as intended! This might not be obvious when the transitions
* are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
* the example above (minus `transition`), but it becomes apparent in more
* complex transitions.
*
* **Note**: If you're using the
* [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
* prop, make sure to define styles for `.appear-*` classes as well.
*/
var CSSTransition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(CSSTransition, _React$Component);
	function CSSTransition() {
		var _this;
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
		_this.appliedClasses = {
			appear: {},
			enter: {},
			exit: {}
		};
		_this.onEnter = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
			_this.removeClasses(node, "exit");
			_this.addClass(node, appearing ? "appear" : "enter", "base");
			if (_this.props.onEnter) _this.props.onEnter(maybeNode, maybeAppearing);
		};
		_this.onEntering = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0];
			var type = _this$resolveArgument2[1] ? "appear" : "enter";
			_this.addClass(node, type, "active");
			if (_this.props.onEntering) _this.props.onEntering(maybeNode, maybeAppearing);
		};
		_this.onEntered = function(maybeNode, maybeAppearing) {
			var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0];
			var type = _this$resolveArgument3[1] ? "appear" : "enter";
			_this.removeClasses(node, type);
			_this.addClass(node, type, "done");
			if (_this.props.onEntered) _this.props.onEntered(maybeNode, maybeAppearing);
		};
		_this.onExit = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "appear");
			_this.removeClasses(node, "enter");
			_this.addClass(node, "exit", "base");
			if (_this.props.onExit) _this.props.onExit(maybeNode);
		};
		_this.onExiting = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.addClass(node, "exit", "active");
			if (_this.props.onExiting) _this.props.onExiting(maybeNode);
		};
		_this.onExited = function(maybeNode) {
			var node = _this.resolveArguments(maybeNode)[0];
			_this.removeClasses(node, "exit");
			_this.addClass(node, "exit", "done");
			if (_this.props.onExited) _this.props.onExited(maybeNode);
		};
		_this.resolveArguments = function(maybeNode, maybeAppearing) {
			return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
		};
		_this.getClassNames = function(type) {
			var classNames = _this.props.classNames;
			var isStringClassNames = typeof classNames === "string";
			var prefix = isStringClassNames && classNames ? classNames + "-" : "";
			var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
			return {
				baseClassName,
				activeClassName: isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"],
				doneClassName: isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"]
			};
		};
		return _this;
	}
	var _proto = CSSTransition.prototype;
	_proto.addClass = function addClass(node, type, phase) {
		var className = this.getClassNames(type)[phase + "ClassName"];
		var doneClassName = this.getClassNames("enter").doneClassName;
		if (type === "appear" && phase === "done" && doneClassName) className += " " + doneClassName;
		if (phase === "active") {
			if (node) forceReflow(node);
		}
		if (className) {
			this.appliedClasses[type][phase] = className;
			_addClass(node, className);
		}
	};
	_proto.removeClasses = function removeClasses(node, type) {
		var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
		this.appliedClasses[type] = {};
		if (baseClassName) removeClass(node, baseClassName);
		if (activeClassName) removeClass(node, activeClassName);
		if (doneClassName) removeClass(node, doneClassName);
	};
	_proto.render = function render() {
		var _this$props = this.props;
		_this$props.classNames;
		var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
		return /* @__PURE__ */ import_react.createElement(Transition, _extends({}, props, {
			onEnter: this.onEnter,
			onEntered: this.onEntered,
			onEntering: this.onEntering,
			onExit: this.onExit,
			onExiting: this.onExiting,
			onExited: this.onExited
		}));
	};
	return CSSTransition;
}(import_react.Component);
CSSTransition.defaultProps = { classNames: "" };
CSSTransition.propTypes = _extends({}, Transition.propTypes, {
	classNames: classNamesShape,
	onEnter: import_prop_types.default.func,
	onEntering: import_prop_types.default.func,
	onEntered: import_prop_types.default.func,
	onExit: import_prop_types.default.func,
	onExiting: import_prop_types.default.func,
	onExited: import_prop_types.default.func
});
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/react-transition-group/esm/utils/ChildMapping.js
/**
* Given `this.props.children`, return an object mapping key to child.
*
* @param {*} children `this.props.children`
* @return {object} Mapping of key to child
*/
function getChildMapping(children, mapFn) {
	var mapper = function mapper(child) {
		return mapFn && (0, import_react.isValidElement)(child) ? mapFn(child) : child;
	};
	var result = Object.create(null);
	if (children) import_react.Children.map(children, function(c) {
		return c;
	}).forEach(function(child) {
		result[child.key] = mapper(child);
	});
	return result;
}
/**
* When you're adding or removing children some may be added or removed in the
* same render pass. We want to show *both* since we want to simultaneously
* animate elements in and out. This function takes a previous set of keys
* and a new set of keys and merges them with its best guess of the correct
* ordering. In the future we may expose some of the utilities in
* ReactMultiChild to make this easy, but for now React itself does not
* directly have this concept of the union of prevChildren and nextChildren
* so we implement it here.
*
* @param {object} prev prev children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @param {object} next next children as returned from
* `ReactTransitionChildMapping.getChildMapping()`.
* @return {object} a key set that contains all keys in `prev` and all keys
* in `next` in a reasonable order.
*/
function mergeChildMappings(prev, next) {
	prev = prev || {};
	next = next || {};
	function getValueForKey(key) {
		return key in next ? next[key] : prev[key];
	}
	var nextKeysPending = Object.create(null);
	var pendingKeys = [];
	for (var prevKey in prev) if (prevKey in next) {
		if (pendingKeys.length) {
			nextKeysPending[prevKey] = pendingKeys;
			pendingKeys = [];
		}
	} else pendingKeys.push(prevKey);
	var i;
	var childMapping = {};
	for (var nextKey in next) {
		if (nextKeysPending[nextKey]) for (i = 0; i < nextKeysPending[nextKey].length; i++) {
			var pendingNextKey = nextKeysPending[nextKey][i];
			childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
		}
		childMapping[nextKey] = getValueForKey(nextKey);
	}
	for (i = 0; i < pendingKeys.length; i++) childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	return childMapping;
}
function getProp(child, prop, props) {
	return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
	return getChildMapping(props.children, function(child) {
		return (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			appear: getProp(child, "appear", props),
			enter: getProp(child, "enter", props),
			exit: getProp(child, "exit", props)
		});
	});
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
	var nextChildMapping = getChildMapping(nextProps.children);
	var children = mergeChildMappings(prevChildMapping, nextChildMapping);
	Object.keys(children).forEach(function(key) {
		var child = children[key];
		if (!(0, import_react.isValidElement)(child)) return;
		var hasPrev = key in prevChildMapping;
		var hasNext = key in nextChildMapping;
		var prevChild = prevChildMapping[key];
		var isLeaving = (0, import_react.isValidElement)(prevChild) && !prevChild.props.in;
		if (hasNext && (!hasPrev || isLeaving)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: true,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
		else if (!hasNext && hasPrev && !isLeaving) children[key] = (0, import_react.cloneElement)(child, { in: false });
		else if (hasNext && hasPrev && (0, import_react.isValidElement)(prevChild)) children[key] = (0, import_react.cloneElement)(child, {
			onExited: onExited.bind(null, child),
			in: prevChild.props.in,
			exit: getProp(child, "exit", nextProps),
			enter: getProp(child, "enter", nextProps)
		});
	});
	return children;
}
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroup.js
var values = Object.values || function(obj) {
	return Object.keys(obj).map(function(k) {
		return obj[k];
	});
};
var defaultProps = {
	component: "div",
	childFactory: function childFactory(child) {
		return child;
	}
};
/**
* The `<TransitionGroup>` component manages a set of transition components
* (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
* components, `<TransitionGroup>` is a state machine for managing the mounting
* and unmounting of components over time.
*
* Consider the example below. As items are removed or added to the TodoList the
* `in` prop is toggled automatically by the `<TransitionGroup>`.
*
* Note that `<TransitionGroup>`  does not define any animation behavior!
* Exactly _how_ a list item animates is up to the individual transition
* component. This means you can mix and match animations across different list
* items.
*/
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(TransitionGroup, _React$Component);
	function TransitionGroup(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		_this.state = {
			contextValue: { isMounting: true },
			handleExited: _this.handleExited.bind(_assertThisInitialized(_this)),
			firstRender: true
		};
		return _this;
	}
	var _proto = TransitionGroup.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.mounted = true;
		this.setState({ contextValue: { isMounting: false } });
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.mounted = false;
	};
	TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
		var prevChildMapping = _ref.children, handleExited = _ref.handleExited;
		return {
			children: _ref.firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
			firstRender: false
		};
	};
	_proto.handleExited = function handleExited(child, node) {
		var currentChildMapping = getChildMapping(this.props.children);
		if (child.key in currentChildMapping) return;
		if (child.props.onExited) child.props.onExited(node);
		if (this.mounted) this.setState(function(state) {
			var children = _extends({}, state.children);
			delete children[child.key];
			return { children };
		});
	};
	_proto.render = function render() {
		var _this$props = this.props, Component = _this$props.component, childFactory = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
		var contextValue = this.state.contextValue;
		var children = values(this.state.children).map(childFactory);
		delete props.appear;
		delete props.enter;
		delete props.exit;
		if (Component === null) return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, children);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(Component, props, children));
	};
	return TransitionGroup;
}(import_react.Component);
TransitionGroup.propTypes = {
	component: import_prop_types.default.any,
	children: import_prop_types.default.node,
	appear: import_prop_types.default.bool,
	enter: import_prop_types.default.bool,
	exit: import_prop_types.default.bool,
	childFactory: import_prop_types.default.func
};
TransitionGroup.defaultProps = defaultProps;
//#endregion
//#region node_modules/@mui/utils/esm/useOnMount/useOnMount.js
var EMPTY = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY);
}
//#endregion
//#region node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = null;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = null;
			fn();
		}, delay);
	}
	clear = () => {
		if (this.currentId !== null) {
			clearTimeout(this.currentId);
			this.currentId = null;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
function useTimeout() {
	const timeout = useLazyRef(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/Ripple.js
/**
* @ignore - internal component.
*/
function Ripple(props) {
	const { className, classes, pulsate = false, rippleX, rippleY, rippleSize, in: inProp, onExited, timeout } = props;
	const [leaving, setLeaving] = import_react.useState(false);
	const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
	const rippleStyles = {
		width: rippleSize,
		height: rippleSize,
		top: -(rippleSize / 2) + rippleY,
		left: -(rippleSize / 2) + rippleX
	};
	const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
	if (!inProp && !leaving) setLeaving(true);
	import_react.useEffect(() => {
		if (!inProp && onExited != null) {
			const timeoutId = setTimeout(onExited, timeout);
			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [
		onExited,
		inProp,
		timeout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: rippleClassName,
		style: rippleStyles,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: childClassName })
	});
}
Ripple.propTypes = {
	classes: import_prop_types.default.object.isRequired,
	className: import_prop_types.default.string,
	in: import_prop_types.default.bool,
	onExited: import_prop_types.default.func,
	pulsate: import_prop_types.default.bool,
	rippleSize: import_prop_types.default.number,
	rippleX: import_prop_types.default.number,
	rippleY: import_prop_types.default.number,
	timeout: import_prop_types.default.number.isRequired
};
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/touchRippleClasses.js
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", [
	"root",
	"ripple",
	"rippleVisible",
	"ripplePulsate",
	"child",
	"childLeaving",
	"childPulsate"
]);
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/TouchRipple.js
var DURATION = 550;
var enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
var exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
var pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
var TouchRippleRoot = styled("span", {
	name: "MuiTouchRipple",
	slot: "Root"
})({
	overflow: "hidden",
	pointerEvents: "none",
	position: "absolute",
	zIndex: 0,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	borderRadius: "inherit"
});
var TouchRippleRipple = styled(Ripple, {
	name: "MuiTouchRipple",
	slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses.ripplePulsate} {
    animation-duration: ${({ theme }) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({ theme }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
/**
* @ignore - internal component.
*
* TODO v5: Make private
*/
var TouchRipple = /* @__PURE__ */ import_react.forwardRef(function TouchRipple(inProps, ref) {
	const { center: centerProp = false, classes = {}, className, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiTouchRipple"
	});
	const [ripples, setRipples] = import_react.useState([]);
	const nextKey = import_react.useRef(0);
	const rippleCallback = import_react.useRef(null);
	import_react.useEffect(() => {
		if (rippleCallback.current) {
			rippleCallback.current();
			rippleCallback.current = null;
		}
	}, [ripples]);
	const ignoringMouseDown = import_react.useRef(false);
	const startTimer = useTimeout();
	const startTimerCommit = import_react.useRef(null);
	const container = import_react.useRef(null);
	const startCommit = import_react.useCallback((params) => {
		const { pulsate, rippleX, rippleY, rippleSize, cb } = params;
		setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRipple, {
			classes: {
				ripple: clsx(classes.ripple, touchRippleClasses.ripple),
				rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
				ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
				child: clsx(classes.child, touchRippleClasses.child),
				childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
				childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
			},
			timeout: DURATION,
			pulsate,
			rippleX,
			rippleY,
			rippleSize
		}, nextKey.current)]);
		nextKey.current += 1;
		rippleCallback.current = cb;
	}, [classes]);
	const start = import_react.useCallback((event = {}, options = {}, cb = () => {}) => {
		const { pulsate = false, center = centerProp || options.pulsate, fakeElement = false } = options;
		if (event?.type === "mousedown" && ignoringMouseDown.current) {
			ignoringMouseDown.current = false;
			return;
		}
		if (event?.type === "touchstart") ignoringMouseDown.current = true;
		const element = fakeElement ? null : container.current;
		const rect = element ? element.getBoundingClientRect() : {
			width: 0,
			height: 0,
			left: 0,
			top: 0
		};
		let rippleX;
		let rippleY;
		let rippleSize;
		if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
			rippleX = Math.round(rect.width / 2);
			rippleY = Math.round(rect.height / 2);
		} else {
			const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
			rippleX = Math.round(clientX - rect.left);
			rippleY = Math.round(clientY - rect.top);
		}
		if (center) {
			rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
			if (rippleSize % 2 === 0) rippleSize += 1;
		} else {
			const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
			const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
			rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
		}
		if (event?.touches) {
			if (startTimerCommit.current === null) {
				startTimerCommit.current = () => {
					startCommit({
						pulsate,
						rippleX,
						rippleY,
						rippleSize,
						cb
					});
				};
				startTimer.start(80, () => {
					if (startTimerCommit.current) {
						startTimerCommit.current();
						startTimerCommit.current = null;
					}
				});
			}
		} else startCommit({
			pulsate,
			rippleX,
			rippleY,
			rippleSize,
			cb
		});
	}, [
		centerProp,
		startCommit,
		startTimer
	]);
	const pulsate = import_react.useCallback(() => {
		start({}, { pulsate: true });
	}, [start]);
	const stop = import_react.useCallback((event, cb) => {
		startTimer.clear();
		if (event?.type === "touchend" && startTimerCommit.current) {
			startTimerCommit.current();
			startTimerCommit.current = null;
			startTimer.start(0, () => {
				stop(event, cb);
			});
			return;
		}
		startTimerCommit.current = null;
		setRipples((oldRipples) => {
			if (oldRipples.length > 0) return oldRipples.slice(1);
			return oldRipples;
		});
		rippleCallback.current = cb;
	}, [startTimer]);
	import_react.useImperativeHandle(ref, () => ({
		pulsate,
		start,
		stop
	}), [
		pulsate,
		start,
		stop
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRippleRoot, {
		className: clsx(touchRippleClasses.root, classes.root, className),
		ref: container,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionGroup, {
			component: null,
			exit: true,
			children: ripples
		})
	});
});
TouchRipple.propTypes = {
	center: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/buttonBaseClasses.js
function getButtonBaseUtilityClass(slot) {
	return generateUtilityClass("MuiButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", [
	"root",
	"disabled",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/esm/ButtonBase/ButtonBase.js
var useUtilityClasses$71 = (ownerState) => {
	const { disabled, focusVisible, focusVisibleClassName, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		disabled && "disabled",
		focusVisible && "focusVisible"
	] }, getButtonBaseUtilityClass, classes);
	if (focusVisible && focusVisibleClassName) composedClasses.root += ` ${focusVisibleClassName}`;
	return composedClasses;
};
var ButtonBaseRoot = styled("button", {
	name: "MuiButtonBase",
	slot: "Root"
})({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	boxSizing: "border-box",
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
	textDecoration: "none",
	color: "inherit",
	"&::-moz-focus-inner": { borderStyle: "none" },
	[`&.${buttonBaseClasses.disabled}`]: {
		pointerEvents: "none",
		cursor: "default"
	},
	"@media print": { colorAdjust: "exact" }
});
/**
* `ButtonBase` contains as few styles as possible.
* It aims to be a simple building block for creating a button.
* It contains a load of style reset and some focus/ripple logic.
*/
var ButtonBase = /* @__PURE__ */ import_react.forwardRef(function ButtonBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiButtonBase"
	});
	const { action, centerRipple = false, children, className, component = "button", disabled = false, disableRipple = false, disableTouchRipple = false, focusRipple = false, focusVisibleClassName, LinkComponent = "a", onBlur, onClick, onContextMenu, onDragLeave, onFocus, onFocusVisible, onKeyDown, onKeyUp, onMouseDown, onMouseLeave, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, tabIndex = 0, TouchRippleProps, touchRippleRef, type, ...other } = props;
	const buttonRef = import_react.useRef(null);
	const ripple = useLazyRipple();
	const handleRippleRef = useForkRef_default(ripple.ref, touchRippleRef);
	const [focusVisible, setFocusVisible] = import_react.useState(false);
	if (disabled && focusVisible) setFocusVisible(false);
	import_react.useImperativeHandle(action, () => ({ focusVisible: () => {
		setFocusVisible(true);
		buttonRef.current.focus();
	} }), []);
	const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
	import_react.useEffect(() => {
		if (focusVisible && focusRipple && !disableRipple) ripple.pulsate();
	}, [
		disableRipple,
		focusRipple,
		focusVisible,
		ripple
	]);
	const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
	const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
	const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
	const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
	const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
		if (focusVisible) event.preventDefault();
		if (onMouseLeave) onMouseLeave(event);
	}, disableTouchRipple);
	const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
	const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
	const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
	const handleBlur = useRippleHandler(ripple, "stop", (event) => {
		if (!isFocusVisible(event.target)) setFocusVisible(false);
		if (onBlur) onBlur(event);
	}, false);
	const handleFocus = useEventCallback_default((event) => {
		if (!buttonRef.current) buttonRef.current = event.currentTarget;
		if (isFocusVisible(event.target)) {
			setFocusVisible(true);
			if (onFocusVisible) onFocusVisible(event);
		}
		if (onFocus) onFocus(event);
	});
	const isNonNativeButton = () => {
		const button = buttonRef.current;
		return component && component !== "button" && !(button.tagName === "A" && button.href);
	};
	const handleKeyDown = useEventCallback_default((event) => {
		if (focusRipple && !event.repeat && focusVisible && event.key === " ") ripple.stop(event, () => {
			ripple.start(event);
		});
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") event.preventDefault();
		if (onKeyDown) onKeyDown(event);
		if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
			event.preventDefault();
			if (onClick) onClick(event);
		}
	});
	const handleKeyUp = useEventCallback_default((event) => {
		if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) ripple.stop(event, () => {
			ripple.pulsate(event);
		});
		if (onKeyUp) onKeyUp(event);
		if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) onClick(event);
	});
	let ComponentProp = component;
	if (ComponentProp === "button" && (other.href || other.to)) ComponentProp = LinkComponent;
	const buttonProps = {};
	if (ComponentProp === "button") {
		const hasFormAttributes = !!other.formAction;
		buttonProps.type = type === void 0 && !hasFormAttributes ? "button" : type;
		buttonProps.disabled = disabled;
	} else {
		if (!other.href && !other.to) buttonProps.role = "button";
		if (disabled) buttonProps["aria-disabled"] = disabled;
	}
	const handleRef = useForkRef_default(ref, buttonRef);
	const ownerState = {
		...props,
		centerRipple,
		component,
		disabled,
		disableRipple,
		disableTouchRipple,
		focusRipple,
		tabIndex,
		focusVisible
	};
	const classes = useUtilityClasses$71(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonBaseRoot, {
		as: ComponentProp,
		className: clsx(classes.root, className),
		ownerState,
		onBlur: handleBlur,
		onClick,
		onContextMenu: handleContextMenu,
		onFocus: handleFocus,
		onKeyDown: handleKeyDown,
		onKeyUp: handleKeyUp,
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onDragLeave: handleDragLeave,
		onTouchEnd: handleTouchEnd,
		onTouchMove: handleTouchMove,
		onTouchStart: handleTouchStart,
		ref: handleRef,
		tabIndex: disabled ? -1 : tabIndex,
		type,
		...buttonProps,
		...other,
		children: [children, enableTouchRipple ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchRipple, {
			ref: handleRippleRef,
			center: centerRipple,
			...TouchRippleProps
		}) : null]
	});
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
	return useEventCallback_default((event) => {
		if (eventCallback) eventCallback(event);
		if (!skipRippleAction) ripple[rippleAction](event);
		return true;
	});
}
ButtonBase.propTypes = {
	action: refType,
	centerRipple: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: elementTypeAcceptingRef_default,
	disabled: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	disableTouchRipple: import_prop_types.default.bool,
	focusRipple: import_prop_types.default.bool,
	focusVisibleClassName: import_prop_types.default.string,
	formAction: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.string]),
	href: import_prop_types.default.any,
	LinkComponent: import_prop_types.default.elementType,
	onBlur: import_prop_types.default.func,
	onClick: import_prop_types.default.func,
	onContextMenu: import_prop_types.default.func,
	onDragLeave: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onFocusVisible: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onKeyUp: import_prop_types.default.func,
	onMouseDown: import_prop_types.default.func,
	onMouseLeave: import_prop_types.default.func,
	onMouseUp: import_prop_types.default.func,
	onTouchEnd: import_prop_types.default.func,
	onTouchMove: import_prop_types.default.func,
	onTouchStart: import_prop_types.default.func,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	tabIndex: import_prop_types.default.number,
	TouchRippleProps: import_prop_types.default.object,
	touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		pulsate: import_prop_types.default.func.isRequired,
		start: import_prop_types.default.func.isRequired,
		stop: import_prop_types.default.func.isRequired
	}) })]),
	type: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"button",
		"reset",
		"submit"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/esm/CircularProgress/circularProgressClasses.js
function getCircularProgressUtilityClass(slot) {
	return generateUtilityClass("MuiCircularProgress", slot);
}
generateUtilityClasses("MuiCircularProgress", [
	"root",
	"determinate",
	"indeterminate",
	"colorPrimary",
	"colorSecondary",
	"svg",
	"track",
	"circle",
	"circleDeterminate",
	"circleIndeterminate",
	"circleDisableShrink"
]);
//#endregion
//#region node_modules/@mui/material/esm/CircularProgress/CircularProgress.js
var SIZE = 44;
var circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
var circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
var rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
var dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
var useUtilityClasses$70 = (ownerState) => {
	const { classes, variant, color, disableShrink } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			`color${capitalize_default(color)}`
		],
		svg: ["svg"],
		track: ["track"],
		circle: [
			"circle",
			`circle${capitalize_default(variant)}`,
			disableShrink && "circleDisableShrink"
		]
	}, getCircularProgressUtilityClass, classes);
};
var CircularProgressRoot = styled("span", {
	name: "MuiCircularProgress",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`color${capitalize_default(ownerState.color)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("transform") }
		},
		{
			props: { variant: "indeterminate" },
			style: rotateAnimation || { animation: `${circularRotateKeyframe} 1.4s linear infinite` }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		}))
	]
})));
var CircularProgressSVG = styled("svg", {
	name: "MuiCircularProgress",
	slot: "Svg"
})({ display: "block" });
var CircularProgressCircle = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Circle",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.circle,
			styles[`circle${capitalize_default(ownerState.variant)}`],
			ownerState.disableShrink && styles.circleDisableShrink
		];
	}
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	variants: [
		{
			props: { variant: "determinate" },
			style: { transition: theme.transitions.create("stroke-dashoffset") }
		},
		{
			props: { variant: "indeterminate" },
			style: {
				strokeDasharray: "80px, 200px",
				strokeDashoffset: 0
			}
		},
		{
			props: ({ ownerState }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
			style: dashAnimation || { animation: `${circularDashKeyframe} 1.4s ease-in-out infinite` }
		}
	]
})));
var CircularProgressTrack = styled("circle", {
	name: "MuiCircularProgress",
	slot: "Track"
})(memoTheme(({ theme }) => ({
	stroke: "currentColor",
	opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
/**
* ## ARIA
*
* If the progress bar is describing the loading progress of a particular region of a page,
* you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
* attribute to `true` on that region until it has finished loading.
*/
var CircularProgress = /* @__PURE__ */ import_react.forwardRef(function CircularProgress(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiCircularProgress"
	});
	const { className, color = "primary", disableShrink = false, enableTrackSlot = false, size = 40, style, thickness = 3.6, value = 0, variant = "indeterminate", ...other } = props;
	const ownerState = {
		...props,
		color,
		disableShrink,
		size,
		thickness,
		value,
		variant,
		enableTrackSlot
	};
	const classes = useUtilityClasses$70(ownerState);
	const circleStyle = {};
	const rootStyle = {};
	const rootProps = {};
	if (variant === "determinate") {
		const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
		circleStyle.strokeDasharray = circumference.toFixed(3);
		rootProps["aria-valuenow"] = Math.round(value);
		circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
		rootStyle.transform = "rotate(-90deg)";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressRoot, {
		className: clsx(classes.root, className),
		style: {
			width: size,
			height: size,
			...rootStyle,
			...style
		},
		ownerState,
		ref,
		role: "progressbar",
		...rootProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CircularProgressSVG, {
			className: classes.svg,
			ownerState,
			viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
			children: [enableTrackSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressTrack, {
				className: classes.track,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness,
				"aria-hidden": "true"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgressCircle, {
				className: classes.circle,
				style: circleStyle,
				ownerState,
				cx: SIZE,
				cy: SIZE,
				r: (SIZE - thickness) / 2,
				fill: "none",
				strokeWidth: thickness
			})]
		})
	});
});
CircularProgress.propTypes = {
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	disableShrink: chainPropTypes(import_prop_types.default.bool, (props) => {
		if (props.disableShrink && props.variant && props.variant !== "indeterminate") return /* @__PURE__ */ new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.");
		return null;
	}),
	enableTrackSlot: import_prop_types.default.bool,
	size: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
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
	thickness: import_prop_types.default.number,
	value: import_prop_types.default.number,
	variant: import_prop_types.default.oneOf(["determinate", "indeterminate"])
};
//#endregion
//#region node_modules/@mui/material/esm/IconButton/iconButtonClasses.js
function getIconButtonUtilityClass(slot) {
	return generateUtilityClass("MuiIconButton", slot);
}
var iconButtonClasses = generateUtilityClasses("MuiIconButton", [
	"root",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorError",
	"colorInfo",
	"colorSuccess",
	"colorWarning",
	"edgeStart",
	"edgeEnd",
	"sizeSmall",
	"sizeMedium",
	"sizeLarge",
	"loading",
	"loadingIndicator",
	"loadingWrapper"
]);
//#endregion
//#region node_modules/@mui/material/esm/IconButton/IconButton.js
var useUtilityClasses$69 = (ownerState) => {
	const { classes, disabled, color, edge, size, loading } = ownerState;
	return composeClasses({
		root: [
			"root",
			loading && "loading",
			disabled && "disabled",
			color !== "default" && `color${capitalize_default(color)}`,
			edge && `edge${capitalize_default(edge)}`,
			`size${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getIconButtonUtilityClass, classes);
};
var IconButtonRoot = styled(ButtonBase, {
	name: "MuiIconButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.loading && styles.loading,
			ownerState.color !== "default" && styles[`color${capitalize_default(ownerState.color)}`],
			ownerState.edge && styles[`edge${capitalize_default(ownerState.edge)}`],
			styles[`size${capitalize_default(ownerState.size)}`]
		];
	}
})(memoTheme(({ theme }) => ({
	textAlign: "center",
	flex: "0 0 auto",
	fontSize: theme.typography.pxToRem(24),
	padding: 8,
	borderRadius: "50%",
	color: (theme.vars || theme).palette.action.active,
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
	variants: [
		{
			props: (props) => !props.disableRipple,
			style: {
				"--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
				"&:hover": {
					backgroundColor: "var(--IconButton-hoverBg)",
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: { edge: "start" },
			style: { marginLeft: -12 }
		},
		{
			props: {
				edge: "start",
				size: "small"
			},
			style: { marginLeft: -3 }
		},
		{
			props: { edge: "end" },
			style: { marginRight: -12 }
		},
		{
			props: {
				edge: "end",
				size: "small"
			},
			style: { marginRight: -3 }
		}
	]
})), memoTheme(({ theme }) => ({
	variants: [
		{
			props: { color: "inherit" },
			style: { color: "inherit" }
		},
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { color: (theme.vars || theme).palette[color].main }
		})),
		...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
			props: { color },
			style: { "--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) }
		})),
		{
			props: { size: "small" },
			style: {
				padding: 5,
				fontSize: theme.typography.pxToRem(18)
			}
		},
		{
			props: { size: "large" },
			style: {
				padding: 12,
				fontSize: theme.typography.pxToRem(28)
			}
		}
	],
	[`&.${iconButtonClasses.disabled}`]: {
		backgroundColor: "transparent",
		color: (theme.vars || theme).palette.action.disabled
	},
	[`&.${iconButtonClasses.loading}`]: { color: "transparent" }
})));
var IconButtonLoadingIndicator = styled("span", {
	name: "MuiIconButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	color: (theme.vars || theme).palette.action.disabled,
	variants: [{
		props: { loading: true },
		style: { display: "flex" }
	}]
}));
/**
* Refer to the [Icons](/material-ui/icons/) section of the documentation
* regarding the available icon options.
*/
var IconButton = /* @__PURE__ */ import_react.forwardRef(function IconButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiIconButton"
	});
	const { edge = false, children, className, color = "default", disabled = false, disableFocusRipple = false, size = "medium", id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		edge,
		color,
		disabled,
		disableFocusRipple,
		loading,
		loadingIndicator,
		size
	};
	const classes = useUtilityClasses$69(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButtonRoot, {
		id: loading ? loadingId : idProp,
		className: clsx(classes.root, className),
		centerRipple: true,
		focusRipple: !disableFocusRipple,
		disabled: disabled || loading,
		ref,
		...other,
		ownerState,
		children: [typeof loading === "boolean" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: classes.loadingWrapper,
			style: { display: "contents" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButtonLoadingIndicator, {
				className: classes.loadingIndicator,
				ownerState,
				children: loading && loadingIndicator
			})
		}), children]
	});
});
IconButton.propTypes = {
	children: chainPropTypes(import_prop_types.default.node, (props) => {
		if (import_react.Children.toArray(props.children).some((child) => /* @__PURE__ */ import_react.isValidElement(child) && child.props.onClick)) return new Error([
			"MUI: You are providing an onClick event listener to a child of a button element.",
			"Prefer applying it to the IconButton directly.",
			"This guarantees that the whole <button> will be responsive to click events."
		].join("\n"));
		return null;
	}),
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"default",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	disabled: import_prop_types.default.bool,
	disableFocusRipple: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	edge: import_prop_types.default.oneOf([
		"end",
		"start",
		false
	]),
	id: import_prop_types.default.string,
	loading: import_prop_types.default.bool,
	loadingIndicator: import_prop_types.default.node,
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/icons/index.js
/**
* @ignore - internal component.
*/
var ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
/**
* @ignore - internal component.
*/
var ArrowLeftIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }), "ArrowLeft");
/**
* @ignore - internal component.
*/
var ArrowRightIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }), "ArrowRight");
/**
* @ignore - internal component.
*/
var CalendarIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" }), "Calendar");
/**
* @ignore - internal component.
*/
var ClockIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Clock");
/**
* @ignore - internal component.
*/
var DateRangeIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" }), "DateRange");
/**
* @ignore - internal component.
*/
var TimeIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" })] }), "Time");
/**
* @ignore - internal component.
*/
var ClearIcon = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }), "Clear");
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersArrowSwitcher/pickersArrowSwitcherClasses.js
function getPickersArrowSwitcherUtilityClass(slot) {
	return generateUtilityClass("MuiPickersArrowSwitcher", slot);
}
generateUtilityClasses("MuiPickersArrowSwitcher", [
	"root",
	"spacer",
	"button",
	"previousIconButton",
	"nextIconButton",
	"leftArrowIcon",
	"rightArrowIcon"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/usePickerPrivateContext.js
/**
* Returns the private context passed by the Picker wrapping the current component.
*/
var usePickerPrivateContext = () => import_react.useContext(PickerPrivateContext);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersArrowSwitcher/PickersArrowSwitcher.js
var _excluded$49 = [
	"children",
	"className",
	"slots",
	"slotProps",
	"isNextDisabled",
	"isNextHidden",
	"onGoToNext",
	"nextLabel",
	"isPreviousDisabled",
	"isPreviousHidden",
	"onGoToPrevious",
	"previousLabel",
	"labelId",
	"classes"
], _excluded2$6 = ["ownerState"], _excluded3$1 = ["ownerState"];
var PickersArrowSwitcherRoot = styled("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Root"
})({ display: "flex" });
var PickersArrowSwitcherSpacer = styled("div", {
	name: "MuiPickersArrowSwitcher",
	slot: "Spacer"
})(({ theme }) => ({ width: theme.spacing(3) }));
var PickersArrowSwitcherButton = styled(IconButton, {
	name: "MuiPickersArrowSwitcher",
	slot: "Button"
})({ variants: [{
	props: { isButtonHidden: true },
	style: { visibility: "hidden" }
}] });
var useUtilityClasses$68 = (classes) => {
	return composeClasses({
		root: ["root"],
		spacer: ["spacer"],
		button: ["button"],
		previousIconButton: ["previousIconButton"],
		nextIconButton: ["nextIconButton"],
		leftArrowIcon: ["leftArrowIcon"],
		rightArrowIcon: ["rightArrowIcon"]
	}, getPickersArrowSwitcherUtilityClass, classes);
};
var PickersArrowSwitcher = /* @__PURE__ */ import_react.forwardRef(function PickersArrowSwitcher(inProps, ref) {
	const isRtl = useRtl();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersArrowSwitcher"
	});
	const { children, className, slots, slotProps, isNextDisabled, isNextHidden, onGoToNext, nextLabel, isPreviousDisabled, isPreviousHidden, onGoToPrevious, previousLabel, labelId, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$49);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$68(classesProp);
	const nextProps = {
		isDisabled: isNextDisabled,
		isHidden: isNextHidden,
		goTo: onGoToNext,
		label: nextLabel
	};
	const previousProps = {
		isDisabled: isPreviousDisabled,
		isHidden: isPreviousHidden,
		goTo: onGoToPrevious,
		label: previousLabel
	};
	const PreviousIconButton = slots?.previousIconButton ?? PickersArrowSwitcherButton;
	const previousIconButtonProps = useSlotProps({
		elementType: PreviousIconButton,
		externalSlotProps: slotProps?.previousIconButton,
		additionalProps: {
			size: "medium",
			title: previousProps.label,
			"aria-label": previousProps.label,
			disabled: previousProps.isDisabled,
			edge: "end",
			onClick: previousProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: previousProps.isHidden ?? false }),
		className: clsx(classes.button, classes.previousIconButton)
	});
	const NextIconButton = slots?.nextIconButton ?? PickersArrowSwitcherButton;
	const nextIconButtonProps = useSlotProps({
		elementType: NextIconButton,
		externalSlotProps: slotProps?.nextIconButton,
		additionalProps: {
			size: "medium",
			title: nextProps.label,
			"aria-label": nextProps.label,
			disabled: nextProps.isDisabled,
			edge: "start",
			onClick: nextProps.goTo
		},
		ownerState: _extends({}, ownerState, { isButtonHidden: nextProps.isHidden ?? false }),
		className: clsx(classes.button, classes.nextIconButton)
	});
	const LeftArrowIcon = slots?.leftArrowIcon ?? ArrowLeftIcon;
	const leftArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: LeftArrowIcon,
		externalSlotProps: slotProps?.leftArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.leftArrowIcon
	}), _excluded2$6);
	const RightArrowIcon = slots?.rightArrowIcon ?? ArrowRightIcon;
	const rightArrowIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: RightArrowIcon,
		externalSlotProps: slotProps?.rightArrowIcon,
		additionalProps: { fontSize: "inherit" },
		ownerState,
		className: classes.rightArrowIcon
	}), _excluded3$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersArrowSwitcherRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviousIconButton, _extends({}, previousIconButtonProps, { children: isRtl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) })),
		children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			variant: "subtitle1",
			component: "span",
			id: labelId,
			children
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersArrowSwitcherSpacer, {
			className: classes.spacer,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextIconButton, _extends({}, nextIconButtonProps, { children: isRtl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftArrowIcon, _extends({}, leftArrowIconProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RightArrowIcon, _extends({}, rightArrowIconProps)) }))
	] }));
});
PickersArrowSwitcher.displayName = "PickersArrowSwitcher";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/time-utils.js
var EXPORTED_TIME_VIEWS = [
	"hours",
	"minutes",
	"seconds"
];
var TIME_VIEWS = [
	"hours",
	"minutes",
	"seconds",
	"meridiem"
];
var isTimeView = (view) => EXPORTED_TIME_VIEWS.includes(view);
var isInternalTimeView = (view) => TIME_VIEWS.includes(view);
var getMeridiem = (date, adapter) => {
	if (!date) return null;
	return adapter.getHours(date) >= 12 ? "pm" : "am";
};
var convertValueToMeridiem = (value, meridiem, ampm) => {
	if (ampm) {
		if ((value >= 12 ? "pm" : "am") !== meridiem) return meridiem === "am" ? value - 12 : value + 12;
	}
	return value;
};
var convertToMeridiem = (time, meridiem, ampm, adapter) => {
	const newHoursAmount = convertValueToMeridiem(adapter.getHours(time), meridiem, ampm);
	return adapter.setHours(time, newHoursAmount);
};
var getSecondsInDay = (date, adapter) => {
	return adapter.getHours(date) * 3600 + adapter.getMinutes(date) * 60 + adapter.getSeconds(date);
};
var createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, adapter) => (dateLeft, dateRight) => {
	if (disableIgnoringDatePartForTimeValidation) return adapter.isAfter(dateLeft, dateRight);
	return getSecondsInDay(dateLeft, adapter) > getSecondsInDay(dateRight, adapter);
};
var resolveTimeFormat = (adapter, { format, views, ampm }) => {
	if (format != null) return format;
	const formats = adapter.formats;
	if (areViewsEqual(views, ["hours"])) return ampm ? `${formats.hours12h} ${formats.meridiem}` : formats.hours24h;
	if (areViewsEqual(views, ["minutes"])) return formats.minutes;
	if (areViewsEqual(views, ["seconds"])) return formats.seconds;
	if (areViewsEqual(views, ["minutes", "seconds"])) return `${formats.minutes}:${formats.seconds}`;
	if (areViewsEqual(views, [
		"hours",
		"minutes",
		"seconds"
	])) return ampm ? `${formats.hours12h}:${formats.minutes}:${formats.seconds} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}:${formats.seconds}`;
	return ampm ? `${formats.hours12h}:${formats.minutes} ${formats.meridiem}` : `${formats.hours24h}:${formats.minutes}`;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/createStepNavigation.js
var DEFAULT_STEP_NAVIGATION = {
	hasNextStep: false,
	hasSeveralSteps: false,
	goToNextStep: () => {},
	areViewsInSameStep: () => true
};
/**
* Create an object that determines whether there is a next step and allows to go to the next step.
* @param {CreateStepNavigationParameters<TStep>} parameters The parameters of the createStepNavigation function
* @returns {CreateStepNavigationReturnValue} The return value of the createStepNavigation function
*/
function createStepNavigation(parameters) {
	const { steps, isViewMatchingStep, onStepChange } = parameters;
	return (parametersBis) => {
		if (steps == null) return DEFAULT_STEP_NAVIGATION;
		const currentStepIndex = steps.findIndex((step) => isViewMatchingStep(parametersBis.view, step));
		const nextStep = currentStepIndex === -1 || currentStepIndex === steps.length - 1 ? null : steps[currentStepIndex + 1];
		return {
			hasNextStep: nextStep != null,
			hasSeveralSteps: steps.length > 1,
			goToNextStep: () => {
				if (nextStep == null) return;
				onStepChange(_extends({}, parametersBis, { step: nextStep }));
			},
			areViewsInSameStep: (viewA, viewB) => {
				return steps.find((step) => isViewMatchingStep(viewA, step)) === steps.find((step) => isViewMatchingStep(viewB, step));
			}
		};
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useViews.js
var warnedOnceNotValidView = false;
function useViews({ onChange, onViewChange, openTo, view: inView, views, autoFocus, focusedView: inFocusedView, onFocusedViewChange, getStepNavigation }) {
	if (!warnedOnceNotValidView) {
		if (inView != null && !views.includes(inView)) {
			console.warn(`MUI X: \`view="${inView}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
		if (inView == null && openTo != null && !views.includes(openTo)) {
			console.warn(`MUI X: \`openTo="${openTo}"\` is not a valid prop.`, `It must be an element of \`views=["${views.join("\", \"")}"]\`.`);
			warnedOnceNotValidView = true;
		}
	}
	const previousOpenTo = import_react.useRef(openTo);
	const previousViews = import_react.useRef(views);
	const defaultView = import_react.useRef(views.includes(openTo) ? openTo : views[0]);
	const [view, setView] = useControlled({
		name: "useViews",
		state: "view",
		controlled: inView,
		default: defaultView.current
	});
	const [focusedView, setFocusedView] = useControlled({
		name: "useViews",
		state: "focusedView",
		controlled: inFocusedView,
		default: import_react.useRef(autoFocus ? view : null).current
	});
	const stepNavigation = getStepNavigation ? getStepNavigation({
		setView,
		view,
		defaultView: defaultView.current,
		views
	}) : DEFAULT_STEP_NAVIGATION;
	import_react.useEffect(() => {
		if (previousOpenTo.current && previousOpenTo.current !== openTo || previousViews.current && previousViews.current.some((previousView) => !views.includes(previousView))) {
			setView(views.includes(openTo) ? openTo : views[0]);
			previousViews.current = views;
			previousOpenTo.current = openTo;
		}
	}, [
		openTo,
		setView,
		view,
		views
	]);
	const viewIndex = views.indexOf(view);
	const previousView = views[viewIndex - 1] ?? null;
	const nextView = views[viewIndex + 1] ?? null;
	const handleFocusedViewChange = useEventCallback((viewToFocus, hasFocus) => {
		if (hasFocus) setFocusedView(viewToFocus);
		else setFocusedView((prevFocusedView) => viewToFocus === prevFocusedView ? null : prevFocusedView);
		onFocusedViewChange?.(viewToFocus, hasFocus);
	});
	const handleChangeView = useEventCallback((newView) => {
		handleFocusedViewChange(newView, true);
		if (newView === view) return;
		setView(newView);
		if (onViewChange) onViewChange(newView);
	});
	const goToNextView = useEventCallback(() => {
		if (nextView) handleChangeView(nextView);
	});
	const setValueAndGoToNextView = useEventCallback((value, currentViewSelectionState, selectedView) => {
		const isSelectionFinishedOnCurrentView = currentViewSelectionState === "finish";
		const hasMoreViews = selectedView ? views.indexOf(selectedView) < views.length - 1 : Boolean(nextView);
		onChange(value, isSelectionFinishedOnCurrentView && hasMoreViews ? "partial" : currentViewSelectionState, selectedView);
		let currentView = null;
		if (selectedView != null && selectedView !== view) currentView = selectedView;
		else if (isSelectionFinishedOnCurrentView) currentView = view;
		if (currentView == null) return;
		const viewToNavigateTo = views[views.indexOf(currentView) + 1];
		if (viewToNavigateTo == null || !stepNavigation.areViewsInSameStep(currentView, viewToNavigateTo)) return;
		handleChangeView(viewToNavigateTo);
	});
	return _extends({}, stepNavigation, {
		view,
		setView: handleChangeView,
		focusedView,
		setFocusedView: handleFocusedViewChange,
		nextView,
		previousView,
		defaultView: views.includes(openTo) ? openTo : views[0],
		goToNextView,
		setValueAndGoToNextView
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/date-helpers-hooks.js
function useNextMonthDisabled(month, { disableFuture, maxDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		return !adapter.isAfter(lastEnabledMonth, month);
	}, [
		disableFuture,
		maxDate,
		month,
		adapter,
		timezone
	]);
}
function usePreviousMonthDisabled(month, { disablePast, minDate, timezone }) {
	const adapter = usePickerAdapter();
	return import_react.useMemo(() => {
		const now = adapter.date(void 0, timezone);
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		return !adapter.isBefore(firstEnabledMonth, month);
	}, [
		disablePast,
		minDate,
		month,
		adapter,
		timezone
	]);
}
function useMeridiemMode(date, ampm, onChange, selectionState) {
	const adapter = usePickerAdapter();
	const cleanDate = import_react.useMemo(() => !adapter.isValid(date) ? null : date, [adapter, date]);
	return {
		meridiemMode: getMeridiem(cleanDate, adapter),
		handleMeridiemChange: import_react.useCallback((mode) => {
			onChange(cleanDate == null ? null : convertToMeridiem(cleanDate, mode, Boolean(ampm), adapter), selectionState ?? "partial");
		}, [
			ampm,
			cleanDate,
			onChange,
			selectionState,
			adapter
		])
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickerViewRoot/PickerViewRoot.js
var PickerViewRoot = styled("div", {
	slot: "internal",
	shouldForwardProp: void 0
})({
	overflow: "hidden",
	width: 320,
	maxHeight: 336,
	display: "flex",
	flexDirection: "column",
	margin: "0 auto"
});
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/timeClockClasses.js
function getTimeClockUtilityClass(slot) {
	return generateUtilityClass("MuiTimeClock", slot);
}
var timeClockClasses = generateUtilityClasses("MuiTimeClock", ["root", "arrowSwitcher"]);
var clockCenter = {
	x: 220 / 2,
	y: 220 / 2
};
var baseClockPoint = {
	x: clockCenter.x,
	y: 0
};
var cx = baseClockPoint.x - clockCenter.x;
var cy = baseClockPoint.y - clockCenter.y;
var rad2deg = (rad) => rad * (180 / Math.PI);
var getAngleValue = (step, offsetX, offsetY) => {
	const x = offsetX - clockCenter.x;
	const y = offsetY - clockCenter.y;
	let deg = rad2deg(Math.atan2(cx, cy) - Math.atan2(x, y));
	deg = Math.round(deg / step) * step;
	deg %= 360;
	const value = Math.floor(deg / step) || 0;
	const delta = x ** 2 + y ** 2;
	return {
		value,
		distance: Math.sqrt(delta)
	};
};
var getMinutes = (offsetX, offsetY, step = 1) => {
	let { value } = getAngleValue(step * 6, offsetX, offsetY);
	value = value * step % 60;
	return value;
};
var getHours = (offsetX, offsetY, ampm) => {
	const { value, distance } = getAngleValue(30, offsetX, offsetY);
	let hour = value || 12;
	if (!ampm) {
		if (distance < 220 / 2 - 36) {
			hour += 12;
			hour %= 24;
		}
	} else hour %= 12;
	return hour;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/clockPointerClasses.js
function getClockPointerUtilityClass(slot) {
	return generateUtilityClass("MuiClockPointer", slot);
}
var clockPointerClasses = generateUtilityClasses("MuiClockPointer", ["root", "thumb"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/ClockPointer.js
var _excluded$48 = [
	"className",
	"classes",
	"isBetweenTwoClockValues",
	"isInner",
	"type",
	"viewValue"
];
var useUtilityClasses$67 = (classes) => {
	return composeClasses({
		root: ["root"],
		thumb: ["thumb"]
	}, getClockPointerUtilityClass, classes);
};
var ClockPointerRoot = styled("div", {
	name: "MuiClockPointer",
	slot: "Root"
})(({ theme }) => ({
	width: 2,
	backgroundColor: (theme.vars || theme).palette.primary.main,
	position: "absolute",
	left: "calc(50% - 1px)",
	bottom: "50%",
	transformOrigin: "center bottom 0px",
	variants: [{
		props: { isClockPointerAnimated: true },
		style: { transition: theme.transitions.create(["transform", "height"]) }
	}]
}));
var ClockPointerThumb = styled("div", {
	name: "MuiClockPointer",
	slot: "Thumb"
})(({ theme }) => ({
	width: 4,
	height: 4,
	backgroundColor: (theme.vars || theme).palette.primary.contrastText,
	borderRadius: "50%",
	position: "absolute",
	top: -21,
	left: `calc(50% - ${36 / 2}px)`,
	border: `${32 / 2}px solid ${(theme.vars || theme).palette.primary.main}`,
	boxSizing: "content-box",
	variants: [{
		props: { isClockPointerBetweenTwoValues: false },
		style: { backgroundColor: (theme.vars || theme).palette.primary.main }
	}]
}));
/**
* @ignore - internal component.
*/
function ClockPointer(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiClockPointer"
	});
	const { className, classes: classesProp, isBetweenTwoClockValues, isInner, type, viewValue } = props, other = _objectWithoutPropertiesLoose(props, _excluded$48);
	const previousType = import_react.useRef(type);
	import_react.useEffect(() => {
		previousType.current = type;
	}, [type]);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockPointerAnimated: previousType.current !== type,
		isClockPointerBetweenTwoValues: isBetweenTwoClockValues
	});
	const classes = useUtilityClasses$67(classesProp);
	const getAngleStyle = () => {
		let angle = 360 / (type === "hours" ? 12 : 60) * viewValue;
		if (type === "hours" && viewValue > 12) angle -= 360;
		return {
			height: Math.round((isInner ? .26 : .4) * 220),
			transform: `rotateZ(${angle}deg)`
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockPointerRoot, _extends({
		style: getAngleStyle(),
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockPointerThumb, {
		ownerState,
		className: classes.thumb
	}) }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/clockClasses.js
function getClockUtilityClass(slot) {
	return generateUtilityClass("MuiClock", slot);
}
var clockClasses = generateUtilityClasses("MuiClock", [
	"root",
	"clock",
	"wrapper",
	"squareMask",
	"pin",
	"amButton",
	"pmButton",
	"meridiemText",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/Clock.js
var useUtilityClasses$66 = (classes, ownerState) => {
	return composeClasses({
		root: ["root"],
		clock: ["clock"],
		wrapper: ["wrapper"],
		squareMask: ["squareMask"],
		pin: ["pin"],
		amButton: ["amButton", ownerState.clockMeridiemMode === "am" && "selected"],
		pmButton: ["pmButton", ownerState.clockMeridiemMode === "pm" && "selected"],
		meridiemText: ["meridiemText"]
	}, getClockUtilityClass, classes);
};
var ClockRoot = styled("div", {
	name: "MuiClock",
	slot: "Root"
})(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: theme.spacing(2)
}));
var ClockClock = styled("div", {
	name: "MuiClock",
	slot: "Clock"
})({
	backgroundColor: "rgba(0,0,0,.07)",
	borderRadius: "50%",
	height: 220,
	width: 220,
	flexShrink: 0,
	position: "relative",
	pointerEvents: "none"
});
var ClockWrapper = styled("div", {
	name: "MuiClock",
	slot: "Wrapper"
})({ "&:focus": { outline: "none" } });
var ClockSquareMask = styled("div", {
	name: "MuiClock",
	slot: "SquareMask"
})({
	width: "100%",
	height: "100%",
	position: "absolute",
	pointerEvents: "auto",
	outline: 0,
	touchAction: "none",
	userSelect: "none",
	variants: [{
		props: { isClockDisabled: false },
		style: {
			"@media (pointer: fine)": {
				cursor: "pointer",
				borderRadius: "50%"
			},
			"&:active": { cursor: "move" }
		}
	}]
});
var ClockPin = styled("div", {
	name: "MuiClock",
	slot: "Pin"
})(({ theme }) => ({
	width: 6,
	height: 6,
	borderRadius: "50%",
	backgroundColor: (theme.vars || theme).palette.primary.main,
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)"
}));
var meridiemButtonCommonStyles = (theme, clockMeridiemMode) => ({
	zIndex: 1,
	bottom: 8,
	paddingLeft: 4,
	paddingRight: 4,
	width: 36,
	variants: [{
		props: { clockMeridiemMode },
		style: {
			backgroundColor: (theme.vars || theme).palette.primary.main,
			color: (theme.vars || theme).palette.primary.contrastText,
			"&:hover": { backgroundColor: (theme.vars || theme).palette.primary.light }
		}
	}]
});
var ClockAmButton = styled(IconButton, {
	name: "MuiClock",
	slot: "AmButton"
})(({ theme }) => _extends({}, meridiemButtonCommonStyles(theme, "am"), {
	position: "absolute",
	left: 8
}));
var ClockPmButton = styled(IconButton, {
	name: "MuiClock",
	slot: "PmButton"
})(({ theme }) => _extends({}, meridiemButtonCommonStyles(theme, "pm"), {
	position: "absolute",
	right: 8
}));
var ClockMeridiemText = styled(Typography, {
	name: "MuiClock",
	slot: "MeridiemText"
})({
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
});
/**
* @ignore - internal component.
*/
function Clock(inProps) {
	const { ampm, ampmInClock, autoFocus, children, value, handleMeridiemChange, isTimeDisabled, meridiemMode, minutesStep = 1, onChange, selectedId, type, viewValue, viewRange: [minViewValue, maxViewValue], disabled = false, readOnly, className, classes: classesProp } = useThemeProps({
		props: inProps,
		name: "MuiClock"
	});
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockDisabled: disabled,
		clockMeridiemMode: meridiemMode
	});
	const isMoving = import_react.useRef(false);
	const classes = useUtilityClasses$66(classesProp, ownerState);
	const isSelectedTimeDisabled = isTimeDisabled(viewValue, type);
	const isPointerInner = !ampm && type === "hours" && (viewValue < 1 || viewValue > 12);
	const handleValueChange = (newValue, isFinish) => {
		if (disabled || readOnly) return;
		if (isTimeDisabled(newValue, type)) return;
		onChange(newValue, isFinish);
	};
	const setTime = (event, isFinish) => {
		let { offsetX, offsetY } = event;
		if (offsetX === void 0) {
			const rect = event.target.getBoundingClientRect();
			offsetX = event.changedTouches[0].clientX - rect.left;
			offsetY = event.changedTouches[0].clientY - rect.top;
		}
		handleValueChange(type === "seconds" || type === "minutes" ? getMinutes(offsetX, offsetY, minutesStep) : getHours(offsetX, offsetY, Boolean(ampm)), isFinish);
	};
	const handleTouchSelection = (event) => {
		isMoving.current = true;
		setTime(event, "shallow");
	};
	const handleTouchEnd = (event) => {
		if (isMoving.current) {
			setTime(event, "finish");
			isMoving.current = false;
		}
		event.preventDefault();
	};
	const handleMouseMove = (event) => {
		if (event.buttons > 0) setTime(event.nativeEvent, "shallow");
	};
	const handleMouseUp = (event) => {
		if (isMoving.current) isMoving.current = false;
		setTime(event.nativeEvent, "finish");
	};
	const isPointerBetweenTwoClockValues = type === "hours" ? false : viewValue % 5 !== 0;
	const keyboardControlStep = type === "minutes" ? minutesStep : 1;
	const listboxRef = import_react.useRef(null);
	useEnhancedEffect(() => {
		if (autoFocus) listboxRef.current.focus();
	}, [autoFocus]);
	const clampValue = (newValue) => Math.max(minViewValue, Math.min(maxViewValue, newValue));
	const circleValue = (newValue) => (newValue + (maxViewValue + 1)) % (maxViewValue + 1);
	const handleKeyDown = (event) => {
		if (isMoving.current) return;
		switch (event.key) {
			case "Home":
				handleValueChange(minViewValue, "partial");
				event.preventDefault();
				break;
			case "End":
				handleValueChange(maxViewValue, "partial");
				event.preventDefault();
				break;
			case "ArrowUp":
				handleValueChange(circleValue(viewValue + keyboardControlStep), "partial");
				event.preventDefault();
				break;
			case "ArrowDown":
				handleValueChange(circleValue(viewValue - keyboardControlStep), "partial");
				event.preventDefault();
				break;
			case "PageUp":
				handleValueChange(clampValue(viewValue + 5), "partial");
				event.preventDefault();
				break;
			case "PageDown":
				handleValueChange(clampValue(viewValue - 5), "partial");
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleValueChange(viewValue, "finish");
				event.preventDefault();
				break;
			default:
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClockRoot, {
		className: clsx(classes.root, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClockClock, {
			className: classes.clock,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockSquareMask, {
					onTouchMove: handleTouchSelection,
					onTouchStart: handleTouchSelection,
					onTouchEnd: handleTouchEnd,
					onMouseUp: handleMouseUp,
					onMouseMove: handleMouseMove,
					ownerState,
					className: classes.squareMask
				}),
				!isSelectedTimeDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockPin, { className: classes.pin }), value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockPointer, {
					type,
					viewValue,
					isInner: isPointerInner,
					isBetweenTwoClockValues: isPointerBetweenTwoClockValues
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockWrapper, {
					"aria-activedescendant": selectedId,
					"aria-label": translations.clockLabelText(type, value == null ? null : adapter.format(value, ampm ? "fullTime12h" : "fullTime24h")),
					ref: listboxRef,
					role: "listbox",
					onKeyDown: handleKeyDown,
					tabIndex: 0,
					className: classes.wrapper,
					children
				})
			]
		}), ampm && ampmInClock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockAmButton, {
			onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
			disabled: disabled || meridiemMode === null,
			ownerState,
			className: classes.amButton,
			title: formatMeridiem(adapter, "am"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockMeridiemText, {
				variant: "caption",
				className: classes.meridiemText,
				children: formatMeridiem(adapter, "am")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockPmButton, {
			disabled: disabled || meridiemMode === null,
			onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
			ownerState,
			className: classes.pmButton,
			title: formatMeridiem(adapter, "pm"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockMeridiemText, {
				variant: "caption",
				className: classes.meridiemText,
				children: formatMeridiem(adapter, "pm")
			})
		})] })]
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/clockNumberClasses.js
function getClockNumberUtilityClass(slot) {
	return generateUtilityClass("MuiClockNumber", slot);
}
var clockNumberClasses = generateUtilityClasses("MuiClockNumber", [
	"root",
	"selected",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/ClockNumber.js
var _excluded$47 = [
	"className",
	"classes",
	"disabled",
	"index",
	"inner",
	"label",
	"selected"
];
var useUtilityClasses$65 = (classes, ownerState) => {
	return composeClasses({ root: [
		"root",
		ownerState.isClockNumberSelected && "selected",
		ownerState.isClockNumberDisabled && "disabled"
	] }, getClockNumberUtilityClass, classes);
};
var ClockNumberRoot = styled("span", {
	name: "MuiClockNumber",
	slot: "Root",
	overridesResolver: (_, styles) => [
		styles.root,
		{ [`&.${clockNumberClasses.disabled}`]: styles.disabled },
		{ [`&.${clockNumberClasses.selected}`]: styles.selected }
	]
})(({ theme }) => ({
	height: 36,
	width: 36,
	position: "absolute",
	left: `calc((100% - 36px) / 2)`,
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	borderRadius: "50%",
	color: (theme.vars || theme).palette.text.primary,
	fontFamily: theme.typography.fontFamily,
	"&:focused": { backgroundColor: (theme.vars || theme).palette.background.paper },
	[`&.${clockNumberClasses.selected}`]: { color: (theme.vars || theme).palette.primary.contrastText },
	[`&.${clockNumberClasses.disabled}`]: {
		pointerEvents: "none",
		color: (theme.vars || theme).palette.text.disabled
	},
	variants: [{
		props: { isClockNumberInInnerRing: true },
		style: _extends({}, theme.typography.body2, { color: (theme.vars || theme).palette.text.secondary })
	}]
}));
/**
* @ignore - internal component.
*/
function ClockNumber(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiClockNumber"
	});
	const { className, classes: classesProp, disabled, index, inner, label, selected } = props, other = _objectWithoutPropertiesLoose(props, _excluded$47);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isClockNumberInInnerRing: inner,
		isClockNumberSelected: selected,
		isClockNumberDisabled: disabled
	});
	const classes = useUtilityClasses$65(classesProp, ownerState);
	const angle = index % 12 / 12 * Math.PI * 2 - Math.PI / 2;
	const length = 182 / 2 * (inner ? .65 : 1);
	const x = Math.round(Math.cos(angle) * length);
	const y = Math.round(Math.sin(angle) * length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockNumberRoot, _extends({
		className: clsx(classes.root, className),
		"aria-disabled": disabled ? true : void 0,
		"aria-selected": selected ? true : void 0,
		role: "option",
		style: { transform: `translate(${x}px, ${y + 184 / 2}px` },
		ownerState
	}, other, { children: label }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/ClockNumbers.js
/**
* @ignore - internal component.
*/
var getHourNumbers = ({ ampm, value, getClockNumberText, isDisabled, selectedId, adapter }) => {
	const currentHours = value ? adapter.getHours(value) : null;
	const hourNumbers = [];
	const startHour = ampm ? 1 : 0;
	const endHour = ampm ? 12 : 23;
	const isSelected = (hour) => {
		if (currentHours === null) return false;
		if (ampm) {
			if (hour === 12) return currentHours === 12 || currentHours === 0;
			return currentHours === hour || currentHours - 12 === hour;
		}
		return currentHours === hour;
	};
	for (let hour = startHour; hour <= endHour; hour += 1) {
		let label = hour.toString();
		if (hour === 0) label = "00";
		const inner = !ampm && (hour === 0 || hour > 12);
		label = adapter.formatNumber(label);
		const selected = isSelected(hour);
		hourNumbers.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockNumber, {
			id: selected ? selectedId : void 0,
			index: hour,
			inner,
			selected,
			disabled: isDisabled(hour),
			label,
			"aria-label": getClockNumberText(label)
		}, hour));
	}
	return hourNumbers;
};
var getMinutesNumbers = ({ adapter, value, isDisabled, getClockNumberText, selectedId }) => {
	const f = adapter.formatNumber;
	return [
		[5, f("05")],
		[10, f("10")],
		[15, f("15")],
		[20, f("20")],
		[25, f("25")],
		[30, f("30")],
		[35, f("35")],
		[40, f("40")],
		[45, f("45")],
		[50, f("50")],
		[55, f("55")],
		[0, f("00")]
	].map(([numberValue, label], index) => {
		const selected = numberValue === value;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockNumber, {
			label,
			id: selected ? selectedId : void 0,
			index: index + 1,
			inner: false,
			disabled: isDisabled(numberValue),
			selected,
			"aria-label": getClockNumberText(label)
		}, numberValue);
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useControlledValue.js
/**
* Hooks controlling the value while making sure that:
* - The value returned by `onChange` always have the timezone of `props.value` or `props.defaultValue` if defined
* - The value rendered is always the one from `props.timezone` if defined
*/
var useControlledValue = ({ name, timezone: timezoneProp, value: valueProp, defaultValue, referenceDate, onChange: onChangeProp, valueManager }) => {
	const adapter = usePickerAdapter();
	const [valueWithInputTimezone, setValue] = useControlled({
		name,
		state: "value",
		controlled: valueProp,
		default: defaultValue ?? valueManager.emptyValue
	});
	const inputTimezone = import_react.useMemo(() => valueManager.getTimezone(adapter, valueWithInputTimezone), [
		adapter,
		valueManager,
		valueWithInputTimezone
	]);
	const setInputTimezone = useEventCallback((newValue) => {
		if (inputTimezone == null) return newValue;
		return valueManager.setTimezone(adapter, inputTimezone, newValue);
	});
	const timezoneToRender = import_react.useMemo(() => {
		if (timezoneProp) return timezoneProp;
		if (inputTimezone) return inputTimezone;
		if (referenceDate) return adapter.getTimezone(Array.isArray(referenceDate) ? referenceDate[0] : referenceDate);
		return "default";
	}, [
		timezoneProp,
		inputTimezone,
		referenceDate,
		adapter
	]);
	return {
		value: import_react.useMemo(() => valueManager.setTimezone(adapter, timezoneToRender, valueWithInputTimezone), [
			valueManager,
			adapter,
			timezoneToRender,
			valueWithInputTimezone
		]),
		handleValueChange: useEventCallback((newValue, ...otherParams) => {
			const newValueWithInputTimezone = setInputTimezone(newValue);
			setValue(newValueWithInputTimezone);
			onChangeProp?.(newValueWithInputTimezone, ...otherParams);
		}),
		timezone: timezoneToRender
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/getDefaultReferenceDate.js
var SECTION_TYPE_GRANULARITY = {
	year: 1,
	month: 2,
	day: 3,
	hours: 4,
	minutes: 5,
	seconds: 6,
	milliseconds: 7
};
var getSectionTypeGranularity = (sections) => Math.max(...sections.map((section) => SECTION_TYPE_GRANULARITY[section.type] ?? 1));
var roundDate = (adapter, granularity, date) => {
	if (granularity === SECTION_TYPE_GRANULARITY.year) return adapter.startOfYear(date);
	if (granularity === SECTION_TYPE_GRANULARITY.month) return adapter.startOfMonth(date);
	if (granularity === SECTION_TYPE_GRANULARITY.day) return adapter.startOfDay(date);
	let roundedDate = date;
	if (granularity < SECTION_TYPE_GRANULARITY.minutes) roundedDate = adapter.setMinutes(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.seconds) roundedDate = adapter.setSeconds(roundedDate, 0);
	if (granularity < SECTION_TYPE_GRANULARITY.milliseconds) roundedDate = adapter.setMilliseconds(roundedDate, 0);
	return roundedDate;
};
var getDefaultReferenceDate = ({ props, adapter, granularity, timezone, getTodayDate: inGetTodayDate }) => {
	let referenceDate = inGetTodayDate ? inGetTodayDate() : roundDate(adapter, granularity, getTodayDate(adapter, timezone));
	if (props.minDate != null && adapter.isAfterDay(props.minDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.minDate);
	if (props.maxDate != null && adapter.isBeforeDay(props.maxDate, referenceDate)) referenceDate = roundDate(adapter, granularity, props.maxDate);
	const isAfter = createIsAfterIgnoreDatePart(props.disableIgnoringDatePartForTimeValidation ?? false, adapter);
	if (props.minTime != null && isAfter(props.minTime, referenceDate)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.minTime : mergeDateAndTime(adapter, referenceDate, props.minTime));
	if (props.maxTime != null && isAfter(referenceDate, props.maxTime)) referenceDate = roundDate(adapter, granularity, props.disableIgnoringDatePartForTimeValidation ? props.maxTime : mergeDateAndTime(adapter, referenceDate, props.maxTime));
	return referenceDate;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/valueManagers.js
var _excluded$46 = ["value", "referenceDate"];
var singleItemValueManager = {
	emptyValue: null,
	getTodayValue: getTodayDate,
	getInitialReferenceValue: (_ref) => {
		let { value, referenceDate } = _ref, params = _objectWithoutPropertiesLoose(_ref, _excluded$46);
		if (params.adapter.isValid(value)) return value;
		if (referenceDate != null) return referenceDate;
		return getDefaultReferenceDate(params);
	},
	cleanValue: replaceInvalidDateByNull,
	areValuesEqual: areDatesEqual,
	isSameError: (a, b) => a === b,
	hasError: (error) => error != null,
	defaultErrorState: null,
	getTimezone: (adapter, value) => adapter.isValid(value) ? adapter.getTimezone(value) : null,
	setTimezone: (adapter, timezone, value) => value == null ? null : adapter.setTimezone(value, timezone)
};
var singleItemFieldValueManager = {
	updateReferenceValue: (adapter, value, prevReferenceValue) => adapter.isValid(value) ? value : prevReferenceValue,
	getSectionsFromValue: (date, getSectionsFromDate) => getSectionsFromDate(date),
	getV7HiddenInputValueFromSections: createDateStrForV7HiddenInputFromSections,
	getV6InputValueFromSections: createDateStrForV6InputFromSections,
	parseValueStr: (valueStr, referenceValue, parseDate) => parseDate(valueStr.trim(), referenceValue),
	getDateFromSection: (value) => value,
	getDateSectionsFromValue: (sections) => sections,
	updateDateInValue: (value, activeSection, activeDate) => activeDate,
	clearDateSections: (sections) => sections.map((section) => _extends({}, section, { value: "" }))
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useClockReferenceDate.js
var useClockReferenceDate = ({ value, referenceDate: referenceDateProp, adapter, props, timezone }) => {
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.day,
		timezone,
		getTodayDate: () => getTodayDate(adapter, timezone, "date")
	}), [referenceDateProp, timezone]);
	return value ?? referenceDate;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeClock/TimeClock.js
var _excluded$45 = [
	"ampm",
	"ampmInClock",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"showViewSwitcher",
	"onChange",
	"view",
	"views",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"timezone"
];
var useUtilityClasses$64 = (classes) => {
	return composeClasses({
		root: ["root"],
		arrowSwitcher: ["arrowSwitcher"]
	}, getTimeClockUtilityClass, classes);
};
var TimeClockRoot = styled(PickerViewRoot, {
	name: "MuiTimeClock",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	position: "relative"
});
var TimeClockArrowSwitcher = styled(PickersArrowSwitcher, {
	name: "MuiTimeClock",
	slot: "ArrowSwitcher"
})({
	position: "absolute",
	right: 12,
	top: 15
});
var TIME_CLOCK_DEFAULT_VIEWS = ["hours", "minutes"];
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [TimeClock](https://mui.com/x/react-date-pickers/time-clock/)
*
* API:
*
* - [TimeClock API](https://mui.com/x/api/date-pickers/time-clock/)
*/
var TimeClock = /* @__PURE__ */ import_react.forwardRef(function TimeClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimeClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), ampmInClock = false, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, showViewSwitcher, onChange, view: inView, views = TIME_CLOCK_DEFAULT_VIEWS, openTo, onViewChange, focusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$45);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "TimeClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const selectedId = useId();
	const { ownerState } = usePickerPrivateContext();
	const { view, setView, previousView, nextView, setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: handleValueChange,
		focusedView,
		onFocusedViewChange
	});
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(valueOrReferenceDate, ampm, setValueAndGoToNextView);
	const isTimeDisabled = import_react.useCallback((rawValue, viewType) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const shouldCheckPastEnd = viewType === "hours" || viewType === "minutes" && views.includes("seconds");
		const containsValidTime = ({ start, end }) => {
			if (minTime && isAfter(minTime, end)) return false;
			if (maxTime && isAfter(start, maxTime)) return false;
			if (disableFuture && isAfter(start, now)) return false;
			if (disablePast && isAfter(now, shouldCheckPastEnd ? end : start)) return false;
			return true;
		};
		const isValidValue = (timeValue, step = 1) => {
			if (timeValue % step !== 0) return false;
			if (shouldDisableTime) switch (viewType) {
				case "hours": return !shouldDisableTime(adapter.setHours(valueOrReferenceDate, timeValue), "hours");
				case "minutes": return !shouldDisableTime(adapter.setMinutes(valueOrReferenceDate, timeValue), "minutes");
				case "seconds": return !shouldDisableTime(adapter.setSeconds(valueOrReferenceDate, timeValue), "seconds");
				default: return false;
			}
			return true;
		};
		switch (viewType) {
			case "hours": {
				const valueWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
				const dateWithNewHours = adapter.setHours(valueOrReferenceDate, valueWithMeridiem);
				if (adapter.getHours(dateWithNewHours) !== valueWithMeridiem) return true;
				return !containsValidTime({
					start: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 0), 0),
					end: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 59), 59)
				}) || !isValidValue(valueWithMeridiem);
			}
			case "minutes": {
				const dateWithNewMinutes = adapter.setMinutes(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: adapter.setSeconds(dateWithNewMinutes, 0),
					end: adapter.setSeconds(dateWithNewMinutes, 59)
				}) || !isValidValue(rawValue, minutesStep);
			}
			case "seconds": {
				const dateWithNewSeconds = adapter.setSeconds(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: dateWithNewSeconds,
					end: dateWithNewSeconds
				}) || !isValidValue(rawValue);
			}
			default: throw new Error("not supported");
		}
	}, [
		ampm,
		valueOrReferenceDate,
		disableIgnoringDatePartForTimeValidation,
		maxTime,
		meridiemMode,
		minTime,
		minutesStep,
		shouldDisableTime,
		adapter,
		disableFuture,
		disablePast,
		now,
		views
	]);
	const viewProps = import_react.useMemo(() => {
		switch (view) {
			case "hours": {
				const handleHoursChange = (hourValue, isFinish) => {
					const valueWithMeridiem = convertValueToMeridiem(hourValue, meridiemMode, ampm);
					setValueAndGoToNextView(adapter.setHours(valueOrReferenceDate, valueWithMeridiem), isFinish, "hours");
				};
				const viewValue = adapter.getHours(valueOrReferenceDate);
				let viewRange;
				if (ampm) if (viewValue > 12) viewRange = [12, 23];
				else viewRange = [0, 11];
				else viewRange = [0, 23];
				return {
					onChange: handleHoursChange,
					viewValue,
					children: getHourNumbers({
						value,
						adapter,
						ampm,
						onChange: handleHoursChange,
						getClockNumberText: translations.hoursClockNumberText,
						isDisabled: (hourValue) => disabled || isTimeDisabled(hourValue, "hours"),
						selectedId
					}),
					viewRange
				};
			}
			case "minutes": {
				const minutesValue = adapter.getMinutes(valueOrReferenceDate);
				const handleMinutesChange = (minuteValue, isFinish) => {
					setValueAndGoToNextView(adapter.setMinutes(valueOrReferenceDate, minuteValue), isFinish, "minutes");
				};
				return {
					viewValue: minutesValue,
					onChange: handleMinutesChange,
					children: getMinutesNumbers({
						adapter,
						value: minutesValue,
						onChange: handleMinutesChange,
						getClockNumberText: translations.minutesClockNumberText,
						isDisabled: (minuteValue) => disabled || isTimeDisabled(minuteValue, "minutes"),
						selectedId
					}),
					viewRange: [0, 59]
				};
			}
			case "seconds": {
				const secondsValue = adapter.getSeconds(valueOrReferenceDate);
				const handleSecondsChange = (secondValue, isFinish) => {
					setValueAndGoToNextView(adapter.setSeconds(valueOrReferenceDate, secondValue), isFinish, "seconds");
				};
				return {
					viewValue: secondsValue,
					onChange: handleSecondsChange,
					children: getMinutesNumbers({
						adapter,
						value: secondsValue,
						onChange: handleSecondsChange,
						getClockNumberText: translations.secondsClockNumberText,
						isDisabled: (secondValue) => disabled || isTimeDisabled(secondValue, "seconds"),
						selectedId
					}),
					viewRange: [0, 59]
				};
			}
			default: throw new Error("You must provide the type for ClockView");
		}
	}, [
		view,
		adapter,
		value,
		ampm,
		translations.hoursClockNumberText,
		translations.minutesClockNumberText,
		translations.secondsClockNumberText,
		meridiemMode,
		setValueAndGoToNextView,
		valueOrReferenceDate,
		isTimeDisabled,
		selectedId,
		disabled
	]);
	const classes = useUtilityClasses$64(classesProp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TimeClockRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, _extends({
		autoFocus: autoFocus ?? !!focusedView,
		ampmInClock: ampmInClock && views.includes("hours"),
		value,
		type: view,
		ampm,
		minutesStep,
		isTimeDisabled,
		meridiemMode,
		handleMeridiemChange,
		selectedId,
		disabled,
		readOnly
	}, viewProps)), showViewSwitcher && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeClockArrowSwitcher, {
		className: classes.arrowSwitcher,
		slots,
		slotProps,
		onGoToPrevious: () => setView(previousView),
		isPreviousDisabled: !previousView,
		previousLabel: translations.openPreviousView,
		onGoToNext: () => setView(nextView),
		isNextDisabled: !nextView,
		nextLabel: translations.openNextView,
		ownerState
	})] }));
});
TimeClock.displayName = "TimeClock";
TimeClock.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	focusedView: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableTime: import_prop_types.default.func,
	showViewSwitcher: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/material/esm/List/ListContext.js
/**
* @ignore - internal component.
*/
var ListContext = /* @__PURE__ */ import_react.createContext({});
ListContext.displayName = "ListContext";
//#endregion
//#region node_modules/@mui/material/esm/Divider/dividerClasses.js
function getDividerUtilityClass(slot) {
	return generateUtilityClass("MuiDivider", slot);
}
var dividerClasses = generateUtilityClasses("MuiDivider", [
	"root",
	"absolute",
	"fullWidth",
	"inset",
	"middle",
	"flexItem",
	"light",
	"vertical",
	"withChildren",
	"withChildrenVertical",
	"textAlignRight",
	"textAlignLeft",
	"wrapper",
	"wrapperVertical"
]);
//#endregion
//#region node_modules/@mui/material/esm/Divider/Divider.js
var useUtilityClasses$63 = (ownerState) => {
	const { absolute, children, classes, flexItem, light, orientation, textAlign, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			absolute && "absolute",
			variant,
			light && "light",
			orientation === "vertical" && "vertical",
			flexItem && "flexItem",
			children && "withChildren",
			children && orientation === "vertical" && "withChildrenVertical",
			textAlign === "right" && orientation !== "vertical" && "textAlignRight",
			textAlign === "left" && orientation !== "vertical" && "textAlignLeft"
		],
		wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
	}, getDividerUtilityClass, classes);
};
var DividerRoot = styled("div", {
	name: "MuiDivider",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.absolute && styles.absolute,
			styles[ownerState.variant],
			ownerState.light && styles.light,
			ownerState.orientation === "vertical" && styles.vertical,
			ownerState.flexItem && styles.flexItem,
			ownerState.children && styles.withChildren,
			ownerState.children && ownerState.orientation === "vertical" && styles.withChildrenVertical,
			ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles.textAlignRight,
			ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles.textAlignLeft
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 0,
	flexShrink: 0,
	borderWidth: 0,
	borderStyle: "solid",
	borderColor: (theme.vars || theme).palette.divider,
	borderBottomWidth: "thin",
	variants: [
		{
			props: { absolute: true },
			style: {
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%"
			}
		},
		{
			props: { light: true },
			style: { borderColor: theme.alpha((theme.vars || theme).palette.divider, .08) }
		},
		{
			props: { variant: "inset" },
			style: { marginLeft: 72 }
		},
		{
			props: {
				variant: "middle",
				orientation: "horizontal"
			},
			style: {
				marginLeft: theme.spacing(2),
				marginRight: theme.spacing(2)
			}
		},
		{
			props: {
				variant: "middle",
				orientation: "vertical"
			},
			style: {
				marginTop: theme.spacing(1),
				marginBottom: theme.spacing(1)
			}
		},
		{
			props: { orientation: "vertical" },
			style: {
				height: "100%",
				borderBottomWidth: 0,
				borderRightWidth: "thin"
			}
		},
		{
			props: { flexItem: true },
			style: {
				alignSelf: "stretch",
				height: "auto"
			}
		},
		{
			props: ({ ownerState }) => !!ownerState.children,
			style: {
				display: "flex",
				textAlign: "center",
				border: 0,
				borderTopStyle: "solid",
				borderLeftStyle: "solid",
				"&::before, &::after": {
					content: "\"\"",
					alignSelf: "center"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.children && ownerState.orientation !== "vertical",
			style: { "&::before, &::after": {
				width: "100%",
				borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
				borderTopStyle: "inherit"
			} }
		},
		{
			props: ({ ownerState }) => ownerState.orientation === "vertical" && ownerState.children,
			style: {
				flexDirection: "column",
				"&::before, &::after": {
					height: "100%",
					borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
					borderLeftStyle: "inherit"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "right" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "90%" },
				"&::after": { width: "10%" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.textAlign === "left" && ownerState.orientation !== "vertical",
			style: {
				"&::before": { width: "10%" },
				"&::after": { width: "90%" }
			}
		}
	]
})));
var DividerWrapper = styled("span", {
	name: "MuiDivider",
	slot: "Wrapper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.wrapper, ownerState.orientation === "vertical" && styles.wrapperVertical];
	}
})(memoTheme(({ theme }) => ({
	display: "inline-block",
	paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
	paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
	whiteSpace: "nowrap",
	variants: [{
		props: { orientation: "vertical" },
		style: {
			paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
			paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
		}
	}]
})));
var Divider = /* @__PURE__ */ import_react.forwardRef(function Divider(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDivider"
	});
	const { absolute = false, children, className, orientation = "horizontal", component = children || orientation === "vertical" ? "div" : "hr", flexItem = false, light = false, role = component !== "hr" ? "separator" : void 0, textAlign = "center", variant = "fullWidth", ...other } = props;
	const ownerState = {
		...props,
		absolute,
		component,
		flexItem,
		light,
		orientation,
		role,
		textAlign,
		variant
	};
	const classes = useUtilityClasses$63(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DividerRoot, {
		as: component,
		className: clsx(classes.root, className),
		role,
		ref,
		ownerState,
		"aria-orientation": role === "separator" && (component !== "hr" || orientation === "vertical") ? orientation : void 0,
		...other,
		children: children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DividerWrapper, {
			className: classes.wrapper,
			ownerState,
			children
		}) : null
	});
});
/**
* The following flag is used to ensure that this component isn't tabbable i.e.
* does not get highlight/focus inside of MUI List.
*/
if (Divider) Divider.muiSkipListHighlight = true;
Divider.propTypes = {
	absolute: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	flexItem: import_prop_types.default.bool,
	light: import_prop_types.default.bool,
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	role: import_prop_types.default.string,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	textAlign: import_prop_types.default.oneOf([
		"center",
		"left",
		"right"
	]),
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"fullWidth",
		"inset",
		"middle"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/esm/ListItemIcon/listItemIconClasses.js
var listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
//#endregion
//#region node_modules/@mui/material/esm/ListItemText/listItemTextClasses.js
var listItemTextClasses = generateUtilityClasses("MuiListItemText", [
	"root",
	"multiline",
	"dense",
	"inset",
	"primary",
	"secondary"
]);
//#endregion
//#region node_modules/@mui/material/esm/utils/useSlot.js
/**
* An internal function to create a Material UI slot.
*
* This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
* while Base UI does not need to support leaf component customization.
*
* @param {string} name: name of the slot
* @param {object} parameters
* @returns {[Slot, slotProps]} The slot's React component and the slot's props
*
* Note: the returned slot's props
* - will never contain `component` prop.
* - might contain `as` prop.
*/
function useSlot(name, parameters) {
	const { className, elementType: initialElementType, ownerState, externalForwardedProps, internalForwardedProps, shouldForwardComponentProp = false, ...useSlotPropsParams } = parameters;
	const { component: rootComponent, slots = { [name]: void 0 }, slotProps = { [name]: void 0 }, ...other } = externalForwardedProps;
	const elementType = slots[name] || initialElementType;
	const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
	const { props: { component: slotComponent, ...mergedProps }, internalRef } = mergeSlotProps$2({
		className,
		...useSlotPropsParams,
		externalForwardedProps: name === "root" ? other : void 0,
		externalSlotProps: resolvedComponentsProps
	});
	const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
	const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
	return [elementType, appendOwnerState(elementType, {
		...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
		...name !== "root" && !slots[name] && internalForwardedProps,
		...mergedProps,
		...LeafComponent && !shouldForwardComponentProp && { as: LeafComponent },
		...LeafComponent && shouldForwardComponentProp && { component: LeafComponent },
		ref
	}, ownerState)];
}
//#endregion
//#region node_modules/@mui/material/esm/MenuItem/menuItemClasses.js
function getMenuItemUtilityClass(slot) {
	return generateUtilityClass("MuiMenuItem", slot);
}
var menuItemClasses = generateUtilityClasses("MuiMenuItem", [
	"root",
	"focusVisible",
	"dense",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/material/esm/MenuItem/MenuItem.js
var overridesResolver$3 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters
	];
};
var useUtilityClasses$62 = (ownerState) => {
	const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
	const composedClasses = composeClasses({ root: [
		"root",
		dense && "dense",
		disabled && "disabled",
		!disableGutters && "gutters",
		divider && "divider",
		selected && "selected"
	] }, getMenuItemUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var MenuItemRoot = styled(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiMenuItem",
	slot: "Root",
	overridesResolver: overridesResolver$3
})(memoTheme(({ theme }) => ({
	...theme.typography.body1,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	minHeight: 48,
	paddingTop: 6,
	paddingBottom: 6,
	boxSizing: "border-box",
	whiteSpace: "nowrap",
	"&:hover": {
		textDecoration: "none",
		backgroundColor: (theme.vars || theme).palette.action.hover,
		"@media (hover: none)": { backgroundColor: "transparent" }
	},
	[`&.${menuItemClasses.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) }
	},
	[`&.${menuItemClasses.selected}:hover`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
		"@media (hover: none)": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity) }
	},
	[`&.${menuItemClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
	[`&.${menuItemClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity },
	[`& + .${dividerClasses.root}`]: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	[`& + .${dividerClasses.inset}`]: { marginLeft: 52 },
	[`& .${listItemTextClasses.root}`]: {
		marginTop: 0,
		marginBottom: 0
	},
	[`& .${listItemTextClasses.inset}`]: { paddingLeft: 36 },
	[`& .${listItemIconClasses.root}`]: { minWidth: 36 },
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.dense,
			style: { [theme.breakpoints.up("sm")]: { minHeight: "auto" } }
		},
		{
			props: ({ ownerState }) => ownerState.dense,
			style: {
				minHeight: 32,
				paddingTop: 4,
				paddingBottom: 4,
				...theme.typography.body2,
				[`& .${listItemIconClasses.root} svg`]: { fontSize: "1.25rem" }
			}
		}
	]
})));
var MenuItem = /* @__PURE__ */ import_react.forwardRef(function MenuItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenuItem"
	});
	const { autoFocus = false, component = "li", dense = false, divider = false, disableGutters = false, focusVisibleClassName, role = "menuitem", tabIndex: tabIndexProp, className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		disableGutters
	}), [
		context.dense,
		dense,
		disableGutters
	]);
	const menuItemRef = import_react.useRef(null);
	useEnhancedEffect_default(() => {
		if (autoFocus) if (menuItemRef.current) menuItemRef.current.focus();
		else console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered.");
	}, [autoFocus]);
	const ownerState = {
		...props,
		dense: childContext.dense,
		divider,
		disableGutters
	};
	const classes = useUtilityClasses$62(props);
	const handleRef = useForkRef_default(menuItemRef, ref);
	let tabIndex;
	if (!props.disabled) tabIndex = tabIndexProp !== void 0 ? tabIndexProp : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItemRoot, {
			ref: handleRef,
			role,
			tabIndex,
			component,
			focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
			className: clsx(classes.root, className),
			...other,
			ownerState,
			classes
		})
	});
});
MenuItem.propTypes = {
	autoFocus: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	dense: import_prop_types.default.bool,
	disabled: import_prop_types.default.bool,
	disableGutters: import_prop_types.default.bool,
	divider: import_prop_types.default.bool,
	focusVisibleClassName: import_prop_types.default.string,
	role: import_prop_types.default.string,
	selected: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	tabIndex: import_prop_types.default.number
};
//#endregion
//#region node_modules/@mui/material/esm/List/listClasses.js
function getListUtilityClass(slot) {
	return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", [
	"root",
	"padding",
	"dense",
	"subheader"
]);
//#endregion
//#region node_modules/@mui/material/esm/List/List.js
var useUtilityClasses$61 = (ownerState) => {
	const { classes, disablePadding, dense, subheader } = ownerState;
	return composeClasses({ root: [
		"root",
		!disablePadding && "padding",
		dense && "dense",
		subheader && "subheader"
	] }, getListUtilityClass, classes);
};
var ListRoot = styled("ul", {
	name: "MuiList",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disablePadding && styles.padding,
			ownerState.dense && styles.dense,
			ownerState.subheader && styles.subheader
		];
	}
})({
	listStyle: "none",
	margin: 0,
	padding: 0,
	position: "relative",
	variants: [{
		props: ({ ownerState }) => !ownerState.disablePadding,
		style: {
			paddingTop: 8,
			paddingBottom: 8
		}
	}, {
		props: ({ ownerState }) => ownerState.subheader,
		style: { paddingTop: 0 }
	}]
});
var List$1 = /* @__PURE__ */ import_react.forwardRef(function List(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiList"
	});
	const { children, className, component = "ul", dense = false, disablePadding = false, subheader, ...other } = props;
	const context = import_react.useMemo(() => ({ dense }), [dense]);
	const ownerState = {
		...props,
		component,
		dense,
		disablePadding
	};
	const classes = useUtilityClasses$61(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: context,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListRoot, {
			as: component,
			className: clsx(classes.root, className),
			ref,
			ownerState,
			...other,
			children: [subheader, children]
		})
	});
});
List$1.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	dense: import_prop_types.default.bool,
	disablePadding: import_prop_types.default.bool,
	subheader: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/utils/esm/getActiveElement/getActiveElement.js
/**
* Gets the actual active element, traversing through shadow roots if necessary.
*
* When an element inside a shadow root has focus, `document.activeElement` returns
* the shadow host element. This function recursively traverses shadow roots to find
* the actual focused element.
*
* @param root - The document or shadow root to start the search from.
* @returns The actual focused element, or null if no element has focus.
*
* @example
* // In a shadow DOM context
* const activeElement = getActiveElement(document);
* // Returns the actual focused element inside the shadow root
*
* @example
* // Starting from a specific document
* const activeElement = getActiveElement(ownerDocument(element));
*/
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/getActiveElement.js
var getActiveElement_default = activeElement;
//#endregion
//#region node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function getScrollbarSize(win = window) {
	const documentWidth = win.document.documentElement.clientWidth;
	return win.innerWidth - documentWidth;
}
//#endregion
//#region node_modules/@mui/material/esm/utils/getScrollbarSize.js
var getScrollbarSize_default = getScrollbarSize;
//#endregion
//#region node_modules/@mui/material/esm/MenuList/MenuList.js
var import_react_is = require_react_is();
function nextItem$1(list, item, disableListWrap) {
	if (list === item) return list.firstChild;
	if (item && item.nextElementSibling) return item.nextElementSibling;
	return disableListWrap ? null : list.firstChild;
}
function previousItem$1(list, item, disableListWrap) {
	if (list === item) return disableListWrap ? list.firstChild : list.lastChild;
	if (item && item.previousElementSibling) return item.previousElementSibling;
	return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
	if (textCriteria === void 0) return true;
	let text = nextFocus.innerText;
	if (text === void 0) text = nextFocus.textContent;
	text = text.trim().toLowerCase();
	if (text.length === 0) return false;
	if (textCriteria.repeating) return text[0] === textCriteria.keys[0];
	return text.startsWith(textCriteria.keys.join(""));
}
function moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
	let wrappedOnce = false;
	let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
	while (nextFocus) {
		if (nextFocus === list.firstChild) {
			if (wrappedOnce) return false;
			wrappedOnce = true;
		}
		const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
		if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) nextFocus = traversalFunction(list, nextFocus, disableListWrap);
		else {
			nextFocus.focus();
			return true;
		}
	}
	return false;
}
/**
* A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
* It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
* use it separately you need to move focus into the component manually. Once
* the focus is placed inside the component it is fully keyboard accessible.
*/
var MenuList = /* @__PURE__ */ import_react.forwardRef(function MenuList(props, ref) {
	const { actions, autoFocus = false, autoFocusItem = false, children, className, disabledItemsFocusable = false, disableListWrap = false, onKeyDown, variant = "selectedMenu", ...other } = props;
	const listRef = import_react.useRef(null);
	const textCriteriaRef = import_react.useRef({
		keys: [],
		repeating: true,
		previousKeyMatched: true,
		lastTime: null
	});
	useEnhancedEffect_default(() => {
		if (autoFocus) listRef.current.focus();
	}, [autoFocus]);
	import_react.useImperativeHandle(actions, () => ({ adjustStyleForScrollbar: (containerElement, { direction }) => {
		const noExplicitWidth = !listRef.current.style.width;
		if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
			const scrollbarSize = `${getScrollbarSize_default(ownerWindow_default(containerElement))}px`;
			listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
			listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
		}
		return listRef.current;
	} }), []);
	const handleKeyDown = (event) => {
		const list = listRef.current;
		const key = event.key;
		if (event.ctrlKey || event.metaKey || event.altKey) {
			if (onKeyDown) onKeyDown(event);
			return;
		}
		/**
		* @type {Element} - will always be defined since we are in a keydown handler
		* attached to an element. A keydown event is either dispatched to the activeElement
		* or document.body or document.documentElement. Only the first case will
		* trigger this specific handler.
		*/
		const currentFocus = getActiveElement_default(ownerDocument_default(list));
		if (key === "ArrowDown") {
			event.preventDefault();
			moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem$1);
		} else if (key === "ArrowUp") {
			event.preventDefault();
			moveFocus$1(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem$1);
		} else if (key === "Home") {
			event.preventDefault();
			moveFocus$1(list, null, disableListWrap, disabledItemsFocusable, nextItem$1);
		} else if (key === "End") {
			event.preventDefault();
			moveFocus$1(list, null, disableListWrap, disabledItemsFocusable, previousItem$1);
		} else if (key.length === 1) {
			const criteria = textCriteriaRef.current;
			const lowerKey = key.toLowerCase();
			const currTime = performance.now();
			if (criteria.keys.length > 0) {
				if (currTime - criteria.lastTime > 500) {
					criteria.keys = [];
					criteria.repeating = true;
					criteria.previousKeyMatched = true;
				} else if (criteria.repeating && lowerKey !== criteria.keys[0]) criteria.repeating = false;
			}
			criteria.lastTime = currTime;
			criteria.keys.push(lowerKey);
			const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
			if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus$1(list, currentFocus, false, disabledItemsFocusable, nextItem$1, criteria))) event.preventDefault();
			else criteria.previousKeyMatched = false;
		}
		if (onKeyDown) onKeyDown(event);
	};
	const handleRef = useForkRef_default(listRef, ref);
	/**
	* the index of the item should receive focus
	* in a `variant="selectedMenu"` it's the first `selected` item
	* otherwise it's the very first item.
	*/
	let activeItemIndex = -1;
	import_react.Children.forEach(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) {
			if (activeItemIndex === index) {
				activeItemIndex += 1;
				if (activeItemIndex >= children.length) activeItemIndex = -1;
			}
			return;
		}
		if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
		if (activeItemIndex === index && (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)) {
			activeItemIndex += 1;
			if (activeItemIndex >= children.length) activeItemIndex = -1;
		}
	});
	const items = import_react.Children.map(children, (child, index) => {
		if (index === activeItemIndex) {
			const newChildProps = {};
			if (autoFocusItem) newChildProps.autoFocus = true;
			if (child.props.tabIndex === void 0 && variant === "selectedMenu") newChildProps.tabIndex = 0;
			return /* @__PURE__ */ import_react.cloneElement(child, newChildProps);
		}
		return child;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, {
		role: "menu",
		ref: handleRef,
		className,
		onKeyDown: handleKeyDown,
		tabIndex: autoFocus ? 0 : -1,
		...other,
		children: items
	});
});
MenuList.propTypes = {
	autoFocus: import_prop_types.default.bool,
	autoFocusItem: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	className: import_prop_types.default.string,
	disabledItemsFocusable: import_prop_types.default.bool,
	disableListWrap: import_prop_types.default.bool,
	onKeyDown: import_prop_types.default.func,
	variant: import_prop_types.default.oneOf(["menu", "selectedMenu"])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DigitalClock/digitalClockClasses.js
function getDigitalClockUtilityClass(slot) {
	return generateUtilityClass("MuiDigitalClock", slot);
}
var digitalClockClasses = generateUtilityClasses("MuiDigitalClock", [
	"root",
	"list",
	"item"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/utils.js
function arrayIncludes(array, itemOrItems) {
	if (Array.isArray(itemOrItems)) return itemOrItems.every((item) => array.indexOf(item) !== -1);
	return array.indexOf(itemOrItems) !== -1;
}
var executeInTheNextEventLoopTick = (fn) => {
	setTimeout(fn, 0);
};
var getActiveElementInternal = (root = document) => {
	const activeEl = root.activeElement;
	if (!activeEl) return null;
	if (activeEl.shadowRoot) return getActiveElementInternal(activeEl.shadowRoot);
	return activeEl;
};
/**
* Gets the currently active element within a given node's document.
* This function traverses shadow DOM if necessary.
* @param node - The node from which to get the active element.
* @returns The currently active element, or null if none is found.
*/
var getActiveElement = (node) => {
	return getActiveElementInternal(ownerDocument(node));
};
/**
* Gets the index of the focused list item in a given ul list element.
*
* @param {HTMLUListElement} listElement - The list element to search within.
* @returns {number} The index of the focused list item, or -1 if none is focused.
*/
var getFocusedListItemIndex = (listElement) => {
	return Array.from(listElement.children).indexOf(getActiveElement(listElement));
};
var DEFAULT_DESKTOP_MODE_MEDIA_QUERY = "@media (pointer: fine)";
function mergeSx(...sxProps) {
	return sxProps.reduce((acc, sxProp) => {
		if (Array.isArray(sxProp)) acc.push(...sxProp);
		else if (sxProp != null) acc.push(sxProp);
		return acc;
	}, []);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DigitalClock/DigitalClock.js
var _excluded$44 = [
	"ampm",
	"timeStep",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"onChange",
	"view",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"views",
	"skipDisabled",
	"timezone"
];
var useUtilityClasses$60 = (classes) => {
	return composeClasses({
		root: ["root"],
		list: ["list"],
		item: ["item"]
	}, getDigitalClockUtilityClass, classes);
};
var DigitalClockRoot = styled(PickerViewRoot, {
	name: "MuiDigitalClock",
	slot: "Root"
})({
	overflowY: "auto",
	width: "100%",
	scrollbarWidth: "thin",
	"@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "auto" },
	maxHeight: 232,
	variants: [{
		props: { hasDigitalClockAlreadyBeenRendered: true },
		style: { "@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "smooth" } }
	}]
});
var DigitalClockList = styled(MenuList, {
	name: "MuiDigitalClock",
	slot: "List"
})({ padding: 0 });
var DigitalClockItem = styled(MenuItem, {
	name: "MuiDigitalClock",
	slot: "Item",
	shouldForwardProp: (prop) => prop !== "itemValue" && prop !== "formattedValue"
})(({ theme }) => ({
	padding: "8px 16px",
	margin: "2px 4px",
	"&:first-of-type": { marginTop: 4 },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity) },
	"&.Mui-selected": {
		backgroundColor: (theme.vars || theme).palette.primary.main,
		color: (theme.vars || theme).palette.primary.contrastText,
		"&:focus-visible, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	},
	"&.Mui-focusVisible": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity) }
}));
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [DigitalClock](https://mui.com/x/react-date-pickers/digital-clock/)
*
* API:
*
* - [DigitalClock API](https://mui.com/x/api/date-pickers/digital-clock/)
*/
var DigitalClock = /* @__PURE__ */ import_react.forwardRef(function DigitalClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const containerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, containerRef);
	const listRef = import_react.useRef(null);
	const props = useThemeProps({
		props: inProps,
		name: "MuiDigitalClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), timeStep = 30, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, onChange, view: inView, openTo, onViewChange, focusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, views = ["hours"], skipDisabled = false, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$44);
	const { value, handleValueChange: handleRawValueChange, timezone } = useControlledValue({
		name: "DigitalClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { hasDigitalClockAlreadyBeenRendered: !!containerRef.current });
	const classes = useUtilityClasses$60(classesProp);
	const ClockItem = slots?.digitalClockItem ?? DigitalClockItem;
	const clockItemProps = useSlotProps({
		elementType: ClockItem,
		externalSlotProps: slotProps?.digitalClockItem,
		ownerState,
		className: classes.item
	});
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const { setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: useEventCallback((newValue) => handleRawValueChange(newValue, "finish", "hours")),
		focusedView,
		onFocusedViewChange
	});
	const handleItemSelect = useEventCallback((newValue) => {
		setValueAndGoToNextView(newValue, "finish");
	});
	useEnhancedEffect(() => {
		if (containerRef.current === null) return;
		const activeItem = containerRef.current.querySelector("[role=\"listbox\"] [role=\"option\"][tabindex=\"0\"], [role=\"listbox\"] [role=\"option\"][aria-selected=\"true\"]");
		if (!activeItem) return;
		const offsetTop = activeItem.offsetTop;
		if (autoFocus || !!focusedView) activeItem.focus();
		containerRef.current.scrollTop = offsetTop - 4;
	});
	const isTimeDisabled = import_react.useCallback((valueToCheck) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const containsValidTime = () => {
			if (minTime && isAfter(minTime, valueToCheck)) return false;
			if (maxTime && isAfter(valueToCheck, maxTime)) return false;
			if (disableFuture && isAfter(valueToCheck, now)) return false;
			if (disablePast && isAfter(now, valueToCheck)) return false;
			return true;
		};
		const isValidValue = () => {
			if (adapter.getMinutes(valueToCheck) % minutesStep !== 0) return false;
			if (shouldDisableTime) return !shouldDisableTime(valueToCheck, "hours");
			return true;
		};
		return !containsValidTime() || !isValidValue();
	}, [
		disableIgnoringDatePartForTimeValidation,
		adapter,
		minTime,
		maxTime,
		disableFuture,
		now,
		disablePast,
		minutesStep,
		shouldDisableTime
	]);
	const timeOptions = import_react.useMemo(() => {
		const result = [];
		let nextTimeStepOption = adapter.startOfDay(valueOrReferenceDate);
		while (adapter.isSameDay(valueOrReferenceDate, nextTimeStepOption)) {
			result.push(nextTimeStepOption);
			nextTimeStepOption = adapter.addMinutes(nextTimeStepOption, timeStep);
		}
		return result;
	}, [
		valueOrReferenceDate,
		timeStep,
		adapter
	]);
	const focusedOptionIndex = timeOptions.findIndex((option) => adapter.isEqual(option, valueOrReferenceDate));
	const handleKeyDown = (event) => {
		switch (event.key) {
			case "PageUp": {
				const newIndex = getFocusedListItemIndex(listRef.current) - 5;
				const childToFocus = listRef.current.children[Math.max(0, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			case "PageDown": {
				const newIndex = getFocusedListItemIndex(listRef.current) + 5;
				const children = listRef.current.children;
				const childToFocus = children[Math.min(children.length - 1, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			default:
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalClockRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalClockList, {
		ref: listRef,
		role: "listbox",
		"aria-label": translations.timePickerToolbarTitle,
		className: classes.list,
		onKeyDown: handleKeyDown,
		children: timeOptions.map((option, index) => {
			const optionDisabled = isTimeDisabled(option);
			if (skipDisabled && optionDisabled) return null;
			const isSelected = adapter.isEqual(option, value);
			const formattedValue = adapter.format(option, ampm ? "fullTime12h" : "fullTime24h");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockItem, _extends({
				onClick: () => !readOnly && handleItemSelect(option),
				selected: isSelected,
				disabled: disabled || optionDisabled,
				disableRipple: readOnly,
				role: "option",
				"aria-disabled": readOnly,
				"aria-selected": isSelected,
				tabIndex: focusedOptionIndex === index || focusedOptionIndex === -1 && index === 0 ? 0 : -1,
				itemValue: option,
				formattedValue
			}, clockItemProps, { children: formattedValue }), `${option.valueOf()}-${formattedValue}`);
		})
	}) }));
});
DigitalClock.displayName = "DigitalClock";
DigitalClock.propTypes = {
	ampm: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	focusedView: import_prop_types.default.oneOf(["hours"]),
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf(["hours"]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableTime: import_prop_types.default.func,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timeStep: import_prop_types.default.number,
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf(["hours"]),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["hours"]))
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MultiSectionDigitalClock/multiSectionDigitalClockClasses.js
function getMultiSectionDigitalClockUtilityClass(slot) {
	return generateUtilityClass("MuiMultiSectionDigitalClock", slot);
}
var multiSectionDigitalClockClasses = generateUtilityClasses("MuiMultiSectionDigitalClock", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MultiSectionDigitalClock/multiSectionDigitalClockSectionClasses.js
function getMultiSectionDigitalClockSectionUtilityClass(slot) {
	return generateUtilityClass("MuiMultiSectionDigitalClockSection", slot);
}
var multiSectionDigitalClockSectionClasses = generateUtilityClasses("MuiMultiSectionDigitalClockSection", ["root", "item"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MultiSectionDigitalClock/MultiSectionDigitalClockSection.js
var _excluded$43 = [
	"autoFocus",
	"onChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"items",
	"active",
	"slots",
	"slotProps",
	"skipDisabled"
];
var useUtilityClasses$59 = (classes) => {
	return composeClasses({
		root: ["root"],
		item: ["item"]
	}, getMultiSectionDigitalClockSectionUtilityClass, classes);
};
var MultiSectionDigitalClockSectionRoot = styled(MenuList, {
	name: "MuiMultiSectionDigitalClockSection",
	slot: "Root"
})(({ theme }) => ({
	maxHeight: 232,
	width: 56,
	padding: 0,
	overflow: "hidden",
	scrollbarWidth: "thin",
	"@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "auto" },
	"@media (pointer: fine)": { "&:hover": { overflowY: "auto" } },
	"@media (pointer: none), (pointer: coarse)": { overflowY: "auto" },
	"&:not(:first-of-type)": { borderLeft: `1px solid ${(theme.vars || theme).palette.divider}` },
	variants: [{
		props: { hasDigitalClockAlreadyBeenRendered: true },
		style: { "@media (prefers-reduced-motion: no-preference)": { scrollBehavior: "smooth" } }
	}]
}));
var MultiSectionDigitalClockSectionItem = styled(MenuItem, {
	name: "MuiMultiSectionDigitalClockSection",
	slot: "Item"
})(({ theme }) => ({
	padding: 8,
	margin: "2px 4px",
	width: 48,
	justifyContent: "center",
	"&:first-of-type": { marginTop: 4 },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity) },
	"&.Mui-selected": {
		backgroundColor: (theme.vars || theme).palette.primary.main,
		color: (theme.vars || theme).palette.primary.contrastText,
		"&:focus-visible, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	},
	"&.Mui-focusVisible": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity) }
}));
/**
* @ignore - internal component.
*/
var MultiSectionDigitalClockSection = /* @__PURE__ */ import_react.forwardRef(function MultiSectionDigitalClockSection(inProps, ref) {
	const containerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, containerRef);
	const previousActive = import_react.useRef(null);
	const props = useThemeProps({
		props: inProps,
		name: "MuiMultiSectionDigitalClockSection"
	});
	const { autoFocus, onChange, className, classes: classesProp, disabled, readOnly, items, active, slots, slotProps, skipDisabled } = props, other = _objectWithoutPropertiesLoose(props, _excluded$43);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { hasDigitalClockAlreadyBeenRendered: !!containerRef.current });
	const classes = useUtilityClasses$59(classesProp);
	const DigitalClockSectionItem = slots?.digitalClockSectionItem ?? MultiSectionDigitalClockSectionItem;
	useEnhancedEffect(() => {
		if (containerRef.current === null) return;
		const activeItem = containerRef.current.querySelector("[role=\"option\"][tabindex=\"0\"], [role=\"option\"][aria-selected=\"true\"]");
		if (active && autoFocus && activeItem) activeItem.focus();
		if (!activeItem || previousActive.current === activeItem) return;
		previousActive.current = activeItem;
		const offsetTop = activeItem.offsetTop;
		const itemHeight = activeItem.offsetHeight;
		const containerHeight = containerRef.current.clientHeight;
		const scrollableHeight = containerRef.current.scrollHeight;
		const centeredPosition = offsetTop - containerHeight / 2 + itemHeight / 2;
		const maxScrollTop = scrollableHeight - containerHeight;
		const scrollPosition = Math.min(centeredPosition, maxScrollTop);
		containerRef.current.scrollTop = Math.max(0, scrollPosition);
	});
	const focusedOptionIndex = items.findIndex((item) => item.isFocused(item.value));
	const handleKeyDown = (event) => {
		switch (event.key) {
			case "PageUp": {
				const newIndex = getFocusedListItemIndex(containerRef.current) - 5;
				const childToFocus = containerRef.current.children[Math.max(0, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			case "PageDown": {
				const newIndex = getFocusedListItemIndex(containerRef.current) + 5;
				const children = containerRef.current.children;
				const childToFocus = children[Math.min(children.length - 1, newIndex)];
				if (childToFocus) childToFocus.focus();
				event.preventDefault();
				break;
			}
			default:
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockSectionRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState,
		autoFocusItem: autoFocus && active,
		role: "listbox",
		onKeyDown: handleKeyDown
	}, other, { children: items.map((option, index) => {
		const isItemDisabled = option.isDisabled?.(option.value);
		const isDisabled = disabled || isItemDisabled;
		if (skipDisabled && isDisabled) return null;
		const isSelected = option.isSelected(option.value);
		const tabIndex = focusedOptionIndex === index || focusedOptionIndex === -1 && index === 0 ? 0 : -1;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalClockSectionItem, _extends({
			onClick: () => !readOnly && onChange(option.value),
			selected: isSelected,
			disabled: isDisabled,
			disableRipple: readOnly,
			role: "option",
			"aria-disabled": readOnly || isDisabled || void 0,
			"aria-label": option.ariaLabel,
			"aria-selected": isSelected,
			tabIndex,
			className: classes.item
		}, slotProps?.digitalClockSectionItem, { children: option.label }), option.label);
	}) }));
});
MultiSectionDigitalClockSection.displayName = "MultiSectionDigitalClockSection";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MultiSectionDigitalClock/MultiSectionDigitalClock.utils.js
var getHourSectionOptions = ({ now, value, adapter, ampm, isDisabled, resolveAriaLabel, timeStep, valueOrReferenceDate }) => {
	const currentHours = value ? adapter.getHours(value) : null;
	const result = [];
	const isSelected = (hour, overriddenCurrentHours) => {
		const resolvedCurrentHours = overriddenCurrentHours ?? currentHours;
		if (resolvedCurrentHours === null) return false;
		if (ampm) {
			if (hour === 12) return resolvedCurrentHours === 12 || resolvedCurrentHours === 0;
			return resolvedCurrentHours === hour || resolvedCurrentHours - 12 === hour;
		}
		return resolvedCurrentHours === hour;
	};
	const isFocused = (hour) => {
		return isSelected(hour, adapter.getHours(valueOrReferenceDate));
	};
	const endHour = ampm ? 11 : 23;
	for (let hour = 0; hour <= endHour; hour += timeStep) {
		let label = adapter.format(adapter.setHours(now, hour), ampm ? "hours12h" : "hours24h");
		const ariaLabel = resolveAriaLabel(parseInt(label, 10).toString());
		label = adapter.formatNumber(label);
		result.push({
			value: hour,
			label,
			isSelected,
			isDisabled,
			isFocused,
			ariaLabel
		});
	}
	return result;
};
var getTimeSectionOptions = ({ value, adapter, isDisabled, timeStep, resolveLabel, resolveAriaLabel, hasValue = true }) => {
	const isSelected = (timeValue) => {
		if (value === null) return false;
		return hasValue && value === timeValue;
	};
	const isFocused = (timeValue) => {
		return value === timeValue;
	};
	return [...Array.from({ length: Math.ceil(60 / timeStep) }, (_, index) => {
		const timeValue = timeStep * index;
		return {
			value: timeValue,
			label: adapter.formatNumber(resolveLabel(timeValue)),
			isDisabled,
			isSelected,
			isFocused,
			ariaLabel: resolveAriaLabel(timeValue.toString())
		};
	})];
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MultiSectionDigitalClock/MultiSectionDigitalClock.js
var _excluded$42 = [
	"ampm",
	"timeSteps",
	"autoFocus",
	"slots",
	"slotProps",
	"value",
	"defaultValue",
	"referenceDate",
	"disableIgnoringDatePartForTimeValidation",
	"maxTime",
	"minTime",
	"disableFuture",
	"disablePast",
	"minutesStep",
	"shouldDisableTime",
	"onChange",
	"view",
	"views",
	"openTo",
	"onViewChange",
	"focusedView",
	"onFocusedViewChange",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"skipDisabled",
	"timezone"
];
var useUtilityClasses$58 = (classes) => {
	return composeClasses({ root: ["root"] }, getMultiSectionDigitalClockUtilityClass, classes);
};
var MultiSectionDigitalClockRoot = styled(PickerViewRoot, {
	name: "MuiMultiSectionDigitalClock",
	slot: "Root"
})(({ theme }) => ({
	flexDirection: "row",
	width: "100%",
	borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
}));
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [DigitalClock](https://mui.com/x/react-date-pickers/digital-clock/)
*
* API:
*
* - [MultiSectionDigitalClock API](https://mui.com/x/api/date-pickers/multi-section-digital-clock/)
*/
var MultiSectionDigitalClock = /* @__PURE__ */ import_react.forwardRef(function MultiSectionDigitalClock(inProps, ref) {
	const adapter = usePickerAdapter();
	const isRtl = useRtl();
	const props = useThemeProps({
		props: inProps,
		name: "MuiMultiSectionDigitalClock"
	});
	const { ampm = adapter.is12HourCycleInCurrentLocale(), timeSteps: inTimeSteps, autoFocus, slots, slotProps, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableIgnoringDatePartForTimeValidation = false, maxTime, minTime, disableFuture, disablePast, minutesStep = 1, shouldDisableTime, onChange, view: inView, views: inViews = ["hours", "minutes"], openTo, onViewChange, focusedView: inFocusedView, onFocusedViewChange, className, classes: classesProp, disabled, readOnly, skipDisabled = false, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$42);
	const { value, handleValueChange: handleRawValueChange, timezone } = useControlledValue({
		name: "MultiSectionDigitalClock",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const translations = usePickerTranslations();
	const now = useNow(timezone);
	const timeSteps = import_react.useMemo(() => _extends({
		hours: 1,
		minutes: 5,
		seconds: 5
	}, inTimeSteps), [inTimeSteps]);
	const valueOrReferenceDate = useClockReferenceDate({
		value,
		referenceDate: referenceDateProp,
		adapter,
		props,
		timezone
	});
	const handleValueChange = useEventCallback((newValue, selectionState, selectedView) => handleRawValueChange(newValue, selectionState, selectedView));
	const views = import_react.useMemo(() => {
		if (!ampm || !inViews.includes("hours")) return inViews;
		return inViews.includes("meridiem") ? inViews : [...inViews, "meridiem"];
	}, [ampm, inViews]);
	const { view, setValueAndGoToNextView, focusedView } = useViews({
		view: inView,
		views,
		openTo,
		onViewChange,
		onChange: handleValueChange,
		focusedView: inFocusedView,
		onFocusedViewChange
	});
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(valueOrReferenceDate, ampm, useEventCallback((newValue) => {
		setValueAndGoToNextView(newValue, "finish", "meridiem");
	}), "finish");
	const isTimeDisabled = import_react.useCallback((rawValue, viewType) => {
		const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
		const shouldCheckPastEnd = viewType === "hours" || viewType === "minutes" && views.includes("seconds");
		const containsValidTime = ({ start, end }) => {
			if (minTime && isAfter(minTime, end)) return false;
			if (maxTime && isAfter(start, maxTime)) return false;
			if (disableFuture && isAfter(start, now)) return false;
			if (disablePast && isAfter(now, shouldCheckPastEnd ? end : start)) return false;
			return true;
		};
		const isValidValue = (timeValue, step = 1) => {
			if (timeValue % step !== 0) return false;
			if (shouldDisableTime) switch (viewType) {
				case "hours": return !shouldDisableTime(adapter.setHours(valueOrReferenceDate, timeValue), "hours");
				case "minutes": return !shouldDisableTime(adapter.setMinutes(valueOrReferenceDate, timeValue), "minutes");
				case "seconds": return !shouldDisableTime(adapter.setSeconds(valueOrReferenceDate, timeValue), "seconds");
				default: return false;
			}
			return true;
		};
		switch (viewType) {
			case "hours": {
				const valueWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
				const dateWithNewHours = adapter.setHours(valueOrReferenceDate, valueWithMeridiem);
				if (adapter.getHours(dateWithNewHours) !== valueWithMeridiem) return true;
				return !containsValidTime({
					start: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 0), 0),
					end: adapter.setSeconds(adapter.setMinutes(dateWithNewHours, 59), 59)
				}) || !isValidValue(valueWithMeridiem);
			}
			case "minutes": {
				const dateWithNewMinutes = adapter.setMinutes(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: adapter.setSeconds(dateWithNewMinutes, 0),
					end: adapter.setSeconds(dateWithNewMinutes, 59)
				}) || !isValidValue(rawValue, minutesStep);
			}
			case "seconds": {
				const dateWithNewSeconds = adapter.setSeconds(valueOrReferenceDate, rawValue);
				return !containsValidTime({
					start: dateWithNewSeconds,
					end: dateWithNewSeconds
				}) || !isValidValue(rawValue);
			}
			default: throw new Error("not supported");
		}
	}, [
		ampm,
		valueOrReferenceDate,
		disableIgnoringDatePartForTimeValidation,
		maxTime,
		meridiemMode,
		minTime,
		minutesStep,
		shouldDisableTime,
		adapter,
		disableFuture,
		disablePast,
		now,
		views
	]);
	const buildViewProps = import_react.useCallback((viewToBuild) => {
		switch (viewToBuild) {
			case "hours": return {
				onChange: (hours) => {
					const valueWithMeridiem = convertValueToMeridiem(hours, meridiemMode, ampm);
					setValueAndGoToNextView(adapter.setHours(valueOrReferenceDate, valueWithMeridiem), "finish", "hours");
				},
				items: getHourSectionOptions({
					now,
					value,
					ampm,
					adapter,
					isDisabled: (hours) => isTimeDisabled(hours, "hours"),
					timeStep: timeSteps.hours,
					resolveAriaLabel: translations.hoursClockNumberText,
					valueOrReferenceDate
				})
			};
			case "minutes": return {
				onChange: (minutes) => {
					setValueAndGoToNextView(adapter.setMinutes(valueOrReferenceDate, minutes), "finish", "minutes");
				},
				items: getTimeSectionOptions({
					value: adapter.getMinutes(valueOrReferenceDate),
					adapter,
					isDisabled: (minutes) => isTimeDisabled(minutes, "minutes"),
					resolveLabel: (minutes) => adapter.format(adapter.setMinutes(now, minutes), "minutes"),
					timeStep: timeSteps.minutes,
					hasValue: !!value,
					resolveAriaLabel: translations.minutesClockNumberText
				})
			};
			case "seconds": return {
				onChange: (seconds) => {
					setValueAndGoToNextView(adapter.setSeconds(valueOrReferenceDate, seconds), "finish", "seconds");
				},
				items: getTimeSectionOptions({
					value: adapter.getSeconds(valueOrReferenceDate),
					adapter,
					isDisabled: (seconds) => isTimeDisabled(seconds, "seconds"),
					resolveLabel: (seconds) => adapter.format(adapter.setSeconds(now, seconds), "seconds"),
					timeStep: timeSteps.seconds,
					hasValue: !!value,
					resolveAriaLabel: translations.secondsClockNumberText
				})
			};
			case "meridiem": {
				const amLabel = formatMeridiem(adapter, "am");
				const pmLabel = formatMeridiem(adapter, "pm");
				return {
					onChange: handleMeridiemChange,
					items: [{
						value: "am",
						label: amLabel,
						isSelected: () => !!value && meridiemMode === "am",
						isFocused: () => !!valueOrReferenceDate && meridiemMode === "am",
						ariaLabel: amLabel
					}, {
						value: "pm",
						label: pmLabel,
						isSelected: () => !!value && meridiemMode === "pm",
						isFocused: () => !!valueOrReferenceDate && meridiemMode === "pm",
						ariaLabel: pmLabel
					}]
				};
			}
			default: throw new Error(`Unknown view: ${viewToBuild} found.`);
		}
	}, [
		now,
		value,
		ampm,
		adapter,
		timeSteps.hours,
		timeSteps.minutes,
		timeSteps.seconds,
		translations.hoursClockNumberText,
		translations.minutesClockNumberText,
		translations.secondsClockNumberText,
		meridiemMode,
		setValueAndGoToNextView,
		valueOrReferenceDate,
		isTimeDisabled,
		handleMeridiemChange
	]);
	const viewsToRender = import_react.useMemo(() => {
		if (!isRtl) return views;
		const digitViews = views.filter((v) => v !== "meridiem");
		digitViews.reverse();
		if (views.includes("meridiem")) digitViews.push("meridiem");
		return digitViews;
	}, [isRtl, views]);
	const viewTimeOptions = import_react.useMemo(() => {
		return views.reduce((result, currentView) => {
			return _extends({}, result, { [currentView]: buildViewProps(currentView) });
		}, {});
	}, [views, buildViewProps]);
	const { ownerState } = usePickerPrivateContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockRoot, _extends({
		ref,
		className: clsx(useUtilityClasses$58(classesProp).root, className),
		ownerState,
		role: "group"
	}, other, { children: viewsToRender.map((timeView) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClockSection, {
		items: viewTimeOptions[timeView].items,
		onChange: viewTimeOptions[timeView].onChange,
		active: view === timeView,
		autoFocus: autoFocus || focusedView === timeView,
		disabled,
		readOnly,
		slots,
		slotProps,
		skipDisabled,
		"aria-label": translations.selectViewText(timeView)
	}, timeView)) }));
});
MultiSectionDigitalClock.displayName = "MultiSectionDigitalClock";
MultiSectionDigitalClock.propTypes = {
	ampm: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	focusedView: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableTime: import_prop_types.default.func,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersDay/pickersDayClasses.js
function getPickersDayUtilityClass(slot) {
	return generateUtilityClass("MuiPickersDay", slot);
}
var pickersDayClasses = generateUtilityClasses("MuiPickersDay", [
	"root",
	"dayWithMargin",
	"dayOutsideMonth",
	"hiddenDaySpacingFiller",
	"today",
	"selected",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersDay/usePickerDayOwnerState.js
function usePickerDayOwnerState(parameters) {
	const { disabled, selected, today, outsideCurrentMonth, day, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = parameters;
	const adapter = usePickerAdapter();
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, {
		day,
		isDaySelected: selected ?? false,
		isDayDisabled: disabled ?? false,
		isDayCurrent: today ?? false,
		isDayOutsideMonth: outsideCurrentMonth ?? false,
		isDayStartOfWeek: adapter.isSameDay(day, adapter.startOfWeek(day)),
		isDayEndOfWeek: adapter.isSameDay(day, adapter.endOfWeek(day)),
		disableMargin: disableMargin ?? false,
		disableHighlightToday: disableHighlightToday ?? false,
		showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth ?? false
	}), [
		adapter,
		pickerOwnerState,
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableMargin,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersDay/PickersDay.js
var _excluded$41 = [
	"autoFocus",
	"className",
	"classes",
	"hidden",
	"isAnimating",
	"onClick",
	"onDaySelect",
	"onFocus",
	"onBlur",
	"onKeyDown",
	"onMouseDown",
	"onMouseEnter",
	"children",
	"isFirstVisibleCell",
	"isLastVisibleCell",
	"day",
	"selected",
	"disabled",
	"today",
	"outsideCurrentMonth",
	"disableMargin",
	"disableHighlightToday",
	"showDaysOutsideCurrentMonth"
];
var useUtilityClasses$57 = (classes, ownerState) => {
	const { isDaySelected, isDayDisabled, isDayCurrent, isDayOutsideMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = ownerState;
	const isHiddenDaySpacingFiller = isDayOutsideMonth && !showDaysOutsideCurrentMonth;
	return composeClasses({
		root: [
			"root",
			isDaySelected && !isHiddenDaySpacingFiller && "selected",
			isDayDisabled && "disabled",
			!disableMargin && "dayWithMargin",
			!disableHighlightToday && isDayCurrent && "today",
			isDayOutsideMonth && showDaysOutsideCurrentMonth && "dayOutsideMonth",
			isHiddenDaySpacingFiller && "hiddenDaySpacingFiller"
		],
		hiddenDaySpacingFiller: ["hiddenDaySpacingFiller"]
	}, getPickersDayUtilityClass, classes);
};
var styleArg = ({ theme }) => _extends({}, theme.typography.caption, {
	width: 36,
	height: 36,
	borderRadius: "50%",
	padding: 0,
	backgroundColor: "transparent",
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.short }),
	color: (theme.vars || theme).palette.text.primary,
	"@media (pointer: fine)": { "&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity) } },
	"&:focus": {
		backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
		[`&.${pickersDayClasses.selected}`]: {
			willChange: "background-color",
			backgroundColor: (theme.vars || theme).palette.primary.dark
		}
	},
	[`&.${pickersDayClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		"&:hover": {
			willChange: "background-color",
			backgroundColor: (theme.vars || theme).palette.primary.dark
		}
	},
	[`&.${pickersDayClasses.disabled}:not(.${pickersDayClasses.selected})`]: { color: (theme.vars || theme).palette.text.disabled },
	[`&.${pickersDayClasses.disabled}&.${pickersDayClasses.selected}`]: { opacity: .6 },
	variants: [
		{
			props: { disableMargin: false },
			style: { margin: `0 2px` }
		},
		{
			props: {
				isDayOutsideMonth: true,
				showDaysOutsideCurrentMonth: true
			},
			style: { color: (theme.vars || theme).palette.text.secondary }
		},
		{
			props: {
				disableHighlightToday: false,
				isDayCurrent: true
			},
			style: { [`&:not(.${pickersDayClasses.selected})`]: { border: `1px solid ${(theme.vars || theme).palette.text.secondary}` } }
		}
	]
});
var overridesResolver$2 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		!ownerState.disableMargin && styles.dayWithMargin,
		!ownerState.disableHighlightToday && ownerState.isDayCurrent && styles.today,
		ownerState.isDayOutsideMonth && ownerState.showDaysOutsideCurrentMonth && styles.dayOutsideMonth,
		ownerState.isDayOutsideMonth && !ownerState.showDaysOutsideCurrentMonth && styles.hiddenDaySpacingFiller
	];
};
var PickersDayRoot = styled(ButtonBase, {
	name: "MuiPickersDay",
	slot: "Root",
	overridesResolver: overridesResolver$2
})(styleArg);
var PickersDayFiller = styled("div", {
	name: "MuiPickersDay",
	slot: "Root",
	overridesResolver: overridesResolver$2
})(({ theme }) => _extends({}, styleArg({ theme }), {
	opacity: 0,
	pointerEvents: "none"
}));
var noop$3 = () => {};
var PickersDayRaw = /* @__PURE__ */ import_react.forwardRef(function PickersDay(inProps, forwardedRef) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersDay"
	});
	const { autoFocus = false, className, classes: classesProp, isAnimating, onClick, onDaySelect, onFocus = noop$3, onBlur = noop$3, onKeyDown = noop$3, onMouseDown = noop$3, onMouseEnter = noop$3, children, day, selected, disabled, today, outsideCurrentMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = props, other = _objectWithoutPropertiesLoose(props, _excluded$41);
	const ownerState = usePickerDayOwnerState({
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableMargin,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	});
	const classes = useUtilityClasses$57(classesProp, ownerState);
	const adapter = usePickerAdapter();
	const ref = import_react.useRef(null);
	const handleRef = useForkRef(ref, forwardedRef);
	useEnhancedEffect(() => {
		if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) ref.current.focus();
	}, [
		autoFocus,
		disabled,
		isAnimating,
		outsideCurrentMonth
	]);
	const handleMouseDown = (event) => {
		onMouseDown(event);
		if (outsideCurrentMonth) event.preventDefault();
	};
	const handleClick = (event) => {
		event.defaultMuiPrevented = true;
		if (!disabled) onDaySelect(day);
		if (outsideCurrentMonth) event.currentTarget.focus();
		if (onClick) onClick(event);
	};
	if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersDayFiller, {
		className: clsx(classes.root, classes.hiddenDaySpacingFiller, className),
		ownerState,
		role: other.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersDayRoot, _extends({
		className: clsx(classes.root, className),
		ref: handleRef,
		centerRipple: true,
		disabled,
		tabIndex: selected ? 0 : -1,
		onKeyDown: (event) => onKeyDown(event, day),
		onFocus: (event) => onFocus(event, day),
		onBlur: (event) => onBlur(event, day),
		onMouseEnter: (event) => onMouseEnter(event, day),
		onClick: handleClick,
		onMouseDown: handleMouseDown
	}, other, {
		ownerState,
		children: children ?? adapter.format(day, "dayOfMonth")
	}));
});
PickersDayRaw.displayName = "PickersDayRaw";
PickersDayRaw.propTypes = {
	action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({ focusVisible: import_prop_types.default.func.isRequired }) })]),
	centerRipple: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	day: import_prop_types.default.object.isRequired,
	disabled: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableMargin: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	disableTouchRipple: import_prop_types.default.bool,
	focusRipple: import_prop_types.default.bool,
	focusVisibleClassName: import_prop_types.default.string,
	isAnimating: import_prop_types.default.bool,
	isFirstVisibleCell: import_prop_types.default.bool.isRequired,
	isLastVisibleCell: import_prop_types.default.bool.isRequired,
	onBlur: import_prop_types.default.func,
	onDaySelect: import_prop_types.default.func.isRequired,
	onFocus: import_prop_types.default.func,
	onFocusVisible: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onMouseEnter: import_prop_types.default.func,
	outsideCurrentMonth: import_prop_types.default.bool.isRequired,
	selected: import_prop_types.default.bool,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
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
	tabIndex: import_prop_types.default.number,
	today: import_prop_types.default.bool,
	TouchRippleProps: import_prop_types.default.object,
	touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		pulsate: import_prop_types.default.func.isRequired,
		start: import_prop_types.default.func.isRequired,
		stop: import_prop_types.default.func.isRequired
	}) })])
};
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* API:
*
* - [PickersDay API](https://mui.com/x/api/date-pickers/pickers-day/)
*/
var PickersDay = /* @__PURE__ */ import_react.memo(PickersDayRaw);
PickersDay.displayName = "PickersDay";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickerDay2/pickerDay2Classes.js
function getPickerDay2UtilityClass(slot) {
	return generateUtilityClass("MuiPickerDay2", slot);
}
var pickerDay2Classes = generateUtilityClasses("MuiPickerDay2", [
	"root",
	"dayOutsideMonth",
	"today",
	"selected",
	"disabled",
	"fillerCell"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickerDay2/PickerDay2.js
var _excluded$40 = [
	"autoFocus",
	"className",
	"classes",
	"hidden",
	"isAnimating",
	"onClick",
	"onDaySelect",
	"onFocus",
	"onBlur",
	"onKeyDown",
	"onMouseDown",
	"onMouseEnter",
	"children",
	"isFirstVisibleCell",
	"isLastVisibleCell",
	"day",
	"selected",
	"disabled",
	"today",
	"outsideCurrentMonth",
	"disableMargin",
	"disableHighlightToday",
	"showDaysOutsideCurrentMonth",
	"isVisuallySelected"
];
var useUtilityClasses$56 = (ownerState, classes) => {
	const { isDaySelected, disableHighlightToday, isDayCurrent, isDayDisabled, isDayOutsideMonth, isDayFillerCell } = ownerState;
	return composeClasses({ root: [
		"root",
		isDaySelected && !isDayFillerCell && "selected",
		isDayDisabled && "disabled",
		!disableHighlightToday && isDayCurrent && !isDaySelected && !isDayFillerCell && "today",
		isDayOutsideMonth && "dayOutsideMonth",
		isDayFillerCell && "fillerCell"
	] }, getPickerDay2UtilityClass, classes);
};
var PickerDay2Root = styled(ButtonBase, {
	name: "MuiPickerDay2",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			!ownerState.disableHighlightToday && ownerState.isDayCurrent && styles.today,
			!ownerState.isDayOutsideMonth && styles.dayOutsideMonth,
			ownerState.isDayFillerCell && styles.fillerCell
		];
	}
})(({ theme }) => _extends({
	"--PickerDay-horizontalMargin": `2px`,
	"--PickerDay-size": `36px`
}, theme.typography.caption, {
	width: "var(--PickerDay-size)",
	height: "var(--PickerDay-size)",
	borderRadius: "calc(var(--PickerDay-size) / 2)",
	padding: 0,
	backgroundColor: "transparent",
	transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.short }),
	color: (theme.vars || theme).palette.text.primary,
	"@media (pointer: fine)": { "&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity) } },
	"&:focus": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.focusOpacity) },
	marginLeft: "var(--PickerDay-horizontalMargin)",
	marginRight: "var(--PickerDay-horizontalMargin)",
	variants: [
		{
			props: { isDaySelected: true },
			style: {
				color: (theme.vars || theme).palette.primary.contrastText,
				backgroundColor: (theme.vars || theme).palette.primary.main,
				fontWeight: theme.typography.fontWeightMedium,
				"&:focus, &:hover": {
					willChange: "background-color",
					backgroundColor: (theme.vars || theme).palette.primary.dark
				},
				[`&.${pickerDay2Classes.disabled}`]: { opacity: .6 }
			}
		},
		{
			props: { isDayDisabled: true },
			style: { color: (theme.vars || theme).palette.text.disabled }
		},
		{
			props: { isDayFillerCell: true },
			style: {
				opacity: 0,
				pointerEvents: "none"
			}
		},
		{
			props: { isDayOutsideMonth: true },
			style: { color: (theme.vars || theme).palette.text.secondary }
		},
		{
			props: {
				isDayCurrent: true,
				isDaySelected: false
			},
			style: {
				outline: `1px solid ${(theme.vars || theme).palette.text.secondary}`,
				outlineOffset: -1
			}
		}
	]
}));
var noop$2 = () => {};
var PickerDay2Raw = /* @__PURE__ */ import_react.forwardRef(function PickerDay2(inProps, forwardedRef) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickerDay2"
	});
	const adapter = usePickerAdapter();
	const { autoFocus = false, className, classes: classesProp, isAnimating, onClick, onDaySelect, onFocus = noop$2, onBlur = noop$2, onKeyDown = noop$2, onMouseDown = noop$2, onMouseEnter = noop$2, children, day, selected, disabled, today, outsideCurrentMonth, disableMargin, disableHighlightToday, showDaysOutsideCurrentMonth } = props, other = _objectWithoutPropertiesLoose(props, _excluded$40);
	const ownerState = _extends({}, usePickerDayOwnerState({
		day,
		selected,
		disabled,
		today,
		outsideCurrentMonth,
		disableMargin,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	}), { isDayFillerCell: outsideCurrentMonth && !showDaysOutsideCurrentMonth });
	const classes = useUtilityClasses$56(ownerState, classesProp);
	const ref = import_react.useRef(null);
	const handleRef = useForkRef(ref, forwardedRef);
	useEnhancedEffect(() => {
		if (autoFocus && !disabled && !isAnimating && !outsideCurrentMonth) ref.current.focus();
	}, [
		autoFocus,
		disabled,
		isAnimating,
		outsideCurrentMonth
	]);
	const handleMouseDown = (event) => {
		onMouseDown(event);
		if (outsideCurrentMonth) event.preventDefault();
	};
	const handleClick = (event) => {
		event.defaultMuiPrevented = true;
		if (!disabled) onDaySelect(day);
		if (outsideCurrentMonth) event.currentTarget.focus();
		if (onClick) onClick(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerDay2Root, _extends({
		ref: handleRef,
		centerRipple: true,
		disabled,
		tabIndex: selected ? 0 : -1,
		onKeyDown: (event) => onKeyDown(event, day),
		onFocus: (event) => onFocus(event, day),
		onBlur: (event) => onBlur(event, day),
		onMouseEnter: (event) => onMouseEnter(event, day),
		onClick: handleClick,
		onMouseDown: handleMouseDown
	}, other, {
		ownerState,
		className: clsx(classes.root, className),
		children: children ?? (ownerState.isDayFillerCell ? null : adapter.format(day, "dayOfMonth"))
	}));
});
PickerDay2Raw.displayName = "PickerDay2Raw";
PickerDay2Raw.propTypes = {
	action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({ focusVisible: import_prop_types.default.func.isRequired }) })]),
	centerRipple: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	day: import_prop_types.default.object.isRequired,
	disabled: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableMargin: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	disableTouchRipple: import_prop_types.default.bool,
	focusRipple: import_prop_types.default.bool,
	focusVisibleClassName: import_prop_types.default.string,
	isAnimating: import_prop_types.default.bool,
	isFirstVisibleCell: import_prop_types.default.bool.isRequired,
	isLastVisibleCell: import_prop_types.default.bool.isRequired,
	isVisuallySelected: import_prop_types.default.bool,
	onBlur: import_prop_types.default.func,
	onDaySelect: import_prop_types.default.func.isRequired,
	onFocus: import_prop_types.default.func,
	onFocusVisible: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onMouseEnter: import_prop_types.default.func,
	outsideCurrentMonth: import_prop_types.default.bool.isRequired,
	selected: import_prop_types.default.bool,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
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
	tabIndex: import_prop_types.default.number,
	today: import_prop_types.default.bool,
	TouchRippleProps: import_prop_types.default.object,
	touchRippleRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		pulsate: import_prop_types.default.func.isRequired,
		start: import_prop_types.default.func.isRequired,
		stop: import_prop_types.default.func.isRequired
	}) })])
};
var PickerDay2 = /* @__PURE__ */ import_react.memo(PickerDay2Raw);
PickerDay2.displayName = "PickerDay2";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldCharacterEditing.js
var isQueryResponseWithoutValue = (response) => response.saveQuery != null;
/**
* Update the active section value when the user pressed a key that is not a navigation key (arrow key for example).
* This hook has two main editing behaviors
*
* 1. The numeric editing when the user presses a digit
* 2. The letter editing when the user presses another key
*/
var useFieldCharacterEditing = ({ stateResponse: { localizedDigits, sectionsValueBoundaries, state, timezone, setCharacterQuery, setTempAndroidValueStr, updateSectionValue } }) => {
	const adapter = usePickerAdapter();
	const applyQuery = ({ keyPressed, sectionIndex }, getFirstSectionValueMatchingWithQuery, isValidQueryValue) => {
		const cleanKeyPressed = keyPressed.toLowerCase();
		const activeSection = state.sections[sectionIndex];
		if (state.characterQuery != null && (!isValidQueryValue || isValidQueryValue(state.characterQuery.value)) && state.characterQuery.sectionIndex === sectionIndex) {
			const concatenatedQueryValue = `${state.characterQuery.value}${cleanKeyPressed}`;
			const queryResponse = getFirstSectionValueMatchingWithQuery(concatenatedQueryValue, activeSection);
			if (!isQueryResponseWithoutValue(queryResponse)) {
				setCharacterQuery({
					sectionIndex,
					value: concatenatedQueryValue,
					sectionType: activeSection.type
				});
				return queryResponse;
			}
		}
		const queryResponse = getFirstSectionValueMatchingWithQuery(cleanKeyPressed, activeSection);
		if (isQueryResponseWithoutValue(queryResponse) && !queryResponse.saveQuery) {
			setCharacterQuery(null);
			return null;
		}
		setCharacterQuery({
			sectionIndex,
			value: cleanKeyPressed,
			sectionType: activeSection.type
		});
		if (isQueryResponseWithoutValue(queryResponse)) return null;
		return queryResponse;
	};
	const applyLetterEditing = (params) => {
		const findMatchingOptions = (format, options, queryValue) => {
			const matchingValues = options.filter((option) => option.toLowerCase().startsWith(queryValue));
			if (matchingValues.length === 0) return { saveQuery: false };
			return {
				sectionValue: matchingValues[0],
				shouldGoToNextSection: matchingValues.length === 1
			};
		};
		const testQueryOnFormatAndFallbackFormat = (queryValue, activeSection, fallbackFormat, formatFallbackValue) => {
			const getOptions = (format) => getLetterEditingOptions(adapter, timezone, activeSection.type, format);
			if (activeSection.contentType === "letter") return findMatchingOptions(activeSection.format, getOptions(activeSection.format), queryValue);
			if (fallbackFormat && formatFallbackValue != null && getDateSectionConfigFromFormatToken(adapter, fallbackFormat).contentType === "letter") {
				const fallbackOptions = getOptions(fallbackFormat);
				const response = findMatchingOptions(fallbackFormat, fallbackOptions, queryValue);
				if (isQueryResponseWithoutValue(response)) return { saveQuery: false };
				return _extends({}, response, { sectionValue: formatFallbackValue(response.sectionValue, fallbackOptions) });
			}
			return { saveQuery: false };
		};
		const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
			switch (activeSection.type) {
				case "month": {
					const formatFallbackValue = (fallbackValue) => changeSectionValueFormat(adapter, fallbackValue, adapter.formats.month, activeSection.format);
					return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, adapter.formats.month, formatFallbackValue);
				}
				case "weekDay": {
					const formatFallbackValue = (fallbackValue, fallbackOptions) => fallbackOptions.indexOf(fallbackValue).toString();
					return testQueryOnFormatAndFallbackFormat(queryValue, activeSection, adapter.formats.weekday, formatFallbackValue);
				}
				case "meridiem": return testQueryOnFormatAndFallbackFormat(queryValue, activeSection);
				default: return { saveQuery: false };
			}
		};
		return applyQuery(params, getFirstSectionValueMatchingWithQuery);
	};
	const applyNumericEditing = (params) => {
		const getNewSectionValue = ({ queryValue, skipIfBelowMinimum, section }) => {
			const cleanQueryValue = removeLocalizedDigits(queryValue, localizedDigits);
			const queryValueNumber = Number(cleanQueryValue);
			const sectionBoundaries = sectionsValueBoundaries[section.type]({
				currentDate: null,
				format: section.format,
				contentType: section.contentType
			});
			if (queryValueNumber > sectionBoundaries.maximum) return { saveQuery: false };
			if (skipIfBelowMinimum && queryValueNumber < sectionBoundaries.minimum) return { saveQuery: true };
			const shouldGoToNextSection = queryValueNumber * 10 > sectionBoundaries.maximum || cleanQueryValue.length === sectionBoundaries.maximum.toString().length;
			return {
				sectionValue: cleanDigitSectionValue(adapter, queryValueNumber, sectionBoundaries, localizedDigits, section),
				shouldGoToNextSection
			};
		};
		const getFirstSectionValueMatchingWithQuery = (queryValue, activeSection) => {
			if (activeSection.contentType === "digit" || activeSection.contentType === "digit-with-letter") return getNewSectionValue({
				queryValue,
				skipIfBelowMinimum: false,
				section: activeSection
			});
			if (activeSection.type === "month") {
				const hasLeadingZerosInFormat = doesSectionFormatHaveLeadingZeros(adapter, "digit", "month", "MM");
				const response = getNewSectionValue({
					queryValue,
					skipIfBelowMinimum: true,
					section: {
						type: activeSection.type,
						format: "MM",
						hasLeadingZerosInFormat,
						hasLeadingZerosInInput: true,
						contentType: "digit",
						maxLength: 2
					}
				});
				if (isQueryResponseWithoutValue(response)) return response;
				return _extends({}, response, { sectionValue: changeSectionValueFormat(adapter, response.sectionValue, "MM", activeSection.format) });
			}
			if (activeSection.type === "weekDay") {
				const response = getNewSectionValue({
					queryValue,
					skipIfBelowMinimum: true,
					section: activeSection
				});
				if (isQueryResponseWithoutValue(response)) return response;
				const formattedValue = getDaysInWeekStr(adapter, activeSection.format)[Number(response.sectionValue) - 1];
				return _extends({}, response, { sectionValue: formattedValue });
			}
			return { saveQuery: false };
		};
		return applyQuery(params, getFirstSectionValueMatchingWithQuery, (queryValue) => isStringNumber(queryValue, localizedDigits));
	};
	return useEventCallback((params) => {
		const section = state.sections[params.sectionIndex];
		const response = isStringNumber(params.keyPressed, localizedDigits) ? applyNumericEditing(_extends({}, params, { keyPressed: applyLocalizedDigits(params.keyPressed, localizedDigits) })) : applyLetterEditing(params);
		if (response == null) {
			setTempAndroidValueStr(null);
			return;
		}
		updateSectionValue({
			section,
			newSectionValue: response.sectionValue,
			shouldGoToNextSection: response.shouldGoToNextSection
		});
	});
};
/**
* The letter editing and the numeric editing each define a `CharacterEditingApplier`.
* This function decides what the new section value should be and if the focus should switch to the next section.
*
* If it returns `null`, then the section value is not updated and the focus does not move.
*/
/**
* Function called by `applyQuery` which decides:
* - what is the new section value ?
* - should the query used to get this value be stored for the next key press ?
*
* If it returns `{ sectionValue: string; shouldGoToNextSection: boolean }`,
* Then we store the query and update the section with the new value.
*
* If it returns `{ saveQuery: true` },
* Then we store the query and don't update the section.
*
* If it returns `{ saveQuery: false },
* Then we do nothing.
*/
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/validation/validateDate.js
/**
* Validation props used by the Date Picker, Date Field and Date Calendar components.
*/
/**
* Validation props as received by the validateDate method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateDate method.
*/
var validateDate = ({ props, value, timezone, adapter }) => {
	if (value === null) return null;
	const { shouldDisableDate, shouldDisableMonth, shouldDisableYear, disablePast, disableFuture, minDate, maxDate } = props;
	const now = adapter.date(void 0, timezone);
	switch (true) {
		case !adapter.isValid(value): return "invalidDate";
		case Boolean(shouldDisableDate && shouldDisableDate(value)): return "shouldDisableDate";
		case Boolean(shouldDisableMonth && shouldDisableMonth(value)): return "shouldDisableMonth";
		case Boolean(shouldDisableYear && shouldDisableYear(value)): return "shouldDisableYear";
		case Boolean(disableFuture && adapter.isAfterDay(value, now)): return "disableFuture";
		case Boolean(disablePast && adapter.isBeforeDay(value, now)): return "disablePast";
		case Boolean(minDate && adapter.isBeforeDay(value, minDate)): return "minDate";
		case Boolean(maxDate && adapter.isAfterDay(value, maxDate)): return "maxDate";
		default: return null;
	}
};
validateDate.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/validation/validateTime.js
/**
* Validation props used by the Time Picker, Time Field and Clock components.
*/
/**
* Validation props as received by the validateTime method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateTime method.
*/
var validateTime = ({ adapter, value, timezone, props }) => {
	if (value === null) return null;
	const { minTime, maxTime, minutesStep, shouldDisableTime, disableIgnoringDatePartForTimeValidation = false, disablePast, disableFuture } = props;
	const now = adapter.date(void 0, timezone);
	const isAfter = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, adapter);
	switch (true) {
		case !adapter.isValid(value): return "invalidDate";
		case Boolean(minTime && isAfter(minTime, value)): return "minTime";
		case Boolean(maxTime && isAfter(value, maxTime)): return "maxTime";
		case Boolean(disableFuture && adapter.isAfter(value, now)): return "disableFuture";
		case Boolean(disablePast && adapter.isBefore(value, now)): return "disablePast";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "hours")): return "shouldDisableTime-hours";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "minutes")): return "shouldDisableTime-minutes";
		case Boolean(shouldDisableTime && shouldDisableTime(value, "seconds")): return "shouldDisableTime-seconds";
		case Boolean(minutesStep && adapter.getMinutes(value) % minutesStep !== 0): return "minutesStep";
		default: return null;
	}
};
validateTime.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/validation/validateDateTime.js
/**
* Validation props used by the Date Time Picker and Date Time Field components.
*/
/**
* Validation props as received by the validateDateTime method.
*/
/**
* Name of the props that should be defaulted before being passed to the validateDateTime method.
*/
var validateDateTime = ({ adapter, value, timezone, props }) => {
	const dateValidationResult = validateDate({
		adapter,
		value,
		timezone,
		props
	});
	if (dateValidationResult !== null) return dateValidationResult;
	return validateTime({
		adapter,
		value,
		timezone,
		props
	});
};
validateDateTime.valueManager = singleItemValueManager;
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/validation/useValidation.js
/**
* Utility hook to check if a given value is valid based on the provided validation props.
* @template TValue The value type. It will be the same type as `value` or `null`. It can be in `[start, end]` format in case of range value.
* @template TError The validation error type. It will be either `string` or a `null`. It can be in `[start, end]` format in case of range value.
* @param {UseValidationOptions<TValue, TError, TValidationProps>} options The options to configure the hook.
* @param {TValue} options.value The value to validate.
* @param {PickersTimezone} options.timezone The timezone to use for the validation.
* @param {Validator<TValue, TError, TValidationProps>} options.validator The validator function to use.
* @param {TValidationProps} options.props The validation props, they differ depending on the component.
* @param {(error: TError, value: TValue) => void} options.onError Callback fired when the error associated with the current value changes.
*/
function useValidation(options) {
	const { props, validator, value, timezone, onError } = options;
	const adapter = usePickerAdapter();
	const previousValidationErrorRef = import_react.useRef(validator.valueManager.defaultErrorState);
	const validationError = validator({
		adapter,
		value,
		timezone,
		props
	});
	const hasValidationError = validator.valueManager.hasError(validationError);
	import_react.useEffect(() => {
		if (onError && !validator.valueManager.isSameError(validationError, previousValidationErrorRef.current)) onError(validationError, value);
		previousValidationErrorRef.current = validationError;
	}, [
		validator,
		onError,
		validationError,
		value
	]);
	return {
		validationError,
		hasValidationError,
		getValidationErrorForNewValue: useEventCallback((newValue) => {
			return validator({
				adapter,
				value: newValue,
				timezone,
				props
			});
		})
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldState.js
var QUERY_LIFE_DURATION_MS = 5e3;
var useFieldState = (parameters) => {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const isRtl = useRtl();
	const { manager: { validator, valueType, internal_valueManager: valueManager, internal_fieldValueManager: fieldValueManager }, internalPropsWithDefaults, internalPropsWithDefaults: { value: valueProp, defaultValue, referenceDate: referenceDateProp, onChange, format, formatDensity = "dense", selectedSections: selectedSectionsProp, onSelectedSectionsChange, shouldRespectLeadingZeros = false, timezone: timezoneProp, enableAccessibleFieldDOMStructure = true }, forwardedProps: { error: errorProp } } = parameters;
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "a field component",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager
	});
	const valueRef = import_react.useRef(value);
	import_react.useEffect(() => {
		valueRef.current = value;
	}, [value]);
	const { hasValidationError } = useValidation({
		props: internalPropsWithDefaults,
		validator,
		timezone,
		value,
		onError: internalPropsWithDefaults.onError
	});
	const localizedDigits = import_react.useMemo(() => getLocalizedDigits(adapter), [adapter]);
	const sectionsValueBoundaries = import_react.useMemo(() => getSectionsBoundaries(adapter, localizedDigits, timezone), [
		adapter,
		localizedDigits,
		timezone
	]);
	const getSectionsFromValue = import_react.useCallback((valueToAnalyze) => fieldValueManager.getSectionsFromValue(valueToAnalyze, (date) => buildSectionsFromFormat({
		adapter,
		localeText: translations,
		localizedDigits,
		format,
		date,
		formatDensity,
		shouldRespectLeadingZeros,
		enableAccessibleFieldDOMStructure,
		isRtl
	})), [
		fieldValueManager,
		format,
		translations,
		localizedDigits,
		isRtl,
		shouldRespectLeadingZeros,
		adapter,
		formatDensity,
		enableAccessibleFieldDOMStructure
	]);
	const [state, setState] = import_react.useState(() => {
		const sections = getSectionsFromValue(value);
		validateSections(sections, valueType);
		const stateWithoutReferenceDate = {
			sections,
			lastExternalValue: value,
			lastSectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			tempValueStrAndroid: null,
			characterQuery: null
		};
		const granularity = getSectionTypeGranularity(sections);
		return _extends({}, stateWithoutReferenceDate, { referenceValue: valueManager.getInitialReferenceValue({
			referenceDate: referenceDateProp,
			value,
			adapter,
			props: internalPropsWithDefaults,
			granularity,
			timezone
		}) });
	});
	const [selectedSections, innerSetSelectedSections] = useControlled({
		controlled: selectedSectionsProp,
		default: null,
		name: "useField",
		state: "selectedSections"
	});
	const setSelectedSections = (newSelectedSections) => {
		innerSetSelectedSections(newSelectedSections);
		onSelectedSectionsChange?.(newSelectedSections);
	};
	const parsedSelectedSections = import_react.useMemo(() => parseSelectedSections(selectedSections, state.sections), [selectedSections, state.sections]);
	const activeSectionIndex = parsedSelectedSections === "all" ? 0 : parsedSelectedSections;
	const sectionOrder = import_react.useMemo(() => getSectionOrder(state.sections, isRtl && !enableAccessibleFieldDOMStructure), [
		state.sections,
		isRtl,
		enableAccessibleFieldDOMStructure
	]);
	const areAllSectionsEmpty = import_react.useMemo(() => state.sections.every((section) => section.value === ""), [state.sections]);
	const hasPartiallyFilledSectionsOnBlur = import_react.useMemo(() => {
		if (activeSectionIndex != null) return false;
		const filledSections = state.sections.filter((s) => s.value !== "");
		return filledSections.length > 0 && state.sections.length - filledSections.length > 0;
	}, [state.sections, activeSectionIndex]);
	const error = import_react.useMemo(() => {
		if (errorProp !== void 0) return errorProp;
		return hasValidationError || hasPartiallyFilledSectionsOnBlur;
	}, [
		hasValidationError,
		hasPartiallyFilledSectionsOnBlur,
		errorProp
	]);
	const publishValue = (newValue) => {
		handleValueChange(newValue, { validationError: validator({
			adapter,
			value: newValue,
			timezone,
			props: internalPropsWithDefaults
		}) });
	};
	const setSectionValue = (sectionIndex, newSectionValue) => {
		const newSections = [...state.sections];
		newSections[sectionIndex] = _extends({}, newSections[sectionIndex], {
			value: newSectionValue,
			modified: true
		});
		return newSections;
	};
	const sectionToUpdateOnNextInvalidDateRef = import_react.useRef(null);
	const updateSectionValueOnNextInvalidDateTimeout = useTimeout();
	const setSectionUpdateToApplyOnNextInvalidDate = (newSectionValue) => {
		if (activeSectionIndex == null) return;
		sectionToUpdateOnNextInvalidDateRef.current = {
			sectionIndex: activeSectionIndex,
			value: newSectionValue
		};
		updateSectionValueOnNextInvalidDateTimeout.start(0, () => {
			sectionToUpdateOnNextInvalidDateRef.current = null;
		});
	};
	const clearValue = () => {
		if (valueManager.areValuesEqual(adapter, value, valueManager.emptyValue)) setState((prevState) => _extends({}, prevState, {
			sections: prevState.sections.map((section) => _extends({}, section, { value: "" })),
			tempValueStrAndroid: null,
			characterQuery: null
		}));
		else {
			setState((prevState) => _extends({}, prevState, { characterQuery: null }));
			publishValue(valueManager.emptyValue);
		}
	};
	const clearActiveSection = () => {
		if (activeSectionIndex == null) return;
		const activeSection = state.sections[activeSectionIndex];
		if (activeSection.value === "") return;
		setSectionUpdateToApplyOnNextInvalidDate("");
		if (fieldValueManager.getDateFromSection(value, activeSection) === null) setState((prevState) => _extends({}, prevState, {
			sections: setSectionValue(activeSectionIndex, ""),
			tempValueStrAndroid: null,
			characterQuery: null
		}));
		else {
			setState((prevState) => _extends({}, prevState, { characterQuery: null }));
			publishValue(fieldValueManager.updateDateInValue(value, activeSection, null));
		}
	};
	const updateValueFromValueStr = (valueStr) => {
		const parseDateStr = (dateStr, referenceDate) => {
			const date = adapter.parse(dateStr, format);
			if (!adapter.isValid(date)) return null;
			return mergeDateIntoReferenceDate(adapter, date, buildSectionsFromFormat({
				adapter,
				localeText: translations,
				localizedDigits,
				format,
				date,
				formatDensity,
				shouldRespectLeadingZeros,
				enableAccessibleFieldDOMStructure,
				isRtl
			}), referenceDate, false);
		};
		publishValue(fieldValueManager.parseValueStr(valueStr, state.referenceValue, parseDateStr));
	};
	const cleanActiveDateSectionsIfValueNullTimeout = useTimeout();
	const updateSectionValue = ({ section, newSectionValue, shouldGoToNextSection }) => {
		updateSectionValueOnNextInvalidDateTimeout.clear();
		cleanActiveDateSectionsIfValueNullTimeout.clear();
		const activeDate = fieldValueManager.getDateFromSection(value, section);
		/**
		* Decide which section should be focused
		*/
		if (shouldGoToNextSection && activeSectionIndex < state.sections.length - 1) setSelectedSections(activeSectionIndex + 1);
		/**
		* Try to build a valid date from the new section value
		*/
		const newSections = setSectionValue(activeSectionIndex, newSectionValue);
		const newActiveDateSections = fieldValueManager.getDateSectionsFromValue(newSections, section);
		const newActiveDate = getDateFromDateSections(adapter, newActiveDateSections, localizedDigits);
		/**
		* If the new date is valid,
		* Then we merge the value of the modified sections into the reference date.
		* This makes sure that we don't lose some information of the initial date (like the time on a date field).
		*/
		if (adapter.isValid(newActiveDate)) {
			const mergedDate = mergeDateIntoReferenceDate(adapter, newActiveDate, newActiveDateSections, fieldValueManager.getDateFromSection(state.referenceValue, section), true);
			if (activeDate == null) cleanActiveDateSectionsIfValueNullTimeout.start(0, () => {
				if (valueRef.current === value) setState((prevState) => _extends({}, prevState, {
					sections: fieldValueManager.clearDateSections(state.sections, section),
					tempValueStrAndroid: null
				}));
			});
			return publishValue(fieldValueManager.updateDateInValue(value, section, mergedDate));
		}
		/**
		* If all the sections are filled but the date is invalid and the previous date is valid or null,
		* Then we publish an invalid date.
		*/
		if (newActiveDateSections.every((sectionBis) => sectionBis.value !== "") && (activeDate == null || adapter.isValid(activeDate))) {
			setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
			return publishValue(fieldValueManager.updateDateInValue(value, section, newActiveDate));
		}
		/**
		* If the previous date is not null,
		* Then we publish the date as `newActiveDate to prevent error state oscillation`.
		* @link: https://github.com/mui/mui-x/issues/17967
		*/
		if (activeDate != null) {
			setSectionUpdateToApplyOnNextInvalidDate(newSectionValue);
			publishValue(fieldValueManager.updateDateInValue(value, section, newActiveDate));
		}
		/**
		* If the previous date is already null,
		* Then we don't publish the date and we update the sections.
		*/
		return setState((prevState) => _extends({}, prevState, {
			sections: newSections,
			tempValueStrAndroid: null
		}));
	};
	const setTempAndroidValueStr = (tempValueStrAndroid) => setState((prevState) => _extends({}, prevState, { tempValueStrAndroid }));
	const setCharacterQuery = useEventCallback((newCharacterQuery) => {
		setState((prevState) => _extends({}, prevState, { characterQuery: newCharacterQuery }));
	});
	if (value !== state.lastExternalValue) {
		const isActiveDateInvalid = sectionToUpdateOnNextInvalidDateRef.current != null && !adapter.isValid(fieldValueManager.getDateFromSection(value, state.sections[sectionToUpdateOnNextInvalidDateRef.current.sectionIndex]));
		let sections;
		if (isActiveDateInvalid) sections = setSectionValue(sectionToUpdateOnNextInvalidDateRef.current.sectionIndex, sectionToUpdateOnNextInvalidDateRef.current.value);
		else sections = getSectionsFromValue(value);
		setState((prevState) => _extends({}, prevState, {
			lastExternalValue: value,
			sections,
			sectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			referenceValue: isActiveDateInvalid ? prevState.referenceValue : fieldValueManager.updateReferenceValue(adapter, value, prevState.referenceValue),
			tempValueStrAndroid: null
		}));
	}
	if (isRtl !== state.lastSectionsDependencies.isRtl || format !== state.lastSectionsDependencies.format || adapter.locale !== state.lastSectionsDependencies.locale) {
		const sections = getSectionsFromValue(value);
		validateSections(sections, valueType);
		setState((prevState) => _extends({}, prevState, {
			lastSectionsDependencies: {
				format,
				isRtl,
				locale: adapter.locale
			},
			sections,
			tempValueStrAndroid: null,
			characterQuery: null
		}));
	}
	if (state.characterQuery != null && !error && activeSectionIndex == null) setCharacterQuery(null);
	if (state.characterQuery != null && state.sections[state.characterQuery.sectionIndex]?.type !== state.characterQuery.sectionType) setCharacterQuery(null);
	import_react.useEffect(() => {
		if (sectionToUpdateOnNextInvalidDateRef.current != null) sectionToUpdateOnNextInvalidDateRef.current = null;
	});
	const cleanCharacterQueryTimeout = useTimeout();
	import_react.useEffect(() => {
		if (state.characterQuery != null) cleanCharacterQueryTimeout.start(QUERY_LIFE_DURATION_MS, () => setCharacterQuery(null));
		return () => {};
	}, [
		state.characterQuery,
		setCharacterQuery,
		cleanCharacterQueryTimeout
	]);
	import_react.useEffect(() => {
		if (state.tempValueStrAndroid != null && activeSectionIndex != null) clearActiveSection();
	}, [state.sections]);
	return {
		activeSectionIndex,
		areAllSectionsEmpty,
		error,
		localizedDigits,
		parsedSelectedSections,
		sectionOrder,
		sectionsValueBoundaries,
		state,
		timezone,
		value,
		clearValue,
		clearActiveSection,
		setCharacterQuery,
		setSelectedSections,
		setTempAndroidValueStr,
		updateSectionValue,
		updateValueFromValueStr,
		getSectionsFromValue
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldInternalPropsWithDefaults.js
/**
* Applies the default values to the field internal props.
* This is a temporary hook that will be removed during a follow up when `useField` will receive the internal props without the defaults.
* It is only here to allow the migration to be done in smaller steps.
*/
function useFieldInternalPropsWithDefaults(parameters) {
	const { manager: { internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToFieldInternalProps }, internalProps, skipContextFieldRefAssignment } = parameters;
	const pickerContext = useNullablePickerContext();
	const fieldPrivateContext = useNullableFieldPrivateContext();
	const handleFieldRef = useForkRef(internalProps.unstableFieldRef, skipContextFieldRefAssignment ? null : fieldPrivateContext?.fieldRef);
	const setValue = pickerContext?.setValue;
	const handleChangeFromPicker = import_react.useCallback((newValue, ctx) => {
		return setValue?.(newValue, {
			validationError: ctx.validationError,
			shouldClose: false
		});
	}, [setValue]);
	return useApplyDefaultValuesToFieldInternalProps(import_react.useMemo(() => {
		if (fieldPrivateContext != null && pickerContext != null) return _extends({
			value: pickerContext.value,
			onChange: handleChangeFromPicker,
			timezone: pickerContext.timezone,
			disabled: pickerContext.disabled,
			readOnly: pickerContext.readOnly,
			autoFocus: pickerContext.autoFocus && !pickerContext.open,
			focused: pickerContext.open ? true : void 0,
			format: pickerContext.fieldFormat,
			formatDensity: fieldPrivateContext.formatDensity,
			enableAccessibleFieldDOMStructure: fieldPrivateContext.enableAccessibleFieldDOMStructure,
			selectedSections: fieldPrivateContext.selectedSections,
			onSelectedSectionsChange: fieldPrivateContext.onSelectedSectionsChange,
			unstableFieldRef: handleFieldRef
		}, internalProps);
		return internalProps;
	}, [
		pickerContext,
		fieldPrivateContext,
		internalProps,
		handleChangeFromPicker,
		handleFieldRef
	]));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/syncSelectionToDOM.js
function syncSelectionToDOM(parameters) {
	const { focused, domGetters, stateResponse: { parsedSelectedSections, state } } = parameters;
	if (!domGetters.isReady()) return;
	const selection = ownerDocument(domGetters.getRoot()).getSelection();
	if (!selection) return;
	if (parsedSelectedSections == null) {
		if (selection.rangeCount > 0 && selection.getRangeAt(0).startContainer instanceof Node && domGetters.getRoot().contains(selection.getRangeAt(0).startContainer)) selection.removeAllRanges();
		if (focused) domGetters.getRoot().blur();
		return;
	}
	if (!domGetters.getRoot().contains(getActiveElement(domGetters.getRoot()))) return;
	const range = new window.Range();
	let target;
	if (parsedSelectedSections === "all") target = domGetters.getRoot();
	else if (state.sections[parsedSelectedSections].type === "empty") target = domGetters.getSectionContainer(parsedSelectedSections);
	else target = domGetters.getSectionContent(parsedSelectedSections);
	range.selectNodeContents(target);
	target.focus();
	selection.removeAllRanges();
	selection.addRange(range);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldRootHandleKeyDown.js
/**
* Returns the `onKeyDown` handler to pass to the root element of the field.
*/
function useFieldRootHandleKeyDown(parameters) {
	const adapter = usePickerAdapter();
	const { manager: { internal_fieldValueManager: fieldValueManager }, internalPropsWithDefaults: { minutesStep, disabled, readOnly }, stateResponse: { state, value, activeSectionIndex, parsedSelectedSections, sectionsValueBoundaries, localizedDigits, timezone, sectionOrder, clearValue, clearActiveSection, setSelectedSections, updateSectionValue } } = parameters;
	return useEventCallback((event) => {
		if (disabled) return;
		switch (true) {
			case (event.ctrlKey || event.metaKey) && String.fromCharCode(event.keyCode) === "A" && !event.shiftKey && !event.altKey:
				event.preventDefault();
				setSelectedSections("all");
				break;
			case event.key === "ArrowRight":
				event.preventDefault();
				if (parsedSelectedSections == null) setSelectedSections(sectionOrder.startIndex);
				else if (parsedSelectedSections === "all") setSelectedSections(sectionOrder.endIndex);
				else {
					const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].rightIndex;
					if (nextSectionIndex !== null) setSelectedSections(nextSectionIndex);
				}
				break;
			case event.key === "ArrowLeft":
				event.preventDefault();
				if (parsedSelectedSections == null) setSelectedSections(sectionOrder.endIndex);
				else if (parsedSelectedSections === "all") setSelectedSections(sectionOrder.startIndex);
				else {
					const nextSectionIndex = sectionOrder.neighbors[parsedSelectedSections].leftIndex;
					if (nextSectionIndex !== null) setSelectedSections(nextSectionIndex);
				}
				break;
			case event.key === "Delete":
				event.preventDefault();
				if (readOnly) break;
				if (parsedSelectedSections == null || parsedSelectedSections === "all") clearValue();
				else clearActiveSection();
				break;
			case [
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End",
				"PageUp",
				"PageDown"
			].includes(event.key): {
				event.preventDefault();
				if (readOnly || activeSectionIndex == null) break;
				if (parsedSelectedSections === "all") setSelectedSections(activeSectionIndex);
				const activeSection = state.sections[activeSectionIndex];
				updateSectionValue({
					section: activeSection,
					newSectionValue: adjustSectionValue(adapter, timezone, activeSection, event.key, sectionsValueBoundaries, localizedDigits, fieldValueManager.getDateFromSection(value, activeSection), { minutesStep }),
					shouldGoToNextSection: false
				});
				break;
			}
		}
	});
}
function getDeltaFromKeyCode(keyCode) {
	switch (keyCode) {
		case "ArrowUp": return 1;
		case "ArrowDown": return -1;
		case "PageUp": return 5;
		case "PageDown": return -5;
		default: return 0;
	}
}
function adjustSectionValue(adapter, timezone, section, keyCode, sectionsValueBoundaries, localizedDigits, activeDate, stepsAttributes) {
	const delta = getDeltaFromKeyCode(keyCode);
	const isStart = keyCode === "Home";
	const isEnd = keyCode === "End";
	const shouldSetAbsolute = section.value === "" || isStart || isEnd;
	const adjustDigitSection = () => {
		const sectionBoundaries = sectionsValueBoundaries[section.type]({
			currentDate: activeDate,
			format: section.format,
			contentType: section.contentType
		});
		const getCleanValue = (value) => cleanDigitSectionValue(adapter, value, sectionBoundaries, localizedDigits, section);
		const step = section.type === "minutes" && stepsAttributes?.minutesStep ? stepsAttributes.minutesStep : 1;
		let newSectionValueNumber;
		if (shouldSetAbsolute) {
			if (section.type === "year" && !isEnd && !isStart) return adapter.formatByString(adapter.date(void 0, timezone), section.format);
			if (delta > 0 || isStart) newSectionValueNumber = sectionBoundaries.minimum;
			else newSectionValueNumber = sectionBoundaries.maximum;
		} else newSectionValueNumber = parseInt(removeLocalizedDigits(section.value, localizedDigits), 10) + delta * step;
		if (newSectionValueNumber % step !== 0) {
			if (delta < 0 || isStart) newSectionValueNumber += step - (step + newSectionValueNumber) % step;
			if (delta > 0 || isEnd) newSectionValueNumber -= newSectionValueNumber % step;
		}
		if (newSectionValueNumber > sectionBoundaries.maximum) return getCleanValue(sectionBoundaries.minimum + (newSectionValueNumber - sectionBoundaries.maximum - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
		if (newSectionValueNumber < sectionBoundaries.minimum) return getCleanValue(sectionBoundaries.maximum - (sectionBoundaries.minimum - newSectionValueNumber - 1) % (sectionBoundaries.maximum - sectionBoundaries.minimum + 1));
		return getCleanValue(newSectionValueNumber);
	};
	const adjustLetterSection = () => {
		const options = getLetterEditingOptions(adapter, timezone, section.type, section.format);
		if (options.length === 0) return section.value;
		if (shouldSetAbsolute) {
			if (delta > 0 || isStart) return options[0];
			return options[options.length - 1];
		}
		return options[((options.indexOf(section.value) + delta) % options.length + options.length) % options.length];
	};
	if (section.contentType === "digit" || section.contentType === "digit-with-letter") return adjustDigitSection();
	return adjustLetterSection();
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldRootProps.js
/**
* Generate the props to pass to the root element of the field.
* It is not used by the non-accessible DOM structure (with an <input /> element for editing).
* It should be used in the MUI accessible DOM structure and the Base UI implementation.
* @param {UseFieldRootPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldRootPropsReturnValue} The props to forward to the root element of the field.
*/
function useFieldRootProps(parameters) {
	const { manager, focused, setFocused, domGetters, stateResponse, applyCharacterEditing, internalPropsWithDefaults, stateResponse: { parsedSelectedSections, sectionOrder, state, clearValue, setCharacterQuery, setSelectedSections, updateValueFromValueStr }, internalPropsWithDefaults: { disabled = false, readOnly = false } } = parameters;
	const handleKeyDown = useFieldRootHandleKeyDown({
		manager,
		internalPropsWithDefaults,
		stateResponse
	});
	const containerClickTimeout = useTimeout();
	const handleClick = useEventCallback((event) => {
		if (disabled || !domGetters.isReady()) return;
		setFocused(true);
		if (parsedSelectedSections === "all") containerClickTimeout.start(0, () => {
			const cursorPosition = document.getSelection().getRangeAt(0).startOffset;
			if (cursorPosition === 0) {
				setSelectedSections(sectionOrder.startIndex);
				return;
			}
			let sectionIndex = 0;
			let cursorOnStartOfSection = 0;
			while (cursorOnStartOfSection < cursorPosition && sectionIndex < state.sections.length) {
				const section = state.sections[sectionIndex];
				sectionIndex += 1;
				cursorOnStartOfSection += `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`.length;
			}
			setSelectedSections(sectionIndex - 1);
		});
		else if (!focused) {
			setFocused(true);
			setSelectedSections(sectionOrder.startIndex);
		} else if (!domGetters.getRoot().contains(event.target)) setSelectedSections(sectionOrder.startIndex);
	});
	const handleInput = useEventCallback((event) => {
		if (!domGetters.isReady() || parsedSelectedSections !== "all") return;
		const keyPressed = event.target.textContent ?? "";
		domGetters.getRoot().innerHTML = state.sections.map((section) => `${section.startSeparator}${section.value || section.placeholder}${section.endSeparator}`).join("");
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
		if (keyPressed.length === 0 || keyPressed.charCodeAt(0) === 10) {
			clearValue();
			setSelectedSections("all");
		} else if (keyPressed.length > 1) updateValueFromValueStr(keyPressed);
		else {
			if (parsedSelectedSections === "all") setSelectedSections(0);
			applyCharacterEditing({
				keyPressed,
				sectionIndex: 0
			});
		}
	});
	const handlePaste = useEventCallback((event) => {
		if (readOnly || parsedSelectedSections !== "all") {
			event.preventDefault();
			return;
		}
		const pastedValue = event.clipboardData.getData("text");
		event.preventDefault();
		setCharacterQuery(null);
		updateValueFromValueStr(pastedValue);
	});
	const handleFocus = useEventCallback(() => {
		if (focused || disabled || !domGetters.isReady()) return;
		const activeElement = getActiveElement(domGetters.getRoot());
		setFocused(true);
		if (!(domGetters.getSectionIndexFromDOMElement(activeElement) != null)) setSelectedSections(sectionOrder.startIndex);
	});
	return {
		onKeyDown: handleKeyDown,
		onBlur: useEventCallback(() => {
			setTimeout(() => {
				if (!domGetters.isReady()) return;
				const activeElement = getActiveElement(domGetters.getRoot());
				if (!domGetters.getRoot().contains(activeElement)) {
					setFocused(false);
					setSelectedSections(null);
				}
			});
		}),
		onFocus: handleFocus,
		onClick: handleClick,
		onPaste: handlePaste,
		onInput: handleInput,
		contentEditable: parsedSelectedSections === "all",
		tabIndex: internalPropsWithDefaults.disabled || parsedSelectedSections === 0 ? -1 : 0
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldHiddenInputProps.js
/**
* Generate the props to pass to the hidden input element of the field.
* It is not used by the non-accessible DOM structure (with an <input /> element for editing).
* It should be used in the MUI accessible DOM structure and the Base UI implementation.
* @param {UseFieldHiddenInputPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldHiddenInputPropsReturnValue} The props to forward to the hidden input element of the field.
*/
function useFieldHiddenInputProps(parameters) {
	const { manager: { internal_fieldValueManager: fieldValueManager }, stateResponse: { areAllSectionsEmpty, state, updateValueFromValueStr } } = parameters;
	const handleChange = useEventCallback((event) => {
		updateValueFromValueStr(event.target.value);
	});
	return {
		value: import_react.useMemo(() => areAllSectionsEmpty ? "" : fieldValueManager.getV7HiddenInputValueFromSections(state.sections), [
			areAllSectionsEmpty,
			state.sections,
			fieldValueManager
		]),
		onChange: handleChange
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldSectionContainerProps.js
/**
* Generate the props to pass to the container element of each section of the field.
* It is not used by the non-accessible DOM structure (with an <input /> element for editing).
* It should be used in the MUI accessible DOM structure and the Base UI implementation.
* @param {UseFieldRootPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldRootPropsReturnValue} The props to forward to the container element of each section of the field.
*/
function useFieldSectionContainerProps(parameters) {
	const { stateResponse: { setSelectedSections }, internalPropsWithDefaults: { disabled = false } } = parameters;
	const createHandleClick = import_react.useCallback((sectionIndex) => (event) => {
		if (disabled || event.isDefaultPrevented()) return;
		setSelectedSections(sectionIndex);
	}, [disabled, setSelectedSections]);
	return import_react.useCallback((sectionIndex) => ({
		"data-sectionindex": sectionIndex,
		onClick: createHandleClick(sectionIndex)
	}), [createHandleClick]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldSectionContentProps.js
/**
* Generate the props to pass to the content element of each section of the field.
* It is not used by the non-accessible DOM structure (with an <input /> element for editing).
* It should be used in the MUI accessible DOM structure and the Base UI implementation.
* @param {UseFieldRootPropsParameters} parameters The parameters of the hook.
* @returns {UseFieldRootPropsReturnValue} The props to forward to the content element of each section of the field.
*/
function useFieldSectionContentProps(parameters) {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const { focused, domGetters, stateResponse, applyCharacterEditing, manager: { internal_fieldValueManager: fieldValueManager }, stateResponse: { parsedSelectedSections, sectionsValueBoundaries, state, value, clearActiveSection, setCharacterQuery, setSelectedSections, updateSectionValue, updateValueFromValueStr }, internalPropsWithDefaults: { disabled = false, readOnly = false } } = parameters;
	const isContainerEditable = parsedSelectedSections === "all";
	const isEditable = !isContainerEditable && !disabled && !readOnly;
	/**
	* If a section content has been updated with a value we don't want to keep,
	* Then we need to imperatively revert it (we can't let React do it because the value did not change in his internal representation).
	*/
	const revertDOMSectionChange = useEventCallback((sectionIndex) => {
		if (!domGetters.isReady()) return;
		const section = state.sections[sectionIndex];
		domGetters.getSectionContent(sectionIndex).innerHTML = section.value || section.placeholder;
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
	});
	const handleInput = useEventCallback((event) => {
		if (!domGetters.isReady()) return;
		const target = event.target;
		const keyPressed = target.textContent ?? "";
		const sectionIndex = domGetters.getSectionIndexFromDOMElement(target);
		const section = state.sections[sectionIndex];
		if (readOnly) {
			revertDOMSectionChange(sectionIndex);
			return;
		}
		if (keyPressed.length === 0) {
			if (section.value === "") {
				revertDOMSectionChange(sectionIndex);
				return;
			}
			const inputType = event.nativeEvent.inputType;
			if (inputType === "insertParagraph" || inputType === "insertLineBreak") {
				revertDOMSectionChange(sectionIndex);
				return;
			}
			revertDOMSectionChange(sectionIndex);
			clearActiveSection();
			return;
		}
		applyCharacterEditing({
			keyPressed,
			sectionIndex
		});
		revertDOMSectionChange(sectionIndex);
	});
	const handleMouseUp = useEventCallback((event) => {
		event.preventDefault();
	});
	const handlePaste = useEventCallback((event) => {
		event.preventDefault();
		if (readOnly || disabled || typeof parsedSelectedSections !== "number") return;
		const activeSection = state.sections[parsedSelectedSections];
		const pastedValue = event.clipboardData.getData("text");
		const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
		const digitsOnly = /^[0-9]+$/.test(pastedValue);
		const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
		if (activeSection.contentType === "letter" && lettersOnly || activeSection.contentType === "digit" && digitsOnly || activeSection.contentType === "digit-with-letter" && digitsAndLetterOnly) {
			setCharacterQuery(null);
			updateSectionValue({
				section: activeSection,
				newSectionValue: pastedValue,
				shouldGoToNextSection: true
			});
		} else if (!lettersOnly && !digitsOnly) {
			setCharacterQuery(null);
			updateValueFromValueStr(pastedValue);
		}
	});
	const handleDragOver = useEventCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "none";
	});
	const createFocusHandler = import_react.useCallback((sectionIndex) => () => {
		if (disabled) return;
		setSelectedSections(sectionIndex);
	}, [disabled, setSelectedSections]);
	return import_react.useCallback((section, sectionIndex) => {
		const sectionBoundaries = sectionsValueBoundaries[section.type]({
			currentDate: fieldValueManager.getDateFromSection(value, section),
			contentType: section.contentType,
			format: section.format
		});
		return {
			onInput: handleInput,
			onPaste: handlePaste,
			onMouseUp: handleMouseUp,
			onDragOver: handleDragOver,
			onFocus: createFocusHandler(sectionIndex),
			"aria-readonly": readOnly,
			"aria-valuenow": getSectionValueNow(section, adapter),
			"aria-valuemin": sectionBoundaries.minimum,
			"aria-valuemax": sectionBoundaries.maximum,
			"aria-valuetext": section.value ? getSectionValueText(section, adapter) : translations.empty,
			"aria-label": translations[section.type],
			"aria-disabled": disabled,
			tabIndex: !isEditable || isContainerEditable || sectionIndex > 0 ? -1 : 0,
			contentEditable: !isContainerEditable && !disabled && !readOnly,
			role: "spinbutton",
			"data-range-position": section.dateName || void 0,
			spellCheck: isEditable ? false : void 0,
			autoCapitalize: isEditable ? "none" : void 0,
			autoCorrect: isEditable ? "off" : void 0,
			children: section.value || section.placeholder,
			inputMode: section.contentType === "letter" ? "text" : "numeric"
		};
	}, [
		sectionsValueBoundaries,
		isContainerEditable,
		disabled,
		readOnly,
		isEditable,
		translations,
		adapter,
		handleInput,
		handlePaste,
		handleMouseUp,
		handleDragOver,
		createFocusHandler,
		fieldValueManager,
		value
	]);
}
function getSectionValueText(section, adapter) {
	if (!section.value) return;
	switch (section.type) {
		case "month": {
			if (section.contentType === "digit") {
				const dateWithMonth = adapter.setMonth(adapter.date(), Number(section.value) - 1);
				return adapter.isValid(dateWithMonth) ? adapter.format(dateWithMonth, "month") : "";
			}
			const parsedDate = adapter.parse(section.value, section.format);
			return parsedDate && adapter.isValid(parsedDate) ? adapter.format(parsedDate, "month") : void 0;
		}
		case "day":
			if (section.contentType === "digit") {
				const dateWithDay = adapter.setDate(adapter.startOfYear(adapter.date()), Number(section.value));
				return adapter.isValid(dateWithDay) ? adapter.format(dateWithDay, "dayOfMonthFull") : "";
			}
			return section.value;
		case "weekDay": return;
		default: return;
	}
}
function getSectionValueNow(section, adapter) {
	if (!section.value) return;
	switch (section.type) {
		case "weekDay":
			if (section.contentType === "letter") return;
			return Number(section.value);
		case "meridiem": {
			const parsedDate = adapter.parse(`01:00 ${section.value}`, `${adapter.formats.hours12h}:${adapter.formats.minutes} ${section.format}`);
			if (parsedDate) return adapter.getHours(parsedDate) >= 12 ? 1 : 0;
			return;
		}
		case "day": return section.contentType === "digit-with-letter" ? parseInt(section.value, 10) : Number(section.value);
		case "month": {
			if (section.contentType === "digit") return Number(section.value);
			const parsedDate = adapter.parse(section.value, section.format);
			return parsedDate ? adapter.getMonth(parsedDate) + 1 : void 0;
		}
		default: return section.contentType !== "letter" ? Number(section.value) : void 0;
	}
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldV7TextField.js
var useFieldV7TextField = (parameters) => {
	const { props, manager, skipContextFieldRefAssignment, manager: { valueType, internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel } } = parameters;
	const { internalProps, forwardedProps } = useSplitFieldProps(props, valueType);
	const internalPropsWithDefaults = useFieldInternalPropsWithDefaults({
		manager,
		internalProps,
		skipContextFieldRefAssignment
	});
	const { sectionListRef: sectionListRefProp, onBlur, onClick, onFocus, onInput, onPaste, onKeyDown, onClear, clearable } = forwardedProps;
	const { disabled = false, readOnly = false, autoFocus = false, focused: focusedProp, unstableFieldRef } = internalPropsWithDefaults;
	const sectionListRef = import_react.useRef(null);
	const handleSectionListRef = useForkRef(sectionListRefProp, sectionListRef);
	const domGetters = import_react.useMemo(() => ({
		isReady: () => sectionListRef.current != null,
		getRoot: () => sectionListRef.current.getRoot(),
		getSectionContainer: (sectionIndex) => sectionListRef.current.getSectionContainer(sectionIndex),
		getSectionContent: (sectionIndex) => sectionListRef.current.getSectionContent(sectionIndex),
		getSectionIndexFromDOMElement: (element) => sectionListRef.current.getSectionIndexFromDOMElement(element)
	}), [sectionListRef]);
	const stateResponse = useFieldState({
		manager,
		internalPropsWithDefaults,
		forwardedProps
	});
	const { areAllSectionsEmpty, error, parsedSelectedSections, sectionOrder, state, value, clearValue, setSelectedSections } = stateResponse;
	const applyCharacterEditing = useFieldCharacterEditing({ stateResponse });
	const openPickerAriaLabel = useOpenPickerButtonAriaLabel(value);
	const [focused, setFocused] = import_react.useState(false);
	function focusField(newSelectedSections = 0) {
		if (disabled || !sectionListRef.current || getActiveSectionIndex(sectionListRef) != null) return;
		const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
		setFocused(true);
		sectionListRef.current.getSectionContent(newParsedSelectedSections).focus();
	}
	const rootProps = useFieldRootProps({
		manager,
		internalPropsWithDefaults,
		stateResponse,
		applyCharacterEditing,
		focused,
		setFocused,
		domGetters
	});
	const hiddenInputProps = useFieldHiddenInputProps({
		manager,
		stateResponse
	});
	const createSectionContainerProps = useFieldSectionContainerProps({
		stateResponse,
		internalPropsWithDefaults
	});
	const createSectionContentProps = useFieldSectionContentProps({
		manager,
		stateResponse,
		applyCharacterEditing,
		internalPropsWithDefaults,
		domGetters,
		focused
	});
	const handleRootKeyDown = useEventCallback((event) => {
		onKeyDown?.(event);
		rootProps.onKeyDown(event);
	});
	const handleRootBlur = useEventCallback((event) => {
		onBlur?.(event);
		rootProps.onBlur(event);
	});
	const handleRootFocus = useEventCallback((event) => {
		onFocus?.(event);
		rootProps.onFocus(event);
	});
	const handleRootClick = useEventCallback((event) => {
		if (event.isDefaultPrevented()) return;
		onClick?.(event);
		rootProps.onClick(event);
	});
	const handleRootPaste = useEventCallback((event) => {
		onPaste?.(event);
		rootProps.onPaste(event);
	});
	const handleRootInput = useEventCallback((event) => {
		onInput?.(event);
		rootProps.onInput(event);
	});
	const handleClear = useEventCallback((event, ...args) => {
		event.preventDefault();
		onClear?.(event, ...args);
		clearValue();
		if (!isFieldFocused$1(sectionListRef)) focusField(0);
		else setSelectedSections(sectionOrder.startIndex);
	});
	const elements = import_react.useMemo(() => {
		return state.sections.map((section, sectionIndex) => {
			const content = createSectionContentProps(section, sectionIndex);
			return {
				container: createSectionContainerProps(sectionIndex),
				content: createSectionContentProps(section, sectionIndex),
				before: { children: section.startSeparator },
				after: {
					children: section.endSeparator,
					"data-range-position": section.isEndFormatSeparator ? content["data-range-position"] : void 0
				}
			};
		});
	}, [
		state.sections,
		createSectionContainerProps,
		createSectionContentProps
	]);
	import_react.useEffect(() => {
		if (sectionListRef.current == null) throw new Error([
			"MUI X: The `sectionListRef` prop has not been initialized by `PickersSectionList`",
			"You probably tried to pass a component to the `textField` slot that contains an `<input />` element instead of a `PickersSectionList`.",
			"",
			"If you want to keep using an `<input />` HTML element for the editing, please add the `enableAccessibleFieldDOMStructure={false}` prop to your Picker or Field component:",
			"",
			"<DatePicker enableAccessibleFieldDOMStructure={false} slots={{ textField: MyCustomTextField }} />",
			"",
			"Learn more about the field accessible DOM structure on the MUI documentation: https://mui.com/x/react-date-pickers/fields/#fields-to-edit-a-single-element"
		].join("\n"));
		if (autoFocus && !disabled && sectionListRef.current) sectionListRef.current.getSectionContent(sectionOrder.startIndex).focus();
	}, []);
	useEnhancedEffect(() => {
		if (!focused || !sectionListRef.current) return;
		if (parsedSelectedSections === "all") sectionListRef.current.getRoot().focus();
		else if (typeof parsedSelectedSections === "number") {
			const domElement = sectionListRef.current.getSectionContent(parsedSelectedSections);
			if (domElement) domElement.focus();
		}
	}, [parsedSelectedSections, focused]);
	useEnhancedEffect(() => {
		syncSelectionToDOM({
			focused,
			domGetters,
			stateResponse
		});
	});
	import_react.useImperativeHandle(unstableFieldRef, () => ({
		getSections: () => state.sections,
		getActiveSectionIndex: () => getActiveSectionIndex(sectionListRef),
		setSelectedSections: (newSelectedSections) => {
			if (disabled || !sectionListRef.current) return;
			const newParsedSelectedSections = parseSelectedSections(newSelectedSections, state.sections);
			setFocused((newParsedSelectedSections === "all" ? 0 : newParsedSelectedSections) !== null);
			setSelectedSections(newSelectedSections);
		},
		focusField,
		isFieldFocused: () => isFieldFocused$1(sectionListRef)
	}));
	return _extends({}, forwardedProps, rootProps, {
		onBlur: handleRootBlur,
		onClick: handleRootClick,
		onFocus: handleRootFocus,
		onInput: handleRootInput,
		onPaste: handleRootPaste,
		onKeyDown: handleRootKeyDown,
		onClear: handleClear
	}, hiddenInputProps, {
		error,
		clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled),
		focused: focusedProp ?? focused,
		sectionListRef: handleSectionListRef,
		enableAccessibleFieldDOMStructure: true,
		elements,
		areAllSectionsEmpty,
		disabled,
		readOnly,
		autoFocus,
		openPickerAriaLabel
	});
};
function getActiveSectionIndex(sectionListRef) {
	const activeElement = getActiveElement(sectionListRef.current?.getRoot());
	if (!activeElement || !sectionListRef.current || !sectionListRef.current.getRoot().contains(activeElement)) return null;
	return sectionListRef.current.getSectionIndexFromDOMElement(activeElement);
}
function isFieldFocused$1(sectionListRef) {
	const activeElement = getActiveElement(sectionListRef.current?.getRoot());
	return !!sectionListRef.current && sectionListRef.current.getRoot().contains(activeElement);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useFieldV6TextField.js
var cleanString = (dirtyString) => dirtyString.replace(/[\u2066\u2067\u2068\u2069]/g, "");
var addPositionPropertiesToSections = (sections, localizedDigits, isRtl) => {
	let position = 0;
	let positionInInput = isRtl ? 1 : 0;
	const newSections = [];
	for (let i = 0; i < sections.length; i += 1) {
		const section = sections[i];
		const renderedValue = getSectionVisibleValue(section, isRtl ? "input-rtl" : "input-ltr", localizedDigits);
		const sectionStr = `${section.startSeparator}${renderedValue}${section.endSeparator}`;
		const sectionLength = cleanString(sectionStr).length;
		const sectionLengthInInput = sectionStr.length;
		const cleanedValue = cleanString(renderedValue);
		const startInInput = positionInInput + (cleanedValue === "" ? 0 : renderedValue.indexOf(cleanedValue[0])) + section.startSeparator.length;
		const endInInput = startInInput + cleanedValue.length;
		newSections.push(_extends({}, section, {
			start: position,
			end: position + sectionLength,
			startInInput,
			endInInput
		}));
		position += sectionLength;
		positionInInput += sectionLengthInInput;
	}
	return newSections;
};
var useFieldV6TextField = (parameters) => {
	const isRtl = useRtl();
	const focusTimeout = useTimeout();
	const selectionSyncTimeout = useTimeout();
	const { props, manager, skipContextFieldRefAssignment, manager: { valueType, internal_valueManager: valueManager, internal_fieldValueManager: fieldValueManager, internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel } } = parameters;
	const { internalProps, forwardedProps } = useSplitFieldProps(props, valueType);
	const internalPropsWithDefaults = useFieldInternalPropsWithDefaults({
		manager,
		internalProps,
		skipContextFieldRefAssignment
	});
	const { onFocus, onClick, onPaste, onBlur, onKeyDown, onClear, clearable, inputRef: inputRefProp, placeholder: inPlaceholder } = forwardedProps;
	const { readOnly = false, disabled = false, autoFocus = false, focused, unstableFieldRef } = internalPropsWithDefaults;
	const inputRef = import_react.useRef(null);
	const handleRef = useForkRef(inputRefProp, inputRef);
	const stateResponse = useFieldState({
		manager,
		internalPropsWithDefaults,
		forwardedProps
	});
	const { activeSectionIndex, areAllSectionsEmpty, error, localizedDigits, parsedSelectedSections, sectionOrder, state, value, clearValue, clearActiveSection, setCharacterQuery, setSelectedSections, setTempAndroidValueStr, updateSectionValue, updateValueFromValueStr, getSectionsFromValue } = stateResponse;
	const applyCharacterEditing = useFieldCharacterEditing({ stateResponse });
	const openPickerAriaLabel = useOpenPickerButtonAriaLabel(value);
	const sections = import_react.useMemo(() => addPositionPropertiesToSections(state.sections, localizedDigits, isRtl), [
		state.sections,
		localizedDigits,
		isRtl
	]);
	function syncSelectionFromDOM() {
		const browserStartIndex = inputRef.current.selectionStart ?? 0;
		let nextSectionIndex;
		if (browserStartIndex <= sections[0].startInInput) nextSectionIndex = 1;
		else if (browserStartIndex >= sections[sections.length - 1].endInInput) nextSectionIndex = 1;
		else nextSectionIndex = sections.findIndex((section) => section.startInInput - section.startSeparator.length > browserStartIndex);
		setSelectedSections(nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1);
	}
	function focusField(newSelectedSection = 0) {
		if (getActiveElement(inputRef.current) === inputRef.current) return;
		inputRef.current?.focus();
		setSelectedSections(newSelectedSection);
	}
	const handleInputFocus = useEventCallback((event) => {
		onFocus?.(event);
		const input = inputRef.current;
		focusTimeout.start(0, () => {
			if (!input || input !== inputRef.current) return;
			if (activeSectionIndex != null) return;
			if (input.value.length && Number(input.selectionEnd) - Number(input.selectionStart) === input.value.length) setSelectedSections("all");
			else syncSelectionFromDOM();
		});
	});
	const handleInputClick = useEventCallback((event, ...args) => {
		if (event.isDefaultPrevented()) return;
		onClick?.(event, ...args);
		syncSelectionFromDOM();
	});
	const handleInputPaste = useEventCallback((event) => {
		onPaste?.(event);
		event.preventDefault();
		if (readOnly || disabled) return;
		const pastedValue = event.clipboardData.getData("text");
		if (typeof parsedSelectedSections === "number") {
			const activeSection = state.sections[parsedSelectedSections];
			const lettersOnly = /^[a-zA-Z]+$/.test(pastedValue);
			const digitsOnly = /^[0-9]+$/.test(pastedValue);
			const digitsAndLetterOnly = /^(([a-zA-Z]+)|)([0-9]+)(([a-zA-Z]+)|)$/.test(pastedValue);
			if (activeSection.contentType === "letter" && lettersOnly || activeSection.contentType === "digit" && digitsOnly || activeSection.contentType === "digit-with-letter" && digitsAndLetterOnly) {
				setCharacterQuery(null);
				updateSectionValue({
					section: activeSection,
					newSectionValue: pastedValue,
					shouldGoToNextSection: true
				});
				return;
			}
			if (lettersOnly || digitsOnly) return;
		}
		setCharacterQuery(null);
		updateValueFromValueStr(pastedValue);
	});
	const handleContainerBlur = useEventCallback((event) => {
		onBlur?.(event);
		setSelectedSections(null);
	});
	const handleInputChange = useEventCallback((event) => {
		if (readOnly) return;
		const targetValue = event.target.value;
		if (targetValue === "") {
			clearValue();
			return;
		}
		const eventData = event.nativeEvent.data;
		const shouldUseEventData = eventData && eventData.length > 1;
		const valueStr = shouldUseEventData ? eventData : targetValue;
		const cleanValueStr = cleanString(valueStr);
		if (parsedSelectedSections === "all") setSelectedSections(activeSectionIndex);
		if (activeSectionIndex == null || shouldUseEventData) {
			updateValueFromValueStr(shouldUseEventData ? eventData : cleanValueStr);
			return;
		}
		let keyPressed;
		if (parsedSelectedSections === "all" && cleanValueStr.length === 1) keyPressed = cleanValueStr;
		else {
			const prevValueStr = cleanString(fieldValueManager.getV6InputValueFromSections(sections, localizedDigits, isRtl));
			let startOfDiffIndex = -1;
			let endOfDiffIndex = -1;
			for (let i = 0; i < prevValueStr.length; i += 1) {
				if (startOfDiffIndex === -1 && prevValueStr[i] !== cleanValueStr[i]) startOfDiffIndex = i;
				if (endOfDiffIndex === -1 && prevValueStr[prevValueStr.length - i - 1] !== cleanValueStr[cleanValueStr.length - i - 1]) endOfDiffIndex = i;
			}
			const activeSection = sections[activeSectionIndex];
			if (startOfDiffIndex < activeSection.start || prevValueStr.length - endOfDiffIndex - 1 > activeSection.end) return;
			const activeSectionEndRelativeToNewValue = cleanValueStr.length - prevValueStr.length + activeSection.end - cleanString(activeSection.endSeparator || "").length;
			keyPressed = cleanValueStr.slice(activeSection.start + cleanString(activeSection.startSeparator || "").length, activeSectionEndRelativeToNewValue);
		}
		if (keyPressed.length === 0) {
			if (isAndroid()) setTempAndroidValueStr(valueStr);
			clearActiveSection();
			return;
		}
		applyCharacterEditing({
			keyPressed,
			sectionIndex: activeSectionIndex
		});
	});
	const handleClear = useEventCallback((event, ...args) => {
		event.preventDefault();
		onClear?.(event, ...args);
		clearValue();
		if (!isFieldFocused(inputRef)) focusField(0);
		else setSelectedSections(sectionOrder.startIndex);
	});
	const handleContainerKeyDown = useFieldRootHandleKeyDown({
		manager,
		internalPropsWithDefaults,
		stateResponse
	});
	const wrappedHandleContainerKeyDown = useEventCallback((event) => {
		onKeyDown?.(event);
		handleContainerKeyDown(event);
	});
	const placeholder = import_react.useMemo(() => {
		if (inPlaceholder !== void 0) return inPlaceholder;
		return fieldValueManager.getV6InputValueFromSections(getSectionsFromValue(valueManager.emptyValue), localizedDigits, isRtl);
	}, [
		inPlaceholder,
		fieldValueManager,
		getSectionsFromValue,
		valueManager.emptyValue,
		localizedDigits,
		isRtl
	]);
	const valueStr = import_react.useMemo(() => state.tempValueStrAndroid ?? fieldValueManager.getV6InputValueFromSections(state.sections, localizedDigits, isRtl), [
		state.sections,
		fieldValueManager,
		state.tempValueStrAndroid,
		localizedDigits,
		isRtl
	]);
	import_react.useEffect(() => {
		if (inputRef.current && inputRef.current === getActiveElement(inputRef.current)) setSelectedSections("all");
	}, []);
	useEnhancedEffect(() => {
		function syncSelectionToDOM() {
			if (!inputRef.current) return;
			if (parsedSelectedSections == null) {
				if (inputRef.current.scrollLeft) inputRef.current.scrollLeft = 0;
				return;
			}
			if (inputRef.current !== getActiveElement(inputRef.current)) return;
			const currentScrollTop = inputRef.current.scrollTop;
			if (parsedSelectedSections === "all") inputRef.current.select();
			else {
				const selectedSection = sections[parsedSelectedSections];
				const selectionStart = selectedSection.type === "empty" ? selectedSection.startInInput - selectedSection.startSeparator.length : selectedSection.startInInput;
				const selectionEnd = selectedSection.type === "empty" ? selectedSection.endInInput + selectedSection.endSeparator.length : selectedSection.endInInput;
				if (selectionStart !== inputRef.current.selectionStart || selectionEnd !== inputRef.current.selectionEnd) {
					if (inputRef.current === getActiveElement(inputRef.current)) inputRef.current.setSelectionRange(selectionStart, selectionEnd);
				}
				selectionSyncTimeout.start(0, () => {
					if (inputRef.current && inputRef.current === getActiveElement(inputRef.current) && inputRef.current.selectionStart === inputRef.current.selectionEnd && (inputRef.current.selectionStart !== selectionStart || inputRef.current.selectionEnd !== selectionEnd)) syncSelectionToDOM();
				});
			}
			inputRef.current.scrollTop = currentScrollTop;
		}
		syncSelectionToDOM();
	});
	const inputMode = import_react.useMemo(() => {
		if (activeSectionIndex == null) return "text";
		if (state.sections[activeSectionIndex].contentType === "letter") return "text";
		return "numeric";
	}, [activeSectionIndex, state.sections]);
	const shouldShowPlaceholder = !(inputRef.current && inputRef.current === getActiveElement(inputRef.current)) && areAllSectionsEmpty;
	import_react.useImperativeHandle(unstableFieldRef, () => ({
		getSections: () => state.sections,
		getActiveSectionIndex: () => {
			const browserStartIndex = inputRef.current.selectionStart ?? 0;
			const browserEndIndex = inputRef.current.selectionEnd ?? 0;
			if (browserStartIndex === 0 && browserEndIndex === 0) return null;
			const nextSectionIndex = browserStartIndex <= sections[0].startInInput ? 1 : sections.findIndex((section) => section.startInInput - section.startSeparator.length > browserStartIndex);
			return nextSectionIndex === -1 ? sections.length - 1 : nextSectionIndex - 1;
		},
		setSelectedSections: (newSelectedSections) => setSelectedSections(newSelectedSections),
		focusField,
		isFieldFocused: () => isFieldFocused(inputRef)
	}));
	return _extends({}, forwardedProps, {
		error,
		"aria-invalid": error,
		clearable: Boolean(clearable && !areAllSectionsEmpty && !readOnly && !disabled),
		onBlur: handleContainerBlur,
		onClick: handleInputClick,
		onFocus: handleInputFocus,
		onPaste: handleInputPaste,
		onKeyDown: wrappedHandleContainerKeyDown,
		onClear: handleClear,
		inputRef: handleRef,
		enableAccessibleFieldDOMStructure: false,
		placeholder,
		inputMode,
		autoComplete: "off",
		value: shouldShowPlaceholder ? "" : valueStr,
		onChange: handleInputChange,
		focused,
		disabled,
		readOnly,
		autoFocus,
		openPickerAriaLabel
	});
};
function isFieldFocused(inputRef) {
	return inputRef.current === getActiveElement(inputRef.current);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useField/useField.js
var useField = (parameters) => {
	const fieldPrivateContext = useNullableFieldPrivateContext();
	return (parameters.props.enableAccessibleFieldDOMStructure ?? fieldPrivateContext?.enableAccessibleFieldDOMStructure ?? true ? useFieldV7TextField : useFieldV6TextField)(parameters);
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/managers/useDateManager.js
function useDateManager(parameters = {}) {
	const { enableAccessibleFieldDOMStructure = true } = parameters;
	return import_react.useMemo(() => ({
		valueType: "date",
		validator: validateDate,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateFieldInternalProps,
		internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel$1
	}), [enableAccessibleFieldDOMStructure]);
}
function useOpenPickerButtonAriaLabel$1(value) {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	return import_react.useMemo(() => {
		const formattedValue = adapter.isValid(value) ? adapter.format(value, "fullDate") : null;
		return translations.openDatePickerDialogue(formattedValue);
	}, [
		value,
		translations,
		adapter
	]);
}
function useApplyDefaultValuesToDateFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToDateValidationProps(internalProps);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? adapter.formats.keyboardDate }), [
		internalProps,
		validationProps,
		adapter
	]);
}
function useApplyDefaultValuesToDateValidationProps(props) {
	const adapter = usePickerAdapter();
	const defaultDates = useDefaultDates();
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false,
		minDate: applyDefaultDate(adapter, props.minDate, defaultDates.minDate),
		maxDate: applyDefaultDate(adapter, props.maxDate, defaultDates.maxDate)
	}), [
		props.minDate,
		props.maxDate,
		props.disableFuture,
		props.disablePast,
		adapter,
		defaultDates
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/managers/useTimeManager.js
function useTimeManager(parameters = {}) {
	const { enableAccessibleFieldDOMStructure = true, ampm } = parameters;
	return import_react.useMemo(() => ({
		valueType: "time",
		validator: validateTime,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToTimeFieldInternalProps,
		internal_useOpenPickerButtonAriaLabel: createUseOpenPickerButtonAriaLabel(ampm)
	}), [ampm, enableAccessibleFieldDOMStructure]);
}
function createUseOpenPickerButtonAriaLabel(ampm) {
	return function useOpenPickerButtonAriaLabel(value) {
		const adapter = usePickerAdapter();
		const translations = usePickerTranslations();
		return import_react.useMemo(() => {
			const formatKey = ampm ?? adapter.is12HourCycleInCurrentLocale() ? "fullTime12h" : "fullTime24h";
			const formattedValue = adapter.isValid(value) ? adapter.format(value, formatKey) : null;
			return translations.openTimePickerDialogue(formattedValue);
		}, [
			value,
			translations,
			adapter
		]);
	};
}
function useApplyDefaultValuesToTimeFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToTimeValidationProps(internalProps);
	const ampm = import_react.useMemo(() => internalProps.ampm ?? adapter.is12HourCycleInCurrentLocale(), [internalProps.ampm, adapter]);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? (ampm ? adapter.formats.fullTime12h : adapter.formats.fullTime24h) }), [
		internalProps,
		validationProps,
		ampm,
		adapter
	]);
}
function useApplyDefaultValuesToTimeValidationProps(props) {
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false
	}), [props.disablePast, props.disableFuture]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/managers/useDateTimeManager.js
function useDateTimeManager(parameters = {}) {
	const { enableAccessibleFieldDOMStructure = true } = parameters;
	return import_react.useMemo(() => ({
		valueType: "date-time",
		validator: validateDateTime,
		internal_valueManager: singleItemValueManager,
		internal_fieldValueManager: singleItemFieldValueManager,
		internal_enableAccessibleFieldDOMStructure: enableAccessibleFieldDOMStructure,
		internal_useApplyDefaultValuesToFieldInternalProps: useApplyDefaultValuesToDateTimeFieldInternalProps,
		internal_useOpenPickerButtonAriaLabel: useOpenPickerButtonAriaLabel
	}), [enableAccessibleFieldDOMStructure]);
}
function useOpenPickerButtonAriaLabel(value) {
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	return import_react.useMemo(() => {
		const formattedValue = adapter.isValid(value) ? adapter.format(value, "fullDate") : null;
		return translations.openDatePickerDialogue(formattedValue);
	}, [
		value,
		translations,
		adapter
	]);
}
function useApplyDefaultValuesToDateTimeFieldInternalProps(internalProps) {
	const adapter = usePickerAdapter();
	const validationProps = useApplyDefaultValuesToDateTimeValidationProps(internalProps);
	const ampm = import_react.useMemo(() => internalProps.ampm ?? adapter.is12HourCycleInCurrentLocale(), [internalProps.ampm, adapter]);
	return import_react.useMemo(() => _extends({}, internalProps, validationProps, { format: internalProps.format ?? (ampm ? adapter.formats.keyboardDateTime12h : adapter.formats.keyboardDateTime24h) }), [
		internalProps,
		validationProps,
		ampm,
		adapter
	]);
}
function useApplyDefaultValuesToDateTimeValidationProps(props) {
	const adapter = usePickerAdapter();
	const defaultDates = useDefaultDates();
	return import_react.useMemo(() => ({
		disablePast: props.disablePast ?? false,
		disableFuture: props.disableFuture ?? false,
		disableIgnoringDatePartForTimeValidation: !!props.minDateTime || !!props.maxDateTime || !!props.disableFuture || !!props.disablePast,
		minDate: applyDefaultDate(adapter, props.minDateTime ?? props.minDate, defaultDates.minDate),
		maxDate: applyDefaultDate(adapter, props.maxDateTime ?? props.maxDate, defaultDates.maxDate),
		minTime: props.minDateTime ?? props.minTime,
		maxTime: props.maxDateTime ?? props.maxTime
	}), [
		props.minDateTime,
		props.maxDateTime,
		props.minTime,
		props.maxTime,
		props.minDate,
		props.maxDate,
		props.disableFuture,
		props.disablePast,
		adapter,
		defaultDates
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateField/useDateField.js
var useDateField = (props) => {
	return useField({
		manager: useDateManager(props),
		props
	});
};
//#endregion
//#region node_modules/@mui/material/esm/TextareaAutosize/TextareaAutosize.js
function getStyleValue(value) {
	return parseInt(value, 10) || 0;
}
var styles$3 = { shadow: {
	visibility: "hidden",
	position: "absolute",
	overflow: "hidden",
	height: 0,
	top: 0,
	left: 0,
	transform: "translateZ(0)"
} };
function isObjectEmpty(object) {
	for (const _ in object) return false;
	return true;
}
function isEmpty$1(obj) {
	return isObjectEmpty(obj) || obj.outerHeightStyle === 0 && !obj.overflowing;
}
/**
*
* Demos:
*
* - [Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/)
*
* API:
*
* - [TextareaAutosize API](https://mui.com/material-ui/api/textarea-autosize/)
*/
var TextareaAutosize = /* @__PURE__ */ import_react.forwardRef(function TextareaAutosize(props, forwardedRef) {
	const { onChange, maxRows, minRows = 1, style, value, ...other } = props;
	const { current: isControlled } = import_react.useRef(value != null);
	const textareaRef = import_react.useRef(null);
	const handleRef = useForkRef(forwardedRef, textareaRef);
	const heightRef = import_react.useRef(null);
	const hiddenTextareaRef = import_react.useRef(null);
	const calculateTextareaStyles = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const hiddenTextarea = hiddenTextareaRef.current;
		if (!textarea || !hiddenTextarea) return;
		const computedStyle = ownerWindow(textarea).getComputedStyle(textarea);
		if (computedStyle.width === "0px") return {
			outerHeightStyle: 0,
			overflowing: false
		};
		hiddenTextarea.style.width = computedStyle.width;
		hiddenTextarea.value = textarea.value || props.placeholder || "x";
		if (hiddenTextarea.value.slice(-1) === "\n") hiddenTextarea.value += " ";
		const boxSizing = computedStyle.boxSizing;
		const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
		const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
		const innerHeight = hiddenTextarea.scrollHeight;
		hiddenTextarea.value = "x";
		const singleRowHeight = hiddenTextarea.scrollHeight;
		let outerHeight = innerHeight;
		if (minRows) outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
		if (maxRows) outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
		outerHeight = Math.max(outerHeight, singleRowHeight);
		return {
			outerHeightStyle: outerHeight + (boxSizing === "border-box" ? padding + border : 0),
			overflowing: Math.abs(outerHeight - innerHeight) <= 1
		};
	}, [
		maxRows,
		minRows,
		props.placeholder
	]);
	const didHeightChange = useEventCallback(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return false;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		return heightRef.current != null && heightRef.current !== outerHeightStyle;
	});
	const syncHeight = import_react.useCallback(() => {
		const textarea = textareaRef.current;
		const textareaStyles = calculateTextareaStyles();
		if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) return;
		const outerHeightStyle = textareaStyles.outerHeightStyle;
		if (heightRef.current !== outerHeightStyle) {
			heightRef.current = outerHeightStyle;
			textarea.style.height = `${outerHeightStyle}px`;
		}
		textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
	}, [calculateTextareaStyles]);
	const frameRef = import_react.useRef(-1);
	useEnhancedEffect(() => {
		const debouncedHandleResize = debounce$1(syncHeight);
		const textarea = textareaRef?.current;
		if (!textarea) return;
		const containerWindow = ownerWindow(textarea);
		containerWindow.addEventListener("resize", debouncedHandleResize);
		let resizeObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(() => {
				if (didHeightChange()) {
					resizeObserver.unobserve(textarea);
					cancelAnimationFrame(frameRef.current);
					syncHeight();
					frameRef.current = requestAnimationFrame(() => {
						resizeObserver.observe(textarea);
					});
				}
			});
			resizeObserver.observe(textarea);
		}
		return () => {
			debouncedHandleResize.clear();
			cancelAnimationFrame(frameRef.current);
			containerWindow.removeEventListener("resize", debouncedHandleResize);
			if (resizeObserver) resizeObserver.disconnect();
		};
	}, [
		calculateTextareaStyles,
		syncHeight,
		didHeightChange
	]);
	useEnhancedEffect(() => {
		syncHeight();
	});
	const handleChange = (event) => {
		if (!isControlled) syncHeight();
		const textarea = event.target;
		const countOfCharacters = textarea.value.length;
		const isLastCharacterNewLine = textarea.value.endsWith("\n");
		const isEndOfTheLine = textarea.selectionStart === countOfCharacters;
		if (isLastCharacterNewLine && isEndOfTheLine) textarea.setSelectionRange(countOfCharacters, countOfCharacters);
		if (onChange) onChange(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		onChange: handleChange,
		ref: handleRef,
		rows: minRows,
		style,
		...other
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"aria-hidden": true,
		className: props.className,
		readOnly: true,
		ref: hiddenTextareaRef,
		tabIndex: -1,
		style: {
			...styles$3.shadow,
			...style,
			paddingTop: 0,
			paddingBottom: 0
		}
	})] });
});
TextareaAutosize.propTypes = {
	className: import_prop_types.default.string,
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	onChange: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	style: import_prop_types.default.object,
	value: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.string),
		import_prop_types.default.number,
		import_prop_types.default.string
	])
};
//#endregion
//#region node_modules/@mui/material/esm/FormControl/formControlState.js
function formControlState({ props, states, muiFormControl }) {
	return states.reduce((acc, state) => {
		acc[state] = props[state];
		if (muiFormControl) {
			if (typeof props[state] === "undefined") acc[state] = muiFormControl[state];
		}
		return acc;
	}, {});
}
//#endregion
//#region node_modules/@mui/material/esm/FormControl/FormControlContext.js
/**
* @ignore - internal component.
*/
var FormControlContext = /* @__PURE__ */ import_react.createContext(void 0);
FormControlContext.displayName = "FormControlContext";
//#endregion
//#region node_modules/@mui/material/esm/FormControl/useFormControl.js
function useFormControl() {
	return import_react.useContext(FormControlContext);
}
//#endregion
//#region node_modules/@mui/material/esm/InputBase/utils.js
function hasValue(value) {
	return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
	return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
	return obj.startAdornment;
}
//#endregion
//#region node_modules/@mui/material/esm/InputBase/inputBaseClasses.js
function getInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiInputBase", slot);
}
var inputBaseClasses = generateUtilityClasses("MuiInputBase", [
	"root",
	"formControl",
	"focused",
	"disabled",
	"adornedStart",
	"adornedEnd",
	"error",
	"sizeSmall",
	"multiline",
	"colorSecondary",
	"fullWidth",
	"hiddenLabel",
	"readOnly",
	"input",
	"inputSizeSmall",
	"inputMultiline",
	"inputTypeSearch",
	"inputAdornedStart",
	"inputAdornedEnd",
	"inputHiddenLabel"
]);
//#endregion
//#region node_modules/@mui/material/esm/InputBase/InputBase.js
var _InputGlobalStyles;
var rootOverridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.formControl && styles.formControl,
		ownerState.startAdornment && styles.adornedStart,
		ownerState.endAdornment && styles.adornedEnd,
		ownerState.error && styles.error,
		ownerState.size === "small" && styles.sizeSmall,
		ownerState.multiline && styles.multiline,
		ownerState.color && styles[`color${capitalize_default(ownerState.color)}`],
		ownerState.fullWidth && styles.fullWidth,
		ownerState.hiddenLabel && styles.hiddenLabel
	];
};
var inputOverridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.input,
		ownerState.size === "small" && styles.inputSizeSmall,
		ownerState.multiline && styles.inputMultiline,
		ownerState.type === "search" && styles.inputTypeSearch,
		ownerState.startAdornment && styles.inputAdornedStart,
		ownerState.endAdornment && styles.inputAdornedEnd,
		ownerState.hiddenLabel && styles.inputHiddenLabel
	];
};
var useUtilityClasses$55 = (ownerState) => {
	const { classes, color, disabled, error, endAdornment, focused, formControl, fullWidth, hiddenLabel, multiline, readOnly, size, startAdornment, type } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color)}`,
			disabled && "disabled",
			error && "error",
			fullWidth && "fullWidth",
			focused && "focused",
			formControl && "formControl",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			multiline && "multiline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			hiddenLabel && "hiddenLabel",
			readOnly && "readOnly"
		],
		input: [
			"input",
			disabled && "disabled",
			type === "search" && "inputTypeSearch",
			multiline && "inputMultiline",
			size === "small" && "inputSizeSmall",
			hiddenLabel && "inputHiddenLabel",
			startAdornment && "inputAdornedStart",
			endAdornment && "inputAdornedEnd",
			readOnly && "readOnly"
		]
	}, getInputBaseUtilityClass, classes);
};
var InputBaseRoot = styled("div", {
	name: "MuiInputBase",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme(({ theme }) => ({
	...theme.typography.body1,
	color: (theme.vars || theme).palette.text.primary,
	lineHeight: "1.4375em",
	boxSizing: "border-box",
	position: "relative",
	cursor: "text",
	display: "inline-flex",
	alignItems: "center",
	[`&.${inputBaseClasses.disabled}`]: {
		color: (theme.vars || theme).palette.text.disabled,
		cursor: "default"
	},
	variants: [
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: "4px 0 5px" }
		},
		{
			props: ({ ownerState, size }) => ownerState.multiline && size === "small",
			style: { paddingTop: 1 }
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "100%" }
		}
	]
})));
var InputBaseInput = styled("input", {
	name: "MuiInputBase",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => {
	const light = theme.palette.mode === "light";
	const placeholder = {
		color: "currentColor",
		...theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light ? .42 : .5 },
		transition: theme.transitions.create("opacity", { duration: theme.transitions.duration.shorter })
	};
	const placeholderHidden = { opacity: "0 !important" };
	const placeholderVisible = theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: light ? .42 : .5 };
	return {
		font: "inherit",
		letterSpacing: "inherit",
		color: "currentColor",
		padding: "4px 0 5px",
		border: 0,
		boxSizing: "content-box",
		background: "none",
		height: "1.4375em",
		margin: 0,
		WebkitTapHighlightColor: "transparent",
		display: "block",
		minWidth: 0,
		width: "100%",
		"&::-webkit-input-placeholder": placeholder,
		"&::-moz-placeholder": placeholder,
		"&::-ms-input-placeholder": placeholder,
		"&:focus": { outline: 0 },
		"&:invalid": { boxShadow: "none" },
		"&::-webkit-search-decoration": { WebkitAppearance: "none" },
		[`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
			"&::-webkit-input-placeholder": placeholderHidden,
			"&::-moz-placeholder": placeholderHidden,
			"&::-ms-input-placeholder": placeholderHidden,
			"&:focus::-webkit-input-placeholder": placeholderVisible,
			"&:focus::-moz-placeholder": placeholderVisible,
			"&:focus::-ms-input-placeholder": placeholderVisible
		},
		[`&.${inputBaseClasses.disabled}`]: {
			opacity: 1,
			WebkitTextFillColor: (theme.vars || theme).palette.text.disabled
		},
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableInjectingGlobalStyles,
				style: {
					animationName: "mui-auto-fill-cancel",
					animationDuration: "10ms",
					"&:-webkit-autofill": {
						animationDuration: "5000s",
						animationName: "mui-auto-fill"
					}
				}
			},
			{
				props: { size: "small" },
				style: { paddingTop: 1 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: {
					height: "auto",
					resize: "none",
					padding: 0,
					paddingTop: 0
				}
			},
			{
				props: { type: "search" },
				style: { MozAppearance: "textfield" }
			}
		]
	};
}));
var InputGlobalStyles = globalCss({
	"@keyframes mui-auto-fill": { from: { display: "block" } },
	"@keyframes mui-auto-fill-cancel": { from: { display: "block" } }
});
/**
* `InputBase` contains as few styles as possible.
* It aims to be a simple building block for creating an input.
* It contains a load of style reset and some state logic.
*/
var InputBase = /* @__PURE__ */ import_react.forwardRef(function InputBase(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputBase"
	});
	const { "aria-describedby": ariaDescribedby, autoComplete, autoFocus, className, color, components = {}, componentsProps = {}, defaultValue, disabled, disableInjectingGlobalStyles, endAdornment, error, fullWidth = false, id, inputComponent = "input", inputProps: inputPropsProp = {}, inputRef: inputRefProp, margin, maxRows, minRows, multiline = false, name, onBlur, onChange, onClick, onFocus, onKeyDown, onKeyUp, placeholder, readOnly, renderSuffix, rows, size, slotProps = {}, slots = {}, startAdornment, type = "text", value: valueProp, ...other } = props;
	const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
	const { current: isControlled } = import_react.useRef(value != null);
	const inputRef = import_react.useRef();
	const handleInputRefWarning = import_react.useCallback((instance) => {
		if (instance && instance.nodeName !== "INPUT" && !instance.focus) console.error([
			"MUI: You have provided a `inputComponent` to the input component",
			"that does not correctly handle the `ref` prop.",
			"Make sure the `ref` prop is called with a HTMLInputElement."
		].join("\n"));
	}, []);
	const handleInputRef = useForkRef_default(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
	const [focused, setFocused] = import_react.useState(false);
	const muiFormControl = useFormControl();
	import_react.useEffect(() => {
		if (muiFormControl) return muiFormControl.registerEffect();
	}, [muiFormControl]);
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"hiddenLabel",
			"size",
			"required",
			"filled"
		]
	});
	fcs.focused = muiFormControl ? muiFormControl.focused : focused;
	import_react.useEffect(() => {
		if (!muiFormControl && disabled && focused) {
			setFocused(false);
			if (onBlur) onBlur();
		}
	}, [
		muiFormControl,
		disabled,
		focused,
		onBlur
	]);
	const onFilled = muiFormControl && muiFormControl.onFilled;
	const onEmpty = muiFormControl && muiFormControl.onEmpty;
	const checkDirty = import_react.useCallback((obj) => {
		if (isFilled(obj)) {
			if (onFilled) onFilled();
		} else if (onEmpty) onEmpty();
	}, [onFilled, onEmpty]);
	useEnhancedEffect_default(() => {
		if (isControlled) checkDirty({ value });
	}, [
		value,
		checkDirty,
		isControlled
	]);
	const handleFocus = (event) => {
		if (onFocus) onFocus(event);
		if (inputPropsProp.onFocus) inputPropsProp.onFocus(event);
		if (muiFormControl && muiFormControl.onFocus) muiFormControl.onFocus(event);
		else setFocused(true);
	};
	const handleBlur = (event) => {
		if (onBlur) onBlur(event);
		if (inputPropsProp.onBlur) inputPropsProp.onBlur(event);
		if (muiFormControl && muiFormControl.onBlur) muiFormControl.onBlur(event);
		else setFocused(false);
	};
	const handleChange = (event, ...args) => {
		if (!isControlled) {
			const element = event.target || inputRef.current;
			if (element == null) throw new Error("MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info.");
			checkDirty({ value: element.value });
		}
		if (inputPropsProp.onChange) inputPropsProp.onChange(event, ...args);
		if (onChange) onChange(event, ...args);
	};
	import_react.useEffect(() => {
		checkDirty(inputRef.current);
	}, []);
	const handleClick = (event) => {
		if (inputRef.current && event.currentTarget === event.target) inputRef.current.focus();
		if (onClick) onClick(event);
	};
	let InputComponent = inputComponent;
	let inputProps = inputPropsProp;
	if (multiline && InputComponent === "input") {
		if (rows) {
			if (minRows || maxRows) console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
			inputProps = {
				type: void 0,
				minRows: rows,
				maxRows: rows,
				...inputProps
			};
		} else inputProps = {
			type: void 0,
			maxRows,
			minRows,
			...inputProps
		};
		InputComponent = TextareaAutosize;
	}
	const handleAutoFill = (event) => {
		checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : { value: "x" });
	};
	import_react.useEffect(() => {
		if (muiFormControl) muiFormControl.setAdornedStart(Boolean(startAdornment));
	}, [muiFormControl, startAdornment]);
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		endAdornment,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		startAdornment,
		type
	};
	const classes = useUtilityClasses$55(ownerState);
	const Root = slots.root || components.Root || InputBaseRoot;
	const rootProps = slotProps.root || componentsProps.root || {};
	const Input = slots.input || components.Input || InputBaseInput;
	inputProps = {
		...inputProps,
		...slotProps.input ?? componentsProps.input
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [!disableInjectingGlobalStyles && typeof InputGlobalStyles === "function" && (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGlobalStyles, {}))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		...rootProps,
		ref,
		onClick: handleClick,
		...other,
		...!isHostComponent(Root) && { ownerState: {
			...ownerState,
			...rootProps.ownerState
		} },
		className: clsx(classes.root, rootProps.className, className, readOnly && "MuiInputBase-readOnly"),
		children: [
			startAdornment,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
				value: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"aria-invalid": fcs.error,
					"aria-describedby": ariaDescribedby,
					autoComplete,
					autoFocus,
					defaultValue,
					disabled: fcs.disabled,
					id,
					onAnimationStart: handleAutoFill,
					name,
					placeholder,
					readOnly,
					required: fcs.required,
					rows,
					value,
					onKeyDown,
					onKeyUp,
					type,
					...inputProps,
					...!isHostComponent(Input) && {
						as: InputComponent,
						ownerState: {
							...ownerState,
							...inputProps.ownerState
						}
					},
					ref: handleInputRef,
					className: clsx(classes.input, inputProps.className, readOnly && "MuiInputBase-readOnly"),
					onBlur: handleBlur,
					onChange: handleChange,
					onFocus: handleFocus
				})
			}),
			endAdornment,
			renderSuffix ? renderSuffix({
				...fcs,
				startAdornment
			}) : null
		]
	})] });
});
InputBase.propTypes = {
	"aria-describedby": import_prop_types.default.string,
	autoComplete: import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	components: import_prop_types.default.shape({
		Input: import_prop_types.default.elementType,
		Root: import_prop_types.default.elementType
	}),
	componentsProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	disableInjectingGlobalStyles: import_prop_types.default.bool,
	endAdornment: import_prop_types.default.node,
	error: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputComponent: elementTypeAcceptingRef_default,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	margin: import_prop_types.default.oneOf(["dense", "none"]),
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	multiline: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClick: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onInvalid: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onKeyUp: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	required: import_prop_types.default.bool,
	rows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	slotProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	slots: import_prop_types.default.shape({
		input: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	startAdornment: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.string,
	value: import_prop_types.default.any
};
//#endregion
//#region node_modules/@mui/material/esm/Input/inputClasses.js
function getInputUtilityClass(slot) {
	return generateUtilityClass("MuiInput", slot);
}
var inputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiInput", [
		"root",
		"underline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/Input/Input.js
var useUtilityClasses$54 = (ownerState) => {
	const { classes, disableUnderline } = ownerState;
	const composedClasses = composeClasses({
		root: ["root", !disableUnderline && "underline"],
		input: ["input"]
	}, getInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputRoot = styled(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiInput",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
	}
})(memoTheme(({ theme }) => {
	let bottomLineColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	if (theme.vars) bottomLineColor = theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline);
	return {
		position: "relative",
		variants: [
			{
				props: ({ ownerState }) => ownerState.formControl,
				style: { "label + &": { marginTop: 16 } }
			},
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${inputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${inputClasses.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
						borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
						"@media (hover: none)": { borderBottom: `1px solid ${bottomLineColor}` }
					},
					[`&.${inputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					color,
					disableUnderline: false
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}` } }
			}))
		]
	};
}));
var InputInput = styled(InputBaseInput, {
	name: "MuiInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})({});
var Input = /* @__PURE__ */ import_react.forwardRef(function Input(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text", ...other } = props;
	const classes = useUtilityClasses$54(props);
	const inputComponentsProps = { root: { ownerState: { disableUnderline } } };
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(slotProps ?? componentsPropsProp, inputComponentsProps) : inputComponentsProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: slots.root ?? components.Root ?? InputRoot,
			input: slots.input ?? components.Input ?? InputInput
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
Input.propTypes = {
	autoComplete: import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary"]), import_prop_types.default.string]),
	components: import_prop_types.default.shape({
		Input: import_prop_types.default.elementType,
		Root: import_prop_types.default.elementType
	}),
	componentsProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	disableUnderline: import_prop_types.default.bool,
	endAdornment: import_prop_types.default.node,
	error: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputComponent: import_prop_types.default.elementType,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	margin: import_prop_types.default.oneOf(["dense", "none"]),
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	multiline: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	readOnly: import_prop_types.default.bool,
	required: import_prop_types.default.bool,
	rows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	slotProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	slots: import_prop_types.default.shape({
		input: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	startAdornment: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.string,
	value: import_prop_types.default.any
};
Input.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/FilledInput/filledInputClasses.js
function getFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiFilledInput", slot);
}
var filledInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiFilledInput", [
		"root",
		"underline",
		"input",
		"adornedStart",
		"adornedEnd",
		"sizeSmall",
		"multiline",
		"hiddenLabel"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/FilledInput/FilledInput.js
var useUtilityClasses$53 = (ownerState) => {
	const { classes, disableUnderline, startAdornment, endAdornment, size, hiddenLabel, multiline } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			!disableUnderline && "underline",
			startAdornment && "adornedStart",
			endAdornment && "adornedEnd",
			size === "small" && `size${capitalize_default(size)}`,
			hiddenLabel && "hiddenLabel",
			multiline && "multiline"
		],
		input: ["input"]
	}, getFilledInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var FilledInputRoot = styled(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiFilledInput",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
	}
})(memoTheme(({ theme }) => {
	const light = theme.palette.mode === "light";
	const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
	const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
	const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		position: "relative",
		backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
		borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
		borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create("background-color", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
			"@media (hover: none)": { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor }
		},
		[`&.${filledInputClasses.focused}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor },
		[`&.${filledInputClasses.disabled}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground },
		variants: [
			{
				props: ({ ownerState }) => !ownerState.disableUnderline,
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${filledInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${filledInputClasses.error}`]: { "&::before, &::after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline) : bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${filledInputClasses.disabled}, .${filledInputClasses.error}):before`]: { borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}` },
					[`&.${filledInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					disableUnderline: false,
					color
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}` } }
			})),
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 12 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "25px 12px 8px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: {
					paddingTop: 21,
					paddingBottom: 4
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel,
				style: {
					paddingTop: 16,
					paddingBottom: 17
				}
			},
			{
				props: ({ ownerState }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === "small",
				style: {
					paddingTop: 8,
					paddingBottom: 9
				}
			}
		]
	};
}));
var FilledInputInput = styled(InputBaseInput, {
	name: "MuiFilledInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => ({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderTopLeftRadius: "inherit",
		borderTopRightRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": {
			borderTopLeftRadius: "inherit",
			borderTopRightRadius: "inherit"
		},
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel,
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.hiddenLabel && ownerState.size === "small",
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: {
				paddingTop: 0,
				paddingBottom: 0,
				paddingLeft: 0,
				paddingRight: 0
			}
		}
	]
})));
var FilledInput = /* @__PURE__ */ import_react.forwardRef(function FilledInput(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFilledInput"
	});
	const { disableUnderline = false, components = {}, componentsProps: componentsPropsProp, fullWidth = false, hiddenLabel, inputComponent = "input", multiline = false, slotProps, slots = {}, type = "text", ...other } = props;
	const ownerState = {
		...props,
		disableUnderline,
		fullWidth,
		inputComponent,
		multiline,
		type
	};
	const classes = useUtilityClasses$53(props);
	const filledInputComponentsProps = {
		root: { ownerState },
		input: { ownerState }
	};
	const componentsProps = slotProps ?? componentsPropsProp ? deepmerge(filledInputComponentsProps, slotProps ?? componentsPropsProp) : filledInputComponentsProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: slots.root ?? components.Root ?? FilledInputRoot,
			input: slots.input ?? components.Input ?? FilledInputInput
		},
		slotProps: componentsProps,
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes
	});
});
FilledInput.propTypes = {
	autoComplete: import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary"]), import_prop_types.default.string]),
	components: import_prop_types.default.shape({
		Input: import_prop_types.default.elementType,
		Root: import_prop_types.default.elementType
	}),
	componentsProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	disableUnderline: import_prop_types.default.bool,
	endAdornment: import_prop_types.default.node,
	error: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputComponent: import_prop_types.default.elementType,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	margin: import_prop_types.default.oneOf(["dense", "none"]),
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	multiline: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	readOnly: import_prop_types.default.bool,
	required: import_prop_types.default.bool,
	rows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	slotProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		root: import_prop_types.default.object
	}),
	slots: import_prop_types.default.shape({
		input: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	startAdornment: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.string,
	value: import_prop_types.default.any
};
FilledInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/OutlinedInput/NotchedOutline.js
var _span$3;
var NotchedOutlineRoot$1 = styled("fieldset", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp
})({
	textAlign: "left",
	position: "absolute",
	bottom: 0,
	right: 0,
	top: -5,
	left: 0,
	margin: 0,
	padding: "0 8px",
	pointerEvents: "none",
	borderRadius: "inherit",
	borderStyle: "solid",
	borderWidth: 1,
	overflow: "hidden",
	minWidth: "0%"
});
var NotchedOutlineLegend = styled("legend", {
	name: "MuiNotchedOutlined",
	shouldForwardProp: rootShouldForwardProp
})(memoTheme(({ theme }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.withLabel,
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: theme.transitions.create("width", {
					duration: 150,
					easing: theme.transitions.easing.easeOut
				})
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel,
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: theme.transitions.create("max-width", {
					duration: 50,
					easing: theme.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.withLabel && ownerState.notched,
			style: {
				maxWidth: "100%",
				transition: theme.transitions.create("max-width", {
					duration: 100,
					easing: theme.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
})));
/**
* @ignore - internal component.
*/
function NotchedOutline(props) {
	const { children, classes, className, label, notched, ...other } = props;
	const withLabel = label != null && label !== "";
	const ownerState = {
		...props,
		notched,
		withLabel
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineRoot$1, {
		"aria-hidden": true,
		className,
		ownerState,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedOutlineLegend, {
			ownerState,
			children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }) : _span$3 || (_span$3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			}))
		})
	});
}
NotchedOutline.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	label: import_prop_types.default.node,
	notched: import_prop_types.default.bool.isRequired,
	style: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/material/esm/OutlinedInput/outlinedInputClasses.js
function getOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiOutlinedInput", slot);
}
var outlinedInputClasses = {
	...inputBaseClasses,
	...generateUtilityClasses("MuiOutlinedInput", [
		"root",
		"notchedOutline",
		"input"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/OutlinedInput/OutlinedInput.js
var useUtilityClasses$52 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, getOutlinedInputUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var OutlinedInputRoot = styled(InputBaseRoot, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiOutlinedInput",
	slot: "Root",
	overridesResolver: rootOverridesResolver
})(memoTheme(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		position: "relative",
		borderRadius: (theme.vars || theme).shape.borderRadius,
		[`&:hover .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${outlinedInputClasses.notchedOutline}`]: { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor } },
		[`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: { borderWidth: 2 },
		variants: [
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: { [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette[color].main } }
			})),
			{
				props: {},
				style: {
					[`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.error.main },
					[`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.action.disabled }
				}
			},
			{
				props: ({ ownerState }) => ownerState.startAdornment,
				style: { paddingLeft: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.endAdornment,
				style: { paddingRight: 14 }
			},
			{
				props: ({ ownerState }) => ownerState.multiline,
				style: { padding: "16.5px 14px" }
			},
			{
				props: ({ ownerState, size }) => ownerState.multiline && size === "small",
				style: { padding: "8.5px 14px" }
			}
		]
	};
}));
var NotchedOutlineRoot = styled(NotchedOutline, {
	name: "MuiOutlinedInput",
	slot: "NotchedOutline"
})(memoTheme(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return { borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, .23) : borderColor };
}));
var OutlinedInputInput = styled(InputBaseInput, {
	name: "MuiOutlinedInput",
	slot: "Input",
	overridesResolver: inputOverridesResolver
})(memoTheme(({ theme }) => ({
	padding: "16.5px 14px",
	...!theme.vars && { "&:-webkit-autofill": {
		WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
		WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
		caretColor: theme.palette.mode === "light" ? null : "#fff",
		borderRadius: "inherit"
	} },
	...theme.vars && {
		"&:-webkit-autofill": { borderRadius: "inherit" },
		[theme.getColorSchemeSelector("dark")]: { "&:-webkit-autofill": {
			WebkitBoxShadow: "0 0 0 100px #266798 inset",
			WebkitTextFillColor: "#fff",
			caretColor: "#fff"
		} }
	},
	variants: [
		{
			props: { size: "small" },
			style: { padding: "8.5px 14px" }
		},
		{
			props: ({ ownerState }) => ownerState.multiline,
			style: { padding: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.startAdornment,
			style: { paddingLeft: 0 }
		},
		{
			props: ({ ownerState }) => ownerState.endAdornment,
			style: { paddingRight: 0 }
		}
	]
})));
var OutlinedInput = /* @__PURE__ */ import_react.forwardRef(function OutlinedInput(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiOutlinedInput"
	});
	const { components = {}, fullWidth = false, inputComponent = "input", label, multiline = false, notched, slots = {}, slotProps = {}, type = "text", ...other } = props;
	const classes = useUtilityClasses$52(props);
	const muiFormControl = useFormControl();
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"color",
			"disabled",
			"error",
			"focused",
			"hiddenLabel",
			"size",
			"required"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		disabled: fcs.disabled,
		error: fcs.error,
		focused: fcs.focused,
		formControl: muiFormControl,
		fullWidth,
		hiddenLabel: fcs.hiddenLabel,
		multiline,
		size: fcs.size,
		type
	};
	const RootSlot = slots.root ?? components.Root ?? OutlinedInputRoot;
	const InputSlot = slots.input ?? components.Input ?? OutlinedInputInput;
	const [NotchedSlot, notchedProps] = useSlot("notchedOutline", {
		elementType: NotchedOutlineRoot,
		className: classes.notchedOutline,
		shouldForwardComponentProp: true,
		ownerState,
		externalForwardedProps: {
			slots,
			slotProps
		},
		additionalProps: { label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
			label,
			" ",
			"*"
		] }) : label }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputBase, {
		slots: {
			root: RootSlot,
			input: InputSlot
		},
		slotProps,
		renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotchedSlot, {
			...notchedProps,
			notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
		}),
		fullWidth,
		inputComponent,
		multiline,
		ref,
		type,
		...other,
		classes: {
			...classes,
			notchedOutline: null
		}
	});
});
OutlinedInput.propTypes = {
	autoComplete: import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary"]), import_prop_types.default.string]),
	components: import_prop_types.default.shape({
		Input: import_prop_types.default.elementType,
		Root: import_prop_types.default.elementType
	}),
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	endAdornment: import_prop_types.default.node,
	error: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputComponent: import_prop_types.default.elementType,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf(["dense", "none"]),
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	multiline: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	notched: import_prop_types.default.bool,
	onChange: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	readOnly: import_prop_types.default.bool,
	required: import_prop_types.default.bool,
	rows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	slotProps: import_prop_types.default.shape({
		input: import_prop_types.default.object,
		notchedOutline: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.object
	}),
	slots: import_prop_types.default.shape({
		input: import_prop_types.default.elementType,
		notchedOutline: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	startAdornment: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.string,
	value: import_prop_types.default.any
};
OutlinedInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/material/esm/FormLabel/formLabelClasses.js
function getFormLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", [
	"root",
	"colorSecondary",
	"focused",
	"disabled",
	"error",
	"filled",
	"required",
	"asterisk"
]);
//#endregion
//#region node_modules/@mui/material/esm/FormLabel/FormLabel.js
var useUtilityClasses$51 = (ownerState) => {
	const { classes, color, focused, disabled, error, filled, required } = ownerState;
	return composeClasses({
		root: [
			"root",
			`color${capitalize_default(color)}`,
			disabled && "disabled",
			error && "error",
			filled && "filled",
			focused && "focused",
			required && "required"
		],
		asterisk: ["asterisk", error && "error"]
	}, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled("label", {
	name: "MuiFormLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.color === "secondary" && styles.colorSecondary,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.body1,
	lineHeight: "1.4375em",
	padding: 0,
	position: "relative",
	variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
		props: { color },
		style: { [`&.${formLabelClasses.focused}`]: { color: (theme.vars || theme).palette[color].main } }
	})), {
		props: {},
		style: {
			[`&.${formLabelClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
			[`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main }
		}
	}]
})));
var AsteriskComponent = styled("span", {
	name: "MuiFormLabel",
	slot: "Asterisk"
})(memoTheme(({ theme }) => ({ [`&.${formLabelClasses.error}`]: { color: (theme.vars || theme).palette.error.main } })));
var FormLabel = /* @__PURE__ */ import_react.forwardRef(function FormLabel(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormLabel"
	});
	const { children, className, color, component = "label", disabled, error, filled, focused, required, ...other } = props;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: [
			"color",
			"required",
			"focused",
			"disabled",
			"error",
			"filled"
		]
	});
	const ownerState = {
		...props,
		color: fcs.color || "primary",
		component,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	const classes = useUtilityClasses$51(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabelRoot, {
		as: component,
		ownerState,
		className: clsx(classes.root, className),
		ref,
		...other,
		children: [children, fcs.required && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AsteriskComponent, {
			ownerState,
			"aria-hidden": true,
			className: classes.asterisk,
			children: [" ", "*"]
		})]
	});
});
FormLabel.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	component: import_prop_types.default.elementType,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	filled: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	required: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/esm/InputLabel/inputLabelClasses.js
function getInputLabelUtilityClasses(slot) {
	return generateUtilityClass("MuiInputLabel", slot);
}
generateUtilityClasses("MuiInputLabel", [
	"root",
	"focused",
	"disabled",
	"error",
	"required",
	"asterisk",
	"formControl",
	"sizeSmall",
	"shrink",
	"animated",
	"standard",
	"filled",
	"outlined"
]);
//#endregion
//#region node_modules/@mui/material/esm/InputLabel/InputLabel.js
var useUtilityClasses$50 = (ownerState) => {
	const { classes, formControl, size, shrink, disableAnimation, variant, required } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			formControl && "formControl",
			!disableAnimation && "animated",
			shrink && "shrink",
			size && size !== "medium" && `size${capitalize_default(size)}`,
			variant
		],
		asterisk: [required && "asterisk"]
	}, getInputLabelUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var InputLabelRoot = styled(FormLabel, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiInputLabel",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${formLabelClasses.asterisk}`]: styles.asterisk },
			styles.root,
			ownerState.formControl && styles.formControl,
			ownerState.size === "small" && styles.sizeSmall,
			ownerState.shrink && styles.shrink,
			!ownerState.disableAnimation && styles.animated,
			ownerState.focused && styles.focused,
			styles[ownerState.variant]
		];
	}
})(memoTheme(({ theme }) => ({
	display: "block",
	transformOrigin: "top left",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	maxWidth: "100%",
	variants: [
		{
			props: ({ ownerState }) => ownerState.formControl,
			style: {
				position: "absolute",
				left: 0,
				top: 0,
				transform: "translate(0, 20px) scale(1)"
			}
		},
		{
			props: { size: "small" },
			style: { transform: "translate(0, 17px) scale(1)" }
		},
		{
			props: ({ ownerState }) => ownerState.shrink,
			style: {
				transform: "translate(0, -1.5px) scale(0.75)",
				transformOrigin: "top left",
				maxWidth: "133%"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disableAnimation,
			style: { transition: theme.transitions.create([
				"color",
				"transform",
				"max-width"
			], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeOut
			}) }
		},
		{
			props: { variant: "filled" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(12px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "filled",
				size: "small"
			},
			style: { transform: "translate(12px, 13px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "filled" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				transform: "translate(12px, 7px) scale(0.75)",
				maxWidth: "calc(133% - 24px)"
			}
		},
		{
			props: ({ variant, ownerState, size }) => variant === "filled" && ownerState.shrink && size === "small",
			style: { transform: "translate(12px, 4px) scale(0.75)" }
		},
		{
			props: { variant: "outlined" },
			style: {
				zIndex: 1,
				pointerEvents: "none",
				transform: "translate(14px, 16px) scale(1)",
				maxWidth: "calc(100% - 24px)"
			}
		},
		{
			props: {
				variant: "outlined",
				size: "small"
			},
			style: { transform: "translate(14px, 9px) scale(1)" }
		},
		{
			props: ({ variant, ownerState }) => variant === "outlined" && ownerState.shrink,
			style: {
				userSelect: "none",
				pointerEvents: "auto",
				maxWidth: "calc(133% - 32px)",
				transform: "translate(14px, -9px) scale(0.75)"
			}
		}
	]
})));
var InputLabel = /* @__PURE__ */ import_react.forwardRef(function InputLabel(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiInputLabel",
		props: inProps
	});
	const { disableAnimation = false, margin, shrink: shrinkProp, variant, className, ...other } = props;
	const muiFormControl = useFormControl();
	let shrink = shrinkProp;
	if (typeof shrink === "undefined" && muiFormControl) shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
	const fcs = formControlState({
		props,
		muiFormControl,
		states: [
			"size",
			"variant",
			"required",
			"focused"
		]
	});
	const ownerState = {
		...props,
		disableAnimation,
		formControl: muiFormControl,
		shrink,
		size: fcs.size,
		variant: fcs.variant,
		required: fcs.required,
		focused: fcs.focused
	};
	const classes = useUtilityClasses$50(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabelRoot, {
		"data-shrink": shrink,
		ref,
		className: clsx(classes.root, className),
		...other,
		ownerState,
		classes
	});
});
InputLabel.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	disableAnimation: import_prop_types.default.bool,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	margin: import_prop_types.default.oneOf(["dense"]),
	required: import_prop_types.default.bool,
	shrink: import_prop_types.default.bool,
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/FormControl/formControlClasses.js
function getFormControlUtilityClasses(slot) {
	return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", [
	"root",
	"marginNone",
	"marginNormal",
	"marginDense",
	"fullWidth",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/material/esm/FormControl/FormControl.js
var useUtilityClasses$49 = (ownerState) => {
	const { classes, margin, fullWidth } = ownerState;
	return composeClasses({ root: [
		"root",
		margin !== "none" && `margin${capitalize_default(margin)}`,
		fullWidth && "fullWidth"
	] }, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled("div", {
	name: "MuiFormControl",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[`margin${capitalize_default(ownerState.margin)}`],
			ownerState.fullWidth && styles.fullWidth
		];
	}
})({
	display: "inline-flex",
	flexDirection: "column",
	position: "relative",
	minWidth: 0,
	padding: 0,
	margin: 0,
	border: 0,
	verticalAlign: "top",
	variants: [
		{
			props: { margin: "normal" },
			style: {
				marginTop: 16,
				marginBottom: 8
			}
		},
		{
			props: { margin: "dense" },
			style: {
				marginTop: 8,
				marginBottom: 4
			}
		},
		{
			props: { fullWidth: true },
			style: { width: "100%" }
		}
	]
});
/**
* Provides context such as filled/focused/error/required for form inputs.
* Relying on the context provides high flexibility and ensures that the state always stays
* consistent across the children of the `FormControl`.
* This context is used by the following components:
*
*  - FormLabel
*  - FormHelperText
*  - Input
*  - InputLabel
*
* You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
*
* ```jsx
* <FormControl>
*   <InputLabel htmlFor="my-input">Email address</InputLabel>
*   <Input id="my-input" aria-describedby="my-helper-text" />
*   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
* </FormControl>
* ```
*
* ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
* For instance, only one input can be focused at the same time, the state shouldn't be shared.
*/
var FormControl = /* @__PURE__ */ import_react.forwardRef(function FormControl(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormControl"
	});
	const { children, className, color = "primary", component = "div", disabled = false, error = false, focused: visuallyFocused, fullWidth = false, hiddenLabel = false, margin = "none", required = false, size = "medium", variant = "outlined", ...other } = props;
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		error,
		fullWidth,
		hiddenLabel,
		margin,
		required,
		size,
		variant
	};
	const classes = useUtilityClasses$49(ownerState);
	const [adornedStart, setAdornedStart] = import_react.useState(() => {
		let initialAdornedStart = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			const input = isMuiElement_default(child, ["Select"]) ? child.props.input : child;
			if (input && isAdornedStart(input.props)) initialAdornedStart = true;
		});
		return initialAdornedStart;
	});
	const [filled, setFilled] = import_react.useState(() => {
		let initialFilled = false;
		if (children) import_react.Children.forEach(children, (child) => {
			if (!isMuiElement_default(child, ["Input", "Select"])) return;
			if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) initialFilled = true;
		});
		return initialFilled;
	});
	const [focusedState, setFocused] = import_react.useState(false);
	if (disabled && focusedState) setFocused(false);
	const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
	let registerEffect;
	const registeredInput = import_react.useRef(false);
	registerEffect = () => {
		if (registeredInput.current) console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join("\n"));
		registeredInput.current = true;
		return () => {
			registeredInput.current = false;
		};
	};
	const onFilled = import_react.useCallback(() => {
		setFilled(true);
	}, []);
	const onEmpty = import_react.useCallback(() => {
		setFilled(false);
	}, []);
	const childContext = import_react.useMemo(() => {
		return {
			adornedStart,
			setAdornedStart,
			color,
			disabled,
			error,
			filled,
			focused,
			fullWidth,
			hiddenLabel,
			size,
			onBlur: () => {
				setFocused(false);
			},
			onFocus: () => {
				setFocused(true);
			},
			onEmpty,
			onFilled,
			registerEffect,
			required,
			variant
		};
	}, [
		adornedStart,
		color,
		disabled,
		error,
		filled,
		focused,
		fullWidth,
		hiddenLabel,
		registerEffect,
		onEmpty,
		onFilled,
		required,
		size,
		variant
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children
		})
	});
});
FormControl.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	component: import_prop_types.default.elementType,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	hiddenLabel: import_prop_types.default.bool,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	required: import_prop_types.default.bool,
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/FormHelperText/formHelperTextClasses.js
function getFormHelperTextUtilityClasses(slot) {
	return generateUtilityClass("MuiFormHelperText", slot);
}
var formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", [
	"root",
	"error",
	"disabled",
	"sizeSmall",
	"sizeMedium",
	"contained",
	"focused",
	"filled",
	"required"
]);
//#endregion
//#region node_modules/@mui/material/esm/FormHelperText/FormHelperText.js
var _span$2;
var useUtilityClasses$48 = (ownerState) => {
	const { classes, contained, size, disabled, error, filled, focused, required } = ownerState;
	return composeClasses({ root: [
		"root",
		disabled && "disabled",
		error && "error",
		size && `size${capitalize_default(size)}`,
		contained && "contained",
		focused && "focused",
		filled && "filled",
		required && "required"
	] }, getFormHelperTextUtilityClasses, classes);
};
var FormHelperTextRoot = styled("p", {
	name: "MuiFormHelperText",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.size && styles[`size${capitalize_default(ownerState.size)}`],
			ownerState.contained && styles.contained,
			ownerState.filled && styles.filled
		];
	}
})(memoTheme(({ theme }) => ({
	color: (theme.vars || theme).palette.text.secondary,
	...theme.typography.caption,
	textAlign: "left",
	marginTop: 3,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0,
	[`&.${formHelperTextClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled },
	[`&.${formHelperTextClasses.error}`]: { color: (theme.vars || theme).palette.error.main },
	variants: [{
		props: { size: "small" },
		style: { marginTop: 4 }
	}, {
		props: ({ ownerState }) => ownerState.contained,
		style: {
			marginLeft: 14,
			marginRight: 14
		}
	}]
})));
var FormHelperText = /* @__PURE__ */ import_react.forwardRef(function FormHelperText(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiFormHelperText"
	});
	const { children, className, component = "p", disabled, error, filled, focused, margin, required, variant, ...other } = props;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: [
			"variant",
			"size",
			"disabled",
			"error",
			"filled",
			"focused",
			"required"
		]
	});
	const ownerState = {
		...props,
		component,
		contained: fcs.variant === "filled" || fcs.variant === "outlined",
		variant: fcs.variant,
		size: fcs.size,
		disabled: fcs.disabled,
		error: fcs.error,
		filled: fcs.filled,
		focused: fcs.focused,
		required: fcs.required
	};
	delete ownerState.ownerState;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormHelperTextRoot, {
		as: component,
		className: clsx(useUtilityClasses$48(ownerState).root, className),
		ref,
		...other,
		ownerState,
		children: children === " " ? _span$2 || (_span$2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "notranslate",
			"aria-hidden": true,
			children: "​"
		})) : children
	});
});
FormHelperText.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	filled: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	margin: import_prop_types.default.oneOf(["dense"]),
	required: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js
/**
* Returns the ref of a React element handling differences between React 19 and older versions.
* It will throw runtime error if the element is not a valid React element.
*
* @param element React.ReactElement
* @returns React.Ref<any> | null
*/
function getReactElementRef(element) {
	if (parseInt("19.2.4", 10) >= 19) return element?.props?.ref || null;
	return element?.ref || null;
}
//#endregion
//#region node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js
function HTMLElementType(props, propName, componentName, location, propFullName) {
	const propValue = props[propName];
	const safePropName = propFullName || propName;
	if (propValue == null) return null;
	if (propValue && propValue.nodeType !== 1) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
	return null;
}
//#endregion
//#region node_modules/@mui/utils/esm/integerPropType/integerPropType.js
function getTypeByValue(value) {
	const valueType = typeof value;
	switch (valueType) {
		case "number":
			if (Number.isNaN(value)) return "NaN";
			if (!Number.isFinite(value)) return "Infinity";
			if (value !== Math.floor(value)) return "float";
			return "number";
		case "object":
			if (value === null) return "null";
			return value.constructor.name;
		default: return valueType;
	}
}
function requiredInteger(props, propName, componentName, location) {
	const propValue = props[propName];
	if (propValue == null || !Number.isInteger(propValue)) {
		const propType = getTypeByValue(propValue);
		return /* @__PURE__ */ new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
	}
	return null;
}
function validator(props, propName, componentName, location) {
	if (props[propName] === void 0) return null;
	return requiredInteger(props, propName, componentName, location);
}
function validatorNoop() {
	return null;
}
validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
var integerPropType = validator;
//#endregion
//#region node_modules/@mui/material/esm/utils/isLayoutSupported.js
function isLayoutSupported() {
	return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || false);
}
//#endregion
//#region node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
function isClassComponent(elementType) {
	const { prototype = {} } = elementType;
	return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
	const element = props[propName];
	const safePropName = propFullName || propName;
	if (element == null || typeof window === "undefined") return null;
	let warningHint;
	const elementType = element.type;
	/**
	* Blacklisting instead of whitelisting
	*
	* Blacklisting will miss some components, such as React.Fragment. Those will at least
	* trigger a warning in React.
	* We can't whitelist because there is no safe way to detect React.forwardRef
	* or class components. "Safe" means there's no public API.
	*
	*/
	if (typeof elementType === "function" && !isClassComponent(elementType)) warningHint = "Did you accidentally use a plain function component for an element instead?";
	if (warningHint !== void 0) return /* @__PURE__ */ new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
	return null;
}
var elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);
//#endregion
//#region node_modules/@mui/material/esm/transitions/utils.js
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
	const { timeout, easing, style = {} } = props;
	return {
		duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
		easing: style.transitionTimingFunction ?? (typeof easing === "object" ? easing[options.mode] : easing),
		delay: style.transitionDelay
	};
}
//#endregion
//#region node_modules/@mui/material/esm/Grow/Grow.js
function getScale(value) {
	return `scale(${value}, ${value ** 2})`;
}
var styles$2 = {
	entering: {
		opacity: 1,
		transform: getScale(1)
	},
	entered: {
		opacity: 1,
		transform: "none"
	}
};
var isWebKit154 = typeof navigator !== "undefined" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent);
/**
* The Grow transition is used by the [Tooltip](/material-ui/react-tooltip/) and
* [Popover](/material-ui/react-popover/) components.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Grow = /* @__PURE__ */ import_react.forwardRef(function Grow(props, ref) {
	const { addEndListener, appear = true, children, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = "auto", TransitionComponent = Transition, ...other } = props;
	const timer = useTimeout();
	const autoTimeout = import_react.useRef();
	const theme = useTheme$2();
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		reflow(node);
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		let duration;
		if (timeout === "auto") {
			duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
			autoTimeout.current = duration;
		} else duration = transitionDuration;
		node.style.transition = [theme.transitions.create("opacity", {
			duration,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration : duration * .666,
			delay,
			easing: transitionTimingFunction
		})].join(",");
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const { duration: transitionDuration, delay, easing: transitionTimingFunction } = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "exit" });
		let duration;
		if (timeout === "auto") {
			duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
			autoTimeout.current = duration;
		} else duration = transitionDuration;
		node.style.transition = [theme.transitions.create("opacity", {
			duration,
			delay
		}), theme.transitions.create("transform", {
			duration: isWebKit154 ? duration : duration * .666,
			delay: isWebKit154 ? delay : delay || duration * .333,
			easing: transitionTimingFunction
		})].join(",");
		node.style.opacity = 0;
		node.style.transform = getScale(.75);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next) => {
		if (timeout === "auto") timer.start(autoTimeout.current || 0, next);
		if (addEndListener) addEndListener(nodeRef.current, next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout: timeout === "auto" ? null : timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					transform: getScale(.75),
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$2[state],
					...style,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
Grow.propTypes = {
	addEndListener: import_prop_types.default.func,
	appear: import_prop_types.default.bool,
	children: elementAcceptingRef.isRequired,
	easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string
	}), import_prop_types.default.string]),
	in: import_prop_types.default.bool,
	onEnter: import_prop_types.default.func,
	onEntered: import_prop_types.default.func,
	onEntering: import_prop_types.default.func,
	onExit: import_prop_types.default.func,
	onExited: import_prop_types.default.func,
	onExiting: import_prop_types.default.func,
	style: import_prop_types.default.object,
	timeout: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.number,
		import_prop_types.default.shape({
			appear: import_prop_types.default.number,
			enter: import_prop_types.default.number,
			exit: import_prop_types.default.number
		})
	])
};
if (Grow) Grow.muiSupportAuto = true;
//#endregion
//#region node_modules/@mui/material/esm/Modal/ModalManager.js
function isOverflowing(container) {
	const doc = ownerDocument(container);
	if (doc.body === container) return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
	return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
	if (hide) element.setAttribute("aria-hidden", "true");
	else element.removeAttribute("aria-hidden");
}
function getPaddingRight(element) {
	return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
	const isForbiddenTagName = [
		"TEMPLATE",
		"SCRIPT",
		"STYLE",
		"LINK",
		"MAP",
		"META",
		"NOSCRIPT",
		"PICTURE",
		"COL",
		"COLGROUP",
		"PARAM",
		"SLOT",
		"SOURCE",
		"TRACK"
	].includes(element.tagName);
	const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
	return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
	const blacklist = [
		mountElement,
		currentElement,
		...elementsToExclude
	];
	[].forEach.call(container.children, (element) => {
		const isNotExcludedElement = !blacklist.includes(element);
		const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
		if (isNotExcludedElement && isNotForbiddenElement) ariaHidden(element, hide);
	});
}
function findIndexOf(items, callback) {
	let idx = -1;
	items.some((item, index) => {
		if (callback(item)) {
			idx = index;
			return true;
		}
		return false;
	});
	return idx;
}
function handleContainer(containerInfo, props) {
	const restoreStyle = [];
	const container = containerInfo.container;
	if (!props.disableScrollLock) {
		if (isOverflowing(container)) {
			const scrollbarSize = getScrollbarSize(ownerWindow(container));
			restoreStyle.push({
				value: container.style.paddingRight,
				property: "padding-right",
				el: container
			});
			container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
			const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
			[].forEach.call(fixedElements, (element) => {
				restoreStyle.push({
					value: element.style.paddingRight,
					property: "padding-right",
					el: element
				});
				element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
			});
		}
		let scrollContainer;
		if (container.parentNode instanceof DocumentFragment) scrollContainer = ownerDocument(container).body;
		else {
			const parent = container.parentElement;
			const containerWindow = ownerWindow(container);
			scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
		}
		restoreStyle.push({
			value: scrollContainer.style.overflow,
			property: "overflow",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowX,
			property: "overflow-x",
			el: scrollContainer
		}, {
			value: scrollContainer.style.overflowY,
			property: "overflow-y",
			el: scrollContainer
		});
		scrollContainer.style.overflow = "hidden";
	}
	const restore = () => {
		restoreStyle.forEach(({ value, el, property }) => {
			if (value) el.style.setProperty(property, value);
			else el.style.removeProperty(property);
		});
	};
	return restore;
}
function getHiddenSiblings(container) {
	const hiddenSiblings = [];
	[].forEach.call(container.children, (element) => {
		if (element.getAttribute("aria-hidden") === "true") hiddenSiblings.push(element);
	});
	return hiddenSiblings;
}
/**
* @ignore - do not document.
*
* Proper state management for containers and the modals in those containers.
* Simplified, but inspired by react-overlay's ModalManager class.
* Used by the Modal to ensure proper styling of containers.
*/
var ModalManager = class {
	constructor() {
		this.modals = [];
		this.containers = [];
	}
	add(modal, container) {
		let modalIndex = this.modals.indexOf(modal);
		if (modalIndex !== -1) return modalIndex;
		modalIndex = this.modals.length;
		this.modals.push(modal);
		if (modal.modalRef) ariaHidden(modal.modalRef, false);
		const hiddenSiblings = getHiddenSiblings(container);
		ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
		const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
		if (containerIndex !== -1) {
			this.containers[containerIndex].modals.push(modal);
			return modalIndex;
		}
		this.containers.push({
			modals: [modal],
			container,
			restore: null,
			hiddenSiblings
		});
		return modalIndex;
	}
	mount(modal, props) {
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		if (!containerInfo.restore) containerInfo.restore = handleContainer(containerInfo, props);
	}
	remove(modal, ariaHiddenState = true) {
		const modalIndex = this.modals.indexOf(modal);
		if (modalIndex === -1) return modalIndex;
		const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
		const containerInfo = this.containers[containerIndex];
		containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
		this.modals.splice(modalIndex, 1);
		if (containerInfo.modals.length === 0) {
			if (containerInfo.restore) containerInfo.restore();
			if (modal.modalRef) ariaHidden(modal.modalRef, ariaHiddenState);
			ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
			this.containers.splice(containerIndex, 1);
		} else {
			const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
			if (nextTop.modalRef) ariaHidden(nextTop.modalRef, false);
		}
		return modalIndex;
	}
	isTopModal(modal) {
		return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
	}
};
//#endregion
//#region node_modules/@mui/material/esm/Unstable_TrapFocus/FocusTrap.js
var candidatesSelector = [
	"input",
	"select",
	"textarea",
	"a[href]",
	"button",
	"[tabindex]",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable=\"false\"])"
].join(",");
function getTabIndex(node) {
	const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
	if (!Number.isNaN(tabindexAttr)) return tabindexAttr;
	if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) return 0;
	return node.tabIndex;
}
function isNonTabbableRadio(node) {
	if (node.tagName !== "INPUT" || node.type !== "radio") return false;
	if (!node.name) return false;
	const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
	let roving = getRadio(`[name="${node.name}"]:checked`);
	if (!roving) roving = getRadio(`[name="${node.name}"]`);
	return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
	if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) return false;
	return true;
}
function defaultGetTabbable(root) {
	const regularTabNodes = [];
	const orderedTabNodes = [];
	Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
		const nodeTabIndex = getTabIndex(node);
		if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) return;
		if (nodeTabIndex === 0) regularTabNodes.push(node);
		else orderedTabNodes.push({
			documentOrder: i,
			tabIndex: nodeTabIndex,
			node
		});
	});
	return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
	return true;
}
/**
* @ignore - internal component.
*/
function FocusTrap(props) {
	const { children, disableAutoFocus = false, disableEnforceFocus = false, disableRestoreFocus = false, getTabbable = defaultGetTabbable, isEnabled = defaultIsEnabled, open } = props;
	const ignoreNextEnforceFocus = import_react.useRef(false);
	const sentinelStart = import_react.useRef(null);
	const sentinelEnd = import_react.useRef(null);
	const nodeToRestore = import_react.useRef(null);
	const reactFocusEventTarget = import_react.useRef(null);
	const activated = import_react.useRef(false);
	const rootRef = import_react.useRef(null);
	const handleRef = useForkRef(getReactElementRef(children), rootRef);
	const lastKeydown = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		activated.current = !disableAutoFocus;
	}, [disableAutoFocus, open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const activeElement = getActiveElement_default(ownerDocument(rootRef.current));
		if (!rootRef.current.contains(activeElement)) {
			if (!rootRef.current.hasAttribute("tabIndex")) {
				console.error(["MUI: The modal content node does not accept focus.", "For the benefit of assistive technologies, the tabIndex of the node is being set to \"-1\"."].join("\n"));
				rootRef.current.setAttribute("tabIndex", "-1");
			}
			if (activated.current) rootRef.current.focus();
		}
		return () => {
			if (!disableRestoreFocus) {
				if (nodeToRestore.current && nodeToRestore.current.focus) {
					ignoreNextEnforceFocus.current = true;
					nodeToRestore.current.focus();
				}
				nodeToRestore.current = null;
			}
		};
	}, [open]);
	import_react.useEffect(() => {
		if (!open || !rootRef.current) return;
		const doc = ownerDocument(rootRef.current);
		const loopFocus = (nativeEvent) => {
			lastKeydown.current = nativeEvent;
			if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") return;
			if (getActiveElement_default(doc) === rootRef.current && nativeEvent.shiftKey) {
				ignoreNextEnforceFocus.current = true;
				if (sentinelEnd.current) sentinelEnd.current.focus();
			}
		};
		const contain = () => {
			const rootElement = rootRef.current;
			if (rootElement === null) return;
			const activeEl = getActiveElement_default(doc);
			if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
				ignoreNextEnforceFocus.current = false;
				return;
			}
			if (rootElement.contains(activeEl)) return;
			if (disableEnforceFocus && activeEl !== sentinelStart.current && activeEl !== sentinelEnd.current) return;
			if (activeEl !== reactFocusEventTarget.current) reactFocusEventTarget.current = null;
			else if (reactFocusEventTarget.current !== null) return;
			if (!activated.current) return;
			let tabbable = [];
			if (activeEl === sentinelStart.current || activeEl === sentinelEnd.current) tabbable = getTabbable(rootRef.current);
			if (tabbable.length > 0) {
				const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
				const focusNext = tabbable[0];
				const focusPrevious = tabbable[tabbable.length - 1];
				if (typeof focusNext !== "string" && typeof focusPrevious !== "string") if (isShiftTab) focusPrevious.focus();
				else focusNext.focus();
			} else rootElement.focus();
		};
		doc.addEventListener("focusin", contain);
		doc.addEventListener("keydown", loopFocus, true);
		const interval = setInterval(() => {
			const activeEl = getActiveElement_default(doc);
			if (activeEl && activeEl.tagName === "BODY") contain();
		}, 50);
		return () => {
			clearInterval(interval);
			doc.removeEventListener("focusin", contain);
			doc.removeEventListener("keydown", loopFocus, true);
		};
	}, [
		disableAutoFocus,
		disableEnforceFocus,
		disableRestoreFocus,
		isEnabled,
		open,
		getTabbable
	]);
	const onFocus = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
		reactFocusEventTarget.current = event.target;
		const childrenPropsHandler = children.props.onFocus;
		if (childrenPropsHandler) childrenPropsHandler(event);
	};
	const handleFocusSentinel = (event) => {
		if (nodeToRestore.current === null) nodeToRestore.current = event.relatedTarget;
		activated.current = true;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelStart,
			"data-testid": "sentinelStart"
		}),
		/* @__PURE__ */ import_react.cloneElement(children, {
			ref: handleRef,
			onFocus
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			tabIndex: open ? 0 : -1,
			onFocus: handleFocusSentinel,
			ref: sentinelEnd,
			"data-testid": "sentinelEnd"
		})
	] });
}
FocusTrap.propTypes = {
	children: elementAcceptingRef,
	disableAutoFocus: import_prop_types.default.bool,
	disableEnforceFocus: import_prop_types.default.bool,
	disableRestoreFocus: import_prop_types.default.bool,
	getTabbable: import_prop_types.default.func,
	isEnabled: import_prop_types.default.func,
	open: import_prop_types.default.bool.isRequired
};
FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
//#endregion
//#region node_modules/@mui/material/esm/Portal/Portal.js
function getContainer$1(container) {
	return typeof container === "function" ? container() : container;
}
/**
* Portals provide a first-class way to render children into a DOM node
* that exists outside the DOM hierarchy of the parent component.
*
* Demos:
*
* - [Portal](https://mui.com/material-ui/react-portal/)
*
* API:
*
* - [Portal API](https://mui.com/material-ui/api/portal/)
*/
var Portal = /* @__PURE__ */ import_react.forwardRef(function Portal(props, forwardedRef) {
	const { children, container, disablePortal = false } = props;
	const [mountNode, setMountNode] = import_react.useState(null);
	const handleRef = useForkRef(/* @__PURE__ */ import_react.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
	useEnhancedEffect(() => {
		if (!disablePortal) setMountNode(getContainer$1(container) || document.body);
	}, [container, disablePortal]);
	useEnhancedEffect(() => {
		if (mountNode && !disablePortal) {
			setRef(forwardedRef, mountNode);
			return () => {
				setRef(forwardedRef, null);
			};
		}
	}, [
		forwardedRef,
		mountNode,
		disablePortal
	]);
	if (disablePortal) {
		if (/* @__PURE__ */ import_react.isValidElement(children)) {
			const newProps = { ref: handleRef };
			return /* @__PURE__ */ import_react.cloneElement(children, newProps);
		}
		return children;
	}
	return mountNode ? /* @__PURE__ */ import_react_dom.createPortal(children, mountNode) : mountNode;
});
Portal.propTypes = {
	children: import_prop_types.default.node,
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	disablePortal: import_prop_types.default.bool
};
Portal["propTypes"] = exactProp(Portal.propTypes);
//#endregion
//#region node_modules/@mui/material/esm/Fade/Fade.js
var styles$1 = {
	entering: { opacity: 1 },
	entered: { opacity: 1 }
};
/**
* The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
* It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
*/
var Fade = /* @__PURE__ */ import_react.forwardRef(function Fade(props, ref) {
	const theme = useTheme$2();
	const defaultTimeout = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { addEndListener, appear = true, children, easing, in: inProp, onEnter, onEntered, onEntering, onExit, onExited, onExiting, style, timeout = defaultTimeout, TransitionComponent = Transition, ...other } = props;
	const nodeRef = import_react.useRef(null);
	const handleRef = useForkRef_default(nodeRef, getReactElementRef(children), ref);
	const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
		if (callback) {
			const node = nodeRef.current;
			if (maybeIsAppearing === void 0) callback(node);
			else callback(node, maybeIsAppearing);
		}
	};
	const handleEntering = normalizedTransitionCallback(onEntering);
	const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
		reflow(node);
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "enter" });
		node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onEnter) onEnter(node, isAppearing);
	});
	const handleEntered = normalizedTransitionCallback(onEntered);
	const handleExiting = normalizedTransitionCallback(onExiting);
	const handleExit = normalizedTransitionCallback((node) => {
		const transitionProps = getTransitionProps({
			style,
			timeout,
			easing
		}, { mode: "exit" });
		node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
		node.style.transition = theme.transitions.create("opacity", transitionProps);
		if (onExit) onExit(node);
	});
	const handleExited = normalizedTransitionCallback(onExited);
	const handleAddEndListener = (next) => {
		if (addEndListener) addEndListener(nodeRef.current, next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionComponent, {
		appear,
		in: inProp,
		nodeRef,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		timeout,
		...other,
		children: (state, { ownerState, ...restChildProps }) => {
			return /* @__PURE__ */ import_react.cloneElement(children, {
				style: {
					opacity: 0,
					visibility: state === "exited" && !inProp ? "hidden" : void 0,
					...styles$1[state],
					...style,
					...children.props.style
				},
				ref: handleRef,
				...restChildProps
			});
		}
	});
});
Fade.propTypes = {
	addEndListener: import_prop_types.default.func,
	appear: import_prop_types.default.bool,
	children: elementAcceptingRef.isRequired,
	easing: import_prop_types.default.oneOfType([import_prop_types.default.shape({
		enter: import_prop_types.default.string,
		exit: import_prop_types.default.string
	}), import_prop_types.default.string]),
	in: import_prop_types.default.bool,
	onEnter: import_prop_types.default.func,
	onEntered: import_prop_types.default.func,
	onEntering: import_prop_types.default.func,
	onExit: import_prop_types.default.func,
	onExited: import_prop_types.default.func,
	onExiting: import_prop_types.default.func,
	style: import_prop_types.default.object,
	timeout: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})])
};
//#endregion
//#region node_modules/@mui/material/esm/Backdrop/backdropClasses.js
function getBackdropUtilityClass(slot) {
	return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
//#endregion
//#region node_modules/@mui/material/esm/Backdrop/Backdrop.js
var useUtilityClasses$47 = (ownerState) => {
	const { classes, invisible } = ownerState;
	return composeClasses({ root: ["root", invisible && "invisible"] }, getBackdropUtilityClass, classes);
};
var BackdropRoot = styled("div", {
	name: "MuiBackdrop",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.invisible && styles.invisible];
	}
})({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	WebkitTapHighlightColor: "transparent",
	variants: [{
		props: { invisible: true },
		style: { backgroundColor: "transparent" }
	}]
});
var Backdrop = /* @__PURE__ */ import_react.forwardRef(function Backdrop(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiBackdrop"
	});
	const { children, className, component = "div", invisible = false, open, components = {}, componentsProps = {}, slotProps = {}, slots = {}, TransitionComponent: TransitionComponentProp, transitionDuration, ...other } = props;
	const ownerState = {
		...props,
		component,
		invisible
	};
	const classes = useUtilityClasses$47(ownerState);
	const externalForwardedProps = {
		component,
		slots: {
			transition: TransitionComponentProp,
			root: components.Root,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: BackdropRoot,
		externalForwardedProps,
		className: clsx(classes.root, className),
		ownerState
	});
	const [TransitionSlot, transitionProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
		in: open,
		timeout: transitionDuration,
		...other,
		...transitionProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
			"aria-hidden": true,
			...rootProps,
			ref,
			children
		})
	});
});
Backdrop.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	components: import_prop_types.default.shape({ Root: import_prop_types.default.elementType }),
	componentsProps: import_prop_types.default.shape({ root: import_prop_types.default.object }),
	invisible: import_prop_types.default.bool,
	open: import_prop_types.default.bool.isRequired,
	slotProps: import_prop_types.default.shape({
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	TransitionComponent: import_prop_types.default.elementType,
	transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})])
};
//#endregion
//#region node_modules/@mui/material/esm/Modal/useModal.js
function getContainer(container) {
	return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
	return children ? children.props.hasOwnProperty("in") : false;
}
var noop$1 = () => {};
var manager = new ModalManager();
function useModal(parameters) {
	const { container, disableEscapeKeyDown = false, disableScrollLock = false, closeAfterTransition = false, onTransitionEnter, onTransitionExited, children, onClose, open, rootRef } = parameters;
	const modal = import_react.useRef({});
	const mountNodeRef = import_react.useRef(null);
	const modalRef = import_react.useRef(null);
	const handleRef = useForkRef(modalRef, rootRef);
	const [exited, setExited] = import_react.useState(!open);
	const hasTransition = getHasTransition(children);
	let ariaHiddenProp = true;
	if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) ariaHiddenProp = false;
	const getDoc = () => ownerDocument(mountNodeRef.current);
	const getModal = () => {
		modal.current.modalRef = modalRef.current;
		modal.current.mount = mountNodeRef.current;
		return modal.current;
	};
	const handleMounted = () => {
		manager.mount(getModal(), { disableScrollLock });
		if (modalRef.current) modalRef.current.scrollTop = 0;
	};
	const handleOpen = useEventCallback(() => {
		const resolvedContainer = getContainer(container) || getDoc().body;
		manager.add(getModal(), resolvedContainer);
		if (modalRef.current) handleMounted();
	});
	const isTopModal = () => manager.isTopModal(getModal());
	const handlePortalRef = useEventCallback((node) => {
		mountNodeRef.current = node;
		if (!node) return;
		if (open && isTopModal()) handleMounted();
		else if (modalRef.current) ariaHidden(modalRef.current, ariaHiddenProp);
	});
	const handleClose = import_react.useCallback(() => {
		manager.remove(getModal(), ariaHiddenProp);
	}, [ariaHiddenProp]);
	import_react.useEffect(() => {
		return () => {
			handleClose();
		};
	}, [handleClose]);
	import_react.useEffect(() => {
		if (open) handleOpen();
		else if (!hasTransition || !closeAfterTransition) handleClose();
	}, [
		open,
		handleClose,
		hasTransition,
		closeAfterTransition,
		handleOpen
	]);
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);
		if (event.key !== "Escape" || event.which === 229 || !isTopModal()) return;
		if (!disableEscapeKeyDown) {
			event.stopPropagation();
			if (onClose) onClose(event, "escapeKeyDown");
		}
	};
	const createHandleBackdropClick = (otherHandlers) => (event) => {
		otherHandlers.onClick?.(event);
		if (event.target !== event.currentTarget) return;
		if (onClose) onClose(event, "backdropClick");
	};
	const getRootProps = (otherHandlers = {}) => {
		const propsEventHandlers = extractEventHandlers(parameters);
		delete propsEventHandlers.onTransitionEnter;
		delete propsEventHandlers.onTransitionExited;
		const externalEventHandlers = {
			...propsEventHandlers,
			...otherHandlers
		};
		return {
			role: "presentation",
			...externalEventHandlers,
			onKeyDown: createHandleKeyDown(externalEventHandlers),
			ref: handleRef
		};
	};
	const getBackdropProps = (otherHandlers = {}) => {
		const externalEventHandlers = otherHandlers;
		return {
			"aria-hidden": true,
			...externalEventHandlers,
			onClick: createHandleBackdropClick(externalEventHandlers),
			open
		};
	};
	const getTransitionProps = () => {
		const handleEnter = () => {
			setExited(false);
			if (onTransitionEnter) onTransitionEnter();
		};
		const handleExited = () => {
			setExited(true);
			if (onTransitionExited) onTransitionExited();
			if (closeAfterTransition) handleClose();
		};
		return {
			onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop$1),
			onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop$1)
		};
	};
	return {
		getRootProps,
		getBackdropProps,
		getTransitionProps,
		rootRef: handleRef,
		portalRef: handlePortalRef,
		isTopModal,
		exited,
		hasTransition
	};
}
//#endregion
//#region node_modules/@mui/material/esm/Modal/modalClasses.js
function getModalUtilityClass(slot) {
	return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", [
	"root",
	"hidden",
	"backdrop"
]);
//#endregion
//#region node_modules/@mui/material/esm/Modal/Modal.js
var useUtilityClasses$46 = (ownerState) => {
	const { open, exited, classes } = ownerState;
	return composeClasses({
		root: ["root", !open && exited && "hidden"],
		backdrop: ["backdrop"]
	}, getModalUtilityClass, classes);
};
var ModalRoot = styled("div", {
	name: "MuiModal",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
	}
})(memoTheme(({ theme }) => ({
	position: "fixed",
	zIndex: (theme.vars || theme).zIndex.modal,
	right: 0,
	bottom: 0,
	top: 0,
	left: 0,
	variants: [{
		props: ({ ownerState }) => !ownerState.open && ownerState.exited,
		style: { visibility: "hidden" }
	}]
})));
var ModalBackdrop = styled(Backdrop, {
	name: "MuiModal",
	slot: "Backdrop"
})({ zIndex: -1 });
/**
* Modal is a lower-level construct that is leveraged by the following components:
*
* - [Dialog](/material-ui/api/dialog/)
* - [Drawer](/material-ui/api/drawer/)
* - [Menu](/material-ui/api/menu/)
* - [Popover](/material-ui/api/popover/)
*
* If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
* rather than directly using Modal.
*
* This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
*/
var Modal = /* @__PURE__ */ import_react.forwardRef(function Modal(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiModal",
		props: inProps
	});
	const { BackdropComponent = ModalBackdrop, BackdropProps, classes: classesProp, className, closeAfterTransition = false, children, container, component, components = {}, componentsProps = {}, disableAutoFocus = false, disableEnforceFocus = false, disableEscapeKeyDown = false, disablePortal = false, disableRestoreFocus = false, disableScrollLock = false, hideBackdrop = false, keepMounted = false, onClose, onTransitionEnter, onTransitionExited, open, slotProps = {}, slots = {}, theme, ...other } = props;
	const propsWithDefaults = {
		...props,
		closeAfterTransition,
		disableAutoFocus,
		disableEnforceFocus,
		disableEscapeKeyDown,
		disablePortal,
		disableRestoreFocus,
		disableScrollLock,
		hideBackdrop,
		keepMounted
	};
	const { getRootProps, getBackdropProps, getTransitionProps, portalRef, isTopModal, exited, hasTransition } = useModal({
		...propsWithDefaults,
		rootRef: ref
	});
	const ownerState = {
		...propsWithDefaults,
		exited
	};
	const classes = useUtilityClasses$46(ownerState);
	const childProps = {};
	if (children.props.tabIndex === void 0) childProps.tabIndex = "-1";
	if (hasTransition) {
		const { onEnter, onExited } = getTransitionProps();
		childProps.onEnter = onEnter;
		childProps.onExited = onExited;
	}
	const externalForwardedProps = {
		slots: {
			root: components.Root,
			backdrop: components.Backdrop,
			...slots
		},
		slotProps: {
			...componentsProps,
			...slotProps
		}
	};
	const [RootSlot, rootProps] = useSlot("root", {
		ref,
		elementType: ModalRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		getSlotProps: getRootProps,
		ownerState,
		className: clsx(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
	});
	const [BackdropSlot, backdropProps] = useSlot("backdrop", {
		ref: BackdropProps?.ref,
		elementType: BackdropComponent,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: BackdropProps,
		getSlotProps: (otherHandlers) => {
			return getBackdropProps({
				...otherHandlers,
				onClick: (event) => {
					if (otherHandlers?.onClick) otherHandlers.onClick(event);
				}
			});
		},
		className: clsx(BackdropProps?.className, classes?.backdrop),
		ownerState
	});
	if (!keepMounted && !open && (!hasTransition || exited)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		ref: portalRef,
		container,
		disablePortal,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
			...rootProps,
			children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackdropSlot, { ...backdropProps }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap, {
				disableEnforceFocus,
				disableAutoFocus,
				disableRestoreFocus,
				isEnabled: isTopModal,
				open,
				children: /* @__PURE__ */ import_react.cloneElement(children, childProps)
			})]
		})
	});
});
Modal.propTypes = {
	BackdropComponent: import_prop_types.default.elementType,
	BackdropProps: import_prop_types.default.object,
	children: elementAcceptingRef.isRequired,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	closeAfterTransition: import_prop_types.default.bool,
	component: import_prop_types.default.elementType,
	components: import_prop_types.default.shape({
		Backdrop: import_prop_types.default.elementType,
		Root: import_prop_types.default.elementType
	}),
	componentsProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	disableAutoFocus: import_prop_types.default.bool,
	disableEnforceFocus: import_prop_types.default.bool,
	disableEscapeKeyDown: import_prop_types.default.bool,
	disablePortal: import_prop_types.default.bool,
	disableRestoreFocus: import_prop_types.default.bool,
	disableScrollLock: import_prop_types.default.bool,
	hideBackdrop: import_prop_types.default.bool,
	keepMounted: import_prop_types.default.bool,
	onClose: import_prop_types.default.func,
	onTransitionEnter: import_prop_types.default.func,
	onTransitionExited: import_prop_types.default.func,
	open: import_prop_types.default.bool.isRequired,
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/esm/Paper/paperClasses.js
function getPaperUtilityClass(slot) {
	return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", [
	"root",
	"rounded",
	"outlined",
	"elevation",
	"elevation0",
	"elevation1",
	"elevation2",
	"elevation3",
	"elevation4",
	"elevation5",
	"elevation6",
	"elevation7",
	"elevation8",
	"elevation9",
	"elevation10",
	"elevation11",
	"elevation12",
	"elevation13",
	"elevation14",
	"elevation15",
	"elevation16",
	"elevation17",
	"elevation18",
	"elevation19",
	"elevation20",
	"elevation21",
	"elevation22",
	"elevation23",
	"elevation24"
]);
//#endregion
//#region node_modules/@mui/material/esm/Paper/Paper.js
var useUtilityClasses$45 = (ownerState) => {
	const { square, elevation, variant, classes } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		!square && "rounded",
		variant === "elevation" && `elevation${elevation}`
	] }, getPaperUtilityClass, classes);
};
var PaperRoot = styled("div", {
	name: "MuiPaper",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			!ownerState.square && styles.rounded,
			ownerState.variant === "elevation" && styles[`elevation${ownerState.elevation}`]
		];
	}
})(memoTheme(({ theme }) => ({
	backgroundColor: (theme.vars || theme).palette.background.paper,
	color: (theme.vars || theme).palette.text.primary,
	transition: theme.transitions.create("box-shadow"),
	variants: [
		{
			props: ({ ownerState }) => !ownerState.square,
			style: { borderRadius: theme.shape.borderRadius }
		},
		{
			props: { variant: "outlined" },
			style: { border: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: { variant: "elevation" },
			style: {
				boxShadow: "var(--Paper-shadow)",
				backgroundImage: "var(--Paper-overlay)"
			}
		}
	]
})));
var Paper = /* @__PURE__ */ import_react.forwardRef(function Paper(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPaper"
	});
	const theme = useTheme$2();
	const { className, component = "div", elevation = 1, square = false, variant = "elevation", ...other } = props;
	const ownerState = {
		...props,
		component,
		elevation,
		square,
		variant
	};
	const classes = useUtilityClasses$45(ownerState);
	if (theme.shadows[elevation] === void 0) console.error([`MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join("\n"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperRoot, {
		as: component,
		ownerState,
		className: clsx(classes.root, className),
		ref,
		...other,
		style: {
			...variant === "elevation" && {
				"--Paper-shadow": (theme.vars || theme).shadows[elevation],
				...theme.vars && { "--Paper-overlay": theme.vars.overlays?.[elevation] },
				...!theme.vars && theme.palette.mode === "dark" && { "--Paper-overlay": `linear-gradient(${alpha("#fff", getOverlayAlpha(elevation))}, ${alpha("#fff", getOverlayAlpha(elevation))})` }
			},
			...other.style
		}
	});
});
Paper.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	elevation: chainPropTypes(integerPropType, (props) => {
		const { elevation, variant } = props;
		if (elevation > 0 && variant === "outlined") return /* @__PURE__ */ new Error(`MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
		return null;
	}),
	square: import_prop_types.default.bool,
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
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["elevation", "outlined"]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/esm/Popover/popoverClasses.js
function getPopoverUtilityClass(slot) {
	return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
//#endregion
//#region node_modules/@mui/material/esm/Popover/Popover.js
function getOffsetTop(rect, vertical) {
	let offset = 0;
	if (typeof vertical === "number") offset = vertical;
	else if (vertical === "center") offset = rect.height / 2;
	else if (vertical === "bottom") offset = rect.height;
	return offset;
}
function getOffsetLeft(rect, horizontal) {
	let offset = 0;
	if (typeof horizontal === "number") offset = horizontal;
	else if (horizontal === "center") offset = rect.width / 2;
	else if (horizontal === "right") offset = rect.width;
	return offset;
}
function getTransformOriginValue(transformOrigin) {
	return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl$1(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var useUtilityClasses$44 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"]
	}, getPopoverUtilityClass, classes);
};
var PopoverRoot = styled(Modal, {
	name: "MuiPopover",
	slot: "Root"
})({});
var PopoverPaper = styled(Paper, {
	name: "MuiPopover",
	slot: "Paper"
})({
	position: "absolute",
	overflowY: "auto",
	overflowX: "hidden",
	minWidth: 16,
	minHeight: 16,
	maxWidth: "calc(100% - 32px)",
	maxHeight: "calc(100% - 32px)",
	outline: 0
});
var Popover = /* @__PURE__ */ import_react.forwardRef(function Popover(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiPopover"
	});
	const { action, anchorEl, anchorOrigin = {
		vertical: "top",
		horizontal: "left"
	}, anchorPosition, anchorReference = "anchorEl", children, className, container: containerProp, elevation = 8, marginThreshold = 16, open, PaperProps: PaperPropsProp = {}, slots = {}, slotProps = {}, transformOrigin = {
		vertical: "top",
		horizontal: "left"
	}, TransitionComponent, transitionDuration: transitionDurationProp = "auto", TransitionProps = {}, disableScrollLock = false, ...other } = props;
	const paperRef = import_react.useRef();
	const ownerState = {
		...props,
		anchorOrigin,
		anchorReference,
		elevation,
		marginThreshold,
		transformOrigin,
		TransitionComponent,
		transitionDuration: transitionDurationProp,
		TransitionProps
	};
	const classes = useUtilityClasses$44(ownerState);
	const getAnchorOffset = import_react.useCallback(() => {
		if (anchorReference === "anchorPosition") {
			if (!anchorPosition) console.error("MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference=\"anchorPosition\" />.");
			return anchorPosition;
		}
		const resolvedAnchorEl = resolveAnchorEl$1(anchorEl);
		const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument_default(paperRef.current).body;
		const anchorRect = anchorElement.getBoundingClientRect();
		{
			const box = anchorElement.getBoundingClientRect();
			if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) console.warn([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"The anchor element should be part of the document layout.",
				"Make sure the element is present in the document or that it's not display none."
			].join("\n"));
		}
		return {
			top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
			left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
		};
	}, [
		anchorEl,
		anchorOrigin.horizontal,
		anchorOrigin.vertical,
		anchorPosition,
		anchorReference
	]);
	const getTransformOrigin = import_react.useCallback((elemRect) => {
		return {
			vertical: getOffsetTop(elemRect, transformOrigin.vertical),
			horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
		};
	}, [transformOrigin.horizontal, transformOrigin.vertical]);
	const getPositioningStyle = import_react.useCallback((element) => {
		const elemRect = {
			width: element.offsetWidth,
			height: element.offsetHeight
		};
		const elemTransformOrigin = getTransformOrigin(elemRect);
		if (anchorReference === "none") return {
			top: null,
			left: null,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
		const anchorOffset = getAnchorOffset();
		let top = anchorOffset.top - elemTransformOrigin.vertical;
		let left = anchorOffset.left - elemTransformOrigin.horizontal;
		const bottom = top + elemRect.height;
		const right = left + elemRect.width;
		const containerWindow = ownerWindow_default(resolveAnchorEl$1(anchorEl));
		const heightThreshold = containerWindow.innerHeight - marginThreshold;
		const widthThreshold = containerWindow.innerWidth - marginThreshold;
		if (marginThreshold !== null && top < marginThreshold) {
			const diff = top - marginThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		} else if (marginThreshold !== null && bottom > heightThreshold) {
			const diff = bottom - heightThreshold;
			top -= diff;
			elemTransformOrigin.vertical += diff;
		}
		if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) console.error([
			"MUI: The popover component is too tall.",
			`Some part of it can not be seen on the screen (${elemRect.height - heightThreshold}px).`,
			"Please consider adding a `max-height` to improve the user-experience."
		].join("\n"));
		if (marginThreshold !== null && left < marginThreshold) {
			const diff = left - marginThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		} else if (right > widthThreshold) {
			const diff = right - widthThreshold;
			left -= diff;
			elemTransformOrigin.horizontal += diff;
		}
		return {
			top: `${Math.round(top)}px`,
			left: `${Math.round(left)}px`,
			transformOrigin: getTransformOriginValue(elemTransformOrigin)
		};
	}, [
		anchorEl,
		anchorReference,
		getAnchorOffset,
		getTransformOrigin,
		marginThreshold
	]);
	const [isPositioned, setIsPositioned] = import_react.useState(open);
	const setPositioningStyles = import_react.useCallback(() => {
		const element = paperRef.current;
		if (!element) return;
		const positioning = getPositioningStyle(element);
		if (positioning.top !== null) element.style.setProperty("top", positioning.top);
		if (positioning.left !== null) element.style.left = positioning.left;
		element.style.transformOrigin = positioning.transformOrigin;
		setIsPositioned(true);
	}, [getPositioningStyle]);
	import_react.useEffect(() => {
		if (disableScrollLock) window.addEventListener("scroll", setPositioningStyles);
		return () => window.removeEventListener("scroll", setPositioningStyles);
	}, [
		anchorEl,
		disableScrollLock,
		setPositioningStyles
	]);
	const handleEntering = () => {
		setPositioningStyles();
	};
	const handleExited = () => {
		setIsPositioned(false);
	};
	import_react.useEffect(() => {
		if (open) setPositioningStyles();
	});
	import_react.useImperativeHandle(action, () => open ? { updatePosition: () => {
		setPositioningStyles();
	} } : null, [open, setPositioningStyles]);
	import_react.useEffect(() => {
		if (!open) return;
		const handleResize = debounce_default(() => {
			setPositioningStyles();
		});
		const containerWindow = ownerWindow_default(resolveAnchorEl$1(anchorEl));
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [
		anchorEl,
		open,
		setPositioningStyles
	]);
	let transitionDuration = transitionDurationProp;
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			transition: TransitionProps,
			paper: PaperPropsProp,
			...slotProps
		}
	};
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Grow,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onEntering: (element, isAppearing) => {
				handlers.onEntering?.(element, isAppearing);
				handleEntering();
			},
			onExited: (element) => {
				handlers.onExited?.(element);
				handleExited();
			}
		}),
		additionalProps: {
			appear: true,
			in: open
		}
	});
	if (transitionDurationProp === "auto" && !TransitionSlot.muiSupportAuto) transitionDuration = void 0;
	const container = containerProp || (anchorEl ? ownerDocument_default(resolveAnchorEl$1(anchorEl)).body : void 0);
	const [RootSlot, { slots: rootSlotsProp, slotProps: rootSlotPropsProp, ...rootProps }] = useSlot("root", {
		ref,
		elementType: PopoverRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		shouldForwardComponentProp: true,
		additionalProps: {
			slots: { backdrop: slots.backdrop },
			slotProps: { backdrop: mergeSlotProps$1(typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop, { invisible: true }) },
			container,
			open
		},
		ownerState,
		className: clsx(classes.root, className)
	});
	const [PaperSlot, paperProps] = useSlot("paper", {
		ref: paperRef,
		className: classes.paper,
		elementType: PopoverPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		additionalProps: {
			elevation,
			style: isPositioned ? void 0 : { opacity: 0 }
		},
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		...rootProps,
		...!isHostComponent(RootSlot) && {
			slots: rootSlotsProp,
			slotProps: rootSlotPropsProp,
			disableScrollLock
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			timeout: transitionDuration,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
				...paperProps,
				children
			})
		})
	});
});
Popover.propTypes = {
	action: refType,
	anchorEl: chainPropTypes(import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]), (props) => {
		if (props.open && (!props.anchorReference || props.anchorReference === "anchorEl")) {
			const resolvedAnchorEl = resolveAnchorEl$1(props.anchorEl);
			if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
				const box = resolvedAnchorEl.getBoundingClientRect();
				if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) return new Error([
					"MUI: The `anchorEl` prop provided to the component is invalid.",
					"The anchor element should be part of the document layout.",
					"Make sure the element is present in the document or that it's not display none."
				].join("\n"));
			} else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${resolvedAnchorEl}\` instead.`].join("\n"));
		}
		return null;
	}),
	anchorOrigin: import_prop_types.default.shape({
		horizontal: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"center",
			"left",
			"right"
		]), import_prop_types.default.number]).isRequired,
		vertical: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"bottom",
			"center",
			"top"
		]), import_prop_types.default.number]).isRequired
	}),
	anchorPosition: import_prop_types.default.shape({
		left: import_prop_types.default.number.isRequired,
		top: import_prop_types.default.number.isRequired
	}),
	anchorReference: import_prop_types.default.oneOf([
		"anchorEl",
		"anchorPosition",
		"none"
	]),
	BackdropComponent: import_prop_types.default.elementType,
	BackdropProps: import_prop_types.default.object,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	disableScrollLock: import_prop_types.default.bool,
	elevation: integerPropType,
	marginThreshold: import_prop_types.default.number,
	onClose: import_prop_types.default.func,
	open: import_prop_types.default.bool.isRequired,
	PaperProps: import_prop_types.default.shape({ component: elementTypeAcceptingRef_default }),
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		paper: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		paper: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	transformOrigin: import_prop_types.default.shape({
		horizontal: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"center",
			"left",
			"right"
		]), import_prop_types.default.number]).isRequired,
		vertical: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
			"bottom",
			"center",
			"top"
		]), import_prop_types.default.number]).isRequired
	}),
	TransitionComponent: import_prop_types.default.elementType,
	transitionDuration: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.number,
		import_prop_types.default.shape({
			appear: import_prop_types.default.number,
			enter: import_prop_types.default.number,
			exit: import_prop_types.default.number
		})
	]),
	TransitionProps: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/material/esm/Menu/menuClasses.js
function getMenuUtilityClass(slot) {
	return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", [
	"root",
	"paper",
	"list"
]);
//#endregion
//#region node_modules/@mui/material/esm/Menu/Menu.js
var RTL_ORIGIN = {
	vertical: "top",
	horizontal: "right"
};
var LTR_ORIGIN = {
	vertical: "top",
	horizontal: "left"
};
var useUtilityClasses$43 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({
		root: ["root"],
		paper: ["paper"],
		list: ["list"]
	}, getMenuUtilityClass, classes);
};
var MenuRoot = styled(Popover, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiMenu",
	slot: "Root"
})({});
var MenuPaper = styled(PopoverPaper, {
	name: "MuiMenu",
	slot: "Paper"
})({
	maxHeight: "calc(100% - 96px)",
	WebkitOverflowScrolling: "touch"
});
var MenuMenuList = styled(MenuList, {
	name: "MuiMenu",
	slot: "List"
})({ outline: 0 });
var Menu = /* @__PURE__ */ import_react.forwardRef(function Menu(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiMenu"
	});
	const { autoFocus = true, children, className, disableAutoFocusItem = false, MenuListProps = {}, onClose, open, PaperProps = {}, PopoverClasses, transitionDuration = "auto", TransitionProps: { onEntering, ...TransitionProps } = {}, variant = "selectedMenu", slots = {}, slotProps = {}, ...other } = props;
	const isRtl = useRtl();
	const ownerState = {
		...props,
		autoFocus,
		disableAutoFocusItem,
		MenuListProps,
		onEntering,
		PaperProps,
		transitionDuration,
		TransitionProps,
		variant
	};
	const classes = useUtilityClasses$43(ownerState);
	const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
	const menuListActionsRef = import_react.useRef(null);
	const handleEntering = (element, isAppearing) => {
		if (menuListActionsRef.current) menuListActionsRef.current.adjustStyleForScrollbar(element, { direction: isRtl ? "rtl" : "ltr" });
		if (onEntering) onEntering(element, isAppearing);
	};
	const handleListKeyDown = (event) => {
		if (event.key === "Tab") {
			event.preventDefault();
			if (onClose) onClose(event, "tabKeyDown");
		}
	};
	/**
	* the index of the item should receive focus
	* in a `variant="selectedMenu"` it's the first `selected` item
	* otherwise it's the very first item.
	*/
	let activeItemIndex = -1;
	import_react.Children.map(children, (child, index) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return;
		if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
		if (!child.props.disabled) {
			if (variant === "selectedMenu" && child.props.selected) activeItemIndex = index;
			else if (activeItemIndex === -1) activeItemIndex = index;
		}
	});
	const externalForwardedProps = {
		slots,
		slotProps: {
			list: MenuListProps,
			transition: TransitionProps,
			paper: PaperProps,
			...slotProps
		}
	};
	const rootSlotProps = useSlotProps({
		elementType: slots.root,
		externalSlotProps: slotProps.root,
		ownerState,
		className: [classes.root, className]
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		className: classes.paper,
		elementType: MenuPaper,
		externalForwardedProps,
		shouldForwardComponentProp: true,
		ownerState
	});
	const [ListSlot, listSlotProps] = useSlot("list", {
		className: clsx(classes.list, MenuListProps.className),
		elementType: MenuMenuList,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handleListKeyDown(event);
				handlers.onKeyDown?.(event);
			}
		}),
		ownerState
	});
	const resolvedTransitionProps = typeof externalForwardedProps.slotProps.transition === "function" ? externalForwardedProps.slotProps.transition(ownerState) : externalForwardedProps.slotProps.transition;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		onClose,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: isRtl ? "right" : "left"
		},
		transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
		slots: {
			root: slots.root,
			paper: PaperSlot,
			backdrop: slots.backdrop,
			...slots.transition && { transition: slots.transition }
		},
		slotProps: {
			root: rootSlotProps,
			paper: paperSlotProps,
			backdrop: typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop,
			transition: {
				...resolvedTransitionProps,
				onEntering: (...args) => {
					handleEntering(...args);
					resolvedTransitionProps?.onEntering?.(...args);
				}
			}
		},
		open,
		ref,
		transitionDuration,
		ownerState,
		...other,
		classes: PopoverClasses,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSlot, {
			actions: menuListActionsRef,
			autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
			autoFocusItem,
			variant,
			...listSlotProps,
			children
		})
	});
});
Menu.propTypes = {
	anchorEl: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	autoFocus: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	disableAutoFocusItem: import_prop_types.default.bool,
	MenuListProps: import_prop_types.default.object,
	onClose: import_prop_types.default.func,
	open: import_prop_types.default.bool.isRequired,
	PaperProps: import_prop_types.default.object,
	PopoverClasses: import_prop_types.default.object,
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		list: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		paper: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		list: import_prop_types.default.elementType,
		paper: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	transitionDuration: import_prop_types.default.oneOfType([
		import_prop_types.default.oneOf(["auto"]),
		import_prop_types.default.number,
		import_prop_types.default.shape({
			appear: import_prop_types.default.number,
			enter: import_prop_types.default.number,
			exit: import_prop_types.default.number
		})
	]),
	TransitionProps: import_prop_types.default.object,
	variant: import_prop_types.default.oneOf(["menu", "selectedMenu"])
};
//#endregion
//#region node_modules/@mui/material/esm/NativeSelect/nativeSelectClasses.js
function getNativeSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiNativeSelect", slot);
}
var nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/@mui/material/esm/NativeSelect/NativeSelectInput.js
var useUtilityClasses$42 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	return composeClasses({
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		]
	}, getNativeSelectUtilityClasses, classes);
};
var StyledSelectSelect = styled("select", { name: "MuiNativeSelect" })(({ theme }) => ({
	MozAppearance: "none",
	WebkitAppearance: "none",
	userSelect: "none",
	borderRadius: 0,
	cursor: "pointer",
	"&:focus": { borderRadius: 0 },
	[`&.${nativeSelectClasses.disabled}`]: { cursor: "default" },
	"&[multiple]": { height: "auto" },
	"&:not([multiple]) option, &:not([multiple]) optgroup": { backgroundColor: (theme.vars || theme).palette.background.paper },
	variants: [
		{
			props: ({ ownerState }) => ownerState.variant !== "filled" && ownerState.variant !== "outlined",
			style: { "&&&": {
				paddingRight: 24,
				minWidth: 16
			} }
		},
		{
			props: { variant: "filled" },
			style: { "&&&": { paddingRight: 32 } }
		},
		{
			props: { variant: "outlined" },
			style: {
				borderRadius: (theme.vars || theme).shape.borderRadius,
				"&:focus": { borderRadius: (theme.vars || theme).shape.borderRadius },
				"&&&": { paddingRight: 32 }
			}
		}
	]
}));
var NativeSelectSelect = styled(StyledSelectSelect, {
	name: "MuiNativeSelect",
	slot: "Select",
	shouldForwardProp: rootShouldForwardProp,
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.select,
			styles[ownerState.variant],
			ownerState.error && styles.error,
			{ [`&.${nativeSelectClasses.multiple}`]: styles.multiple }
		];
	}
})({});
var StyledSelectIcon = styled("svg", { name: "MuiNativeSelect" })(({ theme }) => ({
	position: "absolute",
	right: 0,
	top: "calc(50% - .5em)",
	pointerEvents: "none",
	color: (theme.vars || theme).palette.action.active,
	[`&.${nativeSelectClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
	variants: [
		{
			props: ({ ownerState }) => ownerState.open,
			style: { transform: "rotate(180deg)" }
		},
		{
			props: { variant: "filled" },
			style: { right: 7 }
		},
		{
			props: { variant: "outlined" },
			style: { right: 7 }
		}
	]
}));
var NativeSelectIcon = styled(StyledSelectIcon, {
	name: "MuiNativeSelect",
	slot: "Icon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.icon,
			ownerState.variant && styles[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles.iconOpen
		];
	}
})({});
/**
* @ignore - internal component.
*/
var NativeSelectInput = /* @__PURE__ */ import_react.forwardRef(function NativeSelectInput(props, ref) {
	const { className, disabled, error, IconComponent, inputRef, variant = "standard", ...other } = props;
	const ownerState = {
		...props,
		disabled,
		variant,
		error
	};
	const classes = useUtilityClasses$42(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectSelect, {
		ownerState,
		className: clsx(classes.select, className),
		disabled,
		ref: inputRef || ref,
		...other
	}), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectIcon, {
		as: IconComponent,
		ownerState,
		className: classes.icon
	})] });
});
NativeSelectInput.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	IconComponent: import_prop_types.default.elementType.isRequired,
	inputRef: refType,
	multiple: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func,
	value: import_prop_types.default.any,
	variant: import_prop_types.default.oneOf([
		"standard",
		"outlined",
		"filled"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/Select/selectClasses.js
function getSelectUtilityClasses(slot) {
	return generateUtilityClass("MuiSelect", slot);
}
var selectClasses = generateUtilityClasses("MuiSelect", [
	"root",
	"select",
	"multiple",
	"filled",
	"outlined",
	"standard",
	"disabled",
	"focused",
	"icon",
	"iconOpen",
	"iconFilled",
	"iconOutlined",
	"iconStandard",
	"nativeInput",
	"error"
]);
//#endregion
//#region node_modules/@mui/material/esm/Select/SelectInput.js
var _span$1;
var SelectSelect = styled(StyledSelectSelect, {
	name: "MuiSelect",
	slot: "Select",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`&.${selectClasses.select}`]: styles.select },
			{ [`&.${selectClasses.select}`]: styles[ownerState.variant] },
			{ [`&.${selectClasses.error}`]: styles.error },
			{ [`&.${selectClasses.multiple}`]: styles.multiple }
		];
	}
})({ [`&.${selectClasses.select}`]: {
	height: "auto",
	minHeight: "1.4375em",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	overflow: "hidden"
} });
var SelectIcon = styled(StyledSelectIcon, {
	name: "MuiSelect",
	slot: "Icon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.icon,
			ownerState.variant && styles[`icon${capitalize_default(ownerState.variant)}`],
			ownerState.open && styles.iconOpen
		];
	}
})({});
var SelectNativeInput = styled("input", {
	shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
	name: "MuiSelect",
	slot: "NativeInput"
})({
	bottom: 0,
	left: 0,
	position: "absolute",
	opacity: 0,
	pointerEvents: "none",
	width: "100%",
	boxSizing: "border-box"
});
function areEqualValues(a, b) {
	if (typeof b === "object" && b !== null) return a === b;
	return String(a) === String(b);
}
function isEmpty(display) {
	return display == null || typeof display === "string" && !display.trim();
}
var useUtilityClasses$41 = (ownerState) => {
	const { classes, variant, disabled, multiple, open, error } = ownerState;
	return composeClasses({
		select: [
			"select",
			variant,
			disabled && "disabled",
			multiple && "multiple",
			error && "error"
		],
		icon: [
			"icon",
			`icon${capitalize_default(variant)}`,
			open && "iconOpen",
			disabled && "disabled"
		],
		nativeInput: ["nativeInput"]
	}, getSelectUtilityClasses, classes);
};
/**
* @ignore - internal component.
*/
var SelectInput = /* @__PURE__ */ import_react.forwardRef(function SelectInput(props, ref) {
	const { "aria-describedby": ariaDescribedby, "aria-label": ariaLabel, autoFocus, autoWidth, children, className, defaultOpen, defaultValue, disabled, displayEmpty, error = false, IconComponent, inputRef: inputRefProp, labelId, MenuProps = {}, multiple, name, onBlur, onChange, onClose, onFocus, onKeyDown, onMouseDown, onOpen, open: openProp, readOnly, renderValue, required, SelectDisplayProps = {}, tabIndex: tabIndexProp, type, value: valueProp, variant = "standard", ...other } = props;
	const [value, setValueState] = useControlled_default({
		controlled: valueProp,
		default: defaultValue,
		name: "Select"
	});
	const [openState, setOpenState] = useControlled_default({
		controlled: openProp,
		default: defaultOpen,
		name: "Select"
	});
	const inputRef = import_react.useRef(null);
	const displayRef = import_react.useRef(null);
	const [displayNode, setDisplayNode] = import_react.useState(null);
	const { current: isOpenControlled } = import_react.useRef(openProp != null);
	const [menuMinWidthState, setMenuMinWidthState] = import_react.useState();
	const handleRef = useForkRef_default(ref, inputRefProp);
	const handleDisplayRef = import_react.useCallback((node) => {
		displayRef.current = node;
		if (node) setDisplayNode(node);
	}, []);
	const anchorElement = displayNode?.parentNode;
	import_react.useImperativeHandle(handleRef, () => ({
		focus: () => {
			displayRef.current.focus();
		},
		node: inputRef.current,
		value
	}), [value]);
	const open = displayNode !== null && openState;
	import_react.useEffect(() => {
		if (!open || !anchorElement || autoWidth) return;
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(() => {
			setMenuMinWidthState(anchorElement.clientWidth);
		});
		observer.observe(anchorElement);
		return () => {
			observer.disconnect();
		};
	}, [
		open,
		anchorElement,
		autoWidth
	]);
	import_react.useEffect(() => {
		if (defaultOpen && openState && displayNode && !isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			displayRef.current.focus();
		}
	}, [displayNode, autoWidth]);
	import_react.useEffect(() => {
		if (autoFocus) displayRef.current.focus();
	}, [autoFocus]);
	import_react.useEffect(() => {
		if (!labelId) return;
		const label = ownerDocument_default(displayRef.current).getElementById(labelId);
		if (label) {
			const handler = () => {
				if (getSelection().isCollapsed) displayRef.current.focus();
			};
			label.addEventListener("click", handler);
			return () => {
				label.removeEventListener("click", handler);
			};
		}
	}, [labelId]);
	const update = (openParam, event) => {
		if (openParam) {
			if (onOpen) onOpen(event);
		} else if (onClose) onClose(event);
		if (!isOpenControlled) {
			setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
			setOpenState(openParam);
		}
	};
	const handleMouseDown = (event) => {
		onMouseDown?.(event);
		if (event.button !== 0) return;
		event.preventDefault();
		displayRef.current.focus();
		update(true, event);
	};
	const handleClose = (event) => {
		update(false, event);
	};
	const childrenArray = import_react.Children.toArray(children);
	const handleChange = (event) => {
		const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);
		if (child === void 0) return;
		setValueState(child.props.value);
		if (onChange) onChange(event, child);
	};
	const handleItemClick = (child) => (event) => {
		let newValue;
		if (!event.currentTarget.hasAttribute("tabindex")) return;
		if (multiple) {
			newValue = Array.isArray(value) ? value.slice() : [];
			const itemIndex = value.indexOf(child.props.value);
			if (itemIndex === -1) newValue.push(child.props.value);
			else newValue.splice(itemIndex, 1);
		} else newValue = child.props.value;
		if (child.props.onClick) child.props.onClick(event);
		if (value !== newValue) {
			setValueState(newValue);
			if (onChange) {
				const nativeEvent = event.nativeEvent || event;
				const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
				Object.defineProperty(clonedEvent, "target", {
					writable: true,
					value: {
						value: newValue,
						name
					}
				});
				onChange(clonedEvent, child);
			}
		}
		if (!multiple) update(false, event);
	};
	const handleKeyDown = (event) => {
		if (!readOnly) {
			if ([
				" ",
				"ArrowUp",
				"ArrowDown",
				"Enter"
			].includes(event.key)) {
				event.preventDefault();
				update(true, event);
			}
			onKeyDown?.(event);
		}
	};
	const handleBlur = (event) => {
		if (!open && onBlur) {
			Object.defineProperty(event, "target", {
				writable: true,
				value: {
					value,
					name
				}
			});
			onBlur(event);
		}
	};
	delete other["aria-invalid"];
	let display;
	let displaySingle;
	const displayMultiple = [];
	let computeDisplay = false;
	let foundMatch = false;
	if (isFilled({ value }) || displayEmpty) if (renderValue) display = renderValue(value);
	else computeDisplay = true;
	const items = childrenArray.map((child) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return null;
		if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
		let selected;
		if (multiple) {
			if (!Array.isArray(value)) throw new Error("MUI: The `value` prop must be an array when using the `Select` component with `multiple`.");
			selected = value.some((v) => areEqualValues(v, child.props.value));
			if (selected && computeDisplay) displayMultiple.push(child.props.children);
		} else {
			selected = areEqualValues(value, child.props.value);
			if (selected && computeDisplay) displaySingle = child.props.children;
		}
		if (selected) foundMatch = true;
		return /* @__PURE__ */ import_react.cloneElement(child, {
			"aria-selected": selected ? "true" : "false",
			onClick: handleItemClick(child),
			onKeyUp: (event) => {
				if (event.key === " ") event.preventDefault();
				if (child.props.onKeyUp) child.props.onKeyUp(event);
			},
			role: "option",
			selected,
			value: void 0,
			"data-value": child.props.value
		});
	});
	import_react.useEffect(() => {
		if (!foundMatch && !multiple && value !== "") {
			const values = childrenArray.map((child) => child.props.value);
			console.warn([
				`MUI: You have provided an out-of-range value \`${value}\` for the select ${name ? `(name="${name}") ` : ""}component.`,
				"Consider providing a value that matches one of the available options or ''.",
				`The available values are ${values.filter((x) => x != null).map((x) => `\`${x}\``).join(", ") || "\"\""}.`
			].join("\n"));
		}
	}, [
		foundMatch,
		childrenArray,
		multiple,
		name,
		value
	]);
	if (computeDisplay) if (multiple) if (displayMultiple.length === 0) display = null;
	else display = displayMultiple.reduce((output, child, index) => {
		output.push(child);
		if (index < displayMultiple.length - 1) output.push(", ");
		return output;
	}, []);
	else display = displaySingle;
	let menuMinWidth = menuMinWidthState;
	if (!autoWidth && isOpenControlled && displayNode) menuMinWidth = anchorElement.clientWidth;
	let tabIndex;
	if (typeof tabIndexProp !== "undefined") tabIndex = tabIndexProp;
	else tabIndex = disabled ? null : 0;
	const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
	const ownerState = {
		...props,
		variant,
		value,
		open,
		error
	};
	const classes = useUtilityClasses$41(ownerState);
	const paperProps = {
		...MenuProps.PaperProps,
		...typeof MenuProps.slotProps?.paper === "function" ? MenuProps.slotProps.paper(ownerState) : MenuProps.slotProps?.paper
	};
	const listProps = {
		...MenuProps.MenuListProps,
		...typeof MenuProps.slotProps?.list === "function" ? MenuProps.slotProps.list(ownerState) : MenuProps.slotProps?.list
	};
	const listboxId = useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSelect, {
			as: "div",
			ref: handleDisplayRef,
			tabIndex,
			role: "combobox",
			"aria-controls": open ? listboxId : void 0,
			"aria-disabled": disabled ? "true" : void 0,
			"aria-expanded": open ? "true" : "false",
			"aria-haspopup": "listbox",
			"aria-label": ariaLabel,
			"aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
			"aria-describedby": ariaDescribedby,
			"aria-required": required ? "true" : void 0,
			"aria-invalid": error ? "true" : void 0,
			onKeyDown: handleKeyDown,
			onMouseDown: disabled || readOnly ? null : handleMouseDown,
			onBlur: handleBlur,
			onFocus,
			...SelectDisplayProps,
			ownerState,
			className: clsx(SelectDisplayProps.className, classes.select, className),
			id: buttonId,
			children: isEmpty(display) ? _span$1 || (_span$1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : display
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectNativeInput, {
			"aria-invalid": error,
			value: Array.isArray(value) ? value.join(",") : value,
			name,
			ref: inputRef,
			"aria-hidden": true,
			onChange: handleChange,
			tabIndex: -1,
			disabled,
			className: classes.nativeInput,
			autoFocus,
			required,
			...other,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			as: IconComponent,
			className: classes.icon,
			ownerState
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
			id: `menu-${name || ""}`,
			anchorEl: anchorElement,
			open,
			onClose: handleClose,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center"
			},
			transformOrigin: {
				vertical: "top",
				horizontal: "center"
			},
			...MenuProps,
			slotProps: {
				...MenuProps.slotProps,
				list: {
					"aria-labelledby": labelId,
					role: "listbox",
					"aria-multiselectable": multiple ? "true" : void 0,
					disableListWrap: true,
					id: listboxId,
					...listProps
				},
				paper: {
					...paperProps,
					style: {
						minWidth: menuMinWidth,
						...paperProps != null ? paperProps.style : null
					}
				}
			},
			children: items
		})
	] });
});
SelectInput.propTypes = {
	"aria-describedby": import_prop_types.default.string,
	"aria-label": import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	autoWidth: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultOpen: import_prop_types.default.bool,
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	displayEmpty: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	IconComponent: import_prop_types.default.elementType.isRequired,
	inputRef: refType,
	labelId: import_prop_types.default.string,
	MenuProps: import_prop_types.default.object,
	multiple: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	readOnly: import_prop_types.default.bool,
	renderValue: import_prop_types.default.func,
	required: import_prop_types.default.bool,
	SelectDisplayProps: import_prop_types.default.object,
	tabIndex: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	type: import_prop_types.default.any,
	value: import_prop_types.default.any,
	variant: import_prop_types.default.oneOf([
		"standard",
		"outlined",
		"filled"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/ArrowDropDown.js
/**
* @ignore - internal component.
*/
var ArrowDropDown_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 10l5 5 5-5z" }), "ArrowDropDown");
//#endregion
//#region node_modules/@mui/material/esm/Select/Select.js
var useUtilityClasses$40 = (ownerState) => {
	const { classes } = ownerState;
	const composedClasses = composeClasses({ root: ["root"] }, getSelectUtilityClasses, classes);
	return {
		...classes,
		...composedClasses
	};
};
var styledRootConfig = {
	name: "MuiSelect",
	slot: "Root",
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "variant"
};
var StyledInput = styled(Input, styledRootConfig)("");
var StyledOutlinedInput = styled(OutlinedInput, styledRootConfig)("");
var StyledFilledInput = styled(FilledInput, styledRootConfig)("");
var Select = /* @__PURE__ */ import_react.forwardRef(function Select(inProps, ref) {
	const props = useDefaultProps({
		name: "MuiSelect",
		props: inProps
	});
	const { autoWidth = false, children, classes: classesProp = {}, className, defaultOpen = false, displayEmpty = false, IconComponent = ArrowDropDown_default, id, input, inputProps, label, labelId, MenuProps, multiple = false, native = false, onClose, onOpen, open, renderValue, SelectDisplayProps, variant: variantProp = "outlined", ...other } = props;
	const inputComponent = native ? NativeSelectInput : SelectInput;
	const fcs = formControlState({
		props,
		muiFormControl: useFormControl(),
		states: ["variant", "error"]
	});
	const variant = fcs.variant || variantProp;
	const ownerState = {
		...props,
		variant,
		classes: classesProp
	};
	const classes = useUtilityClasses$40(ownerState);
	const { root, ...restOfClasses } = classes;
	const InputComponent = input || {
		standard: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledInput, { ownerState }),
		outlined: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledOutlinedInput, {
			label,
			ownerState
		}),
		filled: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledFilledInput, { ownerState })
	}[variant];
	const inputComponentRef = useForkRef_default(ref, getReactElementRef(InputComponent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: /* @__PURE__ */ import_react.cloneElement(InputComponent, {
		inputComponent,
		inputProps: {
			children,
			error: fcs.error,
			IconComponent,
			variant,
			type: void 0,
			multiple,
			...native ? { id } : {
				autoWidth,
				defaultOpen,
				displayEmpty,
				labelId,
				MenuProps,
				onClose,
				onOpen,
				open,
				renderValue,
				SelectDisplayProps: {
					id,
					...SelectDisplayProps
				}
			},
			...inputProps,
			classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
			...input ? input.props.inputProps : {}
		},
		...(multiple && native || displayEmpty) && variant === "outlined" ? { notched: true } : {},
		ref: inputComponentRef,
		className: clsx(InputComponent.props.className, className, classes.root),
		...!input && { variant },
		...other
	}) });
});
Select.propTypes = {
	autoWidth: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultOpen: import_prop_types.default.bool,
	defaultValue: import_prop_types.default.any,
	displayEmpty: import_prop_types.default.bool,
	IconComponent: import_prop_types.default.elementType,
	id: import_prop_types.default.string,
	input: import_prop_types.default.element,
	inputProps: import_prop_types.default.object,
	label: import_prop_types.default.node,
	labelId: import_prop_types.default.string,
	MenuProps: import_prop_types.default.object,
	multiple: import_prop_types.default.bool,
	native: import_prop_types.default.bool,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	renderValue: import_prop_types.default.func,
	SelectDisplayProps: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	value: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([""]), import_prop_types.default.any]),
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
Select.muiName = "Select";
//#endregion
//#region node_modules/@mui/material/esm/TextField/textFieldClasses.js
function getTextFieldUtilityClass(slot) {
	return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/TextField/TextField.js
var variantComponent = {
	standard: Input,
	filled: FilledInput,
	outlined: OutlinedInput
};
var useUtilityClasses$39 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTextFieldUtilityClass, classes);
};
var TextFieldRoot = styled(FormControl, {
	name: "MuiTextField",
	slot: "Root"
})({});
/**
* The `TextField` is a convenience wrapper for the most common cases (80%).
* It cannot be all things to all people, otherwise the API would grow out of control.
*
* ## Advanced Configuration
*
* It's important to understand that the text field is a simple abstraction
* on top of the following components:
*
* - [FormControl](/material-ui/api/form-control/)
* - [InputLabel](/material-ui/api/input-label/)
* - [FilledInput](/material-ui/api/filled-input/)
* - [OutlinedInput](/material-ui/api/outlined-input/)
* - [Input](/material-ui/api/input/)
* - [FormHelperText](/material-ui/api/form-helper-text/)
*
* If you wish to alter the props applied to the `input` element, you can do so as follows:
*
* ```jsx
* const inputProps = {
*   step: 300,
* };
*
* return <TextField id="time" type="time" inputProps={inputProps} />;
* ```
*
* For advanced cases, please look at the source of TextField by clicking on the
* "Edit this page" button above. Consider either:
*
* - using the upper case props for passing values directly to the components
* - using the underlying components directly as shown in the demos
*/
var TextField = /* @__PURE__ */ import_react.forwardRef(function TextField(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTextField"
	});
	const { autoComplete, autoFocus = false, children, className, color = "primary", defaultValue, disabled = false, error = false, FormHelperTextProps: FormHelperTextPropsProp, fullWidth = false, helperText, id: idOverride, InputLabelProps: InputLabelPropsProp, inputProps: inputPropsProp, InputProps: InputPropsProp, inputRef, label, maxRows, minRows, multiline = false, name, onBlur, onChange, onFocus, placeholder, required = false, rows, select = false, SelectProps: SelectPropsProp, slots = {}, slotProps = {}, type, value, variant = "outlined", ...other } = props;
	const ownerState = {
		...props,
		autoFocus,
		color,
		disabled,
		error,
		fullWidth,
		multiline,
		required,
		select,
		variant
	};
	const classes = useUtilityClasses$39(ownerState);
	if (select && !children) console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
	const id = useId(idOverride);
	const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
	const inputLabelId = label && id ? `${id}-label` : void 0;
	const InputComponent = variantComponent[variant];
	const externalForwardedProps = {
		slots,
		slotProps: {
			input: InputPropsProp,
			inputLabel: InputLabelPropsProp,
			htmlInput: inputPropsProp,
			formHelperText: FormHelperTextPropsProp,
			select: SelectPropsProp,
			...slotProps
		}
	};
	const inputAdditionalProps = {};
	const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;
	if (variant === "outlined") {
		if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") inputAdditionalProps.notched = inputLabelSlotProps.shrink;
		inputAdditionalProps.label = label;
	}
	if (select) {
		if (!SelectPropsProp || !SelectPropsProp.native) inputAdditionalProps.id = void 0;
		inputAdditionalProps["aria-describedby"] = void 0;
	}
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: TextFieldRoot,
		shouldForwardComponentProp: true,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		className: clsx(classes.root, className),
		ref,
		additionalProps: {
			disabled,
			error,
			fullWidth,
			required,
			color,
			variant
		}
	});
	const [InputSlot, inputProps] = useSlot("input", {
		elementType: InputComponent,
		externalForwardedProps,
		additionalProps: inputAdditionalProps,
		ownerState
	});
	const [InputLabelSlot, inputLabelProps] = useSlot("inputLabel", {
		elementType: InputLabel,
		externalForwardedProps,
		ownerState
	});
	const [HtmlInputSlot, htmlInputProps] = useSlot("htmlInput", {
		elementType: "input",
		externalForwardedProps,
		ownerState
	});
	const [FormHelperTextSlot, formHelperTextProps] = useSlot("formHelperText", {
		elementType: FormHelperText,
		externalForwardedProps,
		ownerState
	});
	const [SelectSlot, selectProps] = useSlot("select", {
		elementType: Select,
		externalForwardedProps,
		ownerState
	});
	const InputElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputSlot, {
		"aria-describedby": helperTextId,
		autoComplete,
		autoFocus,
		defaultValue,
		fullWidth,
		multiline,
		name,
		rows,
		maxRows,
		minRows,
		type,
		value,
		id,
		inputRef,
		onBlur,
		onChange,
		onFocus,
		placeholder,
		inputProps: htmlInputProps,
		slots: { input: slots.htmlInput ? HtmlInputSlot : void 0 },
		...inputProps
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootProps,
		children: [
			label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabelSlot, {
				htmlFor: id,
				id: inputLabelId,
				...inputLabelProps,
				children: label
			}),
			select ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSlot, {
				"aria-describedby": helperTextId,
				id,
				labelId: inputLabelId,
				value,
				input: InputElement,
				...selectProps,
				children
			}) : InputElement,
			helperText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormHelperTextSlot, {
				id: helperTextId,
				...formHelperTextProps,
				children: helperText
			})
		]
	});
});
TextField.propTypes = {
	autoComplete: import_prop_types.default.string,
	autoFocus: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	defaultValue: import_prop_types.default.any,
	disabled: import_prop_types.default.bool,
	error: import_prop_types.default.bool,
	FormHelperTextProps: import_prop_types.default.object,
	fullWidth: import_prop_types.default.bool,
	helperText: import_prop_types.default.node,
	id: import_prop_types.default.string,
	InputLabelProps: import_prop_types.default.object,
	inputProps: import_prop_types.default.object,
	InputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	maxRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	minRows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	multiline: import_prop_types.default.bool,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	placeholder: import_prop_types.default.string,
	required: import_prop_types.default.bool,
	rows: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
	select: import_prop_types.default.bool,
	SelectProps: import_prop_types.default.object,
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	slotProps: import_prop_types.default.shape({
		formHelperText: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		htmlInput: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		input: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		inputLabel: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		select: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		formHelperText: import_prop_types.default.elementType,
		htmlInput: import_prop_types.default.elementType,
		input: import_prop_types.default.elementType,
		inputLabel: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		select: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.string,
	value: import_prop_types.default.any,
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/material/esm/InputAdornment/inputAdornmentClasses.js
function getInputAdornmentUtilityClass(slot) {
	return generateUtilityClass("MuiInputAdornment", slot);
}
var inputAdornmentClasses = generateUtilityClasses("MuiInputAdornment", [
	"root",
	"filled",
	"standard",
	"outlined",
	"positionStart",
	"positionEnd",
	"disablePointerEvents",
	"hiddenLabel",
	"sizeSmall"
]);
//#endregion
//#region node_modules/@mui/material/esm/InputAdornment/InputAdornment.js
var _span;
var overridesResolver$1 = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		styles[`position${capitalize_default(ownerState.position)}`],
		ownerState.disablePointerEvents === true && styles.disablePointerEvents,
		styles[ownerState.variant]
	];
};
var useUtilityClasses$38 = (ownerState) => {
	const { classes, disablePointerEvents, hiddenLabel, position, size, variant } = ownerState;
	return composeClasses({ root: [
		"root",
		disablePointerEvents && "disablePointerEvents",
		position && `position${capitalize_default(position)}`,
		variant,
		hiddenLabel && "hiddenLabel",
		size && `size${capitalize_default(size)}`
	] }, getInputAdornmentUtilityClass, classes);
};
var InputAdornmentRoot = styled("div", {
	name: "MuiInputAdornment",
	slot: "Root",
	overridesResolver: overridesResolver$1
})(memoTheme(({ theme }) => ({
	display: "flex",
	maxHeight: "2em",
	alignItems: "center",
	whiteSpace: "nowrap",
	color: (theme.vars || theme).palette.action.active,
	variants: [
		{
			props: { variant: "filled" },
			style: { [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]: { marginTop: 16 } }
		},
		{
			props: { position: "start" },
			style: { marginRight: 8 }
		},
		{
			props: { position: "end" },
			style: { marginLeft: 8 }
		},
		{
			props: { disablePointerEvents: true },
			style: { pointerEvents: "none" }
		}
	]
})));
var InputAdornment = /* @__PURE__ */ import_react.forwardRef(function InputAdornment(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiInputAdornment"
	});
	const { children, className, component = "div", disablePointerEvents = false, disableTypography = false, position, variant: variantProp, ...other } = props;
	const muiFormControl = useFormControl() || {};
	let variant = variantProp;
	if (variantProp && muiFormControl.variant) {
		if (variantProp === muiFormControl.variant) console.error("MUI: The `InputAdornment` variant infers the variant prop you do not have to provide one.");
	}
	if (muiFormControl && !variant) variant = muiFormControl.variant;
	const ownerState = {
		...props,
		hiddenLabel: muiFormControl.hiddenLabel,
		size: muiFormControl.size,
		disablePointerEvents,
		position,
		variant
	};
	const classes = useUtilityClasses$38(ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControlContext.Provider, {
		value: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornmentRoot, {
			as: component,
			ownerState,
			className: clsx(classes.root, className),
			ref,
			...other,
			children: typeof children === "string" && !disableTypography ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				color: "textSecondary",
				children
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [position === "start" ? _span || (_span = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "notranslate",
				"aria-hidden": true,
				children: "​"
			})) : null, children] })
		})
	});
});
InputAdornment.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	disablePointerEvents: import_prop_types.default.bool,
	disableTypography: import_prop_types.default.bool,
	position: import_prop_types.default.oneOf(["end", "start"]).isRequired,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useFieldOwnerState.js
function useFieldOwnerState(parameters) {
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const isRtl = useRtl();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, {
		isFieldDisabled: parameters.disabled ?? false,
		isFieldReadOnly: parameters.readOnly ?? false,
		isFieldRequired: parameters.required ?? false,
		fieldDirection: isRtl ? "rtl" : "ltr"
	}), [
		pickerOwnerState,
		parameters.disabled,
		parameters.readOnly,
		parameters.required,
		isRtl
	]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/pickersTextFieldClasses.js
function getPickersTextFieldUtilityClass(slot) {
	return generateUtilityClass("MuiPickersTextField", slot);
}
var pickersTextFieldClasses = generateUtilityClasses("MuiPickersTextField", [
	"root",
	"focused",
	"disabled",
	"error",
	"required"
]);
//#endregion
//#region node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js
var visuallyHidden = {
	border: 0,
	clip: "rect(0 0 0 0)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	whiteSpace: "nowrap",
	width: "1px"
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInputBase/pickersInputBaseClasses.js
function getPickersInputBaseUtilityClass(slot) {
	return generateUtilityClass("MuiPickersInputBase", slot);
}
var pickersInputBaseClasses = generateUtilityClasses("MuiPickersInputBase", [
	"root",
	"focused",
	"disabled",
	"error",
	"notchedOutline",
	"sectionContent",
	"sectionBefore",
	"sectionAfter",
	"adornedStart",
	"adornedEnd",
	"input",
	"inputSizeSmall",
	"activeBar"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersSectionList/pickersSectionListClasses.js
function getPickersSectionListUtilityClass(slot) {
	return generateUtilityClass("MuiPickersSectionList", slot);
}
var pickersSectionListClasses = generateUtilityClasses("MuiPickersSectionList", [
	"root",
	"section",
	"sectionContent"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersSectionList/PickersSectionList.js
var _excluded$39 = [
	"slots",
	"slotProps",
	"elements",
	"sectionListRef",
	"classes"
];
var PickersSectionListRoot = styled("div", {
	name: "MuiPickersSectionList",
	slot: "Root"
})({
	direction: "ltr /*! @noflip */",
	outline: "none"
});
var PickersSectionListSection = styled("span", {
	name: "MuiPickersSectionList",
	slot: "Section"
})({});
var PickersSectionListSectionSeparator = styled("span", {
	name: "MuiPickersSectionList",
	slot: "SectionSeparator"
})({ whiteSpace: "pre" });
var PickersSectionListSectionContent = styled("span", {
	name: "MuiPickersSectionList",
	slot: "SectionContent"
})({ outline: "none" });
var useUtilityClasses$37 = (classes) => {
	return composeClasses({
		root: ["root"],
		section: ["section"],
		sectionContent: ["sectionContent"]
	}, getPickersSectionListUtilityClass, classes);
};
function PickersSection(props) {
	const { slots, slotProps, element, classes } = props;
	const { ownerState } = usePickerPrivateContext();
	const Section = slots?.section ?? PickersSectionListSection;
	const sectionProps = useSlotProps({
		elementType: Section,
		externalSlotProps: slotProps?.section,
		externalForwardedProps: element.container,
		className: classes.section,
		ownerState
	});
	const SectionContent = slots?.sectionContent ?? PickersSectionListSectionContent;
	const sectionContentProps = useSlotProps({
		elementType: SectionContent,
		externalSlotProps: slotProps?.sectionContent,
		externalForwardedProps: element.content,
		additionalProps: { suppressContentEditableWarning: true },
		className: classes.sectionContent,
		ownerState
	});
	const SectionSeparator = slots?.sectionSeparator ?? PickersSectionListSectionSeparator;
	const sectionSeparatorBeforeProps = useSlotProps({
		elementType: SectionSeparator,
		externalSlotProps: slotProps?.sectionSeparator,
		externalForwardedProps: element.before,
		ownerState: _extends({}, ownerState, { separatorPosition: "before" })
	});
	const sectionSeparatorAfterProps = useSlotProps({
		elementType: SectionSeparator,
		externalSlotProps: slotProps?.sectionSeparator,
		externalForwardedProps: element.after,
		ownerState: _extends({}, ownerState, { separatorPosition: "after" })
	});
	const sectionContentRef = import_react.useRef(null);
	const handleSectionContentRef = useForkRef(sectionContentProps.ref, sectionContentRef);
	const handleContentBlur = (event) => {
		const next = event.relatedTarget;
		const root = event.currentTarget.closest(`.${pickersSectionListClasses.root}`);
		if (root && next instanceof Node && root.contains(next)) {
			event.stopPropagation();
			return;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, _extends({}, sectionProps, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionSeparator, _extends({}, sectionSeparatorBeforeProps)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionContent, _extends({}, sectionContentProps, {
			ref: handleSectionContentRef,
			onBlur: handleContentBlur
		})),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionSeparator, _extends({}, sectionSeparatorAfterProps))
	] }));
}
PickersSection.propTypes = {
	classes: import_prop_types.default.object.isRequired,
	element: import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	}).isRequired,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object
};
/**
* Demos:
*
* - [Custom field](https://mui.com/x/react-date-pickers/custom-field/)
*
* API:
*
* - [PickersSectionList API](https://mui.com/x/api/date-pickers/pickers-section-list/)
*/
var PickersSectionList = /* @__PURE__ */ import_react.forwardRef(function PickersSectionList(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersSectionList"
	});
	const { slots, slotProps, elements, sectionListRef, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$39);
	const classes = useUtilityClasses$37(classesProp);
	const { ownerState } = usePickerPrivateContext();
	const rootRef = import_react.useRef(null);
	const handleRootRef = useForkRef(ref, rootRef);
	const getRoot = (methodName) => {
		if (!rootRef.current) throw new Error(`MUI X: Cannot call sectionListRef.${methodName} before the mount of the component.`);
		return rootRef.current;
	};
	import_react.useImperativeHandle(sectionListRef, () => ({
		getRoot() {
			return getRoot("getRoot");
		},
		getSectionContainer(index) {
			return getRoot("getSectionContainer").querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"]`);
		},
		getSectionContent(index) {
			return getRoot("getSectionContent").querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"] .${pickersSectionListClasses.sectionContent}`);
		},
		getSectionIndexFromDOMElement(element) {
			const root = getRoot("getSectionIndexFromDOMElement");
			if (element == null || !root.contains(element)) return null;
			let sectionContainer = null;
			if (element.classList.contains(pickersSectionListClasses.section)) sectionContainer = element;
			else if (element.classList.contains(pickersSectionListClasses.sectionContent)) sectionContainer = element.parentElement;
			if (sectionContainer == null) return null;
			return Number(sectionContainer.dataset.sectionindex);
		}
	}));
	const Root = slots?.root ?? PickersSectionListRoot;
	const rootProps = useSlotProps({
		elementType: Root,
		externalSlotProps: slotProps?.root,
		externalForwardedProps: other,
		additionalProps: {
			ref: handleRootRef,
			suppressContentEditableWarning: true
		},
		className: classes.root,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, _extends({}, rootProps, { children: rootProps.contentEditable ? elements.map(({ content, before, after }) => `${before.children}${content.children}${after.children}`).join("") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: elements.map((element, elementIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersSection, {
		slots,
		slotProps,
		element,
		classes
	}, elementIndex)) }) }));
});
PickersSectionList.displayName = "PickersSectionList";
PickersSectionList.propTypes = {
	classes: import_prop_types.default.object,
	contentEditable: import_prop_types.default.bool.isRequired,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/usePickerTextFieldOwnerState.js
var PickerTextFieldOwnerStateContext = /* @__PURE__ */ import_react.createContext(null);
PickerTextFieldOwnerStateContext.displayName = "PickerTextFieldOwnerStateContext";
var usePickerTextFieldOwnerState = () => {
	const value = import_react.useContext(PickerTextFieldOwnerStateContext);
	if (value == null) throw new Error(["MUI X: The `usePickerTextFieldOwnerState` can only be called in components that are used inside a PickerTextField component"].join("\n"));
	return value;
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInputBase/PickersInputBase.js
var _excluded$38 = [
	"elements",
	"areAllSectionsEmpty",
	"defaultValue",
	"label",
	"value",
	"onChange",
	"id",
	"autoFocus",
	"endAdornment",
	"startAdornment",
	"renderSuffix",
	"slots",
	"slotProps",
	"contentEditable",
	"tabIndex",
	"onInput",
	"onPaste",
	"onKeyDown",
	"fullWidth",
	"name",
	"readOnly",
	"inputProps",
	"inputRef",
	"sectionListRef",
	"onFocus",
	"onBlur",
	"classes",
	"ownerState"
];
var round$1 = (value) => Math.round(value * 1e5) / 1e5;
var PickersInputBaseRoot = styled("div", {
	name: "MuiPickersInputBase",
	slot: "Root"
})(({ theme }) => _extends({}, theme.typography.body1, {
	color: (theme.vars || theme).palette.text.primary,
	cursor: "text",
	padding: 0,
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	boxSizing: "border-box",
	letterSpacing: `${round$1(.15 / 16)}em`,
	variants: [{
		props: { isInputInFullWidth: true },
		style: { width: "100%" }
	}]
}));
var PickersInputBaseSectionsContainer = styled(PickersSectionListRoot, {
	name: "MuiPickersInputBase",
	slot: "SectionsContainer"
})(({ theme }) => ({
	padding: "4px 0 5px",
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit",
	lineHeight: "1.4375em",
	flexGrow: 1,
	outline: "none",
	display: "flex",
	flexWrap: "nowrap",
	overflow: "hidden",
	letterSpacing: "inherit",
	width: "182px",
	variants: [
		{
			props: { fieldDirection: "rtl" },
			style: { justifyContent: "end" }
		},
		{
			props: { inputSize: "small" },
			style: { paddingTop: 1 }
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true
			},
			style: {
				color: "currentColor",
				opacity: 0
			}
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true,
				inputHasLabel: false
			},
			style: theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: theme.palette.mode === "light" ? .42 : .5 }
		},
		{
			props: {
				hasStartAdornment: false,
				isFieldFocused: false,
				isFieldValueEmpty: true,
				inputHasLabel: true,
				isLabelShrunk: true
			},
			style: theme.vars ? { opacity: theme.vars.opacity.inputPlaceholder } : { opacity: theme.palette.mode === "light" ? .42 : .5 }
		}
	]
}));
var PickersInputBaseSection = styled(PickersSectionListSection, {
	name: "MuiPickersInputBase",
	slot: "Section"
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit",
	letterSpacing: "inherit",
	lineHeight: "1.4375em",
	display: "inline-block",
	whiteSpace: "nowrap"
}));
var PickersInputBaseSectionContent = styled(PickersSectionListSectionContent, {
	name: "MuiPickersInputBase",
	slot: "SectionContent",
	overridesResolver: (props, styles) => styles.content
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	lineHeight: "1.4375em",
	letterSpacing: "inherit",
	width: "fit-content",
	outline: "none"
}));
var PickersInputBaseSectionSeparator = styled(PickersSectionListSectionSeparator, {
	name: "MuiPickersInputBase",
	slot: "Separator"
})(() => ({
	whiteSpace: "pre",
	letterSpacing: "inherit"
}));
var PickersInputBaseInput = styled("input", {
	name: "MuiPickersInputBase",
	slot: "Input",
	overridesResolver: (props, styles) => styles.hiddenInput
})(_extends({}, visuallyHidden));
var PickersInputBaseActiveBar = styled("div", {
	name: "MuiPickersInputBase",
	slot: "ActiveBar"
})(({ theme, ownerState }) => ({
	display: "none",
	position: "absolute",
	height: 2,
	bottom: 2,
	borderTopLeftRadius: 2,
	borderTopRightRadius: 2,
	transition: theme.transitions.create(["width", "left"], { duration: theme.transitions.duration.shortest }),
	backgroundColor: (theme.vars || theme).palette.primary.main,
	"[data-active-range-position=\"start\"] &, [data-active-range-position=\"end\"] &": { display: "block" },
	"[data-active-range-position=\"start\"] &": { left: ownerState.sectionOffsets[0] },
	"[data-active-range-position=\"end\"] &": { left: ownerState.sectionOffsets[1] }
}));
var useUtilityClasses$36 = (classes, ownerState) => {
	const { isFieldFocused, isFieldDisabled, isFieldReadOnly, hasFieldError, inputSize, isInputInFullWidth, inputColor, hasStartAdornment, hasEndAdornment } = ownerState;
	return composeClasses({
		root: [
			"root",
			isFieldFocused && !isFieldDisabled && "focused",
			isFieldDisabled && "disabled",
			isFieldReadOnly && "readOnly",
			hasFieldError && "error",
			isInputInFullWidth && "fullWidth",
			`color${capitalize(inputColor)}`,
			inputSize === "small" && "inputSizeSmall",
			hasStartAdornment && "adornedStart",
			hasEndAdornment && "adornedEnd"
		],
		notchedOutline: ["notchedOutline"],
		input: ["input"],
		sectionsContainer: ["sectionsContainer"],
		sectionContent: ["sectionContent"],
		sectionBefore: ["sectionBefore"],
		sectionAfter: ["sectionAfter"],
		activeBar: ["activeBar"]
	}, getPickersInputBaseUtilityClass, classes);
};
function resolveSectionElementWidth(sectionElement, rootRef, index, dateRangePosition) {
	if (sectionElement.content.id) {
		const activeSectionElements = rootRef.current?.querySelectorAll(`[data-sectionindex="${index}"] [data-range-position="${dateRangePosition}"]`);
		if (activeSectionElements) return Array.from(activeSectionElements).reduce((currentActiveBarWidth, element) => {
			return currentActiveBarWidth + element.offsetWidth;
		}, 0);
	}
	return 0;
}
function resolveSectionWidthAndOffsets(elements, rootRef) {
	let activeBarWidth = 0;
	if (rootRef.current?.getAttribute("data-active-range-position") === "end") for (let i = elements.length - 1; i >= elements.length / 2; i -= 1) activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "end");
	else for (let i = 0; i < elements.length / 2; i += 1) activeBarWidth += resolveSectionElementWidth(elements[i], rootRef, i, "start");
	return {
		activeBarWidth,
		sectionOffsets: [rootRef.current?.querySelector(`[data-sectionindex="0"]`)?.offsetLeft || 0, rootRef.current?.querySelector(`[data-sectionindex="${elements.length / 2}"]`)?.offsetLeft || 0]
	};
}
/**
* @ignore - internal component.
*/
var PickersInputBase = /* @__PURE__ */ import_react.forwardRef(function PickersInputBase(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersInputBase"
	});
	const { elements, areAllSectionsEmpty, value, onChange, id, endAdornment, startAdornment, renderSuffix, slots, slotProps, contentEditable, tabIndex, onInput, onPaste, onKeyDown, name, readOnly, inputProps, inputRef, sectionListRef, onFocus, onBlur, classes: classesProp, ownerState: ownerStateProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$38);
	const ownerStateContext = usePickerTextFieldOwnerState();
	const rootRef = import_react.useRef(null);
	const activeBarRef = import_react.useRef(null);
	const sectionOffsetsRef = import_react.useRef([]);
	const handleRootRef = useForkRef(ref, rootRef);
	const handleInputRef = useForkRef(inputProps?.ref, inputRef);
	const muiFormControl = useFormControl();
	if (!muiFormControl) throw new Error("MUI X: PickersInputBase should always be used inside a PickersTextField component");
	const ownerState = ownerStateProp ?? ownerStateContext;
	const handleInputFocus = (event) => {
		muiFormControl.onFocus?.(event);
		onFocus?.(event);
	};
	const handleHiddenInputFocus = (event) => {
		handleInputFocus(event);
	};
	const handleKeyDown = (event) => {
		onKeyDown?.(event);
		if (event.key === "Enter" && !event.defaultMuiPrevented) {
			if (rootRef.current?.dataset.multiInput) return;
			const closestForm = rootRef.current?.closest("form");
			const submitTrigger = closestForm?.querySelector("[type=\"submit\"]");
			if (!closestForm || !submitTrigger) return;
			event.preventDefault();
			closestForm.requestSubmit(submitTrigger);
		}
	};
	const handleInputBlur = (event) => {
		muiFormControl.onBlur?.(event);
		onBlur?.(event);
	};
	import_react.useEffect(() => {
		if (muiFormControl) muiFormControl.setAdornedStart(Boolean(startAdornment));
	}, [muiFormControl, startAdornment]);
	import_react.useEffect(() => {
		if (!muiFormControl) return;
		if (areAllSectionsEmpty) muiFormControl.onEmpty();
		else muiFormControl.onFilled();
	}, [muiFormControl, areAllSectionsEmpty]);
	const classes = useUtilityClasses$36(classesProp, ownerState);
	const InputRoot = slots?.root || PickersInputBaseRoot;
	const inputRootProps = useSlotProps({
		elementType: InputRoot,
		externalSlotProps: slotProps?.root,
		externalForwardedProps: other,
		additionalProps: {
			"aria-invalid": muiFormControl.error,
			ref: handleRootRef
		},
		className: classes.root,
		ownerState
	});
	const InputSectionsContainer = slots?.input || PickersInputBaseSectionsContainer;
	const isSingleInputRange = elements.some((element) => element.content["data-range-position"] !== void 0);
	import_react.useEffect(() => {
		if (!isSingleInputRange || !ownerState.isPickerOpen) return;
		const { activeBarWidth, sectionOffsets } = resolveSectionWidthAndOffsets(elements, rootRef);
		sectionOffsetsRef.current = [sectionOffsets[0], sectionOffsets[1]];
		if (activeBarRef.current) activeBarRef.current.style.width = `${activeBarWidth}px`;
	}, [
		elements,
		isSingleInputRange,
		ownerState.isPickerOpen
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputRoot, _extends({}, inputRootProps, { children: [
		startAdornment,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersSectionList, {
			sectionListRef,
			elements,
			contentEditable,
			tabIndex,
			className: classes.sectionsContainer,
			onFocus: handleInputFocus,
			onBlur: handleInputBlur,
			onInput,
			onPaste,
			onKeyDown: handleKeyDown,
			slots: {
				root: InputSectionsContainer,
				section: PickersInputBaseSection,
				sectionContent: PickersInputBaseSectionContent,
				sectionSeparator: PickersInputBaseSectionSeparator
			},
			slotProps: {
				root: _extends({}, slotProps?.input, { ownerState }),
				sectionContent: { className: pickersInputBaseClasses.sectionContent },
				sectionSeparator: ({ separatorPosition }) => ({ className: separatorPosition === "before" ? pickersInputBaseClasses.sectionBefore : pickersInputBaseClasses.sectionAfter })
			}
		}),
		endAdornment,
		renderSuffix ? renderSuffix(_extends({}, muiFormControl)) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputBaseInput, _extends({
			name,
			className: classes.input,
			value,
			onChange,
			id,
			"aria-hidden": "true",
			tabIndex: -1,
			readOnly,
			required: muiFormControl.required,
			disabled: muiFormControl.disabled,
			onFocus: handleHiddenInputFocus
		}, inputProps, { ref: handleInputRef })),
		isSingleInputRange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputBaseActiveBar, {
			className: classes.activeBar,
			ref: activeBarRef,
			ownerState: { sectionOffsets: sectionOffsetsRef.current }
		})
	] }));
});
PickersInputBase.displayName = "PickersInputBase";
PickersInputBase.propTypes = {
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	endAdornment: import_prop_types.default.node,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/pickersOutlinedInputClasses.js
function getPickersOutlinedInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersOutlinedInput", slot);
}
var pickersOutlinedInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersOutlinedInput", [
	"root",
	"notchedOutline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/Outline.js
var _excluded$37 = [
	"children",
	"className",
	"label",
	"notched",
	"shrink"
];
var OutlineRoot = styled("fieldset", {
	name: "MuiPickersOutlinedInput",
	slot: "NotchedOutline"
})(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		textAlign: "left",
		position: "absolute",
		bottom: 0,
		right: 0,
		top: -5,
		left: 0,
		margin: 0,
		padding: "0 8px",
		pointerEvents: "none",
		borderRadius: "inherit",
		borderStyle: "solid",
		borderWidth: 1,
		overflow: "hidden",
		minWidth: "0%",
		borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
	};
});
var OutlineLabel = styled("span", {
	slot: "internal",
	shouldForwardProp: void 0
})(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: "inherit"
}));
var OutlineLegend = styled("legend", {
	slot: "internal",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "notched"
})(({ theme }) => ({
	float: "unset",
	width: "auto",
	overflow: "hidden",
	variants: [
		{
			props: { inputHasLabel: false },
			style: {
				padding: 0,
				lineHeight: "11px",
				transition: theme.transitions.create("width", {
					duration: 150,
					easing: theme.transitions.easing.easeOut
				})
			}
		},
		{
			props: { inputHasLabel: true },
			style: {
				display: "block",
				padding: 0,
				height: 11,
				fontSize: "0.75em",
				visibility: "hidden",
				maxWidth: .01,
				transition: theme.transitions.create("max-width", {
					duration: 50,
					easing: theme.transitions.easing.easeOut
				}),
				whiteSpace: "nowrap",
				"& > span": {
					paddingLeft: 5,
					paddingRight: 5,
					display: "inline-block",
					opacity: 0,
					visibility: "visible"
				}
			}
		},
		{
			props: {
				inputHasLabel: true,
				notched: true
			},
			style: {
				maxWidth: "100%",
				transition: theme.transitions.create("max-width", {
					duration: 100,
					easing: theme.transitions.easing.easeOut,
					delay: 50
				})
			}
		}
	]
}));
/**
* @ignore - internal component.
*/
function Outline(props) {
	const { className, label, notched } = props, other = _objectWithoutPropertiesLoose(props, _excluded$37);
	const ownerState = usePickerTextFieldOwnerState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineRoot, _extends({
		"aria-hidden": true,
		className
	}, other, {
		ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineLegend, {
			ownerState,
			notched,
			children: label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineLabel, { children: label }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineLabel, {
				className: "notranslate",
				children: "​"
			})
		})
	}));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersOutlinedInput/PickersOutlinedInput.js
var _excluded$36 = [
	"label",
	"autoFocus",
	"ownerState",
	"classes",
	"notched"
];
var PickersOutlinedInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersOutlinedInput",
	slot: "Root"
})(({ theme }) => {
	const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
	return {
		padding: "0 14px",
		borderRadius: (theme.vars || theme).shape.borderRadius,
		[`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.text.primary },
		"@media (hover: none)": { [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor } },
		[`&.${pickersOutlinedInputClasses.focused} .${pickersOutlinedInputClasses.notchedOutline}`]: {
			borderStyle: "solid",
			borderWidth: 2
		},
		[`&.${pickersOutlinedInputClasses.disabled}`]: {
			[`& .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.action.disabled },
			"*": { color: (theme.vars || theme).palette.action.disabled }
		},
		[`&.${pickersOutlinedInputClasses.error} .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette.error.main },
		variants: Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key]?.main ?? false).map((color) => ({
			props: { inputColor: color },
			style: { [`&.${pickersOutlinedInputClasses.focused}:not(.${pickersOutlinedInputClasses.error}) .${pickersOutlinedInputClasses.notchedOutline}`]: { borderColor: (theme.vars || theme).palette[color].main } }
		}))
	};
});
var PickersOutlinedInputSectionsContainer = styled(PickersInputBaseSectionsContainer, {
	name: "MuiPickersOutlinedInput",
	slot: "SectionsContainer"
})({
	padding: "16.5px 0",
	variants: [{
		props: { inputSize: "small" },
		style: { padding: "8.5px 0" }
	}]
});
var useUtilityClasses$35 = (classes) => {
	return _extends({}, classes, composeClasses({
		root: ["root"],
		notchedOutline: ["notchedOutline"],
		input: ["input"]
	}, getPickersOutlinedInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersOutlinedInput = /* @__PURE__ */ import_react.forwardRef(function PickersOutlinedInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersOutlinedInput"
	});
	const { label, classes: classesProp, notched } = props, other = _objectWithoutPropertiesLoose(props, _excluded$36);
	const muiFormControl = useFormControl();
	const classes = useUtilityClasses$35(classesProp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({
		slots: {
			root: PickersOutlinedInputRoot,
			input: PickersOutlinedInputSectionsContainer
		},
		renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outline, {
			shrink: Boolean(notched || state.adornedStart || state.focused || state.filled),
			notched: Boolean(notched || state.adornedStart || state.focused || state.filled),
			className: classes.notchedOutline,
			label: label != null && label !== "" && muiFormControl?.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
				label,
				" ",
				"*"
			] }) : label
		})
	}, other, {
		label,
		classes,
		ref
	}));
});
PickersOutlinedInput.displayName = "PickersOutlinedInput";
PickersOutlinedInput.propTypes = {
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	endAdornment: import_prop_types.default.node,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	name: import_prop_types.default.string,
	notched: import_prop_types.default.bool,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersOutlinedInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersFilledInput/pickersFilledInputClasses.js
function getPickersFilledInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersFilledInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersFilledInput", [
	"root",
	"underline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersFilledInput/PickersFilledInput.js
var _excluded$35 = [
	"label",
	"autoFocus",
	"disableUnderline",
	"hiddenLabel",
	"classes"
];
var PickersFilledInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersFilledInput",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({ theme }) => {
	const light = theme.palette.mode === "light";
	const bottomLineColor = light ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	const backgroundColor = light ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
	const hoverBackground = light ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
	const disabledBackground = light ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
	return {
		backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
		borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
		borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create("background-color", {
			duration: theme.transitions.duration.shorter,
			easing: theme.transitions.easing.easeOut
		}),
		"&:hover": {
			backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
			"@media (hover: none)": { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor }
		},
		[`&.${pickersFilledInputClasses.focused}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor },
		[`&.${pickersFilledInputClasses.disabled}`]: { backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground },
		variants: [
			...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => ({
				props: {
					inputColor: color,
					disableUnderline: false
				},
				style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}` } }
			})),
			{
				props: { disableUnderline: false },
				style: {
					"&::after": {
						left: 0,
						bottom: 0,
						content: "\"\"",
						position: "absolute",
						right: 0,
						transform: "scaleX(0)",
						transition: theme.transitions.create("transform", {
							duration: theme.transitions.duration.shorter,
							easing: theme.transitions.easing.easeOut
						}),
						pointerEvents: "none"
					},
					[`&.${pickersFilledInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
					[`&.${pickersFilledInputClasses.error}`]: { "&:before, &:after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
					"&::before": {
						borderBottom: `1px solid ${theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})` : bottomLineColor}`,
						left: 0,
						bottom: 0,
						content: "\"\\00a0\"",
						position: "absolute",
						right: 0,
						transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
						pointerEvents: "none"
					},
					[`&:hover:not(.${pickersFilledInputClasses.disabled}, .${pickersFilledInputClasses.error}):before`]: { borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}` },
					[`&.${pickersFilledInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
				}
			},
			{
				props: { hasStartAdornment: true },
				style: { paddingLeft: 12 }
			},
			{
				props: { hasEndAdornment: true },
				style: { paddingRight: 12 }
			}
		]
	};
});
var PickersFilledSectionsContainer = styled(PickersInputBaseSectionsContainer, {
	name: "MuiPickersFilledInput",
	slot: "sectionsContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "hiddenLabel"
})({
	paddingTop: 25,
	paddingRight: 12,
	paddingBottom: 8,
	paddingLeft: 12,
	variants: [
		{
			props: { inputSize: "small" },
			style: {
				paddingTop: 21,
				paddingBottom: 4
			}
		},
		{
			props: { hasStartAdornment: true },
			style: { paddingLeft: 0 }
		},
		{
			props: { hasEndAdornment: true },
			style: { paddingRight: 0 }
		},
		{
			props: { hiddenLabel: true },
			style: {
				paddingTop: 16,
				paddingBottom: 17
			}
		},
		{
			props: {
				hiddenLabel: true,
				inputSize: "small"
			},
			style: {
				paddingTop: 8,
				paddingBottom: 9
			}
		}
	]
});
var useUtilityClasses$34 = (classes, ownerState) => {
	const { inputHasUnderline } = ownerState;
	return _extends({}, classes, composeClasses({
		root: ["root", inputHasUnderline && "underline"],
		input: ["input"]
	}, getPickersFilledInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersFilledInput = /* @__PURE__ */ import_react.forwardRef(function PickersFilledInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersFilledInput"
	});
	const { label, disableUnderline = false, hiddenLabel = false, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$35);
	const ownerState = _extends({}, usePickerTextFieldOwnerState(), { inputHasUnderline: !disableUnderline });
	const classes = useUtilityClasses$34(classesProp, ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({
		slots: {
			root: PickersFilledInputRoot,
			input: PickersFilledSectionsContainer
		},
		slotProps: {
			root: { disableUnderline },
			input: { hiddenLabel }
		}
	}, other, {
		label,
		classes,
		ref,
		ownerState
	}));
});
PickersFilledInput.displayName = "PickersFilledInput";
PickersFilledInput.propTypes = {
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	disableUnderline: import_prop_types.default.bool,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	endAdornment: import_prop_types.default.node,
	fullWidth: import_prop_types.default.bool,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersFilledInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInput/pickersInputClasses.js
function getPickersInputUtilityClass(slot) {
	return generateUtilityClass("MuiPickersFilledInput", slot);
}
var pickersInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses("MuiPickersInput", [
	"root",
	"underline",
	"input"
]));
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersInput/PickersInput.js
var _excluded$34 = [
	"label",
	"autoFocus",
	"disableUnderline",
	"ownerState",
	"classes"
];
var PickersInputRoot = styled(PickersInputBaseRoot, {
	name: "MuiPickersInput",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "disableUnderline"
})(({ theme }) => {
	let bottomLineColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
	if (theme.vars) bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
	return {
		"label + &": { marginTop: 16 },
		variants: [...Object.keys((theme.vars ?? theme).palette).filter((key) => (theme.vars ?? theme).palette[key].main).map((color) => ({
			props: {
				inputColor: color,
				inputHasUnderline: true
			},
			style: { "&::after": { borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}` } }
		})), {
			props: { inputHasUnderline: true },
			style: {
				"&::after": {
					background: "red",
					left: 0,
					bottom: 0,
					content: "\"\"",
					position: "absolute",
					right: 0,
					transform: "scaleX(0)",
					transition: theme.transitions.create("transform", {
						duration: theme.transitions.duration.shorter,
						easing: theme.transitions.easing.easeOut
					}),
					pointerEvents: "none"
				},
				[`&.${pickersInputClasses.focused}:after`]: { transform: "scaleX(1) translateX(0)" },
				[`&.${pickersInputClasses.error}`]: { "&:before, &:after": { borderBottomColor: (theme.vars || theme).palette.error.main } },
				"&::before": {
					borderBottom: `1px solid ${bottomLineColor}`,
					left: 0,
					bottom: 0,
					content: "\"\\00a0\"",
					position: "absolute",
					right: 0,
					transition: theme.transitions.create("border-bottom-color", { duration: theme.transitions.duration.shorter }),
					pointerEvents: "none"
				},
				[`&:hover:not(.${pickersInputClasses.disabled}, .${pickersInputClasses.error}):before`]: {
					borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
					"@media (hover: none)": { borderBottom: `1px solid ${bottomLineColor}` }
				},
				[`&.${pickersInputClasses.disabled}:before`]: { borderBottomStyle: "dotted" }
			}
		}]
	};
});
var useUtilityClasses$33 = (classes, ownerState) => {
	const { inputHasUnderline } = ownerState;
	return _extends({}, classes, composeClasses({
		root: ["root", !inputHasUnderline && "underline"],
		input: ["input"]
	}, getPickersInputUtilityClass, classes));
};
/**
* @ignore - internal component.
*/
var PickersInput = /* @__PURE__ */ import_react.forwardRef(function PickersInput(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersInput"
	});
	const { label, disableUnderline = false, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$34);
	const ownerState = _extends({}, usePickerTextFieldOwnerState(), { inputHasUnderline: !disableUnderline });
	const classes = useUtilityClasses$33(classesProp, ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputBase, _extends({
		slots: { root: PickersInputRoot },
		slotProps: { root: { disableUnderline } }
	}, other, {
		ownerState,
		label,
		classes,
		ref
	}));
});
PickersInput.displayName = "PickersInput";
PickersInput.propTypes = {
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	contentEditable: import_prop_types.default.bool.isRequired,
	"data-multi-input": import_prop_types.default.string,
	disableUnderline: import_prop_types.default.bool,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	endAdornment: import_prop_types.default.node,
	fullWidth: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	inputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	name: import_prop_types.default.string,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	ownerState: import_prop_types.default.any,
	readOnly: import_prop_types.default.bool,
	renderSuffix: import_prop_types.default.func,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired
};
PickersInput.muiName = "Input";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersTextField/PickersTextField.js
var _excluded$33 = [
	"onFocus",
	"onBlur",
	"className",
	"classes",
	"color",
	"disabled",
	"error",
	"variant",
	"required",
	"hiddenLabel",
	"InputProps",
	"inputProps",
	"inputRef",
	"sectionListRef",
	"elements",
	"areAllSectionsEmpty",
	"onClick",
	"onKeyDown",
	"onKeyUp",
	"onPaste",
	"onInput",
	"endAdornment",
	"startAdornment",
	"tabIndex",
	"contentEditable",
	"focused",
	"value",
	"onChange",
	"fullWidth",
	"id",
	"name",
	"helperText",
	"FormHelperTextProps",
	"label",
	"InputLabelProps",
	"data-active-range-position"
];
var VARIANT_COMPONENT = {
	standard: PickersInput,
	filled: PickersFilledInput,
	outlined: PickersOutlinedInput
};
var PickersTextFieldRoot = styled(FormControl, {
	name: "MuiPickersTextField",
	slot: "Root"
})({ maxWidth: "100%" });
var useUtilityClasses$32 = (classes, ownerState) => {
	const { isFieldFocused, isFieldDisabled, isFieldRequired } = ownerState;
	return composeClasses({ root: [
		"root",
		isFieldFocused && !isFieldDisabled && "focused",
		isFieldDisabled && "disabled",
		isFieldRequired && "required"
	] }, getPickersTextFieldUtilityClass, classes);
};
var PickersTextField = /* @__PURE__ */ import_react.forwardRef(function PickersTextField(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersTextField"
	});
	const { onFocus, onBlur, className, classes: classesProp, color = "primary", disabled = false, error = false, variant = "outlined", required = false, hiddenLabel = false, InputProps, inputProps, inputRef, sectionListRef, elements, areAllSectionsEmpty, onClick, onKeyDown, onKeyUp, onPaste, onInput, endAdornment, startAdornment, tabIndex, contentEditable, focused, value, onChange, fullWidth, id: idProp, name, helperText, FormHelperTextProps, label, InputLabelProps, "data-active-range-position": dataActiveRangePosition } = props, other = _objectWithoutPropertiesLoose(props, _excluded$33);
	const handleRootRef = useForkRef(ref, import_react.useRef(null));
	const id = useId(idProp);
	const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
	const inputLabelId = label && id ? `${id}-label` : void 0;
	const fieldOwnerState = useFieldOwnerState({
		disabled: props.disabled,
		required: props.required,
		readOnly: InputProps?.readOnly
	});
	const ownerState = import_react.useMemo(() => _extends({}, fieldOwnerState, {
		isFieldValueEmpty: areAllSectionsEmpty,
		isFieldFocused: focused ?? false,
		hasFieldError: error ?? false,
		inputSize: props.size ?? "medium",
		inputColor: color ?? "primary",
		isInputInFullWidth: fullWidth ?? false,
		hasStartAdornment: Boolean(startAdornment ?? InputProps?.startAdornment),
		hasEndAdornment: Boolean(endAdornment ?? InputProps?.endAdornment),
		inputHasLabel: !!label,
		isLabelShrunk: Boolean(InputLabelProps?.shrink)
	}), [
		fieldOwnerState,
		areAllSectionsEmpty,
		focused,
		error,
		props.size,
		color,
		fullWidth,
		startAdornment,
		endAdornment,
		InputProps?.startAdornment,
		InputProps?.endAdornment,
		label,
		InputLabelProps?.shrink
	]);
	const classes = useUtilityClasses$32(classesProp, ownerState);
	const PickersInputComponent = VARIANT_COMPONENT[variant];
	const inputAdditionalProps = {};
	if (variant === "outlined") {
		if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") inputAdditionalProps.notched = InputLabelProps.shrink;
		inputAdditionalProps.label = label;
	} else if (variant === "filled") inputAdditionalProps.hiddenLabel = hiddenLabel;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerTextFieldOwnerStateContext.Provider, {
		value: ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersTextFieldRoot, _extends({
			className: clsx(classes.root, className),
			ref: handleRootRef,
			focused,
			disabled,
			variant,
			error,
			color,
			fullWidth,
			required,
			ownerState
		}, other, { children: [
			label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputLabel, _extends({
				htmlFor: id,
				id: inputLabelId
			}, InputLabelProps, { children: label })),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersInputComponent, _extends({
				elements,
				areAllSectionsEmpty,
				onClick,
				onKeyDown,
				onKeyUp,
				onInput,
				onPaste,
				onFocus,
				onBlur,
				endAdornment,
				startAdornment,
				tabIndex,
				contentEditable,
				value,
				onChange,
				id,
				fullWidth,
				inputProps,
				inputRef,
				sectionListRef,
				label,
				name,
				role: "group",
				"aria-labelledby": inputLabelId,
				"aria-describedby": helperTextId,
				"aria-live": helperTextId ? "polite" : void 0,
				"data-active-range-position": dataActiveRangePosition
			}, inputAdditionalProps, InputProps)),
			helperText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormHelperText, _extends({ id: helperTextId }, FormHelperTextProps, { children: helperText }))
		] }))
	});
});
PickersTextField.displayName = "PickersTextField";
PickersTextField.propTypes = {
	areAllSectionsEmpty: import_prop_types.default.bool.isRequired,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]),
	component: import_prop_types.default.elementType,
	contentEditable: import_prop_types.default.bool.isRequired,
	disabled: import_prop_types.default.bool.isRequired,
	elements: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		after: import_prop_types.default.object.isRequired,
		before: import_prop_types.default.object.isRequired,
		container: import_prop_types.default.object.isRequired,
		content: import_prop_types.default.object.isRequired
	})).isRequired,
	endAdornment: import_prop_types.default.node,
	error: import_prop_types.default.bool.isRequired,
	focused: import_prop_types.default.bool,
	FormHelperTextProps: import_prop_types.default.object,
	fullWidth: import_prop_types.default.bool,
	helperText: import_prop_types.default.node,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	InputLabelProps: import_prop_types.default.object,
	inputProps: import_prop_types.default.object,
	InputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func.isRequired,
	onChange: import_prop_types.default.func.isRequired,
	onClick: import_prop_types.default.func.isRequired,
	onFocus: import_prop_types.default.func.isRequired,
	onInput: import_prop_types.default.func.isRequired,
	onKeyDown: import_prop_types.default.func.isRequired,
	onPaste: import_prop_types.default.func.isRequired,
	readOnly: import_prop_types.default.bool,
	required: import_prop_types.default.bool,
	sectionListRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({ current: import_prop_types.default.shape({
		getRoot: import_prop_types.default.func.isRequired,
		getSectionContainer: import_prop_types.default.func.isRequired,
		getSectionContent: import_prop_types.default.func.isRequired,
		getSectionIndexFromDOMElement: import_prop_types.default.func.isRequired
	}) })]),
	size: import_prop_types.default.oneOf(["medium", "small"]),
	startAdornment: import_prop_types.default.node,
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
	value: import_prop_types.default.string.isRequired,
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickerFieldUI.js
var _excluded$32 = ["enableAccessibleFieldDOMStructure"], _excluded2$5 = [
	"InputProps",
	"readOnly",
	"onClear",
	"clearable",
	"clearButtonPosition",
	"openPickerButtonPosition",
	"openPickerAriaLabel"
], _excluded3 = [
	"onPaste",
	"onKeyDown",
	"inputMode",
	"readOnly",
	"InputProps",
	"inputProps",
	"inputRef",
	"onClear",
	"clearable",
	"clearButtonPosition",
	"openPickerButtonPosition",
	"openPickerAriaLabel"
], _excluded4 = ["ownerState"], _excluded5 = ["ownerState"], _excluded6 = ["ownerState"], _excluded7 = ["ownerState"], _excluded8 = ["InputProps", "inputProps"];
var noop = () => {};
var cleanFieldResponse = (_ref) => {
	let { enableAccessibleFieldDOMStructure } = _ref, fieldResponse = _objectWithoutPropertiesLoose(_ref, _excluded$32);
	if (enableAccessibleFieldDOMStructure) {
		const { InputProps, readOnly, onClear, clearable, clearButtonPosition, openPickerButtonPosition, openPickerAriaLabel } = fieldResponse, other = _objectWithoutPropertiesLoose(fieldResponse, _excluded2$5);
		const mergedInputProps = other?.slotProps?.input ? mergeSlotProps(other?.slotProps?.input, InputProps) : noop;
		return {
			clearable,
			onClear,
			clearButtonPosition,
			openPickerButtonPosition,
			openPickerAriaLabel,
			textFieldProps: _extends({}, other, other?.slotProps?.input ? { slotProps: _extends({}, other?.slotProps, { input: (ownerState) => _extends({}, resolveComponentProps(mergedInputProps, ownerState), { readOnly }) }) } : { InputProps: _extends({}, InputProps ?? {}, { readOnly }) })
		};
	}
	const { onPaste, onKeyDown, inputMode, readOnly, InputProps, inputProps, inputRef, onClear, clearable, clearButtonPosition, openPickerButtonPosition, openPickerAriaLabel } = fieldResponse, other = _objectWithoutPropertiesLoose(fieldResponse, _excluded3);
	const mergedInputProps = other?.slotProps?.input ? mergeSlotProps(other?.slotProps?.input, InputProps) : noop;
	const mergedHtmlInputProps = other?.slotProps?.htmlInput ? mergeSlotProps(other?.slotProps?.htmlInput, inputProps) : noop;
	return {
		clearable,
		onClear,
		clearButtonPosition,
		openPickerButtonPosition,
		openPickerAriaLabel,
		textFieldProps: _extends({}, other, other?.slotProps?.input || other?.slotProps?.htmlInput ? { slotProps: _extends({}, other?.slotProps, {
			input: (ownerState) => _extends({}, resolveComponentProps(mergedInputProps, ownerState), { readOnly }),
			htmlInput: (ownerState) => _extends({}, resolveComponentProps(mergedHtmlInputProps, ownerState), {
				inputMode,
				onPaste,
				onKeyDown,
				ref: inputRef
			})
		}) } : {
			InputProps: _extends({}, InputProps ?? {}, { readOnly }),
			inputProps: _extends({}, inputProps ?? {}, {
				inputMode,
				onPaste,
				onKeyDown,
				ref: inputRef
			})
		})
	};
};
var PickerFieldUIContext = /* @__PURE__ */ import_react.createContext({
	slots: {},
	slotProps: {},
	inputRef: void 0
});
PickerFieldUIContext.displayName = "PickerFieldUIContext";
function PickerFieldUI(props) {
	const { fieldResponse, defaultOpenPickerIcon } = props;
	const translations = usePickerTranslations();
	const pickerContext = useNullablePickerContext();
	const pickerFieldUIContext = import_react.useContext(PickerFieldUIContext);
	const { textFieldProps, onClear, clearable, openPickerAriaLabel, clearButtonPosition: clearButtonPositionProp = "end", openPickerButtonPosition: openPickerButtonPositionProp = "end" } = cleanFieldResponse(fieldResponse);
	const ownerState = useFieldOwnerState(textFieldProps);
	const handleClickOpeningButton = useEventCallback((event) => {
		event.preventDefault();
		pickerContext?.setOpen((prev) => !prev);
	});
	const triggerStatus = pickerContext ? pickerContext.triggerStatus : "hidden";
	const clearButtonPosition = clearable ? clearButtonPositionProp : null;
	const openPickerButtonPosition = triggerStatus !== "hidden" ? openPickerButtonPositionProp : null;
	const TextField$1 = pickerFieldUIContext.slots.textField ?? (fieldResponse.enableAccessibleFieldDOMStructure === false ? TextField : PickersTextField);
	const InputAdornment$1 = pickerFieldUIContext.slots.inputAdornment ?? InputAdornment;
	const startInputAdornmentProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: InputAdornment$1,
		externalSlotProps: pickerFieldUIContext.slotProps.inputAdornment,
		additionalProps: { position: "start" },
		ownerState: _extends({}, ownerState, { position: "start" })
	}), _excluded4);
	const endInputAdornmentProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: InputAdornment$1,
		externalSlotProps: pickerFieldUIContext.slotProps.inputAdornment,
		additionalProps: { position: "end" },
		ownerState: _extends({}, ownerState, { position: "end" })
	}), _excluded5);
	const OpenPickerButton = pickerFieldUIContext.slots.openPickerButton ?? IconButton;
	const openPickerButtonProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: OpenPickerButton,
		externalSlotProps: pickerFieldUIContext.slotProps.openPickerButton,
		additionalProps: {
			disabled: triggerStatus === "disabled",
			onClick: handleClickOpeningButton,
			"aria-label": openPickerAriaLabel,
			edge: textFieldProps.variant !== "standard" ? openPickerButtonPosition : false
		},
		ownerState
	}), _excluded6);
	const OpenPickerIcon = pickerFieldUIContext.slots.openPickerIcon ?? defaultOpenPickerIcon;
	const openPickerIconProps = useSlotProps({
		elementType: OpenPickerIcon,
		externalSlotProps: pickerFieldUIContext.slotProps.openPickerIcon,
		ownerState
	});
	const ClearButton = pickerFieldUIContext.slots.clearButton ?? IconButton;
	const clearButtonProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: ClearButton,
		externalSlotProps: pickerFieldUIContext.slotProps.clearButton,
		className: "clearButton",
		additionalProps: {
			title: translations.fieldClearLabel,
			tabIndex: -1,
			onClick: onClear,
			disabled: fieldResponse.disabled || fieldResponse.readOnly,
			edge: textFieldProps.variant !== "standard" && clearButtonPosition !== openPickerButtonPosition ? clearButtonPosition : false
		},
		ownerState
	}), _excluded7);
	const ClearIcon$1 = pickerFieldUIContext.slots.clearIcon ?? ClearIcon;
	const clearIconProps = useSlotProps({
		elementType: ClearIcon$1,
		externalSlotProps: pickerFieldUIContext.slotProps.clearIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	textFieldProps.ref = useForkRef(textFieldProps.ref, pickerContext?.rootRef);
	const additionalTextFieldInputProps = {};
	const textFieldInputProps = resolveComponentProps(textFieldProps?.slotProps?.input ?? textFieldProps.InputProps, ownerState);
	if (pickerContext) additionalTextFieldInputProps.ref = pickerContext.triggerRef;
	if (!textFieldInputProps?.startAdornment && (clearButtonPosition === "start" || openPickerButtonPosition === "start")) additionalTextFieldInputProps.startAdornment = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputAdornment$1, _extends({}, startInputAdornmentProps, { children: [openPickerButtonPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps)) })), clearButtonPosition === "start" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearButton, _extends({}, clearButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearIcon$1, _extends({}, clearIconProps)) }))] }));
	if (!textFieldInputProps?.endAdornment && (clearButtonPosition === "end" || openPickerButtonPosition === "end")) additionalTextFieldInputProps.endAdornment = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputAdornment$1, _extends({}, endInputAdornmentProps, { children: [clearButtonPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearButton, _extends({}, clearButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClearIcon$1, _extends({}, clearIconProps)) })), openPickerButtonPosition === "end" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenPickerButton, _extends({}, openPickerButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenPickerIcon, _extends({}, openPickerIconProps)) }))] }));
	if (!additionalTextFieldInputProps?.endAdornment && !additionalTextFieldInputProps?.startAdornment && pickerFieldUIContext.slots.inputAdornment) additionalTextFieldInputProps.endAdornment = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputAdornment$1, _extends({}, endInputAdornmentProps));
	if (clearButtonPosition != null) textFieldProps.sx = [{
		"& .clearButton": { opacity: 1 },
		"@media (pointer: fine)": {
			"& .clearButton": { opacity: 0 },
			"&:hover, &:focus-within": { ".clearButton": { opacity: 1 } }
		}
	}, ...Array.isArray(textFieldProps.sx) ? textFieldProps.sx : [textFieldProps.sx]];
	const resolvedTextFieldInputProps = textFieldProps?.slotProps?.input ? resolveComponentProps(mergeSlotProps(textFieldInputProps, additionalTextFieldInputProps), ownerState) : _extends({}, textFieldInputProps, additionalTextFieldInputProps);
	textFieldProps.inputProps = textFieldProps?.slotProps?.htmlInput ? resolveComponentProps(textFieldProps.slotProps.htmlInput, ownerState) : textFieldProps.inputProps;
	delete textFieldProps?.slotProps?.input;
	if (fieldResponse.enableAccessibleFieldDOMStructure) delete textFieldProps?.slotProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField$1, _extends({}, textFieldProps, { InputProps: resolvedTextFieldInputProps }));
}
function mergeSlotProps(slotPropsA, slotPropsB) {
	if (!slotPropsA) return slotPropsB;
	if (!slotPropsB) return slotPropsA;
	return (ownerState) => {
		return _extends({}, resolveComponentProps(slotPropsB, ownerState), resolveComponentProps(slotPropsA, ownerState));
	};
}
/**
* The `textField` slot props cannot be handled inside `PickerFieldUI` because it would be a breaking change to not pass the enriched props to `useField`.
* Once the non-accessible DOM structure will be removed, we will be able to remove the `textField` slot and clean this logic.
*/
function useFieldTextFieldProps(parameters) {
	const { ref, externalForwardedProps, slotProps } = parameters;
	const pickerFieldUIContext = import_react.useContext(PickerFieldUIContext);
	const pickerContext = useNullablePickerContext();
	const ownerState = useFieldOwnerState(externalForwardedProps);
	const { InputProps, inputProps } = externalForwardedProps, otherExternalForwardedProps = _objectWithoutPropertiesLoose(externalForwardedProps, _excluded8);
	const textFieldProps = useSlotProps({
		elementType: PickersTextField,
		externalSlotProps: mergeSlotProps(pickerFieldUIContext.slotProps.textField, slotProps?.textField),
		externalForwardedProps: otherExternalForwardedProps,
		additionalProps: {
			ref,
			sx: pickerContext?.rootSx,
			label: pickerContext?.label,
			name: pickerContext?.name,
			className: pickerContext?.rootClassName,
			inputRef: pickerFieldUIContext.inputRef
		},
		ownerState
	});
	textFieldProps.inputProps = _extends({}, inputProps, textFieldProps.inputProps);
	textFieldProps.InputProps = _extends({}, InputProps, textFieldProps.InputProps);
	return textFieldProps;
}
function PickerFieldUIContextProvider(props) {
	const { slots = {}, slotProps = {}, inputRef, children } = props;
	const contextValue = import_react.useMemo(() => ({
		inputRef,
		slots: {
			openPickerButton: slots.openPickerButton,
			openPickerIcon: slots.openPickerIcon,
			textField: slots.textField,
			inputAdornment: slots.inputAdornment,
			clearIcon: slots.clearIcon,
			clearButton: slots.clearButton
		},
		slotProps: {
			openPickerButton: slotProps.openPickerButton,
			openPickerIcon: slotProps.openPickerIcon,
			textField: slotProps.textField,
			inputAdornment: slotProps.inputAdornment,
			clearIcon: slotProps.clearIcon,
			clearButton: slotProps.clearButton
		}
	}), [
		inputRef,
		slots.openPickerButton,
		slots.openPickerIcon,
		slots.textField,
		slots.inputAdornment,
		slots.clearIcon,
		slots.clearButton,
		slotProps.openPickerButton,
		slotProps.openPickerIcon,
		slotProps.textField,
		slotProps.inputAdornment,
		slotProps.clearIcon,
		slotProps.clearButton
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUIContext.Provider, {
		value: contextValue,
		children
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateField/DateField.js
var _excluded$31 = ["slots", "slotProps"];
/**
* Demos:
*
* - [DateField](http://mui.com/x/react-date-pickers/date-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [DateField API](https://mui.com/x/api/date-pickers/date-field/)
*/
var DateField = /* @__PURE__ */ import_react.forwardRef(function DateField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiDateField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$31);
	const fieldResponse = useDateField(useFieldTextFieldProps({
		slotProps,
		ref: inRef,
		externalForwardedProps: other
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUIContextProvider, {
		slots,
		slotProps,
		inputRef: other.inputRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUI, {
			fieldResponse,
			defaultOpenPickerIcon: CalendarIcon
		})
	});
});
DateField.displayName = "DateField";
DateField.propTypes = {
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	clearable: import_prop_types.default.bool,
	clearButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	color: import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]),
	component: import_prop_types.default.elementType,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	FormHelperTextProps: import_prop_types.default.object,
	fullWidth: import_prop_types.default.bool,
	helperText: import_prop_types.default.node,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	InputLabelProps: import_prop_types.default.object,
	inputProps: import_prop_types.default.object,
	InputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClear: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	openPickerButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	required: import_prop_types.default.bool,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	shouldRespectLeadingZeros: import_prop_types.default.bool,
	size: import_prop_types.default.oneOf(["medium", "small"]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
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
	timezone: import_prop_types.default.string,
	unstableFieldRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
	value: import_prop_types.default.object,
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeField/useTimeField.js
var useTimeField = (props) => {
	return useField({
		manager: useTimeManager(props),
		props
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimeField/TimeField.js
var _excluded$30 = [
	"slots",
	"slotProps",
	"InputProps",
	"inputProps"
];
/**
* Demos:
*
* - [TimeField](http://mui.com/x/react-date-pickers/time-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [TimeField API](https://mui.com/x/api/date-pickers/time-field/)
*/
var TimeField = /* @__PURE__ */ import_react.forwardRef(function TimeField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiTimeField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$30);
	const fieldResponse = useTimeField(useFieldTextFieldProps({
		slotProps,
		ref: inRef,
		externalForwardedProps: other
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUIContextProvider, {
		slots,
		slotProps,
		inputRef: other.inputRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUI, {
			fieldResponse,
			defaultOpenPickerIcon: ClockIcon
		})
	});
});
TimeField.displayName = "TimeField";
TimeField.propTypes = {
	ampm: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	clearable: import_prop_types.default.bool,
	clearButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	color: import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]),
	component: import_prop_types.default.elementType,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	FormHelperTextProps: import_prop_types.default.object,
	fullWidth: import_prop_types.default.bool,
	helperText: import_prop_types.default.node,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	InputLabelProps: import_prop_types.default.object,
	inputProps: import_prop_types.default.object,
	InputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClear: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	openPickerButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	required: import_prop_types.default.bool,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableTime: import_prop_types.default.func,
	shouldRespectLeadingZeros: import_prop_types.default.bool,
	size: import_prop_types.default.oneOf(["medium", "small"]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
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
	timezone: import_prop_types.default.string,
	unstableFieldRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
	value: import_prop_types.default.object,
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimeField/useDateTimeField.js
var useDateTimeField = (props) => {
	return useField({
		manager: useDateTimeManager(props),
		props
	});
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimeField/DateTimeField.js
var _excluded$29 = ["slots", "slotProps"];
/**
* Demos:
*
* - [DateTimeField](http://mui.com/x/react-date-pickers/date-time-field/)
* - [Fields](https://mui.com/x/react-date-pickers/fields/)
*
* API:
*
* - [DateTimeField API](https://mui.com/x/api/date-pickers/date-time-field/)
*/
var DateTimeField = /* @__PURE__ */ import_react.forwardRef(function DateTimeField(inProps, inRef) {
	const themeProps = useThemeProps({
		props: inProps,
		name: "MuiDateTimeField"
	});
	const { slots, slotProps } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded$29);
	const fieldResponse = useDateTimeField(useFieldTextFieldProps({
		slotProps,
		ref: inRef,
		externalForwardedProps: other
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUIContextProvider, {
		slots,
		slotProps,
		inputRef: other.inputRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerFieldUI, {
			fieldResponse,
			defaultOpenPickerIcon: CalendarIcon
		})
	});
});
DateTimeField.displayName = "DateTimeField";
DateTimeField.propTypes = {
	ampm: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	clearable: import_prop_types.default.bool,
	clearButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	color: import_prop_types.default.oneOf([
		"error",
		"info",
		"primary",
		"secondary",
		"success",
		"warning"
	]),
	component: import_prop_types.default.elementType,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.bool,
	focused: import_prop_types.default.bool,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	FormHelperTextProps: import_prop_types.default.object,
	fullWidth: import_prop_types.default.bool,
	helperText: import_prop_types.default.node,
	hiddenLabel: import_prop_types.default.bool,
	id: import_prop_types.default.string,
	InputLabelProps: import_prop_types.default.object,
	inputProps: import_prop_types.default.object,
	InputProps: import_prop_types.default.object,
	inputRef: refType,
	label: import_prop_types.default.node,
	margin: import_prop_types.default.oneOf([
		"dense",
		"none",
		"normal"
	]),
	maxDate: import_prop_types.default.object,
	maxDateTime: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	minDateTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	name: import_prop_types.default.string,
	onBlur: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClear: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	openPickerButtonPosition: import_prop_types.default.oneOf(["end", "start"]),
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	required: import_prop_types.default.bool,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableTime: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	shouldRespectLeadingZeros: import_prop_types.default.bool,
	size: import_prop_types.default.oneOf(["medium", "small"]),
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
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
	timezone: import_prop_types.default.string,
	unstableFieldRef: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
	value: import_prop_types.default.object,
	variant: import_prop_types.default.oneOf([
		"filled",
		"outlined",
		"standard"
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/useIsDateDisabled.js
var useIsDateDisabled = ({ shouldDisableDate, shouldDisableMonth, shouldDisableYear, minDate, maxDate, disableFuture, disablePast, timezone }) => {
	const adapter = usePickerAdapter();
	return import_react.useCallback((day) => validateDate({
		adapter,
		value: day,
		timezone,
		props: {
			shouldDisableDate,
			shouldDisableMonth,
			shouldDisableYear,
			minDate,
			maxDate,
			disableFuture,
			disablePast
		}
	}) !== null, [
		adapter,
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	]);
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/useCalendarState.js
var createCalendarStateReducer = (reduceAnimations, adapter) => (state, action) => {
	switch (action.type) {
		case "setVisibleDate": return _extends({}, state, {
			slideDirection: action.direction,
			currentMonth: action.month,
			isMonthSwitchingAnimating: !adapter.isSameMonth(action.month, state.currentMonth) && !reduceAnimations && !action.skipAnimation,
			focusedDay: action.focusedDay
		});
		case "changeMonthTimezone": {
			const newTimezone = action.newTimezone;
			if (adapter.getTimezone(state.currentMonth) === newTimezone) return state;
			let newCurrentMonth = adapter.setTimezone(state.currentMonth, newTimezone);
			if (adapter.getMonth(newCurrentMonth) !== adapter.getMonth(state.currentMonth)) newCurrentMonth = adapter.setMonth(newCurrentMonth, adapter.getMonth(state.currentMonth));
			return _extends({}, state, { currentMonth: newCurrentMonth });
		}
		case "finishMonthSwitchingAnimation": return _extends({}, state, { isMonthSwitchingAnimating: false });
		default: throw new Error("missing support");
	}
};
var useCalendarState = (params) => {
	const { value, referenceDate: referenceDateProp, disableFuture, disablePast, maxDate, minDate, onMonthChange, onYearChange, reduceAnimations, shouldDisableDate, timezone, getCurrentMonthFromVisibleDate } = params;
	const adapter = usePickerAdapter();
	const reducerFn = import_react.useRef(createCalendarStateReducer(Boolean(reduceAnimations), adapter)).current;
	const referenceDate = import_react.useMemo(() => {
		return singleItemValueManager.getInitialReferenceValue({
			value,
			adapter,
			timezone,
			props: params,
			referenceDate: referenceDateProp,
			granularity: SECTION_TYPE_GRANULARITY.day
		});
	}, [referenceDateProp, timezone]);
	const [calendarState, dispatch] = import_react.useReducer(reducerFn, {
		isMonthSwitchingAnimating: false,
		focusedDay: referenceDate,
		currentMonth: adapter.setDate(referenceDate, 1),
		slideDirection: "left"
	});
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		minDate,
		maxDate,
		disableFuture,
		disablePast,
		timezone
	});
	import_react.useEffect(() => {
		dispatch({
			type: "changeMonthTimezone",
			newTimezone: adapter.getTimezone(referenceDate)
		});
	}, [referenceDate, adapter]);
	return {
		referenceDate,
		calendarState,
		setVisibleDate: useEventCallback(({ target, reason }) => {
			if (reason === "cell-interaction" && calendarState.focusedDay != null && adapter.isSameDay(target, calendarState.focusedDay)) return;
			const skipAnimation = reason === "cell-interaction";
			let month;
			let focusedDay;
			if (reason === "cell-interaction") {
				month = getCurrentMonthFromVisibleDate(target, calendarState.currentMonth);
				focusedDay = target;
			} else {
				month = adapter.isSameMonth(target, calendarState.currentMonth) ? calendarState.currentMonth : adapter.startOfMonth(target);
				focusedDay = target;
				if (isDateDisabled(focusedDay)) {
					const startOfMonth = adapter.startOfMonth(target);
					const endOfMonth = adapter.endOfMonth(target);
					focusedDay = findClosestEnabledDate({
						adapter,
						date: focusedDay,
						minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
						maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
						disablePast,
						disableFuture,
						isDateDisabled,
						timezone
					});
				}
			}
			const hasChangedMonth = !adapter.isSameMonth(calendarState.currentMonth, month);
			const hasChangedYear = !adapter.isSameYear(calendarState.currentMonth, month);
			if (hasChangedMonth) onMonthChange?.(month);
			if (hasChangedYear) onYearChange?.(adapter.startOfYear(month));
			dispatch({
				type: "setVisibleDate",
				month,
				direction: adapter.isAfterDay(month, calendarState.currentMonth) ? "left" : "right",
				focusedDay: calendarState.focusedDay != null && focusedDay != null && adapter.isSameDay(focusedDay, calendarState.focusedDay) ? calendarState.focusedDay : focusedDay,
				skipAnimation
			});
		}),
		isDateDisabled,
		onMonthSwitchingAnimationEnd: import_react.useCallback(() => {
			dispatch({ type: "finishMonthSwitchingAnimation" });
		}, [])
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/pickersFadeTransitionGroupClasses.js
var getPickersFadeTransitionGroupUtilityClass = (slot) => generateUtilityClass("MuiPickersFadeTransitionGroup", slot);
var pickersFadeTransitionGroupClasses = generateUtilityClasses("MuiPickersFadeTransitionGroup", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersFadeTransitionGroup.js
var _excluded$28 = ["children"];
var useUtilityClasses$31 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersFadeTransitionGroupUtilityClass, classes);
};
var PickersFadeTransitionGroupRoot = styled(TransitionGroup, {
	name: "MuiPickersFadeTransitionGroup",
	slot: "Root"
})({
	display: "block",
	position: "relative"
});
/**
* @ignore - do not document.
*/
function PickersFadeTransitionGroup(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersFadeTransitionGroup"
	});
	const { className, reduceAnimations, transKey, classes: classesProp } = props;
	const { children } = props, other = _objectWithoutPropertiesLoose(props, _excluded$28);
	const classes = useUtilityClasses$31(classesProp);
	const theme = useTheme$2();
	if (reduceAnimations) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroupRoot, {
		className: clsx(classes.root, className),
		ownerState: other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, {
			appear: false,
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: {
				appear: theme.transitions.duration.enteringScreen,
				enter: theme.transitions.duration.enteringScreen,
				exit: 0
			},
			children
		}, transKey)
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/pickersSlideTransitionClasses.js
var getPickersSlideTransitionUtilityClass = (slot) => generateUtilityClass("MuiPickersSlideTransition", slot);
var pickersSlideTransitionClasses = generateUtilityClasses("MuiPickersSlideTransition", [
	"root",
	"slideEnter-left",
	"slideEnter-right",
	"slideEnterActive",
	"slideExit",
	"slideExitActiveLeft-left",
	"slideExitActiveLeft-right"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/PickersSlideTransition.js
var _excluded$27 = [
	"children",
	"className",
	"reduceAnimations",
	"slideDirection",
	"transKey",
	"classes"
];
var useUtilityClasses$30 = (classes, ownerState) => {
	const { slideDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		exit: ["slideExit"],
		enterActive: ["slideEnterActive"],
		enter: [`slideEnter-${slideDirection}`],
		exitActive: [`slideExitActiveLeft-${slideDirection}`]
	}, getPickersSlideTransitionUtilityClass, classes);
};
var PickersSlideTransitionRoot = styled(TransitionGroup, {
	name: "MuiPickersSlideTransition",
	slot: "Root",
	overridesResolver: (_, styles) => [
		styles.root,
		{ [`.${pickersSlideTransitionClasses["slideEnter-left"]}`]: styles["slideEnter-left"] },
		{ [`.${pickersSlideTransitionClasses["slideEnter-right"]}`]: styles["slideEnter-right"] },
		{ [`.${pickersSlideTransitionClasses.slideEnterActive}`]: styles.slideEnterActive },
		{ [`.${pickersSlideTransitionClasses.slideExit}`]: styles.slideExit },
		{ [`.${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: styles["slideExitActiveLeft-left"] },
		{ [`.${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: styles["slideExitActiveLeft-right"] }
	]
})(({ theme }) => {
	const slideTransition = theme.transitions.create("transform", {
		duration: theme.transitions.duration.complex,
		easing: "cubic-bezier(0.35, 0.8, 0.4, 1)"
	});
	return {
		display: "block",
		position: "relative",
		overflowX: "hidden",
		"& > *": {
			position: "absolute",
			top: 0,
			right: 0,
			left: 0
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-left"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses["slideEnter-right"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			zIndex: 1
		},
		[`& .${pickersSlideTransitionClasses.slideEnterActive}`]: {
			transform: "translate(0%)",
			transition: slideTransition
		},
		[`& .${pickersSlideTransitionClasses.slideExit}`]: { transform: "translate(0%)" },
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-left"]}`]: {
			willChange: "transform",
			transform: "translate(-100%)",
			transition: slideTransition,
			zIndex: 0
		},
		[`& .${pickersSlideTransitionClasses["slideExitActiveLeft-right"]}`]: {
			willChange: "transform",
			transform: "translate(100%)",
			transition: slideTransition,
			zIndex: 0
		}
	};
});
/**
* @ignore - do not document.
*/
function PickersSlideTransition(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersSlideTransition"
	});
	const { children, className, reduceAnimations, slideDirection, transKey, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$27);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, { slideDirection });
	const classes = useUtilityClasses$30(classesProp, ownerState);
	const theme = useTheme$2();
	if (reduceAnimations) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: clsx(classes.root, className),
		children
	});
	const transitionClasses = {
		exit: classes.exit,
		enterActive: classes.enterActive,
		enter: classes.enter,
		exitActive: classes.exitActive
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersSlideTransitionRoot, {
		className: clsx(classes.root, className),
		childFactory: (element) => /* @__PURE__ */ import_react.cloneElement(element, { classNames: transitionClasses }),
		role: "presentation",
		ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CSSTransition, _extends({
			mountOnEnter: true,
			unmountOnExit: true,
			timeout: theme.transitions.duration.complex,
			classNames: transitionClasses
		}, other, { children }), transKey)
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/dayCalendarClasses.js
var getDayCalendarUtilityClass = (slot) => generateUtilityClass("MuiDayCalendar", slot);
var dayCalendarClasses = generateUtilityClasses("MuiDayCalendar", [
	"root",
	"header",
	"weekDayLabel",
	"loadingContainer",
	"slideTransition",
	"monthContainer",
	"weekContainer",
	"weekNumberLabel",
	"weekNumber"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/DayCalendar.js
var _excluded$26 = [
	"parentProps",
	"day",
	"focusedDay",
	"selectedDays",
	"isDateDisabled",
	"currentMonthNumber",
	"isViewFocused"
], _excluded2$4 = ["ownerState"];
var useUtilityClasses$29 = (classes) => {
	return composeClasses({
		root: ["root"],
		header: ["header"],
		weekDayLabel: ["weekDayLabel"],
		loadingContainer: ["loadingContainer"],
		slideTransition: ["slideTransition"],
		monthContainer: ["monthContainer"],
		weekContainer: ["weekContainer"],
		weekNumberLabel: ["weekNumberLabel"],
		weekNumber: ["weekNumber"]
	}, getDayCalendarUtilityClass, classes);
};
var weeksContainerHeight = 240;
var PickersCalendarDayRoot = styled("div", {
	name: "MuiDayCalendar",
	slot: "Root"
})({});
var PickersCalendarDayHeader = styled("div", {
	name: "MuiDayCalendar",
	slot: "Header"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
});
var PickersCalendarWeekDayLabel = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekDayLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.secondary
}));
var PickersCalendarWeekNumberLabel = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekNumberLabel"
})(({ theme }) => ({
	width: 36,
	height: 40,
	margin: "0 2px",
	textAlign: "center",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: (theme.vars || theme).palette.text.disabled
}));
var PickersCalendarWeekNumber = styled(Typography, {
	name: "MuiDayCalendar",
	slot: "WeekNumber"
})(({ theme }) => _extends({}, theme.typography.caption, {
	width: 36,
	height: 36,
	padding: 0,
	margin: `0 2px`,
	color: (theme.vars || theme).palette.text.disabled,
	fontSize: "0.75rem",
	alignItems: "center",
	justifyContent: "center",
	display: "inline-flex"
}));
var PickersCalendarLoadingContainer = styled("div", {
	name: "MuiDayCalendar",
	slot: "LoadingContainer"
})({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled(PickersSlideTransition, {
	name: "MuiDayCalendar",
	slot: "SlideTransition"
})({ minHeight: weeksContainerHeight });
var PickersCalendarWeekContainer = styled("div", {
	name: "MuiDayCalendar",
	slot: "MonthContainer"
})({ overflow: "hidden" });
var PickersCalendarWeek = styled("div", {
	name: "MuiDayCalendar",
	slot: "WeekContainer"
})({
	margin: `2px 0`,
	display: "flex",
	justifyContent: "center"
});
function WrappedDay(_ref) {
	let { parentProps, day, focusedDay, selectedDays, isDateDisabled, currentMonthNumber, isViewFocused } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$26);
	const { disabled, disableHighlightToday, isMonthSwitchingAnimating, showDaysOutsideCurrentMonth, slots, slotProps, timezone } = parentProps;
	const adapter = usePickerAdapter();
	const now = useNow(timezone);
	const isFocusableDay = focusedDay != null && adapter.isSameDay(day, focusedDay);
	const isFocusedDay = isViewFocused && isFocusableDay;
	const isSelected = selectedDays.some((selectedDay) => adapter.isSameDay(selectedDay, day));
	const isToday = adapter.isSameDay(day, now);
	const isDisabled = import_react.useMemo(() => disabled || isDateDisabled(day), [
		disabled,
		isDateDisabled,
		day
	]);
	const isOutsideCurrentMonth = import_react.useMemo(() => adapter.getMonth(day) !== currentMonthNumber, [
		adapter,
		day,
		currentMonthNumber
	]);
	const ownerState = usePickerDayOwnerState({
		day,
		selected: isSelected,
		disabled: isDisabled,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		disableMargin: void 0,
		disableHighlightToday,
		showDaysOutsideCurrentMonth
	});
	const Day = slots?.day ?? PickersDay;
	const dayProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Day,
		externalSlotProps: slotProps?.day,
		additionalProps: _extends({
			disableHighlightToday,
			showDaysOutsideCurrentMonth,
			role: "gridcell",
			isAnimating: isMonthSwitchingAnimating,
			"data-timestamp": adapter.toJsDate(day).valueOf()
		}, other),
		ownerState: _extends({}, ownerState, {
			day,
			isDayDisabled: isDisabled,
			isDaySelected: isSelected
		})
	}), _excluded2$4);
	const isFirstVisibleCell = import_react.useMemo(() => {
		const startOfMonth = adapter.startOfMonth(adapter.setMonth(day, currentMonthNumber));
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, startOfMonth);
		return adapter.isSameDay(day, adapter.startOfWeek(startOfMonth));
	}, [
		currentMonthNumber,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	const isLastVisibleCell = import_react.useMemo(() => {
		const endOfMonth = adapter.endOfMonth(adapter.setMonth(day, currentMonthNumber));
		if (!showDaysOutsideCurrentMonth) return adapter.isSameDay(day, endOfMonth);
		return adapter.isSameDay(day, adapter.endOfWeek(endOfMonth));
	}, [
		currentMonthNumber,
		day,
		showDaysOutsideCurrentMonth,
		adapter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Day, _extends({}, dayProps, {
		day,
		disabled: isDisabled,
		autoFocus: !isOutsideCurrentMonth && isFocusedDay,
		today: isToday,
		outsideCurrentMonth: isOutsideCurrentMonth,
		isFirstVisibleCell,
		isLastVisibleCell,
		selected: isSelected,
		tabIndex: isFocusableDay ? 0 : -1,
		"aria-selected": isSelected,
		"aria-current": isToday ? "date" : void 0
	}));
}
/**
* @ignore - do not document.
*/
function DayCalendar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDayCalendar"
	});
	const adapter = usePickerAdapter();
	const { onFocusedDayChange, className, classes: classesProp, currentMonth, selectedDays, focusedDay, loading, onSelectedDaysChange, onMonthSwitchingAnimationEnd, readOnly, reduceAnimations, renderLoading = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "..." }), slideDirection, TransitionProps, disablePast, disableFuture, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear, dayOfWeekFormatter = (date) => adapter.format(date, "weekdayShort").charAt(0).toUpperCase(), hasFocus, onFocusedViewChange, gridLabelId, displayWeekNumber, fixedWeekNumber, timezone } = props;
	const now = useNow(timezone);
	const classes = useUtilityClasses$29(classesProp);
	const isRtl = useRtl();
	const isDateDisabled = useIsDateDisabled({
		shouldDisableDate,
		shouldDisableMonth,
		shouldDisableYear,
		minDate,
		maxDate,
		disablePast,
		disableFuture,
		timezone
	});
	const translations = usePickerTranslations();
	const handleDaySelect = useEventCallback((day) => {
		if (readOnly) return;
		onSelectedDaysChange(day);
	});
	const focusDay = (day) => {
		if (!isDateDisabled(day)) {
			onFocusedDayChange(day);
			onFocusedViewChange?.(true);
		}
	};
	const handleKeyDown = useEventCallback((event, day) => {
		switch (event.key) {
			case "ArrowUp":
				focusDay(adapter.addDays(day, -7));
				event.preventDefault();
				break;
			case "ArrowDown":
				focusDay(adapter.addDays(day, 7));
				event.preventDefault();
				break;
			case "ArrowLeft": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? 1 : -1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? 1 : -1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? newFocusedDayDefault : adapter.startOfMonth(nextAvailableMonth),
					maxDate: isRtl ? adapter.endOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "ArrowRight": {
				const newFocusedDayDefault = adapter.addDays(day, isRtl ? -1 : 1);
				const nextAvailableMonth = adapter.addMonths(day, isRtl ? -1 : 1);
				focusDay(findClosestEnabledDate({
					adapter,
					date: newFocusedDayDefault,
					minDate: isRtl ? adapter.startOfMonth(nextAvailableMonth) : newFocusedDayDefault,
					maxDate: isRtl ? newFocusedDayDefault : adapter.endOfMonth(nextAvailableMonth),
					isDateDisabled,
					timezone
				}) || newFocusedDayDefault);
				event.preventDefault();
				break;
			}
			case "Home":
				focusDay(adapter.startOfWeek(day));
				event.preventDefault();
				break;
			case "End":
				focusDay(adapter.endOfWeek(day));
				event.preventDefault();
				break;
			case "PageUp":
				focusDay(adapter.addMonths(day, 1));
				event.preventDefault();
				break;
			case "PageDown":
				focusDay(adapter.addMonths(day, -1));
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleDaySelect(day);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleFocus = useEventCallback((event, day) => focusDay(day));
	const handleBlur = useEventCallback((event, day) => {
		if (focusedDay != null && adapter.isSameDay(focusedDay, day)) onFocusedViewChange?.(false);
	});
	const currentMonthNumber = adapter.getMonth(currentMonth);
	const currentYearNumber = adapter.getYear(currentMonth);
	const validSelectedDays = import_react.useMemo(() => selectedDays.filter((day) => !!day).map((day) => adapter.startOfDay(day)), [adapter, selectedDays]);
	const transitionKey = `${currentYearNumber}-${currentMonthNumber}`;
	const slideNodeRef = import_react.useMemo(() => /* @__PURE__ */ import_react.createRef(), [transitionKey]);
	const weeksToDisplay = import_react.useMemo(() => {
		const toDisplay = adapter.getWeekArray(currentMonth);
		let nextMonth = adapter.addMonths(currentMonth, 1);
		while (fixedWeekNumber && toDisplay.length < fixedWeekNumber) {
			const additionalWeeks = adapter.getWeekArray(nextMonth);
			const hasCommonWeek = adapter.isSameDay(toDisplay[toDisplay.length - 1][0], additionalWeeks[0][0]);
			additionalWeeks.slice(hasCommonWeek ? 1 : 0).forEach((week) => {
				if (toDisplay.length < fixedWeekNumber) toDisplay.push(week);
			});
			nextMonth = adapter.addMonths(nextMonth, 1);
		}
		return toDisplay;
	}, [
		currentMonth,
		fixedWeekNumber,
		adapter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarDayRoot, {
		role: "grid",
		"aria-labelledby": gridLabelId,
		className: classes.root,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarDayHeader, {
			role: "row",
			className: classes.header,
			children: [displayWeekNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekNumberLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": translations.calendarWeekNumberHeaderLabel,
				className: classes.weekNumberLabel,
				children: translations.calendarWeekNumberHeaderText
			}), getWeekdays(adapter, now).map((weekday, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekDayLabel, {
				variant: "caption",
				role: "columnheader",
				"aria-label": adapter.format(weekday, "weekday"),
				className: classes.weekDayLabel,
				children: dayOfWeekFormatter(weekday)
			}, i.toString()))]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarLoadingContainer, {
			className: classes.loadingContainer,
			children: renderLoading()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarSlideTransition, _extends({
			transKey: transitionKey,
			onExited: onMonthSwitchingAnimationEnd,
			reduceAnimations,
			slideDirection,
			className: clsx(className, classes.slideTransition)
		}, TransitionProps, {
			nodeRef: slideNodeRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekContainer, {
				ref: slideNodeRef,
				role: "rowgroup",
				className: classes.monthContainer,
				children: weeksToDisplay.map((week, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarWeek, {
					role: "row",
					className: classes.weekContainer,
					"aria-rowindex": index + 1,
					children: [displayWeekNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarWeekNumber, {
						className: classes.weekNumber,
						role: "rowheader",
						"aria-label": translations.calendarWeekNumberAriaLabelText(adapter.getWeekNumber(week[0])),
						children: translations.calendarWeekNumberText(adapter.getWeekNumber(week[0]))
					}), week.map((day, dayIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedDay, {
						parentProps: props,
						day,
						selectedDays: validSelectedDays,
						isViewFocused: hasFocus,
						focusedDay,
						onKeyDown: handleKeyDown,
						onFocus: handleFocus,
						onBlur: handleBlur,
						onDaySelect: handleDaySelect,
						isDateDisabled,
						currentMonthNumber,
						"aria-colindex": dayIndex + 1
					}, day.toString()))]
				}, `week-${week[0]}`))
			})
		}))]
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MonthCalendar/monthCalendarClasses.js
function getMonthCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiMonthCalendar", slot);
}
var monthCalendarClasses = generateUtilityClasses("MuiMonthCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendarButton.js
var _excluded$25 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$28 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isMonthDisabled && "disabled",
		ownerState.isMonthSelected && "selected"
	] }, getMonthCalendarUtilityClass, classes);
};
var DefaultMonthButton = styled("button", {
	name: "MuiMonthCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${monthCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${monthCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${monthCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${monthCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - do not document.
*/
var MonthCalendarButton = /* @__PURE__ */ import_react.memo(function MonthCalendarButton(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$25);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isMonthDisabled: disabled,
		isMonthSelected: selected
	});
	const classes = useUtilityClasses$28(classesProp, ownerState);
	useEnhancedEffect(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const MonthButton = slots?.monthButton ?? DefaultMonthButton;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthButton, _extends({}, useSlotProps({
		elementType: MonthButton,
		externalSlotProps: slotProps?.monthButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
MonthCalendarButton.displayName = "MonthCalendarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MonthCalendar/MonthCalendar.js
var _excluded$24 = [
	"autoFocus",
	"className",
	"currentMonth",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"shouldDisableMonth",
	"readOnly",
	"disableHighlightToday",
	"onMonthFocus",
	"hasFocus",
	"onFocusedViewChange",
	"monthsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$27 = (classes) => {
	return composeClasses({ root: ["root"] }, getMonthCalendarUtilityClass, classes);
};
function useMonthCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), { monthsPerRow: themeProps.monthsPerRow ?? 3 });
}
var isSameMonth = (monthA, monthB, yearA, yearB, adapter) => Boolean(monthA === monthB && yearB && adapter.isSameYear(yearA, yearB));
var MonthCalendarRoot = styled("div", {
	name: "MuiMonthCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "monthsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 16,
	padding: "8px 0",
	width: 320,
	boxSizing: "border-box",
	variants: [{
		props: { monthsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { monthsPerRow: 4 },
		style: { columnGap: 0 }
	}]
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [MonthCalendar API](https://mui.com/x/api/date-pickers/month-calendar/)
*/
var MonthCalendar = /* @__PURE__ */ import_react.forwardRef(function MonthCalendar(inProps, ref) {
	const props = useMonthCalendarDefaultizedProps(inProps, "MuiMonthCalendar");
	const { autoFocus, className, currentMonth, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, shouldDisableMonth, readOnly, onMonthFocus, hasFocus, onFocusedViewChange, monthsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$24);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "MonthCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.month
	}), []);
	const classes = useUtilityClasses$27(classesProp);
	const todayMonth = import_react.useMemo(() => adapter.getMonth(now), [adapter, now]);
	const selectedMonth = import_react.useMemo(() => {
		if (value != null) return adapter.getMonth(value);
		return null;
	}, [value, adapter]);
	const [focusedMonth, setFocusedMonth] = import_react.useState(() => selectedMonth || adapter.getMonth(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "MonthCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isMonthDisabled = import_react.useCallback((dateToValidate) => {
		const firstEnabledMonth = adapter.startOfMonth(disablePast && adapter.isAfter(now, minDate) ? now : minDate);
		const lastEnabledMonth = adapter.startOfMonth(disableFuture && adapter.isBefore(now, maxDate) ? now : maxDate);
		const monthToValidate = adapter.startOfMonth(dateToValidate);
		if (adapter.isBefore(monthToValidate, firstEnabledMonth)) return true;
		if (adapter.isAfter(monthToValidate, lastEnabledMonth)) return true;
		if (!shouldDisableMonth) return false;
		return shouldDisableMonth(monthToValidate);
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableMonth,
		adapter
	]);
	const handleMonthSelection = useEventCallback((_event, month) => {
		if (readOnly) return;
		const baseDateForMonth = (value && currentMonth && !adapter.isSameYear(value, currentMonth) ? adapter.setYear(value, adapter.getYear(currentMonth)) : value) ?? currentMonth ?? referenceDate;
		handleValueChange(adapter.setMonth(baseDateForMonth, month));
	});
	const focusMonth = useEventCallback((month) => {
		if (!isMonthDisabled(adapter.setMonth(value ?? currentMonth ?? referenceDate, month))) {
			setFocusedMonth(month);
			changeHasFocus(true);
			if (onMonthFocus) onMonthFocus(month);
		}
	});
	import_react.useEffect(() => {
		setFocusedMonth((prevFocusedMonth) => selectedMonth !== null && prevFocusedMonth !== selectedMonth ? selectedMonth : prevFocusedMonth);
	}, [selectedMonth]);
	const handleKeyDown = useEventCallback((event, month) => {
		const monthsInYear = 12;
		const monthsInRow = 3;
		switch (event.key) {
			case "ArrowUp":
				focusMonth((monthsInYear + month - monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusMonth((monthsInYear + month + monthsInRow) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusMonth((monthsInYear + month + (isRtl ? 1 : -1)) % monthsInYear);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusMonth((monthsInYear + month + (isRtl ? -1 : 1)) % monthsInYear);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleMonthSelection(event, month);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleMonthFocus = useEventCallback((event, month) => {
		focusMonth(month);
	});
	const handleMonthBlur = useEventCallback((event, month) => {
		if (focusedMonth === month) changeHasFocus(false);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		monthsPerRow
	}, other, { children: getMonthsInYear(adapter, currentMonth ?? value ?? referenceDate).map((month) => {
		const monthNumber = adapter.getMonth(month);
		const monthText = adapter.format(month, "monthShort");
		const monthLabel = adapter.format(month, "month");
		const isSelected = isSameMonth(monthNumber, selectedMonth, month, value, adapter);
		const isDisabled = disabled || isMonthDisabled(month);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendarButton, {
			selected: isSelected,
			value: monthNumber,
			onClick: handleMonthSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && monthNumber === focusedMonth,
			disabled: isDisabled,
			tabIndex: monthNumber === focusedMonth && !isDisabled ? 0 : -1,
			onFocus: handleMonthFocus,
			onBlur: handleMonthBlur,
			"aria-current": isSameMonth(monthNumber, todayMonth, month, now, adapter) ? "date" : void 0,
			"aria-label": monthLabel,
			slots,
			slotProps,
			classes: classesProp,
			children: monthText
		}, monthText);
	}) }));
});
MonthCalendar.displayName = "MonthCalendar";
MonthCalendar.propTypes = {
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	currentMonth: import_prop_types.default.object,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	gridLabelId: import_prop_types.default.string,
	hasFocus: import_prop_types.default.bool,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onMonthFocus: import_prop_types.default.func,
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableMonth: import_prop_types.default.func,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/YearCalendar/yearCalendarClasses.js
function getYearCalendarUtilityClass(slot) {
	return generateUtilityClass("MuiYearCalendar", slot);
}
var yearCalendarClasses = generateUtilityClasses("MuiYearCalendar", [
	"root",
	"button",
	"disabled",
	"selected"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendarButton.js
var _excluded$23 = [
	"autoFocus",
	"classes",
	"disabled",
	"selected",
	"value",
	"onClick",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"slots",
	"slotProps"
];
var useUtilityClasses$26 = (classes, ownerState) => {
	return composeClasses({ button: [
		"button",
		ownerState.isYearDisabled && "disabled",
		ownerState.isYearSelected && "selected"
	] }, getYearCalendarUtilityClass, classes);
};
var DefaultYearButton = styled("button", {
	name: "MuiYearCalendar",
	slot: "Button",
	overridesResolver: (_, styles) => [
		styles.button,
		{ [`&.${yearCalendarClasses.disabled}`]: styles.disabled },
		{ [`&.${yearCalendarClasses.selected}`]: styles.selected }
	]
})(({ theme }) => _extends({
	color: "unset",
	backgroundColor: "transparent",
	border: 0,
	outline: 0
}, theme.typography.subtitle1, {
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: "pointer",
	"&:focus": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha(theme.palette.action.active, theme.palette.action.focusOpacity) },
	"&:hover": { backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity) },
	"&:disabled": {
		cursor: "auto",
		pointerEvents: "none"
	},
	[`&.${yearCalendarClasses.disabled}`]: { color: (theme.vars || theme).palette.text.secondary },
	[`&.${yearCalendarClasses.selected}`]: {
		color: (theme.vars || theme).palette.primary.contrastText,
		backgroundColor: (theme.vars || theme).palette.primary.main,
		"&:focus, &:hover": { backgroundColor: (theme.vars || theme).palette.primary.dark }
	}
}));
/**
* @ignore - internal component.
*/
var YearCalendarButton = /* @__PURE__ */ import_react.memo(function YearCalendarButton(props) {
	const { autoFocus, classes: classesProp, disabled, selected, value, onClick, onKeyDown, onFocus, onBlur, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$23);
	const ref = import_react.useRef(null);
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const ownerState = _extends({}, pickerOwnerState, {
		isYearDisabled: disabled,
		isYearSelected: selected
	});
	const classes = useUtilityClasses$26(classesProp, ownerState);
	useEnhancedEffect(() => {
		if (autoFocus) ref.current?.focus();
	}, [autoFocus]);
	const YearButton = slots?.yearButton ?? DefaultYearButton;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearButton, _extends({}, useSlotProps({
		elementType: YearButton,
		externalSlotProps: slotProps?.yearButton,
		externalForwardedProps: other,
		additionalProps: {
			disabled,
			ref,
			type: "button",
			role: "radio",
			"aria-checked": selected,
			onClick: (event) => onClick(event, value),
			onKeyDown: (event) => onKeyDown(event, value),
			onFocus: (event) => onFocus(event, value),
			onBlur: (event) => onBlur(event, value)
		},
		ownerState,
		className: classes.button
	})));
});
YearCalendarButton.displayName = "YearCalendarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/YearCalendar/YearCalendar.js
var _excluded$22 = [
	"autoFocus",
	"className",
	"classes",
	"value",
	"defaultValue",
	"referenceDate",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onChange",
	"readOnly",
	"shouldDisableYear",
	"disableHighlightToday",
	"onYearFocus",
	"hasFocus",
	"onFocusedViewChange",
	"yearsOrder",
	"yearsPerRow",
	"timezone",
	"gridLabelId",
	"slots",
	"slotProps"
];
var useUtilityClasses$25 = (classes) => {
	return composeClasses({ root: ["root"] }, getYearCalendarUtilityClass, classes);
};
function useYearCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		yearsPerRow: themeProps.yearsPerRow ?? 3,
		yearsOrder: themeProps.yearsOrder ?? "asc"
	});
}
var YearCalendarRoot = styled("div", {
	name: "MuiYearCalendar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "yearsPerRow"
})({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-evenly",
	rowGap: 12,
	padding: "6px 0",
	overflowY: "auto",
	height: "100%",
	width: 320,
	maxHeight: 280,
	boxSizing: "border-box",
	position: "relative",
	variants: [{
		props: { yearsPerRow: 3 },
		style: { columnGap: 24 }
	}, {
		props: { yearsPerRow: 4 },
		style: {
			columnGap: 0,
			padding: "0 2px"
		}
	}]
});
var YearCalendarButtonFiller = styled("div", {
	name: "MuiYearCalendar",
	slot: "ButtonFiller"
})({
	height: 36,
	width: 72
});
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [YearCalendar API](https://mui.com/x/api/date-pickers/year-calendar/)
*/
var YearCalendar = /* @__PURE__ */ import_react.forwardRef(function YearCalendar(inProps, ref) {
	const props = useYearCalendarDefaultizedProps(inProps, "MuiYearCalendar");
	const { autoFocus, className, classes: classesProp, value: valueProp, defaultValue, referenceDate: referenceDateProp, disabled, disableFuture, disablePast, maxDate, minDate, onChange, readOnly, shouldDisableYear, onYearFocus, hasFocus, onFocusedViewChange, yearsOrder, yearsPerRow, timezone: timezoneProp, gridLabelId, slots, slotProps } = props, other = _objectWithoutPropertiesLoose(props, _excluded$22);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "YearCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const now = useNow(timezone);
	const isRtl = useRtl();
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const referenceDate = import_react.useMemo(() => singleItemValueManager.getInitialReferenceValue({
		value,
		adapter,
		props,
		timezone,
		referenceDate: referenceDateProp,
		granularity: SECTION_TYPE_GRANULARITY.year
	}), []);
	const classes = useUtilityClasses$25(classesProp);
	const todayYear = import_react.useMemo(() => adapter.getYear(now), [adapter, now]);
	const selectedYear = import_react.useMemo(() => {
		if (value != null) return adapter.getYear(value);
		return null;
	}, [value, adapter]);
	const [focusedYear, setFocusedYear] = import_react.useState(() => selectedYear || adapter.getYear(referenceDate));
	const [internalHasFocus, setInternalHasFocus] = useControlled({
		name: "YearCalendar",
		state: "hasFocus",
		controlled: hasFocus,
		default: autoFocus ?? false
	});
	const changeHasFocus = useEventCallback((newHasFocus) => {
		setInternalHasFocus(newHasFocus);
		if (onFocusedViewChange) onFocusedViewChange(newHasFocus);
	});
	const isYearDisabled = import_react.useCallback((dateToValidate) => {
		if (disablePast && adapter.isBeforeYear(dateToValidate, now)) return true;
		if (disableFuture && adapter.isAfterYear(dateToValidate, now)) return true;
		if (minDate && adapter.isBeforeYear(dateToValidate, minDate)) return true;
		if (maxDate && adapter.isAfterYear(dateToValidate, maxDate)) return true;
		if (!shouldDisableYear) return false;
		return shouldDisableYear(adapter.startOfYear(dateToValidate));
	}, [
		disableFuture,
		disablePast,
		maxDate,
		minDate,
		now,
		shouldDisableYear,
		adapter
	]);
	const handleYearSelection = useEventCallback((_event, year) => {
		if (readOnly) return;
		handleValueChange(adapter.setYear(value ?? referenceDate, year));
	});
	const focusYear = useEventCallback((year) => {
		if (!isYearDisabled(adapter.setYear(value ?? referenceDate, year))) {
			setFocusedYear(year);
			changeHasFocus(true);
			onYearFocus?.(year);
		}
	});
	import_react.useEffect(() => {
		setFocusedYear((prevFocusedYear) => selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear);
	}, [selectedYear]);
	const verticalDirection = yearsOrder !== "desc" ? yearsPerRow * 1 : yearsPerRow * -1;
	const horizontalDirection = isRtl && yearsOrder === "asc" || !isRtl && yearsOrder === "desc" ? -1 : 1;
	const handleKeyDown = useEventCallback((event, year) => {
		switch (event.key) {
			case "ArrowUp":
				focusYear(year - verticalDirection);
				event.preventDefault();
				break;
			case "ArrowDown":
				focusYear(year + verticalDirection);
				event.preventDefault();
				break;
			case "ArrowLeft":
				focusYear(year - horizontalDirection);
				event.preventDefault();
				break;
			case "ArrowRight":
				focusYear(year + horizontalDirection);
				event.preventDefault();
				break;
			case "Enter":
			case " ":
				handleYearSelection(event, year);
				event.preventDefault();
				break;
			default: break;
		}
	});
	const handleYearFocus = useEventCallback((event, year) => {
		focusYear(year);
	});
	const handleYearBlur = useEventCallback((event, year) => {
		if (focusedYear === year) changeHasFocus(false);
	});
	const scrollerRef = import_react.useRef(null);
	const handleRef = useForkRef(ref, scrollerRef);
	import_react.useEffect(() => {
		if (autoFocus || scrollerRef.current === null) return;
		const tabbableButton = scrollerRef.current.querySelector("[tabindex=\"0\"]");
		if (!tabbableButton) return;
		const offsetHeight = tabbableButton.offsetHeight;
		const offsetTop = tabbableButton.offsetTop;
		const clientHeight = scrollerRef.current.clientHeight;
		const scrollTop = scrollerRef.current.scrollTop;
		const elementBottom = offsetTop + offsetHeight;
		if (offsetHeight > clientHeight || offsetTop < scrollTop) return;
		scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
	}, [autoFocus]);
	const yearRange = adapter.getYearRange([minDate, maxDate]);
	if (yearsOrder === "desc") yearRange.reverse();
	let fillerAmount = yearsPerRow - yearRange.length % yearsPerRow;
	if (fillerAmount === yearsPerRow) fillerAmount = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(YearCalendarRoot, _extends({
		ref: handleRef,
		className: clsx(classes.root, className),
		ownerState,
		role: "radiogroup",
		"aria-labelledby": gridLabelId,
		yearsPerRow
	}, other, { children: [yearRange.map((year) => {
		const yearNumber = adapter.getYear(year);
		const isSelected = yearNumber === selectedYear;
		const isDisabled = disabled || isYearDisabled(year);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendarButton, {
			selected: isSelected,
			value: yearNumber,
			onClick: handleYearSelection,
			onKeyDown: handleKeyDown,
			autoFocus: internalHasFocus && yearNumber === focusedYear,
			disabled: isDisabled,
			tabIndex: yearNumber === focusedYear && !isDisabled ? 0 : -1,
			onFocus: handleYearFocus,
			onBlur: handleYearBlur,
			"aria-current": todayYear === yearNumber ? "date" : void 0,
			slots,
			slotProps,
			classes: classesProp,
			children: adapter.format(year, "year")
		}, adapter.format(year, "year"));
	}), Array.from({ length: fillerAmount }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendarButtonFiller, {}, index))] }));
});
YearCalendar.displayName = "YearCalendar";
YearCalendar.propTypes = {
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	gridLabelId: import_prop_types.default.string,
	hasFocus: import_prop_types.default.bool,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onYearFocus: import_prop_types.default.func,
	readOnly: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableYear: import_prop_types.default.func,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersCalendarHeader/pickersCalendarHeaderClasses.js
var getPickersCalendarHeaderUtilityClass = (slot) => generateUtilityClass("MuiPickersCalendarHeader", slot);
var pickersCalendarHeaderClasses = generateUtilityClasses("MuiPickersCalendarHeader", [
	"root",
	"labelContainer",
	"label",
	"switchViewButton",
	"switchViewIcon"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersCalendarHeader/PickersCalendarHeader.js
var _excluded$21 = [
	"slots",
	"slotProps",
	"currentMonth",
	"disabled",
	"disableFuture",
	"disablePast",
	"maxDate",
	"minDate",
	"onMonthChange",
	"onViewChange",
	"view",
	"reduceAnimations",
	"views",
	"labelId",
	"className",
	"classes",
	"timezone",
	"format"
], _excluded2$3 = ["ownerState"];
var useUtilityClasses$24 = (classes) => {
	return composeClasses({
		root: ["root"],
		labelContainer: ["labelContainer"],
		label: ["label"],
		switchViewButton: ["switchViewButton"],
		switchViewIcon: ["switchViewIcon"]
	}, getPickersCalendarHeaderUtilityClass, classes);
};
var PickersCalendarHeaderRoot = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Root"
})({
	display: "flex",
	alignItems: "center",
	marginTop: 12,
	marginBottom: 4,
	paddingLeft: 24,
	paddingRight: 12,
	maxHeight: 40,
	minHeight: 40
});
var PickersCalendarHeaderLabelContainer = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "LabelContainer"
})(({ theme }) => _extends({
	display: "flex",
	overflow: "hidden",
	alignItems: "center",
	cursor: "pointer",
	marginRight: "auto"
}, theme.typography.body1, { fontWeight: theme.typography.fontWeightMedium }));
var PickersCalendarHeaderLabel = styled("div", {
	name: "MuiPickersCalendarHeader",
	slot: "Label"
})({ marginRight: 6 });
var PickersCalendarHeaderSwitchViewButton = styled(IconButton, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewButton"
})({
	marginRight: "auto",
	variants: [{
		props: { view: "year" },
		style: { [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: { transform: "rotate(180deg)" } }
	}]
});
var PickersCalendarHeaderSwitchViewIcon = styled(ArrowDropDownIcon, {
	name: "MuiPickersCalendarHeader",
	slot: "SwitchViewIcon"
})(({ theme }) => ({
	willChange: "transform",
	transition: theme.transitions.create("transform"),
	transform: "rotate(0deg)"
}));
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [PickersCalendarHeader API](https://mui.com/x/api/date-pickers/pickers-calendar-header/)
*/
var PickersCalendarHeader = /* @__PURE__ */ import_react.forwardRef(function PickersCalendarHeader(inProps, ref) {
	const translations = usePickerTranslations();
	const adapter = usePickerAdapter();
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersCalendarHeader"
	});
	const { slots, slotProps, currentMonth: month, disabled, disableFuture, disablePast, maxDate, minDate, onMonthChange, onViewChange, view, reduceAnimations, views, labelId, className, classes: classesProp, timezone, format = `${adapter.formats.month} ${adapter.formats.year}` } = props, other = _objectWithoutPropertiesLoose(props, _excluded$21);
	const { ownerState } = usePickerPrivateContext();
	const classes = useUtilityClasses$24(classesProp);
	const SwitchViewButton = slots?.switchViewButton ?? PickersCalendarHeaderSwitchViewButton;
	const switchViewButtonProps = useSlotProps({
		elementType: SwitchViewButton,
		externalSlotProps: slotProps?.switchViewButton,
		additionalProps: {
			size: "small",
			"aria-label": translations.calendarViewSwitchingButtonAriaLabel(view)
		},
		ownerState: _extends({}, ownerState, { view }),
		className: classes.switchViewButton
	});
	const SwitchViewIcon = slots?.switchViewIcon ?? PickersCalendarHeaderSwitchViewIcon;
	const switchViewIconProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: SwitchViewIcon,
		externalSlotProps: slotProps?.switchViewIcon,
		ownerState,
		className: classes.switchViewIcon
	}), _excluded2$3);
	const selectNextMonth = () => onMonthChange(adapter.addMonths(month, 1));
	const selectPreviousMonth = () => onMonthChange(adapter.addMonths(month, -1));
	const isNextMonthDisabled = useNextMonthDisabled(month, {
		disableFuture,
		maxDate,
		timezone
	});
	const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
		disablePast,
		minDate,
		timezone
	});
	const handleToggleView = () => {
		if (views.length === 1 || !onViewChange || disabled) return;
		if (views.length === 2) onViewChange(views.find((el) => el !== view) || views[0]);
		else onViewChange(views[views.indexOf(view) !== 0 ? 0 : 1]);
	};
	if (views.length === 1 && views[0] === "year") return null;
	const label = adapter.formatByString(month, format);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderRoot, _extends({}, other, {
		ownerState,
		className: clsx(classes.root, className),
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersCalendarHeaderLabelContainer, {
			role: "presentation",
			onClick: handleToggleView,
			ownerState,
			"aria-live": "polite",
			className: classes.labelContainer,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersFadeTransitionGroup, {
				reduceAnimations,
				transKey: label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersCalendarHeaderLabel, {
					id: labelId,
					ownerState,
					className: classes.label,
					children: label
				})
			}), views.length > 1 && !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchViewButton, _extends({}, switchViewButtonProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchViewIcon, _extends({}, switchViewIconProps)) }))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, {
			in: view === "day",
			appear: !reduceAnimations,
			enter: !reduceAnimations,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersArrowSwitcher, {
				slots,
				slotProps,
				onGoToPrevious: selectPreviousMonth,
				isPreviousDisabled: isPreviousMonthDisabled,
				previousLabel: translations.previousMonth,
				onGoToNext: selectNextMonth,
				isNextDisabled: isNextMonthDisabled,
				nextLabel: translations.nextMonth
			})
		})]
	}));
});
PickersCalendarHeader.displayName = "PickersCalendarHeader";
PickersCalendarHeader.propTypes = {
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	currentMonth: import_prop_types.default.object.isRequired,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	format: import_prop_types.default.string,
	labelId: import_prop_types.default.string,
	maxDate: import_prop_types.default.object.isRequired,
	minDate: import_prop_types.default.object.isRequired,
	onMonthChange: import_prop_types.default.func.isRequired,
	onViewChange: import_prop_types.default.func,
	reduceAnimations: import_prop_types.default.bool.isRequired,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string.isRequired,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired,
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired).isRequired
};
//#endregion
//#region node_modules/@mui/material/esm/useMediaQuery/index.js
var useMediaQuery = unstable_createUseMediaQuery({ themeId: identifier_default });
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useReduceAnimations.js
var PREFERS_REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
var mobileVersionMatches = typeof navigator !== "undefined" && navigator.userAgent.match(/android\s(\d+)|OS\s(\d+)/i);
var androidVersion = mobileVersionMatches && mobileVersionMatches[1] ? parseInt(mobileVersionMatches[1], 10) : null;
var iOSVersion = mobileVersionMatches && mobileVersionMatches[2] ? parseInt(mobileVersionMatches[2], 10) : null;
var slowAnimationDevices = androidVersion && androidVersion < 10 || iOSVersion && iOSVersion < 13 || false;
function useReduceAnimations(customReduceAnimations) {
	const prefersReduced = useMediaQuery(PREFERS_REDUCED_MOTION, { defaultMatches: false });
	if (customReduceAnimations != null) return customReduceAnimations;
	return prefersReduced || slowAnimationDevices;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/dateCalendarClasses.js
var getDateCalendarUtilityClass = (slot) => generateUtilityClass("MuiDateCalendar", slot);
var dateCalendarClasses = generateUtilityClasses("MuiDateCalendar", ["root", "viewTransitionContainer"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateCalendar/DateCalendar.js
var _excluded$20 = [
	"autoFocus",
	"onViewChange",
	"value",
	"defaultValue",
	"referenceDate",
	"disableFuture",
	"disablePast",
	"onChange",
	"onYearChange",
	"onMonthChange",
	"reduceAnimations",
	"shouldDisableDate",
	"shouldDisableMonth",
	"shouldDisableYear",
	"view",
	"views",
	"openTo",
	"className",
	"classes",
	"disabled",
	"readOnly",
	"minDate",
	"maxDate",
	"disableHighlightToday",
	"focusedView",
	"onFocusedViewChange",
	"showDaysOutsideCurrentMonth",
	"fixedWeekNumber",
	"dayOfWeekFormatter",
	"slots",
	"slotProps",
	"loading",
	"renderLoading",
	"displayWeekNumber",
	"yearsOrder",
	"yearsPerRow",
	"monthsPerRow",
	"timezone"
];
var useUtilityClasses$23 = (classes) => {
	return composeClasses({
		root: ["root"],
		viewTransitionContainer: ["viewTransitionContainer"]
	}, getDateCalendarUtilityClass, classes);
};
function useDateCalendarDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	const reduceAnimations = useReduceAnimations(themeProps.reduceAnimations);
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), {
		loading: themeProps.loading ?? false,
		openTo: themeProps.openTo ?? "day",
		views: themeProps.views ?? ["year", "day"],
		reduceAnimations,
		renderLoading: themeProps.renderLoading ?? (() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "..." }))
	});
}
var DateCalendarRoot = styled(PickerViewRoot, {
	name: "MuiDateCalendar",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	height: 336
});
var DateCalendarViewTransitionContainer = styled(PickersFadeTransitionGroup, {
	name: "MuiDateCalendar",
	slot: "ViewTransitionContainer"
})({});
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DateCalendar API](https://mui.com/x/api/date-pickers/date-calendar/)
*/
var DateCalendar = /* @__PURE__ */ import_react.forwardRef(function DateCalendar(inProps, ref) {
	const adapter = usePickerAdapter();
	const { ownerState } = usePickerPrivateContext();
	const id = useId();
	const props = useDateCalendarDefaultizedProps(inProps, "MuiDateCalendar");
	const { autoFocus, onViewChange, value: valueProp, defaultValue, referenceDate: referenceDateProp, disableFuture, disablePast, onChange, onMonthChange, reduceAnimations, shouldDisableDate, shouldDisableMonth, shouldDisableYear, view: inView, views, openTo, className, classes: classesProp, disabled, readOnly, minDate, maxDate, disableHighlightToday, focusedView: focusedViewProp, onFocusedViewChange, showDaysOutsideCurrentMonth, fixedWeekNumber, dayOfWeekFormatter, slots, slotProps, loading, renderLoading, displayWeekNumber, yearsOrder, yearsPerRow, monthsPerRow, timezone: timezoneProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$20);
	const { value, handleValueChange, timezone } = useControlledValue({
		name: "DateCalendar",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate: referenceDateProp,
		onChange,
		valueManager: singleItemValueManager
	});
	const { view, setView, focusedView, setFocusedView, goToNextView, setValueAndGoToNextView } = useViews({
		view: inView,
		views,
		openTo,
		onChange: handleValueChange,
		onViewChange,
		autoFocus,
		focusedView: focusedViewProp,
		onFocusedViewChange
	});
	const { referenceDate, calendarState, setVisibleDate, isDateDisabled, onMonthSwitchingAnimationEnd } = useCalendarState({
		value,
		referenceDate: referenceDateProp,
		reduceAnimations,
		onMonthChange,
		minDate,
		maxDate,
		shouldDisableDate,
		disablePast,
		disableFuture,
		timezone,
		getCurrentMonthFromVisibleDate: (visibleDate, prevMonth) => {
			if (adapter.isSameMonth(visibleDate, prevMonth)) return prevMonth;
			return adapter.startOfMonth(visibleDate);
		}
	});
	const minDateWithDisabled = disabled && value || minDate;
	const maxDateWithDisabled = disabled && value || maxDate;
	const gridLabelId = `${id}-grid-label`;
	const hasFocus = focusedView !== null;
	const CalendarHeader = slots?.calendarHeader ?? PickersCalendarHeader;
	const calendarHeaderProps = useSlotProps({
		elementType: CalendarHeader,
		externalSlotProps: slotProps?.calendarHeader,
		additionalProps: {
			views,
			view,
			currentMonth: calendarState.currentMonth,
			onViewChange: setView,
			onMonthChange: (month) => setVisibleDate({
				target: month,
				reason: "header-navigation"
			}),
			minDate: minDateWithDisabled,
			maxDate: maxDateWithDisabled,
			disabled,
			disablePast,
			disableFuture,
			reduceAnimations,
			timezone,
			labelId: gridLabelId
		},
		ownerState
	});
	const handleDateMonthChange = useEventCallback((newDate) => {
		const startOfMonth = adapter.startOfMonth(newDate);
		const endOfMonth = adapter.endOfMonth(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
			maxDate: adapter.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfMonth,
				reason: "cell-interaction"
			});
		}
	});
	const handleDateYearChange = useEventCallback((newDate) => {
		const startOfYear = adapter.startOfYear(newDate);
		const endOfYear = adapter.endOfYear(newDate);
		const closestEnabledDate = isDateDisabled(newDate) ? findClosestEnabledDate({
			adapter,
			date: newDate,
			minDate: adapter.isBefore(minDate, startOfYear) ? startOfYear : minDate,
			maxDate: adapter.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
			disablePast,
			disableFuture,
			isDateDisabled,
			timezone
		}) : newDate;
		if (closestEnabledDate) {
			setValueAndGoToNextView(closestEnabledDate, "finish");
			setVisibleDate({
				target: closestEnabledDate,
				reason: "cell-interaction"
			});
		} else {
			goToNextView();
			setVisibleDate({
				target: startOfYear,
				reason: "cell-interaction"
			});
		}
	});
	const handleSelectedDayChange = useEventCallback((day) => {
		if (day) return handleValueChange(mergeDateAndTime(adapter, day, value ?? referenceDate), "finish", view);
		return handleValueChange(day, "finish", view);
	});
	import_react.useEffect(() => {
		if (adapter.isValid(value)) setVisibleDate({
			target: value,
			reason: "controlled-value-change"
		});
	}, [value]);
	const classes = useUtilityClasses$23(classesProp);
	const baseDateValidationProps = {
		disablePast,
		disableFuture,
		maxDate,
		minDate
	};
	const commonViewProps = {
		disableHighlightToday,
		readOnly,
		disabled,
		timezone,
		gridLabelId,
		slots,
		slotProps
	};
	const prevOpenViewRef = import_react.useRef(view);
	import_react.useEffect(() => {
		if (prevOpenViewRef.current === view) return;
		if (focusedView === prevOpenViewRef.current) setFocusedView(view, true);
		prevOpenViewRef.current = view;
	}, [
		focusedView,
		setFocusedView,
		view
	]);
	const selectedDays = import_react.useMemo(() => [value], [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateCalendarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarHeader, _extends({}, calendarHeaderProps, {
		slots,
		slotProps
	})), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCalendarViewTransitionContainer, {
		reduceAnimations,
		className: classes.viewTransitionContainer,
		transKey: view,
		ownerState,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			view === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				value,
				onChange: handleDateYearChange,
				shouldDisableYear,
				hasFocus,
				onFocusedViewChange: (isViewFocused) => setFocusedView("year", isViewFocused),
				yearsOrder,
				yearsPerRow,
				referenceDate
			})),
			view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, _extends({}, baseDateValidationProps, commonViewProps, {
				currentMonth: calendarState.currentMonth,
				hasFocus,
				className,
				value,
				onChange: handleDateMonthChange,
				shouldDisableMonth,
				onFocusedViewChange: (isViewFocused) => setFocusedView("month", isViewFocused),
				monthsPerRow,
				referenceDate
			})),
			view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayCalendar, _extends({}, calendarState, baseDateValidationProps, commonViewProps, {
				onMonthSwitchingAnimationEnd,
				hasFocus,
				onFocusedDayChange: (focusedDate) => setVisibleDate({
					target: focusedDate,
					reason: "cell-interaction"
				}),
				reduceAnimations,
				selectedDays,
				onSelectedDaysChange: handleSelectedDayChange,
				shouldDisableDate,
				shouldDisableMonth,
				shouldDisableYear,
				onFocusedViewChange: (isViewFocused) => setFocusedView("day", isViewFocused),
				showDaysOutsideCurrentMonth,
				fixedWeekNumber,
				dayOfWeekFormatter,
				displayWeekNumber,
				loading,
				renderLoading
			}))
		] })
	})] }));
});
DateCalendar.displayName = "DateCalendar";
DateCalendar.propTypes = {
	autoFocus: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	fixedWeekNumber: import_prop_types.default.number,
	focusedView: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	loading: import_prop_types.default.bool,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	onChange: import_prop_types.default.func,
	onFocusedViewChange: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/material/esm/Skeleton/skeletonClasses.js
function getSkeletonUtilityClass(slot) {
	return generateUtilityClass("MuiSkeleton", slot);
}
generateUtilityClasses("MuiSkeleton", [
	"root",
	"text",
	"rectangular",
	"rounded",
	"circular",
	"pulse",
	"wave",
	"withChildren",
	"fitContent",
	"heightAuto"
]);
//#endregion
//#region node_modules/@mui/material/esm/Skeleton/Skeleton.js
var useUtilityClasses$22 = (ownerState) => {
	const { classes, variant, animation, hasChildren, width, height } = ownerState;
	return composeClasses({ root: [
		"root",
		variant,
		animation,
		hasChildren && "withChildren",
		hasChildren && !width && "fitContent",
		hasChildren && !height && "heightAuto"
	] }, getSkeletonUtilityClass, classes);
};
var pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;
var waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;
var pulseAnimation = typeof pulseKeyframe !== "string" ? css`
        animation: ${pulseKeyframe} 2s ease-in-out 0.5s infinite;
      ` : null;
var waveAnimation = typeof waveKeyframe !== "string" ? css`
        &::after {
          animation: ${waveKeyframe} 2s linear 0.5s infinite;
        }
      ` : null;
var SkeletonRoot = styled("span", {
	name: "MuiSkeleton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			ownerState.animation !== false && styles[ownerState.animation],
			ownerState.hasChildren && styles.withChildren,
			ownerState.hasChildren && !ownerState.width && styles.fitContent,
			ownerState.hasChildren && !ownerState.height && styles.heightAuto
		];
	}
})(memoTheme(({ theme }) => {
	const radiusUnit = getUnit(theme.shape.borderRadius) || "px";
	const radiusValue = toUnitless(theme.shape.borderRadius);
	return {
		display: "block",
		backgroundColor: theme.vars ? theme.vars.palette.Skeleton.bg : theme.alpha(theme.palette.text.primary, theme.palette.mode === "light" ? .11 : .13),
		height: "1.2em",
		variants: [
			{
				props: { variant: "text" },
				style: {
					marginTop: 0,
					marginBottom: 0,
					height: "auto",
					transformOrigin: "0 55%",
					transform: "scale(1, 0.60)",
					borderRadius: `${radiusValue}${radiusUnit}/${Math.round(radiusValue / .6 * 10) / 10}${radiusUnit}`,
					"&:empty:before": { content: "\"\\00a0\"" }
				}
			},
			{
				props: { variant: "circular" },
				style: { borderRadius: "50%" }
			},
			{
				props: { variant: "rounded" },
				style: { borderRadius: (theme.vars || theme).shape.borderRadius }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren,
				style: { "& > *": { visibility: "hidden" } }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren && !ownerState.width,
				style: { maxWidth: "fit-content" }
			},
			{
				props: ({ ownerState }) => ownerState.hasChildren && !ownerState.height,
				style: { height: "auto" }
			},
			{
				props: { animation: "pulse" },
				style: pulseAnimation || { animation: `${pulseKeyframe} 2s ease-in-out 0.5s infinite` }
			},
			{
				props: { animation: "wave" },
				style: {
					position: "relative",
					overflow: "hidden",
					WebkitMaskImage: "-webkit-radial-gradient(white, black)",
					"&::after": {
						background: `linear-gradient(
                90deg,
                transparent,
                ${(theme.vars || theme).palette.action.hover},
                transparent
              )`,
						content: "\"\"",
						position: "absolute",
						transform: "translateX(-100%)",
						bottom: 0,
						left: 0,
						right: 0,
						top: 0
					}
				}
			},
			{
				props: { animation: "wave" },
				style: waveAnimation || { "&::after": { animation: `${waveKeyframe} 2s linear 0.5s infinite` } }
			}
		]
	};
}));
var Skeleton = /* @__PURE__ */ import_react.forwardRef(function Skeleton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiSkeleton"
	});
	const { animation = "pulse", className, component = "span", height, style, variant = "text", width, ...other } = props;
	const ownerState = {
		...props,
		animation,
		component,
		variant,
		hasChildren: Boolean(other.children)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonRoot, {
		as: component,
		ref,
		className: clsx(useUtilityClasses$22(ownerState).root, className),
		ownerState,
		...other,
		style: {
			width,
			height,
			...style
		}
	});
});
Skeleton.propTypes = {
	animation: import_prop_types.default.oneOf([
		"pulse",
		"wave",
		false
	]),
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	height: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
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
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"circular",
		"rectangular",
		"rounded",
		"text"
	]), import_prop_types.default.string]),
	width: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DayCalendarSkeleton/dayCalendarSkeletonClasses.js
var getDayCalendarSkeletonUtilityClass = (slot) => generateUtilityClass("MuiDayCalendarSkeleton", slot);
var dayCalendarSkeletonClasses = generateUtilityClasses("MuiDayCalendarSkeleton", [
	"root",
	"week",
	"daySkeleton"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DayCalendarSkeleton/DayCalendarSkeleton.js
var _excluded$19 = ["className", "classes"];
var useUtilityClasses$21 = (classes) => {
	return composeClasses({
		root: ["root"],
		week: ["week"],
		daySkeleton: ["daySkeleton"]
	}, getDayCalendarSkeletonUtilityClass, classes);
};
var DayCalendarSkeletonRoot = styled("div", {
	name: "MuiDayCalendarSkeleton",
	slot: "Root"
})({ alignSelf: "start" });
var DayCalendarSkeletonWeek = styled("div", {
	name: "MuiDayCalendarSkeleton",
	slot: "Week"
})({
	margin: `2px 0`,
	display: "flex",
	justifyContent: "center"
});
var DayCalendarSkeletonDay = styled(Skeleton, {
	name: "MuiDayCalendarSkeleton",
	slot: "DaySkeleton"
})({
	margin: `0 2px`,
	"&[data-day-in-month=\"0\"]": { visibility: "hidden" }
});
var monthMap = [
	[
		0,
		1,
		1,
		1,
		1,
		1,
		1
	],
	[
		1,
		1,
		1,
		1,
		1,
		1,
		1
	],
	[
		1,
		1,
		1,
		1,
		1,
		1,
		1
	],
	[
		1,
		1,
		1,
		1,
		1,
		1,
		1
	],
	[
		1,
		1,
		1,
		1,
		0,
		0,
		0
	]
];
/**
* Demos:
*
* - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
*
* API:
*
* - [CalendarPickerSkeleton API](https://mui.com/x/api/date-pickers/calendar-picker-skeleton/)
*/
function DayCalendarSkeleton(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDayCalendarSkeleton"
	});
	const { className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$19);
	const classes = useUtilityClasses$21(classesProp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayCalendarSkeletonRoot, _extends({
		className: clsx(classes.root, className),
		ownerState: props
	}, other, { children: monthMap.map((week, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayCalendarSkeletonWeek, {
		className: classes.week,
		children: week.map((dayInMonth, index2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayCalendarSkeletonDay, {
			variant: "circular",
			width: 36,
			height: 36,
			className: classes.daySkeleton,
			"data-day-in-month": dayInMonth
		}, index2))
	}, index)) }));
}
DayCalendarSkeleton.propTypes = {
	classes: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/pickersToolbarClasses.js
function getPickersToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiPickersToolbar", slot);
}
var pickersToolbarClasses = generateUtilityClasses("MuiPickersToolbar", [
	"root",
	"title",
	"content"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useToolbarOwnerState.js
function useToolbarOwnerState() {
	const { ownerState: pickerOwnerState } = usePickerPrivateContext();
	const isRtl = useRtl();
	return import_react.useMemo(() => _extends({}, pickerOwnerState, { toolbarDirection: isRtl ? "rtl" : "ltr" }), [pickerOwnerState, isRtl]);
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersToolbar.js
var _excluded$18 = [
	"children",
	"className",
	"classes",
	"toolbarTitle",
	"hidden",
	"titleId",
	"classes",
	"landscapeDirection"
];
var useUtilityClasses$20 = (classes) => {
	return composeClasses({
		root: ["root"],
		title: ["title"],
		content: ["content"]
	}, getPickersToolbarUtilityClass, classes);
};
var PickersToolbarRoot = styled("div", {
	name: "MuiPickersToolbar",
	slot: "Root"
})(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	justifyContent: "space-between",
	padding: theme.spacing(2, 3),
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			height: "auto",
			maxWidth: 160,
			padding: 16,
			justifyContent: "flex-start",
			flexWrap: "wrap"
		}
	}]
}));
var PickersToolbarContent = styled("div", {
	name: "MuiPickersToolbar",
	slot: "Content",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "landscapeDirection"
})({
	display: "flex",
	flexWrap: "wrap",
	width: "100%",
	flex: 1,
	justifyContent: "space-between",
	alignItems: "center",
	flexDirection: "row",
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			justifyContent: "flex-start",
			alignItems: "flex-start",
			flexDirection: "column"
		}
	}, {
		props: {
			pickerOrientation: "landscape",
			landscapeDirection: "row"
		},
		style: { flexDirection: "row" }
	}]
});
var PickersToolbar = /* @__PURE__ */ import_react.forwardRef(function PickersToolbar(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbar"
	});
	const { children, className, classes: classesProp, toolbarTitle, hidden, titleId, landscapeDirection } = props, other = _objectWithoutPropertiesLoose(props, _excluded$18);
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses$20(classesProp);
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersToolbarRoot, _extends({
		ref,
		className: clsx(classes.root, className),
		ownerState
	}, other, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
		color: "text.secondary",
		variant: "overline",
		id: titleId,
		className: classes.title,
		children: toolbarTitle
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarContent, {
		className: classes.content,
		ownerState,
		landscapeDirection,
		children
	})] }));
});
PickersToolbar.displayName = "PickersToolbar";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DatePicker/datePickerToolbarClasses.js
function getDatePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiDatePickerToolbar", slot);
}
var datePickerToolbarClasses = generateUtilityClasses("MuiDatePickerToolbar", ["root", "title"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DatePicker/DatePickerToolbar.js
var _excluded$17 = [
	"toolbarFormat",
	"toolbarPlaceholder",
	"className",
	"classes"
];
var useUtilityClasses$19 = (classes) => {
	return composeClasses({
		root: ["root"],
		title: ["title"]
	}, getDatePickerToolbarUtilityClass, classes);
};
var DatePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiDatePickerToolbar",
	slot: "Root"
})({});
var DatePickerToolbarTitle = styled(Typography, {
	name: "MuiDatePickerToolbar",
	slot: "Title"
})({ variants: [{
	props: { pickerOrientation: "landscape" },
	style: { margin: "auto 16px auto auto" }
}] });
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [DatePickerToolbar API](https://mui.com/x/api/date-pickers/date-picker-toolbar/)
*/
var DatePickerToolbar = /* @__PURE__ */ import_react.forwardRef(function DatePickerToolbar(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDatePickerToolbar"
	});
	const { toolbarFormat, toolbarPlaceholder = "––", className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$17);
	const adapter = usePickerAdapter();
	const { value, views, orientation } = usePickerContext();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses$19(classesProp);
	const dateText = import_react.useMemo(() => {
		if (!adapter.isValid(value)) return toolbarPlaceholder;
		const formatFromViews = resolveDateFormat(adapter, {
			format: toolbarFormat,
			views
		}, true);
		return adapter.formatByString(value, formatFromViews);
	}, [
		value,
		toolbarFormat,
		toolbarPlaceholder,
		adapter,
		views
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePickerToolbarRoot, _extends({
		ref,
		toolbarTitle: translations.datePickerToolbarTitle,
		className: clsx(classes.root, className)
	}, other, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePickerToolbarTitle, {
		variant: "h4",
		align: orientation === "landscape" ? "left" : "center",
		ownerState,
		className: classes.title,
		children: dateText
	}) }));
});
DatePickerToolbar.displayName = "DatePickerToolbar";
DatePickerToolbar.propTypes = {
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	hidden: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	titleId: import_prop_types.default.string,
	toolbarFormat: import_prop_types.default.string,
	toolbarPlaceholder: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DatePicker/shared.js
function useDatePickerDefaultizedProps(props, name) {
	const themeProps = useThemeProps({
		props,
		name
	});
	return _extends({}, themeProps, useApplyDefaultValuesToDateValidationProps(themeProps), { localeText: import_react.useMemo(() => {
		if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
		return _extends({}, themeProps.localeText, { datePickerToolbarTitle: themeProps.localeText.toolbarTitle });
	}, [themeProps.localeText]) }, applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: ["year", "day"],
		defaultOpenTo: "day"
	}), { slots: _extends({ toolbar: DatePickerToolbar }, themeProps.slots) });
}
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [
	"top",
	bottom,
	right,
	left
];
var start = "start";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
	return acc.concat([placement + "-" + start, placement + "-end"]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
	return acc.concat([
		placement,
		placement + "-" + start,
		placement + "-end"
	]);
}, []);
var modifierPhases = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
	return element ? (element.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
	if (node == null) return window;
	if (node.toString() !== "[object Window]") {
		var ownerDocument = node.ownerDocument;
		return ownerDocument ? ownerDocument.defaultView || window : window;
	}
	return node;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
	return node instanceof getWindow(node).Element || node instanceof Element;
}
function isHTMLElement$1(node) {
	return node instanceof getWindow(node).HTMLElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
	if (typeof ShadowRoot === "undefined") return false;
	return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
	var state = _ref.state;
	Object.keys(state.elements).forEach(function(name) {
		var style = state.styles[name] || {};
		var attributes = state.attributes[name] || {};
		var element = state.elements[name];
		if (!isHTMLElement$1(element) || !getNodeName(element)) return;
		Object.assign(element.style, style);
		Object.keys(attributes).forEach(function(name) {
			var value = attributes[name];
			if (value === false) element.removeAttribute(name);
			else element.setAttribute(name, value === true ? "" : value);
		});
	});
}
function effect$2(_ref2) {
	var state = _ref2.state;
	var initialStyles = {
		popper: {
			position: state.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(state.elements.popper.style, initialStyles.popper);
	state.styles = initialStyles;
	if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
	return function() {
		Object.keys(state.elements).forEach(function(name) {
			var element = state.elements[name];
			var attributes = state.attributes[name] || {};
			var style = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]).reduce(function(style, property) {
				style[property] = "";
				return style;
			}, {});
			if (!isHTMLElement$1(element) || !getNodeName(element)) return;
			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(attribute) {
				element.removeAttribute(attribute);
			});
		});
	};
}
var applyStyles_default = {
	name: "applyStyles",
	enabled: true,
	phase: "write",
	fn: applyStyles,
	effect: effect$2,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
	return placement.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
	var uaData = navigator.userAgentData;
	if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) return uaData.brands.map(function(item) {
		return item.brand + "/" + item.version;
	}).join(" ");
	return navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
	return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	var clientRect = element.getBoundingClientRect();
	var scaleX = 1;
	var scaleY = 1;
	if (includeScale && isHTMLElement$1(element)) {
		scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
		scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	}
	var visualViewport = (isElement(element) ? getWindow(element) : window).visualViewport;
	var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	var width = clientRect.width / scaleX;
	var height = clientRect.height / scaleY;
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
	var clientRect = getBoundingClientRect(element);
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
	if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width,
		height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
	var rootNode = child.getRootNode && child.getRootNode();
	if (parent.contains(child)) return true;
	else if (rootNode && isShadowRoot(rootNode)) {
		var next = child;
		do {
			if (next && parent.isSameNode(next)) return true;
			next = next.parentNode || next.host;
		} while (next);
	}
	return false;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
	return getWindow(element).getComputedStyle(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
	return [
		"table",
		"td",
		"th"
	].indexOf(getNodeName(element)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
	return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
	if (getNodeName(element) === "html") return element;
	return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
	if (!isHTMLElement$1(element) || getComputedStyle(element).position === "fixed") return null;
	return element.offsetParent;
}
function getContainingBlock(element) {
	var isFirefox = /firefox/i.test(getUAString());
	if (/Trident/i.test(getUAString()) && isHTMLElement$1(element)) {
		if (getComputedStyle(element).position === "fixed") return null;
	}
	var currentNode = getParentNode(element);
	if (isShadowRoot(currentNode)) currentNode = currentNode.host;
	while (isHTMLElement$1(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
		var css = getComputedStyle(currentNode);
		if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") return currentNode;
		else currentNode = currentNode.parentNode;
	}
	return null;
}
function getOffsetParent(element) {
	var window = getWindow(element);
	var offsetParent = getTrueOffsetParent(element);
	while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") offsetParent = getTrueOffsetParent(offsetParent);
	if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) return window;
	return offsetParent || getContainingBlock(element) || window;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
	return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function within(min$2, value, max$2) {
	return max(min$2, min(value, max$2));
}
function withinMaxClamp(min, value, max) {
	var v = within(min, value, max);
	return v > max ? max : v;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
	return Object.assign({}, getFreshSideObject(), paddingObject);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
	return keys.reduce(function(hashMap, key) {
		hashMap[key] = value;
		return hashMap;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject(padding, state) {
	padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, { placement: state.placement })) : padding;
	return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
	var _state$modifiersData$;
	var state = _ref.state, name = _ref.name, options = _ref.options;
	var arrowElement = state.elements.arrow;
	var popperOffsets = state.modifiersData.popperOffsets;
	var basePlacement = getBasePlacement(state.placement);
	var axis = getMainAxisFromPlacement(basePlacement);
	var len = ["left", "right"].indexOf(basePlacement) >= 0 ? "height" : "width";
	if (!arrowElement || !popperOffsets) return;
	var paddingObject = toPaddingObject(options.padding, state);
	var arrowRect = getLayoutRect(arrowElement);
	var minProp = axis === "y" ? "top" : left;
	var maxProp = axis === "y" ? bottom : right;
	var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	var arrowOffsetParent = getOffsetParent(arrowElement);
	var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	var centerToReference = endDiff / 2 - startDiff / 2;
	var min = paddingObject[minProp];
	var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	var offset = within(min, center, max);
	var axisProp = axis;
	state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
	var state = _ref2.state;
	var _options$element = _ref2.options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
	if (arrowElement == null) return;
	if (typeof arrowElement === "string") {
		arrowElement = state.elements.popper.querySelector(arrowElement);
		if (!arrowElement) return;
	}
	if (!contains(state.elements.popper, arrowElement)) return;
	state.elements.arrow = arrowElement;
}
var arrow_default = {
	name: "arrow",
	enabled: true,
	phase: "main",
	fn: arrow,
	effect: effect$1,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
	return placement.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
	var x = _ref.x, y = _ref.y;
	var dpr = win.devicePixelRatio || 1;
	return {
		x: round(x * dpr) / dpr || 0,
		y: round(y * dpr) / dpr || 0
	};
}
function mapToStyles(_ref2) {
	var _Object$assign2;
	var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
	var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
	var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
		x,
		y
	}) : {
		x,
		y
	};
	x = _ref3.x;
	y = _ref3.y;
	var hasX = offsets.hasOwnProperty("x");
	var hasY = offsets.hasOwnProperty("y");
	var sideX = left;
	var sideY = "top";
	var win = window;
	if (adaptive) {
		var offsetParent = getOffsetParent(popper);
		var heightProp = "clientHeight";
		var widthProp = "clientWidth";
		if (offsetParent === getWindow(popper)) {
			offsetParent = getDocumentElement(popper);
			if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
				heightProp = "scrollHeight";
				widthProp = "scrollWidth";
			}
		}
		offsetParent = offsetParent;
		if (placement === "top" || (placement === "left" || placement === "right") && variation === "end") {
			sideY = bottom;
			var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
			y -= offsetY - popperRect.height;
			y *= gpuAcceleration ? 1 : -1;
		}
		if (placement === "left" || (placement === "top" || placement === "bottom") && variation === "end") {
			sideX = right;
			var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
			x -= offsetX - popperRect.width;
			x *= gpuAcceleration ? 1 : -1;
		}
	}
	var commonStyles = Object.assign({ position }, adaptive && unsetSides);
	var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
		x,
		y
	}, getWindow(popper)) : {
		x,
		y
	};
	x = _ref4.x;
	y = _ref4.y;
	if (gpuAcceleration) {
		var _Object$assign;
		return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	}
	return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
	var state = _ref5.state, options = _ref5.options;
	var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	var commonStyles = {
		placement: getBasePlacement(state.placement),
		variation: getVariation(state.placement),
		popper: state.elements.popper,
		popperRect: state.rects.popper,
		gpuAcceleration,
		isFixed: state.options.strategy === "fixed"
	};
	if (state.modifiersData.popperOffsets != null) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.popperOffsets,
		position: state.options.strategy,
		adaptive,
		roundOffsets
	})));
	if (state.modifiersData.arrow != null) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
		offsets: state.modifiersData.arrow,
		position: "absolute",
		adaptive: false,
		roundOffsets
	})));
	state.attributes.popper = Object.assign({}, state.attributes.popper, { "data-popper-placement": state.placement });
}
var computeStyles_default = {
	name: "computeStyles",
	enabled: true,
	phase: "beforeWrite",
	fn: computeStyles,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = { passive: true };
function effect(_ref) {
	var state = _ref.state, instance = _ref.instance, options = _ref.options;
	var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
	var window = getWindow(state.elements.popper);
	var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	if (scroll) scrollParents.forEach(function(scrollParent) {
		scrollParent.addEventListener("scroll", instance.update, passive);
	});
	if (resize) window.addEventListener("resize", instance.update, passive);
	return function() {
		if (scroll) scrollParents.forEach(function(scrollParent) {
			scrollParent.removeEventListener("scroll", instance.update, passive);
		});
		if (resize) window.removeEventListener("resize", instance.update, passive);
	};
}
var eventListeners_default = {
	name: "eventListeners",
	enabled: true,
	phase: "write",
	fn: function fn() {},
	effect,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash$1 = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function getOppositePlacement(placement) {
	return placement.replace(/left|right|bottom|top/g, function(matched) {
		return hash$1[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash = {
	start: "end",
	end: "start"
};
function getOppositeVariationPlacement(placement) {
	return placement.replace(/start|end/g, function(matched) {
		return hash[matched];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
	var win = getWindow(node);
	return {
		scrollLeft: win.pageXOffset,
		scrollTop: win.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
	return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
	var win = getWindow(element);
	var html = getDocumentElement(element);
	var visualViewport = win.visualViewport;
	var width = html.clientWidth;
	var height = html.clientHeight;
	var x = 0;
	var y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		var layoutViewport = isLayoutViewport();
		if (layoutViewport || !layoutViewport && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x: x + getWindowScrollBarX(element),
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
	var _element$ownerDocumen;
	var html = getDocumentElement(element);
	var winScroll = getWindowScroll(element);
	var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	var y = -winScroll.scrollTop;
	if (getComputedStyle(body || html).direction === "rtl") x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	return {
		width,
		height,
		x,
		y
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
	var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
	return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
	if ([
		"html",
		"body",
		"#document"
	].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
	if (isHTMLElement$1(node) && isScrollParent(node)) return node;
	return getScrollParent(getParentNode(node));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
	var _element$ownerDocumen;
	if (list === void 0) list = [];
	var scrollParent = getScrollParent(element);
	var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	var win = getWindow(scrollParent);
	var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	var updatedList = list.concat(target);
	return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
	return Object.assign({}, rect, {
		left: rect.x,
		top: rect.y,
		right: rect.x + rect.width,
		bottom: rect.y + rect.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
	var rect = getBoundingClientRect(element, false, strategy === "fixed");
	rect.top = rect.top + element.clientTop;
	rect.left = rect.left + element.clientLeft;
	rect.bottom = rect.top + element.clientHeight;
	rect.right = rect.left + element.clientWidth;
	rect.width = element.clientWidth;
	rect.height = element.clientHeight;
	rect.x = rect.left;
	rect.y = rect.top;
	return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
	return clippingParent === "viewport" ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
	var clippingParents = listScrollParents(getParentNode(element));
	var clipperElement = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0 && isHTMLElement$1(element) ? getOffsetParent(element) : element;
	if (!isElement(clipperElement)) return [];
	return clippingParents.filter(function(clippingParent) {
		return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
	});
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
	var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
	var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	var firstClippingParent = clippingParents[0];
	var clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
		var rect = getClientRectFromMixedType(element, clippingParent, strategy);
		accRect.top = max(rect.top, accRect.top);
		accRect.right = min(rect.right, accRect.right);
		accRect.bottom = min(rect.bottom, accRect.bottom);
		accRect.left = max(rect.left, accRect.left);
		return accRect;
	}, getClientRectFromMixedType(element, firstClippingParent, strategy));
	clippingRect.width = clippingRect.right - clippingRect.left;
	clippingRect.height = clippingRect.bottom - clippingRect.top;
	clippingRect.x = clippingRect.left;
	clippingRect.y = clippingRect.top;
	return clippingRect;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
	var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
	var basePlacement = placement ? getBasePlacement(placement) : null;
	var variation = placement ? getVariation(placement) : null;
	var commonX = reference.x + reference.width / 2 - element.width / 2;
	var commonY = reference.y + reference.height / 2 - element.height / 2;
	var offsets;
	switch (basePlacement) {
		case "top":
			offsets = {
				x: commonX,
				y: reference.y - element.height
			};
			break;
		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY
			};
			break;
		default: offsets = {
			x: reference.x,
			y: reference.y
		};
	}
	var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	if (mainAxis != null) {
		var len = mainAxis === "y" ? "height" : "width";
		switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;
			case "end":
				offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
				break;
			default:
		}
	}
	return offsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
	if (options === void 0) options = {};
	var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
	var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
	var altContext = elementContext === "popper" ? reference : popper;
	var popperRect = state.rects.popper;
	var element = state.elements[altBoundary ? altContext : elementContext];
	var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	var referenceClientRect = getBoundingClientRect(state.elements.reference);
	var popperOffsets = computeOffsets({
		reference: referenceClientRect,
		element: popperRect,
		strategy: "absolute",
		placement
	});
	var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	var elementClientRect = elementContext === "popper" ? popperClientRect : referenceClientRect;
	var overflowOffsets = {
		top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
		bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
		left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
		right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	};
	var offsetData = state.modifiersData.offset;
	if (elementContext === "popper" && offsetData) {
		var offset = offsetData[placement];
		Object.keys(overflowOffsets).forEach(function(key) {
			var multiply = ["right", "bottom"].indexOf(key) >= 0 ? 1 : -1;
			var axis = ["top", "bottom"].indexOf(key) >= 0 ? "y" : "x";
			overflowOffsets[key] += offset[axis] * multiply;
		});
	}
	return overflowOffsets;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
	if (options === void 0) options = {};
	var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	var variation = getVariation(placement);
	var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
		return getVariation(placement) === variation;
	}) : basePlacements;
	var allowedPlacements = placements$1.filter(function(placement) {
		return allowedAutoPlacements.indexOf(placement) >= 0;
	});
	if (allowedPlacements.length === 0) allowedPlacements = placements$1;
	var overflows = allowedPlacements.reduce(function(acc, placement) {
		acc[placement] = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			padding
		})[getBasePlacement(placement)];
		return acc;
	}, {});
	return Object.keys(overflows).sort(function(a, b) {
		return overflows[a] - overflows[b];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
	if (getBasePlacement(placement) === "auto") return [];
	var oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeVariationPlacement(placement),
		oppositePlacement,
		getOppositeVariationPlacement(oppositePlacement)
	];
}
function flip(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	if (state.modifiersData[name]._skip) return;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
	var preferredPlacement = state.options.placement;
	var isBasePlacement = getBasePlacement(preferredPlacement) === preferredPlacement;
	var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
		return acc.concat(getBasePlacement(placement) === "auto" ? computeAutoPlacement(state, {
			placement,
			boundary,
			rootBoundary,
			padding,
			flipVariations,
			allowedAutoPlacements
		}) : placement);
	}, []);
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var checksMap = /* @__PURE__ */ new Map();
	var makeFallbackChecks = true;
	var firstFittingPlacement = placements[0];
	for (var i = 0; i < placements.length; i++) {
		var placement = placements[i];
		var _basePlacement = getBasePlacement(placement);
		var isStartVariation = getVariation(placement) === start;
		var isVertical = ["top", bottom].indexOf(_basePlacement) >= 0;
		var len = isVertical ? "width" : "height";
		var overflow = detectOverflow(state, {
			placement,
			boundary,
			rootBoundary,
			altBoundary,
			padding
		});
		var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : "top";
		if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
		var altVariationSide = getOppositePlacement(mainVariationSide);
		var checks = [];
		if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
		if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
		if (checks.every(function(check) {
			return check;
		})) {
			firstFittingPlacement = placement;
			makeFallbackChecks = false;
			break;
		}
		checksMap.set(placement, checks);
	}
	if (makeFallbackChecks) {
		var numberOfChecks = flipVariations ? 3 : 1;
		var _loop = function _loop(_i) {
			var fittingPlacement = placements.find(function(placement) {
				var checks = checksMap.get(placement);
				if (checks) return checks.slice(0, _i).every(function(check) {
					return check;
				});
			});
			if (fittingPlacement) {
				firstFittingPlacement = fittingPlacement;
				return "break";
			}
		};
		for (var _i = numberOfChecks; _i > 0; _i--) if (_loop(_i) === "break") break;
	}
	if (state.placement !== firstFittingPlacement) {
		state.modifiersData[name]._skip = true;
		state.placement = firstFittingPlacement;
		state.reset = true;
	}
}
var flip_default = {
	name: "flip",
	enabled: true,
	phase: "main",
	fn: flip,
	requiresIfExists: ["offset"],
	data: { _skip: false }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
	if (preventedOffsets === void 0) preventedOffsets = {
		x: 0,
		y: 0
	};
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x
	};
}
function isAnySideFullyClipped(overflow) {
	return [
		"top",
		right,
		bottom,
		left
	].some(function(side) {
		return overflow[side] >= 0;
	});
}
function hide(_ref) {
	var state = _ref.state, name = _ref.name;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var preventedOffsets = state.modifiersData.preventOverflow;
	var referenceOverflow = detectOverflow(state, { elementContext: "reference" });
	var popperAltOverflow = detectOverflow(state, { altBoundary: true });
	var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped
	};
	state.attributes.popper = Object.assign({}, state.attributes.popper, {
		"data-popper-reference-hidden": isReferenceHidden,
		"data-popper-escaped": hasPopperEscaped
	});
}
var hide_default = {
	name: "hide",
	enabled: true,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: hide
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset) {
	var basePlacement = getBasePlacement(placement);
	var invertDistance = ["left", "top"].indexOf(basePlacement) >= 0 ? -1 : 1;
	var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, { placement })) : offset, skidding = _ref[0], distance = _ref[1];
	skidding = skidding || 0;
	distance = (distance || 0) * invertDistance;
	return ["left", "right"].indexOf(basePlacement) >= 0 ? {
		x: distance,
		y: skidding
	} : {
		x: skidding,
		y: distance
	};
}
function offset(_ref2) {
	var state = _ref2.state, options = _ref2.options, name = _ref2.name;
	var _options$offset = options.offset, offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	var data = placements.reduce(function(acc, placement) {
		acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
		return acc;
	}, {});
	var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
	if (state.modifiersData.popperOffsets != null) {
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}
	state.modifiersData[name] = data;
}
var offset_default = {
	name: "offset",
	enabled: true,
	phase: "main",
	requires: ["popperOffsets"],
	fn: offset
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
	var state = _ref.state, name = _ref.name;
	state.modifiersData[name] = computeOffsets({
		reference: state.rects.reference,
		element: state.rects.popper,
		strategy: "absolute",
		placement: state.placement
	});
}
var popperOffsets_default = {
	name: "popperOffsets",
	enabled: true,
	phase: "read",
	fn: popperOffsets,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
	return axis === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
	var state = _ref.state, options = _ref.options, name = _ref.name;
	var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	var overflow = detectOverflow(state, {
		boundary,
		rootBoundary,
		padding,
		altBoundary
	});
	var basePlacement = getBasePlacement(state.placement);
	var variation = getVariation(state.placement);
	var isBasePlacement = !variation;
	var mainAxis = getMainAxisFromPlacement(basePlacement);
	var altAxis = getAltAxis(mainAxis);
	var popperOffsets = state.modifiersData.popperOffsets;
	var referenceRect = state.rects.reference;
	var popperRect = state.rects.popper;
	var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, { placement: state.placement })) : tetherOffset;
	var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
		mainAxis: tetherOffsetValue,
		altAxis: tetherOffsetValue
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, tetherOffsetValue);
	var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	var data = {
		x: 0,
		y: 0
	};
	if (!popperOffsets) return;
	if (checkMainAxis) {
		var _offsetModifierState$;
		var mainSide = mainAxis === "y" ? "top" : left;
		var altSide = mainAxis === "y" ? bottom : right;
		var len = mainAxis === "y" ? "height" : "width";
		var offset = popperOffsets[mainAxis];
		var min$1 = offset + overflow[mainSide];
		var max$1 = offset - overflow[altSide];
		var additive = tether ? -popperRect[len] / 2 : 0;
		var minLen = variation === "start" ? referenceRect[len] : popperRect[len];
		var maxLen = variation === "start" ? -popperRect[len] : -referenceRect[len];
		var arrowElement = state.elements.arrow;
		var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
			width: 0,
			height: 0
		};
		var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
		var arrowPaddingMin = arrowPaddingObject[mainSide];
		var arrowPaddingMax = arrowPaddingObject[altSide];
		var arrowLen = within(0, referenceRect[len], arrowRect[len]);
		var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
		var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
		var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
		var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
		var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
		var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
		var tetherMax = offset + maxOffset - offsetModifierValue;
		var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
		popperOffsets[mainAxis] = preventedOffset;
		data[mainAxis] = preventedOffset - offset;
	}
	if (checkAltAxis) {
		var _offsetModifierState$2;
		var _mainSide = mainAxis === "x" ? "top" : left;
		var _altSide = mainAxis === "x" ? bottom : right;
		var _offset = popperOffsets[altAxis];
		var _len = altAxis === "y" ? "height" : "width";
		var _min = _offset + overflow[_mainSide];
		var _max = _offset - overflow[_altSide];
		var isOriginSide = ["top", left].indexOf(basePlacement) !== -1;
		var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
		var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
		var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
		var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
		popperOffsets[altAxis] = _preventedOffset;
		data[altAxis] = _preventedOffset - _offset;
	}
	state.modifiersData[name] = data;
}
var preventOverflow_default = {
	name: "preventOverflow",
	enabled: true,
	phase: "main",
	fn: preventOverflow,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
	return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
	if (node === getWindow(node) || !isHTMLElement$1(node)) return getWindowScroll(node);
	else return getHTMLElementScroll(node);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
	var rect = element.getBoundingClientRect();
	var scaleX = round(rect.width) / element.offsetWidth || 1;
	var scaleY = round(rect.height) / element.offsetHeight || 1;
	return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	if (isFixed === void 0) isFixed = false;
	var isOffsetParentAnElement = isHTMLElement$1(offsetParent);
	var offsetParentIsScaled = isHTMLElement$1(offsetParent) && isElementScaled(offsetParent);
	var documentElement = getDocumentElement(offsetParent);
	var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	var scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	var offsets = {
		x: 0,
		y: 0
	};
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isHTMLElement$1(offsetParent)) {
			offsets = getBoundingClientRect(offsetParent, true);
			offsets.x += offsetParent.clientLeft;
			offsets.y += offsetParent.clientTop;
		} else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
	}
	return {
		x: rect.left + scroll.scrollLeft - offsets.x,
		y: rect.top + scroll.scrollTop - offsets.y,
		width: rect.width,
		height: rect.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
	var map = /* @__PURE__ */ new Map();
	var visited = /* @__PURE__ */ new Set();
	var result = [];
	modifiers.forEach(function(modifier) {
		map.set(modifier.name, modifier);
	});
	function sort(modifier) {
		visited.add(modifier.name);
		[].concat(modifier.requires || [], modifier.requiresIfExists || []).forEach(function(dep) {
			if (!visited.has(dep)) {
				var depModifier = map.get(dep);
				if (depModifier) sort(depModifier);
			}
		});
		result.push(modifier);
	}
	modifiers.forEach(function(modifier) {
		if (!visited.has(modifier.name)) sort(modifier);
	});
	return result;
}
function orderModifiers(modifiers) {
	var orderedModifiers = order(modifiers);
	return modifierPhases.reduce(function(acc, phase) {
		return acc.concat(orderedModifiers.filter(function(modifier) {
			return modifier.phase === phase;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
	var pending;
	return function() {
		if (!pending) pending = new Promise(function(resolve) {
			Promise.resolve().then(function() {
				pending = void 0;
				resolve(fn());
			});
		});
		return pending;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
	var merged = modifiers.reduce(function(merged, current) {
		var existing = merged[current.name];
		merged[current.name] = existing ? Object.assign({}, existing, current, {
			options: Object.assign({}, existing.options, current.options),
			data: Object.assign({}, existing.data, current.data)
		}) : current;
		return merged;
	}, {});
	return Object.keys(merged).map(function(key) {
		return merged[key];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function areValidElements() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return !args.some(function(element) {
		return !(element && typeof element.getBoundingClientRect === "function");
	});
}
function popperGenerator(generatorOptions) {
	if (generatorOptions === void 0) generatorOptions = {};
	var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	return function createPopper(reference, popper, options) {
		if (options === void 0) options = defaultOptions;
		var state = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
			modifiersData: {},
			elements: {
				reference,
				popper
			},
			attributes: {},
			styles: {}
		};
		var effectCleanupFns = [];
		var isDestroyed = false;
		var instance = {
			state,
			setOptions: function setOptions(setOptionsAction) {
				var options = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
				cleanupModifierEffects();
				state.options = Object.assign({}, defaultOptions, state.options, options);
				state.scrollParents = {
					reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
					popper: listScrollParents(popper)
				};
				var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
				state.orderedModifiers = orderedModifiers.filter(function(m) {
					return m.enabled;
				});
				runModifierEffects();
				return instance.update();
			},
			forceUpdate: function forceUpdate() {
				if (isDestroyed) return;
				var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
				if (!areValidElements(reference, popper)) return;
				state.rects = {
					reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === "fixed"),
					popper: getLayoutRect(popper)
				};
				state.reset = false;
				state.placement = state.options.placement;
				state.orderedModifiers.forEach(function(modifier) {
					return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
				});
				for (var index = 0; index < state.orderedModifiers.length; index++) {
					if (state.reset === true) {
						state.reset = false;
						index = -1;
						continue;
					}
					var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
					if (typeof fn === "function") state = fn({
						state,
						options: _options,
						name,
						instance
					}) || state;
				}
			},
			update: debounce(function() {
				return new Promise(function(resolve) {
					instance.forceUpdate();
					resolve(state);
				});
			}),
			destroy: function destroy() {
				cleanupModifierEffects();
				isDestroyed = true;
			}
		};
		if (!areValidElements(reference, popper)) return instance;
		instance.setOptions(options).then(function(state) {
			if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
		});
		function runModifierEffects() {
			state.orderedModifiers.forEach(function(_ref) {
				var name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, effect = _ref.effect;
				if (typeof effect === "function") {
					var cleanupFn = effect({
						state,
						name,
						instance,
						options
					});
					effectCleanupFns.push(cleanupFn || function noopFn() {});
				}
			});
		}
		function cleanupModifierEffects() {
			effectCleanupFns.forEach(function(fn) {
				return fn();
			});
			effectCleanupFns = [];
		}
		return instance;
	};
}
var createPopper = /* @__PURE__ */ popperGenerator({ defaultModifiers: [
	eventListeners_default,
	popperOffsets_default,
	computeStyles_default,
	applyStyles_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default,
	hide_default
] });
//#endregion
//#region node_modules/@mui/material/esm/Popper/popperClasses.js
function getPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPopper", slot);
}
generateUtilityClasses("MuiPopper", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/Popper/BasePopper.js
function flipPlacement(placement, direction) {
	if (direction === "ltr") return placement;
	switch (placement) {
		case "bottom-end": return "bottom-start";
		case "bottom-start": return "bottom-end";
		case "top-end": return "top-start";
		case "top-start": return "top-end";
		default: return placement;
	}
}
function resolveAnchorEl(anchorEl) {
	return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
	return element.nodeType !== void 0;
}
function isVirtualElement(element) {
	return !isHTMLElement(element);
}
var useUtilityClasses$18 = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getPopperUtilityClass, classes);
};
var defaultPopperOptions = {};
var PopperTooltip = /* @__PURE__ */ import_react.forwardRef(function PopperTooltip(props, forwardedRef) {
	const { anchorEl, children, direction, disablePortal, modifiers, open, placement: initialPlacement, popperOptions, popperRef: popperRefProp, slotProps = {}, slots = {}, TransitionProps, ownerState: ownerStateProp, ...other } = props;
	const tooltipRef = import_react.useRef(null);
	const ownRef = useForkRef(tooltipRef, forwardedRef);
	const popperRef = import_react.useRef(null);
	const handlePopperRef = useForkRef(popperRef, popperRefProp);
	const handlePopperRefRef = import_react.useRef(handlePopperRef);
	useEnhancedEffect(() => {
		handlePopperRefRef.current = handlePopperRef;
	}, [handlePopperRef]);
	import_react.useImperativeHandle(popperRefProp, () => popperRef.current, []);
	const rtlPlacement = flipPlacement(initialPlacement, direction);
	/**
	* placement initialized from prop but can change during lifetime if modifiers.flip.
	* modifiers.flip is essentially a flip for controlled/uncontrolled behavior
	*/
	const [placement, setPlacement] = import_react.useState(rtlPlacement);
	const [resolvedAnchorElement, setResolvedAnchorElement] = import_react.useState(resolveAnchorEl(anchorEl));
	import_react.useEffect(() => {
		if (popperRef.current) popperRef.current.forceUpdate();
	});
	import_react.useEffect(() => {
		if (anchorEl) setResolvedAnchorElement(resolveAnchorEl(anchorEl));
	}, [anchorEl]);
	useEnhancedEffect(() => {
		if (!resolvedAnchorElement || !open) return;
		const handlePopperUpdate = (data) => {
			setPlacement(data.placement);
		};
		if (resolvedAnchorElement && isHTMLElement(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
			const box = resolvedAnchorElement.getBoundingClientRect();
			if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) console.warn([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"The anchor element should be part of the document layout.",
				"Make sure the element is present in the document or that it's not display none."
			].join("\n"));
		}
		let popperModifiers = [
			{
				name: "preventOverflow",
				options: { altBoundary: disablePortal }
			},
			{
				name: "flip",
				options: { altBoundary: disablePortal }
			},
			{
				name: "onUpdate",
				enabled: true,
				phase: "afterWrite",
				fn: ({ state }) => {
					handlePopperUpdate(state);
				}
			}
		];
		if (modifiers != null) popperModifiers = popperModifiers.concat(modifiers);
		if (popperOptions && popperOptions.modifiers != null) popperModifiers = popperModifiers.concat(popperOptions.modifiers);
		const popper = createPopper(resolvedAnchorElement, tooltipRef.current, {
			placement: rtlPlacement,
			...popperOptions,
			modifiers: popperModifiers
		});
		handlePopperRefRef.current(popper);
		return () => {
			popper.destroy();
			handlePopperRefRef.current(null);
		};
	}, [
		resolvedAnchorElement,
		disablePortal,
		modifiers,
		open,
		popperOptions,
		rtlPlacement
	]);
	const childProps = { placement };
	if (TransitionProps !== null) childProps.TransitionProps = TransitionProps;
	const classes = useUtilityClasses$18(props);
	const Root = slots.root ?? "div";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...useSlotProps({
			elementType: Root,
			externalSlotProps: slotProps.root,
			externalForwardedProps: other,
			additionalProps: {
				role: "tooltip",
				ref: ownRef
			},
			ownerState: props,
			className: classes.root
		}),
		children: typeof children === "function" ? children(childProps) : children
	});
});
/**
* @ignore - internal component.
*/
var Popper$1 = /* @__PURE__ */ import_react.forwardRef(function Popper(props, forwardedRef) {
	const { anchorEl, children, container: containerProp, direction = "ltr", disablePortal = false, keepMounted = false, modifiers, open, placement = "bottom", popperOptions = defaultPopperOptions, popperRef, style, transition = false, slotProps = {}, slots = {}, ...other } = props;
	const [exited, setExited] = import_react.useState(true);
	const handleEnter = () => {
		setExited(false);
	};
	const handleExited = () => {
		setExited(true);
	};
	if (!keepMounted && !open && (!transition || exited)) return null;
	let container;
	if (containerProp) container = containerProp;
	else if (anchorEl) {
		const resolvedAnchorEl = resolveAnchorEl(anchorEl);
		container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
	}
	const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
	const transitionProps = transition ? {
		in: open,
		onEnter: handleEnter,
		onExited: handleExited
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		disablePortal,
		container,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperTooltip, {
			anchorEl,
			direction,
			disablePortal,
			modifiers,
			ref: forwardedRef,
			open: transition ? !exited : open,
			placement,
			popperOptions,
			popperRef,
			slotProps,
			slots,
			...other,
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				display,
				...style
			},
			TransitionProps: transitionProps,
			children
		})
	});
});
Popper$1.propTypes = {
	anchorEl: chainPropTypes(import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]), (props) => {
		if (props.open) {
			const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
			if (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
				const box = resolvedAnchorEl.getBoundingClientRect();
				if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) return new Error([
					"MUI: The `anchorEl` prop provided to the component is invalid.",
					"The anchor element should be part of the document layout.",
					"Make sure the element is present in the document or that it's not display none."
				].join("\n"));
			} else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) return new Error([
				"MUI: The `anchorEl` prop provided to the component is invalid.",
				"It should be an HTML element instance or a virtualElement ",
				"(https://popper.js.org/docs/v2/virtual-elements/)."
			].join("\n"));
		}
		return null;
	}),
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	direction: import_prop_types.default.oneOf(["ltr", "rtl"]),
	disablePortal: import_prop_types.default.bool,
	keepMounted: import_prop_types.default.bool,
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	open: import_prop_types.default.bool.isRequired,
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	popperRef: refType,
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/esm/Popper/Popper.js
var PopperRoot = styled(Popper$1, {
	name: "MuiPopper",
	slot: "Root"
})({});
/**
*
* Demos:
*
* - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
* - [Menu](https://mui.com/material-ui/react-menu/)
* - [Popper](https://mui.com/material-ui/react-popper/)
*
* API:
*
* - [Popper API](https://mui.com/material-ui/api/popper/)
*/
var Popper = /* @__PURE__ */ import_react.forwardRef(function Popper(inProps, ref) {
	const isRtl = useRtl();
	const { anchorEl, component, components, componentsProps, container, disablePortal, keepMounted, modifiers, open, placement, popperOptions, popperRef, transition, slots, slotProps, ...other } = useDefaultProps({
		props: inProps,
		name: "MuiPopper"
	});
	const RootComponent = slots?.root ?? components?.Root;
	const otherProps = {
		anchorEl,
		container,
		disablePortal,
		keepMounted,
		modifiers,
		open,
		placement,
		popperOptions,
		popperRef,
		transition,
		...other
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperRoot, {
		as: component,
		direction: isRtl ? "rtl" : "ltr",
		slots: { root: RootComponent },
		slotProps: slotProps ?? componentsProps,
		...otherProps,
		ref
	});
});
Popper.propTypes = {
	anchorEl: import_prop_types.default.oneOfType([
		HTMLElementType,
		import_prop_types.default.object,
		import_prop_types.default.func
	]),
	children: import_prop_types.default.oneOfType([import_prop_types.default.node, import_prop_types.default.func]),
	component: import_prop_types.default.elementType,
	components: import_prop_types.default.shape({ Root: import_prop_types.default.elementType }),
	componentsProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	container: import_prop_types.default.oneOfType([HTMLElementType, import_prop_types.default.func]),
	disablePortal: import_prop_types.default.bool,
	keepMounted: import_prop_types.default.bool,
	modifiers: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		data: import_prop_types.default.object,
		effect: import_prop_types.default.func,
		enabled: import_prop_types.default.bool,
		fn: import_prop_types.default.func,
		name: import_prop_types.default.any,
		options: import_prop_types.default.object,
		phase: import_prop_types.default.oneOf([
			"afterMain",
			"afterRead",
			"afterWrite",
			"beforeMain",
			"beforeRead",
			"beforeWrite",
			"main",
			"read",
			"write"
		]),
		requires: import_prop_types.default.arrayOf(import_prop_types.default.string),
		requiresIfExists: import_prop_types.default.arrayOf(import_prop_types.default.string)
	})),
	open: import_prop_types.default.bool.isRequired,
	placement: import_prop_types.default.oneOf([
		"auto-end",
		"auto-start",
		"auto",
		"bottom-end",
		"bottom-start",
		"bottom",
		"left-end",
		"left-start",
		"left",
		"right-end",
		"right-start",
		"right",
		"top-end",
		"top-start",
		"top"
	]),
	popperOptions: import_prop_types.default.shape({
		modifiers: import_prop_types.default.array,
		onFirstUpdate: import_prop_types.default.func,
		placement: import_prop_types.default.oneOf([
			"auto-end",
			"auto-start",
			"auto",
			"bottom-end",
			"bottom-start",
			"bottom",
			"left-end",
			"left-start",
			"left",
			"right-end",
			"right-start",
			"right",
			"top-end",
			"top-start",
			"top"
		]),
		strategy: import_prop_types.default.oneOf(["absolute", "fixed"])
	}),
	popperRef: refType,
	slotProps: import_prop_types.default.shape({ root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]) }),
	slots: import_prop_types.default.shape({ root: import_prop_types.default.elementType }),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	transition: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickerPopper/pickerPopperClasses.js
function getPickerPopperUtilityClass(slot) {
	return generateUtilityClass("MuiPickerPopper", slot);
}
generateUtilityClasses("MuiPickerPopper", ["root", "paper"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickerPopper/PickerPopper.js
var _excluded$16 = [
	"PaperComponent",
	"ownerState",
	"children",
	"paperSlotProps",
	"paperClasses",
	"onPaperClick",
	"onPaperTouchStart"
];
var useUtilityClasses$17 = (classes) => {
	return composeClasses({
		root: ["root"],
		paper: ["paper"]
	}, getPickerPopperUtilityClass, classes);
};
var PickerPopperRoot = styled(Popper, {
	name: "MuiPickerPopper",
	slot: "Root"
})(({ theme }) => ({ zIndex: theme.zIndex.modal }));
var PickerPopperPaper = styled(Paper, {
	name: "MuiPickerPopper",
	slot: "Paper"
})({
	outline: 0,
	transformOrigin: "top center",
	variants: [{
		props: ({ popperPlacement }) => new Set([
			"top",
			"top-start",
			"top-end"
		]).has(popperPlacement),
		style: { transformOrigin: "bottom center" }
	}]
});
function clickedRootScrollbar(event, doc) {
	return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
* Based on @mui/material/ClickAwayListener without the customization.
* We can probably strip away even more since children won't be portaled.
* @param {boolean} active Only listen to clicks when the popper is opened.
* @param {(event: MouseEvent | TouchEvent) => void} onClickAway The callback to call when clicking outside the popper.
* @returns {Array} The ref and event handler to listen to the outside clicks.
*/
function useClickAwayListener(active, onClickAway) {
	const movedRef = import_react.useRef(false);
	const syntheticEventRef = import_react.useRef(false);
	const nodeRef = import_react.useRef(null);
	const activatedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		if (!active) return;
		function armClickAwayListener() {
			activatedRef.current = true;
		}
		document.addEventListener("mousedown", armClickAwayListener, true);
		document.addEventListener("touchstart", armClickAwayListener, true);
		return () => {
			document.removeEventListener("mousedown", armClickAwayListener, true);
			document.removeEventListener("touchstart", armClickAwayListener, true);
			activatedRef.current = false;
		};
	}, [active]);
	const handleClickAway = useEventCallback((event) => {
		if (!activatedRef.current) return;
		const insideReactTree = syntheticEventRef.current;
		syntheticEventRef.current = false;
		const doc = ownerDocument(nodeRef.current);
		if (!nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) return;
		if (movedRef.current) {
			movedRef.current = false;
			return;
		}
		let insideDOM;
		if (event.composedPath) insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
		else insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
		if (!insideDOM && !insideReactTree) onClickAway(event);
	});
	const handleSynthetic = (event) => {
		if (!event.defaultMuiPrevented) syntheticEventRef.current = true;
	};
	import_react.useEffect(() => {
		if (active) {
			const doc = ownerDocument(nodeRef.current);
			const handleTouchMove = () => {
				movedRef.current = true;
			};
			doc.addEventListener("touchstart", handleClickAway);
			doc.addEventListener("touchmove", handleTouchMove);
			return () => {
				doc.removeEventListener("touchstart", handleClickAway);
				doc.removeEventListener("touchmove", handleTouchMove);
			};
		}
	}, [active, handleClickAway]);
	import_react.useEffect(() => {
		if (active) {
			const doc = ownerDocument(nodeRef.current);
			doc.addEventListener("click", handleClickAway);
			return () => {
				doc.removeEventListener("click", handleClickAway);
				syntheticEventRef.current = false;
			};
		}
	}, [active, handleClickAway]);
	return [
		nodeRef,
		handleSynthetic,
		handleSynthetic
	];
}
var PickerPopperPaperWrapper = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { PaperComponent, ownerState, children, paperSlotProps, paperClasses, onPaperClick, onPaperTouchStart } = props, other = _objectWithoutPropertiesLoose(props, _excluded$16);
	const paperProps = useSlotProps({
		elementType: PaperComponent,
		externalSlotProps: paperSlotProps,
		additionalProps: {
			tabIndex: -1,
			elevation: 8,
			ref
		},
		className: paperClasses,
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperComponent, _extends({}, other, paperProps, {
		onClick: (event) => {
			onPaperClick(event);
			paperProps.onClick?.(event);
		},
		onTouchStart: (event) => {
			onPaperTouchStart(event);
			paperProps.onTouchStart?.(event);
		},
		ownerState,
		children
	}));
});
PickerPopperPaperWrapper.displayName = "PickerPopperPaperWrapper";
function PickerPopper(inProps) {
	const { children, placement = "bottom-start", slots, slotProps, classes: classesProp } = useThemeProps({
		props: inProps,
		name: "MuiPickerPopper"
	});
	const { open, popupRef, reduceAnimations } = usePickerContext();
	const { ownerState: pickerOwnerState, rootRefObject } = usePickerPrivateContext();
	const { dismissViews, getCurrentViewMode, onPopperExited, triggerElement, viewContainerRole } = usePickerPrivateContext();
	import_react.useEffect(() => {
		function handleKeyDown(nativeEvent) {
			if (open && nativeEvent.key === "Escape") dismissViews();
		}
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [dismissViews, open]);
	const lastFocusedElementRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (viewContainerRole === "tooltip" || getCurrentViewMode() === "field") return;
		if (open) lastFocusedElementRef.current = getActiveElement(rootRefObject.current);
		else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) setTimeout(() => {
			if (lastFocusedElementRef.current instanceof HTMLElement) lastFocusedElementRef.current.focus();
		});
	}, [
		open,
		viewContainerRole,
		getCurrentViewMode,
		rootRefObject
	]);
	const classes = useUtilityClasses$17(classesProp);
	const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, useEventCallback(() => {
		if (viewContainerRole === "tooltip") executeInTheNextEventLoopTick(() => {
			if (rootRefObject.current?.contains(getActiveElement(rootRefObject.current)) || popupRef.current?.contains(getActiveElement(popupRef.current))) return;
			dismissViews();
		});
		else dismissViews();
	}));
	const handlePaperRef = useForkRef(useForkRef(import_react.useRef(null), popupRef), clickAwayRef);
	const handleKeyDown = (event) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			dismissViews();
		}
	};
	const Transition = slots?.desktopTransition ?? reduceAnimations ? Fade : Grow;
	const FocusTrap$1 = slots?.desktopTrapFocus ?? FocusTrap;
	const Paper = slots?.desktopPaper ?? PickerPopperPaper;
	const Popper = slots?.popper ?? PickerPopperRoot;
	const popperProps = useSlotProps({
		elementType: Popper,
		externalSlotProps: slotProps?.popper,
		additionalProps: {
			transition: true,
			role: viewContainerRole == null ? void 0 : viewContainerRole,
			open,
			placement,
			anchorEl: triggerElement,
			onKeyDown: handleKeyDown
		},
		className: classes.root,
		ownerState: pickerOwnerState
	});
	const ownerState = import_react.useMemo(() => _extends({}, pickerOwnerState, { popperPlacement: popperProps.placement }), [pickerOwnerState, popperProps.placement]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popper, _extends({}, popperProps, { children: ({ TransitionProps }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusTrap$1, _extends({
		open,
		disableAutoFocus: true,
		disableRestoreFocus: true,
		disableEnforceFocus: viewContainerRole === "tooltip",
		isEnabled: () => true
	}, slotProps?.desktopTrapFocus, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, _extends({}, TransitionProps, slotProps?.desktopTransition, {
		onExited: (event) => {
			onPopperExited?.();
			slotProps?.desktopTransition?.onExited?.(event);
			TransitionProps?.onExited?.();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerPopperPaperWrapper, {
			PaperComponent: Paper,
			ownerState,
			ref: handlePaperRef,
			onPaperClick,
			onPaperTouchStart,
			paperClasses: classes.paper,
			paperSlotProps: slotProps?.desktopPaper,
			children
		})
	})) })) }));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/hooks/useOrientation.js
function getOrientation() {
	if (typeof window === "undefined") return "portrait";
	if (window.screen && window.screen.orientation && window.screen.orientation.angle) return Math.abs(window.screen.orientation.angle) === 90 ? "landscape" : "portrait";
	if (window.orientation) return Math.abs(Number(window.orientation)) === 90 ? "landscape" : "portrait";
	return "portrait";
}
function useOrientation(views, customOrientation) {
	const [orientation, setOrientation] = import_react.useState(getOrientation);
	useEnhancedEffect(() => {
		const eventHandler = () => {
			setOrientation(getOrientation());
		};
		window.addEventListener("orientationchange", eventHandler);
		return () => {
			window.removeEventListener("orientationchange", eventHandler);
		};
	}, []);
	if (arrayIncludes(views, [
		"hours",
		"minutes",
		"seconds"
	])) return "portrait";
	return customOrientation ?? orientation;
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/hooks/useValueAndOpenStates.js
function useValueAndOpenStates(parameters) {
	const { props, valueManager, validator } = parameters;
	const { value: valueProp, defaultValue: defaultValueProp, onChange, referenceDate, timezone: timezoneProp, onAccept, closeOnSelect, open: openProp, onOpen, onClose } = props;
	const { current: defaultValue } = import_react.useRef(defaultValueProp);
	const { current: isValueControlled } = import_react.useRef(valueProp !== void 0);
	const { current: isOpenControlled } = import_react.useRef(openProp !== void 0);
	const adapter = usePickerAdapter();
	if (props.renderInput != null) warnOnce([
		"MUI X: The `renderInput` prop has been removed in version 6.0 of the Date and Time Pickers.",
		"You can replace it with the `textField` component slot in most cases.",
		"For more information, please have a look at the migration guide (https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5)."
	]);
	import_react.useEffect(() => {
		if (isValueControlled !== (valueProp !== void 0)) console.error([
			`MUI X: A component is changing the ${isValueControlled ? "" : "un"}controlled value of a Picker to be ${isValueControlled ? "un" : ""}controlled.`,
			"Elements should not switch from uncontrolled to controlled (or vice versa).",
			"Decide between using a controlled or uncontrolled valuefor the lifetime of the component.",
			"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
			"More info: https://fb.me/react-controlled-components"
		].join("\n"));
	}, [valueProp]);
	import_react.useEffect(() => {
		if (!isValueControlled && defaultValue !== defaultValueProp) console.error(["MUI X: A component is changing the defaultValue of an uncontrolled Picker after being initialized. To suppress this warning opt to use a controlled value."].join("\n"));
	}, [JSON.stringify(defaultValue)]);
	const { timezone, value, handleValueChange } = useControlledValue({
		name: "a picker component",
		timezone: timezoneProp,
		value: valueProp,
		defaultValue,
		referenceDate,
		onChange,
		valueManager
	});
	const [state, setState] = import_react.useState(() => ({
		open: false,
		lastExternalValue: value,
		clockShallowValue: void 0,
		lastCommittedValue: value,
		hasBeenModifiedSinceMount: false
	}));
	const { getValidationErrorForNewValue } = useValidation({
		props,
		validator,
		timezone,
		value,
		onError: props.onError
	});
	const setOpen = useEventCallback((action) => {
		const newOpen = typeof action === "function" ? action(state.open) : action;
		if (!isOpenControlled) setState((prevState) => _extends({}, prevState, { open: newOpen }));
		if (newOpen && onOpen) onOpen();
		if (!newOpen) onClose?.();
	});
	const setValue = useEventCallback((newValue, options) => {
		const { changeImportance = "accept", skipPublicationIfPristine = false, validationError, shortcut, source, shouldClose = changeImportance === "accept" } = options ?? {};
		let shouldFireOnChange;
		let shouldFireOnAccept;
		if (!skipPublicationIfPristine && !isValueControlled && !state.hasBeenModifiedSinceMount) {
			shouldFireOnChange = true;
			shouldFireOnAccept = changeImportance === "accept";
		} else {
			shouldFireOnChange = !valueManager.areValuesEqual(adapter, newValue, value);
			shouldFireOnAccept = changeImportance === "accept" && !valueManager.areValuesEqual(adapter, newValue, state.lastCommittedValue);
		}
		setState((prevState) => _extends({}, prevState, {
			clockShallowValue: shouldFireOnChange ? void 0 : prevState.clockShallowValue,
			lastCommittedValue: shouldFireOnAccept ? newValue : prevState.lastCommittedValue,
			hasBeenModifiedSinceMount: true
		}));
		let cachedContext = null;
		const getContext = () => {
			if (!cachedContext) {
				let inferredSource;
				if (source) inferredSource = source;
				else if (shortcut) inferredSource = "view";
				else inferredSource = "unknown";
				cachedContext = {
					validationError: validationError == null ? getValidationErrorForNewValue(newValue) : validationError,
					source: inferredSource
				};
				if (shortcut) cachedContext.shortcut = shortcut;
			}
			return cachedContext;
		};
		if (shouldFireOnChange) handleValueChange(newValue, getContext());
		if (shouldFireOnAccept && onAccept) onAccept(newValue, getContext());
		if (shouldClose) setOpen(false);
	});
	if (value !== state.lastExternalValue) setState((prevState) => _extends({}, prevState, {
		lastExternalValue: value,
		clockShallowValue: void 0,
		hasBeenModifiedSinceMount: true
	}));
	const setValueFromView = useEventCallback((newValue, selectionState = "partial") => {
		if (selectionState === "shallow") {
			setState((prev) => _extends({}, prev, {
				clockShallowValue: newValue,
				hasBeenModifiedSinceMount: true
			}));
			return;
		}
		setValue(newValue, {
			changeImportance: selectionState === "finish" && closeOnSelect ? "accept" : "set",
			source: "view"
		});
	});
	import_react.useEffect(() => {
		if (isOpenControlled) {
			if (openProp === void 0) throw new Error("You must not mix controlling and uncontrolled mode for `open` prop");
			setState((prevState) => _extends({}, prevState, { open: openProp }));
		}
	}, [isOpenControlled, openProp]);
	return {
		timezone,
		state,
		setValue,
		setValueFromView,
		setOpen,
		value,
		viewValue: import_react.useMemo(() => valueManager.cleanValue(adapter, state.clockShallowValue === void 0 ? value : state.clockShallowValue), [
			adapter,
			valueManager,
			state.clockShallowValue,
			value
		])
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/usePicker/usePicker.js
var _excluded$15 = ["className", "sx"];
var usePicker = ({ ref, props, valueManager, valueType, variant, validator, onPopperExited, autoFocusView, rendererInterceptor: RendererInterceptor, localeText, viewContainerRole, getStepNavigation }) => {
	const { views, view: viewProp, openTo, onViewChange, viewRenderers, reduceAnimations: reduceAnimationsProp, orientation: orientationProp, disableOpenPicker, closeOnSelect, disabled, readOnly, formatDensity, enableAccessibleFieldDOMStructure, selectedSections, onSelectedSectionsChange, format, label, autoFocus, name } = props;
	const { className, sx } = props, propsToForwardToView = _objectWithoutPropertiesLoose(props, _excluded$15);
	/**
	* TODO: Improve how we generate the aria-label and aria-labelledby attributes.
	*/
	const labelId = useId();
	const adapter = usePickerAdapter();
	const reduceAnimations = useReduceAnimations(reduceAnimationsProp);
	const orientation = useOrientation(views, orientationProp);
	const { current: initialView } = import_react.useRef(openTo ?? null);
	/**
	* Refs
	*/
	const [triggerElement, triggerRef] = import_react.useState(null);
	const popupRef = import_react.useRef(null);
	const fieldRef = import_react.useRef(null);
	const rootRefObject = import_react.useRef(null);
	const rootRef = useForkRef(ref, rootRefObject);
	const { timezone, state, setOpen, setValue, setValueFromView, value, viewValue } = useValueAndOpenStates({
		props,
		valueManager,
		validator
	});
	const { view, setView, defaultView, focusedView, setFocusedView, setValueAndGoToNextView, goToNextStep, hasNextStep, hasSeveralSteps } = useViews({
		view: viewProp,
		views,
		openTo,
		onChange: setValueFromView,
		onViewChange,
		autoFocus: autoFocusView,
		getStepNavigation
	});
	const clearValue = useEventCallback(() => setValue(valueManager.emptyValue, { source: "view" }));
	const setValueToToday = useEventCallback(() => setValue(valueManager.getTodayValue(adapter, timezone, valueType), { source: "view" }));
	const acceptValueChanges = useEventCallback(() => setValue(value, { source: "view" }));
	const cancelValueChanges = useEventCallback(() => setValue(state.lastCommittedValue, {
		skipPublicationIfPristine: true,
		source: "view"
	}));
	const dismissViews = useEventCallback(() => {
		setValue(value, {
			skipPublicationIfPristine: true,
			source: "view"
		});
	});
	const { hasUIView, viewModeLookup, timeViewsCount } = import_react.useMemo(() => views.reduce((acc, viewForReduce) => {
		const viewMode = viewRenderers[viewForReduce] == null ? "field" : "UI";
		acc.viewModeLookup[viewForReduce] = viewMode;
		if (viewMode === "UI") {
			acc.hasUIView = true;
			if (isTimeView(viewForReduce)) acc.timeViewsCount += 1;
		}
		return acc;
	}, {
		hasUIView: false,
		viewModeLookup: {},
		timeViewsCount: 0
	}), [viewRenderers, views]);
	const currentViewMode = viewModeLookup[view];
	const getCurrentViewMode = useEventCallback(() => currentViewMode);
	const [popperView, setPopperView] = import_react.useState(currentViewMode === "UI" ? view : null);
	if (popperView !== view && viewModeLookup[view] === "UI") setPopperView(view);
	useEnhancedEffect(() => {
		if (currentViewMode === "field" && state.open) {
			setOpen(false);
			setTimeout(() => {
				fieldRef?.current?.setSelectedSections(view);
				fieldRef?.current?.focusField(view);
			});
		}
	}, [view]);
	useEnhancedEffect(() => {
		if (!state.open) return;
		let newView = view;
		if (currentViewMode === "field" && popperView != null) newView = popperView;
		if (newView !== defaultView && viewModeLookup[newView] === "UI" && viewModeLookup[defaultView] === "UI") newView = defaultView;
		if (newView !== view) setView(newView);
		setFocusedView(newView, true);
	}, [state.open]);
	const ownerState = import_react.useMemo(() => ({
		isPickerValueEmpty: valueManager.areValuesEqual(adapter, value, valueManager.emptyValue),
		isPickerOpen: state.open,
		isPickerDisabled: props.disabled ?? false,
		isPickerReadOnly: props.readOnly ?? false,
		pickerOrientation: orientation,
		pickerVariant: variant
	}), [
		adapter,
		valueManager,
		value,
		state.open,
		orientation,
		variant,
		props.disabled,
		props.readOnly
	]);
	const triggerStatus = import_react.useMemo(() => {
		if (disableOpenPicker || !hasUIView) return "hidden";
		if (disabled || readOnly) return "disabled";
		return "enabled";
	}, [
		disableOpenPicker,
		hasUIView,
		disabled,
		readOnly
	]);
	const wrappedGoToNextStep = useEventCallback(goToNextStep);
	const defaultActionBarActions = import_react.useMemo(() => {
		if (closeOnSelect && !hasSeveralSteps) return [];
		return ["cancel", "nextOrAccept"];
	}, [closeOnSelect, hasSeveralSteps]);
	const actionsContextValue = import_react.useMemo(() => ({
		setValue,
		setOpen,
		clearValue,
		setValueToToday,
		acceptValueChanges,
		cancelValueChanges,
		setView,
		goToNextStep: wrappedGoToNextStep
	}), [
		setValue,
		setOpen,
		clearValue,
		setValueToToday,
		acceptValueChanges,
		cancelValueChanges,
		setView,
		wrappedGoToNextStep
	]);
	const contextValue = import_react.useMemo(() => _extends({}, actionsContextValue, {
		value,
		timezone,
		open: state.open,
		views,
		view: popperView,
		initialView,
		disabled: disabled ?? false,
		readOnly: readOnly ?? false,
		autoFocus: autoFocus ?? false,
		variant,
		orientation,
		popupRef,
		reduceAnimations,
		triggerRef,
		triggerStatus,
		hasNextStep,
		fieldFormat: format ?? "",
		name,
		label,
		rootSx: sx,
		rootRef,
		rootClassName: className
	}), [
		actionsContextValue,
		value,
		rootRef,
		variant,
		orientation,
		reduceAnimations,
		disabled,
		readOnly,
		format,
		className,
		name,
		label,
		sx,
		triggerStatus,
		hasNextStep,
		timezone,
		state.open,
		popperView,
		views,
		initialView,
		autoFocus
	]);
	const privateContextValue = import_react.useMemo(() => ({
		dismissViews,
		ownerState,
		hasUIView,
		getCurrentViewMode,
		rootRefObject,
		labelId,
		triggerElement,
		viewContainerRole,
		defaultActionBarActions,
		onPopperExited
	}), [
		dismissViews,
		ownerState,
		hasUIView,
		getCurrentViewMode,
		labelId,
		triggerElement,
		viewContainerRole,
		defaultActionBarActions,
		onPopperExited
	]);
	const fieldPrivateContextValue = import_react.useMemo(() => ({
		formatDensity,
		enableAccessibleFieldDOMStructure,
		selectedSections,
		onSelectedSectionsChange,
		fieldRef
	}), [
		formatDensity,
		enableAccessibleFieldDOMStructure,
		selectedSections,
		onSelectedSectionsChange,
		fieldRef
	]);
	const isValidContextValue = (testedValue) => {
		const error = validator({
			adapter,
			value: testedValue,
			timezone,
			props
		});
		return !valueManager.hasError(error);
	};
	const renderCurrentView = () => {
		if (popperView == null) return null;
		const renderer = viewRenderers[popperView];
		if (renderer == null) return null;
		const rendererProps = _extends({}, propsToForwardToView, {
			views,
			timezone,
			value: viewValue,
			onChange: setValueAndGoToNextView,
			view: popperView,
			onViewChange: setView,
			showViewSwitcher: timeViewsCount > 1,
			timeViewsCount
		}, viewContainerRole === "tooltip" ? {
			focusedView: null,
			onFocusedViewChange: () => {}
		} : {
			focusedView,
			onFocusedViewChange: setFocusedView
		});
		if (RendererInterceptor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RendererInterceptor, {
			viewRenderers,
			popperView,
			rendererProps
		});
		return renderer(rendererProps);
	};
	return {
		providerProps: {
			localeText,
			contextValue,
			privateContextValue,
			actionsContextValue,
			fieldPrivateContextValue,
			isValidContextValue
		},
		renderCurrentView,
		ownerState
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersLayout/pickersLayoutClasses.js
function getPickersLayoutUtilityClass(slot) {
	return generateUtilityClass("MuiPickersLayout", slot);
}
var pickersLayoutClasses = generateUtilityClasses("MuiPickersLayout", [
	"root",
	"landscape",
	"contentWrapper",
	"toolbar",
	"actionBar",
	"tabs",
	"shortcuts"
]);
//#endregion
//#region node_modules/@mui/material/esm/Button/buttonClasses.js
function getButtonUtilityClass(slot) {
	return generateUtilityClass("MuiButton", slot);
}
var buttonClasses = generateUtilityClasses("MuiButton", [
	"root",
	"text",
	"textInherit",
	"textPrimary",
	"textSecondary",
	"textSuccess",
	"textError",
	"textInfo",
	"textWarning",
	"outlined",
	"outlinedInherit",
	"outlinedPrimary",
	"outlinedSecondary",
	"outlinedSuccess",
	"outlinedError",
	"outlinedInfo",
	"outlinedWarning",
	"contained",
	"containedInherit",
	"containedPrimary",
	"containedSecondary",
	"containedSuccess",
	"containedError",
	"containedInfo",
	"containedWarning",
	"disableElevation",
	"focusVisible",
	"disabled",
	"colorInherit",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorError",
	"colorInfo",
	"colorWarning",
	"textSizeSmall",
	"textSizeMedium",
	"textSizeLarge",
	"outlinedSizeSmall",
	"outlinedSizeMedium",
	"outlinedSizeLarge",
	"containedSizeSmall",
	"containedSizeMedium",
	"containedSizeLarge",
	"sizeMedium",
	"sizeSmall",
	"sizeLarge",
	"fullWidth",
	"startIcon",
	"endIcon",
	"icon",
	"iconSizeSmall",
	"iconSizeMedium",
	"iconSizeLarge",
	"loading",
	"loadingWrapper",
	"loadingIconPlaceholder",
	"loadingIndicator",
	"loadingPositionCenter",
	"loadingPositionStart",
	"loadingPositionEnd"
]);
//#endregion
//#region node_modules/@mui/material/esm/ButtonGroup/ButtonGroupContext.js
/**
* @ignore - internal component.
*/
var ButtonGroupContext = /* @__PURE__ */ import_react.createContext({});
ButtonGroupContext.displayName = "ButtonGroupContext";
//#endregion
//#region node_modules/@mui/material/esm/ButtonGroup/ButtonGroupButtonContext.js
/**
* @ignore - internal component.
*/
var ButtonGroupButtonContext = /* @__PURE__ */ import_react.createContext(void 0);
ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
//#endregion
//#region node_modules/@mui/material/esm/Button/Button.js
var useUtilityClasses$16 = (ownerState) => {
	const { color, disableElevation, fullWidth, size, variant, loading, loadingPosition, classes } = ownerState;
	const composedClasses = composeClasses({
		root: [
			"root",
			loading && "loading",
			variant,
			`${variant}${capitalize_default(color)}`,
			`size${capitalize_default(size)}`,
			`${variant}Size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			disableElevation && "disableElevation",
			fullWidth && "fullWidth",
			loading && `loadingPosition${capitalize_default(loadingPosition)}`
		],
		startIcon: [
			"icon",
			"startIcon",
			`iconSize${capitalize_default(size)}`
		],
		endIcon: [
			"icon",
			"endIcon",
			`iconSize${capitalize_default(size)}`
		],
		loadingIndicator: ["loadingIndicator"],
		loadingWrapper: ["loadingWrapper"]
	}, getButtonUtilityClass, classes);
	return {
		...classes,
		...composedClasses
	};
};
var commonIconStyles = [
	{
		props: { size: "small" },
		style: { "& > *:nth-of-type(1)": { fontSize: 18 } }
	},
	{
		props: { size: "medium" },
		style: { "& > *:nth-of-type(1)": { fontSize: 20 } }
	},
	{
		props: { size: "large" },
		style: { "& > *:nth-of-type(1)": { fontSize: 22 } }
	}
];
var ButtonRoot = styled(ButtonBase, {
	shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
	name: "MuiButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			styles[ownerState.variant],
			styles[`${ownerState.variant}${capitalize_default(ownerState.color)}`],
			styles[`size${capitalize_default(ownerState.size)}`],
			styles[`${ownerState.variant}Size${capitalize_default(ownerState.size)}`],
			ownerState.color === "inherit" && styles.colorInherit,
			ownerState.disableElevation && styles.disableElevation,
			ownerState.fullWidth && styles.fullWidth,
			ownerState.loading && styles.loading
		];
	}
})(memoTheme(({ theme }) => {
	const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
	const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
	return {
		...theme.typography.button,
		minWidth: 64,
		padding: "6px 16px",
		border: 0,
		borderRadius: (theme.vars || theme).shape.borderRadius,
		transition: theme.transitions.create([
			"background-color",
			"box-shadow",
			"border-color",
			"color"
		], { duration: theme.transitions.duration.short }),
		"&:hover": { textDecoration: "none" },
		[`&.${buttonClasses.disabled}`]: { color: (theme.vars || theme).palette.action.disabled },
		variants: [
			{
				props: { variant: "contained" },
				style: {
					color: `var(--variant-containedColor)`,
					backgroundColor: `var(--variant-containedBg)`,
					boxShadow: (theme.vars || theme).shadows[2],
					"&:hover": {
						boxShadow: (theme.vars || theme).shadows[4],
						"@media (hover: none)": { boxShadow: (theme.vars || theme).shadows[2] }
					},
					"&:active": { boxShadow: (theme.vars || theme).shadows[8] },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: (theme.vars || theme).shadows[6] },
					[`&.${buttonClasses.disabled}`]: {
						color: (theme.vars || theme).palette.action.disabled,
						boxShadow: (theme.vars || theme).shadows[0],
						backgroundColor: (theme.vars || theme).palette.action.disabledBackground
					}
				}
			},
			{
				props: { variant: "outlined" },
				style: {
					padding: "5px 15px",
					border: "1px solid currentColor",
					borderColor: `var(--variant-outlinedBorder, currentColor)`,
					backgroundColor: `var(--variant-outlinedBg)`,
					color: `var(--variant-outlinedColor)`,
					[`&.${buttonClasses.disabled}`]: { border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}` }
				}
			},
			{
				props: { variant: "text" },
				style: {
					padding: "6px 8px",
					color: `var(--variant-textColor)`,
					backgroundColor: `var(--variant-textBg)`
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: { color },
				style: {
					"--variant-textColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedColor": (theme.vars || theme).palette[color].main,
					"--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color].main, .5),
					"--variant-containedColor": (theme.vars || theme).palette[color].contrastText,
					"--variant-containedBg": (theme.vars || theme).palette[color].main,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": (theme.vars || theme).palette[color].dark,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBorder": (theme.vars || theme).palette[color].main,
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			})),
			{
				props: { color: "inherit" },
				style: {
					color: "inherit",
					borderColor: "currentColor",
					"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
					"@media (hover: hover)": { "&:hover": {
						"--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
						"--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
						"--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
					} }
				}
			},
			{
				props: {
					size: "small",
					variant: "text"
				},
				style: {
					padding: "4px 5px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "text"
				},
				style: {
					padding: "8px 11px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "outlined"
				},
				style: {
					padding: "3px 9px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "outlined"
				},
				style: {
					padding: "7px 21px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: {
					size: "small",
					variant: "contained"
				},
				style: {
					padding: "4px 10px",
					fontSize: theme.typography.pxToRem(13)
				}
			},
			{
				props: {
					size: "large",
					variant: "contained"
				},
				style: {
					padding: "8px 22px",
					fontSize: theme.typography.pxToRem(15)
				}
			},
			{
				props: { disableElevation: true },
				style: {
					boxShadow: "none",
					"&:hover": { boxShadow: "none" },
					[`&.${buttonClasses.focusVisible}`]: { boxShadow: "none" },
					"&:active": { boxShadow: "none" },
					[`&.${buttonClasses.disabled}`]: { boxShadow: "none" }
				}
			},
			{
				props: { fullWidth: true },
				style: { width: "100%" }
			},
			{
				props: { loadingPosition: "center" },
				style: {
					transition: theme.transitions.create([
						"background-color",
						"box-shadow",
						"border-color"
					], { duration: theme.transitions.duration.short }),
					[`&.${buttonClasses.loading}`]: { color: "transparent" }
				}
			}
		]
	};
}));
var ButtonStartIcon = styled("span", {
	name: "MuiButton",
	slot: "StartIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.startIcon,
			ownerState.loading && styles.startIconLoadingStart,
			styles[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: 8,
	marginLeft: -4,
	variants: [
		{
			props: { size: "small" },
			style: { marginLeft: -2 }
		},
		{
			props: {
				loadingPosition: "start",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "start",
				loading: true,
				fullWidth: true
			},
			style: { marginRight: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonEndIcon = styled("span", {
	name: "MuiButton",
	slot: "EndIcon",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.endIcon,
			ownerState.loading && styles.endIconLoadingEnd,
			styles[`iconSize${capitalize_default(ownerState.size)}`]
		];
	}
})(({ theme }) => ({
	display: "inherit",
	marginRight: -4,
	marginLeft: 8,
	variants: [
		{
			props: { size: "small" },
			style: { marginRight: -2 }
		},
		{
			props: {
				loadingPosition: "end",
				loading: true
			},
			style: {
				transition: theme.transitions.create(["opacity"], { duration: theme.transitions.duration.short }),
				opacity: 0
			}
		},
		{
			props: {
				loadingPosition: "end",
				loading: true,
				fullWidth: true
			},
			style: { marginLeft: -8 }
		},
		...commonIconStyles
	]
}));
var ButtonLoadingIndicator = styled("span", {
	name: "MuiButton",
	slot: "LoadingIndicator"
})(({ theme }) => ({
	display: "none",
	position: "absolute",
	visibility: "visible",
	variants: [
		{
			props: { loading: true },
			style: { display: "flex" }
		},
		{
			props: { loadingPosition: "start" },
			style: { left: 14 }
		},
		{
			props: {
				loadingPosition: "start",
				size: "small"
			},
			style: { left: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "start"
			},
			style: { left: 6 }
		},
		{
			props: { loadingPosition: "center" },
			style: {
				left: "50%",
				transform: "translate(-50%)",
				color: (theme.vars || theme).palette.action.disabled
			}
		},
		{
			props: { loadingPosition: "end" },
			style: { right: 14 }
		},
		{
			props: {
				loadingPosition: "end",
				size: "small"
			},
			style: { right: 10 }
		},
		{
			props: {
				variant: "text",
				loadingPosition: "end"
			},
			style: { right: 6 }
		},
		{
			props: {
				loadingPosition: "start",
				fullWidth: true
			},
			style: {
				position: "relative",
				left: -10
			}
		},
		{
			props: {
				loadingPosition: "end",
				fullWidth: true
			},
			style: {
				position: "relative",
				right: -10
			}
		}
	]
}));
var ButtonLoadingIconPlaceholder = styled("span", {
	name: "MuiButton",
	slot: "LoadingIconPlaceholder"
})({
	display: "inline-block",
	width: "1em",
	height: "1em"
});
var Button = /* @__PURE__ */ import_react.forwardRef(function Button(inProps, ref) {
	const contextProps = import_react.useContext(ButtonGroupContext);
	const buttonGroupButtonContextPositionClassName = import_react.useContext(ButtonGroupButtonContext);
	const props = useDefaultProps({
		props: resolveProps(contextProps, inProps),
		name: "MuiButton"
	});
	const { children, color = "primary", component = "button", className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, id: idProp, loading = null, loadingIndicator: loadingIndicatorProp, loadingPosition = "center", size = "medium", startIcon: startIconProp, type, variant = "text", ...other } = props;
	const loadingId = useId_default(idProp);
	const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
		"aria-labelledby": loadingId,
		color: "inherit",
		size: 16
	});
	const ownerState = {
		...props,
		color,
		component,
		disabled,
		disableElevation,
		disableFocusRipple,
		fullWidth,
		loading,
		loadingIndicator,
		loadingPosition,
		size,
		type,
		variant
	};
	const classes = useUtilityClasses$16(ownerState);
	const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonStartIcon, {
		className: classes.startIcon,
		ownerState,
		children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonEndIcon, {
		className: classes.endIcon,
		ownerState,
		children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIconPlaceholder, {
			className: classes.loadingIconPlaceholder,
			ownerState
		})
	});
	const positionClassName = buttonGroupButtonContextPositionClassName || "";
	const loader = typeof loading === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: classes.loadingWrapper,
		style: { display: "contents" },
		children: loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLoadingIndicator, {
			className: classes.loadingIndicator,
			ownerState,
			children: loadingIndicator
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonRoot, {
		ownerState,
		className: clsx(contextProps.className, classes.root, className, positionClassName),
		component,
		disabled: disabled || loading,
		focusRipple: !disableFocusRipple,
		focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
		ref,
		type,
		id: loading ? loadingId : idProp,
		...other,
		classes,
		children: [
			startIcon,
			loadingPosition !== "end" && loader,
			children,
			loadingPosition === "end" && loader,
			endIcon
		]
	});
});
Button.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary",
		"success",
		"error",
		"info",
		"warning"
	]), import_prop_types.default.string]),
	component: import_prop_types.default.elementType,
	disabled: import_prop_types.default.bool,
	disableElevation: import_prop_types.default.bool,
	disableFocusRipple: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	endIcon: import_prop_types.default.node,
	focusVisibleClassName: import_prop_types.default.string,
	fullWidth: import_prop_types.default.bool,
	href: import_prop_types.default.string,
	id: import_prop_types.default.string,
	loading: import_prop_types.default.bool,
	loadingIndicator: import_prop_types.default.node,
	loadingPosition: import_prop_types.default.oneOf([
		"center",
		"end",
		"start"
	]),
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"small",
		"medium",
		"large"
	]), import_prop_types.default.string]),
	startIcon: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	type: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"button",
		"reset",
		"submit"
	]), import_prop_types.default.string]),
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"contained",
		"outlined",
		"text"
	]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/material/esm/DialogActions/dialogActionsClasses.js
function getDialogActionsUtilityClass(slot) {
	return generateUtilityClass("MuiDialogActions", slot);
}
generateUtilityClasses("MuiDialogActions", ["root", "spacing"]);
//#endregion
//#region node_modules/@mui/material/esm/DialogActions/DialogActions.js
var useUtilityClasses$15 = (ownerState) => {
	const { classes, disableSpacing } = ownerState;
	return composeClasses({ root: ["root", !disableSpacing && "spacing"] }, getDialogActionsUtilityClass, classes);
};
var DialogActionsRoot = styled("div", {
	name: "MuiDialogActions",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, !ownerState.disableSpacing && styles.spacing];
	}
})({
	display: "flex",
	alignItems: "center",
	padding: 8,
	justifyContent: "flex-end",
	flex: "0 0 auto",
	variants: [{
		props: ({ ownerState }) => !ownerState.disableSpacing,
		style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } }
	}]
});
var DialogActions = /* @__PURE__ */ import_react.forwardRef(function DialogActions(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogActions"
	});
	const { className, disableSpacing = false, ...other } = props;
	const ownerState = {
		...props,
		disableSpacing
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogActionsRoot, {
		className: clsx(useUtilityClasses$15(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
DialogActions.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	disableSpacing: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersActionBar/PickersActionBar.js
var _excluded$14 = ["actions"];
var PickersActionBarRoot = styled(DialogActions, {
	name: "MuiPickersLayout",
	slot: "ActionBar"
})({});
/**
* Demos:
*
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
* - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
*
* API:
*
* - [PickersActionBar API](https://mui.com/x/api/date-pickers/pickers-action-bar/)
*/
function PickersActionBarComponent(props) {
	const { actions } = props, other = _objectWithoutPropertiesLoose(props, _excluded$14);
	const translations = usePickerTranslations();
	const { clearValue, setValueToToday, acceptValueChanges, cancelValueChanges, goToNextStep, hasNextStep } = usePickerContext();
	if (actions == null || actions.length === 0) return null;
	const buttons = actions?.map((actionType) => {
		switch (actionType) {
			case "clear": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: clearValue,
				children: translations.clearButtonLabel
			}, actionType);
			case "cancel": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: cancelValueChanges,
				children: translations.cancelButtonLabel
			}, actionType);
			case "accept": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: acceptValueChanges,
				children: translations.okButtonLabel
			}, actionType);
			case "today": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: setValueToToday,
				children: translations.todayButtonLabel
			}, actionType);
			case "next": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: goToNextStep,
				children: translations.nextStepButtonLabel
			}, actionType);
			case "nextOrAccept":
				if (hasNextStep) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: goToNextStep,
					children: translations.nextStepButtonLabel
				}, actionType);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: acceptValueChanges,
					children: translations.okButtonLabel
				}, actionType);
			default: return null;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersActionBarRoot, _extends({}, other, { children: buttons }));
}
PickersActionBarComponent.propTypes = {
	actions: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"accept",
		"cancel",
		"clear",
		"next",
		"nextOrAccept",
		"today"
	]).isRequired),
	disableSpacing: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
var PickersActionBar = /* @__PURE__ */ import_react.memo(PickersActionBarComponent);
PickersActionBar.displayName = "PickersActionBar";
//#endregion
//#region node_modules/@mui/material/esm/ListItem/listItemClasses.js
function getListItemUtilityClass(slot) {
	return generateUtilityClass("MuiListItem", slot);
}
generateUtilityClasses("MuiListItem", [
	"root",
	"container",
	"dense",
	"alignItemsFlexStart",
	"divider",
	"gutters",
	"padding",
	"secondaryAction"
]);
//#endregion
//#region node_modules/@mui/material/esm/ListItemButton/listItemButtonClasses.js
var listItemButtonClasses = generateUtilityClasses("MuiListItemButton", [
	"root",
	"focusVisible",
	"dense",
	"alignItemsFlexStart",
	"disabled",
	"divider",
	"gutters",
	"selected"
]);
//#endregion
//#region node_modules/@mui/material/esm/ListItemSecondaryAction/listItemSecondaryActionClasses.js
function getListItemSecondaryActionClassesUtilityClass(slot) {
	return generateUtilityClass("MuiListItemSecondaryAction", slot);
}
generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);
//#endregion
//#region node_modules/@mui/material/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
var useUtilityClasses$14 = (ownerState) => {
	const { disableGutters, classes } = ownerState;
	return composeClasses({ root: ["root", disableGutters && "disableGutters"] }, getListItemSecondaryActionClassesUtilityClass, classes);
};
var ListItemSecondaryActionRoot = styled("div", {
	name: "MuiListItemSecondaryAction",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.disableGutters && styles.disableGutters];
	}
})({
	position: "absolute",
	right: 16,
	top: "50%",
	transform: "translateY(-50%)",
	variants: [{
		props: ({ ownerState }) => ownerState.disableGutters,
		style: { right: 0 }
	}]
});
/**
* Must be used as the last child of ListItem to function properly.
*
* @deprecated Use the `secondaryAction` prop in the `ListItem` component instead. This component will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
*/
var ListItemSecondaryAction = /* @__PURE__ */ import_react.forwardRef(function ListItemSecondaryAction(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItemSecondaryAction"
	});
	const { className, ...other } = props;
	const context = import_react.useContext(ListContext);
	const ownerState = {
		...props,
		disableGutters: context.disableGutters
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemSecondaryActionRoot, {
		className: clsx(useUtilityClasses$14(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
ListItemSecondaryAction.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
//#endregion
//#region node_modules/@mui/material/esm/ListItem/ListItem.js
var overridesResolver = (props, styles) => {
	const { ownerState } = props;
	return [
		styles.root,
		ownerState.dense && styles.dense,
		ownerState.alignItems === "flex-start" && styles.alignItemsFlexStart,
		ownerState.divider && styles.divider,
		!ownerState.disableGutters && styles.gutters,
		!ownerState.disablePadding && styles.padding,
		ownerState.hasSecondaryAction && styles.secondaryAction
	];
};
var useUtilityClasses$13 = (ownerState) => {
	const { alignItems, classes, dense, disableGutters, disablePadding, divider, hasSecondaryAction } = ownerState;
	return composeClasses({
		root: [
			"root",
			dense && "dense",
			!disableGutters && "gutters",
			!disablePadding && "padding",
			divider && "divider",
			alignItems === "flex-start" && "alignItemsFlexStart",
			hasSecondaryAction && "secondaryAction"
		],
		container: ["container"],
		secondaryAction: ["secondaryAction"]
	}, getListItemUtilityClass, classes);
};
var ListItemRoot = styled("div", {
	name: "MuiListItem",
	slot: "Root",
	overridesResolver
})(memoTheme(({ theme }) => ({
	display: "flex",
	justifyContent: "flex-start",
	alignItems: "center",
	position: "relative",
	textDecoration: "none",
	width: "100%",
	boxSizing: "border-box",
	textAlign: "left",
	variants: [
		{
			props: ({ ownerState }) => !ownerState.disablePadding,
			style: {
				paddingTop: 8,
				paddingBottom: 8
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && ownerState.dense,
			style: {
				paddingTop: 4,
				paddingBottom: 4
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.disableGutters,
			style: {
				paddingLeft: 16,
				paddingRight: 16
			}
		},
		{
			props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
			style: { paddingRight: 48 }
		},
		{
			props: ({ ownerState }) => !!ownerState.secondaryAction,
			style: { [`& > .${listItemButtonClasses.root}`]: { paddingRight: 48 } }
		},
		{
			props: { alignItems: "flex-start" },
			style: { alignItems: "flex-start" }
		},
		{
			props: ({ ownerState }) => ownerState.divider,
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				backgroundClip: "padding-box"
			}
		},
		{
			props: ({ ownerState }) => ownerState.button,
			style: {
				transition: theme.transitions.create("background-color", { duration: theme.transitions.duration.shortest }),
				"&:hover": {
					textDecoration: "none",
					backgroundColor: (theme.vars || theme).palette.action.hover,
					"@media (hover: none)": { backgroundColor: "transparent" }
				}
			}
		},
		{
			props: ({ ownerState }) => ownerState.hasSecondaryAction,
			style: { paddingRight: 48 }
		}
	]
})));
var ListItemContainer = styled("li", {
	name: "MuiListItem",
	slot: "Container"
})({ position: "relative" });
/**
* Uses an additional container component if `ListItemSecondaryAction` is the last child.
*/
var ListItem = /* @__PURE__ */ import_react.forwardRef(function ListItem(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiListItem"
	});
	const { alignItems = "center", children: childrenProp, className, component: componentProp, components = {}, componentsProps = {}, ContainerComponent = "li", ContainerProps: { className: ContainerClassName, ...ContainerProps } = {}, dense = false, disableGutters = false, disablePadding = false, divider = false, secondaryAction, slotProps = {}, slots = {}, ...other } = props;
	const context = import_react.useContext(ListContext);
	const childContext = import_react.useMemo(() => ({
		dense: dense || context.dense || false,
		alignItems,
		disableGutters
	}), [
		alignItems,
		context.dense,
		dense,
		disableGutters
	]);
	const listItemRef = import_react.useRef(null);
	const children = import_react.Children.toArray(childrenProp);
	const hasSecondaryAction = children.length && isMuiElement_default(children[children.length - 1], ["ListItemSecondaryAction"]);
	const ownerState = {
		...props,
		alignItems,
		dense: childContext.dense,
		disableGutters,
		disablePadding,
		divider,
		hasSecondaryAction
	};
	const classes = useUtilityClasses$13(ownerState);
	const handleRef = useForkRef_default(listItemRef, ref);
	const [SecondaryActionSlot, secondaryActionSlotProps] = useSlot("secondaryAction", {
		elementType: ListItemSecondaryAction,
		externalForwardedProps: {
			slots,
			slotProps
		},
		ownerState,
		className: classes.secondaryAction
	});
	const Root = slots.root || components.Root || ListItemRoot;
	const rootProps = slotProps.root || componentsProps.root || {};
	const componentProps = {
		className: clsx(classes.root, rootProps.className, className),
		...other
	};
	let Component = componentProp || "li";
	if (hasSecondaryAction) {
		Component = !componentProps.component && !componentProp ? "div" : Component;
		if (ContainerComponent === "li") {
			if (Component === "li") Component = "div";
			else if (componentProps.component === "li") componentProps.component = "div";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
			value: childContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItemContainer, {
				as: ContainerComponent,
				className: clsx(classes.container, ContainerClassName),
				ref: handleRef,
				ownerState,
				...ContainerProps,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
					...rootProps,
					...!isHostComponent(Root) && {
						as: Component,
						ownerState: {
							...ownerState,
							...rootProps.ownerState
						}
					},
					...componentProps,
					children
				}), children.pop()]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListContext.Provider, {
		value: childContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
			...rootProps,
			as: Component,
			ref: handleRef,
			...!isHostComponent(Root) && { ownerState: {
				...ownerState,
				...rootProps.ownerState
			} },
			...componentProps,
			children: [children, secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryActionSlot, {
				...secondaryActionSlotProps,
				children: secondaryAction
			})]
		})
	});
});
ListItem.propTypes = {
	alignItems: import_prop_types.default.oneOf(["center", "flex-start"]),
	children: chainPropTypes(import_prop_types.default.node, (props) => {
		const children = import_react.Children.toArray(props.children);
		let secondaryActionIndex = -1;
		for (let i = children.length - 1; i >= 0; i -= 1) {
			const child = children[i];
			if (isMuiElement_default(child, ["ListItemSecondaryAction"])) {
				secondaryActionIndex = i;
				break;
			}
		}
		if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) return /* @__PURE__ */ new Error("MUI: You used an element after ListItemSecondaryAction. For ListItem to detect that it has a secondary action you must pass it as the last child to ListItem.");
		return null;
	}),
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	components: import_prop_types.default.shape({ Root: import_prop_types.default.elementType }),
	componentsProps: import_prop_types.default.shape({ root: import_prop_types.default.object }),
	ContainerComponent: elementTypeAcceptingRef_default,
	ContainerProps: import_prop_types.default.object,
	dense: import_prop_types.default.bool,
	disableGutters: import_prop_types.default.bool,
	disablePadding: import_prop_types.default.bool,
	divider: import_prop_types.default.bool,
	secondaryAction: import_prop_types.default.node,
	slotProps: import_prop_types.default.shape({
		root: import_prop_types.default.object,
		secondaryAction: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		root: import_prop_types.default.elementType,
		secondaryAction: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/Cancel.js
/**
* @ignore - internal component.
*/
var Cancel_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }), "Cancel");
//#endregion
//#region node_modules/@mui/material/esm/Chip/chipClasses.js
function getChipUtilityClass(slot) {
	return generateUtilityClass("MuiChip", slot);
}
var chipClasses = generateUtilityClasses("MuiChip", [
	"root",
	"sizeSmall",
	"sizeMedium",
	"colorDefault",
	"colorError",
	"colorInfo",
	"colorPrimary",
	"colorSecondary",
	"colorSuccess",
	"colorWarning",
	"disabled",
	"clickable",
	"clickableColorPrimary",
	"clickableColorSecondary",
	"deletable",
	"deletableColorPrimary",
	"deletableColorSecondary",
	"outlined",
	"filled",
	"outlinedPrimary",
	"outlinedSecondary",
	"filledPrimary",
	"filledSecondary",
	"avatar",
	"avatarSmall",
	"avatarMedium",
	"avatarColorPrimary",
	"avatarColorSecondary",
	"icon",
	"iconSmall",
	"iconMedium",
	"iconColorPrimary",
	"iconColorSecondary",
	"label",
	"labelSmall",
	"labelMedium",
	"deleteIcon",
	"deleteIconSmall",
	"deleteIconMedium",
	"deleteIconColorPrimary",
	"deleteIconColorSecondary",
	"deleteIconOutlinedColorPrimary",
	"deleteIconOutlinedColorSecondary",
	"deleteIconFilledColorPrimary",
	"deleteIconFilledColorSecondary",
	"focusVisible"
]);
//#endregion
//#region node_modules/@mui/material/esm/Chip/Chip.js
var useUtilityClasses$12 = (ownerState) => {
	const { classes, disabled, size, color, iconColor, onDelete, clickable, variant } = ownerState;
	return composeClasses({
		root: [
			"root",
			variant,
			disabled && "disabled",
			`size${capitalize_default(size)}`,
			`color${capitalize_default(color)}`,
			clickable && "clickable",
			clickable && `clickableColor${capitalize_default(color)}`,
			onDelete && "deletable",
			onDelete && `deletableColor${capitalize_default(color)}`,
			`${variant}${capitalize_default(color)}`
		],
		label: ["label", `label${capitalize_default(size)}`],
		avatar: [
			"avatar",
			`avatar${capitalize_default(size)}`,
			`avatarColor${capitalize_default(color)}`
		],
		icon: [
			"icon",
			`icon${capitalize_default(size)}`,
			`iconColor${capitalize_default(iconColor)}`
		],
		deleteIcon: [
			"deleteIcon",
			`deleteIcon${capitalize_default(size)}`,
			`deleteIconColor${capitalize_default(color)}`,
			`deleteIcon${capitalize_default(variant)}Color${capitalize_default(color)}`
		]
	}, getChipUtilityClass, classes);
};
var ChipRoot = styled("div", {
	name: "MuiChip",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		const { color, iconColor, clickable, onDelete, size, variant } = ownerState;
		return [
			{ [`& .${chipClasses.avatar}`]: styles.avatar },
			{ [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize_default(size)}`] },
			{ [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize_default(color)}`] },
			{ [`& .${chipClasses.icon}`]: styles.icon },
			{ [`& .${chipClasses.icon}`]: styles[`icon${capitalize_default(size)}`] },
			{ [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize_default(iconColor)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize_default(size)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize_default(color)}`] },
			{ [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize_default(variant)}Color${capitalize_default(color)}`] },
			styles.root,
			styles[`size${capitalize_default(size)}`],
			styles[`color${capitalize_default(color)}`],
			clickable && styles.clickable,
			clickable && color !== "default" && styles[`clickableColor${capitalize_default(color)}`],
			onDelete && styles.deletable,
			onDelete && color !== "default" && styles[`deletableColor${capitalize_default(color)}`],
			styles[variant],
			styles[`${variant}${capitalize_default(color)}`]
		];
	}
})(memoTheme(({ theme }) => {
	const textColor = theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300];
	return {
		maxWidth: "100%",
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.pxToRem(13),
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		height: 32,
		lineHeight: 1.5,
		color: (theme.vars || theme).palette.text.primary,
		backgroundColor: (theme.vars || theme).palette.action.selected,
		borderRadius: 32 / 2,
		whiteSpace: "nowrap",
		transition: theme.transitions.create(["background-color", "box-shadow"]),
		cursor: "unset",
		outline: 0,
		textDecoration: "none",
		border: 0,
		padding: 0,
		verticalAlign: "middle",
		boxSizing: "border-box",
		[`&.${chipClasses.disabled}`]: {
			opacity: (theme.vars || theme).palette.action.disabledOpacity,
			pointerEvents: "none"
		},
		[`& .${chipClasses.avatar}`]: {
			marginLeft: 5,
			marginRight: -6,
			width: 24,
			height: 24,
			color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
			fontSize: theme.typography.pxToRem(12)
		},
		[`& .${chipClasses.avatarColorPrimary}`]: {
			color: (theme.vars || theme).palette.primary.contrastText,
			backgroundColor: (theme.vars || theme).palette.primary.dark
		},
		[`& .${chipClasses.avatarColorSecondary}`]: {
			color: (theme.vars || theme).palette.secondary.contrastText,
			backgroundColor: (theme.vars || theme).palette.secondary.dark
		},
		[`& .${chipClasses.avatarSmall}`]: {
			marginLeft: 4,
			marginRight: -4,
			width: 18,
			height: 18,
			fontSize: theme.typography.pxToRem(10)
		},
		[`& .${chipClasses.icon}`]: {
			marginLeft: 5,
			marginRight: -6
		},
		[`& .${chipClasses.deleteIcon}`]: {
			WebkitTapHighlightColor: "transparent",
			color: theme.alpha((theme.vars || theme).palette.text.primary, .26),
			fontSize: 22,
			cursor: "pointer",
			margin: "0 5px 0 -6px",
			"&:hover": { color: theme.alpha((theme.vars || theme).palette.text.primary, .4) }
		},
		variants: [
			{
				props: { size: "small" },
				style: {
					height: 24,
					[`& .${chipClasses.icon}`]: {
						fontSize: 18,
						marginLeft: 4,
						marginRight: -4
					},
					[`& .${chipClasses.deleteIcon}`]: {
						fontSize: 16,
						marginRight: 4,
						marginLeft: -4
					}
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => {
				return {
					props: { color },
					style: {
						backgroundColor: (theme.vars || theme).palette[color].main,
						color: (theme.vars || theme).palette[color].contrastText,
						[`& .${chipClasses.deleteIcon}`]: {
							color: theme.alpha((theme.vars || theme).palette[color].contrastText, .7),
							"&:hover, &:active": { color: (theme.vars || theme).palette[color].contrastText }
						}
					}
				};
			}),
			{
				props: (props) => props.iconColor === props.color,
				style: { [`& .${chipClasses.icon}`]: { color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor } }
			},
			{
				props: (props) => props.iconColor === props.color && props.color !== "default",
				style: { [`& .${chipClasses.icon}`]: { color: "inherit" } }
			},
			{
				props: { onDelete: true },
				style: { [`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) } }
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => {
				return {
					props: {
						color,
						onDelete: true
					},
					style: { [`&.${chipClasses.focusVisible}`]: { background: (theme.vars || theme).palette[color].dark } }
				};
			}),
			{
				props: { clickable: true },
				style: {
					userSelect: "none",
					WebkitTapHighlightColor: "transparent",
					cursor: "pointer",
					"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`) },
					"&:active": { boxShadow: (theme.vars || theme).shadows[1] }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
				props: {
					color,
					clickable: true
				},
				style: { [`&:hover, &.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette[color].dark } }
			})),
			{
				props: { variant: "outlined" },
				style: {
					backgroundColor: "transparent",
					border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700]}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: (theme.vars || theme).palette.action.hover },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: (theme.vars || theme).palette.action.focus },
					[`& .${chipClasses.avatar}`]: { marginLeft: 4 },
					[`& .${chipClasses.avatarSmall}`]: { marginLeft: 2 },
					[`& .${chipClasses.icon}`]: { marginLeft: 4 },
					[`& .${chipClasses.iconSmall}`]: { marginLeft: 2 },
					[`& .${chipClasses.deleteIcon}`]: { marginRight: 5 },
					[`& .${chipClasses.deleteIconSmall}`]: { marginRight: 3 }
				}
			},
			...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
				props: {
					variant: "outlined",
					color
				},
				style: {
					color: (theme.vars || theme).palette[color].main,
					border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, .7)}`,
					[`&.${chipClasses.clickable}:hover`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity) },
					[`&.${chipClasses.focusVisible}`]: { backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.focusOpacity) },
					[`& .${chipClasses.deleteIcon}`]: {
						color: theme.alpha((theme.vars || theme).palette[color].main, .7),
						"&:hover, &:active": { color: (theme.vars || theme).palette[color].main }
					}
				}
			}))
		]
	};
}));
var ChipLabel = styled("span", {
	name: "MuiChip",
	slot: "Label",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		const { size } = ownerState;
		return [styles.label, styles[`label${capitalize_default(size)}`]];
	}
})({
	overflow: "hidden",
	textOverflow: "ellipsis",
	paddingLeft: 12,
	paddingRight: 12,
	whiteSpace: "nowrap",
	variants: [
		{
			props: { variant: "outlined" },
			style: {
				paddingLeft: 11,
				paddingRight: 11
			}
		},
		{
			props: { size: "small" },
			style: {
				paddingLeft: 8,
				paddingRight: 8
			}
		},
		{
			props: {
				size: "small",
				variant: "outlined"
			},
			style: {
				paddingLeft: 7,
				paddingRight: 7
			}
		}
	]
});
function isDeleteKeyboardEvent(keyboardEvent) {
	return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
/**
* Chips represent complex entities in small blocks, such as a contact.
*/
var Chip = /* @__PURE__ */ import_react.forwardRef(function Chip(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiChip"
	});
	const { avatar: avatarProp, className, clickable: clickableProp, color = "default", component: ComponentProp, deleteIcon: deleteIconProp, disabled = false, icon: iconProp, label, onClick, onDelete, onKeyDown, onKeyUp, size = "medium", variant = "filled", tabIndex, skipFocusWhenDisabled = false, slots = {}, slotProps = {}, ...other } = props;
	const handleRef = useForkRef_default(import_react.useRef(null), ref);
	const handleDeleteIconClick = (event) => {
		event.stopPropagation();
		onDelete(event);
	};
	const handleKeyDown = (event) => {
		if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) event.preventDefault();
		if (onKeyDown) onKeyDown(event);
	};
	const handleKeyUp = (event) => {
		if (event.currentTarget === event.target) {
			if (onDelete && isDeleteKeyboardEvent(event)) onDelete(event);
		}
		if (onKeyUp) onKeyUp(event);
	};
	const clickable = clickableProp !== false && onClick ? true : clickableProp;
	const component = clickable || onDelete ? ButtonBase : ComponentProp || "div";
	const ownerState = {
		...props,
		component,
		disabled,
		size,
		color,
		iconColor: /* @__PURE__ */ import_react.isValidElement(iconProp) ? iconProp.props.color || color : color,
		onDelete: !!onDelete,
		clickable,
		variant
	};
	const classes = useUtilityClasses$12(ownerState);
	const moreProps = component === ButtonBase ? {
		component: ComponentProp || "div",
		focusVisibleClassName: classes.focusVisible,
		...onDelete && { disableRipple: true }
	} : {};
	let deleteIcon = null;
	if (onDelete) deleteIcon = deleteIconProp && /* @__PURE__ */ import_react.isValidElement(deleteIconProp) ? /* @__PURE__ */ import_react.cloneElement(deleteIconProp, {
		className: clsx(deleteIconProp.props.className, classes.deleteIcon),
		onClick: handleDeleteIconClick
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel_default, {
		className: classes.deleteIcon,
		onClick: handleDeleteIconClick
	});
	let avatar = null;
	if (avatarProp && /* @__PURE__ */ import_react.isValidElement(avatarProp)) avatar = /* @__PURE__ */ import_react.cloneElement(avatarProp, { className: clsx(classes.avatar, avatarProp.props.className) });
	let icon = null;
	if (iconProp && /* @__PURE__ */ import_react.isValidElement(iconProp)) icon = /* @__PURE__ */ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) });
	if (avatar && icon) console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
	const externalForwardedProps = {
		slots,
		slotProps
	};
	const [RootSlot, rootProps] = useSlot("root", {
		elementType: ChipRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other
		},
		ownerState,
		shouldForwardComponentProp: true,
		ref: handleRef,
		className: clsx(classes.root, className),
		additionalProps: {
			disabled: clickable && disabled ? true : void 0,
			tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
			...moreProps
		},
		getSlotProps: (handlers) => ({
			...handlers,
			onClick: (event) => {
				handlers.onClick?.(event);
				onClick?.(event);
			},
			onKeyDown: (event) => {
				handlers.onKeyDown?.(event);
				handleKeyDown(event);
			},
			onKeyUp: (event) => {
				handlers.onKeyUp?.(event);
				handleKeyUp(event);
			}
		})
	});
	const [LabelSlot, labelProps] = useSlot("label", {
		elementType: ChipLabel,
		externalForwardedProps,
		ownerState,
		className: classes.label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		as: component,
		...rootProps,
		children: [
			avatar || icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelSlot, {
				...labelProps,
				children: label
			}),
			deleteIcon
		]
	});
});
Chip.propTypes = {
	avatar: import_prop_types.default.element,
	children: unsupportedProp_default,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	clickable: import_prop_types.default.bool,
	color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"default",
		"primary",
		"secondary",
		"error",
		"info",
		"success",
		"warning"
	]), import_prop_types.default.string]),
	component: import_prop_types.default.elementType,
	deleteIcon: import_prop_types.default.element,
	disabled: import_prop_types.default.bool,
	icon: import_prop_types.default.element,
	label: import_prop_types.default.node,
	onClick: import_prop_types.default.func,
	onDelete: import_prop_types.default.func,
	onKeyDown: import_prop_types.default.func,
	onKeyUp: import_prop_types.default.func,
	size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["medium", "small"]), import_prop_types.default.string]),
	skipFocusWhenDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.shape({
		label: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		label: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	tabIndex: import_prop_types.default.number,
	variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined"]), import_prop_types.default.string])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersShortcuts/PickersShortcuts.js
var _excluded$13 = ["items", "changeImportance"], _excluded2$2 = ["getValue"];
var PickersShortcutsRoot = styled(List$1, {
	name: "MuiPickersLayout",
	slot: "Shortcuts"
})({});
/**
* Demos:
*
* - [Shortcuts](https://mui.com/x/react-date-pickers/shortcuts/)
*
* API:
*
* - [PickersShortcuts API](https://mui.com/x/api/date-pickers/pickers-shortcuts/)
*/
function PickersShortcuts(props) {
	const { items, changeImportance = "accept" } = props, other = _objectWithoutPropertiesLoose(props, _excluded$13);
	const { setValue } = usePickerActionsContext();
	const isValidValue = useIsValidValue();
	if (items == null || items.length === 0) return null;
	const resolvedItems = items.map((_ref) => {
		let { getValue } = _ref, item = _objectWithoutPropertiesLoose(_ref, _excluded2$2);
		const newValue = getValue({ isValid: isValidValue });
		return _extends({}, item, {
			label: item.label,
			onClick: () => {
				setValue(newValue, {
					changeImportance,
					shortcut: item,
					source: "view"
				});
			},
			disabled: !isValidValue(newValue)
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersShortcutsRoot, _extends({
		dense: true,
		sx: [{
			maxHeight: 336,
			maxWidth: 200,
			overflow: "auto"
		}, ...Array.isArray(other.sx) ? other.sx : [other.sx]]
	}, other, { children: resolvedItems.map((item) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, _extends({}, item)) }, item.id ?? item.label);
	}) }));
}
PickersShortcuts.propTypes = {
	changeImportance: import_prop_types.default.oneOf(["accept", "set"]),
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	dense: import_prop_types.default.bool,
	disablePadding: import_prop_types.default.bool,
	items: import_prop_types.default.arrayOf(import_prop_types.default.shape({
		getValue: import_prop_types.default.func.isRequired,
		id: import_prop_types.default.string,
		label: import_prop_types.default.string.isRequired
	})),
	style: import_prop_types.default.object,
	subheader: import_prop_types.default.node,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersLayout/usePickerLayout.js
var _excluded$12 = ["ownerState"];
function toolbarHasView(toolbarProps) {
	return toolbarProps.view !== null;
}
var useUtilityClasses$11 = (classes, ownerState) => {
	const { pickerOrientation } = ownerState;
	return composeClasses({
		root: ["root", pickerOrientation === "landscape" && "landscape"],
		contentWrapper: ["contentWrapper"],
		toolbar: ["toolbar"],
		actionBar: ["actionBar"],
		tabs: ["tabs"],
		landscape: ["landscape"],
		shortcuts: ["shortcuts"]
	}, getPickersLayoutUtilityClass, classes);
};
var usePickerLayout = (props) => {
	const { ownerState: pickerOwnerState, defaultActionBarActions } = usePickerPrivateContext();
	const { view } = usePickerContext();
	const isRtl = useRtl();
	const { children, slots, slotProps, classes: classesProp } = props;
	const ownerState = import_react.useMemo(() => _extends({}, pickerOwnerState, {
		layoutDirection: isRtl ? "rtl" : "ltr",
		hasShortcuts: false
	}), [pickerOwnerState, isRtl]);
	const classes = useUtilityClasses$11(classesProp, ownerState);
	const ActionBar = slots?.actionBar ?? PickersActionBar;
	const actionBar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBar, _extends({}, _objectWithoutPropertiesLoose(useSlotProps({
		elementType: ActionBar,
		externalSlotProps: slotProps?.actionBar,
		additionalProps: { actions: defaultActionBarActions },
		className: classes.actionBar,
		ownerState
	}), _excluded$12)));
	const Toolbar = slots?.toolbar;
	const toolbarProps = useSlotProps({
		elementType: Toolbar,
		externalSlotProps: slotProps?.toolbar,
		className: classes.toolbar,
		ownerState
	});
	const toolbar = toolbarHasView(toolbarProps) && !!Toolbar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, _extends({}, toolbarProps)) : null;
	const content = children;
	const Tabs = slots?.tabs;
	const tabs = view && Tabs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, _extends({ className: classes.tabs }, slotProps?.tabs)) : null;
	const Shortcuts = slots?.shortcuts ?? PickersShortcuts;
	const shortcutsProps = useSlotProps({
		elementType: Shortcuts,
		externalSlotProps: slotProps?.shortcuts,
		className: classes.shortcuts,
		ownerState
	});
	const hasShortcuts = Array.isArray(shortcutsProps?.items) && shortcutsProps.items.length > 0;
	return {
		toolbar,
		content,
		tabs,
		actionBar,
		shortcuts: view && !!Shortcuts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcuts, _extends({}, shortcutsProps)) : null,
		ownerState: _extends({}, ownerState, { hasShortcuts })
	};
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/PickersLayout/PickersLayout.js
var useUtilityClasses$10 = (classes, ownerState) => {
	const { pickerOrientation } = ownerState;
	return composeClasses({
		root: ["root", pickerOrientation === "landscape" && "landscape"],
		contentWrapper: ["contentWrapper"]
	}, getPickersLayoutUtilityClass, classes);
};
var PickersLayoutRoot = styled("div", {
	name: "MuiPickersLayout",
	slot: "Root"
})({
	display: "grid",
	gridAutoColumns: "max-content auto max-content",
	gridAutoRows: "max-content auto max-content",
	[`& .${pickersLayoutClasses.actionBar}`]: {
		gridColumn: "1 / 4",
		gridRow: 3
	},
	variants: [
		{
			props: {
				pickerOrientation: "landscape",
				hasShortcuts: false
			},
			style: { [`& .${pickersLayoutClasses.toolbar}`]: {
				gridColumn: 1,
				gridRow: "1 / 3"
			} }
		},
		{
			props: {
				pickerOrientation: "landscape",
				hasShortcuts: true
			},
			style: {
				[`& .${pickersLayoutClasses.toolbar}`]: {
					gridColumn: "2 / 4",
					gridRow: 1,
					maxWidth: "max-content"
				},
				[`& .${pickersLayoutClasses.shortcuts}`]: {
					gridColumn: 1,
					gridRow: 2
				}
			}
		},
		{
			props: { pickerOrientation: "portrait" },
			style: {
				[`& .${pickersLayoutClasses.toolbar}`]: {
					gridColumn: "2 / 4",
					gridRow: 1
				},
				[`& .${pickersLayoutClasses.shortcuts}`]: {
					gridColumn: 1,
					gridRow: "2 / 3"
				}
			}
		},
		{
			props: {
				hasShortcuts: true,
				layoutDirection: "rtl"
			},
			style: { [`& .${pickersLayoutClasses.shortcuts}`]: { gridColumn: 4 } }
		}
	]
});
var PickersLayoutContentWrapper = styled("div", {
	name: "MuiPickersLayout",
	slot: "ContentWrapper"
})({
	gridColumn: "2 / 4",
	gridRow: 2,
	display: "flex",
	flexDirection: "column"
});
/**
* Demos:
*
* - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
*
* API:
*
* - [PickersLayout API](https://mui.com/x/api/date-pickers/pickers-layout/)
*/
var PickersLayout = /* @__PURE__ */ import_react.forwardRef(function PickersLayout(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersLayout"
	});
	const { toolbar, content, tabs, actionBar, shortcuts, ownerState } = usePickerLayout(props);
	const { orientation, variant } = usePickerContext();
	const { sx, className, classes: classesProp } = props;
	const classes = useUtilityClasses$10(classesProp, ownerState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersLayoutRoot, {
		ref,
		sx,
		className: clsx(classes.root, className),
		ownerState,
		children: [
			orientation === "landscape" ? shortcuts : toolbar,
			orientation === "landscape" ? toolbar : shortcuts,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersLayoutContentWrapper, {
				className: classes.contentWrapper,
				ownerState,
				children: variant === "desktop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [content, tabs] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [tabs, content] })
			}),
			actionBar
		]
	});
});
PickersLayout.displayName = "PickersLayout";
PickersLayout.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/createNonRangePickerStepNavigation.js
function createNonRangePickerStepNavigation(parameters) {
	const { steps } = parameters;
	return createStepNavigation({
		steps,
		isViewMatchingStep: (view, step) => {
			return step.views == null || step.views.includes(view);
		},
		onStepChange: ({ step, defaultView, setView, view, views }) => {
			const targetView = step.views == null ? defaultView : step.views.find((viewBis) => views.includes(viewBis));
			if (targetView !== view) setView(targetView);
		}
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useDesktopPicker/useDesktopPicker.js
/**
* Hook managing all the single-date desktop pickers:
* - DesktopDatePicker
* - DesktopDateTimePicker
* - DesktopTimePicker
*/
var _excluded$11 = ["props", "steps"], _excluded2$1 = ["ownerState"];
var useDesktopPicker = (_ref) => {
	let { props, steps } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded$11);
	const { slots, slotProps: innerSlotProps, label, inputRef, localeText } = props;
	const { providerProps, renderCurrentView, ownerState } = usePicker(_extends({}, pickerParams, {
		props,
		localeText,
		autoFocusView: true,
		viewContainerRole: "dialog",
		variant: "desktop",
		getStepNavigation: createNonRangePickerStepNavigation({ steps })
	}));
	const labelId = providerProps.privateContextValue.labelId;
	const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
	const Field = slots.field;
	const fieldProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Field,
		externalSlotProps: innerSlotProps?.field,
		additionalProps: _extends({}, isToolbarHidden && { id: labelId }),
		ownerState
	}), _excluded2$1);
	const Layout = slots.layout ?? PickersLayout;
	let labelledById = labelId;
	if (isToolbarHidden) if (label) labelledById = `${labelId}-label`;
	else labelledById = void 0;
	const slotProps = _extends({}, innerSlotProps, {
		toolbar: _extends({}, innerSlotProps?.toolbar, { titleId: labelId }),
		popper: _extends({ "aria-labelledby": labelledById }, innerSlotProps?.popper)
	});
	const renderPicker = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickerProvider, _extends({}, providerProps, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, _extends({}, fieldProps, {
		slots: _extends({}, slots, fieldProps.slots),
		slotProps: _extends({}, slotProps, fieldProps.slotProps),
		inputRef
	})), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerPopper, {
		slots,
		slotProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, _extends({}, slotProps?.layout, {
			slots,
			slotProps,
			children: renderCurrentView()
		}))
	})] }));
	renderPicker.displayName = "renderPicker";
	return { renderPicker };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/dateViewRenderers/dateViewRenderers.js
var renderDateViewCalendar = ({ view, onViewChange, views, focusedView, onFocusedViewChange, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minDate, maxDate, shouldDisableDate, shouldDisableMonth, shouldDisableYear, reduceAnimations, onMonthChange, monthsPerRow, onYearChange, yearsOrder, yearsPerRow, slots, slotProps, loading, renderLoading, disableHighlightToday, readOnly, disabled, showDaysOutsideCurrentMonth, dayOfWeekFormatter, sx, autoFocus, fixedWeekNumber, displayWeekNumber, timezone }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateCalendar, {
	view,
	onViewChange,
	views: views.filter(isDatePickerView),
	focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minDate,
	maxDate,
	shouldDisableDate,
	shouldDisableMonth,
	shouldDisableYear,
	reduceAnimations,
	onMonthChange,
	monthsPerRow,
	onYearChange,
	yearsOrder,
	yearsPerRow,
	slots,
	slotProps,
	loading,
	renderLoading,
	disableHighlightToday,
	readOnly,
	disabled,
	showDaysOutsideCurrentMonth,
	dayOfWeekFormatter,
	sx,
	autoFocus,
	fixedWeekNumber,
	displayWeekNumber,
	timezone
});
renderDateViewCalendar.displayName = "renderDateViewCalendar";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DesktopDatePicker/DesktopDatePicker.js
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopDatePicker API](https://mui.com/x/api/date-pickers/desktop-date-picker/)
*/
var DesktopDatePicker = /* @__PURE__ */ import_react.forwardRef(function DesktopDatePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiDesktopDatePicker");
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar
	}, defaultizedProps.viewRenderers);
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			closeOnSelect: defaultizedProps.closeOnSelect ?? true,
			viewRenderers,
			format: resolveDateFormat(adapter, defaultizedProps, false),
			yearsPerRow: defaultizedProps.yearsPerRow ?? 4,
			slots: _extends({ field: DateField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({ hidden: true }, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date",
		validator: validateDate,
		steps: null
	});
	return renderPicker();
});
DesktopDatePicker.displayName = "DesktopDatePicker";
DesktopDatePicker.propTypes = {
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/material/esm/DialogContent/dialogContentClasses.js
function getDialogContentUtilityClass(slot) {
	return generateUtilityClass("MuiDialogContent", slot);
}
generateUtilityClasses("MuiDialogContent", ["root", "dividers"]);
//#endregion
//#region node_modules/@mui/material/esm/DialogTitle/dialogTitleClasses.js
var dialogTitleClasses = generateUtilityClasses("MuiDialogTitle", ["root"]);
//#endregion
//#region node_modules/@mui/material/esm/DialogContent/DialogContent.js
var useUtilityClasses$9 = (ownerState) => {
	const { classes, dividers } = ownerState;
	return composeClasses({ root: ["root", dividers && "dividers"] }, getDialogContentUtilityClass, classes);
};
var DialogContentRoot = styled("div", {
	name: "MuiDialogContent",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.dividers && styles.dividers];
	}
})(memoTheme(({ theme }) => ({
	flex: "1 1 auto",
	WebkitOverflowScrolling: "touch",
	overflowY: "auto",
	padding: "20px 24px",
	variants: [{
		props: ({ ownerState }) => ownerState.dividers,
		style: {
			padding: "16px 24px",
			borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
			borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
		}
	}, {
		props: ({ ownerState }) => !ownerState.dividers,
		style: { [`.${dialogTitleClasses.root} + &`]: { paddingTop: 0 } }
	}]
})));
var DialogContent = /* @__PURE__ */ import_react.forwardRef(function DialogContent(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialogContent"
	});
	const { className, dividers = false, ...other } = props;
	const ownerState = {
		...props,
		dividers
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentRoot, {
		className: clsx(useUtilityClasses$9(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
DialogContent.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	dividers: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/esm/Dialog/dialogClasses.js
function getDialogUtilityClass(slot) {
	return generateUtilityClass("MuiDialog", slot);
}
var dialogClasses = generateUtilityClasses("MuiDialog", [
	"root",
	"backdrop",
	"scrollPaper",
	"scrollBody",
	"container",
	"paper",
	"paperScrollPaper",
	"paperScrollBody",
	"paperWidthFalse",
	"paperWidthXs",
	"paperWidthSm",
	"paperWidthMd",
	"paperWidthLg",
	"paperWidthXl",
	"paperFullWidth",
	"paperFullScreen"
]);
//#endregion
//#region node_modules/@mui/material/esm/Dialog/DialogContext.js
var DialogContext = /* @__PURE__ */ import_react.createContext({});
DialogContext.displayName = "DialogContext";
//#endregion
//#region node_modules/@mui/material/esm/Dialog/Dialog.js
var DialogBackdrop = styled(Backdrop, {
	name: "MuiDialog",
	slot: "Backdrop"
})({ zIndex: -1 });
var useUtilityClasses$8 = (ownerState) => {
	const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;
	return composeClasses({
		root: ["root"],
		backdrop: ["backdrop"],
		container: ["container", `scroll${capitalize_default(scroll)}`],
		paper: [
			"paper",
			`paperScroll${capitalize_default(scroll)}`,
			`paperWidth${capitalize_default(String(maxWidth))}`,
			fullWidth && "paperFullWidth",
			fullScreen && "paperFullScreen"
		]
	}, getDialogUtilityClass, classes);
};
var DialogRoot = styled(Modal, {
	name: "MuiDialog",
	slot: "Root"
})({ "@media print": { position: "absolute !important" } });
var DialogContainer = styled("div", {
	name: "MuiDialog",
	slot: "Container",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.container, styles[`scroll${capitalize_default(ownerState.scroll)}`]];
	}
})({
	height: "100%",
	"@media print": { height: "auto" },
	outline: 0,
	variants: [{
		props: { scroll: "paper" },
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		}
	}, {
		props: { scroll: "body" },
		style: {
			overflowY: "auto",
			overflowX: "hidden",
			textAlign: "center",
			"&::after": {
				content: "\"\"",
				display: "inline-block",
				verticalAlign: "middle",
				height: "100%",
				width: "0"
			}
		}
	}]
});
var DialogPaper = styled(Paper, {
	name: "MuiDialog",
	slot: "Paper",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.paper,
			styles[`scrollPaper${capitalize_default(ownerState.scroll)}`],
			styles[`paperWidth${capitalize_default(String(ownerState.maxWidth))}`],
			ownerState.fullWidth && styles.paperFullWidth,
			ownerState.fullScreen && styles.paperFullScreen
		];
	}
})(memoTheme(({ theme }) => ({
	margin: 32,
	position: "relative",
	overflowY: "auto",
	"@media print": {
		overflowY: "visible",
		boxShadow: "none"
	},
	variants: [
		{
			props: { scroll: "paper" },
			style: {
				display: "flex",
				flexDirection: "column",
				maxHeight: "calc(100% - 64px)"
			}
		},
		{
			props: { scroll: "body" },
			style: {
				display: "inline-block",
				verticalAlign: "middle",
				textAlign: "initial"
			}
		},
		{
			props: ({ ownerState }) => !ownerState.maxWidth,
			style: { maxWidth: "calc(100% - 64px)" }
		},
		{
			props: { maxWidth: "xs" },
			style: {
				maxWidth: theme.breakpoints.unit === "px" ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
				[`&.${dialogClasses.paperScrollBody}`]: { [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		},
		...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
			props: { maxWidth },
			style: {
				maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
				[`&.${dialogClasses.paperScrollBody}`]: { [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 64)]: { maxWidth: "calc(100% - 64px)" } }
			}
		})),
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: { width: "calc(100% - 64px)" }
		},
		{
			props: ({ ownerState }) => ownerState.fullScreen,
			style: {
				margin: 0,
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "none",
				borderRadius: 0,
				[`&.${dialogClasses.paperScrollBody}`]: {
					margin: 0,
					maxWidth: "100%"
				}
			}
		}
	]
})));
/**
* Dialogs are overlaid modal paper based components with a backdrop.
*/
var Dialog = /* @__PURE__ */ import_react.forwardRef(function Dialog(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiDialog"
	});
	const theme = useTheme$2();
	const defaultTransitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};
	const { "aria-describedby": ariaDescribedby, "aria-labelledby": ariaLabelledbyProp, "aria-modal": ariaModal = true, BackdropComponent, BackdropProps, children, className, disableEscapeKeyDown = false, fullScreen = false, fullWidth = false, maxWidth = "sm", onClick, onClose, open, PaperComponent = Paper, PaperProps = {}, scroll = "paper", slots = {}, slotProps = {}, TransitionComponent = Fade, transitionDuration = defaultTransitionDuration, TransitionProps, ...other } = props;
	const ownerState = {
		...props,
		disableEscapeKeyDown,
		fullScreen,
		fullWidth,
		maxWidth,
		scroll
	};
	const classes = useUtilityClasses$8(ownerState);
	const backdropClick = import_react.useRef();
	const handleMouseDown = (event) => {
		backdropClick.current = event.target === event.currentTarget;
	};
	const handleBackdropClick = (event) => {
		if (onClick) onClick(event);
		if (!backdropClick.current) return;
		backdropClick.current = null;
		if (onClose) onClose(event, "backdropClick");
	};
	const ariaLabelledby = useId(ariaLabelledbyProp);
	const dialogContextValue = import_react.useMemo(() => {
		return { titleId: ariaLabelledby };
	}, [ariaLabelledby]);
	const externalForwardedProps = {
		slots: {
			transition: TransitionComponent,
			...slots
		},
		slotProps: {
			transition: TransitionProps,
			paper: PaperProps,
			backdrop: BackdropProps,
			...slotProps
		}
	};
	const [RootSlot, rootSlotProps] = useSlot("root", {
		elementType: DialogRoot,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.root, className),
		ref
	});
	const [BackdropSlot, backdropSlotProps] = useSlot("backdrop", {
		elementType: DialogBackdrop,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: classes.backdrop
	});
	const [PaperSlot, paperSlotProps] = useSlot("paper", {
		elementType: DialogPaper,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState,
		className: clsx(classes.paper, PaperProps.className)
	});
	const [ContainerSlot, containerSlotProps] = useSlot("container", {
		elementType: DialogContainer,
		externalForwardedProps,
		ownerState,
		className: classes.container
	});
	const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
		elementType: Fade,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			appear: true,
			in: open,
			timeout: transitionDuration,
			role: "presentation"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootSlot, {
		closeAfterTransition: true,
		slots: { backdrop: BackdropSlot },
		slotProps: { backdrop: {
			transitionDuration,
			as: BackdropComponent,
			...backdropSlotProps
		} },
		disableEscapeKeyDown,
		onClose,
		open,
		onClick: handleBackdropClick,
		...rootSlotProps,
		...other,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionSlot, {
			...transitionSlotProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerSlot, {
				onMouseDown: handleMouseDown,
				...containerSlotProps,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaperSlot, {
					as: PaperComponent,
					elevation: 24,
					role: "dialog",
					"aria-describedby": ariaDescribedby,
					"aria-labelledby": ariaLabelledby,
					"aria-modal": ariaModal,
					...paperSlotProps,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContext.Provider, {
						value: dialogContextValue,
						children
					})
				})
			})
		})
	});
});
Dialog.propTypes = {
	"aria-describedby": import_prop_types.default.string,
	"aria-labelledby": import_prop_types.default.string,
	"aria-modal": import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["false", "true"]), import_prop_types.default.bool]),
	BackdropComponent: import_prop_types.default.elementType,
	BackdropProps: import_prop_types.default.object,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	disableEscapeKeyDown: import_prop_types.default.bool,
	fullScreen: import_prop_types.default.bool,
	fullWidth: import_prop_types.default.bool,
	maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		false
	]), import_prop_types.default.string]),
	onClick: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	open: import_prop_types.default.bool.isRequired,
	PaperComponent: import_prop_types.default.elementType,
	PaperProps: import_prop_types.default.object,
	scroll: import_prop_types.default.oneOf(["body", "paper"]),
	slotProps: import_prop_types.default.shape({
		backdrop: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		container: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		paper: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		backdrop: import_prop_types.default.elementType,
		container: import_prop_types.default.elementType,
		paper: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		transition: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	TransitionComponent: import_prop_types.default.elementType,
	transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		appear: import_prop_types.default.number,
		enter: import_prop_types.default.number,
		exit: import_prop_types.default.number
	})]),
	TransitionProps: import_prop_types.default.object
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersModalDialog.js
var PickersModalDialogRoot = styled(Dialog, { slot: "internal" })({
	[`& .${dialogClasses.container}`]: { outline: 0 },
	[`& .${dialogClasses.paper}`]: {
		outline: 0,
		minWidth: 320
	}
});
var PickersModalDialogContent = styled(DialogContent, { slot: "internal" })({ "&:first-of-type": { padding: 0 } });
function PickersModalDialog(props) {
	const { children, slots, slotProps } = props;
	const { open } = usePickerContext();
	const { dismissViews, onPopperExited } = usePickerPrivateContext();
	const Dialog = slots?.dialog ?? PickersModalDialogRoot;
	const Transition = slots?.mobileTransition ?? Fade;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, _extends({
		open,
		onClose: () => {
			dismissViews();
			onPopperExited?.();
		}
	}, slotProps?.dialog, {
		TransitionComponent: Transition,
		TransitionProps: slotProps?.mobileTransition,
		PaperComponent: slots?.mobilePaper,
		PaperProps: slotProps?.mobilePaper,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersModalDialogContent, { children })
	}));
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useMobilePicker/useMobilePicker.js
/**
* Hook managing all the single-date mobile pickers:
* - MobileDatePicker
* - MobileDateTimePicker
* - MobileTimePicker
*/
var _excluded$10 = ["props", "steps"], _excluded2 = ["ownerState"];
var useMobilePicker = (_ref) => {
	let { props, steps } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded$10);
	const { slots, slotProps: innerSlotProps, label, inputRef, localeText } = props;
	const { providerProps, renderCurrentView, ownerState } = usePicker(_extends({}, pickerParams, {
		props,
		localeText,
		autoFocusView: true,
		viewContainerRole: "dialog",
		variant: "mobile",
		getStepNavigation: createNonRangePickerStepNavigation({ steps })
	}));
	const labelId = providerProps.privateContextValue.labelId;
	const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;
	const Field = slots.field;
	const fieldProps = _objectWithoutPropertiesLoose(useSlotProps({
		elementType: Field,
		externalSlotProps: innerSlotProps?.field,
		additionalProps: _extends({}, isToolbarHidden && { id: labelId }),
		ownerState
	}), _excluded2);
	const Layout = slots.layout ?? PickersLayout;
	let labelledById = labelId;
	if (isToolbarHidden) if (label) labelledById = `${labelId}-label`;
	else labelledById = void 0;
	const slotProps = _extends({}, innerSlotProps, {
		toolbar: _extends({}, innerSlotProps?.toolbar, { titleId: labelId }),
		mobilePaper: _extends({ "aria-labelledby": labelledById }, innerSlotProps?.mobilePaper)
	});
	const renderPicker = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickerProvider, _extends({}, providerProps, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, _extends({}, fieldProps, {
		slots: _extends({}, slots, fieldProps.slots),
		slotProps: _extends({}, slotProps, fieldProps.slotProps),
		inputRef
	})), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersModalDialog, {
		slots,
		slotProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, _extends({}, slotProps?.layout, {
			slots,
			slotProps,
			children: renderCurrentView()
		}))
	})] }));
	renderPicker.displayName = "renderPicker";
	return { renderPicker };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MobileDatePicker/MobileDatePicker.js
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileDatePicker API](https://mui.com/x/api/date-pickers/mobile-date-picker/)
*/
var MobileDatePicker = /* @__PURE__ */ import_react.forwardRef(function MobileDatePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiMobileDatePicker");
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers: _extends({
				day: renderDateViewCalendar,
				month: renderDateViewCalendar,
				year: renderDateViewCalendar
			}, defaultizedProps.viewRenderers),
			format: resolveDateFormat(adapter, defaultizedProps, false),
			slots: _extends({ field: DateField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({ hidden: false }, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date",
		validator: validateDate,
		steps: null
	});
	return renderPicker();
});
MobileDatePicker.displayName = "MobileDatePicker";
MobileDatePicker.propTypes = {
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DatePicker/DatePicker.js
var _excluded$9 = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DatePicker API](https://mui.com/x/api/date-pickers/date-picker/)
*/
var DatePicker = /* @__PURE__ */ import_react.forwardRef(function DatePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDatePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopDatePicker, _extends({ ref }, other));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileDatePicker, _extends({ ref }, other));
});
DatePicker.displayName = "DatePicker";
DatePicker.propTypes = {
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	desktopModeMediaQuery: import_prop_types.default.string,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/hooks/useStaticPicker/useStaticPicker.js
var _excluded$8 = ["props", "steps"];
var PickerStaticLayout = styled(PickersLayout, { slot: "internal" })(({ theme }) => ({
	overflow: "hidden",
	minWidth: 320,
	backgroundColor: (theme.vars || theme).palette.background.paper
}));
/**
* Hook managing all the single-date static pickers:
* - StaticDatePicker
* - StaticDateTimePicker
* - StaticTimePicker
*/
var useStaticPicker = (_ref) => {
	let { props, steps } = _ref, pickerParams = _objectWithoutPropertiesLoose(_ref, _excluded$8);
	const { localeText, slots, slotProps, displayStaticWrapperAs, autoFocus } = props;
	const getStepNavigation = createNonRangePickerStepNavigation({ steps });
	const { providerProps, renderCurrentView } = usePicker(_extends({}, pickerParams, {
		props,
		variant: displayStaticWrapperAs,
		autoFocusView: autoFocus ?? false,
		viewContainerRole: null,
		localeText,
		getStepNavigation
	}));
	const Layout = slots?.layout ?? PickerStaticLayout;
	const renderPicker = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickerProvider, _extends({}, providerProps, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, _extends({}, slotProps?.layout, {
		slots,
		slotProps,
		sx: mergeSx(providerProps.contextValue.rootSx, slotProps?.layout?.sx),
		className: clsx(providerProps.contextValue.rootClassName, slotProps?.layout?.className),
		ref: providerProps.contextValue.rootRef,
		children: renderCurrentView()
	})) }));
	renderPicker.displayName = "renderPicker";
	return { renderPicker };
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/StaticDatePicker/StaticDatePicker.js
/**
* Demos:
*
* - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [StaticDatePicker API](https://mui.com/x/api/date-pickers/static-date-picker/)
*/
var StaticDatePicker = /* @__PURE__ */ import_react.forwardRef(function StaticDatePicker(inProps, ref) {
	const defaultizedProps = useDatePickerDefaultizedProps(inProps, "MuiStaticDatePicker");
	const displayStaticWrapperAs = defaultizedProps.displayStaticWrapperAs ?? "mobile";
	const { renderPicker } = useStaticPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers: _extends({
				day: renderDateViewCalendar,
				month: renderDateViewCalendar,
				year: renderDateViewCalendar
			}, defaultizedProps.viewRenderers),
			displayStaticWrapperAs,
			yearsPerRow: defaultizedProps.yearsPerRow ?? (displayStaticWrapperAs === "mobile" ? 3 : 4),
			slotProps: _extends({}, defaultizedProps.slotProps, { toolbar: _extends({ hidden: displayStaticWrapperAs === "desktop" }, defaultizedProps.slotProps?.toolbar) })
		}),
		valueManager: singleItemValueManager,
		valueType: "date",
		validator: validateDate,
		steps: null
	});
	return renderPicker();
});
StaticDatePicker.displayName = "StaticDatePicker";
StaticDatePicker.propTypes = {
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayStaticWrapperAs: import_prop_types.default.oneOf(["desktop", "mobile"]),
	displayWeekNumber: import_prop_types.default.bool,
	fixedWeekNumber: import_prop_types.default.number,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		month: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"month",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/pickersToolbarTextClasses.js
function getPickersToolbarTextUtilityClass(slot) {
	return generateUtilityClass("MuiPickersToolbarText", slot);
}
var pickersToolbarTextClasses = generateUtilityClasses("MuiPickersToolbarText", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersToolbarText.js
var _excluded$7 = [
	"className",
	"classes",
	"selected",
	"value"
];
var useUtilityClasses$7 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersToolbarTextUtilityClass, classes);
};
var PickersToolbarTextRoot = styled(Typography, {
	name: "MuiPickersToolbarText",
	slot: "Root"
})(({ theme }) => ({
	transition: theme.transitions.create("color"),
	color: (theme.vars || theme).palette.text.secondary,
	[`&[data-selected]`]: { color: (theme.vars || theme).palette.text.primary }
}));
var PickersToolbarText = /* @__PURE__ */ import_react.forwardRef(function PickersToolbarText(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbarText"
	});
	const { className, classes: classesProp, selected, value } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarTextRoot, _extends({
		ref,
		className: clsx(useUtilityClasses$7(classesProp).root, className),
		component: "span",
		ownerState: props
	}, selected && { "data-selected": true }, other, { children: value }));
});
PickersToolbarText.displayName = "PickersToolbarText";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/components/PickersToolbarButton.js
var _excluded$6 = [
	"align",
	"className",
	"classes",
	"selected",
	"typographyClassName",
	"value",
	"variant",
	"width"
];
var useUtilityClasses$6 = (classes) => {
	return composeClasses({ root: ["root"] }, getPickersToolbarUtilityClass, classes);
};
var PickersToolbarButtonRoot = styled(Button, {
	name: "MuiPickersToolbarButton",
	slot: "Root"
})({
	padding: 0,
	minWidth: 16,
	textTransform: "none"
});
var PickersToolbarButton = /* @__PURE__ */ import_react.forwardRef(function PickersToolbarButton(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiPickersToolbarButton"
	});
	const { align, className, classes: classesProp, selected, typographyClassName, value, variant, width } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButtonRoot, _extends({
		variant: "text",
		ref,
		className: clsx(useUtilityClasses$6(classesProp).root, className),
		ownerState: props
	}, width ? { sx: { width } } : {}, other, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarText, {
		align,
		className: typographyClassName,
		variant,
		value,
		selected
	}) }));
});
PickersToolbarButton.displayName = "PickersToolbarButton";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimePicker/timePickerToolbarClasses.js
function getTimePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiTimePickerToolbar", slot);
}
var timePickerToolbarClasses = generateUtilityClasses("MuiTimePickerToolbar", [
	"root",
	"separator",
	"hourMinuteLabel",
	"hourMinuteLabelLandscape",
	"hourMinuteLabelReverse",
	"ampmSelection",
	"ampmLandscape",
	"ampmLabel"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimePicker/TimePickerToolbar.js
var _excluded$5 = [
	"ampm",
	"ampmInClock",
	"className",
	"classes"
];
var useUtilityClasses$5 = (classes, ownerState) => {
	const { pickerOrientation, toolbarDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		separator: ["separator"],
		hourMinuteLabel: [
			"hourMinuteLabel",
			pickerOrientation === "landscape" && "hourMinuteLabelLandscape",
			toolbarDirection === "rtl" && "hourMinuteLabelReverse"
		],
		ampmSelection: ["ampmSelection", pickerOrientation === "landscape" && "ampmLandscape"],
		ampmLabel: ["ampmLabel"]
	}, getTimePickerToolbarUtilityClass, classes);
};
var TimePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiTimePickerToolbar",
	slot: "Root"
})({});
var TimePickerToolbarSeparator = styled(PickersToolbarText, {
	name: "MuiTimePickerToolbar",
	slot: "Separator"
})({
	outline: 0,
	margin: "0 4px 0 2px",
	cursor: "default"
});
var TimePickerToolbarHourMinuteLabel = styled("div", {
	name: "MuiTimePickerToolbar",
	slot: "HourMinuteLabel",
	overridesResolver: (props, styles) => [{
		[`&.${timePickerToolbarClasses.hourMinuteLabelLandscape}`]: styles.hourMinuteLabelLandscape,
		[`&.${timePickerToolbarClasses.hourMinuteLabelReverse}`]: styles.hourMinuteLabelReverse
	}, styles.hourMinuteLabel]
})({
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "flex-end",
	variants: [{
		props: { toolbarDirection: "rtl" },
		style: { flexDirection: "row-reverse" }
	}, {
		props: { pickerOrientation: "landscape" },
		style: { marginTop: "auto" }
	}]
});
var TimePickerToolbarAmPmSelection = styled("div", {
	name: "MuiTimePickerToolbar",
	slot: "AmPmSelection",
	overridesResolver: (props, styles) => [
		{ [`.${timePickerToolbarClasses.ampmLabel}`]: styles.ampmLabel },
		{ [`&.${timePickerToolbarClasses.ampmLandscape}`]: styles.ampmLandscape },
		styles.ampmSelection
	]
})({
	display: "flex",
	flexDirection: "column",
	marginRight: "auto",
	marginLeft: 12,
	[`& .${timePickerToolbarClasses.ampmLabel}`]: { fontSize: 17 },
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			margin: "4px 0 auto",
			flexDirection: "row",
			justifyContent: "space-around",
			flexBasis: "100%"
		}
	}]
});
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [TimePickerToolbar API](https://mui.com/x/api/date-pickers/time-picker-toolbar/)
*/
function TimePickerToolbar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimePickerToolbar"
	});
	const { ampm, ampmInClock, className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$5);
	const adapter = usePickerAdapter();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses$5(classesProp, ownerState);
	const { value, setValue, disabled, readOnly, view, setView, views } = usePickerContext();
	const showAmPmControl = Boolean(ampm && !ampmInClock && views.includes("hours"));
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(value, ampm, (newValue) => setValue(newValue, {
		changeImportance: "set",
		source: "view"
	}));
	const formatSection = (format) => {
		if (!adapter.isValid(value)) return "--";
		return adapter.format(value, format);
	};
	const separator = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimePickerToolbarSeparator, {
		tabIndex: -1,
		value: ":",
		variant: "h3",
		selected: false,
		className: classes.separator
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TimePickerToolbarRoot, _extends({
		landscapeDirection: "row",
		toolbarTitle: translations.timePickerToolbarTitle,
		ownerState,
		className: clsx(classes.root, className)
	}, other, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TimePickerToolbarHourMinuteLabel, {
		className: classes.hourMinuteLabel,
		ownerState,
		children: [
			arrayIncludes(views, "hours") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "h3",
				onClick: () => setView("hours"),
				selected: view === "hours",
				value: formatSection(ampm ? "hours12h" : "hours24h")
			}),
			arrayIncludes(views, ["hours", "minutes"]) && separator,
			arrayIncludes(views, "minutes") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "h3",
				onClick: () => setView("minutes"),
				selected: view === "minutes",
				value: formatSection("minutes")
			}),
			arrayIncludes(views, ["minutes", "seconds"]) && separator,
			arrayIncludes(views, "seconds") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				variant: "h3",
				onClick: () => setView("seconds"),
				selected: view === "seconds",
				value: formatSection("seconds")
			})
		]
	}), showAmPmControl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TimePickerToolbarAmPmSelection, {
		className: classes.ampmSelection,
		ownerState,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
			disableRipple: true,
			variant: "subtitle2",
			selected: meridiemMode === "am",
			typographyClassName: classes.ampmLabel,
			value: formatMeridiem(adapter, "am"),
			onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
			disabled
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
			disableRipple: true,
			variant: "subtitle2",
			selected: meridiemMode === "pm",
			typographyClassName: classes.ampmLabel,
			value: formatMeridiem(adapter, "pm"),
			onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
			disabled
		})]
	})] }));
}
TimePickerToolbar.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	hidden: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	titleId: import_prop_types.default.string,
	toolbarFormat: import_prop_types.default.string,
	toolbarPlaceholder: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimePicker/shared.js
function useTimePickerDefaultizedProps(props, name) {
	const adapter = usePickerAdapter();
	const themeProps = useThemeProps({
		props,
		name
	});
	const validationProps = useApplyDefaultValuesToTimeValidationProps(themeProps);
	const ampm = themeProps.ampm ?? adapter.is12HourCycleInCurrentLocale();
	return _extends({}, themeProps, validationProps, {
		ampm,
		localeText: import_react.useMemo(() => {
			if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
			return _extends({}, themeProps.localeText, { timePickerToolbarTitle: themeProps.localeText.toolbarTitle });
		}, [themeProps.localeText])
	}, applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: ["hours", "minutes"],
		defaultOpenTo: "hours"
	}), {
		slots: _extends({ toolbar: TimePickerToolbar }, themeProps.slots),
		slotProps: _extends({}, themeProps.slotProps, { toolbar: _extends({
			ampm,
			ampmInClock: themeProps.ampmInClock
		}, themeProps.slotProps?.toolbar) })
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/timeViewRenderers/timeViewRenderers.js
var renderTimeViewClock = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, ampmInClock, slots, slotProps, readOnly, disabled, sx, autoFocus, showViewSwitcher, disableIgnoringDatePartForTimeValidation, timezone }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeClock, {
	view,
	onViewChange,
	focusedView: focusedView && isTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	ampmInClock,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	showViewSwitcher,
	disableIgnoringDatePartForTimeValidation,
	timezone
});
renderTimeViewClock.displayName = "renderTimeViewClock";
var renderDigitalClockTimeView = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalClock, {
	view,
	onViewChange,
	focusedView: focusedView && isTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	disableIgnoringDatePartForTimeValidation,
	timeStep: timeSteps?.minutes,
	skipDisabled,
	timezone
});
renderDigitalClockTimeView.displayName = "renderDigitalClockTimeView";
var renderMultiSectionDigitalClockTimeView = ({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSectionDigitalClock, {
	view,
	onViewChange,
	focusedView: focusedView && isInternalTimeView(focusedView) ? focusedView : null,
	onFocusedViewChange,
	views: views.filter(isTimeView),
	value,
	defaultValue,
	referenceDate,
	onChange,
	className,
	classes,
	disableFuture,
	disablePast,
	minTime,
	maxTime,
	shouldDisableTime,
	minutesStep,
	ampm,
	slots,
	slotProps,
	readOnly,
	disabled,
	sx,
	autoFocus,
	disableIgnoringDatePartForTimeValidation,
	timeSteps,
	skipDisabled,
	timezone
});
renderMultiSectionDigitalClockTimeView.displayName = "renderMultiSectionDigitalClockTimeView";
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/internals/utils/date-time-utils.js
var _excluded$4 = ["views", "format"];
var resolveDateTimeFormat = (adapter, _ref, ignoreDateResolving) => {
	let { views, format } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$4);
	if (format) return format;
	const dateViews = [];
	const timeViews = [];
	views.forEach((view) => {
		if (isTimeView(view)) timeViews.push(view);
		else if (isDatePickerView(view)) dateViews.push(view);
	});
	if (timeViews.length === 0) return resolveDateFormat(adapter, _extends({ views: dateViews }, other), false);
	if (dateViews.length === 0) return resolveTimeFormat(adapter, _extends({ views: timeViews }, other));
	const timeFormat = resolveTimeFormat(adapter, _extends({ views: timeViews }, other));
	return `${ignoreDateResolving ? adapter.formats.keyboardDate : resolveDateFormat(adapter, _extends({ views: dateViews }, other), false)} ${timeFormat}`;
};
var resolveViews = (ampm, views, shouldUseSingleColumn) => {
	if (shouldUseSingleColumn) return views.filter((view) => !isInternalTimeView(view) || view === "hours");
	return ampm ? [...views, "meridiem"] : views;
};
var resolveShouldRenderTimeInASingleColumn = (timeSteps, threshold) => 1440 / ((timeSteps.hours ?? 1) * (timeSteps.minutes ?? 5)) <= threshold;
function resolveTimeViewsResponse({ thresholdToRenderTimeInASingleColumn: inThreshold, ampm, timeSteps: inTimeSteps, views }) {
	const thresholdToRenderTimeInASingleColumn = inThreshold ?? 24;
	const timeSteps = _extends({
		hours: 1,
		minutes: 5,
		seconds: 5
	}, inTimeSteps);
	const shouldRenderTimeInASingleColumn = resolveShouldRenderTimeInASingleColumn(timeSteps, thresholdToRenderTimeInASingleColumn);
	return {
		thresholdToRenderTimeInASingleColumn,
		timeSteps,
		shouldRenderTimeInASingleColumn,
		views: resolveViews(ampm, views, shouldRenderTimeInASingleColumn)
	};
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DesktopTimePicker/DesktopTimePicker.js
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
*/
var DesktopTimePicker = /* @__PURE__ */ import_react.forwardRef(function DesktopTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiDesktopTimePicker");
	const { shouldRenderTimeInASingleColumn, views: resolvedViews, timeSteps } = resolveTimeViewsResponse(defaultizedProps);
	const renderTimeView = shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? true;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? resolvedViews.filter((view) => view !== "meridiem") : resolvedViews;
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			ampmInClock,
			timeSteps,
			viewRenderers,
			format: resolveTimeFormat(adapter, defaultizedProps),
			views: shouldRenderTimeInASingleColumn ? ["hours"] : views,
			slots: _extends({ field: TimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: true,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "time",
		validator: validateTime,
		steps: null
	});
	return renderPicker();
});
DesktopTimePicker.displayName = "DesktopTimePicker";
DesktopTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	localeText: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableTime: import_prop_types.default.func,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MobileTimePicker/MobileTimePicker.js
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileTimePicker API](https://mui.com/x/api/date-pickers/mobile-time-picker/)
*/
var MobileTimePicker = /* @__PURE__ */ import_react.forwardRef(function MobileTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiMobileTimePicker");
	const viewRenderers = _extends({
		hours: renderTimeViewClock,
		minutes: renderTimeViewClock,
		seconds: renderTimeViewClock
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? false;
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			ampmInClock,
			viewRenderers,
			format: resolveTimeFormat(adapter, defaultizedProps),
			slots: _extends({ field: TimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: false,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "time",
		validator: validateTime,
		steps: null
	});
	return renderPicker();
});
MobileTimePicker.displayName = "MobileTimePicker";
MobileTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	localeText: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableTime: import_prop_types.default.func,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/TimePicker/TimePicker.js
var _excluded$3 = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [TimePicker API](https://mui.com/x/api/date-pickers/time-picker/)
*/
var TimePicker = /* @__PURE__ */ import_react.forwardRef(function TimePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded$3);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopTimePicker, _extends({ ref }, other));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileTimePicker, _extends({ ref }, other));
});
TimePicker.displayName = "TimePicker";
TimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	defaultValue: import_prop_types.default.object,
	desktopModeMediaQuery: import_prop_types.default.string,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	localeText: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableTime: import_prop_types.default.func,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"meridiem",
		"minutes",
		"seconds"
	]),
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/StaticTimePicker/StaticTimePicker.js
/**
* Demos:
*
* - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [StaticTimePicker API](https://mui.com/x/api/date-pickers/static-time-picker/)
*/
var StaticTimePicker = /* @__PURE__ */ import_react.forwardRef(function StaticTimePicker(inProps, ref) {
	const defaultizedProps = useTimePickerDefaultizedProps(inProps, "MuiStaticTimePicker");
	const displayStaticWrapperAs = defaultizedProps.displayStaticWrapperAs ?? "mobile";
	const ampmInClock = defaultizedProps.ampmInClock ?? displayStaticWrapperAs === "desktop";
	const { renderPicker } = useStaticPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers: _extends({
				hours: renderTimeViewClock,
				minutes: renderTimeViewClock,
				seconds: renderTimeViewClock
			}, defaultizedProps.viewRenderers),
			displayStaticWrapperAs,
			ampmInClock,
			slotProps: _extends({}, defaultizedProps.slotProps, { toolbar: _extends({
				hidden: displayStaticWrapperAs === "desktop",
				ampmInClock
			}, defaultizedProps.slotProps?.toolbar) })
		}),
		valueManager: singleItemValueManager,
		valueType: "time",
		validator: validateTime,
		steps: null
	});
	return renderPicker();
});
StaticTimePicker.displayName = "StaticTimePicker";
StaticTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayStaticWrapperAs: import_prop_types.default.oneOf(["desktop", "mobile"]),
	localeText: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	shouldDisableTime: import_prop_types.default.func,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]),
	viewRenderers: import_prop_types.default.shape({
		hours: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		seconds: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"hours",
		"minutes",
		"seconds"
	]).isRequired)
};
//#endregion
//#region node_modules/@mui/material/esm/Tab/tabClasses.js
function getTabUtilityClass(slot) {
	return generateUtilityClass("MuiTab", slot);
}
var tabClasses = generateUtilityClasses("MuiTab", [
	"root",
	"labelIcon",
	"textColorInherit",
	"textColorPrimary",
	"textColorSecondary",
	"selected",
	"disabled",
	"fullWidth",
	"wrapped",
	"iconWrapper",
	"icon"
]);
//#endregion
//#region node_modules/@mui/material/esm/Tab/Tab.js
var useUtilityClasses$4 = (ownerState) => {
	const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = ownerState;
	return composeClasses({
		root: [
			"root",
			icon && label && "labelIcon",
			`textColor${capitalize_default(textColor)}`,
			fullWidth && "fullWidth",
			wrapped && "wrapped",
			selected && "selected",
			disabled && "disabled"
		],
		icon: ["iconWrapper", "icon"]
	}, getTabUtilityClass, classes);
};
var TabRoot = styled(ButtonBase, {
	name: "MuiTab",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.label && ownerState.icon && styles.labelIcon,
			styles[`textColor${capitalize_default(ownerState.textColor)}`],
			ownerState.fullWidth && styles.fullWidth,
			ownerState.wrapped && styles.wrapped,
			{ [`& .${tabClasses.iconWrapper}`]: styles.iconWrapper },
			{ [`& .${tabClasses.icon}`]: styles.icon }
		];
	}
})(memoTheme(({ theme }) => ({
	...theme.typography.button,
	maxWidth: 360,
	minWidth: 90,
	position: "relative",
	minHeight: 48,
	flexShrink: 0,
	padding: "12px 16px",
	overflow: "hidden",
	whiteSpace: "normal",
	textAlign: "center",
	lineHeight: 1.25,
	variants: [
		{
			props: ({ ownerState }) => ownerState.label && (ownerState.iconPosition === "top" || ownerState.iconPosition === "bottom"),
			style: { flexDirection: "column" }
		},
		{
			props: ({ ownerState }) => ownerState.label && ownerState.iconPosition !== "top" && ownerState.iconPosition !== "bottom",
			style: { flexDirection: "row" }
		},
		{
			props: ({ ownerState }) => ownerState.icon && ownerState.label,
			style: {
				minHeight: 72,
				paddingTop: 9,
				paddingBottom: 9
			}
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "top",
			style: { [`& > .${tabClasses.icon}`]: { marginBottom: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "bottom",
			style: { [`& > .${tabClasses.icon}`]: { marginTop: 6 } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "start",
			style: { [`& > .${tabClasses.icon}`]: { marginRight: theme.spacing(1) } }
		},
		{
			props: ({ ownerState, iconPosition }) => ownerState.icon && ownerState.label && iconPosition === "end",
			style: { [`& > .${tabClasses.icon}`]: { marginLeft: theme.spacing(1) } }
		},
		{
			props: { textColor: "inherit" },
			style: {
				color: "inherit",
				opacity: .6,
				[`&.${tabClasses.selected}`]: { opacity: 1 },
				[`&.${tabClasses.disabled}`]: { opacity: (theme.vars || theme).palette.action.disabledOpacity }
			}
		},
		{
			props: { textColor: "primary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.primary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: { textColor: "secondary" },
			style: {
				color: (theme.vars || theme).palette.text.secondary,
				[`&.${tabClasses.selected}`]: { color: (theme.vars || theme).palette.secondary.main },
				[`&.${tabClasses.disabled}`]: { color: (theme.vars || theme).palette.text.disabled }
			}
		},
		{
			props: ({ ownerState }) => ownerState.fullWidth,
			style: {
				flexShrink: 1,
				flexGrow: 1,
				flexBasis: 0,
				maxWidth: "none"
			}
		},
		{
			props: ({ ownerState }) => ownerState.wrapped,
			style: { fontSize: theme.typography.pxToRem(12) }
		}
	]
})));
var Tab = /* @__PURE__ */ import_react.forwardRef(function Tab(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTab"
	});
	const { className, disabled = false, disableFocusRipple = false, fullWidth, icon: iconProp, iconPosition = "top", indicator, label, onChange, onClick, onFocus, selected, selectionFollowsFocus, textColor = "inherit", value, wrapped = false, ...other } = props;
	const ownerState = {
		...props,
		disabled,
		disableFocusRipple,
		selected,
		icon: !!iconProp,
		iconPosition,
		label: !!label,
		fullWidth,
		textColor,
		wrapped
	};
	const classes = useUtilityClasses$4(ownerState);
	const icon = iconProp && label && /* @__PURE__ */ import_react.isValidElement(iconProp) ? /* @__PURE__ */ import_react.cloneElement(iconProp, { className: clsx(classes.icon, iconProp.props.className) }) : iconProp;
	const handleClick = (event) => {
		if (!selected && onChange) onChange(event, value);
		if (onClick) onClick(event);
	};
	const handleFocus = (event) => {
		if (selectionFollowsFocus && !selected && onChange) onChange(event, value);
		if (onFocus) onFocus(event);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabRoot, {
		focusRipple: !disableFocusRipple,
		className: clsx(classes.root, className),
		ref,
		role: "tab",
		"aria-selected": selected,
		disabled,
		onClick: handleClick,
		onFocus: handleFocus,
		ownerState,
		tabIndex: selected ? 0 : -1,
		...other,
		children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [icon, label] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [label, icon] }), indicator]
	});
});
Tab.propTypes = {
	children: unsupportedProp_default,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	disabled: import_prop_types.default.bool,
	disableFocusRipple: import_prop_types.default.bool,
	disableRipple: import_prop_types.default.bool,
	icon: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.string]),
	iconPosition: import_prop_types.default.oneOf([
		"bottom",
		"end",
		"start",
		"top"
	]),
	label: import_prop_types.default.node,
	onChange: import_prop_types.default.func,
	onClick: import_prop_types.default.func,
	onFocus: import_prop_types.default.func,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	value: import_prop_types.default.any,
	wrapped: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/material/esm/internal/animate.js
function easeInOutSin(time) {
	return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {}) {
	const { ease = easeInOutSin, duration = 300 } = options;
	let start = null;
	const from = element[property];
	let cancelled = false;
	const cancel = () => {
		cancelled = true;
	};
	const step = (timestamp) => {
		if (cancelled) {
			cb(/* @__PURE__ */ new Error("Animation cancelled"));
			return;
		}
		if (start === null) start = timestamp;
		const time = Math.min(1, (timestamp - start) / duration);
		element[property] = ease(time) * (to - from) + from;
		if (time >= 1) {
			requestAnimationFrame(() => {
				cb(null);
			});
			return;
		}
		requestAnimationFrame(step);
	};
	if (from === to) {
		cb(/* @__PURE__ */ new Error("Element already at target position"));
		return cancel;
	}
	requestAnimationFrame(step);
	return cancel;
}
//#endregion
//#region node_modules/@mui/material/esm/Tabs/ScrollbarSize.js
var styles = {
	width: 99,
	height: 99,
	position: "absolute",
	top: -9999,
	overflow: "scroll"
};
/**
* @ignore - internal component.
* The component originates from https://github.com/STORIS/react-scrollbar-size.
* It has been moved into the core in order to minimize the bundle size.
*/
function ScrollbarSize(props) {
	const { onChange, ...other } = props;
	const scrollbarHeight = import_react.useRef();
	const nodeRef = import_react.useRef(null);
	const setMeasurements = () => {
		scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
	};
	useEnhancedEffect_default(() => {
		const handleResize = debounce_default(() => {
			const prevHeight = scrollbarHeight.current;
			setMeasurements();
			if (prevHeight !== scrollbarHeight.current) onChange(scrollbarHeight.current);
		});
		const containerWindow = ownerWindow_default(nodeRef.current);
		containerWindow.addEventListener("resize", handleResize);
		return () => {
			handleResize.clear();
			containerWindow.removeEventListener("resize", handleResize);
		};
	}, [onChange]);
	import_react.useEffect(() => {
		setMeasurements();
		onChange(scrollbarHeight.current);
	}, [onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: styles,
		...other,
		ref: nodeRef
	});
}
ScrollbarSize.propTypes = { onChange: import_prop_types.default.func.isRequired };
//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/KeyboardArrowLeft.js
/**
* @ignore - internal component.
*/
var KeyboardArrowLeft_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }), "KeyboardArrowLeft");
//#endregion
//#region node_modules/@mui/material/esm/internal/svg-icons/KeyboardArrowRight.js
/**
* @ignore - internal component.
*/
var KeyboardArrowRight_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }), "KeyboardArrowRight");
//#endregion
//#region node_modules/@mui/material/esm/TabScrollButton/tabScrollButtonClasses.js
function getTabScrollButtonUtilityClass(slot) {
	return generateUtilityClass("MuiTabScrollButton", slot);
}
var tabScrollButtonClasses = generateUtilityClasses("MuiTabScrollButton", [
	"root",
	"vertical",
	"horizontal",
	"disabled"
]);
//#endregion
//#region node_modules/@mui/material/esm/TabScrollButton/TabScrollButton.js
var useUtilityClasses$3 = (ownerState) => {
	const { classes, orientation, disabled } = ownerState;
	return composeClasses({ root: [
		"root",
		orientation,
		disabled && "disabled"
	] }, getTabScrollButtonUtilityClass, classes);
};
var TabScrollButtonRoot = styled(ButtonBase, {
	name: "MuiTabScrollButton",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
	}
})({
	width: 40,
	flexShrink: 0,
	opacity: .8,
	[`&.${tabScrollButtonClasses.disabled}`]: { opacity: 0 },
	variants: [{
		props: { orientation: "vertical" },
		style: {
			width: "100%",
			height: 40,
			"& svg": { transform: "var(--TabScrollButton-svgRotate)" }
		}
	}]
});
var TabScrollButton = /* @__PURE__ */ import_react.forwardRef(function TabScrollButton(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabScrollButton"
	});
	const { className, slots = {}, slotProps = {}, direction, orientation, disabled, ...other } = props;
	const isRtl = useRtl();
	const ownerState = {
		isRtl,
		...props
	};
	const classes = useUtilityClasses$3(ownerState);
	const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft_default;
	const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight_default;
	const startButtonIconProps = useSlotProps({
		elementType: StartButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	const endButtonIconProps = useSlotProps({
		elementType: EndButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		additionalProps: { fontSize: "small" },
		ownerState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabScrollButtonRoot, {
		component: "div",
		className: clsx(classes.root, className),
		ref,
		role: null,
		ownerState,
		tabIndex: null,
		...other,
		style: {
			...other.style,
			...orientation === "vertical" && { "--TabScrollButton-svgRotate": `rotate(${isRtl ? -90 : 90}deg)` }
		},
		children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartButtonIcon, { ...startButtonIconProps }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndButtonIcon, { ...endButtonIconProps })
	});
});
TabScrollButton.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	direction: import_prop_types.default.oneOf(["left", "right"]).isRequired,
	disabled: import_prop_types.default.bool,
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]).isRequired,
	slotProps: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		startScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		EndScrollButtonIcon: import_prop_types.default.elementType,
		StartScrollButtonIcon: import_prop_types.default.elementType
	}),
	style: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/material/esm/Tabs/tabsClasses.js
function getTabsUtilityClass(slot) {
	return generateUtilityClass("MuiTabs", slot);
}
var tabsClasses = generateUtilityClasses("MuiTabs", [
	"root",
	"vertical",
	"list",
	"flexContainer",
	"flexContainerVertical",
	"centered",
	"scroller",
	"fixed",
	"scrollableX",
	"scrollableY",
	"hideScrollbar",
	"scrollButtons",
	"scrollButtonsHideMobile",
	"indicator"
]);
//#endregion
//#region node_modules/@mui/material/esm/Tabs/Tabs.js
var nextItem = (list, item) => {
	if (list === item) return list.firstChild;
	if (item && item.nextElementSibling) return item.nextElementSibling;
	return list.firstChild;
};
var previousItem = (list, item) => {
	if (list === item) return list.lastChild;
	if (item && item.previousElementSibling) return item.previousElementSibling;
	return list.lastChild;
};
var moveFocus = (list, currentFocus, traversalFunction) => {
	let wrappedOnce = false;
	let nextFocus = traversalFunction(list, currentFocus);
	while (nextFocus) {
		if (nextFocus === list.firstChild) {
			if (wrappedOnce) return;
			wrappedOnce = true;
		}
		const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
		if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) nextFocus = traversalFunction(list, nextFocus);
		else {
			nextFocus.focus();
			return;
		}
	}
};
var useUtilityClasses$2 = (ownerState) => {
	const { vertical, fixed, hideScrollbar, scrollableX, scrollableY, centered, scrollButtonsHideMobile, classes } = ownerState;
	return composeClasses({
		root: ["root", vertical && "vertical"],
		scroller: [
			"scroller",
			fixed && "fixed",
			hideScrollbar && "hideScrollbar",
			scrollableX && "scrollableX",
			scrollableY && "scrollableY"
		],
		list: [
			"list",
			"flexContainer",
			vertical && "flexContainerVertical",
			vertical && "vertical",
			centered && "centered"
		],
		indicator: ["indicator"],
		scrollButtons: ["scrollButtons", scrollButtonsHideMobile && "scrollButtonsHideMobile"],
		scrollableX: [scrollableX && "scrollableX"],
		hideScrollbar: [hideScrollbar && "hideScrollbar"]
	}, getTabsUtilityClass, classes);
};
var TabsRoot = styled("div", {
	name: "MuiTabs",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			{ [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons },
			{ [`& .${tabsClasses.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile },
			styles.root,
			ownerState.vertical && styles.vertical
		];
	}
})(memoTheme(({ theme }) => ({
	overflow: "hidden",
	minHeight: 48,
	WebkitOverflowScrolling: "touch",
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.scrollButtonsHideMobile,
		style: { [`& .${tabsClasses.scrollButtons}`]: { [theme.breakpoints.down("sm")]: { display: "none" } } }
	}]
})));
var TabsScroller = styled("div", {
	name: "MuiTabs",
	slot: "Scroller",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.scroller,
			ownerState.fixed && styles.fixed,
			ownerState.hideScrollbar && styles.hideScrollbar,
			ownerState.scrollableX && styles.scrollableX,
			ownerState.scrollableY && styles.scrollableY
		];
	}
})({
	position: "relative",
	display: "inline-block",
	flex: "1 1 auto",
	whiteSpace: "nowrap",
	variants: [
		{
			props: ({ ownerState }) => ownerState.fixed,
			style: {
				overflowX: "hidden",
				width: "100%"
			}
		},
		{
			props: ({ ownerState }) => ownerState.hideScrollbar,
			style: {
				scrollbarWidth: "none",
				"&::-webkit-scrollbar": { display: "none" }
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableX,
			style: {
				overflowX: "auto",
				overflowY: "hidden"
			}
		},
		{
			props: ({ ownerState }) => ownerState.scrollableY,
			style: {
				overflowY: "auto",
				overflowX: "hidden"
			}
		}
	]
});
var List = styled("div", {
	name: "MuiTabs",
	slot: "List",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.list,
			styles.flexContainer,
			ownerState.vertical && styles.flexContainerVertical,
			ownerState.centered && styles.centered
		];
	}
})({
	display: "flex",
	variants: [{
		props: ({ ownerState }) => ownerState.vertical,
		style: { flexDirection: "column" }
	}, {
		props: ({ ownerState }) => ownerState.centered,
		style: { justifyContent: "center" }
	}]
});
var TabsIndicator = styled("span", {
	name: "MuiTabs",
	slot: "Indicator"
})(memoTheme(({ theme }) => ({
	position: "absolute",
	height: 2,
	bottom: 0,
	width: "100%",
	transition: theme.transitions.create(),
	variants: [
		{
			props: { indicatorColor: "primary" },
			style: { backgroundColor: (theme.vars || theme).palette.primary.main }
		},
		{
			props: { indicatorColor: "secondary" },
			style: { backgroundColor: (theme.vars || theme).palette.secondary.main }
		},
		{
			props: ({ ownerState }) => ownerState.vertical,
			style: {
				height: "100%",
				width: 2,
				right: 0
			}
		}
	]
})));
var TabsScrollbarSize = styled(ScrollbarSize)({
	overflowX: "auto",
	overflowY: "hidden",
	scrollbarWidth: "none",
	"&::-webkit-scrollbar": { display: "none" }
});
var defaultIndicatorStyle = {};
var warnedOnceTabPresent = false;
var Tabs = /* @__PURE__ */ import_react.forwardRef(function Tabs(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTabs"
	});
	const theme = useTheme$2();
	const isRtl = useRtl();
	const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, action, centered = false, children: childrenProp, className, component = "div", allowScrollButtonsMobile = false, indicatorColor = "primary", onChange, orientation = "horizontal", ScrollButtonComponent, scrollButtons = "auto", selectionFollowsFocus, slots = {}, slotProps = {}, TabIndicatorProps = {}, TabScrollButtonProps = {}, textColor = "primary", value, variant = "standard", visibleScrollbar = false, ...other } = props;
	const scrollable = variant === "scrollable";
	const vertical = orientation === "vertical";
	const scrollStart = vertical ? "scrollTop" : "scrollLeft";
	const start = vertical ? "top" : "left";
	const end = vertical ? "bottom" : "right";
	const clientSize = vertical ? "clientHeight" : "clientWidth";
	const size = vertical ? "height" : "width";
	const ownerState = {
		...props,
		component,
		allowScrollButtonsMobile,
		indicatorColor,
		orientation,
		vertical,
		scrollButtons,
		textColor,
		variant,
		visibleScrollbar,
		fixed: !scrollable,
		hideScrollbar: scrollable && !visibleScrollbar,
		scrollableX: scrollable && !vertical,
		scrollableY: scrollable && vertical,
		centered: centered && !scrollable,
		scrollButtonsHideMobile: !allowScrollButtonsMobile
	};
	const classes = useUtilityClasses$2(ownerState);
	const startScrollButtonIconProps = useSlotProps({
		elementType: slots.StartScrollButtonIcon,
		externalSlotProps: slotProps.startScrollButtonIcon,
		ownerState
	});
	const endScrollButtonIconProps = useSlotProps({
		elementType: slots.EndScrollButtonIcon,
		externalSlotProps: slotProps.endScrollButtonIcon,
		ownerState
	});
	if (centered && scrollable) console.error("MUI: You can not use the `centered={true}` and `variant=\"scrollable\"` properties at the same time on a `Tabs` component.");
	const [mounted, setMounted] = import_react.useState(false);
	const [indicatorStyle, setIndicatorStyle] = import_react.useState(defaultIndicatorStyle);
	const [displayStartScroll, setDisplayStartScroll] = import_react.useState(false);
	const [displayEndScroll, setDisplayEndScroll] = import_react.useState(false);
	const [updateScrollObserver, setUpdateScrollObserver] = import_react.useState(false);
	const [scrollerStyle, setScrollerStyle] = import_react.useState({
		overflow: "hidden",
		scrollbarWidth: 0
	});
	const valueToIndex = /* @__PURE__ */ new Map();
	const tabsRef = import_react.useRef(null);
	const tabListRef = import_react.useRef(null);
	const externalForwardedProps = {
		slots,
		slotProps: {
			indicator: TabIndicatorProps,
			scrollButtons: TabScrollButtonProps,
			...slotProps
		}
	};
	const getTabsMeta = () => {
		const tabsNode = tabsRef.current;
		let tabsMeta;
		if (tabsNode) {
			const rect = tabsNode.getBoundingClientRect();
			tabsMeta = {
				clientWidth: tabsNode.clientWidth,
				scrollLeft: tabsNode.scrollLeft,
				scrollTop: tabsNode.scrollTop,
				scrollWidth: tabsNode.scrollWidth,
				top: rect.top,
				bottom: rect.bottom,
				left: rect.left,
				right: rect.right
			};
		}
		let tabMeta;
		if (tabsNode && value !== false) {
			const children = tabListRef.current.children;
			if (children.length > 0) {
				const tab = children[valueToIndex.get(value)];
				if (!tab) console.error([
					`MUI: The \`value\` provided to the Tabs component is invalid.`,
					`None of the Tabs' children match with "${value}".`,
					valueToIndex.keys ? `You can provide one of the following values: ${Array.from(valueToIndex.keys()).join(", ")}.` : null
				].join("\n"));
				tabMeta = tab ? tab.getBoundingClientRect() : null;
				if (isLayoutSupported() && !warnedOnceTabPresent && tabMeta && tabMeta.width === 0 && tabMeta.height === 0 && tabsMeta.clientWidth !== 0) {
					tabsMeta = null;
					console.error([
						"MUI: The `value` provided to the Tabs component is invalid.",
						`The Tab with this \`value\` ("${value}") is not part of the document layout.`,
						"Make sure the tab item is present in the document or that it's not `display: none`."
					].join("\n"));
					warnedOnceTabPresent = true;
				}
			}
		}
		return {
			tabsMeta,
			tabMeta
		};
	};
	const updateIndicatorState = useEventCallback_default(() => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		let startValue = 0;
		let startIndicator;
		if (vertical) {
			startIndicator = "top";
			if (tabMeta && tabsMeta) startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
		} else {
			startIndicator = isRtl ? "right" : "left";
			if (tabMeta && tabsMeta) startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
		}
		const newIndicatorStyle = {
			[startIndicator]: startValue,
			[size]: tabMeta ? tabMeta[size] : 0
		};
		if (typeof indicatorStyle[startIndicator] !== "number" || typeof indicatorStyle[size] !== "number") setIndicatorStyle(newIndicatorStyle);
		else {
			const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
			const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
			if (dStart >= 1 || dSize >= 1) setIndicatorStyle(newIndicatorStyle);
		}
	});
	const scroll = (scrollValue, { animation = true } = {}) => {
		if (animation) animate(scrollStart, tabsRef.current, scrollValue, { duration: theme.transitions.duration.standard });
		else tabsRef.current[scrollStart] = scrollValue;
	};
	const moveTabsScroll = (delta) => {
		let scrollValue = tabsRef.current[scrollStart];
		if (vertical) scrollValue += delta;
		else scrollValue += delta * (isRtl ? -1 : 1);
		scroll(scrollValue);
	};
	const getScrollSize = () => {
		const containerSize = tabsRef.current[clientSize];
		let totalSize = 0;
		const children = Array.from(tabListRef.current.children);
		for (let i = 0; i < children.length; i += 1) {
			const tab = children[i];
			if (totalSize + tab[clientSize] > containerSize) {
				if (i === 0) totalSize = containerSize;
				break;
			}
			totalSize += tab[clientSize];
		}
		return totalSize;
	};
	const handleStartScrollClick = () => {
		moveTabsScroll(-1 * getScrollSize());
	};
	const handleEndScrollClick = () => {
		moveTabsScroll(getScrollSize());
	};
	const [ScrollbarSlot, { onChange: scrollbarOnChange, ...scrollbarSlotProps }] = useSlot("scrollbar", {
		className: clsx(classes.scrollableX, classes.hideScrollbar),
		elementType: TabsScrollbarSize,
		shouldForwardComponentProp: true,
		externalForwardedProps,
		ownerState
	});
	const handleScrollbarSizeChange = import_react.useCallback((scrollbarWidth) => {
		scrollbarOnChange?.(scrollbarWidth);
		setScrollerStyle({
			overflow: null,
			scrollbarWidth
		});
	}, [scrollbarOnChange]);
	const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot("scrollButtons", {
		className: clsx(classes.scrollButtons, TabScrollButtonProps.className),
		elementType: TabScrollButton,
		externalForwardedProps,
		ownerState,
		additionalProps: {
			orientation,
			slots: {
				StartScrollButtonIcon: slots.startScrollButtonIcon || slots.StartScrollButtonIcon,
				EndScrollButtonIcon: slots.endScrollButtonIcon || slots.EndScrollButtonIcon
			},
			slotProps: {
				startScrollButtonIcon: startScrollButtonIconProps,
				endScrollButtonIcon: endScrollButtonIconProps
			}
		}
	});
	const getConditionalElements = () => {
		const conditionalElements = {};
		conditionalElements.scrollbarSizeListener = scrollable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollbarSlot, {
			...scrollbarSlotProps,
			onChange: handleScrollbarSizeChange
		}) : null;
		const showScrollButtons = scrollable && (scrollButtons === "auto" && (displayStartScroll || displayEndScroll) || scrollButtons === true);
		conditionalElements.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "right" : "left",
			onClick: handleStartScrollClick,
			disabled: !displayStartScroll,
			...scrollButtonSlotProps
		}) : null;
		conditionalElements.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollButtonsSlot, {
			direction: isRtl ? "left" : "right",
			onClick: handleEndScrollClick,
			disabled: !displayEndScroll,
			...scrollButtonSlotProps
		}) : null;
		return conditionalElements;
	};
	const scrollSelectedIntoView = useEventCallback_default((animation) => {
		const { tabsMeta, tabMeta } = getTabsMeta();
		if (!tabMeta || !tabsMeta) return;
		if (tabMeta[start] < tabsMeta[start]) scroll(tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]), { animation });
		else if (tabMeta[end] > tabsMeta[end]) scroll(tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]), { animation });
	});
	const updateScrollButtonState = useEventCallback_default(() => {
		if (scrollable && scrollButtons !== false) setUpdateScrollObserver(!updateScrollObserver);
	});
	import_react.useEffect(() => {
		const handleResize = debounce_default(() => {
			if (tabsRef.current) updateIndicatorState();
		});
		let resizeObserver;
		/**
		* @type {MutationCallback}
		*/
		const handleMutation = (records) => {
			records.forEach((record) => {
				record.removedNodes.forEach((item) => {
					resizeObserver?.unobserve(item);
				});
				record.addedNodes.forEach((item) => {
					resizeObserver?.observe(item);
				});
			});
			handleResize();
			updateScrollButtonState();
		};
		const win = ownerWindow_default(tabsRef.current);
		win.addEventListener("resize", handleResize);
		let mutationObserver;
		if (typeof ResizeObserver !== "undefined") {
			resizeObserver = new ResizeObserver(handleResize);
			Array.from(tabListRef.current.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
		if (typeof MutationObserver !== "undefined") {
			mutationObserver = new MutationObserver(handleMutation);
			mutationObserver.observe(tabListRef.current, { childList: true });
		}
		return () => {
			handleResize.clear();
			win.removeEventListener("resize", handleResize);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
		};
	}, [updateIndicatorState, updateScrollButtonState]);
	/**
	* Toggle visibility of start and end scroll buttons
	* Using IntersectionObserver on first and last Tabs.
	*/
	import_react.useEffect(() => {
		const tabListChildren = Array.from(tabListRef.current.children);
		const length = tabListChildren.length;
		if (typeof IntersectionObserver !== "undefined" && length > 0 && scrollable && scrollButtons !== false) {
			const firstTab = tabListChildren[0];
			const lastTab = tabListChildren[length - 1];
			const observerOptions = {
				root: tabsRef.current,
				threshold: .99
			};
			const handleScrollButtonStart = (entries) => {
				setDisplayStartScroll(!entries[0].isIntersecting);
			};
			const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
			firstObserver.observe(firstTab);
			const handleScrollButtonEnd = (entries) => {
				setDisplayEndScroll(!entries[0].isIntersecting);
			};
			const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
			lastObserver.observe(lastTab);
			return () => {
				firstObserver.disconnect();
				lastObserver.disconnect();
			};
		}
	}, [
		scrollable,
		scrollButtons,
		updateScrollObserver,
		childrenProp?.length
	]);
	import_react.useEffect(() => {
		setMounted(true);
	}, []);
	import_react.useEffect(() => {
		updateIndicatorState();
	});
	import_react.useEffect(() => {
		scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
	}, [scrollSelectedIntoView, indicatorStyle]);
	import_react.useImperativeHandle(action, () => ({
		updateIndicator: updateIndicatorState,
		updateScrollButtons: updateScrollButtonState
	}), [updateIndicatorState, updateScrollButtonState]);
	const [IndicatorSlot, indicatorSlotProps] = useSlot("indicator", {
		className: clsx(classes.indicator, TabIndicatorProps.className),
		elementType: TabsIndicator,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: indicatorStyle }
	});
	const indicator = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndicatorSlot, { ...indicatorSlotProps });
	let childIndex = 0;
	const children = import_react.Children.map(childrenProp, (child) => {
		if (!/* @__PURE__ */ import_react.isValidElement(child)) return null;
		if ((0, import_react_is.isFragment)(child)) console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
		const childValue = child.props.value === void 0 ? childIndex : child.props.value;
		valueToIndex.set(childValue, childIndex);
		const selected = childValue === value;
		childIndex += 1;
		return /* @__PURE__ */ import_react.cloneElement(child, {
			fullWidth: variant === "fullWidth",
			indicator: selected && !mounted && indicator,
			selected,
			selectionFollowsFocus,
			onChange,
			textColor,
			value: childValue,
			...childIndex === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {}
		});
	});
	const handleKeyDown = (event) => {
		if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
		const list = tabListRef.current;
		const currentFocus = getActiveElement_default(ownerDocument_default(list));
		if (currentFocus?.getAttribute("role") !== "tab") return;
		let previousItemKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
		let nextItemKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
		if (orientation === "horizontal" && isRtl) {
			previousItemKey = "ArrowRight";
			nextItemKey = "ArrowLeft";
		}
		switch (event.key) {
			case previousItemKey:
				event.preventDefault();
				moveFocus(list, currentFocus, previousItem);
				break;
			case nextItemKey:
				event.preventDefault();
				moveFocus(list, currentFocus, nextItem);
				break;
			case "Home":
				event.preventDefault();
				moveFocus(list, null, nextItem);
				break;
			case "End":
				event.preventDefault();
				moveFocus(list, null, previousItem);
				break;
			default: break;
		}
	};
	const conditionalElements = getConditionalElements();
	const [RootSlot, rootSlotProps] = useSlot("root", {
		ref,
		className: clsx(classes.root, className),
		elementType: TabsRoot,
		externalForwardedProps: {
			...externalForwardedProps,
			...other,
			component
		},
		ownerState
	});
	const [ScrollerSlot, scrollerSlotProps] = useSlot("scroller", {
		ref: tabsRef,
		className: classes.scroller,
		elementType: TabsScroller,
		externalForwardedProps,
		ownerState,
		additionalProps: { style: {
			overflow: scrollerStyle.overflow,
			[vertical ? `margin${isRtl ? "Left" : "Right"}` : "marginBottom"]: visibleScrollbar ? void 0 : -scrollerStyle.scrollbarWidth
		} }
	});
	const [ListSlot, listSlotProps] = useSlot("list", {
		ref: tabListRef,
		className: clsx(classes.list, classes.flexContainer),
		elementType: List,
		externalForwardedProps,
		ownerState,
		getSlotProps: (handlers) => ({
			...handlers,
			onKeyDown: (event) => {
				handleKeyDown(event);
				handlers.onKeyDown?.(event);
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RootSlot, {
		...rootSlotProps,
		children: [
			conditionalElements.scrollButtonStart,
			conditionalElements.scrollbarSizeListener,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollerSlot, {
				...scrollerSlotProps,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSlot, {
					"aria-label": ariaLabel,
					"aria-labelledby": ariaLabelledBy,
					"aria-orientation": orientation === "vertical" ? "vertical" : null,
					role: "tablist",
					...listSlotProps,
					children
				}), mounted && indicator]
			}),
			conditionalElements.scrollButtonEnd
		]
	});
});
Tabs.propTypes = {
	action: refType,
	allowScrollButtonsMobile: import_prop_types.default.bool,
	"aria-label": import_prop_types.default.string,
	"aria-labelledby": import_prop_types.default.string,
	centered: import_prop_types.default.bool,
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	component: import_prop_types.default.elementType,
	indicatorColor: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary"]), import_prop_types.default.string]),
	onChange: import_prop_types.default.func,
	orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
	ScrollButtonComponent: import_prop_types.default.elementType,
	scrollButtons: import_prop_types.default.oneOf([
		"auto",
		false,
		true
	]),
	selectionFollowsFocus: import_prop_types.default.bool,
	slotProps: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		indicator: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		list: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scrollbar: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scrollButtons: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		scroller: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
		startScrollButtonIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
	}),
	slots: import_prop_types.default.shape({
		endScrollButtonIcon: import_prop_types.default.elementType,
		EndScrollButtonIcon: import_prop_types.default.elementType,
		indicator: import_prop_types.default.elementType,
		list: import_prop_types.default.elementType,
		root: import_prop_types.default.elementType,
		scrollbar: import_prop_types.default.elementType,
		scrollButtons: import_prop_types.default.elementType,
		scroller: import_prop_types.default.elementType,
		startScrollButtonIcon: import_prop_types.default.elementType,
		StartScrollButtonIcon: import_prop_types.default.elementType
	}),
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	TabIndicatorProps: import_prop_types.default.object,
	TabScrollButtonProps: import_prop_types.default.object,
	textColor: import_prop_types.default.oneOf([
		"inherit",
		"primary",
		"secondary"
	]),
	value: import_prop_types.default.any,
	variant: import_prop_types.default.oneOf([
		"fullWidth",
		"scrollable",
		"standard"
	]),
	visibleScrollbar: import_prop_types.default.bool
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/dateTimePickerTabsClasses.js
function getDateTimePickerTabsUtilityClass(slot) {
	return generateUtilityClass("MuiDateTimePickerTabs", slot);
}
var dateTimePickerTabsClasses = generateUtilityClasses("MuiDateTimePickerTabs", ["root"]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/DateTimePickerTabs.js
var viewToTab = (view) => {
	if (isDatePickerView(view)) return "date";
	return "time";
};
var tabToView = (tab) => {
	if (tab === "date") return "day";
	return "hours";
};
var useUtilityClasses$1 = (classes) => {
	return composeClasses({ root: ["root"] }, getDateTimePickerTabsUtilityClass, classes);
};
var DateTimePickerTabsRoot = styled(Tabs, {
	name: "MuiDateTimePickerTabs",
	slot: "Root"
})(({ theme }) => ({
	boxShadow: `0 -1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
	"&:last-child": {
		boxShadow: `0 1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
		[`& .${tabsClasses.indicator}`]: {
			bottom: "auto",
			top: 0
		}
	}
}));
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
*
* API:
*
* - [DateTimePickerTabs API](https://mui.com/x/api/date-pickers/date-time-picker-tabs/)
*/
var DateTimePickerTabs = function DateTimePickerTabs(inProps) {
	const { dateIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateRangeIcon, {}), timeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeIcon, {}), hidden = typeof window === "undefined" || window.innerHeight < 667, className, classes: classesProp, sx } = useThemeProps({
		props: inProps,
		name: "MuiDateTimePickerTabs"
	});
	const translations = usePickerTranslations();
	const { ownerState } = usePickerPrivateContext();
	const { view, setView } = usePickerContext();
	const classes = useUtilityClasses$1(classesProp);
	const handleChange = (event, value) => {
		setView(tabToView(value));
	};
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerTabsRoot, {
		ownerState,
		variant: "fullWidth",
		value: viewToTab(view),
		onChange: handleChange,
		className: clsx(className, classes.root),
		sx,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
			value: "date",
			"aria-label": translations.dateTableLabel,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: dateIcon })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab, {
			value: "time",
			"aria-label": translations.timeTableLabel,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: timeIcon })
		})]
	});
};
DateTimePickerTabs.displayName = "DateTimePickerTabs";
DateTimePickerTabs.propTypes = {
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	dateIcon: import_prop_types.default.node,
	hidden: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	timeIcon: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/dateTimePickerToolbarClasses.js
function getDateTimePickerToolbarUtilityClass(slot) {
	return generateUtilityClass("MuiDateTimePickerToolbar", slot);
}
var dateTimePickerToolbarClasses = generateUtilityClasses("MuiDateTimePickerToolbar", [
	"root",
	"dateContainer",
	"timeContainer",
	"timeDigitsContainer",
	"separator",
	"timeLabelReverse",
	"ampmSelection",
	"ampmLandscape",
	"ampmLabel"
]);
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/DateTimePickerToolbar.js
var _excluded$2 = [
	"ampm",
	"ampmInClock",
	"toolbarFormat",
	"toolbarPlaceholder",
	"toolbarTitle",
	"className",
	"classes"
];
var useUtilityClasses = (classes, ownerState) => {
	const { pickerOrientation, toolbarDirection } = ownerState;
	return composeClasses({
		root: ["root"],
		dateContainer: ["dateContainer"],
		timeContainer: ["timeContainer", toolbarDirection === "rtl" && "timeLabelReverse"],
		timeDigitsContainer: ["timeDigitsContainer", toolbarDirection === "rtl" && "timeLabelReverse"],
		separator: ["separator"],
		ampmSelection: ["ampmSelection", pickerOrientation === "landscape" && "ampmLandscape"],
		ampmLabel: ["ampmLabel"]
	}, getDateTimePickerToolbarUtilityClass, classes);
};
var DateTimePickerToolbarRoot = styled(PickersToolbar, {
	name: "MuiDateTimePickerToolbar",
	slot: "Root",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	justifyContent: "space-around",
	position: "relative",
	variants: [
		{
			props: { toolbarVariant: "desktop" },
			style: {
				borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
				[`& .${pickersToolbarClasses.content} .${pickersToolbarTextClasses.root}[data-selected]`]: {
					color: (theme.vars || theme).palette.primary.main,
					fontWeight: theme.typography.fontWeightBold
				}
			}
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "landscape"
			},
			style: { borderRight: `1px solid ${(theme.vars || theme).palette.divider}` }
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "portrait"
			},
			style: {
				paddingLeft: 24,
				paddingRight: 0
			}
		}
	]
}));
var DateTimePickerToolbarDateContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "DateContainer"
})({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start"
});
var DateTimePickerToolbarTimeContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "TimeContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	display: "flex",
	flexDirection: "row",
	variants: [
		{
			props: { toolbarDirection: "rtl" },
			style: { flexDirection: "row-reverse" }
		},
		{
			props: {
				toolbarVariant: "desktop",
				pickerOrientation: "portrait"
			},
			style: {
				gap: 9,
				marginRight: 4,
				alignSelf: "flex-end"
			}
		},
		{
			props: ({ pickerOrientation, toolbarVariant }) => pickerOrientation === "landscape" && toolbarVariant !== "desktop",
			style: { flexDirection: "column" }
		},
		{
			props: ({ pickerOrientation, toolbarVariant, toolbarDirection }) => pickerOrientation === "landscape" && toolbarVariant !== "desktop" && toolbarDirection === "rtl",
			style: { flexDirection: "column-reverse" }
		}
	]
});
var DateTimePickerToolbarTimeDigitsContainer = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "TimeDigitsContainer",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	display: "flex",
	variants: [{
		props: { toolbarDirection: "rtl" },
		style: { flexDirection: "row-reverse" }
	}, {
		props: { toolbarVariant: "desktop" },
		style: { gap: 1.5 }
	}]
});
var DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
	name: "MuiDateTimePickerToolbar",
	slot: "Separator",
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "toolbarVariant"
})({
	margin: "0 4px 0 2px",
	cursor: "default",
	variants: [{
		props: { toolbarVariant: "desktop" },
		style: { margin: 0 }
	}]
});
var DateTimePickerToolbarAmPmSelection = styled("div", {
	name: "MuiDateTimePickerToolbar",
	slot: "AmPmSelection",
	overridesResolver: (props, styles) => [
		{ [`.${dateTimePickerToolbarClasses.ampmLabel}`]: styles.ampmLabel },
		{ [`&.${dateTimePickerToolbarClasses.ampmLandscape}`]: styles.ampmLandscape },
		styles.ampmSelection
	]
})({
	display: "flex",
	flexDirection: "column",
	marginRight: "auto",
	marginLeft: 12,
	[`& .${dateTimePickerToolbarClasses.ampmLabel}`]: { fontSize: 17 },
	variants: [{
		props: { pickerOrientation: "landscape" },
		style: {
			margin: "4px 0 auto",
			flexDirection: "row",
			justifyContent: "space-around",
			width: "100%"
		}
	}]
});
/**
* If `forceDesktopVariant` is set to `true`, the toolbar will always be rendered in the desktop mode.
* If `onViewChange` is defined, the toolbar will call it instead of calling the default handler from `usePickerContext`.
* This is used by the Date Time Range Picker Toolbar.
*/
var DateTimePickerToolbarOverrideContext = /* @__PURE__ */ import_react.createContext(null);
DateTimePickerToolbarOverrideContext.displayName = "DateTimePickerToolbarOverrideContext";
function DateTimePickerToolbar(inProps) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDateTimePickerToolbar"
	});
	const { ampm, ampmInClock, toolbarFormat, toolbarPlaceholder = "––", toolbarTitle: inToolbarTitle, className, classes: classesProp } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
	const { value: valueContext, setValue: setValueContext, disabled, readOnly, variant, orientation, view: viewContext, setView: setViewContext, views } = usePickerContext();
	const translations = usePickerTranslations();
	const ownerState = useToolbarOwnerState();
	const classes = useUtilityClasses(classesProp, ownerState);
	const adapter = usePickerAdapter();
	const overrides = import_react.useContext(DateTimePickerToolbarOverrideContext);
	const value = overrides ? overrides.value : valueContext;
	const setValue = overrides ? overrides.setValue : setValueContext;
	const view = overrides ? overrides.view : viewContext;
	const setView = overrides ? overrides.setView : setViewContext;
	const { meridiemMode, handleMeridiemChange } = useMeridiemMode(value, ampm, (newValue) => setValue(newValue, {
		changeImportance: "set",
		source: "view"
	}));
	const toolbarVariant = overrides?.forceDesktopVariant ? "desktop" : variant;
	const isDesktop = toolbarVariant === "desktop";
	const showAmPmControl = Boolean(ampm && !ampmInClock);
	const toolbarTitle = inToolbarTitle ?? translations.dateTimePickerToolbarTitle;
	const dateText = import_react.useMemo(() => {
		if (!adapter.isValid(value)) return toolbarPlaceholder;
		if (toolbarFormat) return adapter.formatByString(value, toolbarFormat);
		return adapter.format(value, "shortDate");
	}, [
		value,
		toolbarFormat,
		toolbarPlaceholder,
		adapter
	]);
	const formatSection = (format, fallback) => {
		if (!adapter.isValid(value)) return fallback;
		return adapter.format(value, format);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarRoot, _extends({
		className: clsx(classes.root, className),
		toolbarTitle,
		toolbarVariant
	}, other, {
		ownerState,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarDateContainer, {
			className: classes.dateContainer,
			ownerState,
			children: [views.includes("year") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: "subtitle1",
				onClick: () => setView("year"),
				selected: view === "year",
				value: formatSection("year", "–")
			}), views.includes("day") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
				tabIndex: -1,
				variant: isDesktop ? "h5" : "h4",
				onClick: () => setView("day"),
				selected: view === "day",
				value: dateText
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarTimeContainer, {
			className: classes.timeContainer,
			ownerState,
			toolbarVariant,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarTimeDigitsContainer, {
					className: classes.timeDigitsContainer,
					ownerState,
					toolbarVariant,
					children: [views.includes("hours") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
							variant: isDesktop ? "h5" : "h3",
							width: isDesktop && orientation === "portrait" ? 48 : void 0,
							onClick: () => setView("hours"),
							selected: view === "hours",
							value: formatSection(ampm ? "hours12h" : "hours24h", "--")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimePickerToolbarSeparator, {
							variant: isDesktop ? "h5" : "h3",
							value: ":",
							className: classes.separator,
							ownerState,
							toolbarVariant
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
							variant: isDesktop ? "h5" : "h3",
							width: isDesktop && orientation === "portrait" ? 48 : void 0,
							onClick: () => setView("minutes"),
							selected: view === "minutes" || !views.includes("minutes") && view === "hours",
							value: formatSection("minutes", "--"),
							disabled: !views.includes("minutes")
						})
					] }), views.includes("seconds") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimePickerToolbarSeparator, {
						variant: isDesktop ? "h5" : "h3",
						value: ":",
						className: classes.separator,
						ownerState,
						toolbarVariant
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: isDesktop ? "h5" : "h3",
						width: isDesktop && orientation === "portrait" ? 48 : void 0,
						onClick: () => setView("seconds"),
						selected: view === "seconds",
						value: formatSection("seconds", "--")
					})] })]
				}),
				showAmPmControl && !isDesktop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DateTimePickerToolbarAmPmSelection, {
					className: classes.ampmSelection,
					ownerState,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: "subtitle2",
						selected: meridiemMode === "am",
						typographyClassName: classes.ampmLabel,
						value: formatMeridiem(adapter, "am"),
						onClick: readOnly ? void 0 : () => handleMeridiemChange("am"),
						disabled
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
						variant: "subtitle2",
						selected: meridiemMode === "pm",
						typographyClassName: classes.ampmLabel,
						value: formatMeridiem(adapter, "pm"),
						onClick: readOnly ? void 0 : () => handleMeridiemChange("pm"),
						disabled
					})]
				}),
				ampm && isDesktop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickersToolbarButton, {
					variant: "h5",
					onClick: () => setView("meridiem"),
					selected: view === "meridiem",
					value: value && meridiemMode ? formatMeridiem(adapter, meridiemMode) : "--",
					width: 48
				})
			]
		})]
	}));
}
DateTimePickerToolbar.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	hidden: import_prop_types.default.bool,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	titleId: import_prop_types.default.string,
	toolbarFormat: import_prop_types.default.string,
	toolbarPlaceholder: import_prop_types.default.node,
	toolbarTitle: import_prop_types.default.node
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/shared.js
function useDateTimePickerDefaultizedProps(props, name) {
	const adapter = usePickerAdapter();
	const themeProps = useThemeProps({
		props,
		name
	});
	const validationProps = useApplyDefaultValuesToDateTimeValidationProps(themeProps);
	const ampm = themeProps.ampm ?? adapter.is12HourCycleInCurrentLocale();
	const localeText = import_react.useMemo(() => {
		if (themeProps.localeText?.toolbarTitle == null) return themeProps.localeText;
		return _extends({}, themeProps.localeText, { dateTimePickerToolbarTitle: themeProps.localeText.toolbarTitle });
	}, [themeProps.localeText]);
	const { openTo, views: defaultViews } = applyDefaultViewProps({
		views: themeProps.views,
		openTo: themeProps.openTo,
		defaultViews: [
			"year",
			"day",
			"hours",
			"minutes"
		],
		defaultOpenTo: "day"
	});
	const { shouldRenderTimeInASingleColumn, thresholdToRenderTimeInASingleColumn, views, timeSteps } = resolveTimeViewsResponse({
		thresholdToRenderTimeInASingleColumn: themeProps.thresholdToRenderTimeInASingleColumn,
		ampm,
		timeSteps: themeProps.timeSteps,
		views: defaultViews
	});
	return _extends({}, themeProps, validationProps, {
		timeSteps,
		openTo,
		shouldRenderTimeInASingleColumn,
		thresholdToRenderTimeInASingleColumn,
		views,
		viewsForFormatting: ampm ? [...defaultViews, "meridiem"] : defaultViews,
		ampm,
		localeText,
		orientation: themeProps.orientation ?? "portrait",
		slots: _extends({
			toolbar: DateTimePickerToolbar,
			tabs: DateTimePickerTabs
		}, themeProps.slots),
		slotProps: _extends({}, themeProps.slotProps, { toolbar: _extends({ ampm }, themeProps.slotProps?.toolbar) })
	});
}
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DesktopDateTimePicker/DesktopDateTimePickerLayout.js
/**
* @ignore - internal component.
*/
var DesktopDateTimePickerLayout = /* @__PURE__ */ import_react.forwardRef(function DesktopDateTimePickerLayout(props, ref) {
	const { toolbar, tabs, content, actionBar, shortcuts, ownerState } = usePickerLayout(props);
	const { orientation } = usePickerContext();
	const { sx, className, classes } = props;
	const isActionBarVisible = actionBar && (actionBar.props.actions?.length ?? 0) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersLayoutRoot, {
		ref,
		className: clsx(pickersLayoutClasses.root, classes?.root, className),
		sx: [{
			[`& .${pickersLayoutClasses.tabs}`]: {
				gridRow: 4,
				gridColumn: "1 / 4"
			},
			[`& .${pickersLayoutClasses.actionBar}`]: { gridRow: 5 }
		}, ...Array.isArray(sx) ? sx : [sx]],
		ownerState,
		children: [
			orientation === "landscape" ? shortcuts : toolbar,
			orientation === "landscape" ? toolbar : shortcuts,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PickersLayoutContentWrapper, {
				className: clsx(pickersLayoutClasses.contentWrapper, classes?.contentWrapper),
				ownerState,
				sx: { display: "grid" },
				children: [
					content,
					tabs,
					isActionBarVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, { sx: {
						gridRow: 3,
						gridColumn: "1 / 4"
					} })
				]
			}),
			actionBar
		]
	});
});
DesktopDateTimePickerLayout.displayName = "DesktopDateTimePickerLayout";
DesktopDateTimePickerLayout.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DesktopDateTimePicker/DesktopDateTimePicker.js
var _excluded$1 = [
	"openTo",
	"focusedView",
	"timeViewsCount"
];
var rendererInterceptor = function RendererInterceptor(props) {
	const { viewRenderers, popperView, rendererProps } = props;
	const { openTo, focusedView, timeViewsCount } = rendererProps;
	const finalProps = _extends({}, _objectWithoutPropertiesLoose(rendererProps, _excluded$1), {
		autoFocus: false,
		focusedView: null,
		sx: [{
			[`&.${multiSectionDigitalClockClasses.root}`]: { borderBottom: 0 },
			[`&.${multiSectionDigitalClockClasses.root}, .${multiSectionDigitalClockSectionClasses.root}, &.${digitalClockClasses.root}`]: { maxHeight: 336 }
		}]
	});
	const isTimeViewActive = isInternalTimeView(popperView);
	const dateView = isTimeViewActive ? "day" : popperView;
	const timeView = isTimeViewActive ? popperView : "hours";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [viewRenderers[dateView]?.(_extends({}, rendererProps, {
		view: !isTimeViewActive ? popperView : "day",
		focusedView: focusedView && isDatePickerView(focusedView) ? focusedView : null,
		views: rendererProps.views.filter(isDatePickerView),
		sx: [{ gridColumn: 1 }, ...finalProps.sx]
	})), timeViewsCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {
		orientation: "vertical",
		sx: { gridColumn: 2 }
	}), viewRenderers[timeView]?.(_extends({}, finalProps, {
		view: isTimeViewActive ? popperView : "hours",
		focusedView: focusedView && isInternalTimeView(focusedView) ? focusedView : null,
		openTo: isInternalTimeView(openTo) ? openTo : "hours",
		views: rendererProps.views.filter(isInternalTimeView),
		sx: [{ gridColumn: 3 }, ...finalProps.sx]
	}))] })] });
};
rendererInterceptor.displayName = "rendererInterceptor";
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DesktopDateTimePicker API](https://mui.com/x/api/date-pickers/desktop-date-time-picker/)
*/
var DesktopDateTimePicker = /* @__PURE__ */ import_react.forwardRef(function DesktopDateTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiDesktopDateTimePicker");
	const renderTimeView = defaultizedProps.shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar,
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? true;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? defaultizedProps.views.filter((view) => view !== "meridiem") : defaultizedProps.views;
	const { renderPicker } = useDesktopPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers,
			format: resolveDateTimeFormat(adapter, _extends({}, defaultizedProps, { views: defaultizedProps.viewsForFormatting })),
			views,
			yearsPerRow: defaultizedProps.yearsPerRow ?? 4,
			ampmInClock,
			slots: _extends({
				field: DateTimeField,
				layout: DesktopDateTimePickerLayout
			}, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: true,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar),
				tabs: _extends({ hidden: true }, defaultizedProps.slotProps?.tabs)
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date-time",
		validator: validateDateTime,
		rendererInterceptor,
		steps: null
	});
	return renderPicker();
});
DesktopDateTimePicker.displayName = "DesktopDateTimePicker";
DesktopDateTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	maxDateTime: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	minDateTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableTime: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/MobileDateTimePicker/MobileDateTimePicker.js
var STEPS$1 = [{ views: DATE_VIEWS }, { views: EXPORTED_TIME_VIEWS }];
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [MobileDateTimePicker API](https://mui.com/x/api/date-pickers/mobile-date-time-picker/)
*/
var MobileDateTimePicker = /* @__PURE__ */ import_react.forwardRef(function MobileDateTimePicker(inProps, ref) {
	const adapter = usePickerAdapter();
	const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiMobileDateTimePicker");
	const renderTimeView = defaultizedProps.shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar,
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const ampmInClock = defaultizedProps.ampmInClock ?? false;
	const views = !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? defaultizedProps.views.filter((view) => view !== "meridiem") : defaultizedProps.views;
	const { renderPicker } = useMobilePicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers,
			format: resolveDateTimeFormat(adapter, _extends({}, defaultizedProps, { views: defaultizedProps.viewsForFormatting })),
			views,
			ampmInClock,
			slots: _extends({ field: DateTimeField }, defaultizedProps.slots),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				field: (ownerState) => _extends({}, resolveComponentProps(defaultizedProps.slotProps?.field, ownerState), extractValidationProps(defaultizedProps)),
				toolbar: _extends({
					hidden: false,
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar),
				tabs: _extends({ hidden: false }, defaultizedProps.slotProps?.tabs),
				layout: _extends({}, defaultizedProps.slotProps?.layout, { sx: mergeSx([{
					[`& .${multiSectionDigitalClockClasses.root}`]: { width: 320 },
					[`& .${multiSectionDigitalClockSectionClasses.root}`]: {
						flex: 1,
						maxHeight: 335,
						[`.${multiSectionDigitalClockSectionClasses.item}`]: { width: "auto" }
					},
					[`& .${digitalClockClasses.root}`]: {
						width: 320,
						maxHeight: 336,
						flex: 1,
						[`.${digitalClockClasses.item}`]: { justifyContent: "center" }
					}
				}], defaultizedProps.slotProps?.layout?.sx) })
			})
		}),
		valueManager: singleItemValueManager,
		valueType: "date-time",
		validator: validateDateTime,
		steps: STEPS$1
	});
	return renderPicker();
});
MobileDateTimePicker.displayName = "MobileDateTimePicker";
MobileDateTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	maxDateTime: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	minDateTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableTime: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/DateTimePicker/DateTimePicker.js
var _excluded = ["desktopModeMediaQuery"];
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [DateTimePicker API](https://mui.com/x/api/date-pickers/date-time-picker/)
*/
var DateTimePicker = /* @__PURE__ */ import_react.forwardRef(function DateTimePicker(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiDateTimePicker"
	});
	const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
	if (useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopDateTimePicker, _extends({ ref }, other));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileDateTimePicker, _extends({ ref }, other));
});
DateTimePicker.displayName = "DateTimePicker";
DateTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	closeOnSelect: import_prop_types.default.bool,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	desktopModeMediaQuery: import_prop_types.default.string,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disableOpenPicker: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayWeekNumber: import_prop_types.default.bool,
	enableAccessibleFieldDOMStructure: import_prop_types.default.any,
	fixedWeekNumber: import_prop_types.default.number,
	format: import_prop_types.default.string,
	formatDensity: import_prop_types.default.oneOf(["dense", "spacious"]),
	inputRef: refType,
	label: import_prop_types.default.node,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	maxDateTime: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	minDateTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	name: import_prop_types.default.string,
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onOpen: import_prop_types.default.func,
	onSelectedSectionsChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	open: import_prop_types.default.bool,
	openTo: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	selectedSections: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([
		"all",
		"day",
		"empty",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"weekDay",
		"year"
	]), import_prop_types.default.number]),
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableTime: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
//#region node_modules/@mui/x-date-pickers/esm/StaticDateTimePicker/StaticDateTimePicker.js
var STEPS = [{ views: DATE_VIEWS }, { views: EXPORTED_TIME_VIEWS }];
/**
* Demos:
*
* - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
* - [Validation](https://mui.com/x/react-date-pickers/validation/)
*
* API:
*
* - [StaticDateTimePicker API](https://mui.com/x/api/date-pickers/static-date-time-picker/)
*/
var StaticDateTimePicker = /* @__PURE__ */ import_react.forwardRef(function StaticDateTimePicker(inProps, ref) {
	const defaultizedProps = useDateTimePickerDefaultizedProps(inProps, "MuiStaticDateTimePicker");
	const displayStaticWrapperAs = defaultizedProps.displayStaticWrapperAs ?? "mobile";
	const ampmInClock = defaultizedProps.ampmInClock ?? displayStaticWrapperAs === "desktop";
	const renderTimeView = defaultizedProps.shouldRenderTimeInASingleColumn ? renderDigitalClockTimeView : renderMultiSectionDigitalClockTimeView;
	const viewRenderers = _extends({
		day: renderDateViewCalendar,
		month: renderDateViewCalendar,
		year: renderDateViewCalendar,
		hours: renderTimeView,
		minutes: renderTimeView,
		seconds: renderTimeView,
		meridiem: renderTimeView
	}, defaultizedProps.viewRenderers);
	const { renderPicker } = useStaticPicker({
		ref,
		props: _extends({}, defaultizedProps, {
			viewRenderers,
			displayStaticWrapperAs,
			views: !(viewRenderers.hours?.name === renderMultiSectionDigitalClockTimeView.name) ? defaultizedProps.views.filter((view) => view !== "meridiem") : defaultizedProps.views,
			ampmInClock,
			yearsPerRow: defaultizedProps.yearsPerRow ?? (displayStaticWrapperAs === "mobile" ? 3 : 4),
			slotProps: _extends({}, defaultizedProps.slotProps, {
				tabs: _extends({ hidden: displayStaticWrapperAs === "desktop" }, defaultizedProps.slotProps?.tabs),
				toolbar: _extends({
					hidden: displayStaticWrapperAs === "desktop",
					ampmInClock
				}, defaultizedProps.slotProps?.toolbar)
			}),
			sx: mergeSx([{
				[`& .${multiSectionDigitalClockClasses.root}`]: { width: 320 },
				[`& .${multiSectionDigitalClockSectionClasses.root}`]: {
					flex: 1,
					maxHeight: 335,
					[`.${multiSectionDigitalClockSectionClasses.item}`]: { width: "auto" }
				},
				[`& .${digitalClockClasses.root}`]: {
					width: 320,
					maxHeight: 336,
					flex: 1,
					[`.${digitalClockClasses.item}`]: { justifyContent: "center" }
				}
			}], defaultizedProps?.sx)
		}),
		valueManager: singleItemValueManager,
		valueType: "date-time",
		validator: validateDateTime,
		steps: STEPS
	});
	return renderPicker();
});
StaticDateTimePicker.displayName = "StaticDateTimePicker";
StaticDateTimePicker.propTypes = {
	ampm: import_prop_types.default.bool,
	ampmInClock: import_prop_types.default.bool,
	autoFocus: import_prop_types.default.bool,
	className: import_prop_types.default.string,
	dayOfWeekFormatter: import_prop_types.default.func,
	defaultValue: import_prop_types.default.object,
	disabled: import_prop_types.default.bool,
	disableFuture: import_prop_types.default.bool,
	disableHighlightToday: import_prop_types.default.bool,
	disableIgnoringDatePartForTimeValidation: import_prop_types.default.bool,
	disablePast: import_prop_types.default.bool,
	displayStaticWrapperAs: import_prop_types.default.oneOf(["desktop", "mobile"]),
	displayWeekNumber: import_prop_types.default.bool,
	fixedWeekNumber: import_prop_types.default.number,
	loading: import_prop_types.default.bool,
	localeText: import_prop_types.default.object,
	maxDate: import_prop_types.default.object,
	maxDateTime: import_prop_types.default.object,
	maxTime: import_prop_types.default.object,
	minDate: import_prop_types.default.object,
	minDateTime: import_prop_types.default.object,
	minTime: import_prop_types.default.object,
	minutesStep: import_prop_types.default.number,
	monthsPerRow: import_prop_types.default.oneOf([3, 4]),
	onAccept: import_prop_types.default.func,
	onChange: import_prop_types.default.func,
	onClose: import_prop_types.default.func,
	onError: import_prop_types.default.func,
	onMonthChange: import_prop_types.default.func,
	onViewChange: import_prop_types.default.func,
	onYearChange: import_prop_types.default.func,
	openTo: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	orientation: import_prop_types.default.oneOf(["landscape", "portrait"]),
	readOnly: import_prop_types.default.bool,
	reduceAnimations: import_prop_types.default.bool,
	referenceDate: import_prop_types.default.object,
	renderLoading: import_prop_types.default.func,
	shouldDisableDate: import_prop_types.default.func,
	shouldDisableMonth: import_prop_types.default.func,
	shouldDisableTime: import_prop_types.default.func,
	shouldDisableYear: import_prop_types.default.func,
	showDaysOutsideCurrentMonth: import_prop_types.default.bool,
	skipDisabled: import_prop_types.default.bool,
	slotProps: import_prop_types.default.object,
	slots: import_prop_types.default.object,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	]),
	thresholdToRenderTimeInASingleColumn: import_prop_types.default.number,
	timeSteps: import_prop_types.default.shape({
		hours: import_prop_types.default.number,
		minutes: import_prop_types.default.number,
		seconds: import_prop_types.default.number
	}),
	timezone: import_prop_types.default.string,
	value: import_prop_types.default.object,
	view: import_prop_types.default.oneOf([
		"day",
		"hours",
		"meridiem",
		"minutes",
		"month",
		"seconds",
		"year"
	]),
	viewRenderers: import_prop_types.default.shape({
		day: import_prop_types.default.func,
		hours: import_prop_types.default.func,
		meridiem: import_prop_types.default.func,
		minutes: import_prop_types.default.func,
		month: import_prop_types.default.func,
		seconds: import_prop_types.default.func,
		year: import_prop_types.default.func
	}),
	views: import_prop_types.default.arrayOf(import_prop_types.default.oneOf([
		"day",
		"hours",
		"minutes",
		"month",
		"seconds",
		"year"
	]).isRequired),
	yearsOrder: import_prop_types.default.oneOf(["asc", "desc"]),
	yearsPerRow: import_prop_types.default.oneOf([3, 4])
};
//#endregion
export { ArrowDropDownIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClearIcon, ClockIcon, DEFAULT_DESKTOP_MODE_MEDIA_QUERY, DateCalendar, DateField, DatePicker, DatePickerToolbar, DateRangeIcon, DateTimeField, DateTimePicker, DateTimePickerTabs, DateTimePickerToolbar, DayCalendarSkeleton, DesktopDatePicker, DesktopDateTimePicker, DesktopDateTimePickerLayout, DesktopTimePicker, DigitalClock, DigitalClockItem, LocalizationProvider, MobileDatePicker, MobileDateTimePicker, MobileTimePicker, MonthCalendar, MuiPickersAdapterContext, MultiSectionDigitalClock, PickerDay2, PickersActionBar, PickersCalendarHeader, PickersDay, PickersFilledInput, PickersInput, PickersInputBase, PickersLayout, PickersLayoutContentWrapper, PickersLayoutRoot, PickersOutlinedInput, PickersShortcuts, PickersTextField, StaticDatePicker, StaticDateTimePicker, StaticTimePicker, TimeClock, TimeField, TimeIcon, TimePicker, TimePickerToolbar, PickersSectionList as Unstable_PickersSectionList, PickersSectionListRoot as Unstable_PickersSectionListRoot, PickersSectionListSection as Unstable_PickersSectionListSection, PickersSectionListSectionContent as Unstable_PickersSectionListSectionContent, PickersSectionListSectionSeparator as Unstable_PickersSectionListSectionSeparator, YearCalendar, clockClasses, clockNumberClasses, clockPointerClasses, dateCalendarClasses, datePickerToolbarClasses, dateTimePickerTabsClasses, dateTimePickerToolbarClasses, dayCalendarClasses, dayCalendarSkeletonClasses, digitalClockClasses, extractValidationProps, getDateCalendarUtilityClass, getDayCalendarSkeletonUtilityClass, getDigitalClockUtilityClass, getMonthCalendarUtilityClass, getMultiSectionDigitalClockUtilityClass, getPickerDay2UtilityClass, getPickersDayUtilityClass, getPickersFilledInputUtilityClass, getPickersInputBaseUtilityClass, getPickersInputUtilityClass, getPickersOutlinedInputUtilityClass, getPickersSectionListUtilityClass, getPickersTextFieldUtilityClass, getTimeClockUtilityClass, getYearCalendarUtilityClass, monthCalendarClasses, multiSectionDigitalClockClasses, multiSectionDigitalClockSectionClasses, pickerDay2Classes, pickersCalendarHeaderClasses, pickersDayClasses, pickersFadeTransitionGroupClasses, pickersFilledInputClasses, pickersInputBaseClasses, pickersInputClasses, pickersLayoutClasses, pickersOutlinedInputClasses, pickersSectionListClasses, pickersSlideTransitionClasses, pickersTextFieldClasses, renderDateViewCalendar, renderDigitalClockTimeView, renderMultiSectionDigitalClockTimeView, renderTimeViewClock, timeClockClasses, timePickerToolbarClasses, useDateField as unstable_useDateField, useDateTimeField as unstable_useDateTimeField, useTimeField as unstable_useTimeField, useDateManager, useDateTimeManager, useIsValidValue, useParsedFormat, usePickerActionsContext, usePickerAdapter, usePickerContext, usePickerLayout, usePickerTranslations, useSplitFieldProps, useTimeManager, useValidation, validateDate, validateDateTime, validateTime, yearCalendarClasses };

//# sourceMappingURL=@mui_x-date-pickers.js.map