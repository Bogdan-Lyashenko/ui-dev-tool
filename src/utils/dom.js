const Dom = { };

/**
 *
 * @returns {Object}
 */
Dom.getDefaultStyleConfig = function() {
    return {
        position: 'absolute'
    }
};

/**
 *
 * @param {String} label
 * @param {Object} styleConfig
 * @returns {HTMLElement}
 */
Dom.createButton = function(label, styleConfig) {
    return Dom.createHtmlElement('button', label, styleConfig)
};

/**
 *
 *
 * @param {String} nodeType
 * @param {String} innerHTML
 * @param {Object=} styleConfig
 * @returns {HTMLElement}
 */
Dom.createHtmlElement = function(nodeType, innerHTML='', styleConfig={}) {
    var element = document.createElement(nodeType);

    element.innerHTML = innerHTML;

    for (let key in styleConfig) {
        if (styleConfig.hasOwnProperty(key)) {
            element.style[key] = styleConfig[key];
        }
    }

    return element;
};

/**
 *
 * @param element
 * @param parent
 */
Dom.appendHtmlElement = function(element, parent = document.body) {
    parent.appendChild(element);
};

export default Dom;