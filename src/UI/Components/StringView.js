import { Component } from "../../util/Component.js";

/**
 * A simple component that displays a string in the
 * specified style.
 */
export default class StringView extends Component {
    static PROPERTIES = {
        text: { value: '' },
        heading: { value: 0 },
        no_html_encode: { value: false },
    }

    static CSS = /*css*/`
        h2 {
            margin: 0;
            color: hsl(220, 25%, 31%);
        }
        span {
            color: #3b4863;
        }
    `;

    create_template ({ template }) {
        $(template).html(`<span></span>`);
    }

    on_ready ({ listen }) {
        // TODO: listener composition, to avoid this
        const either = ({ heading, text }) => {
            const wrapper_nodeName = heading ? 'h' + heading : 'span';
            $(this.dom_).find('span').html(`<${wrapper_nodeName}>${
                this.get('no_html_encode') ? text : html_encode(text)
            }</${wrapper_nodeName}>`);
        };
        listen('heading', heading => {
            either({ heading, text: this.get('text') });
        });
        listen('text', text => {
            either({ heading: this.get('heading'), text });
        });
    }
}

// TODO: This is necessary because files can be loaded from
// both `/src/UI` and `/UI` in the URL; we need to fix that
if ( ! window.__component_stringView ) {
    window.__component_stringView = true;

    customElements.define('c-string-view', StringView);
}
