import { ElSelect } from 'element-plus';
import MyIcon from '@aipbl/common/components/MyIcon/index.vue';
defineOptions({
    name: 'MySelect',
    inheritAttrs: false
});
// 定义组件的属性
const props = defineProps({
    modelValue: {
        type: [String, Number, Array, Object, Boolean],
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
});
// 定义事件
const __VLS_emit = defineEmits(['update:modelValue']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['my-select']} */ ;
/** @type {__VLS_StyleScopedClasses['my-select']} */ ;
/** @type {__VLS_StyleScopedClasses['el-select__wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    ...{ class: "my-select" },
    modelValue: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    ...{ class: "my-select" },
    modelValue: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.$emit('update:modelValue', $event);
            // @ts-ignore
            [modelValue, $emit,];
        } });
var __VLS_7 = {};
const { default: __VLS_8 } = __VLS_3.slots;
if (__VLS_ctx.icon) {
    // @ts-ignore
    [icon,];
    {
        const { prefix: __VLS_9 } = __VLS_3.slots;
        /** @type {[typeof MyIcon, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(MyIcon, new MyIcon({
            name: (__VLS_ctx.icon),
            ...{ class: "select-icon" },
        }));
        const __VLS_11 = __VLS_10({
            name: (__VLS_ctx.icon),
            ...{ class: "select-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        // @ts-ignore
        [icon,];
    }
}
var __VLS_14 = {};
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['my-select']} */ ;
/** @type {__VLS_StyleScopedClasses['select-icon']} */ ;
// @ts-ignore
var __VLS_15 = __VLS_14;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElSelect: ElSelect,
            MyIcon: MyIcon,
        };
    },
    emits: {},
    props: {
        modelValue: {
            type: [String, Number, Array, Object, Boolean],
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
    },
    emits: {},
    props: {
        modelValue: {
            type: [String, Number, Array, Object, Boolean],
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
