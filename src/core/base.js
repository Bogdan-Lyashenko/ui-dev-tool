import Helpers from "../utils/helpers.js"

const UiDevTool = {

    modules: {},
    applications: {},
    isDebugState: () => false,

    /**
     *
     * @param {*} option
     */
    setDebugState(option) {
        if (Helpers.isFunction(option)) {
            this.isDebugState = option;
            return;
        }

        this.isDebugState = ()=> option;
    },

    /**
     *
     * @param {String} name
     * @param {Class|Object} module
     */
    registerModule: (name, module) => {
        this.registerSubItem(name, module, this.modules);
    },

    /**
     *
     * @param {String} name
     * @param {Class|Object} application
     */
    registerApplication(name, application) {
        this.registerSubItem(name, application, this.applications);
    },

    /**
     *
     * @param {Object} namespace
     * @param {Object} subItem
     */
    registerSubItem (name, subItem, namespace) {
        if (namespace[name]) {
            throw new Error(`${name} already exists. Please use different name.`);
        }

        namespace[name] = subItem;
    }
};

export default UiDevTool;