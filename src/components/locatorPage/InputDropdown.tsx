import classNames from "classnames";
import React, {
  useReducer,
  KeyboardEvent,
  useRef,
  useEffect,
  useState,
  useMemo,
  FocusEvent,
  Children,
} from "react";
import DropdownSection, { DropdownSectionProps } from "./DropdownSection";
import recursivelyMapChildren from "./utils/recursivelyMapChildren";
import { v4 as uuid } from "uuid";
import { useSearchActions } from "@yext/search-headless-react";
import {
  AnswerExperienceConfig,
  breadcrumbhome,
  googleApikey,
  search_icn,
  UseMylocationsvg,
} from "../../../sites-global/global";

export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}

interface Props {
  inputValue?: string;
  placeholder?: string;
  screenReaderInstructions: string;
  screenReaderText: string;
  onlyAllowDropdownOptionSubmissions?: boolean;
  forceHideDropdown?: boolean;
  onSubmit?: (value: string) => void;
  renderSearchButton?: () => JSX.Element | null;
  renderLogo?: () => JSX.Element | null;
  onInputChange: (value: string) => void;
  onInputFocus: (value: string) => void;
  onDropdownLeave?: (value: string) => void;
  cssClasses?: InputDropdownCssClasses;
  handleSetUserShareLocation: (value: string, userShareStatus: boolean) => void;
  handleInputValue: () => void;
}

interface State {
  focusedSectionIndex?: number;
  dropdownHidden: boolean;
}

type Action =
  | { type: "HideSections" }
  | { type: "ShowSections" }
  | { type: "FocusSection"; newIndex?: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HideSections":
      return { focusedSectionIndex: undefined, dropdownHidden: true };
    case "ShowSections":
      return { focusedSectionIndex: undefined, dropdownHidden: false };
    case "FocusSection":
      return { focusedSectionIndex: action.newIndex, dropdownHidden: false };
  }
}

/**
 * A controlled input component with an attached dropdown.
 */

export default function InputDropdown({
  inputValue = "",
  placeholder,
  screenReaderInstructions,
  screenReaderText,
  onlyAllowDropdownOptionSubmissions,
  forceHideDropdown,
  children,
  onSubmit = () => {},
  renderSearchButton = () => null,
  renderLogo = () => null,
  onInputChange,
  onInputFocus,
  onDropdownLeave,
  cssClasses = {},
  handleSetUserShareLocation,
  handleInputValue,
  params,
}: React.PropsWithChildren<Props>): JSX.Element | null {
  const [{ focusedSectionIndex, dropdownHidden }, dispatch] = useReducer(
    reducer,
    {
      focusedSectionIndex: undefined,
      dropdownHidden: true,
    }
  );
  const shouldDisplayDropdown = !dropdownHidden && !forceHideDropdown;

  const [focusedOptionId, setFocusedOptionId] = useState<string | undefined>(
    undefined
  );
  const [latestUserInput, setLatestUserInput] = useState(inputValue);
  const [childrenKey, setChildrenKey] = useState(0);

  const [keyUpStatus, setKeyUpStatus] = useState(true);

  const screenReaderInstructionsId = useMemo(() => uuid(), []);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputDropdownRef = useRef<HTMLDivElement>(null);

  const searchActions = useSearchActions();

  let numSections = 0;
  const childrenWithProps = recursivelyMapChildren(children, (child) => {
    if (!(React.isValidElement(child) && child.type === DropdownSection)) {
      return child;
    }
    const currentSectionIndex = numSections;
    numSections++;

    let childProps = child.props as DropdownSectionProps;
    const modifiedOptions = childProps.options.map((option) => {
      const modifiedOnSelect = () => {
        setLatestUserInput(option.value);
        dispatch({ type: "HideSections" });
        option.onSelect?.();
      };
      return { ...option, onSelect: modifiedOnSelect };
    });

    const modifiedOnFocusChange = (value: string, focusedOptionId: string) => {
      child.props.onFocusChange?.(value, focusedOptionId);
      setFocusedOptionId(focusedOptionId);
    };

    if (focusedSectionIndex === currentSectionIndex) {
      return React.cloneElement(child, {
        onLeaveSectionFocus,
        options: modifiedOptions,
        isFocused: true,
        key: `${currentSectionIndex}-${childrenKey}`,
        onFocusChange: modifiedOnFocusChange,
      });
    } else {
      return React.cloneElement(child, {
        onLeaveSectionFocus,
        options: modifiedOptions,
        isFocused: false,
        key: `${currentSectionIndex}-${childrenKey}`,
      });
    }
  });

  /**
   * Handles changing which section should become focused when focus leaves the currently-focused section.
   * @param pastSectionEnd Whether the section focus left from the end or the beginning of the section.
   */
  function onLeaveSectionFocus(pastSectionEnd: boolean) {
    if (focusedSectionIndex === undefined && pastSectionEnd) {
      dispatch({ type: "FocusSection", newIndex: 0 });
    } else if (focusedSectionIndex !== undefined) {
      let newSectionIndex: number | undefined = pastSectionEnd
        ? focusedSectionIndex + 1
        : focusedSectionIndex - 1;
      if (newSectionIndex < 0) {
        newSectionIndex = undefined;
        onInputChange(latestUserInput);
        onDropdownLeave?.(latestUserInput);
      } else if (newSectionIndex > numSections - 1) {
        newSectionIndex = numSections - 1;
      }
      dispatch({ type: "FocusSection", newIndex: newSectionIndex });
    }
  }

  function handleDocumentClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (
      !(
        target.isSameNode(inputRef.current) ||
        dropdownRef.current?.contains(target)
      )
    ) {
      dispatch({ type: "HideSections" });
    }
  }

  function handleDocumentKeydown(evt: globalThis.KeyboardEvent) {
    if (["ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
    }

    if (evt.key === "Escape") {
      dispatch({ type: "HideSections" });
    } else if (
      evt.key === "ArrowDown" &&
      numSections > 0 &&
      focusedSectionIndex === undefined
    ) {
      dispatch({ type: "FocusSection", newIndex: 0 });
    }
  }

  function handleDocumentKeyUp(evt: KeyboardEvent<HTMLInputElement>) {
    // console.log("evt.key", evt.key, latestUserInput);
    if (evt.key == "Enter" && latestUserInput != "") {
      // document.querySelector('.z-10').classList.add('hidden');
      // getCoordinates(latestUserInput)
      // alert("aj")
      let searchKey = document.getElementsByClassName("FilterSearchInput");
      let Search = searchKey[0].value;

      // setInputValue('');
      getCoordinates(Search);
    }
    // document.querySelector('.z-10').classList.add('hidden');
    // handleInputValue();
    if (evt.key === "Backspace" || evt.key === "x" || evt.key === "Delete") {
      if (inputValue == "") {
        if (keyUpStatus) {
          searchActions.setVertical("locations");
          searchActions.setQuery("");
          searchActions.setUserLocation(params);
          searchActions.setOffset(0);
          searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
          searchActions.executeVerticalQuery();
          setKeyUpStatus(false);
        }
      }
    }
    if (inputValue != "") {
      setKeyUpStatus(true);
    }
    // handleSetUserShareLocation(inputValue,true);
  }

  useEffect(() => {
    if (shouldDisplayDropdown) {
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("keydown", handleDocumentKeydown);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
        document.removeEventListener("keydown", handleDocumentKeydown);
      };
    }
  });
  function getCoordinates(address: String) {
    // let params: any = {
    //   latitude: "",
    //   longitude: ""
    // };
    // fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ' uk &key=' + googleApikey + '')
    //   .then(response => response.json())
    //   .then(data => {
    //     data.results.map((res: any, index: Number) => {
    //       let userlatitude;
    //       let userlongitude;
    //       if (index == 0) {
    //         userlatitude = res.geometry.location.lat;
    //         userlongitude = res.geometry.location.lng;

    //         params = {
    //           latitude: userlatitude,
    //           longitude: userlongitude
    //         };
    //       }
    searchActions.setQuery(address);
    searchActions.setUserLocation(params);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();

    // })
    //   if(data.results.length==0){
    //     searchActions.setQuery(address);
    //     searchActions.setOffset(0);
    //     searchActions.executeVerticalQuery();
    //   }
    // })
  }

  function handleInputElementKeydown(evt: KeyboardEvent<HTMLInputElement>) {
    if (["ArrowDown", "ArrowUp"].includes(evt.key)) {
      evt.preventDefault();
    }

    if (
      evt.key === "Enter" &&
      focusedSectionIndex === undefined &&
      !onlyAllowDropdownOptionSubmissions
    ) {
      setLatestUserInput(inputValue);
      onSubmit(inputValue);
      dispatch({ type: "HideSections" });
    }
  }

  function handleBlur(evt: FocusEvent<HTMLDivElement>) {
    if (
      !evt.relatedTarget ||
      !(evt.relatedTarget instanceof HTMLElement) ||
      !inputDropdownRef.current
    ) {
      return;
    }
    if (!inputDropdownRef.current.contains(evt.relatedTarget)) {
      dispatch({ type: "HideSections" });
    }
  }

  const inputDropdownContainerCssClasses = classNames(
    cssClasses.inputDropdownContainer,
    {
      [cssClasses.inputDropdownContainer___active ?? ""]: shouldDisplayDropdown,
    }
  );

  return (
    <div
      className={inputDropdownContainerCssClasses}
      ref={inputDropdownRef}
      onBlur={handleBlur}
    >
      <div className={cssClasses?.inputContainer}>
        <div className={cssClasses.logoContainer}>{renderLogo()}</div>
        <input
          className={cssClasses.inputElement}
          placeholder={placeholder}
          onChange={(evt) => {
            const value = evt.target.value;
            setLatestUserInput(value);
            onInputChange(value);
            onInputFocus(value);
            setChildrenKey(childrenKey + 1);
            dispatch({ type: "ShowSections" });
          }}
          onClick={() => {
            onInputFocus(inputValue);
            setChildrenKey(childrenKey + 1);
            dispatch({ type: "ShowSections" });
          }}
          onKeyDown={handleInputElementKeydown}
          onKeyUp={handleDocumentKeyUp}
          value={inputValue}
          ref={inputRef}
          // aria-describedby={screenReaderInstructionsId}
          aria-activedescendant={focusedOptionId}
        />
        <div className={cssClasses.searchButtonContainer}>
          {renderSearchButton()}
        </div>
      </div>

      {shouldDisplayDropdown && Children.count(children) !== 0 && (
        <>
          <div className={cssClasses.divider}></div>
          <div className={cssClasses.dropdownContainer} ref={dropdownRef}>
            {childrenWithProps}
          </div>
        </>
      )}
    </div>
  );
}
