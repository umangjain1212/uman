import { r as reactExports, j as jsxRuntimeExports, q as useComposedRefs, n as cn, b as useActor, k as useQueryClient, i as useQuery, e as ue, B as Button, f as createActor } from "./index-0GmdxHi9.js";
import { e as useId, a as Primitive, f as composeEventHandlers, c as createContextScope, d as useControllableState, u as useCallbackRef, r as Presence, A as AdminLayout } from "./AdminLayout-J0xaFtcA.js";
import { I as Input } from "./input-AgP6hlU-.js";
import { L as Label } from "./label-BsbjwYXA.js";
import { S as Skeleton } from "./skeleton-CrDeJWsT.js";
import { c as createCollection, u as useDirection } from "./index-DcZ63Ig1.js";
import { u as useMutation } from "./useMutation-CaW67kSx.js";
import { P as Plus } from "./plus-BsYz5XGi.js";
import { C as CircleAlert } from "./circle-alert-Bkz-Uvwy.js";
import { I as ImagePlus } from "./image-plus-zg7wgBTg.js";
import { S as Save } from "./save-B2laHAbN.js";
import { P as Pencil } from "./pencil-Y0nV8f2v.js";
import { T as Trash2 } from "./trash-2-DvYCZ0BC.js";
import "./useAdmin-CWkLSaUX.js";
import "./chevron-right-BhXVlcOl.js";
import "./shopping-bag-BguvPrsR.js";
import "./index-BWb_Flrb.js";
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function HeroSlidesTab() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const enabled = !!actor && !actorFetching;
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState({});
  const {
    data: slides,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-hero-slides"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getHeroSlides();
    },
    enabled
  });
  const upsertMutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      return actor.upsertHeroSlide(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      setEditingId(null);
      setEditForm({});
      ue.success("Slide saved!");
    },
    onError: () => ue.error("Failed to save slide")
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteHeroSlide(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      ue.success("Slide removed");
    },
    onError: () => ue.error("Failed to delete slide")
  });
  function startEdit(slide) {
    setEditingId(slide.id);
    setEditForm({
      id: slide.id,
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      displayOrder: slide.displayOrder,
      isVisible: slide.isVisible
    });
  }
  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }
  function saveEdit() {
    if (!editForm.id) return;
    upsertMutation.mutate({
      id: editForm.id,
      imageUrl: editForm.imageUrl ?? "",
      title: editForm.title ?? "",
      subtitle: editForm.subtitle ?? "",
      displayOrder: editForm.displayOrder ?? BigInt(1),
      isVisible: editForm.isVisible ?? true
    });
  }
  function addSlide() {
    const newId = crypto.randomUUID();
    const newSlide = {
      displayOrder: BigInt(((slides == null ? void 0 : slides.length) ?? 0) + 1)
    };
    setEditingId(newId);
    setEditForm({
      id: newId,
      imageUrl: "",
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      displayOrder: newSlide.displayOrder,
      isVisible: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage the hero slider images and text shown on the homepage." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: addSlide,
          className: "btn-primary gap-2",
          size: "sm",
          "data-ocid": "admin-content-add-slide-button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Add Slide"
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failed to load hero slides." })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl p-4 flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-14 rounded-lg flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-64" })
          ] })
        ]
      },
      k
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      editingId && !(slides ?? []).find((s) => s.id === editingId) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-primary/30 rounded-xl overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Image URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.imageUrl ?? "",
                  onChange: (e) => setEditForm((f) => ({ ...f, imageUrl: e.target.value })),
                  placeholder: "/assets/images/hero1.jpg",
                  "data-ocid": "admin-slide-image-url-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "icon",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "admin-slide-image-upload-button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Display Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: Number(editForm.displayOrder ?? 1),
                onChange: (e) => setEditForm((f) => ({
                  ...f,
                  displayOrder: BigInt(e.target.value)
                })),
                min: 1
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editForm.title ?? "",
              onChange: (e) => setEditForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Hero slide title",
              "data-ocid": "admin-slide-title-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Subtitle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: editForm.subtitle ?? "",
              onChange: (e) => setEditForm((f) => ({ ...f, subtitle: e.target.value })),
              placeholder: "Hero slide subtitle",
              "data-ocid": "admin-slide-subtitle-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: saveEdit,
              disabled: upsertMutation.isPending,
              className: "btn-primary gap-2",
              size: "sm",
              "data-ocid": "admin-slide-save-button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                " Save"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: cancelEdit,
              size: "sm",
              "data-ocid": "admin-slide-cancel-button",
              children: "Cancel"
            }
          )
        ] })
      ] }) }),
      (slides ?? []).map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle",
          "data-ocid": `admin-hero-slide.item.${i + 1}`,
          children: editingId === slide.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Image URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: editForm.imageUrl ?? "",
                    onChange: (e) => setEditForm((f) => ({
                      ...f,
                      imageUrl: e.target.value
                    })),
                    placeholder: "/assets/images/hero1.jpg",
                    "data-ocid": "admin-slide-image-url-input"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Display Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    value: Number(editForm.displayOrder ?? 1),
                    onChange: (e) => setEditForm((f) => ({
                      ...f,
                      displayOrder: BigInt(e.target.value)
                    })),
                    min: 1
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.title ?? "",
                  onChange: (e) => setEditForm((f) => ({ ...f, title: e.target.value })),
                  "data-ocid": "admin-slide-title-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-form-label", children: "Subtitle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: editForm.subtitle ?? "",
                  onChange: (e) => setEditForm((f) => ({ ...f, subtitle: e.target.value })),
                  "data-ocid": "admin-slide-subtitle-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: saveEdit,
                  disabled: upsertMutation.isPending,
                  className: "btn-primary gap-2",
                  size: "sm",
                  "data-ocid": "admin-slide-save-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                    " Save"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: cancelEdit,
                  size: "sm",
                  "data-ocid": "admin-slide-cancel-button",
                  children: "Cancel"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-14 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.imageUrl,
                alt: slide.title,
                loading: "lazy",
                className: "w-full h-full object-cover",
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: slide.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: slide.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Order: ",
                Number(slide.displayOrder)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "admin-action-btn admin-action-edit",
                  onClick: () => startEdit(slide),
                  "data-ocid": `admin-slide-edit-button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "admin-action-btn admin-action-delete",
                  onClick: () => deleteMutation.mutate(slide.id),
                  disabled: deleteMutation.isPending,
                  "data-ocid": `admin-slide-delete-button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] })
        },
        slide.id
      ))
    ] })
  ] });
}
function AdminContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Content Management", breadcrumb: ["Content"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "hero", "data-ocid": "admin-content-tabs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "hero", "data-ocid": "admin-content-hero-tab", children: "Hero Slides" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSlidesTab, {}) })
  ] }) });
}
export {
  AdminContent
};
