/* *****************************************************************************
 * Virtual objects for jsdoc documentation
 */

// Allow unused variables for demonstration
/*jshint unused:false */


/**
 * Context object passed to events and hook functions.
 * @name EventData
 *
 * @property {Fancytree} tree The tree instance
 * @property {object} widget The {@link http://api.jqueryui.com/jQuery.widget/|jQuery UI tree widget}
 * @property {FancytreeOptions} options Shortcut to tree.options
 * @property {Event} orgEvent The {@link http://api.jquery.com/category/events/event-object/|jQuery Event} that initially triggered this call
 * @property {FancytreeNode | null} node The node that this call applies to (`null` for tree events)
 * @property {any} result (output parameter) Event handlers can return values back to the caller. Used by `lazyload`, `postProcess`, ...
 * @property {String | undefined} targetType (only for click and dblclick events) 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon'
 * @property {any} response (only for postProcess event) Original ajax response
 */
var EventData = {};


/**
 * Data object passed to FancytreeNode() constructor.
 * @name NodeData
 *
 * @property {String} title node text (may contain HTML tags)
 * @property {String} key unique key for this node (auto-generated if omitted)
 * @property {Boolean} expanded
 * @property {Boolean} active (initialization only, but will not be stored  with the node).
 * @property {Boolean} focus (initialization only, but will not be stored  with the node).
 * @property {Boolean} folder
 * @property {Boolean} hideCheckbox
 * @property {Boolean} lazy
 * @property {Boolean} selected
 * @property {Boolean} unselectable
 * @property {NodeData[]} children optional array of child nodes
 * @property {String} tooltip
 * @property {String} extraClasses class names added to the node markup (separate with space)
 * @property {object} data all properties from will be copied to `node.data`
 * @property {any} OTHER attributes other than listed above will be copied to `node.data`
 *
 */
var NodeData = {};


/**
 * Data object similar to {@link NodeData}, but with additional options.
 * May be passed to {@link FancytreeNode#applyPatch}
 * (Every property that is omitted (or set to undefined) will be ignored)
 * @name NodePatch
 *
 * @property {any} any (see NodeData)
 * @property {NodeData} appendChildren (not yet implemented)
 * @property {NodeData} replaceChildren (not yet implemented)
 * @property {NodeData} insertChildren (not yet implemented)
 */
var NodePatch = {};


/**
 * List of [key, {@link NodePatch}]  tuples.
 * May be passed to {@link Fancytree#applyPatch}.
 * @name TreePatch
 *
 */
var TreePatch = {};

/**
 * @name FancytreeOptions
 *
 * @description
 * Fancytree options (see also example)
 * line 2
 *
 * @example $("#tree").fancytree({source: "/myService"});
 *
 * @property {Boolean} activeVisible Make sure that the active node is always visible, i.e. it's parents are expanded (default: true).
 * @property {object} ajax Default options for ajax requests
 * @property {Boolean} aria (default: false) Add WAI-ARIA attributes to markup
 * @property {Boolean} autoActivate Activate a node when focused with the keyboard (default: true)
 * @property {Boolean} autoCollapse Automatically collapse all siblings, when a node is expanded (default: false).
 * @property {Boolean} autoScroll Scroll node into visible area, when focused by keyboard (default: false).
 * @property {Boolean} checkbox Display checkboxes to allow selection  (default: false)
 * @property {Integer} clickFolderMode Defines what happens, when the user click a folder node.<br>1:activate, 2:expand, 3:activate and expand, 4:activate/dblclick expands  (default: 4)
 * @property {Integer} debugLevel  0..2 (null: use global setting $.ui.fancytree.debugInfo)
 * @property {Boolean} enableAspx Accept passing ajax data in a property named `d` (default: true).
 * @property {String[]} extensions List of active extensions (default: [])
 * @property {object} fx Animation options, null:off (default: { height: "toggle", duration: 200 })
 * @property {Boolean} generateIds Add `id="..."` to node markup (default: true).
 * @property {Boolean} icons Display node icons  (default: true)
 * @property {String} idPrefix (default: "ft_")
 * @property {String} imagePath Path to a folder containing icons (default: null, using 'skin/' subdirectory).
 * @property {Boolean} keyboard Support keyboard navigation (default: true).
 * @property {String} keyPathSeparator (default: "/")
 * @property {Integer} minExpandLevel 1: root node is not collapsible (default: 1)
 * @property {Integer} selectMode 1:single, 2:multi, 3:multi-hier (default: 2)
 * @property {any} source Used to Initialize the tree.
 * @property {object} strings Translation table
 * @property {Boolean} tabbable Add tabindex='0' to container, so tree can be reached using TAB
 *
 */
var FancytreeOptions = {};

/** Fancytree events
 * @name FancytreeEvents
 *
 * @description
 * Events are called like this:
 *    CALLBACK_NAME(event, data)
 * where `event` is a {@link http://api.jquery.com/category/events/event-object/|jQuery Event} object and `data` is of type {@link EventData}
 * The `this` context is set to  tree's the HTMLDivElement
 *
 * @see <a href="http://api.jquery.com/category/events/event-object/">jQuery Event</a>
 * @see EventData
 *
 * @example $("#tree").fancytree({
 *     activate: function(event, data){
 *         var node = data.node;
 *     }
 * });
 *
 * @property {function} activate `data.node` was deactivated
 * @property {function} beforeActivate Return `false` to prevent default processing
 * @property {function} beforeExpand Return `false` to prevent default processing
 * @property {function} beforeSelect Return `false` to prevent default processing
 * @property {function} blur `data.node` lost keyboard focus
 * @property {function} blurTree `data.tree` lost keyboard focus
 * @property {function} click `data.node` was clicked. `data.targetType` contains the region ("title", "expander", ...). Return `false` to prevent default processing, i.e. activating, etc.
 * @property {function} collapse `data.node` was collapsed
 * @property {function} create Widget was created (called only once, even if re-initialized).
 * @property {function} createNode Allow tweaking and binding, after node was created for the first time
 * @property {function} dblclick `data.node` was double-clicked. `data.targetType` contains the region ("title", "expander", ...). Return `false` to prevent default processing, i.e. expanding, etc.
 * @property {function} deactivate `data.node` was deactivated
 * @property {function} expand `data.node` was expanded
 * @property {function} focus `data.node` received keyboard focus
 * @property {function} focusTree `data.tree` received keyboard focus
 * @property {function} init Widget was (re-)initialized.
 * @property {function} keydown `data.node` received key. `event.which` contains the key. Return `false` to prevent default processing, i.e. navigation.
 * @property {function} keypress (currently unused)
 * @property {function} lazyload `data.node` is lazy a lazy node that is expanded for the first time.
 * @property {function} loadChildren Node data was loaded, i.e. `node.nodeLoadChildren()` finished
 * @property {function} postProcess (not yet implemented!) allows to modify the ajax response
 * @property {function} renderColumns (used by table extension)
 * @property {function} renderNode Allow tweaking after node state was rendered
 * @property {function} select `data.node` was selected
 *
 */
var FancytreeEvents = {};
