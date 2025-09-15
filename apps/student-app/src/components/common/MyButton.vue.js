import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
const __VLS_props = defineProps({
    color: {
        type: String,
        default: '#63a2fd'
    },
    icon: {
        type: String,
        default: 'whiteRadius'
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['my-button']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button-background']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button-background']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "my-button" },
});
/** @type {[typeof MyIcon, typeof MyIcon, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
    name: (__VLS_ctx.icon),
    ...{ class: "my-button-radius" },
}));
const __VLS_1 = __VLS_0({
    name: (__VLS_ctx.icon),
    ...{ class: "my-button-radius" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[icon,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "my-button-slot" },
});
var __VLS_4 = {};
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "my-button-background" },
    ...{ style: ({ backgroundColor: __VLS_ctx.color }) },
});
// @ts-ignore
[color,];
/** @type {__VLS_StyleScopedClasses['my-button']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button-radius']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button-slot']} */ ;
/** @type {__VLS_StyleScopedClasses['my-button-background']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MyIcon: MyIcon,
        };
    },
    props: {
        color: {
            type: String,
            default: '#63a2fd'
        },
        icon: {
            type: String,
            default: 'whiteRadius'
        }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
    },
    props: {
        color: {
            type: String,
            default: '#63a2fd'
        },
        icon: {
            type: String,
            default: 'whiteRadius'
        }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
